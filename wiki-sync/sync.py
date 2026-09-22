#!/usr/bin/env python3
"""Two-way sync between local text files and an XWiki instance's REST API.

Usage:
    python3 sync.py pull                # download all pages (+ attachments) into ../wiki-content
    python3 sync.py status              # show local files with unpushed edits
    python3 sync.py push [file]         # push one file, or all changed files if omitted
    python3 sync.py outline             # regenerate ../OUTLINE.md from local files

'pull' regenerates OUTLINE.md automatically; 'outline' does it on its own and
needs no credentials or network.

Both page text and attachments (images, PDFs, etc.) are synced two-way.
Attachments for a page live in a "<PageName>.attachments/" folder next to its
.xwiki file; add, replace, or edit files there and 'push' will upload them.

Setup: copy .env.example to .env next to this script and fill in credentials.
"""
import argparse
import base64
import hashlib
import json
import mimetypes
import os
import re
import ssl
import sys
import urllib.error
import urllib.parse
import urllib.request
import xml.etree.ElementTree as ET
from dataclasses import dataclass
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))
import outline  # noqa: E402  (needs the path insert above)

NS = "{http://www.xwiki.org}"
META_MARK = "%%WIKI-SYNC-META%%"
ATTACHMENT_MANIFEST = ".sync-manifest.json"
INVALID_CHARS = re.compile(r'[\\/:*?"<>|]')

ET.register_namespace("", "http://www.xwiki.org")

try:
    import certifi
    SSL_CONTEXT = ssl.create_default_context(cafile=certifi.where())
except ImportError:
    SSL_CONTEXT = ssl.create_default_context()


@dataclass
class Config:
    base_url: str
    wiki: str
    user: str
    password: str
    content_dir: Path
    exclude_spaces: set


def load_config() -> Config:
    script_dir = Path(__file__).resolve().parent
    env_path = script_dir / ".env"
    env = {}
    if env_path.exists():
        for line in env_path.read_text().splitlines():
            line = line.strip()
            if not line or line.startswith("#") or "=" not in line:
                continue
            k, v = line.split("=", 1)
            env[k.strip()] = v.strip()
    for k, v in os.environ.items():
        if k.startswith("XWIKI_"):
            env[k] = v

    base_url = env.get("XWIKI_BASE_URL", "").rstrip("/")
    wiki = env.get("XWIKI_WIKI", "")
    user = env.get("XWIKI_USER", "")
    password = env.get("XWIKI_PASSWORD", "")
    if not all([base_url, wiki, user, password]):
        sys.exit(f"Missing XWiki credentials. Copy {script_dir / '.env.example'} to .env and fill it in.")

    exclude_spaces = set(filter(None, (s.strip() for s in env.get("XWIKI_EXCLUDE_SPACES", "").split(","))))
    content_dir = script_dir.parent / "wiki-content"
    return Config(base_url, wiki, user, password, content_dir, exclude_spaces)


# --- HTTP / REST helpers -----------------------------------------------

def _request(cfg: Config, method: str, url: str, body: bytes = None, content_type: str = None):
    headers = {"Authorization": "Basic " + base64.b64encode(f"{cfg.user}:{cfg.password}".encode()).decode()}
    if content_type:
        headers["Content-Type"] = content_type
    req = urllib.request.Request(url, data=body, method=method, headers=headers)
    try:
        with urllib.request.urlopen(req, context=SSL_CONTEXT) as resp:
            return resp.status, resp.read()
    except urllib.error.HTTPError as e:
        detail = e.read().decode(errors="replace")[:500]
        raise RuntimeError(f"{method} {url} -> HTTP {e.code} {e.reason}\n{detail}") from None


def rest_root(cfg: Config) -> str:
    return f"{cfg.base_url}/rest/wikis/{cfg.wiki}"


def list_spaces(cfg: Config):
    url = rest_root(cfg) + "/spaces?number=1000"
    _, body = _request(cfg, "GET", url)
    root = ET.fromstring(body)
    spaces = []
    for sp in root.findall(f"{NS}space"):
        pages_href = next(
            (l.get("href") for l in sp.findall(f"{NS}link") if l.get("rel") == "http://www.xwiki.org/rel/pages"),
            None,
        )
        if pages_href:
            spaces.append(pages_href)
    return spaces


def list_pages(cfg: Config, pages_href: str):
    sep = "&" if "?" in pages_href else "?"
    url = pages_href + f"{sep}number=1000"
    _, body = _request(cfg, "GET", url)
    root = ET.fromstring(body)
    hrefs = []
    for ps in root.findall(f"{NS}pageSummary"):
        href = next(
            (l.get("href") for l in ps.findall(f"{NS}link") if l.get("rel") == "http://www.xwiki.org/rel/page"),
            None,
        )
        if href:
            hrefs.append(href)
    return hrefs


def get_page(cfg: Config, href: str):
    _, body = _request(cfg, "GET", href)
    root = ET.fromstring(body)
    hierarchy_spaces = []
    hierarchy = root.find(f"{NS}hierarchy")
    if hierarchy is not None:
        for item in hierarchy.findall(f"{NS}item"):
            if item.findtext(f"{NS}type") == "space":
                hierarchy_spaces.append(item.findtext(f"{NS}name"))
    return {
        "href": href,
        "name": root.findtext(f"{NS}name") or "WebHome",
        "title": root.findtext(f"{NS}title") or "",
        "content": root.findtext(f"{NS}content") or "",
        "syntax": root.findtext(f"{NS}syntax") or "xwiki/2.1",
        "version": root.findtext(f"{NS}version") or "",
        "hierarchy_spaces": hierarchy_spaces,
    }


def put_page(cfg: Config, href: str, title: str, content: str) -> str:
    root = ET.Element(f"{NS}page")
    ET.SubElement(root, f"{NS}title").text = title
    ET.SubElement(root, f"{NS}content").text = content
    body = ET.tostring(root, encoding="utf-8", xml_declaration=True)
    _, resp_body = _request(cfg, "PUT", href, body=body, content_type="application/xml")
    resp_root = ET.fromstring(resp_body)
    return resp_root.findtext(f"{NS}version") or ""


def list_attachments(cfg: Config, page_href: str):
    sep = "&" if "?" in page_href else "?"
    url = f"{page_href}/attachments{sep}number=1000"
    _, body = _request(cfg, "GET", url)
    root = ET.fromstring(body)
    result = []
    for att in root.findall(f"{NS}attachment"):
        data_href = next(
            (l.get("href") for l in att.findall(f"{NS}link") if l.get("rel") == "http://www.xwiki.org/rel/attachmentData"),
            None,
        )
        if data_href:
            result.append({
                "name": att.findtext(f"{NS}name"),
                "href": data_href,
                "size": att.findtext(f"{NS}size"),
                "version": att.findtext(f"{NS}version") or "",
            })
    return result


def download_attachment(cfg: Config, href: str) -> bytes:
    _, body = _request(cfg, "GET", href)
    return body


def upload_attachment(cfg: Config, page_href: str, filename: str, data: bytes) -> str:
    url = f"{page_href}/attachments/{urllib.parse.quote(filename)}"
    mime_type = mimetypes.guess_type(filename)[0] or "application/octet-stream"
    _, resp_body = _request(cfg, "PUT", url, body=data, content_type=mime_type)
    resp_root = ET.fromstring(resp_body)
    return resp_root.findtext(f"{NS}version") or ""


# --- Local file format ---------------------------------------------------

def sanitize(name: str) -> str:
    return INVALID_CHARS.sub("-", name).strip() or "untitled"


def sha256(text: str) -> str:
    return hashlib.sha256(text.encode("utf-8")).hexdigest()


def sha256_bytes(data: bytes) -> str:
    return hashlib.sha256(data).hexdigest()


def load_attachment_manifest(att_dir: Path) -> dict:
    manifest_path = att_dir / ATTACHMENT_MANIFEST
    if manifest_path.exists():
        return json.loads(manifest_path.read_text(encoding="utf-8"))
    return {}


def save_attachment_manifest(att_dir: Path, manifest: dict):
    manifest_path = att_dir / ATTACHMENT_MANIFEST
    manifest_path.write_text(json.dumps(manifest, indent=2, sort_keys=True), encoding="utf-8")


def attachments_dir_for(file_path: Path, page_name: str) -> Path:
    return file_path.parent / f"{sanitize(page_name)}.attachments"


def split_front_matter(text: str):
    if not text.startswith(META_MARK + "\n"):
        return {}, text
    rest = text[len(META_MARK) + 1:]
    idx = rest.find("\n" + META_MARK)
    if idx == -1:
        return {}, text
    meta_block = rest[:idx]
    content = rest[idx + 1 + len(META_MARK):]
    if content.startswith("\n"):
        content = content[1:]
    meta = {}
    for line in meta_block.split("\n"):
        if ":" in line:
            k, v = line.split(":", 1)
            meta[k.strip()] = v.strip()
    return meta, content


def render_file(meta: dict, content: str) -> str:
    lines = [META_MARK]
    for k in ("href", "title", "synced_title", "syntax", "version", "hash"):
        if k in meta:
            lines.append(f"{k}: {meta[k]}")
    lines.append(META_MARK)
    return "\n".join(lines) + "\n" + content


def write_local_file(path: Path, meta: dict, content: str):
    path.write_text(render_file(meta, content), encoding="utf-8")


def local_path_for(cfg: Config, page: dict) -> Path:
    rel_dir = [sanitize(seg) for seg in page["hierarchy_spaces"]]
    dir_path = cfg.content_dir.joinpath(*rel_dir)
    return dir_path / f"{sanitize(page['name'])}.xwiki"


# --- Commands --------------------------------------------------------------

def pull_attachments(cfg: Config, page: dict, file_path: Path, stats: dict):
    attachments = list_attachments(cfg, page["href"])
    if not attachments:
        return
    att_dir = attachments_dir_for(file_path, page["name"])
    manifest = load_attachment_manifest(att_dir)
    dirty_manifest = False

    for att in attachments:
        fname = sanitize(att["name"])
        att_path = att_dir / fname
        entry = manifest.get(fname)

        if entry and entry.get("version") == att["version"] and att_path.exists():
            continue  # unchanged since last sync

        if att_path.exists() and entry:
            local_hash = sha256_bytes(att_path.read_bytes())
            if local_hash != entry.get("sha256"):
                if entry.get("version") == att["version"]:
                    stats["attachments_kept_local"] += 1
                    continue  # you edited it locally, wiki hasn't changed - keep your version
                conflict_path = att_dir / f"{att_path.stem}.remote{att_path.suffix}"
                att_dir.mkdir(parents=True, exist_ok=True)
                conflict_path.write_bytes(download_attachment(cfg, att["href"]))
                stats["attachments_conflicts"] += 1
                print(f"CONFLICT: {att_path} changed locally AND on the wiki.")
                print(f"          Remote version saved to {conflict_path} for manual merge.")
                continue
        elif att_path.exists() and att["size"] is not None and str(att_path.stat().st_size) == att["size"]:
            # first time tracking this file (e.g. migrating from an older pull) and it already matches
            manifest[fname] = {"size": att["size"], "sha256": sha256_bytes(att_path.read_bytes()), "version": att["version"]}
            dirty_manifest = True
            stats["attachments_skipped"] += 1
            continue

        att_dir.mkdir(parents=True, exist_ok=True)
        data = download_attachment(cfg, att["href"])
        att_path.write_bytes(data)
        manifest[fname] = {"size": att["size"], "sha256": sha256_bytes(data), "version": att["version"]}
        dirty_manifest = True
        stats["attachments_pulled"] += 1

    if dirty_manifest:
        save_attachment_manifest(att_dir, manifest)


def cmd_pull(cfg: Config):
    stats = {
        "pulled": 0, "kept_local": 0, "conflicts": 0, "skipped": 0,
        "attachments_pulled": 0, "attachments_skipped": 0,
        "attachments_kept_local": 0, "attachments_conflicts": 0,
    }
    for pages_href in list_spaces(cfg):
        for page_href in list_pages(cfg, pages_href):
            page = get_page(cfg, page_href)
            if page["hierarchy_spaces"] and page["hierarchy_spaces"][0] in cfg.exclude_spaces:
                stats["skipped"] += 1
                continue

            file_path = local_path_for(cfg, page)
            new_hash = sha256(page["content"])
            new_meta = {
                "href": page["href"],
                "title": page["title"],
                "synced_title": page["title"],
                "syntax": page["syntax"],
                "version": page["version"],
                "hash": new_hash,
            }

            if file_path.exists():
                old_meta, old_content = split_front_matter(file_path.read_text(encoding="utf-8"))
                local_hash = sha256(old_content)
                if old_meta.get("hash") and local_hash != old_meta["hash"]:
                    if old_meta.get("version") == page["version"]:
                        stats["kept_local"] += 1
                        pull_attachments(cfg, page, file_path, stats)
                        continue
                    conflict_path = file_path.with_name(file_path.stem + ".remote.xwiki")
                    write_local_file(conflict_path, new_meta, page["content"])
                    stats["conflicts"] += 1
                    print(f"CONFLICT: {file_path} has local edits AND the wiki changed.")
                    print(f"          Remote version saved to {conflict_path} for manual merge.")
                    continue
            else:
                file_path.parent.mkdir(parents=True, exist_ok=True)

            write_local_file(file_path, new_meta, page["content"])
            stats["pulled"] += 1
            pull_attachments(cfg, page, file_path, stats)

    print(
        f"Pulled {stats['pulled']} page(s) into {cfg.content_dir}. "
        f"{stats['kept_local']} kept local edits, {stats['conflicts']} conflict(s), "
        f"{stats['skipped']} skipped (excluded spaces)."
    )
    print(
        f"Attachments: {stats['attachments_pulled']} downloaded, "
        f"{stats['attachments_skipped']} already up to date, "
        f"{stats['attachments_kept_local']} kept local edits, "
        f"{stats['attachments_conflicts']} conflict(s)."
    )
    outline.main()


def iter_local_files(cfg: Config):
    if not cfg.content_dir.exists():
        return
    for path in sorted(cfg.content_dir.rglob("*.xwiki")):
        if path.name.endswith(".remote.xwiki"):
            continue
        yield path


def iter_attachment_dirs(cfg: Config):
    if not cfg.content_dir.exists():
        return
    for att_dir in sorted(cfg.content_dir.rglob("*.attachments")):
        if att_dir.is_dir():
            yield att_dir


def iter_attachment_files(att_dir: Path):
    for local_path in sorted(att_dir.iterdir()):
        if not local_path.is_file():
            continue
        if local_path.name == ATTACHMENT_MANIFEST or ".remote." in local_path.name:
            continue
        yield local_path


def cmd_status(cfg: Config):
    dirty = []
    for path in iter_local_files(cfg):
        meta, content = split_front_matter(path.read_text(encoding="utf-8"))
        retitled = "synced_title" in meta and meta.get("title") != meta["synced_title"]
        if meta.get("hash") != sha256(content) or retitled:
            dirty.append(path)

    for att_dir in iter_attachment_dirs(cfg):
        manifest = load_attachment_manifest(att_dir)
        for local_path in iter_attachment_files(att_dir):
            entry = manifest.get(local_path.name)
            if not entry or entry.get("sha256") != sha256_bytes(local_path.read_bytes()):
                dirty.append(local_path)

    if not dirty:
        print("No local changes.")
        return
    print("Modified locally (not yet pushed):")
    for path in dirty:
        print(f"  {path.relative_to(cfg.content_dir)}")


def push_file(cfg: Config, path: Path) -> bool:
    text = path.read_text(encoding="utf-8")
    meta, content = split_front_matter(text)
    if "href" not in meta:
        print(f"SKIP {path}: not a file produced by 'pull' (missing sync metadata).")
        return False

    local_hash = sha256(content)
    content_changed = meta.get("hash") != local_hash

    # A retitle leaves the content hash alone, so check the title against the
    # wiki too -- otherwise renames never get pushed.
    remote = get_page(cfg, meta["href"])
    if not content_changed and meta.get("title", remote["title"]) == remote["title"]:
        return False  # nothing changed

    if remote["version"] != meta.get("version"):
        print(
            f"CONFLICT {path}: wiki version is {remote['version']}, "
            f"but your last sync was {meta.get('version')}. Run 'pull' first."
        )
        return False

    title = meta.get("title", remote["title"])
    new_version = put_page(cfg, meta["href"], title, content)
    meta["version"] = new_version
    meta["hash"] = local_hash
    meta["synced_title"] = title
    write_local_file(path, meta, content)
    print(f"PUSHED {path.relative_to(cfg.content_dir)} -> version {new_version}")
    return True


def push_attachments(cfg: Config, page_href: str, att_dir: Path) -> int:
    manifest = load_attachment_manifest(att_dir)
    remote_by_name = {a["name"]: a for a in list_attachments(cfg, page_href)}
    pushed = 0
    dirty_manifest = False

    for local_path in iter_attachment_files(att_dir):
        data = local_path.read_bytes()
        local_hash = sha256_bytes(data)
        entry = manifest.get(local_path.name)
        if entry and entry.get("sha256") == local_hash:
            continue  # unchanged since last sync

        remote = remote_by_name.get(local_path.name)
        if remote and entry and remote["version"] != entry.get("version"):
            print(
                f"CONFLICT {local_path}: wiki attachment version is {remote['version']}, "
                f"last synced was {entry.get('version')}. Run 'pull' first."
            )
            continue

        new_version = upload_attachment(cfg, page_href, local_path.name, data)
        manifest[local_path.name] = {"size": str(len(data)), "sha256": local_hash, "version": new_version}
        dirty_manifest = True
        pushed += 1
        display_path = local_path.relative_to(cfg.content_dir) if cfg.content_dir in local_path.parents else local_path
        print(f"PUSHED attachment {display_path} -> version {new_version}")

    if dirty_manifest:
        save_attachment_manifest(att_dir, manifest)
    return pushed


def page_href_of(path: Path) -> str:
    meta, _ = split_front_matter(path.read_text(encoding="utf-8"))
    return meta.get("href")


def cmd_push(cfg: Config, target: str):
    pushed_pages = 0
    pushed_attachments = 0

    if target:
        path = Path(target).resolve()
        if not path.exists():
            sys.exit(f"No such file: {path}")

        if path.parent.name.endswith(".attachments"):
            page_name = path.parent.name[: -len(".attachments")]
            sibling = path.parent.parent / f"{page_name}.xwiki"
            if not sibling.exists():
                sys.exit(f"Cannot find the page for attachment {path} (expected {sibling}).")
            page_href = page_href_of(sibling)
            if not page_href:
                sys.exit(f"{sibling} is missing sync metadata; run 'pull' first.")
            pushed_attachments += push_attachments(cfg, page_href, path.parent)
        else:
            if push_file(cfg, path):
                pushed_pages += 1
            page_href = page_href_of(path)
            att_dir = attachments_dir_for(path, path.stem)
            if page_href and att_dir.is_dir():
                pushed_attachments += push_attachments(cfg, page_href, att_dir)
    else:
        for path in iter_local_files(cfg):
            if push_file(cfg, path):
                pushed_pages += 1
            page_href = page_href_of(path)
            att_dir = attachments_dir_for(path, path.stem)
            if page_href and att_dir.is_dir():
                pushed_attachments += push_attachments(cfg, page_href, att_dir)

    print(f"Done. Pushed {pushed_pages} page(s), {pushed_attachments} attachment(s).")


def main():
    parser = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    sub = parser.add_subparsers(dest="command", required=True)
    sub.add_parser("pull", help="Download pages from the wiki into wiki-content/")
    p_push = sub.add_parser("push", help="Upload local page and attachment changes back to the wiki")
    p_push.add_argument(
        "file", nargs="?", default=None,
        help="Specific .xwiki file or attachment file (default: all changed files)",
    )
    sub.add_parser("status", help="List local files with unpushed changes")
    sub.add_parser("outline", help="Regenerate OUTLINE.md from the local files (no network)")
    args = parser.parse_args()

    # 'outline' reads only local files, so it needs no credentials.
    if args.command == "outline":
        return outline.main()

    cfg = load_config()
    if args.command == "pull":
        cmd_pull(cfg)
    elif args.command == "push":
        cmd_push(cfg, args.file)
    elif args.command == "status":
        cmd_status(cfg)


if __name__ == "__main__":
    sys.exit(main() or 0)
