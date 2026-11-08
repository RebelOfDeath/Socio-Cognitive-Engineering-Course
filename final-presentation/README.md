# Final presentation: "Meaningful connections"

A scrollytelling website for the SCE final presentation. The animated story of Elena and Jan opens it; the background is two slides; use case UC02 Introducing two residents and the proof of concept are shown as two videos; and the final act runs planned formative walkthrough → design change per result → planned summative test (ER-03) → next iteration, before returning to Elena and Jan. One fixed 1920×1080 stage, 23 stops in 10 chapters. Every transition also plays backwards.

See `PRESENTATION-PLAN.md` for timing and progress, and `WALKTHROUGH-PROTOCOL.md` for the formative walkthrough. It has not been run, so the formative slides show its plan and no results.

## Run it

Double-clicking `index.html` works. A local server is a little more robust:

```
cd website
python3 -m http.server 8000
# open http://localhost:8000
```

Everything is vendored (GSAP in `vendor/`, fonts in `fonts/`), so it runs offline on the presentation laptop. Reference links open in a new tab and need a connection.

## Presenting

| Key | Action |
|---|---|
| → ↓ Space Enter PageDown | next stop (clickers send PageDown) |
| ← ↑ Shift+Space PageUp | previous stop |
| 0 to 9 | jump to a chapter |
| G or Esc | contents overlay, click any stop |
| F | fullscreen |
| S | toggle step mode (one wheel gesture = one stop) and free scrolling |
| N | speaker notes for the current stop |

Clicking the stage also advances. The deck always opens on the cover. The URL hash shows the current stop (`#meet`, `#study`, ...); use G (contents) or the number keys to jump. Home goes back to the cover.

## Editing

- The screen carries headlines, spoken lines and references; what we say lives in the speaker notes. They live in `js/notes.js`, one entry per stop. `NOTES.md` is an export of all notes as a cue card.
- `js/lib.js`: the stop list (ids, titles, how long each transition glides), the palette, the floor plan of the home and the `doi(...)` citation helper.
- `js/scenes-a.js`: opening questions and moving in (Elena, Jan, the floor plan). `js/scenes-b.js`: the two background slides. `js/scenes-d.js`: the two videos (`part2_3min.mp4`, the UC02 story; `2026-10-20 demos combined (faster).mp4`, the proof of concept), the two-home study graphic and the ending.
- `js/scenes-e.js`: the planned formative walkthrough (what it tests, the change agreed for each result), the planned summative test (ER-03) and the next iteration.
- `js/engine.js`: stage scaling, scroll-to-timeline mapping, input, HUD, notes panel. `SLOW` at the top scales every glide.
- `img/poc/`: screenshots of the proof of concept (the `sce-poc` submodule at the repo root). `img/video/`: key frames from the two videos, used in the PDF.

## PDF export

```
python3 website/export/export-pdf.py [out.pdf]
```

Needs Playwright for Python, Pillow and Google Chrome. It screenshots every stop with the HUD hidden, one page per stop, and replaces each video with a slide of four key frames from `img/video/`.

Type is Cormorant Garamond for headlines and Inter for everything else, on a navy ground. Colour has one meaning everywhere: tan is Elena, cream is Jan, gold is Pepper and the System, blue-grey is Myra, grey is the morning-care line, coral is a tension, risk or adverse claim.
