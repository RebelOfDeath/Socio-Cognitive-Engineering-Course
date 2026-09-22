#!/usr/bin/env python3
"""Delete pages from the XWiki instance.

'sync.py push' only adds and updates; removing a local .xwiki file leaves the
page on the wiki. This script does the removal, from the same credentials.

Usage:
    python3 delete.py <page-url-or-file> [...]     # delete those pages
    python3 delete.py --space <space-url> [...]    # delete a page and everything under it
    python3 delete.py --dry-run <...>              # list what would go, delete nothing

A target is either a local .xwiki file (still on disk, or already deleted but
recoverable from git via `git show HEAD:<path>`) or a REST page URL as found in
the 'href:' line of a page file. With --space, the target is a page whose whole
subtree is removed: children first, then the page itself.

Deletion is permanent and moves nothing to a trash you can browse from here, so
every run prints the full list and asks for confirmation unless you pass --yes.
"""
import argparse
import sys
import urllib.parse
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))
import sync  # noqa: E402  (needs the path insert above)


def href_of_target(target: str) -> str:
    """Accept either a REST URL or a local .xwiki file and return the page href."""
    if target.startswith("http://") or target.startswith("https://"):
        return target
    path = Path(target)
    if not path.exists():
        sys.exit(f"No such file: {path}\n(If you already deleted it, pass the page's REST URL instead.)")
    href = sync.page_href_of(path)
    if not href:
        sys.exit(f"{path} has no sync metadata, so its wiki page is unknown.")
    return href


def space_href_of_page(page_href: str) -> str:
    """Turn .../spaces/A/spaces/B/pages/WebHome into .../spaces/A/spaces/B."""
    marker = "/pages/"
    idx = page_href.rfind(marker)
    if idx == -1:
        sys.exit(f"Cannot work out the space for {page_href} (no '/pages/' segment).")
    return page_href[:idx]


def collect_subtree(cfg, page_href: str):
    """Every page href under (and including) the given page, deepest first.

    A space's own /spaces endpoint returns just that space, not its children, so
    walking down from it finds nothing. Instead take the wiki-wide space list and
    keep the ones sitting under our space's href.
    """
    space_href = space_href_of_page(page_href)
    prefix = space_href + "/spaces/"

    # list_spaces gives each space's /pages link; the href above it is the space.
    subtree_spaces = []
    for pages_href in sync.list_spaces(cfg):
        sp_href = pages_href[: -len("/pages")] if pages_href.endswith("/pages") else pages_href
        if sp_href == space_href or sp_href.startswith(prefix):
            subtree_spaces.append(sp_href)

    # deepest first, so children are gone before their parent space
    subtree_spaces.sort(key=lambda h: h.count("/spaces/"), reverse=True)

    collected = []
    for sp_href in subtree_spaces:
        try:
            found = sync.list_pages(cfg, f"{sp_href}/pages")
        except RuntimeError:
            continue
        for p in found:
            if p not in collected:
                collected.append(p)

    # the target page itself goes last, even if its space held no pages
    if page_href in collected:
        collected.remove(page_href)
    collected.append(page_href)
    return collected


def delete_page(cfg, href: str):
    sync._request(cfg, "DELETE", href)


def pretty(href: str) -> str:
    """The readable tail of a REST URL, for printing."""
    idx = href.find("/spaces/")
    return urllib.parse.unquote(href[idx:] if idx != -1 else href)


def main():
    parser = argparse.ArgumentParser(
        description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter
    )
    parser.add_argument("targets", nargs="+", help="Local .xwiki file(s) or REST page URL(s)")
    parser.add_argument(
        "--space", action="store_true",
        help="Delete each target's whole subtree (children first), not just the page",
    )
    parser.add_argument("--dry-run", action="store_true", help="Show what would be deleted, then stop")
    parser.add_argument("--yes", action="store_true", help="Skip the confirmation prompt")
    args = parser.parse_args()

    cfg = sync.load_config()

    hrefs = []
    for target in args.targets:
        page_href = href_of_target(target)
        for href in (collect_subtree(cfg, page_href) if args.space else [page_href]):
            if href not in hrefs:
                hrefs.append(href)

    if not hrefs:
        print("Nothing to delete.")
        return

    print(f"{len(hrefs)} page(s) to delete:")
    for href in hrefs:
        print(f"  {pretty(href)}")

    if args.dry_run:
        print("\n--dry-run: nothing was deleted.")
        return

    if not args.yes:
        if input("\nDelete these permanently? [y/N] ").strip().lower() not in ("y", "yes"):
            print("Aborted.")
            return

    deleted = 0
    for href in hrefs:
        try:
            delete_page(cfg, href)
        except RuntimeError as e:
            print(f"FAILED {pretty(href)}\n  {e}")
            continue
        print(f"DELETED {pretty(href)}")
        deleted += 1

    print(f"\nDone. Deleted {deleted} of {len(hrefs)} page(s).")
    if deleted:
        print("Remember to remove the matching files under wiki-content/ and rerun "
              "'python3 wiki-sync/sync.py outline'.")


if __name__ == "__main__":
    sys.exit(main() or 0)
