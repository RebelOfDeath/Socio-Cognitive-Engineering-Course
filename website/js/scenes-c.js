/* VI Elena's first week (DS-01), told on the floor plan */
(function () {
  'use strict';
  const { C, S, block, caption, say, dayMark, SPOTS } = K;
  const X = K.ctx;

  const at = (dx, dy, p) => [p[0] + dx, p[1] + dy];

  K.scenes.push(function interview(A) {
    // the plan comes back, faint, behind the interview card
    A.to(X.home.root, 'interview', { autoAlpha: 0.18 }, 0.2, 0.6);
    A.to(X.threads, 'interview', { autoAlpha: 1 }, 0, 0.1);
    A.to(X.gap, 'interview', { autoAlpha: 0 }, 0, 0.2);
    A.to(X.jan.ring, 'interview', { autoAlpha: 1 }, 0, 0.1);
    dayMark(A, 'interview', 'match', 'Day two');

    caption(A, 'interview', 'match', {
      cls: 'scene', y: 260,
      k: 'UC02 Precondition · F1 Ask first',
      t: 'Elena unlocks only what she wants shared.',
      wx: `<div class="w-inline-pills">
        <span class="w-ip">Co-created with her son</span>
        <span class="w-ip gold">Default = Private</span>
      </div>`,
      c: 'DS-01 · TECH-06 Profile Privacy Gate',
    });

    const card = block('card w-filter-card', 960, 230, 840, `
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
    A.reveal(card, 'interview', { a: 0.3, b: 0.85, y: 26 });
    A.conceal(card, 'match');
    A.to(X.home.root, 'match', { autoAlpha: 1 }, 0.1, 0.5);
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
    caption(A, 'match', 'ask', {
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
  });

  K.scenes.push(function ask(A) {
    dayMark(A, 'ask', 'meet', 'In the quiet corner');
    A.to(X.cand, 'ask', { autoAlpha: 0 }, 0, 0.3);
    X.walk(X.elena, 'ask', [[X.elena.home[0], X.CORR_Y], [SPOTS.quiet[0], X.CORR_Y], at(0, 30, SPOTS.quiet)], 0.1, 0.5);
    A.move(X.home.pepper.p, 'ask', { x: SPOTS.quiet[0] - 60, y: SPOTS.quiet[1] + 20 }, 0.2, 0.55);
    caption(A, 'ask', 'meet', {
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
  });

  K.scenes.push(function meet(A) {
    dayMark(A, 'meet', 'pause', 'That afternoon');
    const t = SPOTS.table;
    const eP = X.eP = at(-34, 0, t), jP = X.jP = at(34, 0, t);
    A.to(X.jan.ring, 'meet', { autoAlpha: 0 }, 0, 0.3);
    X.walk(X.jan, 'meet', [[X.jan.home[0], X.CORR_Y], [jP[0], X.CORR_Y], jP], 0, 0.4);
    X.walk(X.elena, 'meet', [[SPOTS.quiet[0], X.CORR_Y], [eP[0], X.CORR_Y], eP], 0.05, 0.45);
    A.move(X.home.pepper.p, 'meet', { x: SPOTS.pepper[0], y: SPOTS.pepper[1] }, 0, 0.4);
    X.bond = S('path', { d: `M ${eP[0]} ${eP[1]} L ${jP[0]} ${jP[1]}`, stroke: C.ink, 'stroke-width': 3, 'stroke-linecap': 'round', fill: 'none' }, X.threads);
    A.draw(X.bond, 'meet', 0.5, 0.75);
    say(A, 'meet', 'pause', { x: 120, y: 470, w: 800, who: 'Pepper, with two photos', text: '“Elena, this is Jan. Jan, this is Elena. You both worked in [town]: Elena at the post office counter, Jan at the bakery.”', a: 0.45 });
    say(A, 'meet', 'pause', { cls: 'elena', x: 120, y: 720, w: 760, who: 'Elena', text: '“Your bread! I was across the road.”', a: 0.7 });
    caption(A, 'meet', 'pause', {
      cls: 'scene', y: 230,
      k: 'UC02 steps 4–5 · F3 Introduce · PR3',
      t: 'Pepper introduces them with the one thing they share.',
    });
  });

  K.scenes.push(function pause(A) {
    const mute = S('text', { x: SPOTS.pepper[0], y: SPOTS.pepper[1] - 40, 'text-anchor': 'middle', class: 'st-mono', 'font-size': 12, fill: C.sys, 'letter-spacing': '1.6' }, K.L.top, 'SILENT');
    gsap.set(mute, { autoAlpha: 0 });
    A.reveal(mute, 'pause', { a: 0.2, b: 0.4 });
    A.conceal(mute, 'record');
    caption(A, 'pause', 'record', {
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
  });

  K.scenes.push(function record(A) {
    A.to([X.home.root, X.threads], 'who', { autoAlpha: 0 }, 0, 0.3);
    caption(A, 'record', 'who', {
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
  });
})();
