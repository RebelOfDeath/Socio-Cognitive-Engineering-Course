/* VI Elena's first week (DS-01), told on the floor plan */
(function () {
  'use strict';
  const { C, S, G, block, caption, say, dayMark, SPOTS, PLAN } = K;
  const X = K.ctx;

  const at = (dx, dy, p) => [p[0] + dx, p[1] + dy];

  K.scenes.push(function interview(A) {
    // the plan comes back, faint, behind the interview card
    A.to(X.home.root, 'interview', { autoAlpha: 0.18 }, 0.2, 0.6);
    A.to(X.threads, 'interview', { autoAlpha: 1 }, 0, 0.1);
    A.to(X.gap, 'interview', { autoAlpha: 0 }, 0, 0.2);
    A.to(X.jan.ring, 'interview', { autoAlpha: 1 }, 0, 0.1);
    dayMark(A, 'interview', 'hello', 'Day two');

    const items = [
      ['The post office counter, twenty-five years', true],
      ['Her town', true],
      ['Her garden', true],
      ['Her diagnosis', false],
      ['Thomas’s death last year', false, 'Myra answers, as agreed with her son'],
    ];
    const card = block('card', 1000, 250, 800, `<div class="id" style="--accent:${C.elena}">TECH-06 Elena’s profile</div>
      <h3 style="margin-bottom:22px">What other residents may know</h3>` +
      items.map(([t, ok, note]) => `<div style="display:flex;justify-content:space-between;align-items:center;padding:14px 0;border-top:1px solid var(--line)">
        <div style="font:400 22px/1.3 var(--sans)">${t}${note ? `<div style="font:400 15px/1.4 var(--mono);color:var(--myra);margin-top:4px">${note}</div>` : ''}</div>
        <span class="tag ${ok ? 'solid' : ''}" style="${ok ? `background:${C.jan};` : `color:${C.muted}`}">${ok ? 'shareable' : 'private'}</span></div>`).join(''));
    A.reveal(card, 'interview', { a: 0.3, b: 0.8, y: 30 });
    A.reveal([...card.querySelectorAll('.tag')], 'interview', { a: 0.6, b: 1, stagger: 0.04, y: 0, s: 0.6 });
    A.conceal(card, 'hello');
    A.to(X.home.root, 'hello', { autoAlpha: 1 }, 0.1, 0.5);

    caption(A, 'interview', 'hello', {
      cls: 'scene', y: 300,
      k: 'UC01 Welcoming a newcomer, step 2',
      t: 'Elena decides what other residents may know.',
      s: 'Her son sits with her during the life-story interview. Every item starts out private.',
      c: 'DS-01 F1 Ask first',
    });
  });

  K.scenes.push(function hello(A) {
    dayMark(A, 'hello', 'match', 'Coffee time');
    const lounge = X.helloAt = at(30, 10, SPOTS.lounge);
    X.walk(X.elena, 'hello', [[X.elena.home[0], X.CORR_Y], [lounge[0], X.CORR_Y], lounge], 0.1, 0.55);
    A.reveal(X.home.pepper.g, 'hello', { a: 0.3, b: 0.6 });
    A.reveal(X.home.pepper.pulse, 'hello', { a: 0.55, b: 0.8 });
    say(A, 'hello', 'match', { x: 120, y: 640, w: 760, who: 'Pepper', text: '“Good afternoon, Elena. I’m Pepper. I help residents get to know each other.”', a: 0.55 });
    caption(A, 'hello', 'match', {
      cls: 'scene', y: 300,
      k: 'RP-01 Pepper in the lounge', kc: C.sys,
      t: 'On her first visit, Pepper only says hello.',
    });
  });

  K.scenes.push(function match(A) {
    dayMark(A, 'match', 'ask', 'Matching');
    A.to(X.home.pepper.pulse, 'match', { autoAlpha: 0 }, 0, 0.2);
    X.walk(X.elena, 'match', [[X.helloAt[0], X.CORR_Y], [X.elena.home[0], X.CORR_Y], X.elena.home], 0, 0.3);
    const e = X.elena.home;
    const cands = [X.home.dots.gerrit, X.home.dots.ans, X.jan];
    X.cand = cands.map((d, i) => K.thread(X.threads, e, d.home, i === 2 ? C.jan : C.muted, i === 0 ? -140 : i === 1 ? -50 : -40, { 'stroke-dasharray': '4 7', 'stroke-width': 2.2 }));
    A.reveal(X.cand, 'match', { a: 0.35, b: 0.6, stagger: 0.05 });
    A.to(X.cand.slice(0, 2), 'match', { autoAlpha: 0.15 }, 0.75, 0.95);
    A.to(X.cand[2], 'match', { attr: { 'stroke-dasharray': '1 0', 'stroke-width': 3.2 } }, 0.75, 0.95);
    A.to(X.jan.ring, 'match', { autoAlpha: 0.4 }, 0.7, 1);

    const appr = block('abs', 1310, 175, 400, '<span class="tag" style="color:var(--jan)">approved by the coordinator</span>');
    A.reveal(appr, 'match', { a: 0.8, b: 1, y: 8 });
    A.conceal(appr, 'ask');
    caption(A, 'match', 'ask', {
      cls: 'scene', y: 300,
      k: 'UC02 Introducing two residents, steps 1 and 2',
      t: 'The coordinator approves one of three matches.',
      s: 'Jan had the bakery in her town. Months ago he agreed that Myra may hear when he stays in his room.',
      c: 'F2 Suggest matches TECH-05 TECH-03',
    });
  });

  K.scenes.push(function ask(A) {
    dayMark(A, 'ask', 'askjan', 'In the quiet corner');
    A.to(X.cand, 'ask', { autoAlpha: 0 }, 0, 0.3);
    X.walk(X.elena, 'ask', [[X.elena.home[0], X.CORR_Y], [SPOTS.quiet[0], X.CORR_Y], at(0, 30, SPOTS.quiet)], 0.1, 0.5);
    A.move(X.home.pepper.p, 'ask', { x: SPOTS.quiet[0] - 60, y: SPOTS.quiet[1] + 20 }, 0.2, 0.55);
    say(A, 'ask', 'askjan', { x: 120, y: 520, w: 800, who: 'Pepper', text: '“There’s a resident here, Jan, who had the bakery in your town. Would you like to meet him, or not this time?”', a: 0.5 });
    say(A, 'ask', 'askjan', { cls: 'elena', x: 120, y: 700, w: 700, who: 'Elena', text: '“The bakery? Yes.”', a: 0.65 });
    say(A, 'ask', 'askjan', { x: 120, y: 810, w: 800, who: 'Pepper', text: '“May I tell him you had the post office counter?”  <span style="color:var(--elena)">“Yes.”</span>', a: 0.8 });
    caption(A, 'ask', 'askjan', {
      cls: 'scene', y: 230,
      k: 'IDP-02 Ask first', kc: C.sys,
      t: 'Pepper asks Elena in private.',
    });
  });

  K.scenes.push(function askjan(A) {
    dayMark(A, 'askjan', 'meet', 'Next morning');
    X.walk(X.elena, 'askjan', [[SPOTS.quiet[0], X.CORR_Y], [X.elena.home[0], X.CORR_Y], X.elena.home], 0, 0.35);
    X.walk(X.jan, 'askjan', [[X.jan.home[0], X.CORR_Y], [SPOTS.quiet[0], X.CORR_Y], at(0, 30, SPOTS.quiet)], 0.3, 0.7);
    A.to(X.jan.ring, 'askjan', { autoAlpha: 0 }, 0.3, 0.5);
    say(A, 'askjan', 'meet', { x: 120, y: 560, w: 800, who: 'Pepper', text: '“There’s a resident here, Elena, who had the post office counter in your town. Would you like to meet her, or not this time?”', a: 0.55 });
    say(A, 'askjan', 'meet', { cls: 'jan', x: 120, y: 760, w: 700, who: 'Jan', text: '“I’d like that.”', a: 0.72 });
    caption(A, 'askjan', 'meet', {
      cls: 'scene', y: 230,
      k: 'F1 Ask first',
      t: 'The next morning, Pepper asks Jan the same way.',
      s: 'Neither of them hears that the other was asked.',
    });
  });

  K.scenes.push(function meet(A) {
    dayMark(A, 'meet', 'pause', 'That afternoon');
    const t = SPOTS.table;
    const eP = X.eP = at(-34, 0, t), jP = X.jP = at(34, 0, t);
    X.walk(X.jan, 'meet', [[SPOTS.quiet[0], X.CORR_Y], [jP[0], X.CORR_Y], jP], 0, 0.4);
    X.walk(X.elena, 'meet', [[X.elena.home[0], X.CORR_Y], [eP[0], X.CORR_Y], eP], 0.05, 0.45);
    A.move(X.home.pepper.p, 'meet', { x: SPOTS.pepper[0], y: SPOTS.pepper[1] }, 0, 0.4);
    X.bond = S('path', { d: `M ${eP[0]} ${eP[1]} L ${jP[0]} ${jP[1]}`, stroke: C.ink, 'stroke-width': 3, 'stroke-linecap': 'round', fill: 'none' }, X.threads);
    A.draw(X.bond, 'meet', 0.5, 0.75);
    say(A, 'meet', 'pause', { x: 120, y: 470, w: 800, who: 'Pepper, with two photos', text: '“Elena, this is Jan. Jan, this is Elena. You both worked in [town]: Elena at the post office counter, Jan at the bakery.”', a: 0.45 });
    say(A, 'meet', 'pause', { cls: 'elena', x: 120, y: 720, w: 760, who: 'Elena', text: '“Your bread! I was across the road.”', a: 0.7 });
    caption(A, 'meet', 'pause', {
      cls: 'scene', y: 230,
      k: 'F3 Introduce',
      t: 'Pepper introduces them with the one thing they share.',
    });
  });

  K.scenes.push(function pause(A) {
    const mute = S('text', { x: SPOTS.pepper[0], y: SPOTS.pepper[1] - 40, 'text-anchor': 'middle', class: 'st-mono', 'font-size': 12, fill: C.sys, 'letter-spacing': '1.6' }, K.L.top, 'SILENT');
    gsap.set(mute, { autoAlpha: 0 });
    A.reveal(mute, 'pause', { a: 0.2, b: 0.4 });
    A.conceal(mute, 'gohome');
    caption(A, 'pause', 'gohome', {
      cls: 'scene', y: 230,
      k: 'IDP-01 Wait, then redirect gently',
      t: 'While they talk, Pepper stays silent.',
      s: 'Elena loses a word, and Jan waits until she finds it.',
    });
    say(A, 'pause', 'gohome', { x: 120, y: 640, w: 760, who: 'Pepper', text: '“If you’d both like a walk, the garden is open.”', a: 0.55 });
    say(A, 'pause', 'gohome', { cls: 'jan', x: 120, y: 790, w: 380, who: 'Jan', text: '“Tomorrow, after lunch?”', a: 0.7 });
    say(A, 'pause', 'gohome', { cls: 'elena', x: 520, y: 790, w: 340, who: 'Elena', text: '“If it’s dry.”', a: 0.8 });
  });

  K.scenes.push(function gohome(A) {
    dayMark(A, 'gohome', 'walk', 'That evening');
    A.to(X.bond, 'gohome', { autoAlpha: 0 }, 0, 0.3);
    X.walk(X.jan, 'gohome', [[X.jP[0], X.CORR_Y], [X.jan.home[0], X.CORR_Y], X.jan.home], 0, 0.4);

    // Myra, the care worker, appears from the corridor
    const mg = G(K.L.main);
    S('circle', { r: 26, fill: C.myra, 'fill-opacity': 0.14 }, mg);
    S('circle', { r: 10, fill: C.myra }, mg);
    S('text', { y: 42, 'text-anchor': 'middle', class: 'st-sans', 'font-size': 15, 'font-weight': 500, fill: C.myra }, mg, 'Myra');
    X.myra = { g: mg, p: A.xf(mg, SPOTS.entrance[0], X.CORR_Y, 1) };
    gsap.set(mg, { autoAlpha: 0 });
    A.reveal(mg, 'gohome', { a: 0.65, b: 0.75 });
    const tgt = at(80, -20, SPOTS.table);
    X.walk(X.myra, 'gohome', [[tgt[0], X.CORR_Y], tgt], 0.7, 1);

    say(A, 'gohome', 'walk', { cls: 'elena', x: 120, y: 470, w: 760, who: 'Elena', text: '“When can I go home?”', a: 0.35 });
    say(A, 'gohome', 'walk', { x: 120, y: 590, w: 760, who: 'Pepper', text: '“That’s one for Myra. Shall I ask her to come?”', a: 0.5 });
    caption(A, 'gohome', 'walk', {
      cls: 'scene', y: 230,
      k: 'IDP-03 Truthful deferral', kc: C.myra,
      t: 'When Elena asks to go home, Pepper fetches Myra.',
    });
  });

  K.scenes.push(function walk(A) {
    dayMark(A, 'walk', 'record', 'The next day');
    // Myra's phone note
    const phone = block('card', 120, 520, 520, `<div class="id" style="--accent:${C.myra}">Myra’s phone, after lunch</div>
      <div style="display:flex;gap:10px;margin-top:18px;flex-wrap:wrap"><span class="tag" style="color:var(--ink)">Elena and Jan</span><span class="tag" style="color:var(--ink)">walk</span><span class="tag" style="color:var(--ink)">lounge</span></div>
`);
    A.reveal(phone, 'walk', { a: 0.05, b: 0.25 });
    A.conceal(phone, 'record');

    const t = SPOTS.table;
    X.walk(X.jan, 'walk', [[X.jan.home[0], X.CORR_Y], [t[0] + 30, X.CORR_Y], at(30, 0, t)], 0.1, 0.3);
    X.walk(X.elena, 'walk', [at(-30, 0, t)], 0.1, 0.3);
    X.walk(X.myra, 'walk', [at(100, -30, t)], 0.1, 0.3);
    say(A, 'walk', 'record', { x: 120, y: 800, w: 760, who: 'Pepper', text: '“Elena, Jan, good to see you both.”', a: 0.25, b: 0.4 });

    // once round the garden loop
    const loop = X.home.loop;
    const len = loop.getTotalLength();
    const door = SPOTS.gardenDoor;
    const pts = k => { const q = loop.getPointAtLength(((k % 1) + 1) % 1 * len); return [q.x, q.y]; };
    // the loop starts at its left end; begin near the point closest to the door
    let best = 0, bd = 1e9;
    for (let i = 0; i < 100; i++) { const [x, y] = pts(i / 100); const dd = (x - door[0]) ** 2 + (y - door[1]) ** 2; if (dd < bd) { bd = dd; best = i / 100; } }
    const N = 14;
    const route = (off, end) => [door, ...Array.from({ length: N + 1 }, (_, i) => pts(best + off + i / N)), door, end];
    X.walk(X.elena, 'walk', route(-0.025, X.eP), 0.4, 0.97);
    X.walk(X.jan, 'walk', route(0.025, X.jP), 0.4, 0.97);
    A.to(loop, 'walk', { attr: { 'stroke-opacity': 1 } }, 0.35, 0.5);
    A.to(loop, 'record', { attr: { 'stroke-opacity': 0.55 } }, 0, 0.3);

    caption(A, 'walk', 'record', {
      cls: 'scene', y: 230,
      k: 'UC03 Following up', kc: C.jan,
      t: 'The next day they walk round the garden.',
    });
  });

  K.scenes.push(function record(A) {
    const card = block('card', 120, 520, 760, `<div class="id">F6 Keep a short record</div>
      <div style="display:grid;grid-template-columns:110px 1fr;row-gap:6px;align-items:baseline;margin-top:20px">
        <div style="font:300 64px/1 var(--sans)">1</div><div style="font:400 22px/1.3 var(--sans)">introduction, accepted by both</div>
        <div style="font:300 64px/1 var(--sans)">1</div><div style="font:400 22px/1.3 var(--sans)">walk</div>
        <div style="font:300 64px/1 var(--sans)">2</div><div style="font:400 22px/1.3 var(--sans)">notes to Myra</div>
      </div>
      <div class="never" style="position:relative;margin-top:26px"><div class="it" style="font-size:30px">what Elena and Jan said to each other<i></i></div></div>`);
    const strike = card.querySelector('.it i');
    gsap.set(strike, { scaleX: 0 });
    A.reveal(card, 'record', { a: 0.3, b: 0.8 });
    A.to(strike, 'record', { scaleX: 1 }, 0.8, 1);
    A.conceal(card, 'who');
    A.to([X.home.root, X.threads, X.myra.g], 'who', { autoAlpha: 0 }, 0, 0.3);
    caption(A, 'record', 'who', {
      cls: 'scene', y: 230,
      k: 'UC02 step 10',
      t: 'The System keeps a short record.',
      s: 'It notes what happened and nothing of what was said.',
    });
  });
})();
