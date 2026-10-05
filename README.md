# SCE Wiki Sync

Tools to edit the group's [XWiki](https://xwiki.ewi.tudelft.nl/xwiki/wiki/sce2026group04) content locally (in your editor, under git) and sync changes to/from the live wiki via its REST API.

## Layout

- `wiki-sync/sync.py` — the sync tool (stdlib-only Python, no install needed beyond `certifi`).
- `wiki-sync/.env` — your credentials (gitignored, never committed). Copy `wiki-sync/.env.example` to create it.
- `wiki-content/` — the actual wiki pages, mirrored as local files. This is what you edit and commit.
- `tmp-pitch/` and `wiki-sync/sync_pitch.py` — the `tmp: Pitch` tree, with its own layout and sync script (see the end of this file).

## Setup

```
cd wiki-sync
cp .env.example .env
# edit .env and fill in XWIKI_USER / XWIKI_PASSWORD
pip install certifi   # only needed if `python3 -c "import certifi"` fails
```

## Usage

Run these from the repo root:

```
python3 wiki-sync/sync.py pull            # download everything from the wiki
python3 wiki-sync/sync.py status          # list local files with unpushed edits
python3 wiki-sync/sync.py push            # push all changed pages and attachments
python3 wiki-sync/sync.py push <file>     # push just one page (or one attachment)
```

Typical loop: `pull` to get the latest, edit `.xwiki` files (or add/replace files in a `.attachments/` folder) in `wiki-content/`, `status` to see what you've touched, `push` to publish.

## Page files (`.xwiki`)

Each page becomes one `.xwiki` file, in a folder structure that mirrors the wiki's space hierarchy (e.g. `wiki-content/2. Specification/a2. Personas/Human Personas/WebHome.xwiki`). The file starts with a metadata block the tool uses to track sync state — don't hand-edit it:

```
%%WIKI-SYNC-META%%
href: <REST API URL for this page>
title: <page title — edit this to rename the page>
synced_title: <title at last sync; don't hand-edit>
syntax: xwiki/2.1
version: <last-synced version, e.g. 3.1>
hash: <sha256 of the content below, at last sync>
%%WIKI-SYNC-META%%
<page content in XWiki 2.1 syntax — edit this part>
```

To **rename a page**, edit its `title:` line and `push`. `status` and `push` compare
`title` against `synced_title`, so a retitle is picked up even though the page content
is untouched.

Renaming a *folder* is a different matter: folder names are XWiki space keys, baked
into each page's `href:`. The REST API has no move, so `push` would write the page back
under its old key. Renaming a space means creating pages under the new key and deleting
the old ones — which loses page history, breaks inbound links, and leaves attachments
behind. Use the wiki's own Page Actions → Rename (with "update links") instead, then
`pull`.

To **create a page**, make a new `WebHome.xwiki` in a new folder, with a metadata block
that has `href:`, `title:` and `syntax:` but no `version:` or `hash:`. The `href:` is the
parent's REST URL with `/spaces/<new folder name, URL-encoded>` inserted before
`/pages/WebHome`. `push` sees the missing version, checks that nothing exists at that
URL yet (and refuses if something does), then creates the page.

Content stays in native XWiki syntax (`**bold**`, `= Heading =`, `{{macro}}...{{/macro}}`, etc.) rather than being converted to Markdown, so nothing gets mangled on push. See [XWiki Syntax](https://xwiki.ewi.tudelft.nl/xwiki/wiki/sce2026group04/view/XWiki/XWikiSyntax) for a reference.

## Attachments (images, PDFs, etc.)

Each page's attachments live in a sibling `<PageName>.attachments/` folder, e.g.:

```
wiki-content/Sandbox/WebHome.xwiki
wiki-content/Sandbox/WebHome.attachments/XWikiLogo.png
wiki-content/Sandbox/WebHome.attachments/.sync-manifest.json
```

This is **two-way**: `pull` downloads new/changed attachments, and `push` uploads any file you add, replace, or edit in that folder (including brand-new files — no need to tell the tool about them first). The `.sync-manifest.json` file in each folder is bookkeeping (per-file hash/version at last sync) that the tool needs to detect changes and conflicts — don't hand-edit it, but do commit it to git.

## Conflict handling

Multiple people edit this wiki, so the tool checks versions before overwriting anything, for both pages and attachments:

- **`push`** compares the wiki's current version to the version you last synced. If someone else changed the page/attachment in the meantime, it refuses to push and tells you to `pull` first — no silent overwrites.
- **`pull`** won't clobber local edits: if you've changed something locally and the wiki hasn't changed, your local copy is left alone. If *both* changed, the wiki's version is saved as `<PageName>.remote.xwiki` (or `<name>.remote.<ext>` for attachments) next to yours so you can merge by hand.

Deleting a local attachment file does **not** delete it from the wiki — `push` only adds/updates attachments, it never removes them.

## Deleting pages

`push` never deletes either: removing an `.xwiki` file locally just makes `push` ignore it, leaving the page live on the wiki. `wiki-sync/delete.py` does the removal:

```
python3 wiki-sync/delete.py --dry-run <target>    # list what would go, delete nothing
python3 wiki-sync/delete.py <target>              # delete one page
python3 wiki-sync/delete.py --space <target>      # delete a page and everything under it
```

A `<target>` is either a local `.xwiki` file or the REST URL from that file's `href:` line (use the URL if you already deleted the file — `git show HEAD:<path>` will show you the old one). `--space` removes children before their parent. Deletion is permanent, so every run prints the full list and asks for confirmation; pass `--yes` to skip the prompt.

Afterwards, delete the matching files under `wiki-content/` and run `python3 wiki-sync/sync.py outline` to refresh `OUTLINE.md`.

## Excluding spaces

`wiki-sync/.env` has `XWIKI_EXCLUDE_SPACES` (comma-separated top-level space names) for spaces you don't want mirrored locally — defaults to `XWiki` (the built-in user/account space, not group content).

## The `tmp: Pitch` tree (`tmp-pitch/`)

The `tmp: Pitch` page and everything below it are kept in `tmp-pitch/` and synced by their own script. `sync.py` skips that space, so `XWIKI_EXCLUDE_SPACES` in your `.env` must include `tmp: Pitch` (see `.env.example`); `sync_pitch.py` refuses to run otherwise.

```
python3 wiki-sync/sync_pitch.py pull            # download the tree into tmp-pitch/
python3 wiki-sync/sync_pitch.py status          # list local changes (no network)
python3 wiki-sync/sync_pitch.py push            # create, update and retitle pages
python3 wiki-sync/sync_pitch.py push <file>     # just one page
python3 wiki-sync/sync_pitch.py layout          # re-file pages under their titles (no network)
```

The local tree mirrors the wiki's. A page without children is a file named after its title; a page with children is a folder named after its title, and `tmp-pitch/` itself is the `tmp: Pitch` page:

```
tmp-pitch/                            ← page "tmp: Pitch"
└─ 1 Foundation/                      ← page "1 Foundation"
   ├─ a1 Situated Activities/         ← page "a1 Situated Activities"
   │  ├─ 0 Index.xwiki                ← what a1 has to say itself
   │  ├─ a1.1 Daily Walk.xwiki
   │  └─ a1.2 Morning Care (previous concept).xwiki
   └─ a3 Problem Scenario.xwiki
```

- **A page with children has no content of its own.** Anything it has to say goes into a `0 Index` child, which sorts first. The folder's own page is a hidden `.page.xwiki` holding only its metadata; the repo's VS Code settings hide it. `push` enforces this: content found in a `.page.xwiki` (e.g. after an edit on the wiki) moves into a new `0 Index` child, attachments included. `status` and `pull` list such pages.
- **Titles are names.** Titles follow (number)(space)(name), without a full stop after the number: `1 Foundation`, `a1.1 Daily Walk`. Characters Windows can't put in a file name become `-` in the name only (`IDP: Title` → `IDP- Title.xwiki`); the `title:` line keeps the exact title.
- **Renaming** a file or folder retitles the page on `push`; a retitle on the wiki renames it on `pull`. Editing the `title:` line works too. The space key, and so the URL, keeps the name the page was created with.
- **New pages** need no metadata: add `<title>.xwiki` in the folder of the page it belongs under, or a new folder for a page with children, and `push`. To give a page its first child, make a folder with the page's exact file name (without `.xwiki`) next to it and put the new file inside; `push` turns the page into that folder and moves its content into `0 Index`.
- **Moving** a page to another parent needs the wiki's own Page Actions → Move/Rename, then `pull`: the REST API has no move.
