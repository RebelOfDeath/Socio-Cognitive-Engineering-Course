#!/usr/bin/env python3
"""Move wiki pages to the places wiki-content/ files them, keeping their history.

'sync.py push' gives a page that changed place a new address by creating it
anew and deleting the old one, which loses the old page's history. This script
moves pages with XWiki's own Move/Rename action instead: history and
attachments go along, links to the page are updated, and no redirect is left
at the old address. It then ties the local file to the new address, so the
next push uploads the local text as one more version.

The moves are listed in moves.json next to this script, one per page:

    "from"     the page's path on the wiki now, e.g. "Main/sdf/Stakeholders"
    "to"       its local file; the page moves to the address push would give it
    "keep"     "local": the local text replaces the page's on the next push;
               "server": the page's text stays as it is on the wiki, and is
               downloaded into the local file
    "version"  the page version the move was planned against; if the wiki has
               moved on since, the move stops so the new edits can be looked at.
               Versions the moves make themselves (XWiki updating links to a moved
               page) are taken in after each move, here and in the local files.

A page filed as a folder's '0 Index.xwiki' takes the pages under it that are
not in the plan along with it, so the planned pages under it must move first.
Any other page moves alone.

Usage:
    python3 move.py status             # the plan, checked against the wiki (no changes)
    python3 move.py run <from> [...]   # move these pages, in this order
    python3 move.py refresh            # take in newer versions that leave the text as it was
"""
import argparse
import difflib
import json
import re
import sys
import time
import urllib.parse
from datetime import datetime, timedelta
from html.parser import HTMLParser
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))
import outline  # noqa: E402  (needs the path insert above)
import sync  # noqa: E402

PLAN_FILE = sync.MOVE_PLAN
WAIT_SECONDS = 120


def space_reference(names) -> str:
    """Space names the way XWiki writes them in a reference: 'A.B', with '.', ':' and '\\' escaped."""
    return ".".join(re.sub(r"([\\.:])", r"\\\1", name) for name in names)


def view_url(cfg, href: str, query: str) -> str:
    path = "".join(urllib.parse.quote(name, safe="") + "/" for name in sync.node_of(href))
    return f"{cfg.base_url}/wiki/{cfg.wiki}/view/{path}?{query}"


def load_moves(cfg) -> list:
    moves = []
    for entry in json.loads(PLAN_FILE.read_text(encoding="utf-8")):
        if entry.get("keep") not in ("local", "server"):
            sys.exit(f"{PLAN_FILE.name}: {entry['from']}: 'keep' must be \"local\" or \"server\".")
        path = sync.CONTENT_DIR / entry["to"]
        moves.append(dict(entry, src=sync.href_of_path(cfg, entry["from"]), path=path, deep=path.name == sync.INDEX))
    return moves


def history(cfg, href: str) -> list:
    """Every version of the page, newest first: version, modifier, modified (a datetime) and comment."""
    _, body = sync._request(cfg, "GET", href + "/history")
    return [{"version": h.findtext(f"{sync.NS}version"), "modifier": h.findtext(f"{sync.NS}modifier") or "",
             "modified": datetime.fromisoformat(h.findtext(f"{sync.NS}modified")),
             "comment": h.findtext(f"{sync.NS}comment") or ""}
            for h in sync.ET.fromstring(body).findall(f"{sync.NS}historySummary")]


def save_plan(moves: list):
    entries = [{k: m[k] for k in ("from", "to", "keep", "version")} for m in moves]
    PLAN_FILE.write_text("[\n" + ",\n".join(" " + json.dumps(e, ensure_ascii=False) for e in entries) + "\n]\n",
                         encoding="utf-8")


def pages_under(cfg, href: str, spaces: list) -> list:
    """Pages nested below the page at href, from the wiki-wide space list."""
    space = href[: href.rfind("/pages/")]
    found = []
    for pages_href in spaces:
        sp = pages_href[: -len("/pages")] if pages_href.endswith("/pages") else pages_href
        if sp == space or sp.startswith(space + "/spaces/"):
            found += [h for h in sync.list_pages(cfg, pages_href) if h != href]
    return found


def line_changes(old: str, new: str) -> str:
    diff = list(difflib.unified_diff(old.splitlines(), new.splitlines(), lineterm="", n=0))[2:]
    added = sum(1 for line in diff if line.startswith("+"))
    removed = sum(1 for line in diff if line.startswith("-"))
    return f"+{added} -{removed} lines"


def target_of(cfg, move: dict, server_title: str):
    """Where the page goes and its title there: the address push would give the local file."""
    path = move["path"]
    meta = sync.read(path)[0] if path.exists() else {}
    title = sync.local_title(path, meta) if move["keep"] == "local" else meta.get("title") or server_title
    return meta.get("href") or sync.derive_href(cfg, path, title), title


def inspect(cfg, move: dict, moves: list, spaces: list):
    """Where a move stands, from GET requests only: (state, new address, title, notes, problems)."""
    notes, problems = [], []
    path = move["path"]
    server = sync.fetch_page(cfg, move["src"])
    if server is None:
        meta = sync.read(path)[0] if path.exists() else {}
        if meta.get("href") and sync.fetch_page(cfg, meta["href"]) is not None:
            return "DONE", meta["href"], meta.get("title"), notes, problems
        problems.append("gone from the wiki, and no local file is tied to a new address")
        return "GONE", None, None, notes, problems

    dst, title = target_of(cfg, move, server["title"])
    if move["keep"] == "local" and not path.exists():
        problems.append(f"no local file {move['to']}")
    if move["keep"] == "server":
        if path.exists():
            problems.append(f"the local file {move['to']} already exists; it would be overwritten")
        if sync.sanitize(title) != path.stem:
            problems.append(f"the page's title {title!r} doesn't match the file name")
    if server["version"] != move["version"]:
        problems.append(f"changed on the wiki since it was planned: version {move['version']} -> {server['version']}")
    if sync.fetch_page(cfg, dst) is not None:
        problems.append("a page already exists at the new address")

    old_name, new_name = sync.node_of(move["src"])[-1], sync.node_of(dst)[-1]
    if new_name != old_name:
        notes.append(f"renamed {old_name!r} -> {new_name!r}")
    if title != server["title"]:
        notes.append(f"retitled {server['title']!r} -> {title!r}")
    if move["keep"] == "server":
        notes.append("text stays as on the wiki")
    elif path.exists():
        notes.append(f"local text replaces the wiki's on push ({line_changes(server['content'], sync.read(path)[1])})")
    attachments = sync.list_attachments(cfg, move["src"])
    if attachments:
        notes.append(f"{len(attachments)} attachment(s) go along: " + ", ".join(a["name"] for a in attachments))

    planned = {m["src"] for m in moves}
    nested = pages_under(cfg, move["src"], spaces)
    waiting = [sync.pretty(h) for h in nested if h in planned]
    others = [sync.pretty(h) for h in nested if h not in planned]
    if move["deep"] and waiting:
        problems.append("move these first: " + ", ".join(waiting))
    if others:
        notes.append(("takes along: " if move["deep"] else "leaves behind: ") + ", ".join(others))
    return "TODO", dst, title, notes, problems


class RenameForm(HTMLParser):
    """The hidden fields of XWiki's Move/Rename form (form#rename)."""

    def __init__(self):
        super().__init__()
        self.inside = False
        self.fields = {}

    def handle_starttag(self, tag, attrs):
        a = dict(attrs)
        if tag == "form" and a.get("id") == "rename":
            self.inside = True
        elif self.inside and tag == "input" and a.get("type") == "hidden" and a.get("name"):
            self.fields.setdefault(a["name"], a.get("value") or "")

    def handle_endtag(self, tag):
        if tag == "form":
            self.inside = False


def page_summary(html: bytes) -> str:
    """The wiki's message on a response page, for printing when a move didn't happen."""
    text = html.decode("utf-8", "replace")
    messages = re.findall(r'class="[^"]*(?:errormessage|warningmessage)[^"]*"[^>]*>(.*?)</', text, re.S)
    title = re.search(r"<title>(.*?)</title>", text, re.S)
    return " | ".join(m.strip() for m in messages[:3]) or (title.group(1).strip() if title else text[:200])


def tie_local_file(cfg, move: dict, href: str, page: dict):
    """Point the local file at the moved page; with keep=server, also give it the page's text."""
    path = move["path"]
    meta = {"href": href, "title": page["title"], "synced_title": page["title"], "syntax": page["syntax"],
            "version": page["version"], "hash": sync.sha256(page["content"])}
    if move["keep"] == "server":
        path.parent.mkdir(parents=True, exist_ok=True)
        sync.write_local_file(path, meta, page["content"])
        stats = dict.fromkeys(["attachments_pulled", "attachments_kept_local", "attachments_conflicts"], 0)
        sync.pull_attachments(cfg, page, sync.attachments_dir(path), stats)
        return
    old, content = sync.read(path)
    meta["title"] = sync.local_title(path, old)
    sync.write_local_file(path, meta, content)
    att_dir = sync.attachments_dir(path)
    if not att_dir.is_dir():
        return
    # Attachments that moved along and match the local copy: record them, so push doesn't upload them again.
    manifest = sync.load_attachment_manifest(att_dir)
    for att in sync.list_attachments(cfg, href):
        local = att_dir / sync.sanitize(att["name"])
        if local.exists() and local.name not in manifest:
            data = local.read_bytes()
            if sync.download_attachment(cfg, att["href"]) == data:
                manifest[local.name] = {"size": att["size"], "sha256": sync.sha256_bytes(data), "version": att["version"]}
    sync.save_attachment_manifest(att_dir, manifest)


def record_state(old_href: str, new_href: str, version: str):
    pages = sync.load_state()
    pages.pop(old_href, None)
    pages[new_href] = version
    sync.STATE_FILE.write_text(json.dumps({"pages": dict(sorted(pages.items()))}, indent=1) + "\n", encoding="utf-8")


def move_page(cfg, move: dict, dst: str, title: str):
    """Move one page and tie its local file to it. Returns when it moved (the wiki's clock), or None."""
    src = move["src"]
    before = sync.get_page(cfg, src)
    versions = [h["version"] for h in history(cfg, src)]
    attachments = {a["name"] for a in sync.list_attachments(cfg, src)}

    _, html = sync._request(cfg, "GET", view_url(cfg, src, "xpage=rename&step=1"))
    form = RenameForm()
    form.feed(html.decode("utf-8", "replace"))
    source = {"sourceSpaceName": space_reference(sync.node_of(src)), "sourcePageName": "WebHome"}
    if not form.fields.get("form_token") or any(form.fields.get(k) != v for k, v in source.items()):
        print(f"STOPPED: the wiki's rename form for {sync.pretty(src)} isn't what this script expects "
              f"(expected {source}, got { {k: form.fields.get(k) for k in source} }).")
        return None

    *parent, name = sync.node_of(dst)
    fields = {
        "form_token": form.fields["form_token"],
        "async": "true",
        "sourceWikiName": form.fields.get("sourceWikiName") or cfg.wiki,
        "sourceSpaceName": form.fields["sourceSpaceName"],
        "sourcePageName": "WebHome",
        "deep": "true" if move["deep"] else "false",
        "updateLinks": "true",
        "autoRedirect": "false",
        "newPageTitle": title,
        "newWikiName": cfg.wiki,
        "newSpaceName": space_reference(parent),
        "newPageName": name,
        "terminal": "false",
    }
    _, response = sync._request(cfg, "POST", view_url(cfg, src, "xpage=rename&step=2"),
                                body=urllib.parse.urlencode(fields).encode(),
                                content_type="application/x-www-form-urlencoded")
    deadline = time.monotonic() + WAIT_SECONDS
    while sync.fetch_page(cfg, src) is not None or sync.fetch_page(cfg, dst) is None:
        if time.monotonic() > deadline:
            print(f"STOPPED: {sync.pretty(src)} hasn't moved after {WAIT_SECONDS}s. The wiki answered:\n"
                  f"  {page_summary(response)}")
            return None
        time.sleep(2)

    after = sync.get_page(cfg, dst)
    moved = history(cfg, dst)
    kept = [h["version"] for h in moved]
    lost = [v for v in versions if v not in kept]
    lost_attachments = attachments - {a["name"] for a in sync.list_attachments(cfg, dst)}
    if lost or lost_attachments:
        print(f"STOPPED: {sync.pretty(dst)} is missing versions {lost} and attachments {sorted(lost_attachments)}. "
              f"Nothing local was changed.")
        return None

    tie_local_file(cfg, move, dst, after)
    record_state(src, dst, after["version"])
    print(f"MOVED {sync.pretty(src)}\n   -> {sync.pretty(dst)}")
    print(f"  history: {len(versions)} -> {len(kept)} versions (now {after['version']}, was {before['version']}); "
          f"title {after['title']!r}; {len(attachments)} attachment(s)")
    if after["title"] != title:
        print(f"  NOTE: asked for the title {title!r}")
    if after["content"] != before["content"]:
        print("  NOTE: the wiki changed the page's text while moving it (link updates)"
              + ("; the local file has the new text." if move["keep"] == "server" else "."))
    print(f"  local file: {move['to']}")
    return moved[0]["modified"]


def refresh(cfg, moves: list, since: datetime = None):
    """Take in the versions the moves made on planned pages; report anyone else's.

    Moving a page makes XWiki update the pages around it: links to it (saved as this script's
    user) and the old-style parent field of pages under it (saved under the page's own last
    author). So newer versions are taken in when they leave the text and title as they were, or
    when they were all made by this script's user after 'since'. A page not yet moved gets its
    planned version raised; a moved page's local file is tied to the new version (with
    keep=server it also gets the new text, unless it was edited locally).
    """
    plan_changed = False
    for move in moves:
        path = move["path"]
        page = sync.fetch_page(cfg, move["src"])
        if page is not None:
            href, known = move["src"], move["version"]
        else:
            meta, content = sync.read(path) if path.exists() else ({}, "")
            if not meta.get("version"):
                continue
            href, known = meta["href"], meta["version"]
            page = sync.fetch_page(cfg, href)
            if page is None:
                continue
        if page["version"] == known:
            continue
        newer = []
        for h in history(cfg, href):
            if h["version"] == known:
                break
            newer.append(h)
        what = "; ".join(f"{h['version']} by {h['modifier']} at {h['modified']:%H:%M} {h['comment']!r}" for h in newer)
        old = sync.fetch_page(cfg, f"{href}/history/{known}")
        same_text = old is not None and (old["content"], old["title"]) == (page["content"], page["title"])
        ours = since is not None and all(h["modifier"].endswith(f"XWiki.{cfg.user}") and h["modified"] >= since
                                         for h in newer)
        if not (same_text or ours):
            print(f"  CHANGED BY SOMEONE ELSE {sync.pretty(href)} since {known}: {what}")
            continue
        if href == move["src"]:
            move["version"] = page["version"]
            plan_changed = True
        elif move["keep"] == "server" and sync.sha256(content) != meta.get("hash"):
            print(f"  NOT UPDATED {move['to']}: edited locally, and the wiki updated its links ({what}).")
            continue
        else:
            text = page["content"] if move["keep"] == "server" else content
            sync.write_local_file(path, dict(meta, version=page["version"], hash=sync.sha256(page["content"])), text)
            record_state(href, href, page["version"])
        print(f"  {'UPDATED BY THE MOVE' if same_text else 'LINKS UPDATED'} {sync.pretty(href)}: "
              f"{known} -> {page['version']} ({what})")
    if plan_changed:
        save_plan(moves)


def cmd_status(cfg):
    moves = load_moves(cfg)
    spaces = sync.list_spaces(cfg)
    counts = {}
    for move in moves:
        state, dst, _, notes, problems = inspect(cfg, move, moves, spaces)
        state = "BLOCKED" if state == "TODO" and problems else state
        counts[state] = counts.get(state, 0) + 1
        print(f"{state:7} {move['from']}  (v{move['version']})")
        if dst:
            print(f"          -> {sync.pretty(dst)}")
        for line in notes:
            print(f"          {line}")
        for line in problems:
            print(f"          ! {line}")
    print(", ".join(f"{n} {s.lower()}" for s, n in sorted(counts.items())) + f" ({len(moves)} in {PLAN_FILE.name})")


def cmd_run(cfg, names: list, yes: bool):
    moves = load_moves(cfg)
    by_from = {m["from"]: m for m in moves}
    unknown = [n for n in names if n not in by_from]
    if unknown:
        sys.exit(f"Not in {PLAN_FILE.name}: {', '.join(unknown)}")

    moved, since = 0, None
    for name in names:
        move = by_from[name]
        state, dst, title, notes, problems = inspect(cfg, move, moves, sync.list_spaces(cfg))
        if state == "DONE":
            print(f"ALREADY MOVED {name}")
            continue
        print(f"{name}\n  -> {sync.pretty(dst) if dst else '?'}")
        for line in notes:
            print(f"  {line}")
        if problems:
            for line in problems:
                print(f"  ! {line}")
            print("STOPPED before moving it.")
            break
        if not (yes or sync.confirm("Move it?")):
            print("Stopped.")
            break
        moved_at = move_page(cfg, move, dst, title)
        if moved_at is None:
            break
        moved += 1
        since = since or moved_at - timedelta(minutes=5)
        refresh(cfg, moves, since)
    print(f"Done. Moved {moved} of {len(names)} page(s).")
    if moved:
        outline.main()


def main():
    parser = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    sub = parser.add_subparsers(dest="command", required=True)
    sub.add_parser("status", help="The plan, checked against the wiki (no changes)")
    sub.add_parser("refresh", help="Take in newer versions that leave a planned page's text as it was")
    p_run = sub.add_parser("run", help="Move the named pages, in this order")
    p_run.add_argument("pages", nargs="+", help="Pages by their 'from' path in moves.json")
    p_run.add_argument("--yes", action="store_true", help="Move without asking")
    args = parser.parse_args()

    cfg = sync.load_config()
    if args.command == "status":
        cmd_status(cfg)
    elif args.command == "refresh":
        refresh(cfg, load_moves(cfg))
    else:
        cmd_run(cfg, args.pages, args.yes)


if __name__ == "__main__":
    sys.exit(main() or 0)
