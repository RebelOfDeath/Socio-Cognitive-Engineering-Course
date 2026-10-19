# Final presentation: "Meaningful connections"

A scrollytelling website for the SCE final presentation. The animated story of Elena and Jan is the backbone; the background is compressed; the selected use case, UC02 Introducing two residents, is carried through to its Premises and Claims; and the final act runs prototype → formative walkthrough findings → design changes → planned summative test → next iteration, before returning to Elena and Jan. One fixed 1920×1080 stage, 39 stops in 11 chapters. Every transition also plays backwards.

See `PRESENTATION-PLAN.md` for timing and progress, and `WALKTHROUGH-PROTOCOL.md` for the formative walkthrough whose results fill the formative slides.

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
- `js/scenes-a.js` to `scenes-d.js`: opening, moving in, compressed background, the UC02 scenario on the floor plan, use case, Artifact and demo video (`video/demo.mp4`), the planted-mistake walkthrough event, the two-home study graphic and the ending.
- `js/scenes-e.js`: UC02 Premises and Claims, formative walkthrough (method, findings, changes), planned summative test and next iteration. Results not yet observed are red dashed `todo(...)` slots.
- `js/engine.js`: stage scaling, scroll-to-timeline mapping, input, HUD, notes panel. `SLOW` at the top scales every glide.
- `img/poc/`: screenshots of the proof of concept (the `sce-poc` submodule at the repo root), taken from its dev server without a language model configured. Screens that need a live conversation are not captured yet.

Type is Cormorant Garamond for headlines and Inter for everything else, on a navy ground. Colour has one meaning everywhere: tan is Elena, cream is Jan, gold is Pepper and the System, blue-grey is Myra, grey is the morning-care line, coral is a tension, risk or adverse claim.
