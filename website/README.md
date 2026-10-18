# Final presentation: "Meaningful connections"

A scrollytelling website for the SCE final presentation. It follows Elena through her first week in a care home, and walks through the project along the way: the problem, the two lines we developed, values and tensions, the literature, the technology, the design, the proof of concept and the Kinnect study. One fixed 1920×1080 stage, scaled to any screen, with 39 stops in 10 chapters. Moving between stops scrubs a single animation timeline, so every transition also plays backwards.

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

Clicking the stage also advances. The URL hash tracks the current stop (`#meet`, `#study`, ...), so a link or a reload lands on the same stop.

## Editing

- The screen carries headlines, spoken lines and references; what we say lives in the speaker notes. They live in `js/notes.js`, one entry per stop. `NOTES.md` is an export of all notes as a cue card.
- `js/lib.js`: the stop list (ids, titles, how long each transition glides), the palette, the floor plan of the home and the `doi(...)` citation helper.
- `js/scenes-a.js` to `scenes-d.js`: one builder per scene, in story order. Captions are plain strings in `caption(...)` and `say(...)` calls.
- `js/engine.js`: stage scaling, scroll-to-timeline mapping, input, HUD, notes panel. `SLOW` at the top scales every glide.
- `img/poc/`: screenshots of the proof of concept (the `sce-poc` submodule at the repo root), taken from its dev server without a language model configured. Screens that need a live conversation are not captured yet.

Type is Cormorant Garamond for headlines and Inter for everything else, on a navy ground. Colour has one meaning everywhere: tan is Elena, cream is Jan, gold is Pepper and the System, blue-grey is Myra, grey is the morning-care line, coral is a tension, risk or adverse claim.
