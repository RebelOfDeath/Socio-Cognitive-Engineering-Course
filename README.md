# SCE Wiki Sync

Tools to edit the group's [XWiki](https://xwiki.ewi.tudelft.nl/xwiki/wiki/sce2026group04) content locally (in your editor, under git) and sync changes to/from the live wiki via its REST API.

## Layout

- `wiki-sync/sync.py` — the sync tool (stdlib-only Python, no install needed beyond `certifi`).
- `wiki-sync/.env` — your credentials (gitignored, never committed). Copy `wiki-sync/.env.example` to create it.
- `wiki-content/` — the actual wiki pages, mirrored as local files. This is what you edit and commit.

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
title: <page title>
syntax: xwiki/2.1
version: <last-synced version, e.g. 3.1>
hash: <sha256 of the content below, at last sync>
%%WIKI-SYNC-META%%
<page content in XWiki 2.1 syntax — edit this part>
```

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

## Excluding spaces

`wiki-sync/.env` has `XWIKI_EXCLUDE_SPACES` (comma-separated top-level space names) for spaces you don't want mirrored locally — defaults to `XWiki` (the built-in user/account space, not group content).
