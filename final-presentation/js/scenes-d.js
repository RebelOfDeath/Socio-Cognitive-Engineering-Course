/* The two videos, the planned summative test graphic, Meet again */
(function () {
  'use strict';
  const { C, S, G, block, caption, say, ref, doi, SPOTS } = K;
  const X = K.ctx;

  /* A full-stage video, played as it is. It starts when the deck settles on its stop and pauses as soon as the deck moves off it. */
  function video(A, id, out, src) {
    const el = K.H('section', 'video-slide');
    const v = document.createElement('video');
    v.src = encodeURI(src);
    v.preload = 'auto';
    v.playsInline = true;
    v.controls = true;
    el.appendChild(v);
    v.addEventListener('click', e => e.stopPropagation());
    const stop = K.STOPS.find(s => s.id === id);
    let here = false;
    setInterval(() => {
      const now = location.hash === '#' + id && Math.abs(Deck.time - stop.t) < 0.05;
      if (now === here) return;
      here = now;
      document.body.classList.toggle('on-video', here);
      if (here) v.play().catch(() => {});
      else v.pause();
    }, 200);
    A.reveal(el, id, { a: 0.32, b: 0.95, y: 0 });
    A.conceal(el, out, { a: 0, b: 0.26, y: 0 });
  }

  K.scenes.push(A => video(A, 'part2-video', 'demo-video', 'part2_3min.mp4'));
  K.scenes.push(A => video(A, 'demo-video', 'formative-claims', '2026-10-20 demos combined (faster).mp4'));

  /* --------------------------------------------- Planned summative test */
  K.scenes.push(function study(A) {
    const g = G(K.L.main);
    const homes = [
      { x: 860, label: 'HOME A  KINNECT', col: C.elena },
      { x: 1360, label: 'HOME B  USUAL ACTIVITY PROGRAMME', col: C.mc },
    ];
    const parts = [];
    homes.forEach((h, hi) => {
      const box = S('rect', { x: h.x, y: 250, width: 440, height: 270, rx: 16, fill: 'none', stroke: C.ink, 'stroke-opacity': 0.5, 'stroke-width': 1.6 }, g);
      const lab = S('text', { x: h.x, y: 232, class: 'st-mono', 'font-size': 12.5, fill: h.col, 'letter-spacing': '1.8' }, g, h.label);
      const dots = [];
      for (let i = 0; i < 30; i++) {
        const cx = h.x + 50 + (i % 10) * 38, cy = 300 + Math.floor(i / 10) * 60;
        dots.push(S('circle', { cx, cy, r: 9, fill: h.col, 'fill-opacity': hi ? 0.55 : 0.9 }, g));
      }
      parts.push({ box, lab, dots });
      A.draw(box, 'study', 0.2 + hi * 0.1, 0.6 + hi * 0.1);
      A.reveal(lab, 'study', { a: 0.3, b: 0.6 });
      A.reveal(dots, 'study', { a: 0.4 + hi * 0.05, b: 0.9, stagger: 0.008 });
    });
    // a few threads in home A, at the end of the timeline
    const pairs = [[0, 11], [3, 4], [7, 18], [12, 23], [15, 26], [20, 21]];
    const th = pairs.map(([a, b]) => {
      const A0 = parts[0].dots[a], B0 = parts[0].dots[b];
      return S('line', { x1: A0.getAttribute('cx'), y1: A0.getAttribute('cy'), x2: B0.getAttribute('cx'), y2: B0.getAttribute('cy'), stroke: C.ink, 'stroke-width': 2.4, 'stroke-linecap': 'round' }, g);
    });
    A.draw(th, 'study', 0.75, 1, { stagger: 0.02 });
    X.studyThreads = th;

    // timeline
    const T0 = 860, T1 = 1800, wk = w => T0 + (w + 4) / 9 * (T1 - T0);
    const axis = S('line', { x1: T0, y1: 660, x2: T1, y2: 660, stroke: C.ink, 'stroke-width': 2 }, g);
    A.draw(axis, 'study', 0.3, 0.8);
    const phases = [[-4, 0, 'Ethics, consent, baseline'], [0, 1, 'Profiles'], [1, 3, 'Matching'], [3, 4, 'Joint sessions (weeks 3 and 4)'], [4, 5, 'Final measures']];
    const ph = phases.map(([a, b, t], i) => {
      const pg = G(g);
      S('rect', { x: wk(a) + 2, y: 640, width: wk(b) - wk(a) - 4, height: 40, rx: 6, fill: i === 0 ? C.bg2 : C.sys, 'fill-opacity': i === 0 ? 1 : 0.12 + i * 0.06 }, pg);
      S('text', { x: wk(a) + 8, y: 712 + (i % 2) * 22, class: 'st-sans', 'font-size': 15, fill: C.ink }, pg, t);
      return pg;
    });
    const ticks = [-4, -2, 0, 1, 2, 3, 4, 5].map(w => S('text', { x: wk(w), y: 626, 'text-anchor': 'middle', class: 'st-mono', 'font-size': 12, fill: C.muted }, g, w < 0 ? '−' + -w : String(w)));
    const wlab = S('text', { x: T0, y: 600, class: 'st-mono', 'font-size': 12, fill: C.muted, 'letter-spacing': '1.8' }, g, 'WEEK');
    A.reveal([wlab, ...ticks], 'study', { a: 0.5, b: 0.9, stagger: 0.01 });
    A.reveal(ph, 'study', { a: 0.55, b: 1, stagger: 0.04 });
    A.conceal(g, 'study-method');

    caption(A, 'study', 'study-method', {
      y: 250, w: 640,
      k: 'EM-08, ER-03: Kinnect two-site study',
      t: 'Two care homes, compared.',
      s: 'Over the same weeks, one home uses Kinnect and the other keeps its usual activities. Thirty residents are recruited per home so that twenty-five complete. A plan, not a result.',
      c: `${doi('Chenoweth et al. (2014)', '10.1017/S1041610214000398')} ${'<span class="cite">Donner and Klar (2000)</span>'}`,
    });
  });

  /* ------------------------------------------------------- X Meet again */
  K.scenes.push(function again(A) {
    // While the plan is still hidden, set it as the UC02 story left it: Elena and Jan at the lounge table, joined, Pepper beside them.
    const t = SPOTS.table, eP = [t[0] - 34, t[1]], jP = [t[0] + 34, t[1]];
    A.set(X.elena.p, 'again', { x: eP[0], y: eP[1] }, 0.05);
    A.set(X.jan.p, 'again', { x: jP[0], y: jP[1] }, 0.05);
    A.set([X.gap, X.jan.ring], 'again', { autoAlpha: 0 }, 0.05);
    A.set(X.home.pepper.g, 'again', { autoAlpha: 1 }, 0.05);
    const joined = S('path', { d: `M ${eP[0]} ${eP[1]} L ${jP[0]} ${jP[1]}`, stroke: C.ink, 'stroke-width': 3, 'stroke-linecap': 'round', fill: 'none' }, X.threads);
    gsap.set(joined, { autoAlpha: 0 });
    A.set(joined, 'again', { autoAlpha: 1 }, 0.05);
    A.to([X.home.root, X.threads], 'again', { autoAlpha: 1 }, 0.1, 0.5);
    A.to(X.home.pepper.pulse, 'again', { autoAlpha: 1 }, 0.5, 0.8);
    say(A, 'again', 'thanks', { x: 120, y: 540, w: 760, who: 'Pepper, to Elena alone', text: '“Would you like to meet Jan again?”', a: 0.4 });
    say(A, 'again', 'thanks', { cls: 'elena', x: 120, y: 645, w: 300, who: 'Elena', text: '“Yes.”', a: 0.5 });
    say(A, 'again', 'thanks', { x: 120, y: 750, w: 760, who: 'Pepper, to Jan alone', text: '“Would you like to meet Elena again?”', a: 0.6 });
    say(A, 'again', 'thanks', { cls: 'jan', x: 120, y: 855, w: 300, who: 'Jan', text: '“Yes.”', a: 0.7 });
    caption(A, 'again', 'thanks', {
      cls: 'scene', y: 230,
      k: 'OBJ-01, the intended outcome',
      t: 'One person worth meeting again.',
      s: 'Not evaluation evidence: whether it happens is what the summative test will tell us.',
    });
  });

  K.scenes.push(function thanks(A) {
    A.to([X.home.root, X.threads], 'thanks', { autoAlpha: 0 }, 0, 0.3);
    const el = block('abs', 0, 0, 1920, `
      <div class="abs statement" style="left:110px;top:250px"><h1>Thank <em>you</em>.</h1></div>
      <p class="abs lede" style="left:120px;top:520px;width:900px">Questions are welcome.</p>
      <div class="abs" style="left:120px;top:640px;display:flex;gap:60px;font:400 22px/1.5 var(--sans)">
        <div><div class="label">Wiki</div>${ref('xwiki.ewi.tudelft.nl/xwiki/wiki/sce2026group04', K.WIKI)}</div>
        <div><div class="label">Proof of concept</div>${ref('github.com/gintskk/sce-poc', K.POC)}</div>
      </div>
      <div class="abs names" style="left:120px;top:860px"><span>Diana Banţă</span><span>Roham Koohestani</span><span>Gints Kuļikovskis</span><span>Antoni Nowakowski</span><span>Rayan Salmi</span></div>`);
    el.style.height = '1080px';
    A.reveal([...el.children], 'thanks', { a: 0.3, b: 1, stagger: 0.07 });
  });
})();
