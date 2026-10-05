/* Cover, I · The morning, II · What matters */
(function () {
  'use strict';
  const { C, S, H, G, ln, place, block, caption, textWidth } = K;
  const X = K.ctx;

  const STRIP = { x0: 880, dx: 100, y: 905 };
  const stepX = k => STRIP.x0 + k * STRIP.dx;
  const RING = { x: 1500, y: 520, r: 215 };
  const ringPos = k => {
    const a = (-90 + k * 40) * Math.PI / 180;
    return [RING.x + RING.r * Math.cos(a), RING.y + RING.r * Math.sin(a)];
  };
  Object.assign(X, { STRIP, stepX, RING, ringPos });

  const STEP_LABELS = [
    ['Time to', 'brush'], ['Go to', 'the sink'], ['Find', 'the items'], ['Pick up', 'the brush'],
    ['Open', 'the paste'], ['Apply', 'the paste'], ['Brush'], ['Rinse', 'and spit'], ['Put', 'away'],
  ];

  /* ------------------------------------------------------------ shared */
  K.scenes.push(function setup(A) {
    K.L = { bg: G(), main: G(), top: G() };

    X.clock = S('text', { x: 1290, y: 360, 'text-anchor': 'middle', class: 'st-serif', 'font-size': 400, fill: C.paper, 'fill-opacity': 0.05 }, K.L.bg, '07:40');
    gsap.set(X.clock, { autoAlpha: 0 });

    X.sink = K.buildSink(A, K.L.main);
    X.sinkP = A.xf(X.sink.root, 1270, 560, 1);

    X.pepper = K.buildPepper(A, K.L.main);
    X.pepperP = A.xf(X.pepper.root, 1330, 930, 1.05);
    gsap.set(X.pepper.root, { autoAlpha: 0 });

    // brushing wiggle shared by brush and Mary
    X.wig = A.proxy({ v: 0 }, q => {
      const o = Math.sin(q.v * Math.PI * 2 * 6) * 13;
      const t = `translate(${o.toFixed(2)} 0)`;
      if (t !== q._t) { q._t = t; X.sink.brushW.setAttribute('transform', t); X.sink.mary.w.setAttribute('transform', t); }
    });

    // the nine-step strip
    X.stripLine = S('line', { x1: stepX(0), y1: STRIP.y, x2: stepX(8), y2: STRIP.y, stroke: '#3a4254', 'stroke-width': 2 }, K.L.top);
    X.stripLabels = STEP_LABELS.map((lines, k) => {
      const g = G(K.L.top);
      S('text', { x: stepX(k), y: STRIP.y + 38, 'text-anchor': 'middle', class: 'st-mono', 'font-size': 12, fill: C.muted, 'letter-spacing': '1' }, g, String(k + 1).padStart(2, '0'));
      lines.forEach((l, i) => S('text', { x: stepX(k), y: STRIP.y + 58 + i * 18, 'text-anchor': 'middle', class: 'st-sans', 'font-size': 14.5, fill: C.paper, 'fill-opacity': 0.85 }, g, l));
      return g;
    });
    gsap.set([X.stripLine, ...X.stripLabels], { autoAlpha: 0 });

    X.dotsG = G(K.L.top);
    X.dots = STEP_LABELS.map((_, k) => {
      const g = G(X.dotsG);
      const [x, y] = ringPos(k);
      const p = A.xf(g, x, y, 1.5);
      const halo = S('circle', { r: 19, fill: 'none', stroke: C.alert, 'stroke-width': 2.2, 'stroke-dasharray': '4 5', class: 'spin' }, g);
      const core = S('circle', { r: 9, fill: C.mary, stroke: C.mary, 'stroke-width': 2, class: 'pop', style: `animation-delay:${0.35 + k * 0.07}s` }, g);
      gsap.set(halo, { autoAlpha: 0 });
      return { g, p, halo, core };
    });
    X.lit = (k, id, a, b) => A.to(X.dots[k].core, id, { attr: { fill: C.mary, stroke: C.mary } }, a, b ?? a + 0.08);
    X.unlit = (k, id, a, b) => A.to(X.dots[k].core, id, { attr: { fill: C.ink, stroke: C.paper } }, a, b ?? a + 0.08);
  });

  /* ------------------------------------------------------------- cover */
  K.scenes.push(function cover(A) {
    const ring = S('circle', { cx: RING.x, cy: RING.y, r: RING.r, fill: 'none', stroke: '#262c39', 'stroke-width': 1.5 }, K.L.bg);
    const arc = S('circle', { cx: RING.x, cy: RING.y, r: 262, fill: 'none', stroke: C.sys, 'stroke-width': 3, 'stroke-linecap': 'round', 'stroke-dasharray': '300 1346', class: 'spin' }, K.L.bg);
    const glow = S('circle', { cx: RING.x, cy: RING.y, r: 60, fill: 'url(#glow-mary)' }, K.L.bg);
    const core = S('circle', { cx: RING.x, cy: RING.y, r: 15, fill: C.mary, class: 'breathe' }, K.L.bg);
    const note = S('text', { x: RING.x, y: RING.y + 330, 'text-anchor': 'middle', class: 'st-mono', 'font-size': 13, fill: C.muted, 'letter-spacing': '2.2' }, K.L.bg, 'NINE STEPS · ONE DELIBERATE PAUSE');
    X.cover = { ring, arc, glow, core, note };

    const el = block('abs cover', 0, 0, 1920, `
      <div class="abs kicker rise" style="left:120px;top:150px">Socio-Cognitive Engineering 2026 · Group 04 · Final design</div>
      <div class="abs statement rise" style="left:110px;top:238px"><h1>The <em>wait</em><br>is the design.</h1></div>
      <p class="abs lede rise" style="left:120px;top:640px;width:800px;margin:0">How a quiet robot, a few sensors on everyday objects and a care worker’s phone could help a person with dementia brush her own teeth.</p>
      <div class="abs names rise" style="left:120px;top:858px">Diana Banţă <i></i> Roham Koohestani <i></i> Gints Kuļikovskis <i></i> Antoni Nowakowski <i></i> Rayan Salmi</div>
      <div class="abs hint rise" style="right:120px;top:950px"><span class="key">→</span> or <span class="key">space</span> to begin <span style="width:18px"></span><span class="key">F</span> fullscreen <span style="width:18px"></span><span class="key">G</span> contents</div>`);
    el.style.height = '1080px';
    A.conceal(el, 'dawn', { a: 0, b: 0.3, y: -40 });
    A.conceal([ring, arc, glow, core, note], 'dawn', { a: 0, b: 0.3 });
  });

  /* ------------------------------------------------------------- dawn */
  K.scenes.push(function dawn(A) {
    const sk = X.sink;
    A.reveal(X.clock, 'dawn', { a: 0.15, b: 0.9 });
    A.conceal(X.clock, 'round', { a: 0, b: 0.4 });
    A.draw(sk.lines, 'dawn', 0.12, 0.9, { stagger: 0.035 });
    A.reveal(sk.objects, 'dawn', { a: 0.55, b: 0.95, stagger: 0.08 });

    X.dots.forEach((d, k) => {
      A.move(d.p, 'dawn', { x: stepX(k), y: STRIP.y, s: 0.6 }, 0.04 + k * 0.035, 0.62 + k * 0.03);
      X.unlit(k, 'dawn', 0.25, 0.7);
    });

    caption(A, 'dawn', 'steps', {
      k: 'I · The morning', t: '7:40 a.m. The bathroom sink.',
      b: 'Mary lives with dementia in a care home. Most mornings a care worker reminds her that it is time to brush her teeth. It takes two to five minutes, twice a day, and she can still carry out every step herself.',
      c: 'SA-01 · Brushing teeth',
    });
  });

  /* ------------------------------------------------------------- steps */
  K.scenes.push(function steps(A) {
    A.reveal(X.stripLine, 'steps', { a: 0.1, b: 0.5 });
    X.dots.forEach((d, k) => A.move(d.p, 'steps', { s: 1 }, 0.1 + k * 0.04, 0.4 + k * 0.04));
    A.reveal(X.stripLabels, 'steps', { a: 0.3, b: 1, stagger: 0.05 });
    caption(A, 'steps', 'stall', {
      t: 'Nine small steps.',
      b: 'Tooth brushing breaks down into nine steps. Care staff already have a workaround for each one: a verbal reminder, the brush placed in front of her, the paste put on for her, a demonstration, and at the far end, doing it for her.',
      c: 'SA-01 tasks 1 to 9 · Rogers et al. (1999)',
    });
  });

  /* ------------------------------------------------------------- stall */
  K.scenes.push(function stall(A) {
    const sk = X.sink, m = sk.mary;
    A.reveal(m.g, 'stall', { a: 0, b: 0.12 });
    A.move(m.p, 'stall', { x: -234, y: -46 }, 0, 0.3);
    [0, 1, 2].forEach(k => X.lit(k, 'stall', 0.12 + k * 0.06));
    A.move(sk.brushP, 'stall', { y: -112, r: -16 }, 0.34, 0.5);
    A.move(m.p, 'stall', { x: -292, y: -106 }, 0.34, 0.5);
    X.lit(3, 'stall', 0.44);
    A.reveal(m.stall, 'stall', { a: 0.5, b: 0.6 });
    A.move(sk.brushP, 'stall', { y: -9, r: 0 }, 0.66, 0.84);
    A.move(m.p, 'stall', { x: -234, y: -52 }, 0.66, 0.84);
    X.unlit(3, 'stall', 0.72);
    A.reveal(X.dots[4].halo, 'stall', { a: 0.84, b: 0.96 });

    caption(A, 'stall', 'subproblems', {
      k: 'PS-01 · The problem', kc: C.alert,
      t: 'She picks up the brush. Pauses. Puts it down.',
      b: 'The toothbrush and toothpaste are in plain sight. The care worker prompts her to pick up the paste; she applies it, and pauses again. The breakdown is precise: she cannot work out her next action without a verbal prompt.',
      c: 'PS-01 · Losing track of the routine',
    });
  });

  /* ------------------------------------------------------- subproblems */
  K.scenes.push(function subproblems(A) {
    A.to(X.sink.root, 'subproblems', { autoAlpha: 0.28 }, 0, 0.5);
    const y = STRIP.y - 38;
    const groups = [
      { name: 'Initiation', k0: 0, k1: 1 },
      { name: 'Sequencing', k0: 2, k1: 7 },
      { name: 'Completion', k0: 8, k1: 8 },
    ];
    const els = [];
    groups.forEach((gr, i) => {
      const x1 = stepX(gr.k0) - 30, x2 = stepX(gr.k1) + 30;
      const p = S('path', ln({ d: `M ${x1} ${y + 10} V ${y} H ${x2} V ${y + 10}`, stroke: C.alert, 'stroke-width': 2 }), K.L.top);
      const t = S('text', { x: (x1 + x2) / 2, y: y - 14, 'text-anchor': 'middle', class: 'st-mono', 'font-size': 13, fill: C.alert, 'letter-spacing': '2' }, K.L.top, gr.name.toUpperCase());
      A.draw(p, 'subproblems', 0.35 + i * 0.1, 0.7 + i * 0.1);
      A.reveal(t, 'subproblems', { a: 0.45 + i * 0.1, b: 0.8 + i * 0.1 });
      els.push(p, t);
    });
    X.brackets = els;
    A.conceal(els, 'round', { a: 0, b: 0.3 });

    caption(A, 'subproblems', 'round', {
      t: 'Three ways the thread breaks.',
      b: '<b>Initiation</b>: knowing it is time, and starting. <b>Sequencing</b>: keeping track of what comes next. <b>Completion</b>: finishing, instead of stopping part-way. Underneath sit two root causes: remembering the sequence, and recognising what an object is for.',
      c: 'PS-01 · Sub-problems and root causes',
    });
  });

  /* ---------------------------------------------------- round, returns */
  K.scenes.push(function round(A) {
    const sk = X.sink;
    // clear the strip and the stall markers
    A.conceal([X.dotsG, X.stripLine, ...X.stripLabels], 'round', { a: 0, b: 0.3 });
    A.conceal([sk.mary.stall, X.dots[4].halo], 'round', { a: 0, b: 0.3 });
    // shrink the sink into Mary's room
    A.to(sk.root, 'round', { autoAlpha: 1 }, 0.05, 0.4);
    A.move(X.sinkP, 'round', { x: 960, y: 412, s: 0.24 }, 0.05, 0.62);
    A.move(sk.mary.p, 'round', { s: 2.6 }, 0.05, 0.62);

    const plan = G(K.L.bg);
    const rooms = [];
    const xs = [840, 1080, 1320, 1560];
    [290, 610].forEach((y, row) => xs.forEach((x, i) => {
      const n = row * 4 + i + 1;
      const g = G(plan);
      S('rect', { x: x + 6, y: y + 6, width: 228, height: 208, rx: 10, fill: C.ink2, 'fill-opacity': 0.55, stroke: n === 1 ? C.mary : '#2f3646', 'stroke-width': n === 1 ? 2 : 1.4, 'stroke-opacity': n === 1 ? 0.7 : 1 }, g);
      S('text', { x: x + 24, y: y + 38, class: 'st-mono', 'font-size': 12, fill: n === 1 ? C.mary : C.muted, 'letter-spacing': '1.6' }, g, n === 1 ? 'ROOM 1 · MARY' : 'ROOM ' + n);
      rooms.push({ g, n, cx: x + 120, cy: y + 118 });
    }));
    const corridor = S('text', { x: 1800, y: 566, 'text-anchor': 'end', class: 'st-mono', 'font-size': 11, fill: '#4b5366', 'letter-spacing': '2' }, plan, 'CORRIDOR');
    A.reveal(rooms.map(r => r.g), 'round', { a: 0.3, b: 0.85, stagger: 0.04 });
    A.reveal(corridor, 'round', { a: 0.6, b: 0.9 });

    const waits = [];
    rooms.filter(r => r.n !== 1).forEach(r => {
      const d = S('circle', { cx: r.cx, cy: r.cy, r: 8, fill: C.muted }, plan);
      const ring = S('circle', { cx: r.cx, cy: r.cy, r: 22, fill: 'none', stroke: C.alert, 'stroke-width': 2, class: 'pulse slow' }, plan);
      gsap.set(ring, { autoAlpha: 0 });
      A.reveal(d, 'round', { a: 0.5, b: 0.9 });
      waits.push(ring);
    });

    // Myra's route: every pass through the corridor gets its own lane
    const R = [960, 1200, 1440, 1680], IN = 486, OUT = 634, lane = k => 526 + k * 9.5;
    const pts = [
      [790, lane(0)], [R[0], lane(0)], [R[0], IN],
      [R[0], lane(1)], [R[1], lane(1)], [R[1], IN],
      [R[1], lane(2)], [R[0], lane(2)], [R[0], IN],
      [R[0], lane(3)], [R[2], lane(3)], [R[2], OUT],
      [R[2], lane(4)], [R[0], lane(4)], [R[0], IN],
      [R[0], lane(5)], [R[3], lane(5)], [R[3], IN],
      [R[3], lane(6)], [R[0], lane(6)], [R[0], IN],
      [R[0], lane(7)], [R[1], lane(7)], [R[1], OUT],
      [R[1], lane(8)], [R[0], lane(8)], [R[0], IN],
    ];
    const cum = [0];
    for (let i = 1; i < pts.length; i++) cum.push(cum[i - 1] + Math.hypot(pts[i][0] - pts[i - 1][0], pts[i][1] - pts[i - 1][1]));
    const len = cum[cum.length - 1];
    const frac = i => cum[i] / len;
    const returns = [8, 14, 20, 26].map(frac);

    const route = S('path', { d: 'M ' + pts.map(p => p.join(' ')).join(' L '), fill: 'none', stroke: C.myra, 'stroke-width': 2.6, 'stroke-opacity': 0.85, 'stroke-linejoin': 'round', 'stroke-linecap': 'round' }, K.L.main);
    const myra = G(K.L.main);
    S('circle', { r: 26, fill: C.myra, 'fill-opacity': 0.14 }, myra);
    S('circle', { r: 10, fill: C.myra }, myra);
    const counter = block('abs counter', 840, 850, 900, '<span class="num">0</span><span class="label" style="color:var(--myra)">returns to Mary’s room<br><span style="color:var(--muted)">while seven other residents wait their turn</span></span>');
    const num = counter.querySelector('.num');
    const plen = route.getTotalLength();
    route.setAttribute('stroke-dasharray', `${plen} ${plen}`);
    const rp = A.proxy({ p: 0 }, q => {
      const pt = route.getPointAtLength(q.p * plen);
      myra.setAttribute('transform', `translate(${pt.x.toFixed(1)} ${pt.y.toFixed(1)})`);
      route.setAttribute('stroke-dashoffset', (plen * (1 - q.p)).toFixed(1));
      const n = returns.filter(f => q.p >= f - 1e-4).length;
      if (n !== q._n) { q._n = n; num.textContent = n; }
    });
    gsap.set(myra, { autoAlpha: 0 });
    A.reveal(myra, 'round', { a: 0.55, b: 0.7 });
    A.move(rp, 'round', { p: frac(5) }, 0.62, 1, 'power1.inOut');
    A.move(rp, 'returns', { p: 1 }, 0.02, 0.96, 'none');
    A.reveal(counter, 'returns', { a: 0, b: 0.2 });
    A.reveal(waits, 'returns', { a: 0.15, b: 0.95, stagger: 0.1 });

    const out = [plan, route, myra, counter, sk.root];
    A.conceal(out.slice(0, 3).concat(sk.root), 'rogers', { a: 0, b: 0.35 });
    A.conceal(counter, 'rogers', { a: 0, b: 0.3 });
    A.conceal(sk.mary.g, 'rogers', { a: 0, b: 0.3 });

    caption(A, 'round', 'returns', {
      t: 'Meanwhile, Myra has a whole round.',
      b: 'One care worker covers several residents in the busiest part of the day: waking, washing and dressing, medication, and prompting each resident through personal care. At the end she writes it all up for handover.',
      c: 'SA-03 · The morning care round',
    });
    caption(A, 'returns', 'rogers', {
      t: 'Every return to Mary is time someone else waits.',
      b: 'Step-by-step prompting eats the round. Under that pressure, care workers take over steps that residents could still do themselves. It is quicker, and it costs the resident the chance to do it.',
      c: 'SA-03 breakdowns · VT-07',
    });
  });

  /* ------------------------------------------------------------ rogers */
  K.scenes.push(function rogers(A) {
    const left = block('abs stat', 790, 270, 500, `
      <div class="lab c-mary">Self-dressing with graduated prompting</div>
      <div class="num c-mary">+26%</div>
      <div class="sub">with significantly fewer physical assists and fewer disruptive behaviours than usual care</div>`);
    const right = block('abs stat', 1340, 270, 480, `
      <div class="lab c-myra">Caregiver time, against usual care</div>
      <div class="num c-myra"><em>More</em></div>
      <div class="sub">considerably more, in the same study: the time a morning round does not have</div>`);
    const link = S('path', ln({ d: 'M 800 780 H 1810', stroke: C.alert, 'stroke-width': 2, 'stroke-dasharray': '2 8' }), K.L.main);
    const tag = block('pill solid c-alert', 1110, 762, null, 'VT-07 · competence against attentive care');
    A.reveal([left, right], 'rogers', { a: 0.35, b: 0.95, stagger: 0.12 });
    A.reveal(link, 'rogers', { a: 0.7, b: 1 });
    A.reveal(tag, 'rogers', { a: 0.75, b: 1 });
    A.conceal([left, right, tag], 'personas', { a: 0, b: 0.3 });
    A.conceal(link, 'personas', { a: 0, b: 0.3 });

    caption(A, 'rogers', 'personas', {
      t: 'The method works. It costs the one thing the round lacks.',
      b: 'In nursing-home morning care, systematic graduated prompting of residents with dementia raised self-dressing by 26%. It also took considerably more caregiver time than usual care.',
      c: 'Rogers et al. (1999) · HFC-03',
    });
  });

  /* ---------------------------------------------------------- personas */
  K.scenes.push(function personas(A) {
    const mary = block('card persona', 790, 225, 500, `
      <div class="id">HP-01 · Resident</div>
      <div class="name c-mary">Mary</div>
      <div class="lab">Needs</div>
      <p>Calm, short cues. Time to act before anyone prompts her. Nothing said in a way she would find childish.</p>
      <div class="lab no">Will not accept</div>
      <p class="refuse">Being filmed in her bathroom.</p>`);
    mary.style.setProperty('--accent', C.mary);
    mary.style.height = '540px';
    const myra = block('card persona', 1320, 225, 500, `
      <div class="id">HP-02 · Care worker</div>
      <div class="name c-myra">Myra</div>
      <div class="lab">Needs</div>
      <p>Calls that are rare and meaningful. A record short enough to read on her phone during the round.</p>
      <div class="lab no">Will not accept</div>
      <p class="refuse">A device that could double as surveillance of her work, or a flood of non-critical alerts.</p>`);
    myra.style.setProperty('--accent', C.myra);
    myra.style.height = '540px';
    A.reveal([mary, myra], 'personas', { a: 0.35, b: 0.95, stagger: 0.12, y: 40 });
    // fold the cards into the stakeholder nodes
    A.to(mary, 'stakeholders', { x: 20, y: -250, scale: 0.12, autoAlpha: 0, ease: 'power3.in' }, 0, 0.45);
    A.to(myra, 'stakeholders', { x: -510, y: -130, scale: 0.12, autoAlpha: 0, ease: 'power3.in' }, 0.04, 0.49);

    caption(A, 'personas', 'stakeholders', {
      k: 'II · What matters',
      t: 'Two people the design has to satisfy.',
      b: 'Mary and Myra are the two direct stakeholders. Each has needs the system must meet, and a line it must never cross.',
      c: 'HP-01 · HP-02 · personas',
    });
  });

  /* ---------------------------------- stakeholders, values, tensions */
  K.scenes.push(function valuesScene(A) {
    const SX = 1060, VX = 1560;
    const ST = [
      { id: 'ST-01', name: 'Mary', role: 'resident · direct', color: C.mary, y: 300, fill: C.mary },
      { id: 'ST-02', name: 'Myra', role: 'care worker · direct', color: C.myra, y: 420, fill: C.myra },
      { id: 'ST-03', name: 'Family', role: 'indirect', color: C.paper, y: 600 },
      { id: 'ST-04', name: 'Management', role: 'indirect', color: C.paper, y: 710 },
      { id: 'ST-05', name: 'Medical staff', role: 'GP, nurse · indirect', color: C.paper, y: 820 },
    ];
    const HV = [
      { id: 'HV-02', name: 'Dignity', y: 250, c: [1620, 285], lab: 'above' },
      { id: 'HV-01', name: 'Autonomy', y: 360, c: [980, 560], lab: 'left' },
      { id: 'HV-04', name: 'Competence', y: 470, c: [1620, 560], lab: 'right' },
      { id: 'HV-05', name: 'Well-being', y: 580, c: [1300, 560], lab: 'below' },
      { id: 'HV-03', name: 'Privacy', y: 690, c: [1300, 285], lab: 'above' },
      { id: 'HV-06', name: 'Attentive care', y: 800, c: [1620, 835], lab: 'below' },
    ];
    const HOLDS = {
      'ST-01': { 'HV-02': 3, 'HV-01': 3, 'HV-05': 3, 'HV-04': 2, 'HV-03': 2 },
      'ST-02': { 'HV-05': 3, 'HV-06': 3, 'HV-02': 2, 'HV-01': 2, 'HV-04': 2, 'HV-03': 2 },
      'ST-03': { 'HV-05': 3, 'HV-02': 3, 'HV-01': 2, 'HV-06': 2, 'HV-03': 1 },
      'ST-04': { 'HV-06': 3, 'HV-05': 3, 'HV-03': 2, 'HV-02': 2 },
      'ST-05': { 'HV-05': 3, 'HV-03': 2, 'HV-01': 2 },
    };

    const edgeG = G(K.L.main);
    const nodeG = G(K.L.main);

    // stakeholder nodes
    const stNodes = ST.map(s => {
      const g = G(nodeG);
      A.xf(g, SX, s.y, 1);
      S('circle', { r: 26, fill: s.fill || C.ink2, stroke: s.fill ? 'none' : C.paper, 'stroke-width': 1.6, 'stroke-opacity': 0.6 }, g);
      S('text', { x: -46, y: 4, 'text-anchor': 'end', class: 'st-sans', 'font-size': 26, fill: s.fill || C.paper }, g, s.name);
      S('text', { x: -46, y: 27, 'text-anchor': 'end', class: 'st-mono', 'font-size': 12, fill: C.muted, 'letter-spacing': '1.2' }, g, (s.id + ' · ' + s.role).toUpperCase());
      return g;
    });
    const divider = S('path', ln({ d: `M 820 515 H ${SX + 40}`, stroke: '#2f3646', 'stroke-width': 1.2 }), nodeG);
    const dl1 = S('text', { x: SX + 40, y: 238, 'text-anchor': 'end', class: 'st-mono', 'font-size': 12, fill: C.muted, 'letter-spacing': '2' }, nodeG, 'DIRECT');
    const dl2 = S('text', { x: SX + 40, y: 545, 'text-anchor': 'end', class: 'st-mono', 'font-size': 12, fill: C.muted, 'letter-spacing': '2' }, nodeG, 'INDIRECT');
    A.reveal([...stNodes, divider, dl1, dl2], 'stakeholders', { a: 0.3, b: 1, stagger: 0.06 });
    caption(A, 'stakeholders', 'values', {
      t: 'Five stakeholders. Two of them touch the system.',
      b: 'Mary uses it in real time; Myra receives its handover requests and reads its record. Family, management and medical staff are affected by what it does, but never operate it and never see its records.',
      c: 'ST-01 to ST-05',
    });

    // value nodes: column layout first, constellation later
    const hv = {};
    HV.forEach(v => {
      const g = G(nodeG);
      const p = A.xf(g, VX, v.y, 1);
      const halo = S('circle', { r: 30, fill: 'none', stroke: C.paper, 'stroke-width': 2, class: 'pulse slow' }, g);
      gsap.set(halo, { autoAlpha: 0 });
      S('rect', { x: -12, y: -12, width: 24, height: 24, transform: 'rotate(45)', fill: C.ink, stroke: C.paper, 'stroke-width': 2.2 }, g);
      const lg = G(g);
      const lp = A.xf(lg, 30, 2, 1);
      const nm = S('text', { x: 0, y: 0, class: 'st-sans', 'font-size': 26, fill: C.paper }, lg, v.name);
      const idt = S('text', { x: 0, y: 22, class: 'st-mono', 'font-size': 12, fill: C.muted, 'letter-spacing': '1.2' }, lg, v.id);
      const w = Math.max(textWidth(nm), textWidth(idt));
      hv[v.id] = Object.assign({ g, p, lp, halo, w }, v);
    });
    A.reveal(HV.map(v => hv[v.id].g), 'values', { a: 0.1, b: 0.6, stagger: 0.05 });

    const solid = [], dashed = [], byST = {}, toValue = {};
    ST.forEach(s => {
      Object.entries(HOLDS[s.id]).forEach(([vid, lvl]) => {
        const v = hv[vid];
        const x1 = SX + 28, y1 = s.y, x2 = VX - 20, y2 = v.y;
        const e = S('path', {
          d: `M ${x1} ${y1} C ${x1 + 190} ${y1}, ${x2 - 190} ${y2}, ${x2} ${y2}`,
          fill: 'none', stroke: s.color,
          'stroke-width': lvl === 3 ? 2.6 : 1.4,
          'stroke-opacity': lvl === 3 ? (s.fill ? 0.95 : 0.7) : 0.5,
          'stroke-dasharray': lvl === 2 ? '5 7' : lvl === 1 ? '1.5 7' : null,
          'stroke-linecap': 'round',
        }, edgeG);
        (lvl === 3 ? solid : dashed).push(e);
        (byST[s.id] = byST[s.id] || []).push(e);
        (toValue[vid] = toValue[vid] || []).push({ e, lvl });
      });
    });
    A.draw(solid, 'values', 0.35, 0.95, { stagger: 0.012 });
    A.reveal(dashed, 'values', { a: 0.55, b: 0.95 });
    A.reveal(hv['HV-05'].halo, 'values', { a: 0.85, b: 1 });
    const wbNote = S('text', { x: VX + 30, y: 648, class: 'st-mono', 'font-size': 12, fill: C.paper, 'letter-spacing': '1.4' }, nodeG, 'HELD HIGHLY BY ALL FIVE');
    A.reveal(wbNote, 'values', { a: 0.85, b: 1 });
    const legend = block('abs label', 1080, 930, 800, 'Solid: held highly <span style="margin:0 14px">·</span> dashed: medium <span style="margin:0 14px">·</span> dotted: low');
    A.reveal(legend, 'values', { a: 0.7, b: 1 });
    A.conceal(legend, 'instrumental', { a: 0, b: 0.3 });
    caption(A, 'values', 'instrumental', {
      t: 'Six values. Only one held highly by everyone.',
      b: 'Each stakeholder holds a different mix of autonomy, dignity, privacy, competence, well-being and attentive care. Well-being is the only value all five hold highly.',
      c: 'HV-01 to HV-06 · stakeholder value priorities',
    });

    // instrumental: attentive care serves well-being and dignity
    const allEdges = solid.concat(dashed);
    A.to(allEdges, 'instrumental', { autoAlpha: 0.08 }, 0, 0.45);
    A.to(stNodes, 'instrumental', { autoAlpha: 0.3 }, 0, 0.45);
    A.to(['HV-01', 'HV-04', 'HV-03'].map(k => hv[k].g), 'instrumental', { autoAlpha: 0.3 }, 0, 0.45);
    A.conceal([hv['HV-05'].halo, wbNote], 'instrumental', { a: 0, b: 0.3 });
    const serves = [
      S('path', { d: `M ${VX - 22} 792 C ${VX - 130} 760, ${VX - 130} 616, ${VX - 24} 590`, fill: 'none', stroke: C.myra, 'stroke-width': 2.6, 'marker-end': 'url(#arrow-myra)' }, nodeG),
      S('path', { d: `M ${VX - 22} 796 C ${VX - 250} 730, ${VX - 250} 300, ${VX - 24} 258`, fill: 'none', stroke: C.myra, 'stroke-width': 2.6, 'marker-end': 'url(#arrow-myra)' }, nodeG),
    ];
    const servesLab = [
      S('text', { x: VX - 104, y: 700, 'text-anchor': 'start', class: 'st-mono', 'font-size': 12, fill: C.myra, 'letter-spacing': '1.6' }, nodeG, 'SERVES'),
      S('text', { x: VX - 212, y: 530, 'text-anchor': 'end', class: 'st-mono', 'font-size': 12, fill: C.myra, 'letter-spacing': '1.6' }, nodeG, 'SERVES'),
    ];
    const acHalo = S('circle', { cx: VX, cy: 800, r: 30, fill: 'none', stroke: C.myra, 'stroke-width': 2, class: 'pulse slow' }, nodeG);
    gsap.set(acHalo, { autoAlpha: 0 });
    A.reveal(serves, 'instrumental', { a: 0.35, b: 0.4 });
    A.draw(serves, 'instrumental', 0.35, 0.9, { stagger: 0.1 });
    A.reveal([...servesLab, acHalo], 'instrumental', { a: 0.6, b: 1 });
    caption(A, 'instrumental', 'tensions', {
      t: 'Attentive care is a means to an end.',
      b: 'Myra’s time matters because it serves Mary’s well-being and dignity. So it can never be bought by taking over steps Mary could still do herself: a system that saves staff time that way defeats its own purpose.',
      c: 'HV-06 · an instrumental value',
    });

    // tensions: stakeholders leave, values regroup into a constellation
    A.conceal([...stNodes, divider, dl1, dl2], 'tensions', { a: 0, b: 0.3 });
    A.conceal(allEdges, 'tensions', { a: 0, b: 0.25 });
    A.conceal([...serves, ...servesLab, acHalo], 'tensions', { a: 0, b: 0.25 });
    HV.forEach((v, i) => {
      const n = hv[v.id];
      A.to(n.g, 'tensions', { autoAlpha: 1 }, 0.05, 0.35);
      A.move(n.p, 'tensions', { x: v.c[0], y: v.c[1] }, 0.12 + i * 0.03, 0.62 + i * 0.03);
      const lx = v.lab === 'right' ? 30 : v.lab === 'left' ? -n.w - 30 : -n.w / 2;
      const ly = v.lab === 'below' ? (v.id === 'HV-05' ? 112 : 50) : v.lab === 'above' ? -58 : 2;
      A.move(n.lp, 'tensions', { x: lx, y: ly }, 0.12 + i * 0.03, 0.62 + i * 0.03);
    });

    const VT = [
      { id: 'VT-01', a: 'HV-01', b: 'HV-05', bend: -62, lab: 'when to help' },
      { id: 'VT-05', a: 'HV-01', b: 'HV-05', bend: 0, lab: 'detection' },
      { id: 'VT-06', a: 'HV-01', b: 'HV-05', bend: 62, lab: 'medication · later', faded: true },
      { id: 'VT-02', a: 'HV-03', b: 'HV-05', bend: 0, lab: 'how much to sense' },
      { id: 'VT-03', a: 'HV-04', b: 'HV-05', bend: 0, lab: 'time to try' },
      { id: 'VT-04', a: 'HV-02', b: 'HV-04', bend: 0, lab: 'prompts and dignity', open: true },
      { id: 'VT-07', a: 'HV-04', b: 'HV-06', bend: 0, lab: 'staff time', open: true },
    ];
    const tG = G(K.L.main);
    K.L.main.insertBefore(tG, nodeG);
    const tEdges = {}, tPills = {};
    VT.forEach(t => {
      const [x1, y1] = hv[t.a].c, [x2, y2] = hv[t.b].c;
      const mx = (x1 + x2) / 2, my = (y1 + y2) / 2;
      const dx = x2 - x1, dy = y2 - y1, L = Math.hypot(dx, dy);
      const nx = -dy / L, ny = dx / L;
      const cx = mx + nx * t.bend * 2, cy = my + ny * t.bend * 2;
      const e = S('path', { d: `M ${x1} ${y1} Q ${cx} ${cy} ${x2} ${y2}`, fill: 'none', stroke: C.alert, 'stroke-width': 2.4, 'stroke-opacity': t.faded ? 0.35 : 0.9, 'stroke-linecap': 'round' }, tG);
      const px = mx + nx * t.bend, py = my + ny * t.bend;
      const pg = G(tG);
      const txt = S('text', { x: px, y: py + 4.5, 'text-anchor': 'middle', class: 'st-mono', 'font-size': 12, fill: t.faded ? C.muted : C.alert, 'letter-spacing': '1' }, pg, (t.id + ' · ' + t.lab).toUpperCase());
      const w = textWidth(txt) + 22;
      pg.insertBefore(S('rect', { x: px - w / 2, y: py - 13, width: w, height: 26, rx: 13, fill: C.ink, stroke: t.faded ? '#3a4254' : C.alert, 'stroke-opacity': t.faded ? 1 : 0.6, 'stroke-width': 1.2 }, pg), txt);
      tEdges[t.id] = e; tPills[t.id] = pg;
    });
    const tEdgeList = Object.values(tEdges), tPillList = Object.values(tPills);
    A.draw(tEdgeList, 'tensions', 0.6, 0.95, { stagger: 0.03 });
    A.reveal(tPillList, 'tensions', { a: 0.72, b: 1, stagger: 0.025 });
    caption(A, 'tensions', 'open-tensions', {
      t: 'Seven places where two values collide.',
      b: 'Each tension is written down as the trade-off it encodes, together with the options we rejected. Autonomy against well-being alone comes up three times: in when to help, in how reliable stall detection is, and in medication timing.',
      c: 'VT-01 to VT-07',
    });

    // open tensions
    const closed = ['VT-01', 'VT-05', 'VT-06', 'VT-02', 'VT-03'];
    A.to(closed.map(k => tEdges[k]).concat(closed.map(k => tPills[k])), 'open-tensions', { autoAlpha: 0.14 }, 0, 0.45);
    A.to(['HV-01', 'HV-03', 'HV-05'].map(k => hv[k].g), 'open-tensions', { autoAlpha: 0.4 }, 0, 0.45);
    A.to([tEdges['VT-04'], tEdges['VT-07']], 'open-tensions', { attr: { 'stroke-width': 6 } }, 0.2, 0.7);
    A.to([tPills['VT-04'], tPills['VT-07']], 'open-tensions', { autoAlpha: 0 }, 0, 0.3);
    const q1 = block('tq', 1654, 360, null, '<b>VT-04 · open</b>A useful prompt can feel childish.');
    const q2 = block('tq', 1654, 640, null, '<b>VT-07 · open</b>Gradual help takes time staff do not have.');
    A.reveal([q1, q2], 'open-tensions', { a: 0.45, b: 1, stagger: 0.12 });
    caption(A, 'open-tensions', 'hfc', {
      t: 'Two remain open. The design has to answer them.',
      b: '<b>Dignity against competence</b>: the prompt that helps Mary finish can be the same prompt that makes her feel like a child. <b>Competence against attentive care</b>: graduated prompting protects competence, and it costs staff time the round does not have.',
      c: 'VT-04 · VT-07',
    });
    A.conceal([q1, q2], 'hfc', { a: 0, b: 0.3 });
    A.conceal([...tEdgeList, ...tPillList, ...HV.map(v => hv[v.id].g)], 'hfc', { a: 0, b: 0.35 });
  });

  /* --------------------------------------------------------------- hfc */
  K.scenes.push(function hfc(A) {
    const cards = [
      ['HFC-01', 'Perceived autonomy', 'Help that leaves room to choose is accepted and kept in use. Help that takes over is felt as control.', 'Explains HV-01<br>Measured by M-05'],
      ['HFC-02', 'Perceived surveillance', 'Monitoring that feels continuous, or more detailed than it needs to be, turns support into being watched.', 'Explains HV-03<br>Measured by M-06'],
      ['HFC-03', 'Adaptive assistance', 'Too much help removes the chance to be competent. Too little brings repeated failure and distress.', 'Explains HV-04, HV-05<br>Measured by M-02 to M-04'],
      ['HFC-04', 'Personhood', 'Infantilising or outpacing someone erodes their standing as a person, even when the help works (Kitwood, 1997).', 'Explains HV-02<br>Measured by M-04, M-06'],
      ['HFC-05', 'Embodiment and role', 'A robot’s form, gaze, timing and tone shape the role that older adults assign to it.', 'Explains HV-02, HV-03<br>Measured by M-04, M-06'],
    ];
    const pos = [[790, 225], [1135, 225], [1480, 225], [790, 560], [1135, 560]];
    const els = cards.map((c, i) => {
      const el = block('card', pos[i][0], pos[i][1], 325, `<div class="id">${c[0]}</div><h3>${c[1]}</h3><p>${c[2]}</p><div class="foot">${c[3]}</div>`);
      el.style.height = '310px';
      el.style.setProperty('--accent', i === 4 ? C.alert : C.muted);
      return el;
    });
    X.hfcCards = els;
    A.reveal(els, 'hfc', { a: 0.35, b: 1, stagger: 0.07, y: 40 });
    A.conceal(els.slice(0, 4), 'warden', { a: 0, b: 0.3, stagger: 0.03 });
    A.to(els[4], 'warden', { x: 345, y: 0, autoAlpha: 0, scale: 0.9 }, 0, 0.35);
    caption(A, 'hfc', 'warden', {
      t: 'Five mechanisms from human-factors research.',
      b: 'They explain why the values behave the way they do. Each one points at something we can measure.',
      c: 'HFC-01 to HFC-05',
    });
  });

  /* ------------------------------------------------------------ warden */
  K.scenes.push(function warden(A) {
    const g = G(K.L.main);
    const x0 = 880, y0 = 225, s = 600, mx = x0 + s / 2, my = y0 + s / 2;
    const qd = (x, y, fill, op) => S('rect', { x, y, width: s / 2 - 6, height: s / 2 - 6, rx: 14, fill, 'fill-opacity': op, stroke: '#2f3646', 'stroke-width': 1.2 }, g);
    const quads = [qd(x0, y0, C.ink2, 0.6), qd(mx + 6, y0, C.ink2, 0.6), qd(x0, my + 6, C.alert, 0.12), qd(mx + 6, my + 6, C.sys, 0.1)];
    const qlab = (x, y, t, fill) => S('text', { x, y, class: 'st-serif', 'font-size': 44, fill }, g, t);
    const labs = [
      qlab(x0 + 24, y0 + 58, 'Carer', C.muted), qlab(mx + 30, y0 + 58, 'Pet', C.muted),
      qlab(x0 + 24, my + 64, 'Warden', C.alert), qlab(mx + 30, my + 64, 'Tool', C.paper),
    ];
    const ax1 = S('text', { x: mx, y: y0 + s + 42, 'text-anchor': 'middle', class: 'st-mono', 'font-size': 12, fill: C.muted, 'letter-spacing': '2' }, g, 'LOW  ←  USER AUTONOMY  →  HIGH');
    const ax2 = S('text', { x: x0 - 30, y: my, 'text-anchor': 'middle', class: 'st-mono', 'font-size': 12, fill: C.muted, 'letter-spacing': '2', transform: `rotate(-90 ${x0 - 30} ${my})` }, g, 'LOW  ←  RELATIONSHIP TOLERANCE  →  HIGH');
    const mini = G(g);
    K.buildPepper(A, mini);
    A.xf(mini, x0 + 205, y0 + s - 22, 0.36);
    const dev = K.buildDevice(g);
    A.xf(dev, mx + 170, y0 + s - 30, 1);
    const arrow = S('path', { d: `M ${x0 + 265} ${my + 150} C ${mx - 10} ${my + 110}, ${mx + 40} ${my + 120}, ${mx + 88} ${my + 190}`, fill: 'none', stroke: C.sys, 'stroke-width': 2.4, 'stroke-dasharray': '6 6', 'marker-end': 'url(#arrow-sys)', class: 'marching' }, g);
    const arrowLab = S('text', { x: mx + 30, y: my + 104, 'text-anchor': 'start', class: 'st-mono', 'font-size': 12, fill: C.sys, 'letter-spacing': '1.4' }, g, 'RP-01 FRAMES PEPPER AS A TOOL');
    const notes = block('abs', 1530, 250, 300, `
      <div class="label" style="color:var(--paper)">Pemberton et al. (2026)</div>
      <div class="label" style="margin-top:16px;line-height:2">Qualitative · n = 13<br>Cognitively intact adults<br>Ageing in place<br>VR smart-home setup</div>
      <p style="font:400 18px/1.45 var(--sans);color:var(--paper-2);margin-top:22px">The mechanism is plausible for care-home residents with dementia. It has not been shown there.</p>`);
    A.reveal([...quads, ...labs, ax1, ax2], 'warden', { a: 0.3, b: 0.85, stagger: 0.03 });
    A.reveal([mini, dev], 'warden', { a: 0.55, b: 0.9, stagger: 0.1 });
    A.reveal([arrow, arrowLab], 'warden', { a: 0.75, b: 1 });
    A.reveal(notes, 'warden', { a: 0.7, b: 1 });
    A.conceal([g], 'bet', { a: 0, b: 0.3 });
    A.conceal(notes, 'bet', { a: 0, b: 0.3 });
    caption(A, 'warden', 'bet', {
      t: 'A humanoid robot risks being cast as the warden.',
      b: 'Older adults sorted assistive robots into four roles by autonomy and relationship tolerance. Humanoid robots landed on the warden: oversight without attachment. Tool-like roles were the ones seen as preserving independence.',
      c: 'HFC-05 · Pemberton et al. (2026)',
    });
  });
})();
