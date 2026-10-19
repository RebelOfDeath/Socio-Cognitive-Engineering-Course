/* VII The design, VIII The prototype, IX How we will know, X Meet again */
(function () {
  'use strict';
  const { C, S, G, block, caption, say, ref, doi, SPOTS } = K;
  const X = K.ctx;

  /* ------------------------------------------------------- VII The design */
  K.scenes.push(function who(A) {
    const steps = [
      ['Coordinator', C.ink, 'approves the match', 'PR2'],
      ['Pepper', C.sys, 'asks each person alone', 'PR1', '“…or not this time?”'],
      ['Myra', C.myra, 'brings them together', ''],
      ['Pepper', C.sys, 'introduces with one shared thing, then stays silent', 'PR3'],
      ['Pepper', C.sys, 'asks “again?” privately', 'PR1'],
      ['System', C.mc, 'keeps a short record', 'PR6'],
    ];
    const el = block('abs', 120, 420, 1680, `<div class="flow">` + steps.map(([who, col, what, pr, q], i) => `
      <div class="step" style="--c:${col}"><div class="n">${i + 1}</div><div class="who">${who}</div><div class="what">${what}</div>${q ? `<div class="q">${q}</div>` : ''}${pr ? `<div class="pr">checked by ${pr}</div>` : ''}</div>`).join('') + '</div>');
    const foot = block('abs', 120, 760, 1680, `<div class="flow-foot"><b>Elena and Jan</b> decide at steps 2 and 5, and can leave at any time. Every step that could hurt someone has a person behind it.</div>`);
    const cells = [...el.querySelectorAll('.step')];
    A.reveal(cells, 'who', { a: 0.3, b: 0.95, stagger: 0.06, y: 20 });
    A.reveal(foot, 'who', { a: 0.8, b: 1 });
    A.conceal([el, foot], 'premises');
    caption(A, 'who', 'premises', {
      cls: 'wide', y: 170,
      k: 'Specification · the selected use case: UC02 Introducing two residents',
      t: 'Pepper suggests, people decide.',
      s: 'The six steps you just watched, and which Premise checks each one.',
    });
  });

  /* ------------------------------------------------------- Artifact */
  K.scenes.push(function poc(A) {
    const el = K.H('section', 'brief-slide');
    el.innerHTML = `<header><div class="kicker">Evaluation · Artifact · AT-01 proof of concept</div>
      <h2>What we built: UC02 you can talk to.</h2>
      <p class="brief-lead">A software prototype of Pepper’s side of UC02, built to run on the robot and shown here on screen. Our formative walkthrough ran on it.</p></header>
      <div class="brief-body art-grid">
        <div class="art-cols">
          <div><div class="label">Implemented</div><p>Profile items marked <b>released</b> or <b>private</b> · the coordinator’s relationship map · consent-gated pair suggestions · private “meet?” and “again?” asks · plain correction with an error flag · a short event record</p></div>
          <div><div class="label">Simulated</div><p>Pepper as an on-screen agent whose speech comes from a <b>language model</b> (standing in for TECH-18) · residents, played by role-players who speak out loud</p></div>
          <div><div class="label">Operator-controlled</div><p>The care home: the operator injects events (a refusal, a wrong profile entry, a coordinator approval). Not built: the robot and its tablet, staff phone notes, presence counts.</p></div>
        </div>
        <div class="art-shots">
          <figure><img src="img/poc/duo.png" alt=""><figcaption>Conversation view</figcaption></figure>
          <figure><img src="img/poc/people.png" alt=""><figcaption>Released profile items</figcaption></figure>
          <figure><img src="img/poc/matrix.png" alt=""><figcaption>Relationship map</figcaption></figure>
        </div>
      </div>
      <div class="brief-foot">${ref('github.com/gintskk/sce-poc', K.POC)}</div>`;
    A.reveal(el, 'poc', { a: 0.32, b: 0.95, y: 24 });
    A.conceal(el, 'demo', { a: 0, b: 0.26 });
  });

  /* The recorded demo. Drop the file at website/video/demo.mp4; until then a WIP frame shows. */
  K.scenes.push(function demo(A) {
    const el = K.H('section', 'brief-slide demo-slide');
    el.innerHTML = `<header><div class="kicker">Evaluation · Artifact · demo <span class="brief-wip">WIP</span></div>
      <h2>UC02 in the build, start to finish.</h2></header>
      <div class="demo-frame">
        <video src="video/demo.mp4" preload="metadata" playsinline controls></video>
        <div class="demo-empty"><div class="label">Recorded demo · work in progress</div>
          <p>Approved match → Elena asked alone → Jan asked alone → introduction with one shared item → silence → optional activity → private “again?” → record.</p>
          <p class="small">Place the recording at <code>website/video/demo.mp4</code>. It plays when this stop is reached.</p></div>
      </div>`;
    const video = el.querySelector('video');
    const empty = el.querySelector('.demo-empty');
    video.addEventListener('loadeddata', () => { empty.style.display = 'none'; video.style.display = 'block'; });
    video.addEventListener('click', e => e.stopPropagation());
    let was = '';
    setInterval(() => {
      const h = location.hash;
      if (h === was) return;
      was = h;
      if (h === '#demo' && video.readyState >= 2) video.play().catch(() => {});
      else if (!video.paused) video.pause();
    }, 250);
    A.reveal(el, 'demo', { a: 0.32, b: 0.95, y: 24 });
    A.conceal(el, 'formative-method', { a: 0, b: 0.26 });
  });

  K.scenes.push(function pocWrong(A) {
    const c = block('card', 1000, 260, 800, `<div class="id" style="--accent:${C.alert}">Walkthrough event · PR3</div>
      <div style="margin-top:22px" class="label">Planted in Jan’s profile</div>
      <div style="font:500 36px/1.2 var(--serif);margin:8px 0 22px;position:relative;display:table">Ran the bakery on the market square<i style="position:absolute;left:-4px;right:-4px;top:54%;height:2.5px;background:var(--alert)" class="strk"></i></div>
      <div class="line jan" style="position:relative;width:auto"><div class="who">Jan</div><div class="say">“No, it was on Church Street!”</div></div>
      <div class="line sys" style="position:relative;width:auto;margin-top:22px"><div class="who">Pepper · required within 3 s, error flagged</div><div class="say">“I had that wrong.”</div></div>
      <div class="label" style="margin-top:26px;color:var(--alert)">Result in the prototype</div>
      <div style="font:400 24px/1.4 var(--sans);margin-top:8px">Corrected within 3 s in <b class="ph">3 of 5</b> runs; the other two took about <span class="ph">4 s</span>.</div>
`);
    const strk = c.querySelector('.strk');
    gsap.set(strk, { scaleX: 0, transformOrigin: '0 50%' });
    A.reveal(c, 'poc-wrong', { a: 0.3, b: 0.8 });
    A.to(strk, 'poc-wrong', { scaleX: 1 }, 0.8, 1);
    A.conceal(c, 'formative-premises');
    caption(A, 'poc-wrong', 'formative-premises', {
      y: 250, w: 680,
      k: 'Formative walkthrough · one of the planted events', kc: C.alert,
      t: 'We plant a mistake on purpose.',
      s: 'The evaluators did not know which entry was wrong. When the role-player corrected it, the prototype had to admit it plainly and flag it for the coordinator.',
    });
  });

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
    const phases = [[-4, 0, 'Ethics, consent, baseline'], [0, 1, 'Profiles'], [1, 3, 'Matching'], [3, 4, 'Joint sessions'], [4, 5, 'Final measures']];
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
      k: 'EM-08 · ER-03 Kinnect two-site study',
      t: 'Two care homes, compared.',
      s: 'Over the same weeks, one home uses Kinnect and the other keeps its usual activities. Each home has thirty residents. A plan, not a result.',
      c: `${doi('Chenoweth et al. (2014)', '10.1017/S1041610214000398')} ${'<span class="cite">Donner and Klar (2000)</span>'}`,
    });
  });

  /* ------------------------------------------------------- X Meet again */
  K.scenes.push(function again(A) {
    A.to([X.home.root, X.threads], 'again', { autoAlpha: 1 }, 0.1, 0.5);
    A.to(X.bond, 'again', { autoAlpha: 1 }, 0.5, 0.8);
    A.to(X.home.pepper.pulse, 'again', { autoAlpha: 1 }, 0.5, 0.8);
    say(A, 'again', 'thanks', { x: 120, y: 540, w: 760, who: 'Pepper, to Elena alone', text: '“Would you like to meet Jan again?”', a: 0.4 });
    say(A, 'again', 'thanks', { cls: 'elena', x: 120, y: 645, w: 300, who: 'Elena', text: '“Yes.”', a: 0.5 });
    say(A, 'again', 'thanks', { x: 120, y: 750, w: 760, who: 'Pepper, to Jan alone', text: '“Would you like to meet Elena again?”', a: 0.6 });
    say(A, 'again', 'thanks', { cls: 'jan', x: 120, y: 855, w: 300, who: 'Jan', text: '“Yes.”', a: 0.7 });
    caption(A, 'again', 'thanks', {
      cls: 'scene', y: 230,
      k: 'OBJ-01 · the intended design outcome',
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
