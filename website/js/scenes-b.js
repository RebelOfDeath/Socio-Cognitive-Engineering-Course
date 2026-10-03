/* III · The bet, IV · One morning, redesigned */
(function () {
  'use strict';
  const { C, S, H, G, ln, place, block, caption, textWidth } = K;
  const X = K.ctx;

  /* --------------------------------------------------------------- bet */
  K.scenes.push(function bet(A) {
    const el = block('abs statement', 110, 300, 1300, '<h1 style="font-size:168px">What if the robot<br>carried <em class="c-sys">the wait</em>?</h1>');
    const kick = block('abs kicker', 120, 240, 800, '<span class="c-sys">III · The bet</span>');
    const body = block('abs lede', 120, 680, 900, 'The system spends the extra time that graduated prompting needs. Myra is called only when prompting has run out, when Mary is distressed, or when there is a safety risk.');
    const cite = block('abs label', 120, 880, 900, 'The resolution of VT-07 · the design’s central bet');
    const ring = S('circle', { cx: 1600, cy: 560, r: 150, fill: 'none', stroke: C.sys, 'stroke-width': 3, 'stroke-linecap': 'round', 'stroke-dasharray': '220 723', class: 'spin' }, K.L.bg);
    const ring2 = S('circle', { cx: 1600, cy: 560, r: 150, fill: 'none', stroke: '#262c39', 'stroke-width': 1.5 }, K.L.bg);
    const dot = S('circle', { cx: 1600, cy: 560, r: 12, fill: C.mary, class: 'breathe' }, K.L.bg);
    A.reveal([kick, el, body, cite], 'bet', { a: 0.35, b: 1, stagger: 0.07, y: 40 });
    A.reveal([ring2, ring, dot], 'bet', { a: 0.5, b: 1 });
    A.conceal([kick, el, body, cite], 'tech', { a: 0, b: 0.3 });
    A.conceal([ring2, ring, dot], 'tech', { a: 0, b: 0.3 });
  });

  /* -------------------------------------------------------------- tech */
  K.scenes.push(function tech(A) {
    const T = {
      'TECH-01': ['Pepper', 'Spoken prompts by name, pictures on its chest tablet, touch as a way to answer.', 'Selected', C.sys],
      'TECH-02': ['Item sensors', 'Motion in the brush, weight under the cup and paste, flow at the tap.', 'Selected', C.sys],
      'TECH-03': ['Staff phone and record', 'Handover requests to the work phone and a three-item session record.', 'Selected', C.sys],
      'TECH-04': ['Camera recognition', 'The best detector, and continuous video of a resident in her bathroom.', 'Rejected', C.alert],
      'TECH-05': ['Sink-side device', 'Best supported by the evidence. Lost only on a project constraint; kept as the fallback.', 'Rejected', C.alert],
      'TECH-06': ['Medication tray', 'Deferred together with the medication use case.', 'Deferred', C.muted],
    };
    const grid = [[790, 250], [1135, 250], [1480, 250], [790, 460], [1135, 460], [1480, 460]];
    const order = ['TECH-02', 'TECH-05', 'TECH-01', 'TECH-04', 'TECH-06', 'TECH-03'];
    const sorted = { 'TECH-01': [790, 250], 'TECH-02': [790, 460], 'TECH-03': [790, 670], 'TECH-04': [1135, 250], 'TECH-05': [1135, 460], 'TECH-06': [1480, 250] };
    const cards = order.map((id, i) => {
      const t = T[id];
      const el = block('card tcard', grid[i][0], grid[i][1], 320, `<div class="id">${id} · ${t[2]}</div><h3>${t[0]}</h3><p>${t[1]}</p>${id === 'TECH-04' ? '<i class="strike"></i>' : ''}`);
      el.style.setProperty('--accent', t[3]);
      return { id, el };
    });
    A.reveal(cards.map(c => c.el), 'tech', { a: 0.3, b: 0.58, stagger: 0.03, y: 30 });
    cards.forEach((c, i) => {
      const [sx, sy] = sorted[c.id];
      A.to(c.el, 'tech', { x: sx - grid[i][0], y: sy - grid[i][1], ease: 'power3.inOut' }, 0.62, 0.92);
    });
    const strike = cards.find(c => c.id === 'TECH-04').el.querySelector('.strike');
    A.to(strike, 'tech', { width: 262 }, 0.9, 1);
    const heads = [
      block('abs col-head c-sys', 790, 212, 320, 'Selected'),
      block('abs col-head c-alert', 1135, 212, 320, 'Rejected'),
      block('abs col-head c-muted', 1480, 212, 320, 'Deferred'),
    ];
    A.reveal(heads, 'tech', { a: 0.85, b: 1, stagger: 0.03, y: 10 });
    A.conceal(cards.map(c => c.el).concat(heads), 'pepper', { a: 0, b: 0.3, stagger: 0.02 });
    caption(A, 'tech', 'pepper', {
      k: 'III · The bet',
      t: 'Six options. Three chosen, two rejected, one deferred.',
      b: 'The rejected options stay on the record, so the choice reads as a selection. The camera was the best detector and the worst for privacy. The sink-side device had the best evidence behind it.',
      c: 'TECH-01 to TECH-06',
    });
  });

  /* ------------------------------------------------------------ pepper */
  K.scenes.push(function pepper(A) {
    const P = X.pepper;
    A.reveal(P.root, 'pepper', { a: 0.3, b: 0.65 });
    P.covers.forEach((c, i) => {
      A.reveal(c.g, 'pepper', { a: 0.66 + i * 0.05, b: 0.78 + i * 0.05 });
      A.move(c.p, 'pepper', { y: 0 }, 0.66 + i * 0.05, 0.82 + i * 0.05, 'power3.out');
    });
    A.to(P.eyes, 'pepper', { attr: { 'fill-opacity': 0.16 } }, 0.72, 0.9);

    // points on Pepper at its big placement (x 1330, base y 930, scale 1.05)
    const pt = (x, y) => [1330 + 1.05 * x, 930 + 1.05 * y];
    const call = [
      { side: 'r', x: 1530, y: 262, to: pt(8, -590), lab: 'Cameras', t: 'Streams off in software, lenses visibly covered.' },
      { side: 'r', x: 1530, y: 392, to: pt(44, -548), lab: 'Eyes', t: 'Eye lights dimmed. No gaze-following.' },
      { side: 'r', x: 1530, y: 522, to: pt(46, -380), lab: 'Tablet', t: 'Shows the next step as a picture, so Pepper never has to mime.' },
      { side: 'l', x: 850, y: 372, to: pt(-80, -520), lab: 'Voice', t: 'Short offers, by name, in an adult register. No audio stored.' },
      { side: 'l', x: 850, y: 770, to: pt(-100, -40), lab: 'Place', t: 'Waits at the doorway: out of the wet area, never in the way.' },
    ];
    const leaders = [], texts = [];
    call.forEach(c => {
      const el = block('callout' + (c.side === 'l' ? ' right' : ''), c.x, c.y, 290, `<b>${c.lab}</b>${c.t}`);
      texts.push(el);
      const sx = c.side === 'r' ? c.x - 14 : c.x + 304;
      const sy = c.y + 8;
      leaders.push(S('path', { d: `M ${sx} ${sy} L ${c.to[0]} ${c.to[1]}`, fill: 'none', stroke: C.sys, 'stroke-width': 1.4, 'stroke-opacity': 0.7 }, K.L.top));
      leaders.push(S('circle', { cx: c.to[0], cy: c.to[1], r: 4, fill: C.sys }, K.L.top));
    });
    const tags = [
      block('pill c-alert', 1490, 700, null, 'Strains VT-04 · dignity and competence'),
      block('pill c-alert', 1490, 750, null, 'Strains VT-02 · privacy and well-being'),
    ];
    A.reveal(leaders, 'pepper', { a: 0.6, b: 0.9 });
    A.reveal(texts, 'pepper', { a: 0.62, b: 1, stagger: 0.04, y: 14 });
    A.reveal(tags, 'pepper', { a: 0.82, b: 1, stagger: 0.05, y: 10 });
    A.conceal(texts.concat(tags), 'sensors', { a: 0, b: 0.3 });
    A.conceal(leaders, 'sensors', { a: 0, b: 0.25 });
    caption(A, 'pepper', 'sensors', {
      t: 'Our own evidence argues against Pepper.',
      b: 'The embodiment research favours a tool-like device for personal care. Pepper is the project’s platform, so we chose it and wrote the mitigations into the design as requirements. It is framed as a tool, not a carer, companion or supervisor.',
      c: 'TECH-01 · RP-01 · fallback TECH-05',
    });
  });

  /* ----------------------------------------------------------- sensors */
  K.scenes.push(function sensors(A) {
    const sk = X.sink;
    // the doorway Pepper will wait in
    const door = S('path', ln({ d: 'M 1642 882 V 400 H 1830 V 882', stroke: '#465066', 'stroke-width': 3 }), K.L.bg);
    const floor = S('path', ln({ d: 'M 1560 882 H 1900', stroke: '#2f3646', 'stroke-width': 2 }), K.L.bg);
    X.door = [door, floor];
    A.draw(X.door, 'sensors', 0.25, 0.7);
    A.move(X.pepperP, 'sensors', { x: 1736, y: 880, s: 0.6 }, 0, 0.62);

    // the sink flies back out of Mary's room, without Mary
    A.move(sk.mary.p, 'sensors', { x: -620, y: -90, s: 1 }, 0, 0.05);
    A.to(sk.root, 'sensors', { autoAlpha: 1 }, 0.15, 0.55);
    A.move(X.sinkP, 'sensors', { x: 1110, y: 604, s: 0.88 }, 0.08, 0.66);
    A.reveal([sk.motion, sk.padCup, sk.padPaste, sk.flow], 'sensors', { a: 0.6, b: 0.8, stagger: 0.04 });
    const fl = sk.flashes;
    A.reveal([fl.motion, fl.cup, fl.paste, fl.flow], 'sensors', { a: 0.66, b: 0.9, stagger: 0.04 });

    const labs = G(sk.root);
    [
      [-234, -48, 'MOTION'], [-357, 62, 'WEIGHT'], [265, 62, 'WEIGHT'], [-58, -52, 'FLOW'],
    ].forEach(([x, y, t]) => S('text', { x, y, 'text-anchor': t === 'FLOW' ? 'end' : 'middle', class: 'st-mono', 'font-size': 15, fill: C.sys, 'letter-spacing': '2' }, labs, t));
    A.reveal(labs, 'sensors', { a: 0.72, b: 1 });
    A.conceal([labs, fl.motion, fl.cup, fl.paste, fl.flow], 'ds-start', { a: 0, b: 0.25 });

    caption(A, 'sensors', 'ds-start', {
      t: 'Track the items, not the person.',
      b: 'A motion sensor in the toothbrush, weight pads under the cup and the toothpaste, a flow sensor on the tap. From these alone the system infers which step Mary is on, and notices when nothing changes. It cannot see distress or a fall, and it cannot tell how well she brushed.',
      c: 'TECH-02 · F1 · accepted cost: VT-05',
    });
  });

  /* ------------------------------------------------ the design scenario */
  K.scenes.push(function designScenario(A) {
    const sk = X.sink, m = sk.mary, P = X.pepper, fl = sk.flashes;

    // chrome for the scenario: Myra inset, bubbles, wait ring, level meter
    const inset = block('inset', 1452, 104, 370, '<i class="dot"></i><div><b>MEANWHILE · ROOM 4</b>Myra is helping another resident dress.</div>');
    A.reveal(inset, 'ds-start', { a: 0.1, b: 0.4 });
    A.conceal(inset, 'ds-record', { a: 0, b: 0.3 });

    const bubble = (text, who = 'Pepper') => block('bubble', 1296, 214, 360, `<span class="who">${who}</span>${text}`);
    const b1 = bubble('Mary, would you like some toothpaste on your brush?');
    const b2 = bubble('You could brush your teeth now.');
    const b3 = bubble('All done.');
    const b4 = bubble('Mary, someone is coming to help you.');

    const wait = G(K.L.top);
    const wx = 1476, wy = 290, wr = 50, circ = 2 * Math.PI * wr;
    S('circle', { cx: wx, cy: wy, r: wr, fill: C.ink, 'fill-opacity': 0.8, stroke: '#2f3646', 'stroke-width': 6 }, wait);
    const arc = S('circle', { cx: wx, cy: wy, r: wr, fill: 'none', stroke: C.sys, 'stroke-width': 6, 'stroke-linecap': 'round', 'stroke-dasharray': `${circ} ${circ}`, 'stroke-dashoffset': circ, transform: `rotate(-90 ${wx} ${wy})` }, wait);
    S('text', { x: wx, y: wy + 5, 'text-anchor': 'middle', class: 'st-mono', 'font-size': 13, fill: C.paper, 'letter-spacing': '2' }, wait, 'WAIT');
    S('text', { x: wx + 72, y: wy - 6, class: 'st-mono', 'font-size': 12, fill: C.muted, 'letter-spacing': '1.6' }, wait, 'CONFIGURED INTERVAL');
    S('text', { x: wx + 72, y: wy + 14, class: 'st-mono', 'font-size': 12, fill: C.muted, 'letter-spacing': '1.6' }, wait, 'PER RESIDENT');
    gsap.set(wait, { autoAlpha: 0 });

    const meter = block('meter', 1296, 388, null, ['Silent', 'Orient', 'Name', 'Show', 'Myra'].map(n => `<div class="seg"><div class="bar"><i></i></div><div class="nm">${n}</div></div>`).join(''));
    const meterLab = block('meter-lab', 1296, 364, 380, 'Prompt level');
    const bars = [...meter.querySelectorAll('.bar i')];
    A.reveal([meterLab, meter], 'ds-start', { a: 0.2, b: 0.5, y: 10 });
    A.to(bars[0], 'ds-start', { autoAlpha: 1 }, 0.3, 0.5);

    // ---------------------------------------------------------- ds-start
    A.to(X.dots.map(d => d.core), 'ds-start', { attr: { fill: C.ink, stroke: C.paper } }, 0, 0.05);
    A.to([X.dotsG, X.stripLine, ...X.stripLabels], 'ds-start', { autoAlpha: 1 }, 0.1, 0.45);
    A.reveal(m.g, 'ds-start', { a: 0.25, b: 0.4 });
    A.move(m.p, 'ds-start', { x: -234, y: -46 }, 0.25, 0.55);
    [0, 1, 2].forEach(k => X.lit(k, 'ds-start', 0.35 + k * 0.06));
    A.move(sk.brushP, 'ds-start', { y: -112, r: -16 }, 0.6, 0.8);
    A.move(m.p, 'ds-start', { x: -292, y: -106 }, 0.6, 0.8);
    X.lit(3, 'ds-start', 0.74);
    A.reveal(fl.motion, 'ds-start', { a: 0.74, b: 0.8 });
    A.conceal(fl.motion, 'ds-start', { a: 0.92, b: 1 });
    caption(A, 'ds-start', 'ds-wait', {
      k: 'IV · One morning, redesigned', kc: C.mary,
      t: 'Myra reminds Mary, then moves on.',
      b: 'Pepper waits just outside the door, lenses covered and eye lights dimmed. Mary picks up the toothbrush, and the sensor registers it. Pepper says nothing.',
      c: 'DS-01 · the design scenario',
    });

    // ----------------------------------------------------------- ds-wait
    A.reveal(m.pause, 'ds-wait', { a: 0, b: 0.12 });
    A.reveal(wait, 'ds-wait', { a: 0.02, b: 0.14 });
    A.to(arc, 'ds-wait', { attr: { 'stroke-dashoffset': 0 }, ease: 'none' }, 0.1, 0.96);
    caption(A, 'ds-wait', 'ds-l1', {
      t: 'She pauses. Pepper waits.',
      q: '“The wait is the design, not an implementation delay.”',
      b: 'Hesitation does not mean inability, so for a configured interval the system does nothing, on purpose.',
      c: 'UC01 action sequence · VT-03',
    });

    // ------------------------------------------------------------- ds-l1
    A.conceal(wait, 'ds-l1', { a: 0, b: 0.14 });
    A.reveal(b1, 'ds-l1', { a: 0.12, b: 0.32, y: 16 });
    A.to(bars[0], 'ds-l1', { autoAlpha: 0 }, 0.16, 0.24);
    A.to(bars[1], 'ds-l1', { autoAlpha: 1 }, 0.18, 0.28);
    A.conceal(m.pause, 'ds-l1', { a: 0.34, b: 0.42 });
    A.move(sk.brushP, 'ds-l1', { x: 150, y: -118, r: -8 }, 0.4, 0.62);
    A.move(m.p, 'ds-l1', { x: 96, y: -110 }, 0.4, 0.62);
    A.move(sk.pasteP, 'ds-l1', { x: 232, y: -66, r: -24 }, 0.58, 0.72);
    A.reveal(fl.paste, 'ds-l1', { a: 0.58, b: 0.64 });
    A.conceal(fl.paste, 'ds-l1', { a: 0.82, b: 0.9 });
    X.lit(4, 'ds-l1', 0.64);
    X.lit(5, 'ds-l1', 0.76);
    A.move(sk.pasteP, 'ds-l1', { x: 265, y: -12, r: 0 }, 0.8, 0.95);
    A.to(b1, 'ds-l1', { autoAlpha: 0.3 }, 0.82, 1);
    caption(A, 'ds-l1', 'ds-l2', {
      t: 'Then the lightest prompt.',
      b: 'An offer, by name, in an ordinary adult voice. Mary picks up the toothpaste, the weight pad registers the lift, and Pepper goes quiet again.',
      c: 'F2 · level 1, orienting',
    });

    // ------------------------------------------------------------- ds-l2
    A.reveal(m.pause, 'ds-l2', { a: 0, b: 0.1 });
    A.conceal(b1, 'ds-l2', { a: 0, b: 0.12 });
    A.reveal(b2, 'ds-l2', { a: 0.12, b: 0.3, y: 16 });
    A.to(bars[1], 'ds-l2', { autoAlpha: 0 }, 0.14, 0.2);
    A.to(bars[2], 'ds-l2', { autoAlpha: 1 }, 0.16, 0.26);
    A.reveal([P.tabletGlow, P.picto], 'ds-l2', { a: 0.2, b: 0.34 });
    A.conceal(m.pause, 'ds-l2', { a: 0.38, b: 0.46 });
    A.move(sk.brushP, 'ds-l2', { x: -10, y: -262, r: -28 }, 0.4, 0.58);
    A.move(m.p, 'ds-l2', { x: -64, y: -238 }, 0.4, 0.58);
    A.move(X.wig, 'ds-l2', { v: 1 }, 0.58, 0.96, 'none');
    A.reveal(fl.motion, 'ds-l2', { a: 0.6, b: 0.66 });
    A.conceal(fl.motion, 'ds-l2', { a: 0.86, b: 0.94 });
    X.lit(6, 'ds-l2', 0.64);
    A.to(b2, 'ds-l2', { autoAlpha: 0.3 }, 0.66, 0.8);
    A.to([P.tabletGlow, P.picto], 'ds-l2', { autoAlpha: 0.35 }, 0.78, 0.92);
    A.conceal([P.tabletGlow, P.picto], 'ds-done', { a: 0, b: 0.15 });
    caption(A, 'ds-l2', 'ds-done', {
      t: 'Stuck again, so one level more specific.',
      b: 'Pepper names the next action and its tablet shows a simple picture of someone brushing. The moment the brush starts moving, Pepper stops.',
      c: 'F2 · level 2, naming with a picture',
    });

    // ------------------------------------------------------------ ds-done
    A.move(X.wig, 'ds-done', { v: 0 }, 0, 0.01, 'none');
    A.move(sk.brushP, 'ds-done', { x: 22, y: -96, r: 62 }, 0, 0.24);
    A.move(m.p, 'ds-done', { x: -30, y: -140 }, 0, 0.24);
    A.reveal(sk.water, 'ds-done', { a: 0.2, b: 0.28 });
    A.reveal(fl.flow, 'ds-done', { a: 0.22, b: 0.3 });
    X.lit(7, 'ds-done', 0.34);
    A.conceal([sk.water, fl.flow], 'ds-done', { a: 0.48, b: 0.56 });
    A.move(sk.brushP, 'ds-done', { x: -234, y: -9, r: 0 }, 0.52, 0.74);
    A.move(m.p, 'ds-done', { x: -234, y: -52 }, 0.52, 0.74);
    X.lit(8, 'ds-done', 0.72);
    A.move(m.p, 'ds-done', { x: -150, y: -80 }, 0.8, 0.96);
    A.conceal(b2, 'ds-done', { a: 0, b: 0.14 });
    A.reveal(b3, 'ds-done', { a: 0.76, b: 0.94, y: 16 });
    A.to(bars[2], 'ds-done', { autoAlpha: 0 }, 0.76, 0.84);
    A.to(bars[0], 'ds-done', { autoAlpha: 1 }, 0.78, 0.88);
    caption(A, 'ds-done', 'ds-record', {
      t: '“All done.” Said once.',
      b: 'When Mary rinses and puts the brush back, Pepper says it once, in an ordinary adult tone. No praise that would suit a child, and nothing more.',
      c: 'RP-01 · identity framing',
    });

    // ---------------------------------------------------------- ds-record
    A.conceal([b3, meter, meterLab], 'ds-record', { a: 0, b: 0.25 });
    A.to([sk.root, P.root, X.dotsG, X.stripLine, ...X.stripLabels, ...X.door], 'ds-record', { autoAlpha: 0.14 }, 0, 0.4);
    const phone = block('phone', 800, 196, null, `
      <div class="ptime">07:46</div>
      <div class="app">Care round · Myra</div>
      <div class="pcard rec">
        <div class="t">Tooth brushing</div>
        <div class="s">Session record · Room 1</div>
        <div class="r">Completed<b>Yes</b></div>
        <div class="r">Highest prompt<b>Naming</b></div>
        <div class="r">Care worker called<b>No</b></div>
      </div>
      <div class="pcard alertc">
        <div class="flag">Handover request</div>
        <div class="t">Tooth brushing</div>
        <div class="s">Room 1 · Mary</div>
        <div class="r">Step reached<b>Brush, 7 of 9</b></div>
        <div class="r">Reason<b>No change, no response</b></div>
      </div>
      <div class="pfoot rec">Three items. No step-by-step trace. Never shared with family.</div>
      <div class="pfoot alertf">Unacknowledged requests are re-sent, then escalated to a second care worker.</div>`);
    const recEls = [...phone.querySelectorAll('.rec')];
    const alertEls = [...phone.querySelectorAll('.alertc, .alertf')];
    gsap.set(alertEls, { autoAlpha: 0 });
    A.reveal(phone, 'ds-record', { a: 0.28, b: 0.72, y: 70 });
    const never = block('never', 1210, 300, 400, '<div class="lab">Never stored</div>' + ['Video', 'Audio', 'Step-by-step trace', 'A behavioural profile', 'Anything for family'].map(t => `<div class="it">${t}<i></i></div>`).join(''));
    const strikes = [...never.querySelectorAll('i')];
    gsap.set(strikes, { scaleX: 0 });
    A.reveal(never, 'ds-record', { a: 0.5, b: 0.78, x: 30, y: 0 });
    A.to(strikes, 'ds-record', { scaleX: 1, stagger: 0.04, ease: 'power2.out' }, 0.72, 0.9);
    caption(A, 'ds-record', 'ds-safety', {
      t: 'Myra was never called back.',
      b: 'She spent those minutes helping another resident dress. Her phone holds three facts about the session. Nothing about how Mary brushed her teeth is stored.',
      c: 'F4 · record the session · CL8',
    });

    // ---------------------------------------------------------- ds-safety
    A.conceal(never, 'ds-safety', { a: 0, b: 0.3 });
    A.conceal(recEls, 'ds-safety', { a: 0, b: 0.3, y: -10 });
    A.reveal(alertEls, 'ds-safety', { a: 0.35, b: 0.7, y: 12 });
    A.to(P.root, 'ds-safety', { autoAlpha: 1 }, 0.2, 0.5);
    A.to([sk.root, ...X.door], 'ds-safety', { autoAlpha: 0.5 }, 0.2, 0.5);
    A.reveal(m.stall, 'ds-safety', { a: 0.3, b: 0.45 });
    A.reveal(b4, 'ds-safety', { a: 0.45, b: 0.75, y: 16 });
    caption(A, 'ds-safety', 'ladder', {
      t: 'And if nothing moves at all?',
      b: 'No sensor change and no response to prompts, for a configured time, is treated as a possible emergency. Pepper tells Mary someone is coming, and Myra’s phone receives three things: the activity, the step reached and the reason.',
      c: 'UC01 safety branch · F3 · a conservative inference',
    });

    // leave the scenario
    A.conceal([sk.root, P.root, X.dotsG, X.stripLine, ...X.stripLabels, ...X.door], 'ladder', { a: 0, b: 0.3 });
    A.conceal([phone, b4], 'ladder', { a: 0, b: 0.3 });
  });
})();
