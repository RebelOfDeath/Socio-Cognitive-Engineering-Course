/*
 * Shared vocabulary for the story: stops, chapters, palette, DOM helpers and
 * the two recurring illustrations (the sink and Pepper). Scene files push
 * builder functions onto K.scenes; main.js runs them in order.
 */
(function () {
  'use strict';

  const NS = 'http://www.w3.org/2000/svg';
  const art = document.getElementById('art');
  const layer = document.getElementById('layer');

  const C = {
    ink: '#0D1017', ink2: '#151A24', ink3: '#1E2431', line: '#2B3242',
    paper: '#F3EEE4', muted: '#8A92A3',
    mary: '#F4B740', myra: '#3FD8B0', sys: '#8F8CFF', alert: '#FF5E3A',
  };

  const CHAPTERS = [
    'Cover', 'The morning', 'What matters', 'The bet', 'One morning, redesigned',
    'The pattern', 'How we will know', 'The whole picture', 'What is still open',
  ];

  /* w = length of the transition into this stop (in viewport heights of scroll).
     dur = how long the glide into it takes when advancing with the keyboard. */
  const STOPS = [
    { id: 'cover', ch: 0, title: 'The wait is the design' },
    { id: 'dawn', ch: 1, title: '7:40 a.m. at the sink', w: 1.2, dur: 1900 },
    { id: 'steps', ch: 1, title: 'Nine small steps' },
    { id: 'stall', ch: 1, title: 'She pauses', w: 1.4, dur: 2600 },
    { id: 'subproblems', ch: 1, title: 'Three ways the thread breaks' },
    { id: 'round', ch: 1, title: 'Myra’s morning round', w: 1.4, dur: 2400 },
    { id: 'returns', ch: 1, title: 'Every return costs someone', w: 1.4, dur: 3000 },
    { id: 'rogers', ch: 1, title: 'The method works, and costs time' },
    { id: 'personas', ch: 2, title: 'Mary and Myra' },
    { id: 'stakeholders', ch: 2, title: 'Five stakeholders', w: 1.2 },
    { id: 'values', ch: 2, title: 'Six values', w: 1.3, dur: 2000 },
    { id: 'instrumental', ch: 2, title: 'Attentive care is a means' },
    { id: 'tensions', ch: 2, title: 'Seven tensions', w: 1.4, dur: 2400 },
    { id: 'open-tensions', ch: 2, title: 'Two stay open' },
    { id: 'hfc', ch: 2, title: 'Five human-factors mechanisms' },
    { id: 'warden', ch: 2, title: 'The warden problem', w: 1.2 },
    { id: 'bet', ch: 3, title: 'What if the robot carried the wait?' },
    { id: 'tech', ch: 3, title: 'Six technology options', w: 1.5, dur: 2600 },
    { id: 'pepper', ch: 3, title: 'Evidence against Pepper', w: 1.3, dur: 2200 },
    { id: 'sensors', ch: 3, title: 'Track the items, not the person', w: 1.3, dur: 2200 },
    { id: 'ds-start', ch: 4, title: 'Pepper says nothing', w: 1.3, dur: 2400 },
    { id: 'ds-wait', ch: 4, title: 'The wait', w: 1.8, dur: 3600 },
    { id: 'ds-l1', ch: 4, title: 'The lightest prompt', w: 1.5, dur: 3000 },
    { id: 'ds-l2', ch: 4, title: 'One level more specific', w: 1.6, dur: 3200 },
    { id: 'ds-done', ch: 4, title: '“All done.”', w: 1.5, dur: 2800 },
    { id: 'ds-record', ch: 4, title: 'Three facts on Myra’s phone', w: 1.2 },
    { id: 'ds-safety', ch: 4, title: 'If nothing moves at all' },
    { id: 'ladder', ch: 5, title: 'Respectful graduated prompting', w: 1.3, dur: 2200 },
    { id: 'direction', ch: 5, title: 'Which way the ladder runs' },
    { id: 'tdp', ch: 5, title: 'Who does what', w: 1.3 },
    { id: 'handover', ch: 5, title: 'When it fails, it says so' },
    { id: 'objectives', ch: 6, title: 'Six objectives' },
    { id: 'claims', ch: 6, title: 'Nine claims', w: 1.5, dur: 2600 },
    { id: 'risky', ch: 6, title: 'Where we are most exposed' },
    { id: 'measures', ch: 6, title: 'Seven measures' },
    { id: 'evaluation', ch: 6, title: 'Three evaluations, cheapest first', w: 1.2 },
    { id: 'graph', ch: 7, title: 'Everything, in one picture', w: 2.4, dur: 4200 },
    { id: 'strains', ch: 7, title: 'Costs we accepted on purpose' },
    { id: 'nodata', ch: 8, title: 'No resident has been asked yet' },
    { id: 'open', ch: 8, title: 'Four things to settle' },
    { id: 'fallbacks', ch: 8, title: 'If we are wrong', w: 1.2 },
    { id: 'close', ch: 8, title: 'Thank you', w: 1.4, dur: 2400 },
  ];

  /* ------------------------------------------------------------ helpers */

  function S(tag, attrs, parent, text) {
    const e = document.createElementNS(NS, tag);
    if (attrs) for (const k in attrs) if (attrs[k] != null) e.setAttribute(k, attrs[k]);
    if (text != null) e.textContent = text;
    (parent || art).appendChild(e);
    return e;
  }

  function H(tag, cls, parent, html) {
    const e = document.createElement(tag);
    if (cls) e.className = cls;
    if (html != null) e.innerHTML = html;
    (parent || layer).appendChild(e);
    return e;
  }

  function place(e, x, y, w, h) {
    e.style.left = x + 'px';
    e.style.top = y + 'px';
    if (w != null) e.style.width = w + 'px';
    if (h != null) e.style.height = h + 'px';
    return e;
  }

  const G = (parent, attrs) => S('g', attrs, parent);

  const ln = extra => Object.assign({
    fill: 'none', stroke: C.paper, 'stroke-width': 2.4,
    'stroke-linecap': 'round', 'stroke-linejoin': 'round',
  }, extra);

  /* Absolutely positioned HTML block, returned for chaining. */
  function block(cls, x, y, w, html, parent) {
    return place(H('div', cls, parent, html), x, y, w);
  }

  /* SVG + HTML pair that can be moved and scaled together. */
  function pair(A) {
    const g = G(K.L.main);
    const div = H('div', 'pair');
    const p = A.proxy({ x: 0, y: 0, s: 1 }, q => {
      const v = `translate(${q.x.toFixed(2)} ${q.y.toFixed(2)}) scale(${q.s.toFixed(4)})`;
      if (v !== q._v) {
        q._v = v;
        g.setAttribute('transform', v);
        div.style.transform = `translate(${q.x.toFixed(2)}px, ${q.y.toFixed(2)}px) scale(${q.s.toFixed(4)})`;
      }
    });
    return { g, div, p };
  }

  /* A caption: kicker, headline, optional quote, body, citation. */
  function caption(A, inId, outId, o) {
    const el = H('div', 'cap' + (o.cls ? ' ' + o.cls : ''));
    place(el, o.x ?? 120, o.y ?? 250, o.w);
    let html = '';
    if (o.k) html += `<div class="k"${o.kc ? ` style="color:${o.kc}"` : ''}>${o.k}</div>`;
    if (o.t) html += `<h2>${o.t}</h2>`;
    if (o.q) html += `<div class="q">${o.q}</div>`;
    if (o.b) html += `<p class="b">${o.b}</p>`;
    if (o.c) html += `<div class="c">${o.c}</div>`;
    el.innerHTML = html;
    A.reveal([...el.children], inId, { a: o.a ?? 0.45, b: 1, stagger: 0.06, y: 30 });
    if (outId) A.conceal(el, outId, { a: 0, b: 0.3 });
    return el;
  }

  function textWidth(el) {
    try { return el.getBBox().width; } catch (e) { return el.textContent.length * 8; }
  }

  /* ------------------------------------------------------------- the sink */
  /* Drawn in local coordinates: (0, 0) is the middle of the counter top. */

  function buildSink(A, parent) {
    const root = G(parent);
    const lines = [];
    const L = (tag, attrs, p) => { const e = S(tag, ln(attrs), p || root); lines.push(e); return e; };

    L('rect', { x: -180, y: -392, width: 360, height: 242, rx: 18, 'stroke-opacity': 0.6 });
    L('path', { d: 'M -130 -220 L -40 -310 M -100 -196 L -20 -276', 'stroke-opacity': 0.22 });
    L('rect', { x: -420, y: 0, width: 840, height: 24, rx: 5 });
    L('ellipse', { cx: 0, cy: -1, rx: 122, ry: 10, 'stroke-opacity': 0.7 });
    L('rect', { x: -392, y: 24, width: 784, height: 240, rx: 4, 'stroke-opacity': 0.22 });
    L('path', { d: 'M 0 44 V 244 M -22 140 H -12 M 12 140 H 22', 'stroke-opacity': 0.22 });
    // tap
    L('path', { d: 'M -10 -8 V -76 Q -10 -104 20 -104 H 50 Q 64 -104 64 -90 V -80' });
    L('path', { d: 'M -28 -8 H 8 M -10 -60 L -40 -66' });
    // cup
    const cup = L('path', { d: 'M -392 -94 L -384 0 L -330 0 L -322 -94 Z' });

    // weight pads and flow sensor (system violet), hidden until the sensors stop
    const padCup = S('rect', { x: -398, y: -4, width: 82, height: 5, rx: 2, fill: C.sys }, root);
    const padPaste = S('rect', { x: 158, y: -4, width: 214, height: 5, rx: 2, fill: C.sys }, root);
    const flow = S('rect', { x: -18, y: -52, width: 16, height: 13, rx: 3, fill: C.sys }, root);
    gsap.set([padCup, padPaste, flow], { autoAlpha: 0 });

    // water from the spout
    const water = S('path', ln({ d: 'M 58 -78 V -10 M 64 -78 V -8 M 70 -78 V -10', 'stroke-width': 2, stroke: C.paper, 'stroke-opacity': 0.55, 'stroke-dasharray': '6 5', class: 'marching' }), root);
    gsap.set(water, { autoAlpha: 0 });

    // toothpaste (outer = placement proxy)
    const pasteG = G(root);
    const pasteP = A.xf(pasteG, 265, -12, 1, 0);
    S('rect', { x: -96, y: -7, width: 20, height: 14, rx: 3, fill: C.ink2, stroke: C.paper, 'stroke-width': 2.2 }, pasteG);
    S('path', { d: 'M -76 -12 C -20 -13 30 -11 70 -5 L 86 -7 L 86 7 L 70 5 C 30 11 -20 13 -76 12 Z', fill: C.ink2, stroke: C.paper, 'stroke-width': 2.2, 'stroke-linejoin': 'round' }, pasteG);

    // toothbrush: outer placement proxy, inner wiggle group
    const brushG = G(root);
    const brushP = A.xf(brushG, -234, -9, 1, 0);
    const brushW = G(brushG);
    S('rect', { x: -80, y: -4.5, width: 120, height: 9, rx: 4.5, fill: C.ink2, stroke: C.paper, 'stroke-width': 2.2 }, brushW);
    S('rect', { x: 38, y: -6, width: 36, height: 11, rx: 4, fill: C.ink2, stroke: C.paper, 'stroke-width': 2.2 }, brushW);
    S('path', ln({ d: 'M 43 -8 V -20 M 50 -8 V -20 M 57 -8 V -20 M 64 -8 V -20 M 71 -8 V -20', 'stroke-width': 2 }), brushW);
    const motion = S('circle', { cx: -48, cy: 0, r: 4.5, fill: C.sys }, brushW);
    gsap.set(motion, { autoAlpha: 0 });

    // sensor event flashes (pulse loop in CSS; visibility scrubbed)
    const flash = (x, y, p) => {
      const f = S('circle', { cx: x, cy: y, r: 16, fill: 'none', stroke: C.sys, 'stroke-width': 3, class: 'pulse' }, p || root);
      gsap.set(f, { autoAlpha: 0 });
      return f;
    };
    const flashes = {
      motion: flash(-48, 0, brushW),
      cup: flash(-357, -2),
      paste: flash(265, -2),
      flow: flash(-10, -46),
    };

    // Mary, as a presence: a marigold dot. Outer proxy, inner wiggle.
    const maryG = G(root);
    const maryP = A.xf(maryG, -620, -90, 1, 0);
    const maryW = G(maryG);
    S('circle', { r: 46, fill: 'url(#glow-mary)' }, maryW);
    S('circle', { r: 13, fill: C.mary }, maryW);
    const pause = S('circle', { r: 28, fill: 'none', stroke: C.mary, 'stroke-width': 2.4, 'stroke-dasharray': '5 7', class: 'spin' }, maryW);
    const stall = S('circle', { r: 28, fill: 'none', stroke: C.alert, 'stroke-width': 2.6, 'stroke-dasharray': '5 7', class: 'spin' }, maryW);
    gsap.set([maryG, pause, stall], { autoAlpha: 0 });

    return {
      root, lines, cup, padCup, padPaste, flow, water, motion, flashes,
      brushG, brushP, brushW, pasteG, pasteP,
      mary: { g: maryG, p: maryP, w: maryW, pause, stall },
      objects: [brushG, pasteG],
    };
  }

  /* --------------------------------------------------------------- Pepper */
  /* Local origin at the middle of the base; the head top is at about y = -610. */

  function buildPepper(A, parent) {
    const root = G(parent);
    const st = { fill: C.ink2, stroke: C.sys, 'stroke-width': 3, 'stroke-linejoin': 'round' };
    S('path', Object.assign({ d: 'M -110 0 C -100 -120 -72 -225 -58 -262 L 58 -262 C 72 -225 100 -120 110 0 Z' }, st), root);
    S('path', { d: 'M -80 -428 C -112 -400 -122 -330 -112 -270', fill: 'none', stroke: C.sys, 'stroke-width': 15, 'stroke-linecap': 'round', 'stroke-opacity': 0.85 }, root);
    S('path', { d: 'M 80 -428 C 112 -400 122 -330 112 -270', fill: 'none', stroke: C.sys, 'stroke-width': 15, 'stroke-linecap': 'round', 'stroke-opacity': 0.85 }, root);
    S('path', Object.assign({ d: 'M -76 -262 C -84 -330 -86 -400 -72 -440 L 72 -440 C 86 -400 84 -330 76 -262 Z' }, st), root);
    S('rect', { x: -46, y: -412, width: 92, height: 66, rx: 7, fill: C.ink, stroke: C.sys, 'stroke-width': 2 }, root);
    const tabletGlow = S('rect', { x: -46, y: -412, width: 92, height: 66, rx: 7, fill: C.sys, 'fill-opacity': 0.3 }, root);
    const picto = G(root);
    S('circle', { cx: -16, cy: -380, r: 15, fill: 'none', stroke: C.paper, 'stroke-width': 2.4 }, picto);
    S('path', ln({ d: 'M -4 -372 L 30 -396', 'stroke-width': 3.4 }), picto);
    S('path', ln({ d: 'M 24 -400 L 33 -388', 'stroke-width': 4 }), picto);
    gsap.set([tabletGlow, picto], { autoAlpha: 0 });

    S('rect', Object.assign({ x: -16, y: -472, width: 32, height: 36, rx: 8 }, st), root);
    S('path', Object.assign({ d: 'M -80 -545 C -80 -630 80 -630 80 -545 C 80 -494 52 -470 0 -470 C -52 -470 -80 -494 -80 -545 Z' }, st), root);
    const eyes = [-30, 30].map(x => S('circle', { cx: x, cy: -548, r: 14, fill: C.sys, 'fill-opacity': 0.95, stroke: C.sys, 'stroke-width': 2 }, root));
    const cams = [-590, -505].map(y => S('circle', { cx: 0, cy: y, r: 6, fill: '#05060a', stroke: C.muted, 'stroke-width': 1.6 }, root));
    const covers = [-590, -505].map(y => {
      const cg = G(root);
      S('rect', { x: -13, y: y - 7, width: 26, height: 14, rx: 4, fill: C.paper }, cg);
      return { g: cg, p: A.xf(cg, 0, -26, 1, 0) };
    });
    gsap.set(covers.map(c => c.g), { autoAlpha: 0 });
    return { root, eyes, cams, covers, tabletGlow, picto };
  }

  /* A small tool-like sink-side device (TECH-05) */
  function buildDevice(parent) {
    const root = G(parent);
    S('rect', { x: -64, y: -92, width: 128, height: 92, rx: 12, fill: C.ink2, stroke: C.paper, 'stroke-width': 2.4 }, root);
    S('rect', { x: -48, y: -76, width: 58, height: 40, rx: 4, fill: 'none', stroke: C.paper, 'stroke-width': 1.8 }, root);
    for (let i = 0; i < 3; i++) for (let j = 0; j < 3; j++) S('circle', { cx: 26 + i * 10, cy: -68 + j * 10, r: 2.4, fill: C.paper }, root);
    S('rect', { x: -48, y: -26, width: 96, height: 8, rx: 4, fill: C.sys, 'fill-opacity': 0.7 }, root);
    return root;
  }

  window.K = {
    NS, art, layer, C, CHAPTERS, STOPS,
    S, H, G, ln, place, block, pair, caption, textWidth,
    buildSink, buildPepper, buildDevice,
    scenes: [], ctx: {}, L: null,
  };
})();
