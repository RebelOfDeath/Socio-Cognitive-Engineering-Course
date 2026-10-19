/* Setup, Cover, I Moving in */
(function () {
  'use strict';
  const { C, S, G, ln, block, caption, ref, doi, SPOTS, PLAN } = K;
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
    const el = K.H('div', 'ppt-slide', null, `
      <div class="k">Question 01 · For you</div>
      <h2>When did you last walk into a room where you knew <em>nobody</em>?</h2>
      <div class="ppt-pills">
        <div class="ppt-pill">First day at university</div>
        <div class="ppt-pill">Starting a new job</div>
        <div class="ppt-pill">Moving to a new city</div>
        <div class="ppt-pill">Joining a group late</div>
      </div>`);
    A.reveal([...el.children], 'open-q1', { a: 0.3, b: 0.9, stagger: 0.05, y: 14 });
    A.conceal(el, 'open-q2', { a: 0, b: 0.3, y: -12 });
  });

  K.scenes.push(function openQ2(A) {
    const el = K.H('div', 'ppt-slide', null, `
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
    A.reveal([el.children[0], el.children[1], ...el.children[2].children], 'open-q2', { a: 0.3, b: 0.9, stagger: 0.04, y: 14 });
    A.conceal(el, 'open-hook', { a: 0, b: 0.3, y: -12 });
  });

  K.scenes.push(function openHook(A) {
    const el = K.H('div', 'ppt-slide', null, `
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
    A.reveal([el.children[0], el.children[1], ...el.children[2].children], 'open-hook', { a: 0.3, b: 0.9, stagger: 0.04, y: 14 });
    A.conceal(el, 'arrive', { a: 0, b: 0.3, y: -12 });
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

    caption(A, 'arrive', 'flurry', {
      k: 'SA-01 Moving into the care home',
      t: 'Elena moves into the care home.',
      s: 'She is 81 and has mild Alzheimer’s disease. She knows nobody here.',
      c: `HP-01 Elena ${doi('Sury et al. (2013)', '10.1017/S1041610213000057')}`,
    });
  });

  K.scenes.push(function flurry(A) {
    const lounge = SPOTS.table;
    X.walk(X.elena, 'flurry', [[SPOTS.entrance[0], CORR_Y], [lounge[0], CORR_Y], lounge], 0, 0.3);

    const names = [['Corrie', -150, -50], ['Willem', 120, -60], ['the night nurse', -210, 30], ['Ans', 150, 40], ['Sanne', -120, 95], ['Ria', 60, 105], ['the cook', 210, -5], ['Gerrit', -40, -85]];
    const tags = names.map(([n, dx, dy], i) => {
      const t = S('text', { x: lounge[0] + dx, y: lounge[1] + dy, 'text-anchor': 'middle', class: 'st-serif', 'font-size': 36, 'font-style': 'italic', 'font-weight': 500, fill: C.ink }, K.L.top, n);
      return t;
    });
    // names arrive one after another and stay while we talk; they fade slowly as she goes to her room
    A.reveal(tags, 'flurry', { a: 0.3, b: 1, stagger: 0.07 });
    A.to(tags, 'jan', { autoAlpha: 0, stagger: 0.05 * A.dur('jan') }, 0, 0.45);
    // she ends the day in her room
    X.walk(X.elena, 'jan', [[lounge[0], CORR_Y], [X.elena.home[0], CORR_Y], X.elena.home], 0, 0.45);

    caption(A, 'flurry', 'jan', {
      k: 'PS-01 The first weeks', kc: C.alert,
      t: 'On her first day she meets everyone at once.',
      s: 'By the evening she remembers none of their names.',
      c: `PS-01 ${doi('Victor (2012)', '10.2217/ahe.12.65')}`,
    });
  });

  K.scenes.push(function jan(A) {
    A.reveal(X.jan.ring, 'jan', { a: 0.4, b: 0.7 });
    A.reveal(X.jan.halo, 'jan', { a: 0.4, b: 0.7 });
    caption(A, 'jan', 'wait', {
      k: 'SA-02 Waiting for a reason to leave the room',
      t: 'Next door, Jan has stopped coming out.',
      s: 'He ran the bakery in her town, and the people he used to talk to here have died or moved away.',
      c: `PS-02 Staying in ${doi('Jansen et al. (2017)', '10.1186/s12877-017-0430-7')}`,
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

    caption(A, 'wait', 'polite', {
      k: 'PS-03 Each waits for the other', kc: C.alert,
      t: 'They grew up in the same town without knowing it.',
      s: 'Each waits for the other to make the first move.',
      c: `HFC-16 the liking gap ${doi('Boothby et al. (2018)', '10.1177/0956797618783714')}`,
    });
  });

  K.scenes.push(function polite(A) {
    A.to([X.home.root, X.threads], 'context', { autoAlpha: 0 }, 0, 0.3);
    caption(A, 'polite', 'context', {
      k: 'PS-04 A yes to be polite', kc: C.alert,
      t: 'In the lounge, people say yes to be polite.',
      s: 'Saying no in front of others feels rude, so they agree and then avoid the room.',
      c: `HFC-17 ${doi('Bohns (2016)', '10.1177/0963721415628011')} ${doi('Mastroianni et al. (2021)', '10.1073/pnas.2011809118')}`,
    });
  });

})();
