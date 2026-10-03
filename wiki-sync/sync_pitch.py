#!/usr/bin/env python3
"""Two-way sync between tmp-pitch/ and the 'tmp: Pitch' tree on the wiki.

sync.py mirrors the rest of the wiki into wiki-content/, one folder per space
with a WebHome.xwiki inside. The Pitch tree has its own layout, which reads the
way the wiki does:

  - a page without children is a file, '<title>.xwiki';
  - a page with children is a folder, '<title>/'. It has no content of its own;
    what it has to say goes into a '0 Index' child. Its address and exact
    title sit in a hidden '.page.xwiki' inside the folder;
  - tmp-pitch/ itself is the 'tmp: Pitch' page.

Each file's 'href:' line ties it to its wiki page, so files can be renamed and
moved: renaming a file or folder retitles the page on push, and a retitle on
the wiki renames it on pull. New files and folders become new pages on push.

Usage:
    python3 sync_pitch.py pull            # download the tree into tmp-pitch/
    python3 sync_pitch.py status          # list local changes
    python3 sync_pitch.py push [file]     # create, update and retitle pages
    python3 sync_pitch.py layout          # re-file pages under their titles (no network)

sync.py must leave the tree alone: XWIKI_EXCLUDE_SPACES in .env has to name
'tmp: Pitch'.
"""
import argparse
import shutil
import sys
import urllib.parse
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))
import sync  # noqa: E402  (credentials, REST calls and the file format are shared)

ROOT_KEY = "tmp: Pitch"
LOCAL_ROOT = Path(__file__).resolve().parent.parent / "tmp-pitch"
PAGE_FILE = ".page.xwiki"
INDEX_TITLE = "0 Index"


# --- Wiki side ---------------------------------------------------------------

def root_space_href(cfg) -> str:
    return f"{sync.rest_root(cfg)}/spaces/{urllib.parse.quote(ROOT_KEY, safe='')}"


def node_of(href: str) -> tuple:
    """A page's place below 'tmp: Pitch': its space keys, plus its name if that isn't WebHome."""
    tokens = urllib.parse.urlparse(href).path.split("/")
    i = tokens.index("wikis") + 2  # skip 'wikis/<wiki>'
    node = []
    while i + 1 < len(tokens):
        kind, value = tokens[i], urllib.parse.unquote(tokens[i + 1])
        if kind == "spaces" or (kind == "pages" and value != "WebHome"):
            node.append(value)
        i += 2
    if node[:1] != [ROOT_KEY]:
        raise ValueError(f"{href} is not below '{ROOT_KEY}'")
    return tuple(node[1:])


def fetch_page(cfg, href: str):
    """The wiki page at href, or None if there is none."""
    try:
        return sync.get_page(cfg, href)
    except RuntimeError as e:
        if "-> HTTP 404 " in str(e):  # sync._request reports HTTP errors this way
            return None
        raise


def list_remote_pages(cfg):
    root = root_space_href(cfg)
    pages = []
    for pages_href in sync.list_spaces(cfg):
        space_href = pages_href[: -len("/pages")] if pages_href.endswith("/pages") else pages_href
        if space_href != root and not space_href.startswith(root + "/spaces/"):
            continue
        for page_href in sync.list_pages(cfg, pages_href):
            page = fetch_page(cfg, page_href)
            if page is not None:  # a listing can still name a page just deleted
                pages.append(page)
    return pages


def require_excluded(cfg):
    if ROOT_KEY not in cfg.exclude_spaces:
        sys.exit(f"Add '{ROOT_KEY}' to XWIKI_EXCLUDE_SPACES in wiki-sync/.env first, "
                 f"so that sync.py doesn't mirror it into wiki-content/ too.")


# --- Local side --------------------------------------------------------------

def sanitize(name: str) -> str:
    # Windows drops trailing dots from file names, so drop them here too.
    return sync.sanitize(name).rstrip(".").strip() or "untitled"


def read(path: Path):
    return sync.split_front_matter(path.read_text(encoding="utf-8"))


def iter_local_files():
    if not LOCAL_ROOT.exists():
        return
    for path in sorted(LOCAL_ROOT.rglob("*.xwiki")):
        if path.name.endswith(".remote.xwiki") or ".relayout" in path.parts:
            continue
        yield path


def attachments_dir(path: Path) -> Path:
    return path.parent / f"{path.stem}.attachments"


def local_title(path: Path, meta: dict) -> str:
    """The title as edited locally: the file (or folder) name, unless only the 'title:' line changed.

    The 'title:' line keeps characters a file name can't hold (e.g. ':'), so it
    wins while the name still matches it.
    """
    title = meta.get("title", "")
    if path == LOCAL_ROOT / PAGE_FILE:
        return title or ROOT_KEY  # the root folder's name is fixed
    name = path.parent.name if path.name == PAGE_FILE else path.stem
    if not title:
        return name
    if sanitize(title) == name or path.name == "WebHome.xwiki":  # WebHome: imported, not yet filed
        return title
    synced = meta.get("synced_title")
    if synced and sanitize(synced) == name:
        return title  # name untouched, title line edited
    return name  # file or folder renamed


def plan_layout(titles: dict) -> dict:
    """Local path for each page node, given the title it should be filed under."""
    tree = set()
    for node in titles:
        tree.update(node[:i] for i in range(1, len(node) + 1))
    has_children = {node[:-1] for node in tree}

    def base(node):
        return sanitize(titles[node]) if titles.get(node) else sanitize(node[-1])

    # Siblings filed under the same name get their space key appended.
    label = {}
    by_parent = {}
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
        return LOCAL_ROOT if not node else folder(node[:-1]) / label[node]

    return {
        node: folder(node) / PAGE_FILE if not node or node in has_children
        else folder(node[:-1]) / f"{label[node]}.xwiki"
        for node in titles
    }


def companions(path: Path):
    """A page file plus what travels with it: attachments and an unmerged remote copy."""
    items = [path]
    for extra in (attachments_dir(path), path.with_name(f"{path.stem}.remote.xwiki")):
        if extra.exists():
            items.append(extra)
    return items


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
    titles = {n: t for n, t in titles.items() if n in current}

    plan = plan_layout(titles)
    moves = [(current[n], plan[n]) for n in current if str(current[n]) != str(plan[n])]
    if not moves:
        return 0

    # Two phases, so a file can move to where another one is just leaving.
    staging = LOCAL_ROOT / ".relayout"
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

    for d in sorted((p for p in LOCAL_ROOT.rglob("*") if p.is_dir()), key=lambda p: len(p.parts), reverse=True):
        if not any(d.iterdir()):
            d.rmdir()
    for src, dst in moves:
        print(f"MOVED {src.relative_to(LOCAL_ROOT)} -> {dst.relative_to(LOCAL_ROOT)}")
    return len(moves)


def space_href_of_folder(cfg, folder: Path) -> str:
    """The REST space URL that pages in a local folder belong to."""
    if folder == LOCAL_ROOT:
        return root_space_href(cfg)
    for own in (folder / PAGE_FILE, folder.parent / f"{folder.name}.xwiki"):  # the latter: gaining children
        if own.exists():
            meta, _ = read(own)
            href = meta.get("href") or derive_href(cfg, own, local_title(own, meta))
            return href[: href.rfind("/pages/")]
    return space_href_of_folder(cfg, folder.parent) + f"/spaces/{urllib.parse.quote(folder.name, safe='')}"


def derive_href(cfg, path: Path, title: str) -> str:
    """Address for a page not yet on the wiki: a child of the folder it sits in, keyed by title."""
    if path == LOCAL_ROOT / PAGE_FILE:
        return root_space_href(cfg) + "/pages/WebHome"
    folder = path.parent.parent if path.name == PAGE_FILE else path.parent
    return space_href_of_folder(cfg, folder) + f"/spaces/{urllib.parse.quote(title, safe='')}/pages/WebHome"


def parents_with_content():
    for page in sorted(LOCAL_ROOT.rglob(PAGE_FILE)):
        meta, content = read(page)
        if content.strip():
            yield page, meta, content


def prepare_local(cfg) -> list:
    """Bring tmp-pitch/ in line with the conventions before a push. Local only.

    - Every folder is a page: one without a '.page.xwiki' gets an empty one.
    - Every file gets an address, derived from where it sits.
    - Files are filed under their titles (a page that gained children becomes a folder).
    - A folder's page with content hands it to a new '0 Index' child.
    Returns notes on what was changed, for printing.
    """
    notes = []
    if not (LOCAL_ROOT / PAGE_FILE).exists():
        sync.write_local_file(LOCAL_ROOT / PAGE_FILE, {"title": ROOT_KEY, "syntax": "xwiki/2.1"}, "")
    for d in sorted(p for p in LOCAL_ROOT.rglob("*") if p.is_dir()):
        if d.name.endswith(".attachments") or any(part.startswith(".") for part in d.relative_to(LOCAL_ROOT).parts):
            continue
        if not (d / PAGE_FILE).exists() and not (d.parent / f"{d.name}.xwiki").exists():
            sync.write_local_file(d / PAGE_FILE, {"title": d.name, "syntax": "xwiki/2.1"}, "")
            notes.append(f"NEW PAGE {d.relative_to(LOCAL_ROOT)}/ (empty parent page)")

    def assign_addresses():
        for path in sorted(iter_local_files(), key=lambda p: len(p.parts)):
            meta, content = read(path)
            if not meta.get("href"):
                meta["title"] = local_title(path, meta)
                meta["href"] = derive_href(cfg, path, meta["title"])
                meta.setdefault("syntax", "xwiki/2.1")
                sync.write_local_file(path, meta, content)

    assign_addresses()
    relayout()

    for page, meta, content in list(parents_with_content()):
        index = page.parent / f"{INDEX_TITLE}.xwiki"
        where = page.parent.relative_to(LOCAL_ROOT)
        if index.exists():
            notes.append(f"SKIP {where}/: has content and a '{INDEX_TITLE}' child already; merge them by hand.")
            continue
        sync.write_local_file(index, {"title": INDEX_TITLE, "syntax": meta.get("syntax", "xwiki/2.1")}, content)
        att = attachments_dir(page)
        if att.is_dir():
            dst = attachments_dir(index)
            shutil.move(str(att), str(dst))
            (dst / sync.ATTACHMENT_MANIFEST).unlink(missing_ok=True)  # a new page: upload them all
        sync.write_local_file(page, meta, "")
        notes.append(f"MOVED content of {where}/ into its '{INDEX_TITLE}' child")

    assign_addresses()
    return notes


def report_parents_with_content():
    parents = [page for page, _, _ in parents_with_content()]
    if parents:
        print(f"Pages with children that hold content; the next push moves it into a '{INDEX_TITLE}' child:")
        for page in parents:
            print(f"  {page.parent.relative_to(LOCAL_ROOT)}/")


# --- Commands ----------------------------------------------------------------

def cmd_pull(cfg):
    stats = dict.fromkeys(["pulled", "kept_local", "conflicts", "attachments_pulled", "attachments_skipped",
                           "attachments_kept_local", "attachments_conflicts"], 0)
    pages = list_remote_pages(cfg)

    # Existing files are found by address, wherever they are filed. A file you
    # renamed but haven't pushed keeps your title; otherwise the wiki's wins.
    local, titles = {}, {}
    for path in iter_local_files():
        meta, _ = read(path)
        if meta.get("href"):
            node = node_of(meta["href"])
            local[node] = path
            titles[node] = local_title(path, meta)
    for page in pages:
        node = node_of(page["href"])
        path = local.get(node)
        if path is None or titles[node] == read(path)[0].get("title"):
            titles[node] = page["title"]
    plan = plan_layout(titles)

    for page in pages:
        node = node_of(page["href"])
        file_path = local.get(node) or plan[node]
        new_meta = {
            "href": page["href"], "title": page["title"], "synced_title": page["title"],
            "syntax": page["syntax"], "version": page["version"], "hash": sync.sha256(page["content"]),
        }
        # sync.pull_attachments files them under '<page name>.attachments'; ours go by file name.
        att_page = dict(page, name=file_path.stem)

        if file_path.exists():
            old_meta, old_content = read(file_path)
            if old_meta.get("hash") and sync.sha256(old_content) != old_meta["hash"]:
                if old_meta.get("version") == page["version"]:
                    stats["kept_local"] += 1
                    sync.pull_attachments(cfg, att_page, file_path, stats)
                    continue
                conflict_path = file_path.with_name(file_path.stem + ".remote.xwiki")
                sync.write_local_file(conflict_path, new_meta, page["content"])
                stats["conflicts"] += 1
                print(f"CONFLICT: {file_path} has local edits AND the wiki changed.")
                print(f"          Remote version saved to {conflict_path} for manual merge.")
                continue
        else:
            file_path.parent.mkdir(parents=True, exist_ok=True)

        sync.write_local_file(file_path, new_meta, page["content"])
        stats["pulled"] += 1
        sync.pull_attachments(cfg, att_page, file_path, stats)

    relayout(titles)
    print(f"Pulled {stats['pulled']} page(s) into {LOCAL_ROOT}. {stats['kept_local']} kept local edits, "
          f"{stats['conflicts']} conflict(s). Attachments: {stats['attachments_pulled']} downloaded, "
          f"{stats['attachments_kept_local']} kept local edits, {stats['attachments_conflicts']} conflict(s).")
    report_parents_with_content()


def push_file(cfg, path: Path) -> bool:
    meta, content = read(path)
    meta["title"] = local_title(path, meta)
    if not meta.get("href"):
        meta["href"] = derive_href(cfg, path, meta["title"])
    local_hash = sync.sha256(content)
    rel = path.relative_to(LOCAL_ROOT)
    remote = fetch_page(cfg, meta["href"])

    if not meta.get("version"):  # never been on the wiki
        if remote is not None:
            print(f"CONFLICT {rel}: a page already exists at this address on the wiki. Run 'pull' first.")
            return False
        version = sync.put_page(cfg, meta["href"], meta["title"], content)
        meta.update(version=version, hash=local_hash, synced_title=meta["title"])
        sync.write_local_file(path, meta, content)
        print(f"CREATED {rel} -> version {version}")
        return True

    if remote is None:
        print(f"GONE {rel}: no longer on the wiki (deleted?). Remove the file, or its 'version:' line to recreate it.")
        return False
    if meta.get("hash") == local_hash and meta["title"] == remote["title"]:
        return False  # nothing changed
    if remote["version"] != meta.get("version"):
        print(f"CONFLICT {rel}: wiki version is {remote['version']}, "
              f"but your last sync was {meta.get('version')}. Run 'pull' first.")
        return False

    version = sync.put_page(cfg, meta["href"], meta["title"], content)
    meta.update(version=version, hash=local_hash, synced_title=meta["title"])
    sync.write_local_file(path, meta, content)
    print(f"PUSHED {rel} -> version {version}")
    return True


def cmd_push(cfg, target: str):
    target_path = Path(target).resolve() if target else None
    if target_path and not target_path.exists():
        sys.exit(f"No such file: {target_path}")
    target_node = None
    if target_path and target_path.suffix == ".xwiki" and read(target_path)[0].get("href"):
        target_node = node_of(read(target_path)[0]["href"])

    for note in prepare_local(cfg):
        print(note)

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
        if att.is_dir():
            pushed_attachments += sync.push_attachments(cfg, read(path)[0]["href"], att)

    relayout()  # retitled pages: file them under their new names
    print(f"Done. Pushed {pushed_pages} page(s), {pushed_attachments} attachment(s).")


def cmd_status():
    dirty = []
    for path in iter_local_files():
        meta, content = read(path)
        retitled = local_title(path, meta) != meta.get("synced_title")
        if not meta.get("version") or meta.get("hash") != sync.sha256(content) or retitled:
            dirty.append(path)
    for att_dir in sorted(LOCAL_ROOT.rglob("*.attachments")):
        manifest = sync.load_attachment_manifest(att_dir)
        for local_path in sync.iter_attachment_files(att_dir):
            entry = manifest.get(local_path.name)
            if not entry or entry.get("sha256") != sync.sha256_bytes(local_path.read_bytes()):
                dirty.append(local_path)

    report_parents_with_content()
    if not dirty:
        print("No local changes.")
        return
    print("Not yet on the wiki, or changed since the last sync:")
    for path in dirty:
        print(f"  {path.relative_to(LOCAL_ROOT)}")


def main():
    parser = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    sub = parser.add_subparsers(dest="command", required=True)
    sub.add_parser("pull", help="Download the tree into tmp-pitch/")
    p_push = sub.add_parser("push", help="Create, update and retitle pages from tmp-pitch/")
    p_push.add_argument("file", nargs="?", default=None, help="One .xwiki file (default: all)")
    sub.add_parser("status", help="List local changes (no network)")
    sub.add_parser("layout", help="Re-file pages under their titles (no network)")
    args = parser.parse_args()

    if args.command == "status":
        return cmd_status()
    if args.command == "layout":
        print(f"Moved {relayout()} page(s).")
        return

    cfg = sync.load_config()
    require_excluded(cfg)
    if args.command == "pull":
        cmd_pull(cfg)
    elif args.command == "push":
        cmd_push(cfg, args.file)


if __name__ == "__main__":
    sys.exit(main() or 0)
