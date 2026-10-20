/* VI Elena's first week (DS-01), told on the floor plan */
(function () {
  'use strict';
  const { C, S, G, block, caption, say, dayMark, SPOTS, PLAN, abWrap, discardCard } = K;
  const X = K.ctx;

  const at = (dx, dy, p) => [p[0] + dx, p[1] + dy];

  K.scenes.push(function interview(A) {
    // the plan comes back, faint, behind the interview card
    A.to(X.home.root, 'interview', { autoAlpha: 0.18 }, 0.2, 0.6);
    A.to(X.threads, 'interview', { autoAlpha: 1 }, 0, 0.1);
    A.to(X.gap, 'interview', { autoAlpha: 0 }, 0, 0.2);
    A.to(X.jan.ring, 'interview', { autoAlpha: 1 }, 0, 0.1);
    dayMark(A, 'interview', 'match', 'Day two');

    const items = [
      ['The post office counter, twenty-five years', true],
      ['Her town', true],
      ['Her garden', true],
      ['Her diagnosis', false],
      ['Thomas’s death last year', false, 'Myra answers, as agreed with her son'],
    ];
    const cardA = block('card', 1000, 250, 800, `<div class="id" style="--accent:${C.elena}">TECH-06 Elena’s profile</div>
      <h3 style="margin-bottom:22px">What other residents may know</h3>` +
      items.map(([t, ok, note]) => `<div style="display:flex;justify-content:space-between;align-items:center;padding:14px 0;border-top:1px solid var(--line)">
        <div style="font:400 22px/1.3 var(--sans)">${t}${note ? `<div style="font:400 15px/1.4 var(--mono);color:var(--myra);margin-top:4px">${note}</div>` : ''}</div>
        <span class="tag ${ok ? 'solid' : ''}" style="${ok ? `background:${C.jan};` : `color:${C.muted}`}">${ok ? 'shareable' : 'private'}</span></div>`).join(''));
    A.reveal(cardA, 'interview', { a: 0.3, b: 0.8, y: 30 });
    A.reveal([...cardA.querySelectorAll('.tag')], 'interview', { a: 0.6, b: 1, stagger: 0.04, y: 0, s: 0.6 });
    A.conceal(cardA, 'match');
    A.to(X.home.root, 'match', { autoAlpha: 1 }, 0.1, 0.5);

    const capA = caption(A, 'interview', 'match', {
      cls: 'scene', y: 300,
      k: 'UC02 precondition · released profile items',
      t: 'Elena decides what other residents may know.',
      s: 'Her son sits with her during the life-story interview. Every item starts out private; only released items can ever be used.',
      c: 'DS-01 · selected use case UC02 Introducing two residents · F1 Ask first',
    });
    abWrap('interview', 'A', cardA, capA);

    const capB = caption(A, 'interview', 'match', {
      cls: 'scene', y: 260,
      k: 'UC02 Precondition · F1 Ask first',
      t: 'Elena unlocks only what she wants shared.',
      wx: `<div class="w-inline-pills">
        <span class="w-ip">Co-created with her son</span>
        <span class="w-ip gold">Default = Private</span>
      </div>`,
      c: 'DS-01 · TECH-06 Profile Privacy Gate',
    });
    const cardB = block('card w-filter-card', 960, 230, 840, `
      <div class="id" style="--accent:${C.elena}">TECH-06 · Elena’s Profile Gate</div>
      <div class="w-filter-cols">
        <div class="w-f-col open">
          <div class="w-f-head"><span>🔓 Released for Matching</span><b>3 items</b></div>
          <div class="w-f-item ok"><strong>Post office counter</strong><span>25 years in town</span></div>
          <div class="w-f-item ok"><strong>Home town</strong><span>Shared geography</span></div>
          <div class="w-f-item ok"><strong>Gardening</strong><span>Outdoor activity</span></div>
        </div>
        <div class="w-f-col locked">
          <div class="w-f-head"><span>🔒 Locked Private (Blocked)</span><b>2 items</b></div>
          <div class="w-f-item no"><strong>Alzheimer’s diagnosis</strong><span>Medical · Never used</span></div>
          <div class="w-f-item no"><strong>Husband Thomas’s death</strong><span>Grief · Handled by Myra</span></div>
        </div>
      </div>
    `);
    abWrap('interview', 'B', capB, cardB);
    A.reveal(cardB, 'interview', { a: 0.3, b: 0.85, y: 26 });
    A.conceal(cardB, 'match');
  });

  K.scenes.push(function match(A) {
    dayMark(A, 'match', 'ask', 'Matching');
    A.reveal(X.home.pepper.g, 'match', { a: 0.2, b: 0.5 });
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
    const capA = caption(A, 'match', 'ask', {
      cls: 'scene', y: 300,
      k: 'UC02 Introducing two residents · steps 1–2',
      t: 'The coordinator approves one of three matches.',
      s: 'Jan had the bakery in her town. Health, losses and family conflicts are never used.',
      c: 'F2 Suggest matches · TECH-05 · PR2',
    });
    abWrap('match', 'A', capA);

    const capB = caption(A, 'match', 'ask', {
      cls: 'scene', y: 210,
      k: 'UC02 Steps 1–2 · F2 & PR2',
      t: 'Coordinator approves 1 of 3 candidates.',
      wx: `<div class="w-cand-list">
        <div class="w-cand-row dim"><span>01 · Gerrit (Rm 03)</span><span>Shared: Garden</span><i>Hold</i></div>
        <div class="w-cand-row dim"><span>02 · Ans (Rm 21)</span><span>Shared: Music</span><i>Hold</i></div>
        <div class="w-cand-row win"><span>03 · Jan (Rm 12)</span><span>Shared: Town + Bakery / Post Office</span><b>✓ Approved</b></div>
      </div>`,
      c: 'TECH-05 · PR2: Never uses health, loss, or family conflict',
    });
    abWrap('match', 'B', capB);
  });

  K.scenes.push(function ask(A) {
    dayMark(A, 'ask', 'askjan', 'In the quiet corner');
    A.to(X.cand, 'ask', { autoAlpha: 0 }, 0, 0.3);
    X.walk(X.elena, 'ask', [[X.elena.home[0], X.CORR_Y], [SPOTS.quiet[0], X.CORR_Y], at(0, 30, SPOTS.quiet)], 0.1, 0.5);
    A.move(X.home.pepper.p, 'ask', { x: SPOTS.quiet[0] - 60, y: SPOTS.quiet[1] + 20 }, 0.2, 0.55);
    const s1 = say(A, 'ask', 'askjan', { x: 120, y: 520, w: 800, who: 'Pepper', text: '“There’s a resident here, Jan, who had the bakery in your town. Would you like to meet him, or not this time?”', a: 0.5 });
    const s2 = say(A, 'ask', 'askjan', { cls: 'elena', x: 120, y: 700, w: 700, who: 'Elena', text: '“The bakery? Yes.”', a: 0.65 });
    const s3 = say(A, 'ask', 'askjan', { x: 120, y: 810, w: 800, who: 'Pepper', text: '“May I tell him you had the post office counter?”  <span style="color:var(--elena)">“Yes.”</span>', a: 0.8 });
    const capA = caption(A, 'ask', 'askjan', {
      cls: 'scene', y: 230,
      k: 'UC02 step 3 · IDP-02 Ask first', kc: C.sys,
      t: 'Pepper asks Elena in private.',
    });
    abWrap('ask', 'A', s1, s2, s3, capA);

    const capB = caption(A, 'ask', 'askjan', {
      cls: 'scene', y: 185,
      k: 'UC02 Step 3 · IDP-02 & PR1 Double-Blind Ask', kc: C.sys,
      t: 'Pepper asks Elena, then Jan — each alone.',
      wx: `<div class="w-consent-gate">
        <div class="w-cg-step elena">
          <div class="w-cg-who">1 · Elena (Quiet Corner)</div>
          <div class="w-cg-q">“Meet Jan (bakery in your town), or not this time?”</div>
          <div class="w-cg-pills"><span class="ok">✓ “The bakery? Yes.”</span><span class="ok">✓ Share “post office”</span></div>
        </div>
        <div class="w-cg-step jan">
          <div class="w-cg-who">2 · Jan (Next Morning, Alone)</div>
          <div class="w-cg-q">“Meet Elena (post office in your town), or not this time?”</div>
          <div class="w-cg-pills"><span class="ok">✓ “I’d like that.”</span></div>
        </div>
        <div class="w-cg-rule">🔒 <b>PR1 Gate:</b> A “no” is never told to the other person. Introduction requires <b>2 private yeses</b>.</div>
      </div>`,
    });
    abWrap('ask', 'B', capB);
  });

  K.scenes.push(function askjan(A) {
    const dmA = dayMark(A, 'askjan', 'meet', 'Next morning');
    X.walk(X.elena, 'askjan', [[SPOTS.quiet[0], X.CORR_Y], [X.elena.home[0], X.CORR_Y], X.elena.home], 0, 0.35);
    X.walk(X.jan, 'askjan', [[X.jan.home[0], X.CORR_Y], [SPOTS.quiet[0], X.CORR_Y], at(0, 30, SPOTS.quiet)], 0.3, 0.7);
    A.to(X.jan.ring, 'askjan', { autoAlpha: 0 }, 0.3, 0.5);
    const s1 = say(A, 'askjan', 'meet', { x: 120, y: 560, w: 800, who: 'Pepper', text: '“There’s a resident here, Elena, who had the post office counter in your town. Would you like to meet her, or not this time?”', a: 0.55 });
    const s2 = say(A, 'askjan', 'meet', { cls: 'jan', x: 120, y: 760, w: 700, who: 'Jan', text: '“I’d like that.”', a: 0.72 });
    const capA = caption(A, 'askjan', 'meet', {
      cls: 'scene', y: 230,
      k: 'UC02 step 3 · F1 Ask first · PR1',
      t: 'The next morning, Pepper asks Jan the same way.',
      s: 'Neither of them hears that the other was asked.',
    });
    abWrap('askjan', 'A', dmA, s1, s2, capA);

    discardCard(A, 'askjan', 'meet', {
      x: 120, y: 230, w: 780,
      title: 'Merged into Stop #14 (Two-way private consent widget)',
      why: 'Stop #15 repeats the exact same private-ask question word-for-word for Jan. Combining both private asks into a single visual consent gate saves a full stop.',
      kept: 'Jan’s private ask, his “I’d like that” response, and the PR1 double-blind rule are shown on Stop #14 Option B.',
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
    const s1 = say(A, 'meet', 'pause', { x: 120, y: 470, w: 800, who: 'Pepper, with two photos', text: '“Elena, this is Jan. Jan, this is Elena. You both worked in [town]: Elena at the post office counter, Jan at the bakery.”', a: 0.45 });
    const s2 = say(A, 'meet', 'pause', { cls: 'elena', x: 120, y: 720, w: 760, who: 'Elena', text: '“Your bread! I was across the road.”', a: 0.7 });
    const capA = caption(A, 'meet', 'pause', {
      cls: 'scene', y: 230,
      k: 'UC02 steps 4–5 · F3 Introduce · PR3',
      t: 'Pepper introduces them with the one thing they share.',
    });
    abWrap('meet', 'A', s1, s2, capA);

    const capB = caption(A, 'meet', 'pause', {
      cls: 'scene', y: 195,
      k: 'UC02 Steps 4–5 · F3 Introduce · PR3',
      t: 'Two photos, one shared town — then they take over.',
      wx: `<div class="w-tablet-intro">
        <div class="w-ti-bar">PEPPER CHEST TABLET · PLAIN STATEMENT (NO QUIZZING)</div>
        <div class="w-ti-cards">
          <div class="w-ti-person elena"><div class="av">E</div><strong>Elena</strong><span>Post office counter</span></div>
          <div class="w-ti-shared"><span>Shared Thread</span><b>Same Town</b></div>
          <div class="w-ti-person jan"><div class="av">J</div><strong>Jan</strong><span>Town bakery</span></div>
        </div>
        <div class="w-ti-spark">
          <span class="who">ELENA</span>
          <span class="quote">“Your bread! I was across the road.”</span>
        </div>
      </div>`,
    });
    abWrap('meet', 'B', capB);
  });

  K.scenes.push(function pause(A) {
    const mute = S('text', { x: SPOTS.pepper[0], y: SPOTS.pepper[1] - 40, 'text-anchor': 'middle', class: 'st-mono', 'font-size': 12, fill: C.sys, 'letter-spacing': '1.6' }, K.L.top, 'SILENT');
    gsap.set(mute, { autoAlpha: 0 });
    A.reveal(mute, 'pause', { a: 0.2, b: 0.4 });
    A.conceal(mute, 'walk');
    const capA = caption(A, 'pause', 'walk', {
      cls: 'scene', y: 230,
      k: 'UC02 steps 6–7 · IDP-01 Wait, then redirect gently',
      t: 'While they talk, Pepper stays silent.',
      s: 'Elena loses a word, and Jan waits until she finds it.',
    });
    const s1 = say(A, 'pause', 'walk', { x: 120, y: 640, w: 760, who: 'Pepper', text: '“If you’d both like a walk, the garden is open.”', a: 0.55 });
    const s2 = say(A, 'pause', 'walk', { cls: 'jan', x: 120, y: 790, w: 380, who: 'Jan', text: '“Tomorrow, after lunch?”', a: 0.7 });
    const s3 = say(A, 'pause', 'walk', { cls: 'elena', x: 520, y: 790, w: 340, who: 'Elena', text: '“If it’s dry.”', a: 0.8 });
    abWrap('pause', 'A', capA, s1, s2, s3);

    const capB = caption(A, 'pause', 'walk', {
      cls: 'scene', y: 185,
      k: 'UC02 Steps 6–7 · IDP-01 Silence, Prompt & Garden Walk',
      t: 'Pepper stays silent — and prompts only when talk stalls.',
      wx: `<div class="w-3beat">
        <div class="w-3b-row">
          <span class="w-3b-badge">1 · Silence</span>
          <div class="w-3b-body"><strong>Self-repair without stigma</strong><span>Elena loses a word; Jan waits; she finds it herself. Pepper stays muted.</span></div>
        </div>
        <div class="w-3b-row">
          <span class="w-3b-badge gold">2 · Prompt</span>
          <div class="w-3b-body"><strong>“If you’d both like a walk, the garden is open.”</strong><span>Jan: <i>“Tomorrow, after lunch?”</i> · Elena: <i>“If it’s dry.”</i></span></div>
        </div>
        <div class="w-3b-row">
          <span class="w-3b-badge myra">3 · Hand-off</span>
          <div class="w-3b-body"><strong>3-tag note to Myra’s phone</strong><span><code>Elena &amp; Jan</code> · <code>Walk</code> · <code>Lounge</code> → Next day they walk the garden.</span></div>
        </div>
      </div>`,
    });
    abWrap('pause', 'B', capB);
  });

  K.scenes.push(function walk(A) {
    const dmA = dayMark(A, 'walk', 'record', 'The next day');
    // Myra's phone note
    const phoneA = block('card', 120, 520, 520, `<div class="id" style="--accent:${C.myra}">Myra’s phone, after lunch</div>
      <div style="display:flex;gap:10px;margin-top:18px;flex-wrap:wrap"><span class="tag" style="color:var(--ink)">Elena and Jan</span><span class="tag" style="color:var(--ink)">walk</span><span class="tag" style="color:var(--ink)">lounge</span></div>
`);
    A.reveal(phoneA, 'walk', { a: 0.05, b: 0.25 });
    A.conceal(phoneA, 'record');

    // Myra, the care worker, comes to open the garden door
    const mg = G(K.L.main);
    S('circle', { r: 26, fill: C.myra, 'fill-opacity': 0.14 }, mg);
    S('circle', { r: 10, fill: C.myra }, mg);
    S('text', { y: 42, 'text-anchor': 'middle', class: 'st-sans', 'font-size': 15, 'font-weight': 500, fill: C.myra }, mg, 'Myra');
    X.myra = { g: mg, p: A.xf(mg, SPOTS.entrance[0], X.CORR_Y, 1) };
    gsap.set(mg, { autoAlpha: 0 });
    A.reveal(mg, 'walk', { a: 0.05, b: 0.15 });
    const t = SPOTS.table;
    X.walk(X.jan, 'walk', [at(30, 0, t)], 0.1, 0.3);
    X.walk(X.elena, 'walk', [at(-30, 0, t)], 0.1, 0.3);
    X.walk(X.myra, 'walk', [[at(100, -30, t)[0], X.CORR_Y], at(100, -30, t)], 0.1, 0.3);
    const s1 = say(A, 'walk', 'record', { x: 120, y: 800, w: 760, who: 'Pepper', text: '“Elena, Jan, good to see you both.”', a: 0.25, b: 0.4 });

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

    const capA = caption(A, 'walk', 'record', {
      cls: 'scene', y: 230,
      k: 'UC02 step 7 · the activity they chose', kc: C.jan,
      t: 'The next day they walk round the garden.',
    });
    abWrap('walk', 'A', dmA, phoneA, s1, capA);

    discardCard(A, 'walk', 'record', {
      x: 120, y: 230, w: 780,
      title: 'Merged into Stop #17 (Silence, Prompt & Hand-off)',
      why: 'As noted in the speaker notes, the next-day walk reminder belongs to UC03 (not our selected use case UC02), and this stop took 3.6 seconds of transition time.',
      kept: 'Myra’s 3-tag phone note (Elena & Jan · Walk · Lounge) and the garden walk outcome are now included directly on Stop #17 Option B.',
    });
  });

  K.scenes.push(function record(A) {
    const cardA = block('card', 120, 520, 760, `<div class="id">F6 Keep a short record</div>
      <div style="display:grid;grid-template-columns:110px 1fr;row-gap:6px;align-items:baseline;margin-top:20px">
        <div style="font:300 64px/1 var(--sans)">1</div><div style="font:400 22px/1.3 var(--sans)">introduction, accepted by both</div>
        <div style="font:300 64px/1 var(--sans)">1</div><div style="font:400 22px/1.3 var(--sans)">walk</div>
        <div style="font:300 64px/1 var(--sans)">1</div><div style="font:400 22px/1.3 var(--sans)">note to Myra</div>
      </div>
      <div class="never" style="position:relative;margin-top:26px"><div class="it" style="font-size:30px">what Elena and Jan said to each other<i></i></div></div>`);
    const strike = cardA.querySelector('.it i');
    gsap.set(strike, { scaleX: 0 });
    A.reveal(cardA, 'record', { a: 0.3, b: 0.8 });
    A.to(strike, 'record', { scaleX: 1 }, 0.8, 1);
    A.conceal(cardA, 'who');
    A.to([X.home.root, X.threads, X.myra.g], 'who', { autoAlpha: 0 }, 0, 0.3);
    const capA = caption(A, 'record', 'who', {
      cls: 'scene', y: 230,
      k: 'UC02 step 10 · F6 · PR6',
      t: 'The System keeps a short record.',
      s: 'It notes what happened and nothing of what was said.',
    });
    abWrap('record', 'A', cardA, capA);

    const capB = caption(A, 'record', 'who', {
      cls: 'scene', y: 195,
      k: 'UC02 Step 10 · F6 & PR6 Data Minimization',
      t: 'Events logged. Conversation never recorded.',
      wx: `<div class="w-record-split">
        <div class="w-rs-col ok">
          <div class="w-rs-head">✓ Stored Locally (3 Counters)</div>
          <div class="w-rs-pill"><b>1</b> Accepted introduction</div>
          <div class="w-rs-pill"><b>1</b> Garden walk</div>
          <div class="w-rs-pill"><b>1</b> Staff note to Myra</div>
        </div>
        <div class="w-rs-col no">
          <div class="w-rs-head">✗ Strictly Forbidden (PR6)</div>
          <div class="w-rs-pill strike"><b>0</b> Audio recordings</div>
          <div class="w-rs-pill strike"><b>0</b> Spoken transcripts</div>
          <div class="w-rs-pill strike"><b>0</b> External cloud packets</div>
        </div>
      </div>`,
    });
    abWrap('record', 'B', capB);
  });
})();
