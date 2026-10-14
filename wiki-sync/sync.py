#!/usr/bin/env python3
"""Two-way sync between wiki-content/ and an XWiki instance's REST API.

The local tree reads the way the wiki does:

  - a page without children is a file, '<title>.xwiki';
  - a page with children is a folder, '<title>/'. A file system entry can't be
    both a file and a folder, but a wiki page can have text and children, so
    the folder's own text is the '0 Index.xwiki' inside it;
  - wiki-content/0 Index.xwiki is the wiki's home page (Main.WebHome); every
    other file or folder at the top is a top-level page;
  - a page's attachments live in '<file name>.attachments/' next to its file
    (for a folder's page: '0 Index.attachments/').

Each file's 'href:' line ties it to its wiki page, so files can be renamed and
moved: renaming a file or folder retitles the page on push, and a retitle on
the wiki renames it on pull. New files and folders become new pages on push;
deleted ones are deleted from the wiki on push. wiki-content/.sync-state.json
records which pages were in sync last time, which is how push tells a page you
deleted from one a teammate has just created.

Usage:
    python3 sync.py pull               # download pages and attachments, re-file renamed pages
    python3 sync.py status             # what push would do (no network)
    python3 sync.py push [--yes] [file]  # create, update, retitle and delete pages
    python3 sync.py layout             # re-file pages under their titles (no network)
    python3 sync.py outline            # regenerate ../OUTLINE.md (no network)

Setup: copy .env.example to .env next to this script and fill in credentials.
"""
import argparse
import base64
import hashlib
import json
import mimetypes
import os
import re
import shutil
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

CONTENT_DIR = Path(__file__).resolve().parent.parent / "wiki-content"
INDEX = "0 Index.xwiki"
STATE_FILE = CONTENT_DIR / ".sync-state.json"
HOME = ("Main",)  # Main.WebHome, the wiki's home page: wiki-content/0 Index.xwiki
DEFAULT_EXCLUDES = "XWiki,Menu,Diagram,Sandbox"

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

    excludes = env.get("XWIKI_EXCLUDE_SPACES", DEFAULT_EXCLUDES)
    exclude_spaces = set(filter(None, (s.strip() for s in excludes.split(","))))
    return Config(base_url, wiki, user, password, CONTENT_DIR, exclude_spaces)


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
        raise HTTPStatusError(e.code, f"{method} {url} -> HTTP {e.code} {e.reason}\n{detail}") from None


class HTTPStatusError(RuntimeError):
    def __init__(self, code: int, message: str):
        super().__init__(message)
        self.code = code


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
    return {
        "href": href,
        "name": root.findtext(f"{NS}name") or "WebHome",
        "title": root.findtext(f"{NS}title") or "",
        "content": root.findtext(f"{NS}content") or "",
        "syntax": root.findtext(f"{NS}syntax") or "xwiki/2.1",
        "version": root.findtext(f"{NS}version") or "",
    }


def fetch_page(cfg: Config, href: str):
    """The wiki page at href, or None if there is none."""
    try:
        return get_page(cfg, href)
    except HTTPStatusError as e:
        if e.code == 404:
            return None
        raise


def put_page(cfg: Config, href: str, title: str, content: str) -> str:
    root = ET.Element(f"{NS}page")
    ET.SubElement(root, f"{NS}title").text = title
    ET.SubElement(root, f"{NS}content").text = content
    body = ET.tostring(root, encoding="utf-8", xml_declaration=True)
    _, resp_body = _request(cfg, "PUT", href, body=body, content_type="application/xml")
    resp_root = ET.fromstring(resp_body)
    return resp_root.findtext(f"{NS}version") or ""


def delete_page(cfg: Config, href: str):
    _request(cfg, "DELETE", href)


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


def pretty(href: str) -> str:
    """The readable tail of a REST URL, for printing."""
    idx = href.find("/spaces/")
    return urllib.parse.unquote(href[idx:] if idx != -1 else href)


# --- Local file format ---------------------------------------------------

def sanitize(name: str) -> str:
    # Characters Windows can't put in a file name become '-'; Windows also drops trailing dots.
    return INVALID_CHARS.sub("-", name).strip().rstrip(".").strip() or "untitled"


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


def read(path: Path):
    return split_front_matter(path.read_text(encoding="utf-8"))


def page_href_of(path: Path) -> str:
    return read(path)[0].get("href")


def load_state() -> dict:
    """href -> version of every page that was in sync at the last pull or push."""
    if STATE_FILE.exists():
        return json.loads(STATE_FILE.read_text(encoding="utf-8"))["pages"]
    return {}


def save_state(pending: dict):
    """Record the local pages that are on the wiki, plus deletions still to be pushed."""
    pages = dict(pending)
    for path in iter_local_files():
        meta, _ = read(path)
        if meta.get("href") and meta.get("version"):
            pages[meta["href"]] = meta["version"]
    STATE_FILE.write_text(json.dumps({"pages": dict(sorted(pages.items()))}, indent=1) + "\n", encoding="utf-8")


# --- The tree --------------------------------------------------------------

def node_of(href: str) -> tuple:
    """A page's place in the wiki: its space names, plus its page name if that isn't WebHome."""
    tokens = urllib.parse.urlparse(href).path.split("/")
    i = tokens.index("wikis") + 2  # skip 'wikis/<wiki>'
    node = []
    while i + 1 < len(tokens):
        kind, value = tokens[i], urllib.parse.unquote(tokens[i + 1])
        if kind == "spaces" or (kind == "pages" and value != "WebHome"):
            node.append(value)
        i += 2
    return tuple(node)


def managed(node: tuple) -> bool:
    """The home page, and everything outside the Main space (Main also holds XWiki's own pages)."""
    return node == HOME or (bool(node) and node[0] != HOME[0])


def is_index(path: Path) -> bool:
    return path.name == INDEX


def is_home(path: Path) -> bool:
    return path == CONTENT_DIR / INDEX


def iter_local_files():
    if not CONTENT_DIR.exists():
        return
    for path in sorted(CONTENT_DIR.rglob("*.xwiki")):
        rel = path.relative_to(CONTENT_DIR)
        if path.name.endswith(".remote.xwiki") or any(p.startswith(".") for p in rel.parts):
            continue
        if any(p.endswith(".attachments") for p in rel.parts[:-1]):
            continue
        yield path


def iter_page_folders():
    """Every folder that stands for a page, shallowest first."""
    for d in sorted((p for p in CONTENT_DIR.rglob("*") if p.is_dir()), key=lambda p: len(p.parts)):
        rel = d.relative_to(CONTENT_DIR)
        if any(p.startswith(".") or p.endswith(".attachments") for p in rel.parts):
            continue
        yield d


def attachments_dir(path: Path) -> Path:
    return path.parent / f"{path.stem}.attachments"


def iter_attachment_files(att_dir: Path):
    for local_path in sorted(att_dir.iterdir()):
        if not local_path.is_file():
            continue
        if local_path.name == ATTACHMENT_MANIFEST or ".remote." in local_path.name:
            continue
        yield local_path


def local_title(path: Path, meta: dict) -> str:
    """The title as edited locally: the file (or folder) name, unless only the 'title:' line changed.

    The 'title:' line keeps characters a file name can't hold (e.g. ':'), so it
    wins while the name still matches it.
    """
    title = meta.get("title", "")
    if is_home(path):
        return title or "Home"  # the content folder's own name is not a title
    name = path.parent.name if is_index(path) else path.stem
    if not title or sanitize(title) == name:
        return title or name
    synced = meta.get("synced_title")
    if synced and sanitize(synced) == name:
        return title  # name untouched, title line edited
    return name  # file or folder renamed


def plan_layout(titles: dict) -> dict:
    """Local path for each page node, given the title it should be filed under."""
    tree = set()
    for node in titles:
        if node != HOME:
            tree.update(node[:i] for i in range(1, len(node) + 1))
    has_children = {node[:-1] for node in tree}

    def base(node):
        return sanitize(titles[node]) if titles.get(node) else sanitize(node[-1])

    # Siblings filed under the same name get their space key appended.
    label, by_parent = {}, {}
    for node in tree:
        by_parent.setdefault(node[:-1], []).append(node)
    for siblings in by_parent.values():
        counts = {}
        for node in siblings:
            counts[base(node).lower()] = counts.get(base(node).lower(), 0) + 1
        for node in siblings:
            b = base(node)
            label[node] = f"{b} [{sanitize(node[-1])}]" if counts[b.lower()] > 1 else b

    def folder(node):
        return CONTENT_DIR if not node else folder(node[:-1]) / label[node]

    plan = {}
    for node in titles:
        if node == HOME:
            plan[node] = CONTENT_DIR / INDEX
        elif node in has_children:
            plan[node] = folder(node) / INDEX
        else:
            plan[node] = folder(node[:-1]) / f"{label[node]}.xwiki"
    return plan


def companions(path: Path):
    """A page file plus what travels with it: attachments and an unmerged remote copy."""
    items = [path]
    for extra in (attachments_dir(path), path.with_name(f"{path.stem}.remote.xwiki")):
        if extra.exists():
            items.append(extra)
    return items


def remove_empty_folders():
    for d in sorted((p for p in CONTENT_DIR.rglob("*") if p.is_dir()), key=lambda p: len(p.parts), reverse=True):
        if not any(d.iterdir()):
            d.rmdir()


def relayout(titles: dict = None) -> int:
    """Move local files to where their titles and tree position put them.

    'titles' overrides the title for some nodes (pull uses it for titles that
    just came from the wiki); every other file is filed under local_title().
    """
    titles = dict(titles or {})
    current = {}
    for path in iter_local_files():
        meta, _ = read(path)
        if not meta.get("href"):
            continue  # a new page; push gives it an address
        node = node_of(meta["href"])
        current[node] = path
        titles.setdefault(node, local_title(path, meta))
    titles = {n: t for n, t in titles.items() if n in current and managed(n)}

    plan = plan_layout(titles)
    moves = [(current[n], plan[n]) for n in titles if str(current[n]) != str(plan[n])]
    if not moves:
        return 0

    # Two phases, so a file can move to where another one is just leaving.
    staging = CONTENT_DIR / ".relayout"
    staged = []
    for i, (src, dst) in enumerate(moves):
        tmp = staging / str(i)
        tmp.mkdir(parents=True)
        for item in companions(src):
            shutil.move(str(item), str(tmp / item.name))
        staged.append((tmp, src.stem, dst))
    for tmp, old_stem, dst in staged:
        dst.parent.mkdir(parents=True, exist_ok=True)
        for item in tmp.iterdir():
            shutil.move(str(item), str(dst.parent / (dst.stem + item.name[len(old_stem):])))
    shutil.rmtree(staging)
    remove_empty_folders()
    for src, dst in moves:
        print(f"MOVED {src.relative_to(CONTENT_DIR)} -> {dst.relative_to(CONTENT_DIR)}")
    return len(moves)


def space_href_of_folder(cfg: Config, folder: Path) -> str:
    """The REST space URL that pages filed in a local folder belong to."""
    if folder == CONTENT_DIR:
        return rest_root(cfg)  # top-level pages hang off the wiki itself
    for own in (folder / INDEX, folder.parent / f"{folder.name}.xwiki"):  # the latter: gaining children
        if own.exists():
            meta, _ = read(own)
            href = meta.get("href") or derive_href(cfg, own, local_title(own, meta))
            return href[: href.rfind("/pages/")]
    return space_href_of_folder(cfg, folder.parent) + f"/spaces/{urllib.parse.quote(folder.name, safe='')}"


def derive_href(cfg: Config, path: Path, title: str) -> str:
    """Address for a page not yet on the wiki: a child of the folder it sits in, keyed by its title."""
    if is_home(path):
        return rest_root(cfg) + "/spaces/Main/pages/WebHome"
    folder = path.parent.parent if is_index(path) else path.parent
    return space_href_of_folder(cfg, folder) + f"/spaces/{urllib.parse.quote(title, safe='')}/pages/WebHome"


def layout_notes() -> list:
    """Local states that push will tidy up before uploading. No changes made."""
    notes = []
    for d in iter_page_folders():
        if d == CONTENT_DIR or (d / INDEX).exists():
            continue
        if (d.parent / f"{d.name}.xwiki").exists():
            notes.append(f"{d.relative_to(CONTENT_DIR)}.xwiki gained children: push moves it into {d.name}/{INDEX}")
        else:
            notes.append(f"{d.relative_to(CONTENT_DIR)}/ has no {INDEX}: push creates the folder's page, empty")
    return notes


def prepare_local(cfg: Config) -> list:
    """Bring wiki-content/ in line with the layout before a push. Local only.

    - Every folder is a page: a file of the same name next to it moves in as its
      '0 Index.xwiki' (the page gained children); otherwise it gets an empty one.
    - Every file gets an address, derived from where it sits.
    - Files are re-filed under their titles; a folder left with only its
      '0 Index.xwiki' becomes a plain file again.
    Returns notes on what was changed, for printing.
    """
    notes = []
    for d in iter_page_folders():
        if d == CONTENT_DIR or (d / INDEX).exists():
            continue
        sibling = d.parent / f"{d.name}.xwiki"
        rel = d.relative_to(CONTENT_DIR)
        if sibling.exists():
            for item in companions(sibling):
                shutil.move(str(item), str(d / ("0 Index" + item.name[len(sibling.stem):])))
            notes.append(f"MOVED {rel}.xwiki -> {rel}/{INDEX} (the page gained children)")
        else:
            write_local_file(d / INDEX, {"title": d.name, "syntax": "xwiki/2.1"}, "")
            notes.append(f"NEW PAGE {rel}/ (empty)")

    for path in sorted(iter_local_files(), key=lambda p: len(p.parts)):
        meta, content = read(path)
        if not meta.get("href"):
            meta["title"] = local_title(path, meta)
            meta["href"] = derive_href(cfg, path, meta["title"])
            meta.setdefault("syntax", "xwiki/2.1")
            write_local_file(path, meta, content)

    relayout()
    return notes


# --- Commands --------------------------------------------------------------

def pull_attachments(cfg: Config, page: dict, att_dir: Path, stats: dict):
    attachments = list_attachments(cfg, page["href"])
    if not attachments:
        return
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
                conflict_path.write_bytes(download_attachment(cfg, att["href"]))
                stats["attachments_conflicts"] += 1
                print(f"CONFLICT: {att_path} changed locally AND on the wiki.")
                print(f"          Remote version saved to {conflict_path} for manual merge.")
                continue
        elif att_path.exists() and att["size"] is not None and str(att_path.stat().st_size) == att["size"]:
            # first time tracking this file and it already matches
            manifest[fname] = {"size": att["size"], "sha256": sha256_bytes(att_path.read_bytes()), "version": att["version"]}
            dirty_manifest = True
            continue

        att_dir.mkdir(parents=True, exist_ok=True)
        data = download_attachment(cfg, att["href"])
        att_path.write_bytes(data)
        manifest[fname] = {"size": att["size"], "sha256": sha256_bytes(data), "version": att["version"]}
        dirty_manifest = True
        stats["attachments_pulled"] += 1

    if dirty_manifest:
        save_attachment_manifest(att_dir, manifest)


def list_remote_pages(cfg: Config):
    pages = []
    for pages_href in list_spaces(cfg):
        if node_of(pages_href)[0] in cfg.exclude_spaces:
            continue
        for page_href in list_pages(cfg, pages_href):
            page = fetch_page(cfg, page_href)
            if page is not None:  # a listing can still name a page just deleted
                pages.append(page)
    return pages


def cmd_pull(cfg: Config):
    stats = dict.fromkeys(["pulled", "kept_local", "conflicts", "restored", "removed", "pending_delete",
                           "attachments_pulled", "attachments_kept_local", "attachments_conflicts"], 0)
    state = load_state()
    pages = list_remote_pages(cfg)

    # Existing files are found by address, wherever they are filed.
    local, titles = {}, {}
    for path in iter_local_files():
        meta, _ = read(path)
        if meta.get("href"):
            node = node_of(meta["href"])
            local[node] = path
            titles[node] = local_title(path, meta)
    local_hrefs = {read(p)[0]["href"] for p in local.values()}
    pending = {h: v for h, v in state.items() if h not in local_hrefs}  # deleted here, not yet on the wiki

    wanted, new_meta = [], {}
    for page in pages:
        node = node_of(page["href"])
        if page["href"] in pending:
            if page["version"] == pending[page["href"]]:
                stats["pending_delete"] += 1
                continue  # push will delete it
            del pending[page["href"]]  # edited on the wiki since: bring it back
            stats["restored"] += 1
            print(f"RESTORED {pretty(page['href'])}: deleted here, but changed on the wiki since.")
        if not managed(node):
            print(f"SKIP {pretty(page['href'])}: the Main space is outside the synced tree.")
            continue
        path = local.get(node)
        meta = {"href": page["href"], "title": page["title"], "synced_title": page["title"],
                "syntax": page["syntax"], "version": page["version"], "hash": sha256(page["content"])}
        if path is not None:
            old = read(path)[0]
            # A retitle you haven't pushed survives, unless the wiki retitled it too.
            if titles[node] != old.get("synced_title") and page["title"] == old.get("synced_title"):
                meta["title"] = titles[node]
        titles[node] = meta["title"]
        new_meta[node] = meta
        wanted.append(page)
    plan = plan_layout({n: t for n, t in titles.items() if managed(n)})

    for page in wanted:
        node = node_of(page["href"])
        file_path = local.get(node) or plan[node]
        meta = new_meta[node]
        if file_path.exists():
            old_meta, old_content = read(file_path)
            if old_meta.get("hash") and sha256(old_content) != old_meta["hash"]:
                if old_meta.get("version") == page["version"]:
                    stats["kept_local"] += 1
                    pull_attachments(cfg, page, attachments_dir(file_path), stats)
                    continue
                conflict_path = file_path.with_name(file_path.stem + ".remote.xwiki")
                write_local_file(conflict_path, meta, page["content"])
                stats["conflicts"] += 1
                print(f"CONFLICT: {file_path.relative_to(CONTENT_DIR)} has local edits AND the wiki changed.")
                print(f"          Remote version saved to {conflict_path.name} for manual merge.")
                continue
        else:
            file_path.parent.mkdir(parents=True, exist_ok=True)
        write_local_file(file_path, meta, page["content"])
        stats["pulled"] += 1
        pull_attachments(cfg, page, attachments_dir(file_path), stats)

    # Pages that were in sync last time and are gone from the wiki now.
    seen = {p["href"] for p in pages}
    for href in [h for h in state if h not in seen]:
        if fetch_page(cfg, href) is not None:
            continue  # in an excluded space, or listed late; still there
        pending.pop(href, None)
        path = local.get(node_of(href))
        if path is None:
            continue
        meta, content = read(path)
        if meta.get("hash") == sha256(content) and local_title(path, meta) == meta.get("synced_title"):
            for item in companions(path):
                shutil.rmtree(item) if item.is_dir() else item.unlink()
            stats["removed"] += 1
            print(f"REMOVED {path.relative_to(CONTENT_DIR)}: deleted on the wiki.")
        else:
            print(f"KEPT {path.relative_to(CONTENT_DIR)}: deleted on the wiki, but edited here. "
                  f"Delete the file, or remove its 'version:' line to recreate the page.")

    remove_empty_folders()
    relayout(titles)
    save_state(pending)
    print(
        f"Pulled {stats['pulled']} page(s) into {CONTENT_DIR}. {stats['kept_local']} kept local edits, "
        f"{stats['conflicts']} conflict(s), {stats['removed']} removed (deleted on the wiki), "
        f"{stats['restored']} restored, {stats['pending_delete']} awaiting deletion by push.\n"
        f"Attachments: {stats['attachments_pulled']} downloaded, {stats['attachments_kept_local']} kept local edits, "
        f"{stats['attachments_conflicts']} conflict(s)."
    )
    for note in layout_notes():
        print(note)
    outline.main()


def push_file(cfg: Config, path: Path) -> bool:
    meta, content = read(path)
    meta["title"] = local_title(path, meta)
    if not meta.get("href"):
        meta["href"] = derive_href(cfg, path, meta["title"])
    local_hash = sha256(content)
    rel = path.relative_to(CONTENT_DIR)

    if not meta.get("version"):  # never been on the wiki
        if fetch_page(cfg, meta["href"]) is not None:
            print(f"CONFLICT {rel}: a page already exists at this address on the wiki. Run 'pull' first.")
            return False
        version = put_page(cfg, meta["href"], meta["title"], content)
        meta.update(version=version, hash=local_hash, synced_title=meta["title"])
        write_local_file(path, meta, content)
        print(f"CREATED {rel} -> version {version}")
        return True

    if meta.get("hash") == local_hash and meta["title"] == meta.get("synced_title"):
        return False  # nothing changed since the last sync
    remote = fetch_page(cfg, meta["href"])
    if remote is None:
        print(f"GONE {rel}: no longer on the wiki (deleted?). Remove the file, or its 'version:' line to recreate it.")
        return False
    if remote["version"] != meta.get("version"):
        print(f"CONFLICT {rel}: wiki version is {remote['version']}, "
              f"but your last sync was {meta.get('version')}. Run 'pull' first.")
        return False

    version = put_page(cfg, meta["href"], meta["title"], content)
    meta.update(version=version, hash=local_hash, synced_title=meta["title"])
    write_local_file(path, meta, content)
    print(f"PUSHED {rel} -> version {version}")
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
        print(f"PUSHED attachment {local_path.relative_to(CONTENT_DIR)} -> version {new_version}")

    if dirty_manifest:
        save_attachment_manifest(att_dir, manifest)
    return pushed


def pending_deletions(state: dict) -> dict:
    """Pages that were in sync last time and whose files are gone: href -> last synced version."""
    local_hrefs = {read(p)[0].get("href") for p in iter_local_files()}
    return {h: v for h, v in state.items() if h not in local_hrefs}


def confirm(question: str) -> bool:
    try:
        return input(f"{question} [y/N] ").strip().lower() in ("y", "yes")
    except EOFError:
        return False


def cmd_push(cfg: Config, target: str, yes: bool):
    target_path = Path(target).resolve() if target else None
    if target_path and not target_path.exists():
        sys.exit(f"No such file: {target_path}")
    target_node = None
    if target_path and target_path.suffix == ".xwiki" and read(target_path)[0].get("href"):
        target_node = node_of(read(target_path)[0]["href"])

    for note in prepare_local(cfg):
        print(note)
    state = load_state()

    paths = list(iter_local_files())
    if target_path:
        if target_node is not None:  # follow it if prepare_local re-filed it
            paths = [p for p in paths if node_of(read(p)[0]["href"]) == target_node]
        else:
            paths = [p for p in paths if p == target_path]
        if not paths:
            sys.exit(f"{target} was re-filed by the layout step; push it at its new location.")

    pushed_pages = pushed_attachments = 0
    for path in sorted(paths, key=lambda p: len(p.parts)):  # parents first
        if push_file(cfg, path):
            pushed_pages += 1
        att = attachments_dir(path)
        if att.is_dir() and read(path)[0].get("version"):
            pushed_attachments += push_attachments(cfg, read(path)[0]["href"], att)

    # Deletions only on a full push, after everything new is up.
    pending = pending_deletions(state)
    deleted = 0
    if pending and not target_path:
        home = rest_root(cfg) + "/spaces/Main/pages/WebHome"
        if home in pending:
            print(f"KEEP the home page: wiki-content/{INDEX} is missing, but the home page is never deleted.")
            del pending[home]
        hrefs = sorted(pending, key=lambda h: h.count("/spaces/"), reverse=True)  # children first
        if hrefs:
            print(f"\n{len(hrefs)} page(s) deleted locally, to be deleted on the wiki:")
            for href in hrefs:
                print(f"  {pretty(href)}")
        if hrefs and (yes or confirm("\nDelete these pages from the wiki?")):
            for href in hrefs:
                remote = fetch_page(cfg, href)
                if remote is None:
                    del state[href]
                    continue
                if remote["version"] != pending[href]:
                    print(f"CONFLICT {pretty(href)}: changed on the wiki since your last sync "
                          f"({pending[href]} -> {remote['version']}). Not deleted; 'pull' brings it back.")
                    continue
                delete_page(cfg, href)
                del state[href]
                deleted += 1
                print(f"DELETED {pretty(href)}")
        elif hrefs:
            print("Deletions skipped; they stay pending. Pass --yes to confirm without a prompt.")

    relayout()  # retitled pages: file them under their new names
    save_state(pending_deletions(state))
    print(f"Done. Pushed {pushed_pages} page(s), {pushed_attachments} attachment(s); deleted {deleted} page(s).")
    outline.main()


def cmd_status():
    """What push would do, from local files only."""
    groups = {"NEW": [], "CHANGED": [], "RETITLED": []}
    for path in iter_local_files():
        meta, content = read(path)
        rel = str(path.relative_to(CONTENT_DIR))
        if not meta.get("version"):
            groups["NEW"].append(rel)
        elif meta.get("hash") != sha256(content):
            groups["CHANGED"].append(rel)
        elif local_title(path, meta) != meta.get("synced_title"):
            groups["RETITLED"].append(f"{rel}  ({meta.get('synced_title')} -> {local_title(path, meta)})")
    attachments = []
    for att_dir in sorted(CONTENT_DIR.rglob("*.attachments")):
        manifest = load_attachment_manifest(att_dir)
        for local_path in iter_attachment_files(att_dir):
            entry = manifest.get(local_path.name)
            if not entry or entry.get("sha256") != sha256_bytes(local_path.read_bytes()):
                attachments.append(str(local_path.relative_to(CONTENT_DIR)))
    deletions = [pretty(h) for h in sorted(pending_deletions(load_state()))]

    for note in layout_notes():
        print(note)
    if not any(groups.values()) and not attachments and not deletions:
        print("No local changes.")
        return
    for label, items in list(groups.items()) + [("ATTACHMENT", attachments), ("DELETE", deletions)]:
        if items:
            print(f"{label} ({len(items)}):")
            for item in items:
                print(f"  {item}")


def main():
    parser = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    sub = parser.add_subparsers(dest="command", required=True)
    sub.add_parser("pull", help="Download pages and attachments into wiki-content/")
    p_push = sub.add_parser("push", help="Create, update, retitle and delete pages on the wiki")
    p_push.add_argument("file", nargs="?", default=None,
                        help="One .xwiki file (default: everything, including deletions)")
    p_push.add_argument("--yes", action="store_true", help="Delete pages without asking")
    sub.add_parser("status", help="What push would do (no network)")
    sub.add_parser("layout", help="Re-file pages under their titles (no network)")
    sub.add_parser("outline", help="Regenerate OUTLINE.md from the local files (no network)")
    args = parser.parse_args()

    if args.command == "outline":
        return outline.main()
    if args.command == "status":
        return cmd_status()
    if args.command == "layout":
        print(f"Moved {relayout()} page(s).")
        return

    cfg = load_config()
    if args.command == "pull":
        cmd_pull(cfg)
    elif args.command == "push":
        cmd_push(cfg, args.file, args.yes)


if __name__ == "__main__":
    sys.exit(main() or 0)
