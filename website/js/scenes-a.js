/* Setup, Cover, I Moving in */
(function () {
  'use strict';
  const { C, S, G, ln, block, caption, ref, doi, SPOTS, PLAN, abWrap, discardCard } = K;
  const X = K.ctx;

  const CORR_Y = PLAN.y + PLAN.roomH + PLAN.corr / 2;

  /* ------------------------------------------------------------ shared */
  K.scenes.push(function setup(A) {
    K.L = { bg: G(), main: G(), top: G() };
    X.home = K.buildHome(A, K.L.main);
    X.threads = G(K.L.main);
    K.L.main.insertBefore(X.threads, X.home.root.nextSibling);
    const d = X.home.dots;
    X.elena = d.elena;
    X.jan = d.jan;
    X.others = ['gerrit', 'willem', 'ria', 'ans', 'corrie'].map(n => d[n]);

    // Elena starts at the entrance, not yet in her room
    gsap.set(Object.values(d).map(o => o.g), { autoAlpha: 0 });
    X.elena.p.x = SPOTS.entrance[0];
    X.elena.p.y = SPOTS.entrance[1];
    X.elena.p.apply();

    /* Walk a dot through a list of points, spread over [a, b] of the transition into stop id. */
    X.walk = (dot, id, pts, a = 0, b = 1) => {
      const n = pts.length, step = (b - a) / n;
      pts.forEach((pt, i) => A.move(dot.p, id, { x: pt[0], y: pt[1] }, a + i * step, a + (i + 1) * step, i === 0 ? 'power2.in' : i === n - 1 ? 'power2.out' : 'none'));
    };
    X.CORR_Y = CORR_Y;
  });

  /* ------------------------------------------------------------- cover */
  K.scenes.push(function cover(A) {
    // a constellation of residents; two of them find each other
    const g = G(K.L.bg);
    const pts = [[1180, 300], [1330, 220], [1500, 330], [1620, 250], [1720, 420], [1260, 470], [1580, 560], [1150, 640], [1700, 700], [1420, 760]];
    pts.forEach(([x, y], i) => S('circle', { cx: x, cy: y, r: i === 2 || i === 6 ? 12 : 7, fill: i === 2 ? C.elena : i === 6 ? C.jan : C.muted, 'fill-opacity': i === 2 || i === 6 ? 1 : 0.45, class: 'breathe', style: `animation-delay:${i * 0.3}s` }, g));
    const th = S('path', ln({ d: 'M 1500 330 Q 1610 420 1580 560', stroke: C.ink, 'stroke-width': 2, 'stroke-dasharray': '4 8', class: 'marching' }), g);
    S('circle', { cx: 1540, cy: 445, r: 34, fill: 'none', stroke: C.sys, 'stroke-width': 2, class: 'pulse' }, g);
    S('circle', { cx: 1540, cy: 445, r: 7, fill: C.sys }, g);

    const el = block('abs cover', 0, 0, 1920, `
      <div class="abs kicker rise" style="left:120px;top:150px">Socio-Cognitive Engineering 2026, Group 04, final presentation</div>
      <div class="abs statement rise" style="left:110px;top:236px"><h1>Meaningful<br><em>connections</em>.</h1></div>
      <p class="abs lede rise" style="left:120px;top:668px;width:820px">How a quiet robot could help someone new to a care home meet one person worth meeting again.</p>
      <div class="abs names rise" style="left:120px;top:870px"><span>Diana Banţă</span><span>Roham Koohestani</span><span>Gints Kuļikovskis</span><span>Antoni Nowakowski</span><span>Rayan Salmi</span></div>
      <div class="abs hint rise" style="right:120px;top:960px"><span class="key">→</span> or <span class="key">space</span> to begin <span style="width:18px"></span><span class="key">G</span> contents</div>`);
    el.style.height = '1080px';
    A.conceal(el, 'open-q1', { a: 0, b: 0.3, y: -24 });
    A.conceal(g, 'open-q1', { a: 0, b: 0.3 });
    X.coverThread = th;
  });

  /* ----------------------------------------------------------- Opening */
  K.scenes.push(function openQ1(A) {
    const elA = K.H('div', 'ppt-slide', null, `
      <div class="k">Question 01 · For you</div>
      <h2>When did you last walk into a room where you knew <em>nobody</em>?</h2>
      <div class="ppt-pills">
        <div class="ppt-pill">First day at university</div>
        <div class="ppt-pill">Starting a new job</div>
        <div class="ppt-pill">Moving to a new city</div>
        <div class="ppt-pill">Joining a group late</div>
      </div>`);
    abWrap('open-q1', 'A', elA);
    A.reveal([...elA.children], 'open-q1', { a: 0.3, b: 0.9, stagger: 0.05, y: 14 });
    A.conceal(elA, 'open-q2', { a: 0, b: 0.3, y: -12 });

    discardCard(A, 'open-q1', 'open-q2', {
      x: 240, y: 240, w: 1440,
      title: 'Icebreaker Q1 removed to reach the core story & evaluation faster',
      why: 'This slide only listed 4 generic examples of entering a new room. The presenter can ask the question in one sentence on the cover slide.',
      kept: 'The contrast between how friendships actually form vs. day one in a care home is merged directly into Stop #04 (Starting over at eighty-one).',
    });
  });

  K.scenes.push(function openQ2(A) {
    const elA = K.H('div', 'ppt-slide', null, `
      <div class="k">Question 02 · Think of a close friend</div>
      <h2>What turned that first hello into an actual <em>friendship</em>?</h2>
      <div class="ppt-grid-3">
        <div class="ppt-card">
          <div class="num">01 · Common ground</div>
          <h3>Something shared</h3>
          <p>The same street, study, or past.</p>
        </div>
        <div class="ppt-card">
          <div class="num">02 · No pressure</div>
          <h3>Easy to say no</h3>
          <p>A low-stakes moment, not a spotlight.</p>
        </div>
        <div class="ppt-card">
          <div class="num">03 · Continuity</div>
          <h3>A second meeting</h3>
          <p>Seeing each other again before you forget.</p>
        </div>
      </div>`);
    abWrap('open-q2', 'A', elA);
    A.reveal([elA.children[0], elA.children[1], ...elA.children[2].children], 'open-q2', { a: 0.3, b: 0.9, stagger: 0.04, y: 14 });
    A.conceal(elA, 'open-hook', { a: 0, b: 0.3, y: -12 });

    discardCard(A, 'open-q2', 'open-hook', {
      x: 240, y: 240, w: 1440,
      title: 'Merged into Stop #04 (Starting over at eighty-one)',
      why: 'Instead of spending three separate slides on the opening hook, all three pillars (Common ground, Easy to say no, Second meeting) now appear in the visual pipeline on the next slide.',
      kept: '01 Common ground · 02 No pressure (easy no) · 03 Continuity (second meeting) → integrated into Stop #04 Option B.',
    });
  });

  K.scenes.push(function openHook(A) {
    const elA = K.H('div', 'ppt-slide', null, `
      <div class="k">Our starting point</div>
      <h2>Now imagine starting over at <em>eighty-one</em> — with dementia.</h2>
      <div class="ppt-grid-2">
        <div class="ppt-card">
          <div class="num" style="color:var(--alert)">What usually happens</div>
          <h3>Ten strangers at lunch</h3>
          <ul class="ppt-list">
            <li>Introduced to the whole table at once</li>
            <li>Every name gone by evening</li>
            <li>Easier to stay in your room tomorrow</li>
          </ul>
        </div>
        <div class="ppt-card accent">
          <div class="num">Our goal</div>
          <h3>One person worth meeting again</h3>
          <ul class="ppt-list">
            <li><b>Not</b> a robot pretending to be a friend</li>
            <li>A quiet host that finds <b>one shared thread</b></li>
            <li>Asks in private, introduces, then steps back</li>
          </ul>
        </div>
      </div>`);
    abWrap('open-hook', 'A', elA);
    A.reveal([elA.children[0], elA.children[1], ...elA.children[2].children], 'open-hook', { a: 0.3, b: 0.9, stagger: 0.04, y: 14 });
    A.conceal(elA, 'arrive', { a: 0, b: 0.3, y: -12 });

    const elB = K.H('div', 'ppt-slide', null, `
      <div class="k">Our starting point · Condensed opening</div>
      <h2 style="margin-bottom:38px">Starting over at <em>eighty-one</em> — with dementia.</h2>
      <div class="w-vs-stack">
        <div class="w-pipeline bad">
          <div class="w-pipe-head">
            <span class="w-badge alert">Usual Care Home Day 1</span>
            <strong>Overload → Withdrawal</strong>
          </div>
          <div class="w-pipe-steps">
            <div class="w-step-box"><div class="w-big-num">10+</div><div class="w-step-label">Strangers at lunch<small>Introduced all at once</small></div></div>
            <div class="w-pipe-arrow">→</div>
            <div class="w-step-box"><div class="w-big-num">0</div><div class="w-step-label">Names by evening<small>Short-term memory overload</small></div></div>
            <div class="w-pipe-arrow">→</div>
            <div class="w-step-box alert-box"><div class="w-big-num">🚪</div><div class="w-step-label">Stays in bedroom<small>Safer than facing strangers</small></div></div>
          </div>
        </div>
        <div class="w-pipeline good">
          <div class="w-pipe-head">
            <span class="w-badge gold">Kinnect · Quiet Host (Not a Robot Companion)</span>
            <strong>How Real Friendships Form</strong>
          </div>
          <div class="w-pipe-steps four">
            <div class="w-step-box"><div class="w-tag-top">01 · Common Ground</div><div class="w-step-title">One shared thread</div><div class="w-step-sub">Same town, work, or interest</div></div>
            <div class="w-pipe-arrow">→</div>
            <div class="w-step-box"><div class="w-tag-top">02 · No Pressure</div><div class="w-step-title">Private ask first</div><div class="w-step-sub">Easy to say no alone</div></div>
            <div class="w-pipe-arrow">→</div>
            <div class="w-step-box"><div class="w-tag-top">03 · Host Steps Back</div><div class="w-step-title">1-to-1 intro, then mute</div><div class="w-step-sub">Humans talk, robot is silent</div></div>
            <div class="w-pipe-arrow">→</div>
            <div class="w-step-box accent-box"><div class="w-tag-top">04 · Continuity</div><div class="w-step-title">Meet again</div><div class="w-step-sub">1 person worth seeing tomorrow</div></div>
          </div>
        </div>
      </div>`);
    abWrap('open-hook', 'B', elB);
    A.reveal([...elB.children], 'open-hook', { a: 0.3, b: 0.9, stagger: 0.05, y: 14 });
    A.conceal(elB, 'arrive', { a: 0, b: 0.3, y: -12 });
  });

  /* ------------------------------------------------------- I Moving in */
  K.scenes.push(function arrive(A) {
    const h = X.home;
    gsap.set(h.walls, { autoAlpha: 0 });
    A.set(h.walls, 'arrive', { autoAlpha: 1 }, 0.14);
    A.draw(h.walls, 'arrive', 0.15, 0.75, { stagger: 0.02 });
    A.reveal([h.labels, h.loop], 'arrive', { a: 0.5, b: 0.85 });
    A.reveal([X.jan.g, ...X.others.map(o => o.g)], 'arrive', { a: 0.5, b: 0.9, stagger: 0.04 });
    A.reveal(X.elena.g, 'arrive', { a: 0.7, b: 0.85 });
    A.reveal(X.elena.halo, 'arrive', { a: 0.7, b: 0.9 });
    K.dayMark(A, 'arrive', 'context', 'Day one', 'Elena moves in');

    const capA = caption(A, 'arrive', 'flurry', {
      k: 'SA-01 Moving into the care home',
      t: 'Elena moves into the care home.',
      s: 'She is 81 and has mild Alzheimer’s disease. She knows nobody here.',
      c: `HP-01 Elena ${doi('Sury et al. (2013)', '10.1017/S1041610213000057')}`,
    });
    abWrap('arrive', 'A', capA);

    const capB = caption(A, 'arrive', 'flurry', {
      k: 'SA-01 · HP-01 Persona',
      t: 'Elena moves into Room 14.',
      wx: `<div class="w-chip-grid">
        <div class="w-stat-chip"><span class="n">81</span><span class="l">Years old · Mild Alzheimer’s</span></div>
        <div class="w-stat-chip"><span class="n">25 yrs</span><span class="l">Town post office counter</span></div>
        <div class="w-stat-chip alert"><span class="n">0</span><span class="l">People she knows here</span></div>
      </div>`,
      c: `HP-01 Elena ${doi('Sury et al. (2013)', '10.1017/S1041610213000057')}`,
    });
    abWrap('arrive', 'B', capB);
  });

  K.scenes.push(function flurry(A) {
    const lounge = SPOTS.table;
    X.walk(X.elena, 'flurry', [[SPOTS.entrance[0], CORR_Y], [lounge[0], CORR_Y], lounge], 0, 0.3);

    const names = [['Corrie', -150, -50], ['Willem', 120, -60], ['the night nurse', -210, 30], ['Ans', 150, 40], ['Sanne', -120, 95], ['Ria', 60, 105], ['the cook', 210, -5], ['Gerrit', -40, -85]];
    const tags = names.map(([n, dx, dy]) => {
      const t = S('text', { x: lounge[0] + dx, y: lounge[1] + dy, 'text-anchor': 'middle', class: 'st-serif', 'font-size': 36, 'font-style': 'italic', 'font-weight': 500, fill: C.ink }, K.L.top, n);
      return t;
    });
    // names arrive one after another and stay while we talk; they fade slowly as she goes to her room
    A.reveal(tags, 'flurry', { a: 0.3, b: 1, stagger: 0.07 });
    A.to(tags, 'jan', { autoAlpha: 0, stagger: 0.05 * A.dur('jan') }, 0, 0.45);
    // she ends the day in her room
    X.walk(X.elena, 'jan', [[lounge[0], CORR_Y], [X.elena.home[0], CORR_Y], X.elena.home], 0, 0.45);

    const capA = caption(A, 'flurry', 'jan', {
      k: 'PS-01 The first weeks', kc: C.alert,
      t: 'On her first day she meets everyone at once.',
      s: 'By the evening she remembers none of their names.',
      c: `PS-01 ${doi('Victor (2012)', '10.2217/ahe.12.65')}`,
    });
    abWrap('flurry', 'A', capA);

    const capB = caption(A, 'flurry', 'jan', {
      k: 'PS-01 · Cognitive overload', kc: C.alert,
      t: 'Everyone at once — then nobody.',
      wx: `<div class="w-mini-flow">
        <div class="w-mf-node"><b>8+</b><span>Names at lunch</span></div>
        <div class="w-mf-arr">→</div>
        <div class="w-mf-node alert"><b>0</b><span>Kept by evening</span></div>
        <div class="w-mf-arr">→</div>
        <div class="w-mf-node"><b>Rm 14</b><span>Retreats alone</span></div>
      </div>`,
      c: `PS-01 ${doi('Victor (2012)', '10.2217/ahe.12.65')}`,
    });
    abWrap('flurry', 'B', capB);
  });

  K.scenes.push(function jan(A) {
    A.reveal(X.jan.ring, 'jan', { a: 0.4, b: 0.7 });
    A.reveal(X.jan.halo, 'jan', { a: 0.4, b: 0.7 });
    const capA = caption(A, 'jan', 'wait', {
      k: 'SA-02 Waiting for a reason to leave the room',
      t: 'Next door, Jan has stopped coming out.',
      s: 'He ran the bakery in her town, and the people he used to talk to here have died or moved away.',
      c: `PS-02 Staying in ${doi('Jansen et al. (2017)', '10.1186/s12877-017-0430-7')}`,
    });
    abWrap('jan', 'A', capA);

    discardCard(A, 'jan', 'wait', {
      x: 120, y: 230, w: 760,
      title: 'Merged into Stop #08 (Same town, without knowing it)',
      why: 'Separating “Jan stays in his room” and “They share a town” into two stops slows down the problem scenario.',
      kept: 'Jan’s room isolation (PS-02), his 30 years at the town bakery, and the shared-town liking gap (PS-03) are combined on the next stop.',
    });
  });

  K.scenes.push(function wait(A) {
    const e = X.elena.home, j = X.jan.home;
    X.gap = K.thread(X.threads, [e[0], e[1] + 4], [j[0], j[1] + 4], C.muted, 70, { 'stroke-dasharray': '3 9', 'stroke-width': 2 });
    A.reveal(X.gap, 'wait', { a: 0.3, b: 0.7 });
    X.gapQ = S('text', { x: (e[0] + j[0]) / 2, y: e[1] + 62, 'text-anchor': 'middle', class: 'st-serif', 'font-size': 36, 'font-style': 'italic', 'font-weight': 500, fill: C.jan }, K.L.top, 'same town?');
    X.gapQ.setAttribute('y', X.CORR_Y + 12);
    A.reveal(X.gapQ, 'wait', { a: 0.5, b: 0.9 });
    A.conceal(X.gapQ, 'polite', { a: 0, b: 0.3 });

    const capA = caption(A, 'wait', 'polite', {
      k: 'PS-03 Each waits for the other', kc: C.alert,
      t: 'They grew up in the same town without knowing it.',
      s: 'Each waits for the other to make the first move.',
      c: `HFC-16 the liking gap ${doi('Boothby et al. (2018)', '10.1177/0956797618783714')}`,
    });
    abWrap('wait', 'A', capA);

    const capB = caption(A, 'wait', 'polite', {
      y: 190, w: 780,
      k: 'PS-02 & PS-03 · Shared past, silent corridor', kc: C.alert,
      t: 'Same town, two doors apart — neither steps out.',
      wx: `<div class="w-pair-bridge">
        <div class="w-pb-card elena">
          <div class="w-pb-who">Elena · Room 14</div>
          <div class="w-pb-role">Post office counter (25 yrs)</div>
          <div class="w-pb-state">Waits to be approached</div>
        </div>
        <div class="w-pb-mid">
          <span class="w-pb-tag">Same Town</span>
          <div class="w-pb-line"></div>
          <small>Liking gap (HFC-16):<br>neither knows</small>
        </div>
        <div class="w-pb-card jan">
          <div class="w-pb-who">Jan · Room 12</div>
          <div class="w-pb-role">Town bakery (30 yrs)</div>
          <div class="w-pb-state">Old friends gone; stays in room</div>
        </div>
      </div>`,
      c: `PS-02 ${doi('Jansen et al. (2017)', '10.1186/s12877-017-0430-7')} · HFC-16 ${doi('Boothby et al. (2018)', '10.1177/0956797618783714')}`,
    });
    abWrap('wait', 'B', capB);
  });

  K.scenes.push(function polite(A) {
    A.to([X.home.root, X.threads], 'context', { autoAlpha: 0 }, 0, 0.3);
    const capA = caption(A, 'polite', 'context', {
      k: 'PS-04 A yes to be polite', kc: C.alert,
      t: 'In the lounge, people say yes to be polite.',
      s: 'Saying no in front of others feels rude, so they agree and then avoid the room.',
      c: `HFC-17 ${doi('Bohns (2016)', '10.1177/0963721415628011')} ${doi('Mastroianni et al. (2021)', '10.1073/pnas.2011809118')}`,
    });
    abWrap('polite', 'A', capA);

    discardCard(A, 'polite', 'context', {
      x: 120, y: 230, w: 760,
      title: 'Discarded: redundant with Background & Design Rules',
      why: 'This stop had no new floor-plan action, and its exact point (public invitations force a polite “yes”, HFC-17) is stated directly in the next two slides.',
      kept: 'Covered in Stop #10 (VT-02 Autonomy vs. Connection) and Stop #11 (Rule 01: Ask Alone where “no” costs nothing).',
    });
  });

})();
