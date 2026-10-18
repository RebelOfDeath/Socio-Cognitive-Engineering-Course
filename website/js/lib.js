/*
 * Shared vocabulary for the story: stops, chapters, palette, DOM helpers and
 * the recurring illustration (the floor plan of the home, with its residents
 * as dots). Scene files push builder functions onto K.scenes; main.js runs
 * them in order.
 */
(function () {
  'use strict';

  const NS = 'http://www.w3.org/2000/svg';
  const art = document.getElementById('art');
  const layer = document.getElementById('layer');

  const C = {
    bg: '#1A2340', bg2: '#243054', card: '#243054', ink: '#F4EAD5', line: '#4E4B46', muted: 'rgba(244,234,213,.46)',
    elena: '#D4A574', jan: '#F4EAD5', sys: '#E8C77A', myra: '#A9B4D6', mc: '#8C8A84', alert: '#E08A72',
  };

  const WIKI = 'https://xwiki.ewi.tudelft.nl/xwiki/wiki/sce2026group04';
  const POC = 'https://github.com/gintskk/sce-poc';

  const CHAPTERS = [
    'Cover', 'Moving in', 'Two lines', 'What matters', 'What we know', 'The technology',
    'Elena’s first week', 'The design', 'The prototype', 'How we will know', 'Meet again',
  ];

  /* w = length of the transition into this stop (in viewport heights of scroll).
     dur = how long the glide into it takes when advancing with the keyboard. */
  const STOPS = [
    { id: 'cover', ch: 0, title: 'Meaningful connections' },
    { id: 'arrive', ch: 1, title: 'Elena moves in', w: 1.4, dur: 2600 },
    { id: 'flurry', ch: 1, title: 'She meets everyone at once', w: 1.4, dur: 2600 },
    { id: 'jan', ch: 1, title: 'Jan stays in his room', w: 1.2, dur: 2000 },
    { id: 'wait', ch: 1, title: 'Same town, without knowing it', w: 1.2, dur: 2000 },
    { id: 'polite', ch: 1, title: 'Saying yes to be polite' },
    { id: 'lines', ch: 2, title: 'Two lines of the problem', w: 1.6, dur: 3000 },
    { id: 'fork', ch: 2, title: 'Why we picked connections', w: 1.4, dur: 2600 },
    { id: 'stakeholders', ch: 3, title: 'Stakeholders', w: 1.2 },
    { id: 'values', ch: 3, title: 'Human values', w: 1.2 },
    { id: 'tensions', ch: 3, title: 'Value tensions', w: 1.2 },
    { id: 'hfc', ch: 4, title: 'Human factors', w: 1.2 },
    { id: 'implies', ch: 4, title: 'Design rules', w: 1.2 },
    { id: 'tech', ch: 5, title: 'Technology choices', w: 1.2 },
    { id: 'prepared', ch: 5, title: 'Prepared sentences' },
    { id: 'interview', ch: 6, title: 'The life-story interview', w: 1.4, dur: 2400 },
    { id: 'hello', ch: 6, title: 'Pepper says hello', w: 1.3, dur: 2400 },
    { id: 'match', ch: 6, title: 'The coordinator approves a match', w: 1.4, dur: 2800 },
    { id: 'ask', ch: 6, title: 'Pepper asks Elena', w: 1.3, dur: 2400 },
    { id: 'askjan', ch: 6, title: 'Pepper asks Jan', w: 1.3, dur: 2400 },
    { id: 'meet', ch: 6, title: '“Your bread!”', w: 1.4, dur: 2600 },
    { id: 'pause', ch: 6, title: 'Pepper stays silent', w: 1.2, dur: 2200 },
    { id: 'gohome', ch: 6, title: '“When can I go home?”', w: 1.3, dur: 2400 },
    { id: 'walk', ch: 6, title: 'A walk in the garden', w: 2, dur: 4200 },
    { id: 'record', ch: 6, title: 'The record' },
    { id: 'who', ch: 7, title: 'Who decides', w: 1.2 },
    { id: 'patterns', ch: 7, title: 'How Pepper speaks', w: 1.2 },
    { id: 'never', ch: 7, title: 'What Pepper never does' },
    { id: 'claims', ch: 7, title: 'Claims', w: 1.2 },
    { id: 'poc', ch: 8, title: 'A live walkthrough', w: 1.3, dur: 2200 },
    { id: 'poc-people', ch: 8, title: 'Getting to know someone' },
    { id: 'poc-map', ch: 8, title: 'The relationship map' },
    { id: 'poc-wrong', ch: 8, title: '“I had that wrong.”' },
    { id: 'verify', ch: 9, title: 'Checking the premises', w: 1.2 },
    { id: 'study', ch: 9, title: 'The Kinnect study', w: 1.4, dur: 2600 },
    { id: 'measures', ch: 9, title: 'Measures' },
    { id: 'again', ch: 10, title: '“Would you like to meet Jan again?”', w: 1.4, dur: 2600 },
    { id: 'thanks', ch: 10, title: 'Thank you', w: 1.2, dur: 2000 },
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
    fill: 'none', stroke: C.ink, 'stroke-width': 2,
    'stroke-linecap': 'round', 'stroke-linejoin': 'round',
  }, extra);

  function block(cls, x, y, w, html, parent) {
    return place(H('div', cls, parent, html), x, y, w);
  }

  /* A link to a cited work. Opens in a new tab so the deck keeps its place. */
  const ref = (label, url) => `<a class="ref" href="${url}" target="_blank" rel="noopener">${label}</a>`;

  const doi = (label, d) => ref(label, 'https://doi.org/' + d);

  /* Top-right marker for where we are in Elena's week. */
  function dayMark(A, inId, outId, n, w) {
    const el = H('div', 'day', null, `<div class="n">${n}</div><div class="w">${w || 'Elena’s first week'}</div>`);
    A.reveal(el, inId, { a: 0.2, b: 0.7, y: -12 });
    if (outId) A.conceal(el, outId, { a: 0, b: 0.3, y: 0 });
    return el;
  }

  /* Speaker notes per stop: what we say out loud, shown with N. */
  const notes = {};
  const note = (id, ...ps) => { (notes[id] = notes[id] || []).push(...ps); };

  /* A caption: kicker, headline, a one-line subtitle (s), citation line.
     The longer body (b) goes to the speaker notes, since we tell it. */
  function caption(A, inId, outId, o) {
    if (o.b) note(inId, o.b);
    const el = H('div', 'cap' + (o.cls ? ' ' + o.cls : ''));
    place(el, o.x ?? 120, o.y ?? 250, o.w);
    let html = '';
    if (o.k) html += `<div class="k"${o.kc ? ` style="color:${o.kc}"` : ''}>${o.k}</div>`;
    if (o.t) html += `<h2>${o.t}</h2>`;
    if (o.s) html += `<p class="b">${o.s}</p>`;
    if (o.c) html += `<div class="c">${o.c}</div>`;
    el.innerHTML = html;
    A.reveal([...el.children], inId, { a: o.a ?? 0.4, b: 1, stagger: 0.06, y: 30 });
    if (outId) A.conceal(el, outId, { a: 0, b: 0.3 });
    return el;
  }

  /* One spoken line: who says it, and what. */
  function say(A, inId, outId, o) {
    const el = block('line ' + (o.cls || 'sys'), o.x, o.y, o.w,
      `<div class="who">${o.who}</div><div class="say">${o.text}</div>`);
    A.reveal(el, inId, { a: o.a ?? 0.45, b: o.b ?? 1, y: 18 });
    if (outId) A.conceal(el, outId, { a: 0, b: 0.3 });
    return el;
  }

  /* -------------------------------------------------------- the home */
  /*
   * A plain floor plan: seven rooms along the top, a corridor, the lounge
   * (with Pepper), a quiet corner and the entrance below, the garden outside.
   * Residents are dots; connections are lines drawn between them.
   */
  const PLAN = { x: 1000, y: 230, w: 800, roomH: 170, corr: 60, lowH: 190 };
  const ROOMS = [
    { id: 'R-GERRIT', n: 3, name: 'Gerrit' },
    { id: 'R-WILLEM', n: 7, name: 'Willem' },
    { id: 'R-RIA', n: 9, name: 'Ria' },
    { id: 'R-JAN', n: 12, name: 'Jan', c: 'jan' },
    { id: 'R-ELENA', n: 14, name: 'Elena', c: 'elena' },
    { id: 'R-ANS', n: 21, name: 'Ans' },
    { id: 'R-CORRIE', n: 22, name: 'Corrie' },
  ];
  const roomW = PLAN.w / ROOMS.length;
  const roomCenter = i => [PLAN.x + roomW * (i + 0.5), PLAN.y + PLAN.roomH * 0.55];
  const lowY = PLAN.y + PLAN.roomH + PLAN.corr;
  const SPOTS = {
    entrance: [PLAN.x + 720, lowY + 120],
    door: [PLAN.x + 720, lowY + PLAN.lowH + 30],
    corridor: y => [y, PLAN.y + PLAN.roomH + PLAN.corr / 2],
    lounge: [PLAN.x + 210, lowY + 100],
    table: [PLAN.x + 300, lowY + 120],
    quiet: [PLAN.x + 540, lowY + 95],
    pepper: [PLAN.x + 120, lowY + 70],
    gardenDoor: [PLAN.x + 230, lowY + PLAN.lowH],
    garden: [PLAN.x + 400, lowY + PLAN.lowH + 120],
  };

  function buildHome(A, parent) {
    const root = G(parent);
    const walls = [];
    const W = (d, extra) => { const p = S('path', ln(Object.assign({ d, 'stroke-width': 2.2 }, extra)), root); walls.push(p); return p; };
    const { x, y, w, roomH, corr, lowH } = PLAN;
    const bottom = lowY + lowH;
    // outer walls, with a gap for the entrance (right) and the garden door (bottom)
    W(`M ${x + 680} ${bottom} H ${x} V ${y} H ${x + w} V ${bottom} H ${x + 760}`);
    // rooms
    W(`M ${x} ${y + roomH} H ${x + w}`, { 'stroke-opacity': 0.5 });
    for (let i = 1; i < ROOMS.length; i++) W(`M ${x + roomW * i} ${y} V ${y + roomH}`, { 'stroke-opacity': 0.5 });
    // lower row: lounge | quiet corner | entrance hall
    W(`M ${x} ${lowY} H ${x + w}`, { 'stroke-opacity': 0.5, 'stroke-dasharray': '2 8' });
    W(`M ${x + 460} ${lowY} V ${bottom}`, { 'stroke-opacity': 0.5 });
    W(`M ${x + 620} ${lowY} V ${bottom}`, { 'stroke-opacity': 0.5 });
    // garden: a loop path outside
    const loop = S('path', ln({ d: `M ${x + 160} ${bottom + 120} C ${x + 160} ${bottom + 60} ${x + 640} ${bottom + 60} ${x + 640} ${bottom + 120} C ${x + 640} ${bottom + 180} ${x + 160} ${bottom + 180} ${x + 160} ${bottom + 120} Z`, stroke: C.jan, 'stroke-opacity': 0.55, 'stroke-dasharray': '3 9' }), root);
    gsap.set(loop, { autoAlpha: 0 });

    const labels = G(root);
    const L = (tx, ty, t, extra) => S('text', Object.assign({ x: tx, y: ty, class: 'st-mono', 'font-size': 12, fill: C.muted, 'letter-spacing': '1.6' }, extra), labels, t);
    ROOMS.forEach((r, i) => L(x + roomW * i + 12, y + 24, String(r.n).padStart(2, '0')));
    L(x + 16, lowY + 28, 'LOUNGE');
    L(x + 476, lowY + 28, 'QUIET CORNER');
    L(x + 636, lowY + 28, 'ENTRANCE');
    L(x + 16, bottom + 46, 'GARDEN');
    gsap.set(labels, { autoAlpha: 0 });

    // residents
    const dots = {};
    ROOMS.forEach((r, i) => {
      const [cx, cy] = roomCenter(i);
      const g = G(root);
      const col = r.c ? C[r.c] : C.muted;
      const p = A.xf(g, cx, cy, 1);
      const halo = S('circle', { r: 30, fill: col, 'fill-opacity': 0.12 }, g);
      const ring = S('circle', { r: 22, fill: 'none', stroke: col, 'stroke-width': 1.6, 'stroke-dasharray': '3 6', class: 'spin' }, g);
      const core = S('circle', { r: r.c ? 11 : 8, fill: col }, g);
      const name = S('text', { y: 44, 'text-anchor': 'middle', class: 'st-sans', 'font-size': 15, 'font-weight': 500, fill: r.c ? col : C.muted }, g, r.name);
      gsap.set([halo, ring], { autoAlpha: 0 });
      dots[r.name.toLowerCase()] = { g, p, halo, ring, core, name, home: [cx, cy] };
    });

    // Pepper, as a small indigo glyph in the lounge
    const pep = G(root);
    const pepP = A.xf(pep, ...SPOTS.pepper, 1);
    S('rect', { x: -13, y: -20, width: 26, height: 40, rx: 11, fill: C.sys }, pep);
    S('circle', { cx: -5, cy: -9, r: 2.6, fill: C.bg }, pep);
    S('circle', { cx: 5, cy: -9, r: 2.6, fill: C.bg }, pep);
    const pepPulse = S('circle', { r: 26, fill: 'none', stroke: C.sys, 'stroke-width': 2, class: 'pulse' }, pep);
    S('text', { y: 40, 'text-anchor': 'middle', class: 'st-mono', 'font-size': 11, fill: C.sys, 'letter-spacing': '1.6' }, pep, 'PEPPER');
    gsap.set([pep, pepPulse], { autoAlpha: 0 });

    return { root, walls, loop, labels, dots, pepper: { g: pep, p: pepP, pulse: pepPulse } };
  }

  /* A curved thread between two points, for connections. */
  function thread(parent, a, b, color, bend = -60, extra) {
    const mx = (a[0] + b[0]) / 2, my = (a[1] + b[1]) / 2 + bend;
    return S('path', ln(Object.assign({ d: `M ${a[0]} ${a[1]} Q ${mx} ${my} ${b[0]} ${b[1]}`, stroke: color, 'stroke-width': 2.6 }, extra)), parent);
  }

  window.K = {
    NS, art, layer, C, WIKI, POC, CHAPTERS, STOPS, PLAN, ROOMS, SPOTS,
    S, H, G, ln, place, block, ref, doi, caption, say, dayMark, note, notes,
    buildHome, thread,
    scenes: [], ctx: {}, L: null,
  };
})();
