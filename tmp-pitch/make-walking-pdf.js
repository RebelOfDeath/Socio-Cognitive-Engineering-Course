#!/usr/bin/env node
// Builds 'Walking with meaning - chapters.pdf': every current-concept chapter of
// 1 Foundation and 2 Specification, in full, in one file.
//
// Chapters are found, not listed: every .xwiki page under those two folders except
// '0 Index' pages and superseded '(previous concept)' pages, in path order.
// Markup is rendered with the xwiki-preview extension; Chromium prints the PDF.
//
// Usage:
//   node tmp-pitch/make-walking-pdf.js [output.pdf]
//
// Environment:
//   XWIKI_PREVIEW  xwiki-preview folder (default: ~/Desktop/Desktop/xwiki-preview)
//   CHROME         Chromium or Chrome executable (default: first one found below)
//
// The wiki sync only handles .xwiki files and .attachments folders, so this
// script and the PDF it writes stay local.

const fs = require('fs');
const os = require('os');
const path = require('path');
const { execFileSync } = require('child_process');
const { pathToFileURL } = require('url');

const ROOT = __dirname;
const PARTS = [['1 Foundation', 'Foundation'], ['2 Specification', 'Specification']];
const OUT = path.resolve(process.argv[2] || path.join(ROOT, 'Walking with meaning - chapters.pdf'));
const HOME = os.homedir();
const PREVIEW = process.env.XWIKI_PREVIEW || path.join(HOME, 'Desktop', 'Desktop', 'xwiki-preview');

const { renderXWiki, escapeHtml } = require(path.join(PREVIEW, 'out', 'renderer'));

function findChrome() {
  if (process.env.CHROME) return process.env.CHROME;
  const local = process.env.LOCALAPPDATA || path.join(HOME, 'AppData', 'Local');
  const candidates = [path.join(local, 'Chromium', 'Application', 'chrome.exe')];
  const pw = path.join(local, 'ms-playwright');
  if (fs.existsSync(pw)) {
    for (const d of fs.readdirSync(pw).filter((d) => /^chromium-\d+$/.test(d)).sort().reverse()) {
      candidates.push(path.join(pw, d, 'chrome-win64', 'chrome.exe'), path.join(pw, d, 'chrome-win', 'chrome.exe'));
    }
  }
  candidates.push('C:/Program Files/Google/Chrome/Application/chrome.exe');
  const found = candidates.find((c) => fs.existsSync(c));
  if (!found) throw new Error('No Chromium found; set CHROME to its executable.');
  return found;
}

function walk(dir) {
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap((e) => {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) return e.name.endsWith('.attachments') ? [] : walk(p);
    return p.endsWith('.xwiki') ? [p] : [];
  });
}

function isChapter(file) {
  const name = path.basename(file, '.xwiki');
  return !name.startsWith('.') && !name.startsWith('0 Index') && !name.includes('(previous concept)')
    && !name.endsWith('.remote');
}

function readPage(file) {
  const raw = fs.readFileSync(file, 'utf8').replace(/\r\n?/g, '\n');
  const m = raw.match(/^%%WIKI-SYNC-META%%\n([\s\S]*?)\n%%WIKI-SYNC-META%%\n?/);
  const meta = {};
  if (m) {
    for (const line of m[1].split('\n')) {
      const i = line.indexOf(': ');
      if (i > 0) meta[line.slice(0, i)] = line.slice(i + 2);
    }
  }
  return { meta, source: m ? raw.slice(m[0].length) : raw };
}

const CSS = `
@page { size: A4; margin: 18mm 16mm; }
* { box-sizing: border-box; }
body { font-family: 'Segoe UI', 'Helvetica Neue', Arial, sans-serif; font-size: 10pt; line-height: 1.42;
       color: #1f2421; margin: 0; }
a { color: inherit; text-decoration: none; }
.cover { height: 250mm; display: flex; flex-direction: column; justify-content: center; page-break-after: always; }
.cover .kicker { font-size: 10pt; letter-spacing: .12em; text-transform: uppercase; color: #3d6b55; }
.cover h1 { font-size: 34pt; margin: 6pt 0 10pt; line-height: 1.1; }
.cover p { font-size: 11pt; color: #4a524d; max-width: 140mm; }
.toc { page-break-after: always; }
.toc h2 { font-size: 16pt; margin-top: 0; }
.toc ol { list-style: none; padding: 0; margin: 0; }
.toc li { padding: 3pt 0; border-bottom: 1px solid #e3e7e4; }
.toc li.part { border: 0; padding-top: 12pt; font-weight: 600; color: #3d6b55; text-transform: uppercase;
               font-size: 9pt; letter-spacing: .08em; }
.toc .num { display: inline-block; width: 22pt; color: #7a827d; }
.chapter { page-break-before: always; }
.chapter:first-of-type { page-break-before: auto; }
.eyebrow { font-size: 8.5pt; color: #6a736d; text-transform: uppercase; letter-spacing: .06em; }
.chapter-title { font-size: 20pt; margin: 4pt 0 12pt; padding-bottom: 6pt; border-bottom: 2px solid #3d6b55; }
.chapter h1:not(.chapter-title) { font-size: 15pt; margin: 18pt 0 6pt; color: #24412f; }
.chapter h2 { font-size: 12pt; margin: 12pt 0 5pt; }
.chapter h3, .chapter h4, .chapter h5, .chapter h6 { font-size: 10.5pt; margin: 10pt 0 4pt; }
h1, h2, h3, h4, h5, h6 { page-break-after: avoid; }
p { margin: 0 0 6pt; }
ul, ol { margin: 0 0 6pt; padding-left: 16pt; }
li { margin: 1pt 0; }
table { border-collapse: collapse; width: 100%; margin: 4pt 0 10pt; font-size: 9pt; }
th, td { border: 1px solid #c9d0cb; padding: 3pt 5pt; vertical-align: top; text-align: left; overflow-wrap: break-word; }
th { background: #eef3ef; font-weight: 600; }
tr { page-break-inside: avoid; }
table.kv td:first-child { width: 28%; font-weight: 600; background: #f7f9f8; }
table.wide { font-size: 7.6pt; }
table.wide th, table.wide td { padding: 2pt 3pt; }
td p:last-child, td ul:last-child, td ol:last-child { margin-bottom: 0; }
.xw-group > p:last-child, .xw-group > ul:last-child, .xw-group > ol:last-child { margin-bottom: 0; }
.xw-panel { border: 1px solid #d8c78f; background: #fbf7e8; padding: 6pt 10pt; margin: 0 0 10pt; border-radius: 3pt; }
.xw-box-title { font-weight: 600; margin-bottom: 4pt; }
`;

// Tag tables by column count: two columns are field/value tables, six or more get smaller type.
function classifyTables(html) {
  return html.replace(/<table>([\s\S]*?)<\/table>/g, (_, inner) => {
    const first = inner.match(/<tr>[\s\S]*?<\/tr>/);
    const n = first ? (first[0].match(/<t[hd][ >]/g) || []).length : 0;
    return `<table class="cols${n}${n === 2 ? ' kv' : ''}${n >= 6 ? ' wide' : ''}">${inner}</table>`;
  });
}

const toc = [];
const chapters = [];
for (const [folder, part] of PARTS) {
  const files = walk(path.join(ROOT, folder)).filter(isChapter).sort();
  if (files.length) toc.push(`<li class="part">${part}</li>`);
  for (const file of files) {
    const n = chapters.length + 1;
    const { meta, source } = readPage(file);
    const title = meta.title || path.basename(file, '.xwiki');
    const where = path.relative(ROOT, path.dirname(file)).split(path.sep).join(' / ');
    // Pages reuse heading ids such as 'Fields'; scope them per chapter.
    const html = renderXWiki(source, { htmlMode: 'inline' }).html
      .replace(/ id="([^"]+)"/g, ` id="c${n}-$1"`)
      .replace(/ data-line="\d+"/g, '');
    toc.push(`<li><a href="#ch${n}"><span class="num">${n}</span>${escapeHtml(title)}</a></li>`);
    chapters.push(`<section class="chapter" id="ch${n}">`
      + `<div class="eyebrow">Chapter ${n} · ${part} · ${escapeHtml(where)}</div>`
      + `<h1 class="chapter-title">${escapeHtml(title)}</h1>${classifyTables(html)}</section>`);
  }
}

const doc = `<!doctype html><html lang="en"><head><meta charset="utf-8">
<title>Walking with meaning: chapters</title><style>${CSS}</style></head><body>
<div class="cover"><div class="kicker">SCE 2026 · Group 04 · tmp: Pitch</div>
<h1>Walking with meaning</h1>
<p>The ${chapters.length} current-concept chapters of the Foundation and Specification, in full,
as they stand in tmp-pitch. Index pages and the superseded Morning Care pages are left out.</p></div>
<nav class="toc"><h2>Contents</h2><ol>${toc.join('')}</ol></nav>
${chapters.join('\n')}
</body></html>`;

const work = fs.mkdtempSync(path.join(os.tmpdir(), 'walking-pdf-'));
try {
  const htmlFile = path.join(work, 'walking.html');
  fs.writeFileSync(htmlFile, doc, 'utf8');
  // A throwaway profile, so an open Chromium window doesn't take over the job.
  execFileSync(findChrome(), [
    '--headless=new', '--disable-gpu', '--no-pdf-header-footer',
    `--user-data-dir=${path.join(work, 'profile')}`,
    `--print-to-pdf=${OUT}`, pathToFileURL(htmlFile).href,
  ], { stdio: 'ignore' });
} finally {
  fs.rmSync(work, { recursive: true, force: true });
}
if (!fs.existsSync(OUT)) throw new Error('Chromium did not write the PDF.');
console.log(`Wrote ${OUT} (${chapters.length} chapters).`);
