# Final presentation: "The wait is the design"

A scrollytelling website for the SCE final presentation. One fixed 1920×1080 stage, scaled to any screen, with 42 fixed stops in 8 chapters. Moving between stops scrubs a single animation timeline, so every transition also plays backwards.

## Run it

Double-clicking `index.html` works. A local server is a little more robust (and what we tested with):

```
cd website
python3 -m http.server 8000
# open http://localhost:8000
```

Everything is vendored (GSAP in `vendor/`, fonts in `fonts/`), so it runs offline on the presentation laptop.

## Presenting

| Key | Action |
|---|---|
| → ↓ Space Enter PageDown | next stop (clickers send PageDown) |
| ← ↑ Shift+Space PageUp | previous stop |
| 0 to 8 | jump to a chapter |
| G or Esc | contents overlay, click any stop |
| F | fullscreen |
| S | toggle step mode (one wheel gesture = one stop) and free scrolling |

Clicking the stage also advances. The URL hash tracks the current stop (`#ds-wait`, `#graph`, ...), so a link or a reload lands on the same stop.

## Editing

- `js/lib.js`: the stop list (ids, titles, how long each transition glides), the palette, the sink and Pepper drawings.
- `js/scenes-a.js` to `scenes-d.js`: one builder per scene, in story order. Captions are plain strings in `caption(...)` calls.
- `js/engine.js`: stage scaling, scroll-to-timeline mapping, input, HUD. Scene code uses its helpers (`reveal`, `conceal`, `to`, `move`, `draw`) keyed by stop id.

Colour has one meaning everywhere: marigold is Mary, mint is Myra, violet is the system, vermilion is a tension, risk or adverse claim.
