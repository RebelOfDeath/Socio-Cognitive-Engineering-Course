/* V · The pattern, VI · How we will know */
(function () {
  'use strict';
  const { C, S, H, G, ln, place, block, caption, textWidth, pair } = K;
  const X = K.ctx;

  /* ------------------------------------------------ ladder, direction */
  K.scenes.push(function ladder(A) {
    const pr = pair(A);
    const run = 200, rise = 120, x0 = 800, base = 860;
    const ty = k => base - rise * k;
    let d = `M ${x0} 900 V ${ty(0)}`;
    for (let k = 0; k < 5; k++) d += ` H ${x0 + run * (k + 1)}` + (k < 4 ? ` V ${ty(k + 1)}` : '');
    const body = S('path', { d: d + ' V 900 Z', fill: C.ink2, 'fill-opacity': 0.9 }, pr.g);
    let top = `M ${x0} ${ty(0)}`;
    for (let k = 0; k < 4; k++) top += ` H ${x0 + run * (k + 1)} V ${ty(k + 1)}`;
    const edge = S('path', ln({ d: top + ` H ${x0 + run * 4}`, stroke: C.sys, 'stroke-width': 3.5 }), pr.g);
    const last = S('path', ln({ d: `M ${x0 + run * 4} ${ty(4)} H ${x0 + run * 5}`, stroke: C.myra, 'stroke-width': 4 }), pr.g);
    const waits = [];
    for (let k = 0; k < 4; k++) {
      waits.push(S('text', { x: x0 + run * (k + 1) + 16, y: ty(k + 1) + 34, class: 'st-mono', 'font-size': 12, fill: C.muted, 'letter-spacing': '1.4' }, pr.g, k < 3 ? '↑ AFTER A WAIT' : '↑ PROMPTING EXHAUSTED'));
    }
    const levels = [
      ['Level 0', 'Silence', 'Nothing at all, while the sensors show progress.'],
      ['Level 1', 'Orient', '“Would you like some toothpaste on your brush?”'],
      ['Level 2', 'Name', '“You could brush your teeth now.”'],
      ['Level 3', 'Show', 'A picture or short video on the tablet. No miming.'],
      ['Level 4', 'Hand over', 'Myra is called with activity, step and reason.'],
    ];
    const labs = levels.map((l, k) => block('lstep' + (k === 4 ? ' myra' : ''), x0 + run * k + 12, ty(k) - 124, 180, `<div class="n">${l[0]}</div><h4>${l[1]}</h4><p>${l[2]}</p>`, pr.div));
    const skip = S('path', { d: `M ${x0 + 250} ${ty(1) - 140} C ${x0 + 330} ${ty(4) - 250}, ${x0 + 650} ${ty(4) - 300}, ${x0 + 820} ${ty(4) - 150}`, fill: 'none', stroke: C.alert, 'stroke-width': 3, 'marker-end': 'url(#arrow-alert)' }, pr.g);
    const skipLab = block('abs label c-alert', x0 + 380, ty(4) - 250, 520, 'Distress or a safety risk: straight to Myra', pr.div);

    A.reveal(body, 'ladder', { a: 0.3, b: 0.7 });
    A.draw(edge, 'ladder', 0.32, 0.85);
    A.draw(last, 'ladder', 0.8, 0.92);
    A.reveal(labs, 'ladder', { a: 0.4, b: 1, stagger: 0.08, y: 16 });
    A.reveal(waits, 'ladder', { a: 0.6, b: 1, stagger: 0.04 });
    A.reveal(skip, 'ladder', { a: 0.82, b: 0.84 });
    A.draw(skip, 'ladder', 0.82, 1);
    A.reveal(skipLab, 'ladder', { a: 0.88, b: 1, y: 8 });
    caption(A, 'ladder', 'direction', {
      k: 'V · The pattern',
      t: 'Respectful graduated prompting.',
      b: 'Silence while she progresses. After a stall, an individual wait. Then the least specific prompt that could help, one level at a time. Prompting stops the moment she resumes. The ladder is the escalation care staff already use, made systematic.',
      c: 'IDP-01 · shapes F2',
    });

    // direction: shrink ours, draw the alternative next to it
    A.move(pr.p, 'direction', { x: 400, y: 58, s: 0.5 }, 0.05, 0.6);
    A.to(labs.map(l => l.querySelector('p')).concat(waits, skipLab), 'direction', { autoAlpha: 0 }, 0, 0.25);
    const alt = G(K.L.main);
    const ax = 1340, ay = 190, ar = 100, ah = 60;
    let ad = `M ${ax} ${ay}`;
    for (let k = 0; k < 5; k++) ad += ` H ${ax + ar * (k + 1)}` + (k < 4 ? ` V ${ay + ah * (k + 1)}` : '');
    const altBody = S('path', { d: ad + ` V ${ay + 330} H ${ax} Z`, fill: C.ink2, 'fill-opacity': 0.9 }, alt);
    const altEdge = S('path', ln({ d: ad, stroke: C.muted, 'stroke-width': 3, 'stroke-opacity': 0.9 }), alt);
    const altLab = S('text', { x: ax + 10, y: ay - 18, class: 'st-mono', 'font-size': 12, fill: C.muted, 'letter-spacing': '1.4' }, alt, 'MOST HELP FIRST ↓ THEN FADE');
    A.reveal([altBody, altLab], 'direction', { a: 0.45, b: 0.8 });
    A.draw(altEdge, 'direction', 0.5, 0.9);
    const ours = block('cmp', 800, 610, 480, '<div class="lab c-sys">Ours · least to most</div><h3>Wait, then escalate.</h3><p>Keeps a real chance to act at every step. The risk is frustration while she waits.</p>');
    const theirs = block('cmp', 1340, 610, 480, '<div class="lab c-muted">Errorless learning · most to least</div><h3>Prompt early, then fade.</h3><p>Prevents the error before it happens. Most dementia daily-living research favours it, yet the largest trial found no advantage over trial-and-error learning.</p>');
    const fb = block('fallback', 800, 862, 1030, '<b>If CL4 holds</b>First make the wait per-resident. If that is not enough, switch to most-to-least with fading.');
    A.reveal([ours, theirs], 'direction', { a: 0.55, b: 1, stagger: 0.1 });
    A.reveal(fb, 'direction', { a: 0.78, b: 1 });
    caption(A, 'direction', 'tdp', {
      t: 'Which way should the ladder run?',
      b: 'Neither direction is settled by the evidence. So ours is a stated bet, with a claim designed to settle it and a fallback declared in advance.',
      c: 'O-7 · De Werd et al. (2013) · Voigt-Radloff et al. (2017)',
    });
    A.conceal([ours, theirs, fb, ...labs], 'tdp', { a: 0, b: 0.3 });
    A.conceal([pr.g, alt], 'tdp', { a: 0, b: 0.3 });
  });

  /* ------------------------------------------------------ tdp, handover */
  K.scenes.push(function tdp(A) {
    const g = G(K.L.main);
    const lanes = [
      { y: 214, h: 158, c: C.mary, lab: 'Resident<br><span style="color:var(--muted)">Mary</span>' },
      { y: 390, h: 222, c: C.sys, lab: 'System<br><span style="color:var(--muted)">Pepper, sensors, phone</span>' },
      { y: 630, h: 158, c: C.myra, lab: 'Care worker<br><span style="color:var(--muted)">Myra</span>' },
    ];
    const laneEls = [];
    lanes.forEach(l => {
      laneEls.push(S('rect', { x: 790, y: l.y, width: 1040, height: l.h, rx: 14, fill: l.c, 'fill-opacity': 0.05, stroke: l.c, 'stroke-opacity': 0.35, 'stroke-width': 1.2 }, g));
      const t = block('lane-lab', 812, l.y + 18, 170, l.lab);
      t.style.color = l.c;
      laneEls.push(t);
    });
    const bx = (x, y, w, h, color, n, t, p) => {
      const el = block('box', x, y, w, `<div class="n">${n}</div><h4>${t}</h4><p>${p}</p>`);
      el.style.height = h + 'px';
      el.style.color = color;
      return el;
    };
    const B = {
      R1: bx(1000, 240, 300, 108, C.mary, 'SA-01', 'Performs the steps', 'Initiates and carries out the steps she still can.'),
      R2: bx(1370, 240, 300, 108, C.mary, 'SA-01', 'Continues after a prompt', 'No reply to the system is ever required.'),
      F1: bx(1000, 440, 180, 116, C.sys, 'F1 · TECH-02', 'Track', 'Step and stall from item events.'),
      F2: bx(1210, 440, 180, 116, C.sys, 'F2 · TECH-01', 'Prompt', 'Graduated, following IDP-01.'),
      F3: bx(1420, 440, 180, 116, C.sys, 'F3 · TECH-03', 'Hand over', 'Only activity, step and reason.'),
      F4: bx(1630, 440, 180, 116, C.sys, 'F4 · TECH-03', 'Record', 'Three items, no trace.'),
      C1: bx(1000, 656, 300, 108, C.myra, 'SA-03', 'Runs the wider round', 'Other residents, meanwhile.'),
      C2: bx(1370, 656, 230, 108, C.myra, 'On request', 'Assesses, supports', 'Reassurance, physical help.'),
      C3: bx(1630, 656, 180, 108, C.myra, 'Afterwards', 'Handover', 'Reads the three-item record.'),
    };
    const arrows = [
      ['M 1090 348 V 436', C.mary, 'arrow-paper'],
      ['M 1180 498 H 1206', C.sys, 'arrow-sys'],
      ['M 1300 440 V 412 H 1440 V 352', C.sys, 'arrow-sys'],
      ['M 1390 498 H 1416', C.sys, 'arrow-sys'],
      ['M 1485 556 V 652', C.myra, 'arrow-myra'],
      ['M 1720 556 V 652', C.myra, 'arrow-myra'],
    ].map(([d, c, m]) => S('path', { d, fill: 'none', stroke: c, 'stroke-width': 2.2, 'marker-end': `url(#${m})` }, g));
    const alab = [
      [1100, 404, 'ITEM EVENTS'], [1452, 404, 'PROMPT'], [1494, 626, 'REQUEST'], [1730, 626, 'RECORD'],
    ].map(([x, y, t]) => S('text', { x, y, class: 'st-mono', 'font-size': 11, fill: C.muted, 'letter-spacing': '1.4' }, g, t));
    const trigLab = block('abs label', 790, 812, 400, 'F3 hands over when');
    const chipRow = block('abs chips', 790, 840, 1040, ['Prompting is exhausted', 'Task state is uncertain', 'Stress or confusion appears', 'Physical or safety help is needed'].map(t => `<span class="chip">${t}</span>`).join(''));
    const chips = [...chipRow.children];

    A.reveal(laneEls, 'tdp', { a: 0.3, b: 0.7, stagger: 0.04, y: 10 });
    A.reveal(Object.values(B), 'tdp', { a: 0.4, b: 0.9, stagger: 0.03, y: 14 });
    A.reveal([...arrows, ...alab], 'tdp', { a: 0.6, b: 0.95 });
    A.reveal([trigLab, ...chips], 'tdp', { a: 0.75, b: 1, stagger: 0.03, y: 10 });
    caption(A, 'tdp', 'handover', {
      k: 'TDP-01', kc: C.myra,
      t: 'Who does what.',
      b: 'Mary stays the one doing the activity. The system tracks, prompts, hands over and records. Myra runs the wider round and steps in only on one of four conditions.',
      c: 'TDP-01 · graduated activity support with human handover',
    });

    // handover: the two failure paths
    const dim = ['R2', 'F2', 'F4', 'C1', 'C3'].map(k => B[k]);
    A.to(dim, 'handover', { autoAlpha: 0.28 }, 0, 0.4);
    A.to([...arrows, ...alab], 'handover', { autoAlpha: 0.2 }, 0, 0.4);
    A.conceal([trigLab, ...chips], 'handover', { a: 0, b: 0.3 });
    const p1 = S('path', { d: 'M 1090 556 V 594 H 1336 V 706 H 1366', fill: 'none', stroke: C.alert, 'stroke-width': 3, 'stroke-dasharray': '8 7', class: 'marching', 'marker-end': 'url(#arrow-alert)' }, g);
    const p2 = S('path', { d: 'M 1300 294 H 1330 V 422 H 1510 V 436', fill: 'none', stroke: C.alert, 'stroke-width': 3, 'stroke-dasharray': '8 7', class: 'marching', 'marker-end': 'url(#arrow-alert)' }, g);
    const l1 = block('path-lab', 790, 812, 500, '<b>Tracking lost</b>The system reports a degraded state, and the morning falls back on the workarounds staff already use.');
    const l2 = block('path-lab', 1330, 812, 500, '<b>No change, no response</b>Myra is called at once, ahead of any pending prompt. The sensors cannot see a fall, so this is a conservative inference.');
    A.reveal([p1, p2], 'handover', { a: 0.4, b: 0.8, stagger: 0.15 });
    A.reveal([l1, l2], 'handover', { a: 0.5, b: 1, stagger: 0.12, y: 12 });
    caption(A, 'handover', 'objectives', {
      t: 'When it fails, it says so.',
      b: 'Neither failure is silent. A broken tracker reports itself, and a resident who stops responding pre-empts every prompt still waiting in the queue.',
      c: 'UC01 exceptions · PR1 · PR3',
    });
    A.conceal([...laneEls.filter(e => !(e instanceof SVGElement)), ...Object.values(B), l1, l2], 'objectives', { a: 0, b: 0.3 });
    A.conceal(g, 'objectives', { a: 0, b: 0.3 });
  });

  /* -------------------------------------------------------- objectives */
  K.scenes.push(function objectives(A) {
    const O = [
      ['OBJ-01', 'must', 'Completion without care-worker prompting carrying it', 'from SA-01 goal · PS-01'],
      ['OBJ-02', 'must', 'A genuine chance to act before help arrives', 'from HV-01, HV-04'],
      ['OBJ-03', 'must', 'Difficulty resolved where it appears, before distress', 'from HFC-03'],
      ['OBJ-04', 'should', 'Support without the feeling of being watched', 'from HV-03'],
      ['OBJ-05', 'should', 'Prompting that does not talk down', 'from HV-02'],
      ['OBJ-06', 'should', 'Myra’s time goes where it is needed', 'from SA-03 goal · HV-06'],
    ];
    const rows = O.map((o, i) => block('orow', 790, 232 + i * 104, null,
      `<div class="hl"></div><div class="oid">${o[0]}</div><div><span class="pri ${o[1]}">${o[1]}</span></div><div class="ot">${o[2]}</div><div class="os">${o[3]}</div>`));
    A.reveal(rows, 'objectives', { a: 0.3, b: 1, stagger: 0.06, y: 20 });
    A.to(rows[1].querySelector('.hl'), 'objectives', { autoAlpha: 1 }, 0.85, 1);
    A.conceal(rows, 'claims', { a: 0, b: 0.3, stagger: 0.02 });
    caption(A, 'objectives', 'claims', {
      k: 'VI · How we will know',
      t: 'Six objectives, each traced to its source.',
      b: 'Objective 2 keeps the design honest. Without it, completion could be reached by a system that narrates every step, which is the existing workaround the problem scenario identifies as the problem.',
      c: 'OBJ-01 to OBJ-06 · MoSCoW priority',
    });
  });

  /* ------------------------------------------------------ claims, risky */
  K.scenes.push(function claims(A) {
    const CL = [
      ['CL1', 'F2', 'More steps completed with no prompt at all'],
      ['CL2', 'F2', 'Stalls resolved at a lower level of help'],
      ['CL3', 'F2', 'A felt sense of doing it herself'],
      ['CL4', 'F2', 'The wait frustrates residents below a step’s demand', true],
      ['CL5', 'F2', 'Being prompted by a robot feels infantilising', true],
      ['CL6', 'F3', 'Fewer sessions end unfinished'],
      ['CL7', 'F1', 'Tracking is not felt as being watched'],
      ['CL8', 'F4', 'The record is enough, and proportionate'],
      ['CL9', 'F3', 'Less prompting time for Myra'],
    ];
    const gx = [790, 1060, 1330], gy = [235, 425, 615];
    const slot = i => [gx[i % 3], gy[Math.floor(i / 3)]];
    const posOrder = ['CL1', 'CL2', 'CL3', 'CL6', 'CL7', 'CL8', 'CL9'];
    const cards = CL.map((c, i) => {
      const [x, y] = slot(i);
      const el = block('card ccard' + (c[3] ? ' adverse' : ''), x, y, null,
        `<div class="row"><span class="id">${c[0]}${c[3] ? ' · adverse' : ''}</span><span class="fn">${c[1]}</span></div><p>${c[2]}</p>`);
      el.style.setProperty('--accent', c[3] ? C.alert : C.sys);
      let tx, ty;
      if (c[3]) { tx = 1600; ty = c[0] === 'CL4' ? 235 : 425; }
      else { [tx, ty] = slot(posOrder.indexOf(c[0])); }
      return { el, dx: tx - x, dy: ty - y, id: c[0] };
    });
    A.reveal(cards.map(c => c.el), 'claims', { a: 0.3, b: 0.6, stagger: 0.025, y: 24 });
    cards.forEach(c => { if (c.dx || c.dy) A.to(c.el, 'claims', { x: c.dx, y: c.dy, ease: 'power3.inOut' }, 0.64, 0.94); });
    const h1 = block('abs col-head c-sys', 790, 200, 400, 'Positive · 7');
    const h2 = block('abs col-head c-alert', 1600, 200, 300, 'Adverse · 2');
    A.reveal([h1, h2], 'claims', { a: 0.88, b: 1, y: 8 });
    A.conceal(cards.map(c => c.el).concat(h1, h2), 'risky', { a: 0, b: 0.3, stagger: 0.015 });
    caption(A, 'claims', 'risky', {
      t: 'Nine claims. Two are written to prove us wrong.',
      b: 'Seven predict that the design works. Two, CL4 and CL5, predict specific ways it could fail, and each comes with a consequence we committed to in advance.',
      c: 'UC01 · CL1 to CL9',
    });

    const big = [
      ['CL4', 'Adverse', C.alert, 'The deliberate wait frustrates residents whose ability is below a step’s demand.',
        'Observed distress rises above baseline for the lower-ability subgroup, while their independent completion does not improve.',
        'The wait becomes per-resident. If that is not enough, prompt early and fade.'],
      ['CL5', 'Adverse', C.alert, 'Being prompted through tooth brushing by a robot feels infantilising, whatever it does for completion.',
        'Residents or staff describe the prompting as talking down or child-like, or distress rises while prompting.',
        'Switch to the sink-side device. A negative result on one embodiment does not clear the other.'],
      ['CL9', 'Most at risk', C.sys, 'The system reduces Myra’s prompting time per resident.',
        'Prompting time falls and completion is no worse. Time saved by letting sessions go unfinished does not count.',
        'Rogers et al. found graduated prompting took more caregiver time. Absorbing that time is the premise of the project.'],
    ];
    const bigs = big.map((b, i) => {
      const el = block('card bigcard', 790 + i * 350, 222, 330, `<span class="tag" style="color:${b[2]}">${b[0]} · ${b[1]}</span><h3>${b[3]}</h3><div class="lab">Holds if</div><p>${b[4]}</p><div class="lab">${i < 2 ? 'Then' : 'Why it matters'}</div><p>${b[5]}</p>`);
      el.style.setProperty('--accent', b[2]);
      return el;
    });
    A.reveal(bigs, 'risky', { a: 0.32, b: 1, stagger: 0.1, y: 40 });
    A.conceal(bigs, 'measures', { a: 0, b: 0.3, stagger: 0.03 });
    caption(A, 'risky', 'measures', {
      t: 'Where the design is most exposed.',
      b: 'The criteria are conjunctive where they need to be, so an easy win cannot count as success.',
      c: 'CL4 · CL5 · CL9 · validation criteria',
    });
  });

  /* ------------------------------------------------ measures, evaluation */
  K.scenes.push(function measures(A) {
    const g = G(K.L.main);
    const dots = [];
    for (let k = 0; k < 9; k++) {
      const c = S('circle', { cx: 812 + k * 62, cy: 300, r: 22, fill: 'none', stroke: C.mary, 'stroke-width': 2.4 }, g);
      S('text', { x: 812 + k * 62, y: 305, 'text-anchor': 'middle', class: 'st-mono', 'font-size': 12, fill: C.mary }, g, k + 1);
      dots.push(c);
    }
    const nine = S('text', { x: 1380, y: 330, class: 'st-serif', 'font-size': 96, fill: C.paper }, g, '/ 9');
    const mh = block('abs label', 790, 222, 700, '<span class="c-mary">M-02 · primary outcome · independent step completion</span>');
    const mp = block('abs', 790, 342, 900, '<p style="margin:0;font:400 19px/1.45 var(--sans);color:var(--paper-2)">One point for each step completed with no prompt and no human help, summed per session, against the resident’s own baseline.</p>');
    const rowsData = [
      ['M-01', 'Tracking and stall detection', 'Staged events at a mock sink against a timestamped log', 'PR1 to PR3'],
      ['M-03', 'Prompt level required', 'Five-level coding, from none to care-worker takeover', 'CL2 · CL4'],
      ['M-04', 'Distress and resistance', 'Resistiveness to Care Scale, 13 behaviours, 0 to 156', 'CL1 · CL4 · CL5'],
      ['M-05', 'Felt autonomy', 'Self-report and observer rating, reported apart, never combined', 'CL3'],
      ['M-06', 'Perceived privacy', 'Interviews coded: watches, records, talks down, neutral', 'PR4 · CL5 · CL7 · CL8'],
      ['M-07', 'Care-worker prompting load', 'Time-sampled observation against baseline', 'CL9'],
    ];
    const rows = rowsData.map((r, i) => block('mrow', 790, 420 + i * 72, null, `<div class="mid">${r[0]}</div><div class="mt">${r[1]}</div><div class="mh">${r[2]}</div><div class="mc">${r[3]}</div>`));
    const foot = block('abs label', 790, 870, 1040, 'Every observer-coded measure: at least 20% of sessions double-coded, agreement of .60 or higher');
    A.reveal([mh, g, mp], 'measures', { a: 0.3, b: 0.8, stagger: 0.06 });
    A.reveal(rows, 'measures', { a: 0.45, b: 1, stagger: 0.05, y: 14 });
    A.reveal(foot, 'measures', { a: 0.85, b: 1, y: 8 });
    A.conceal([mh, mp, ...rows, foot], 'evaluation', { a: 0, b: 0.3 });
    A.conceal(g, 'evaluation', { a: 0, b: 0.3 });
    caption(A, 'measures', 'evaluation', {
      t: 'Seven measures, fixed before the claims.',
      b: 'The primary outcome comes straight from COACH, the closest published precedent, which prompted older adults with dementia through handwashing.',
      c: 'M-01 to M-07 · Mihailidis et al. (2008)',
    });

    // evaluation plan
    const eg = G(K.L.main);
    const track = S('path', ln({ d: 'M 900 300 H 1700', stroke: C.sys, 'stroke-width': 2, 'stroke-opacity': 0.6 }), eg);
    const st = [960, 1320, 1680].map((x, i) => {
      const sg = G(eg);
      S('circle', { cx: x, cy: 300, r: 30, fill: C.ink, stroke: C.sys, 'stroke-width': 3 }, sg);
      S('text', { x, y: 306, 'text-anchor': 'middle', class: 'st-mono', 'font-size': 17, fill: C.paper }, sg, i + 1);
      return sg;
    });
    const stations = [
      block('station', 800, 370, 330, '<div class="num">EM-01</div><h3>Staged sessions at a mock sink</h3><p>Scripted steps, stalls, resumptions and confounders against a timestamped log. No human subjects.</p><div class="lab">Verifies</div><div class="v">PR1 to PR4</div><div class="lab">Also</div><div class="v">Sets the thresholds that are still blank</div>'),
      block('station', 1160, 370, 330, '<div class="num">EM-02</div><h3>Within-resident baseline</h3><p>The real morning routine, in alternating phases without and with the system. Each resident is their own baseline.</p><div class="abab"><span>without</span><span class="on">with</span><span>without</span><span class="on">with</span></div><div class="lab">Validates</div><div class="v">CL1 to CL7, CL9</div>'),
      block('station', 1520, 370, 320, '<div class="num">EM-03</div><h3>Care-staff interviews</h3><p>Is the record useful? Does the system intrude, on residents or on staff?</p><div class="lab">Validates</div><div class="v">CL5, CL7, CL8, CL9</div><div class="lab">Limit</div><div class="v">Reports how staff read the resident’s experience</div>'),
    ];
    A.draw(track, 'evaluation', 0.3, 0.8);
    A.reveal(st, 'evaluation', { a: 0.35, b: 0.85, stagger: 0.1 });
    A.reveal(stations, 'evaluation', { a: 0.45, b: 1, stagger: 0.1, y: 20 });
    A.conceal(stations, 'graph', { a: 0, b: 0.2 });
    A.conceal(eg, 'graph', { a: 0, b: 0.2 });
    caption(A, 'evaluation', 'graph', {
      t: 'Three evaluations, cheapest first.',
      b: 'Verify the machine before asking anything of a person. Only then do we go into a care home, which needs access, ethics approval, supported consent and trained observers.',
      c: 'EM-01 to EM-03',
    });
  });
})();
