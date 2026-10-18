/* VII The design, VIII The prototype, IX How we will know, X Meet again */
(function () {
  'use strict';
  const { C, S, G, block, caption, say, ref, doi, SPOTS } = K;
  const X = K.ctx;

  /* ------------------------------------------------------- VII The design */
  K.scenes.push(function who(A) {
    const cols = [
      ['Elena and Jan', C.elena, ['give consent', 'choose what is shared']],
      ['The coordinator', C.ink, ['approves matches', 'keeps the map']],
      ['Myra', C.myra, ['brings them together', 'painful questions']],
      ['Pepper', C.sys, ['suggests and asks', 'introduces, then stays silent']],
    ];
    const els = cols.map(([t, col, items], i) => block('abs', 120 + i * 425, 450, 395, `
      <div class="label">${['ST-01, ST-02', 'ST-05', 'ST-04', 'RP-01'][i]}</div>
      <div style="font:500 54px/1 var(--serif);color:${col};margin:14px 0 22px">${t}</div>` + items.map(s => `<div style="font:italic 500 32px/1.2 var(--serif);color:var(--ink-2);padding:10px 0;border-top:1px solid var(--line)">${s}</div>`).join('')));
    A.reveal(els, 'who', { a: 0.3, b: 1, stagger: 0.06 });
    A.conceal(els, 'patterns');
    caption(A, 'who', 'patterns', {
      cls: 'wide', y: 200,
      k: 'c Team design pattern',
      t: 'The System suggests, and people decide.',
      s: 'Every step that could hurt someone has a named person behind it.',
    });
  });

  K.scenes.push(function patterns(A) {
    const P = [
      ['IDP-02', 'Ask first', 'Ask the person alone, beforehand, with two options. A no is final: no reasons asked, no reminders, no tallies.', '“Would you like to meet him, or not this time?”', doi('Black et al. 2010', '10.1097/JGP.0b013e3181bd1de2')],
      ['IDP-03', 'Truthful deferral', 'The trusted person is alerted. The question gets no answer and no denial, and Pepper does not raise it again.', '“That’s one for Myra. Shall I ask her to come?”', '<span class="cite">Mental Health Foundation 2016</span>'],
      ['IDP-01', 'Wait, then redirect gently', 'After a mid-sentence stop, wait about eight seconds. Then offer a way back, as a statement to both people.', '“Elena was telling you about the town.”', doi('Orange et al. 1996', '10.1044/jshr.3904.881')],
    ];
    const els = P.map(([id, t, p, q, r], i) => block('abs', 120 + i * 570, 450, 530, `
      <div class="label">${id}</div><div style="font:500 54px/1 var(--serif);margin:14px 0 22px;color:var(--elena)">${t}</div>
      <div style="font:italic 500 40px/1.15 var(--serif);color:var(--sys)">${q}</div>
      <div class="label" style="margin-top:22px;text-transform:none;letter-spacing:.02em;font-size:15px">${r}</div>`));
    A.reveal(els, 'patterns', { a: 0.3, b: 1, stagger: 0.06 });
    A.conceal(els, 'never');
    caption(A, 'patterns', 'never', {
      cls: 'wide', y: 200,
      k: 'd Interaction design patterns',
      t: 'How Pepper speaks.',
      s: 'Short adult sentences, built on the same three patterns every time.',
    });
  });

  K.scenes.push(function never(A) {
    const items = ['Ask “Do you remember Jan?”', 'Tell anyone who said no', 'Make up a sentence about someone’s life', 'Keep audio or transcripts', 'Tell a kind lie', 'Remark on a forgotten name', 'Pretend to be a person', 'Stand in for a friend'];
    const cols = [block('never', 900, 230, 900,
      '<div class="lab">Pepper never</div>' + items.map(t => `<div class="it" style="margin-bottom:8px;white-space:nowrap;font-size:40px">${t}<i></i></div>`).join(''))];
    const its = cols.flatMap(c => [...c.querySelectorAll('.it')]);
    const strikes = cols.flatMap(c => [...c.querySelectorAll('.it i')]);
    gsap.set(strikes, { scaleX: 0 });
    A.reveal(its, 'never', { a: 0.25, b: 0.75, stagger: 0.03 });
    A.reveal(cols.map(c => c.querySelector('.lab')), 'never', { a: 0.2, b: 0.5 });
    A.to(strikes, 'never', { scaleX: 1, stagger: 0.03 * A.dur('never') }, 0.55, 0.75);
    A.conceal(cols, 'claims');
    caption(A, 'never', 'claims', {
      y: 280, w: 620,
      k: 'Objectives OBJ-04 to OBJ-07', kc: C.alert,
      t: 'What Pepper never does.',
      s: 'These rules come from our objectives on deception and dignity.',
      c: `${doi('Wang et al. (2026)', '10.1007/s12369-026-01422-x')} ${doi('James et al. (2006)', '10.1002/gps.1551')}`,
    });
  });

  K.scenes.push(function claims(A) {
    // What we predict the design does, and how it could backfire. The evaluation tests both.
    const pos = [
      ['CL1', 'Residents introduced this way meet again, and become friends', 'main claim'],
      ['CL2', 'A newcomer has someone to talk to within six weeks'],
      ['CL6', 'Meetings they agreed to actually happen'],
      ['CL8', 'Handing painful questions to Myra keeps their trust'],
      ['CL9', 'They feel less lonely', 'exploratory'],
    ];
    const adv = [
      ['CL3', 'They say yes to be polite, then avoid each other', 'Pepper only suggests when asked'],
      ['CL4', 'Matching on their life story feels exposing', 'match on places and interests only'],
      ['CL5', 'Repeating both names feels patronising', 'names only on request'],
      ['CL7', 'Notes on time in their room feel like watching', 'drop the notes'],
    ];
    const L = block('rowlist', 120, 480, 820, '<div class="label" style="margin-bottom:12px;color:var(--jan)">If it works</div>' +
      pos.map(([i, t, tag]) => `<div class="r"><div class="i" style="color:var(--jan)">${i}</div><div class="t" style="font-size:32px">${t}${tag ? ` <span class="tag" style="color:var(--jan);vertical-align:middle;font-size:11px">${tag}</span>` : ''}</div></div>`).join(''));
    const R = block('rowlist', 1000, 480, 800, '<div class="label" style="margin-bottom:12px;color:var(--alert)">If it backfires, we change it</div>' +
      adv.map(([i, t, f]) => `<div class="r adverse"><div class="i">${i}</div><div class="t" style="font-size:32px">${t}<small style="font-size:18px;color:var(--ink)">→ ${f}</small></div></div>`).join(''));
    A.reveal([...L.children], 'claims', { a: 0.3, b: 0.9, stagger: 0.03 });
    A.reveal([...R.children], 'claims', { a: 0.45, b: 1, stagger: 0.04 });
    A.conceal([L, R], 'poc');
    caption(A, 'claims', 'poc', {
      cls: 'wide', y: 200,
      k: 'b Use cases with claims',
      t: 'What we expect, and how it could backfire.',
      s: 'Each claim is a prediction the evaluation tests. Adverse claims come with a planned change.',
    });
  });

  /* ---------------------------------------------------- VIII The prototype */
  function shot(A, inId, outId, src, x, y, w, cap) {
    const el = block('shot', x, y, w, `<img src="${src}" alt="">`);
    A.reveal(el, inId, { a: 0.3, b: 0.9, y: 40 });
    if (outId) A.conceal(el, outId);
    if (cap) {
      const c = block('shot-cap', x, 0, w, cap);
      c.style.top = 'auto';
      c.style.bottom = (1080 - y + 16) + 'px';
      A.reveal(c, inId, { a: 0.5, b: 1, y: 8 });
      if (outId) A.conceal(c, outId);
    }
    return el;
  }

  K.scenes.push(function poc(A) {
    shot(A, 'poc', 'poc-people', 'img/poc/duo.png', 860, 250, 960, 'What the participant sees, and the conversation as it happens');
    caption(A, 'poc', 'poc-people', {
      y: 250, w: 640,
      k: 'AT-01 Proof of concept',
      t: 'A live walkthrough you can talk to.',
      s: 'Role-players speak as the residents, and an operator plays the care home.',
      c: `${ref('gintskk/sce-poc on GitHub', K.POC)}`,
    });
  });

  K.scenes.push(function pocPeople(A) {
    shot(A, 'poc-people', 'poc-map', 'img/poc/people.png', 1100, 240, 520, 'Residents in the walkthrough, with stand-in portraits');
    caption(A, 'poc-people', 'poc-map', {
      y: 250, w: 640,
      k: 'UC01 step 2, in the prototype',
      t: 'Getting to know someone.',
      s: 'Pepper asks what a resident likes to talk about and whom they would like to meet.',
    });
  });

  K.scenes.push(function pocMap(A) {
    shot(A, 'poc-map', 'poc-wrong', 'img/poc/matrix.png', 1060, 250, 660, 'Connections view: the coordinator’s relationship map');
    caption(A, 'poc-map', 'poc-wrong', {
      y: 250, w: 680,
      k: 'TECH-05 Consent-gated matching',
      t: 'The relationship map.',
      s: 'The coordinator sees which pairs may be offered, and Pepper offers only those.',
    });
  });

  K.scenes.push(function pocWrong(A) {
    const c = block('card', 1000, 260, 800, `<div class="id" style="--accent:${C.alert}">SV-01 Staged verification</div>
      <div style="margin-top:22px" class="label">Planted in Jan’s profile</div>
      <div style="font:500 36px/1.2 var(--serif);margin:8px 0 22px;position:relative;display:table">Ran the bakery on the market square<i style="position:absolute;left:-4px;right:-4px;top:54%;height:2.5px;background:var(--alert)" class="strk"></i></div>
      <div class="line jan" style="position:relative;width:auto"><div class="who">Jan</div><div class="say">“No, it was on Church Street!”</div></div>
      <div class="line sys" style="position:relative;width:auto;margin-top:22px"><div class="who">Pepper</div><div class="say">“I had that wrong.”</div></div>
`);
    const strk = c.querySelector('.strk');
    gsap.set(strk, { scaleX: 0, transformOrigin: '0 50%' });
    A.reveal(c, 'poc-wrong', { a: 0.3, b: 0.8 });
    A.to(strk, 'poc-wrong', { scaleX: 1 }, 0.8, 1);
    A.conceal(c, 'verify');
    caption(A, 'poc-wrong', 'verify', {
      y: 250, w: 680,
      k: 'Testing the prototype', kc: C.alert,
      t: 'We plant a mistake on purpose.',
      s: 'One profile entry is wrong, and Pepper has to correct itself when the resident says so.',
    });
  });

  /* ------------------------------------------------- IX How we will know */
  K.scenes.push(function verify(A) {
    // Premises: does the System do what we specified? Staged with role-players, before any resident takes part.
    const T = [
      ['UC02-F1-PR1', 'We stage fifty refusals.', 'None of them reaches the other resident.'],
      ['UC02-F3-PR3', 'We stage twenty introductions.', 'Every name is said as a statement. Never “Do you remember…?”'],
      ['UC01-F4-PR4', 'We ask twenty painful questions.', 'Myra knows within ten seconds. Pepper never answers them itself.'],
      ['UC02-F6-PR6', 'We watch the network and the disk.', 'Nothing leaves the home. No audio is stored.'],
    ];
    const el = block('rowlist', 120, 470, 1680, '<div class="r" style="grid-template-columns:200px 640px 1fr;border-top:0"><div></div><div class="label">The test</div><div class="label" style="color:var(--jan)">It passes if</div></div>' +
      T.map(([id, t, p]) => `<div class="r" style="grid-template-columns:200px 640px 1fr;align-items:baseline"><div class="i" style="color:var(--elena)">${id}</div><div class="t">${t}</div><div class="t" style="color:var(--ink-2)">${p}</div></div>`).join(''));
    A.reveal([...el.children], 'verify', { a: 0.3, b: 1, stagger: 0.06 });
    A.conceal(el, 'study');
    caption(A, 'verify', 'study', {
      cls: 'wide', y: 200,
      k: 'EM-01 Premises, checked with role-players',
      t: 'First: does it do what we built?',
      s: 'We check these with role-players, before any resident takes part.',
      c: doi('Mihailidis et al. (2008), staged-event protocol', '10.1186/1471-2318-8-28'),
    });
  });

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
    A.conceal(g, 'measures');

    caption(A, 'study', 'measures', {
      y: 250, w: 640,
      k: 'EM-08 ER-03 Kinnect two-site study',
      t: 'Two care homes, compared.',
      s: 'Over the same weeks, one home uses Kinnect and the other keeps its usual activities. Each home has thirty residents.',
      c: `${doi('Chenoweth et al. (2014)', '10.1017/S1041610214000398')} ${'<span class="cite">Donner and Klar (2000)</span>'}`,
    });
  });

  K.scenes.push(function measures(A) {
    const rows = [
      ['Primary', 'Joint social time', `Two residents within 2 m of each other for at least five minutes, from location badges. Weeks 4 to 5 against baseline. M-21 ${doi('Grigorovich et al. 2021', '10.2196/22831')}`],
      ['Secondary', 'Real conversations, time alone in the bedroom', `Interactions confirmed by room scans; bedroom share of the day. M-21, M-23 ${doi('Jansen et al. 2017', '10.1186/s12877-017-0430-7')}`],
      ['Harm check', 'Agitation', `CMAI at baseline and week 5. M-20 ${doi('Cohen-Mansfield et al. 1989', '10.1093/geronj/44.3.m77')}`],
      ['Second claim', 'First-time use', 'At least 18 of 25 residents understand Pepper and complete the steps by the end of week 1. M-24'],
    ];
    const el = block('rowlist', 900, 280, 900, rows.map(([i, t, s]) => `<div class="r" style="grid-template-columns:170px 1fr"><div class="i" style="color:var(--elena)">${i}</div><div class="t">${t}<small>${s.replace(/^.*?(M-\d.*)$/, '$1')}</small></div></div>`).join(''));
    A.reveal([...el.children], 'measures', { a: 0.3, b: 1, stagger: 0.05 });
    A.conceal(el, 'again');
    caption(A, 'measures', 'again', {
      y: 250, w: 640,
      k: 'b4 Measures',
      t: 'Time spent together.',
      s: 'Our main outcome is how much time residents spend with each other. We also look at time alone in the bedroom and at signs of agitation.',
      c: doi('McCambridge et al. (2014), Hawthorne effects', '10.1016/j.jclinepi.2013.08.015'),
    });
  });

  /* ------------------------------------------------------- X Meet again */
  K.scenes.push(function again(A) {
    A.to([X.home.root, X.threads], 'again', { autoAlpha: 1 }, 0.1, 0.5);
    A.to(X.bond, 'again', { autoAlpha: 1 }, 0.5, 0.8);
    A.to(X.home.pepper.pulse, 'again', { autoAlpha: 1 }, 0.5, 0.8);
    say(A, 'again', 'thanks', { x: 120, y: 470, w: 760, who: 'Pepper, to Elena alone', text: '“Would you like to meet Jan again?”', a: 0.4 });
    say(A, 'again', 'thanks', { cls: 'elena', x: 120, y: 590, w: 300, who: 'Elena', text: '“Yes.”', a: 0.5 });
    say(A, 'again', 'thanks', { x: 120, y: 700, w: 760, who: 'Pepper, to Jan alone', text: '“Would you like to meet Elena again?”', a: 0.6 });
    say(A, 'again', 'thanks', { cls: 'jan', x: 120, y: 820, w: 300, who: 'Jan', text: '“Yes.”', a: 0.7 });
    caption(A, 'again', 'thanks', {
      cls: 'scene', y: 230,
      k: 'OBJ-01 Residents meet again',
      t: 'One person worth meeting again.',
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
