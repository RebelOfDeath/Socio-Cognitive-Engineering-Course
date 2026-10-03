/* VII · The whole picture, VIII · What is still open */
(function () {
  'use strict';
  const { C, S, H, G, ln, place, block, caption, textWidth } = K;
  const X = K.ctx;

  /* ------------------------------------------------ graph, strains */
  K.scenes.push(function graph(A) {
    const COLS = [
      ['Activities', [['SA-01', 'Brushing teeth'], ['SA-03', 'Morning round'], ['SA-02', 'Medication', 'f'], ['PS-01', 'Stalls mid-task'], ['PS-02', 'Medication', 'f']]],
      ['Stakeholders', [['ST-01', 'Resident'], ['ST-02', 'Care worker'], ['ST-03', 'Family'], ['ST-04', 'Management'], ['ST-05', 'Medical staff']]],
      ['Values', [['HV-01', 'Autonomy'], ['HV-02', 'Dignity'], ['HV-03', 'Privacy'], ['HV-04', 'Competence'], ['HV-05', 'Well-being'], ['HV-06', 'Attentive care']]],
      ['Tensions', [['VT-01', 'When to help'], ['VT-02', 'Sensing'], ['VT-03', 'Time to try'], ['VT-04', 'Dignity, comp.'], ['VT-05', 'Detection'], ['VT-06', 'Med. timing', 'f'], ['VT-07', 'Staff time']]],
      ['Human factors', [['HFC-01', 'Autonomy'], ['HFC-02', 'Surveillance'], ['HFC-03', 'Adaptive help'], ['HFC-04', 'Personhood'], ['HFC-05', 'Embodiment']]],
      ['Measures', [['M-01', 'Stall detection'], ['M-02', 'Unaided steps'], ['M-03', 'Prompt level'], ['M-04', 'Distress'], ['M-05', 'Felt autonomy'], ['M-06', 'Privacy'], ['M-07', 'Staff time']]],
      ['Technology', [['TECH-01', 'Pepper'], ['TECH-02', 'Item sensors'], ['TECH-03', 'Staff phone'], ['TECH-04', 'Camera', 'f'], ['TECH-05', 'Sink device', 'f'], ['TECH-06', 'Med. tray', 'f']]],
      ['Objectives', [['OBJ-01', 'Completion'], ['OBJ-02', 'Chance to act'], ['OBJ-03', 'No distress'], ['OBJ-04', 'Not watched'], ['OBJ-05', 'Adult tone'], ['OBJ-06', 'Staff time']]],
      ['Functions', [['F1', 'Track'], ['F2', 'Prompt'], ['F3', 'Hand over'], ['F4', 'Record']]],
      ['Premises, claims', [['PR1', 'Tracking'], ['PR2', 'Prompt timing'], ['PR3', 'Handover'], ['PR4', 'Record'], ['CL1', 'Unaided steps'], ['CL2', 'Lower level'], ['CL3', 'Felt autonomy'], ['CL4', 'Wait frustrates'], ['CL5', 'Infantilising'], ['CL6', 'Fewer unfinished'], ['CL7', 'Not watched'], ['CL8', 'Record enough'], ['CL9', 'Staff time falls']]],
    ];
    const accent = {
      'ST-01': C.mary, 'ST-02': C.myra, 'SA-01': C.mary, 'PS-01': C.mary,
      'TECH-01': C.sys, 'TECH-02': C.sys, 'TECH-03': C.sys, F1: C.sys, F2: C.sys, F3: C.sys, F4: C.sys,
      CL4: C.alert, CL5: C.alert, 'VT-04': C.alert, 'VT-07': C.alert,
    };
    const x0 = 195, dx = 170, W = 154, Hh = 30, cy = 675;
    const N = {};
    const edgeG = G(K.L.main), nodeG = G(K.L.main), hiG = G(K.L.main);
    K.L.main.insertBefore(hiG, nodeG);
    const heads = [], colNodes = [];
    COLS.forEach(([name, items], c) => {
      const x = x0 + c * dx;
      heads.push(S('text', { x, y: 336, 'text-anchor': 'middle', class: 'ghead' }, nodeG, name.toUpperCase()));
      const n = items.length, sp = Math.min(62, 620 / (n - 1));
      const list = [];
      items.forEach(([id, nm, f], i) => {
        const y = cy + (i - (n - 1) / 2) * sp;
        const g = G(nodeG, { class: 'gnode' });
        S('rect', { x: x - W / 2, y: y - Hh / 2, width: W, height: Hh, rx: 7, style: accent[id] ? `stroke:${accent[id]}` : null }, g);
        const t1 = S('text', { x: x - W / 2 + 10, y: y + 4.5, class: 'gid' }, g, id);
        S('text', { x: x - W / 2 + 16 + textWidth(t1), y: y + 4.5, class: 'gnm' }, g, nm);
        N[id] = { x, y, c, g, f: !!f };
        g._f = !!f;
        list.push(g);
      });
      colNodes.push(list);
    });

    const E = [];
    const add = (a, bs, kind) => bs.split(' ').forEach(b => E.push([a, b, kind]));
    add('SA-01', 'ST-01 ST-02 PS-01'); add('SA-02', 'ST-01 PS-02'); add('SA-03', 'ST-02 PS-01 PS-02');
    add('ST-01', 'PS-01 HV-01 HV-02 HV-03 HV-04 HV-05'); add('ST-02', 'PS-01 HV-01 HV-02 HV-03 HV-04 HV-05 HV-06');
    add('ST-03', 'HV-01 HV-02 HV-03 HV-05 HV-06'); add('ST-04', 'HV-02 HV-03 HV-05 HV-06'); add('ST-05', 'HV-01 HV-03 HV-05');
    add('VT-01', 'HV-01 HV-05 CL4'); add('VT-02', 'HV-03 HV-05 CL7 CL8'); add('VT-03', 'HV-04 HV-05 CL1 CL4');
    add('VT-04', 'HV-02 HV-04 CL5'); add('VT-05', 'HV-01 HV-05 PR2 CL4'); add('VT-06', 'HV-01 HV-05'); add('VT-07', 'HV-04 HV-06 CL9');
    add('HFC-01', 'HV-01 M-05 CL3'); add('HFC-02', 'HV-03 M-06 CL7'); add('HFC-03', 'HV-04 HV-05 M-02 M-03 M-04 CL1 CL2 CL4 CL6 CL9 OBJ-03');
    add('HFC-04', 'HV-02 M-04 M-06 CL5'); add('HFC-05', 'HV-02 HV-03 M-04 M-06 CL5 CL7 TECH-01');
    add('M-01', 'PR1 PR2 PR3'); add('M-02', 'HV-01 HV-04 CL1 CL2 CL6'); add('M-03', 'HV-04 CL2 CL4'); add('M-04', 'HV-05 CL1 CL4 CL5');
    add('M-05', 'HV-01 CL3'); add('M-06', 'HV-02 HV-03 PR4 CL5 CL7 CL8'); add('M-07', 'HV-06 CL9');
    add('TECH-01', 'F2 F3'); add('TECH-02', 'F1 F4'); add('TECH-03', 'F3 F4');
    add('OBJ-01', 'SA-01 PS-01 F1 F2 F3'); add('OBJ-02', 'HV-01 HV-04 F2'); add('OBJ-03', 'F2 F3'); add('OBJ-04', 'HV-03 F1 F3 F4');
    add('OBJ-05', 'HV-02 F2'); add('OBJ-06', 'SA-03 HV-06 F3 F4');
    add('F1', 'PR1 CL7'); add('F2', 'PR2 CL1 CL2 CL3 CL4 CL5'); add('F3', 'PR3 CL6 CL9'); add('F4', 'PR4 CL8');
    const SPINE = new Set(['SA-01>PS-01', 'SA-01>ST-01', 'ST-01>PS-01', 'OBJ-01>SA-01', 'OBJ-01>PS-01', 'OBJ-01>F1', 'OBJ-01>F2', 'OBJ-01>F3',
      'TECH-01>F2', 'TECH-02>F1', 'TECH-03>F3', 'TECH-03>F4', 'F1>PR1', 'F1>CL7', 'F2>PR2', 'F2>CL1', 'F2>CL2', 'F2>CL3', 'F2>CL4', 'F2>CL5',
      'F3>PR3', 'F3>CL6', 'F3>CL9', 'F4>PR4', 'F4>CL8']);
    const STRAIN = [['TECH-01', 'VT-04'], ['TECH-01', 'VT-02'], ['TECH-02', 'VT-05'], ['TECH-03', 'VT-02'], ['TECH-04', 'VT-02']];
    const ADVERSE = [['F2', 'CL4'], ['F2', 'CL5']];

    const pathFor = (a, b) => {
      let A1 = N[a], B1 = N[b];
      if (A1.c === B1.c) {
        const xl = A1.x - W / 2;
        return `M ${xl} ${A1.y} C ${xl - 46} ${A1.y}, ${xl - 46} ${B1.y}, ${xl} ${B1.y}`;
      }
      if (A1.c > B1.c) [A1, B1] = [B1, A1];
      const xa = A1.x + W / 2, xb = B1.x - W / 2, k = Math.max(26, (xb - xa) * 0.42);
      return `M ${xa} ${A1.y} C ${xa + k} ${A1.y}, ${xb - k} ${B1.y}, ${xb} ${B1.y}`;
    };

    const base = [], spine = [];
    E.forEach(([a, b]) => {
      const sp = SPINE.has(a + '>' + b);
      const faded = N[a].f || N[b].f;
      const e = S('path', { d: pathFor(a, b), fill: 'none', stroke: sp ? C.mary : C.paper, 'stroke-width': sp ? 1.9 : 1, 'stroke-opacity': sp ? 0.85 : faded ? 0.06 : 0.17 }, edgeG);
      e._cols = Math.max(N[a].c, N[b].c);
      (sp ? spine : base).push(e);
    });
    const strain = STRAIN.map(([a, b]) => S('path', { d: pathFor(a, b), fill: 'none', stroke: C.alert, 'stroke-width': 2.4, 'stroke-dasharray': '7 5', class: 'marching' }, hiG));
    const adverse = ADVERSE.map(([a, b]) => S('path', { d: pathFor(a, b), fill: 'none', stroke: C.alert, 'stroke-width': 2.8, 'stroke-dasharray': '1.5 6', 'stroke-linecap': 'round' }, hiG));
    gsap.set([...strain, ...adverse], { autoAlpha: 0 });

    // build left to right
    colNodes.forEach((list, c) => {
      A.reveal(heads[c], 'graph', { a: 0.04 + c * 0.055, b: 0.14 + c * 0.055 });
      const faded = list.filter(g => g._f), solid = list.filter(g => !g._f);
      A.reveal(solid, 'graph', { a: 0.05 + c * 0.055, b: 0.2 + c * 0.055, stagger: 0.008 });
      if (faded.length) A.reveal(faded, 'graph', { a: 0.05 + c * 0.055, b: 0.2 + c * 0.055, alpha: 0.36 });
    });
    for (let c = 0; c < COLS.length; c++) {
      const es = base.concat(spine).filter(e => e._cols === c);
      if (es.length) A.draw(es, 'graph', 0.12 + Math.max(1, c) * 0.055, 0.36 + Math.max(1, c) * 0.055, { stagger: 0.002 });
    }
    const legend = block('abs label', 120, 985, 1700, '<span class="c-mary"><span style="display:inline-block;width:30px;height:0;border-top:2px solid var(--mary);vertical-align:middle;margin-right:10px"></span>tooth-brushing spine</span><span style="margin:0 20px">·</span>faded: rejected options and medication, deferred to a later cycle');
    A.reveal(legend, 'graph', { a: 0.8, b: 1, y: 6 });
    caption(A, 'graph', 'strains', {
      cls: 'wide', x: 120, y: 96,
      k: 'VII · The whole picture',
      t: 'Everything, in one picture.',
      b: 'Every recorded link, from what people do to the claims that would test the design. The marigold line is tooth brushing, the spine of this cycle.',
      a: 0.02,
    });

    // strains: dim everything, light the accepted costs
    const hot = new Set(['TECH-01', 'TECH-02', 'TECH-03', 'TECH-04', 'VT-02', 'VT-04', 'VT-05', 'F2', 'CL4', 'CL5']);
    const coldNodes = Object.keys(N).filter(k => !hot.has(k)).map(k => N[k].g);
    const coldSolid = coldNodes.filter(g => !g._f), coldFaded = coldNodes.filter(g => g._f);
    A.to(base, 'strains', { autoAlpha: 0.35 }, 0, 0.4);
    A.to(spine, 'strains', { autoAlpha: 0.22 }, 0, 0.4);
    A.to(coldSolid, 'strains', { autoAlpha: 0.3 }, 0, 0.4);
    A.to(coldFaded, 'strains', { autoAlpha: 0.14 }, 0, 0.4);
    A.to(N['TECH-04'].g, 'strains', { autoAlpha: 1 }, 0, 0.4);
    A.reveal(strain, 'strains', { a: 0.3, b: 0.7, stagger: 0.05 });
    A.reveal(adverse, 'strains', { a: 0.55, b: 0.9, stagger: 0.05 });
    A.conceal(legend, 'strains', { a: 0, b: 0.3 });
    const key = block('abs label', 120, 985, 1700, '<span class="c-alert"><span style="display:inline-block;width:30px;height:0;border-top:2px dashed var(--alert);vertical-align:middle;margin-right:10px"></span>strains a value tension</span><span style="margin:0 20px">·</span><span class="c-alert">· · · adverse claim</span>');
    A.reveal(key, 'strains', { a: 0.6, b: 1, y: 6 });
    caption(A, 'strains', 'nodata', {
      cls: 'wide', x: 120, y: 96,
      t: 'Costs we accepted on purpose.',
      b: 'Dashed: our technology choices strain a value tension, Pepper on dignity and privacy, the sensors on detection reliability. Dotted: the two adverse claims, the design’s own attempts to disconfirm itself.',
      a: 0.3,
    });
    A.conceal([key], 'nodata', { a: 0, b: 0.3 });
    A.conceal([edgeG, nodeG, hiG], 'nodata', { a: 0, b: 0.35 });
  });

  /* ------------------------------------------------------------ nodata */
  K.scenes.push(function nodata(A) {
    const kick = block('abs kicker', 120, 200, 900, '<span class="c-alert">VIII · What is still open</span>');
    const title = block('abs statement', 110, 250, 1150, '<h1 style="font-size:150px">No resident has<br>been asked yet.</h1>');
    const body = block('abs lede', 120, 590, 980, 'This project has collected no primary data. No resident, care worker, family member or manager has been interviewed or observed. Everything you have seen rests on published literature and our own reasoning, and every page of the wiki says so.');
    const zeros = [['residents interviewed', 230], ['care workers observed', 460], ['sessions run', 690]].map(([t, y]) =>
      block('abs zero', 1420, y, 420, `<div class="num">0</div><div class="lab">${t}</div>`));
    A.reveal([kick, title, body], 'nodata', { a: 0.35, b: 1, stagger: 0.08, y: 40 });
    A.reveal(zeros, 'nodata', { a: 0.55, b: 1, stagger: 0.1, y: 30 });
    A.conceal([kick, title, body, ...zeros], 'open', { a: 0, b: 0.3 });
  });

  /* -------------------------------------------------------------- open */
  K.scenes.push(function open(A) {
    const T = [
      ['O-20', 'The thresholds are blank.', 'Step accuracy, stall-detection latency, prompt-stop latency and handover latency cannot come from the literature for item sensors.', 'Pilot EM-01 at a mock sink, then set each limit with care-worker input.'],
      ['O-21', 'Does Pepper fit at the door?', 'Within earshot and sight of the sink, out of the wet area, and never in the resident’s way.', 'Test with the robot or a full-size mock-up. If it fails, TECH-05.'],
      ['O-22', 'Alerts need a theory.', 'Myra needs calls that are rare and meaningful, and no human-factors concept yet covers alert fatigue.', 'Add HFC-06, then agree acknowledgement, repeat and escalation rules with staff.'],
      ['UC02', 'Medication is deferred.', 'It adds a fourth sub-problem, confirmation, and would roughly double the premises and claims.', 'Write it before finalising TDP-01 and IDP-01, to check that the patterns recur.'],
    ];
    const P = [[790, 222], [1325, 222], [790, 560], [1325, 560]];
    const els = T.map((t, i) => {
      const el = block('card ticket', P[i][0], P[i][1], null, `<div class="top"><span class="id">${t[0]}</span><span class="st">Open</span></div><h3>${t[1]}</h3><p>${t[2]}</p><div class="next"><b>Next</b>${t[3]}</div>`);
      el.style.setProperty('--accent', C.alert);
      el.style.height = '316px';
      return el;
    });
    A.reveal(els, 'open', { a: 0.35, b: 1, stagger: 0.08, y: 30 });
    A.conceal(els, 'fallbacks', { a: 0, b: 0.3, stagger: 0.03 });
    caption(A, 'open', 'fallbacks', {
      t: 'Four things we still have to settle.',
      b: 'Nineteen of the twenty-two recorded open items are closed. Three still shape the design, and the medication use case is waiting its turn. Each has a concrete next step.',
      c: 'UC01 open items · TDP-01 · IDP-01',
    });
  });

  /* --------------------------------------------------------- fallbacks */
  K.scenes.push(function fallbacks(A) {
    const g = G(K.L.main);
    const root = block('tnode', 790, 500, 250, '<b>Evaluation</b>What EM-01 to EM-03 find');
    const rows = [
      ['CL4 holds', 'The wait frustrates lower-ability residents.', 'Re-specify F2', 'A per-resident wait first; then most-to-least with fading.'],
      ['CL5 or CL7 holds', 'Robot prompting feels infantilising, or tracking feels like being watched.', 'Switch embodiment', 'The tool-like sink-side device, TECH-05.'],
      ['O-21 fails', 'Pepper cannot stand safely at the doorway.', 'Switch embodiment', 'TECH-05 again: it fits inside a bathroom.'],
      ['Sensors unreliable', 'Tracking misses or invents too many stalls.', 'Revisit cameras', 'TECH-04 is the first option to reconsider, and its privacy cost would have to be argued again.'],
    ];
    const conds = [], outs = [], links = [];
    rows.forEach((r, i) => {
      const y = 222 + i * 182;
      conds.push(block('tnode cond', 1110, y, 330, `<b>${r[0]}</b>${r[1]}`));
      outs.push(block('tnode out', 1500, y, 330, `<b>${r[2]}</b>${r[3]}`));
      const cy = y + 48;
      links.push(S('path', { d: `M 1040 548 C 1075 548, 1075 ${cy}, 1106 ${cy}`, fill: 'none', stroke: C.alert, 'stroke-width': 2, 'stroke-opacity': 0.7 }, g));
      links.push(S('path', { d: `M 1440 ${cy} H 1496`, fill: 'none', stroke: C.sys, 'stroke-width': 2, 'marker-end': 'url(#arrow-sys)' }, g));
    });
    A.reveal(root, 'fallbacks', { a: 0.3, b: 0.6, y: 10 });
    A.draw(links.filter((_, i) => i % 2 === 0), 'fallbacks', 0.45, 0.8, { stagger: 0.04 });
    A.reveal(conds, 'fallbacks', { a: 0.5, b: 0.9, stagger: 0.05, x: -20, y: 0 });
    A.reveal(links.filter((_, i) => i % 2 === 1), 'fallbacks', { a: 0.7, b: 0.95 });
    A.reveal(outs, 'fallbacks', { a: 0.72, b: 1, stagger: 0.05, x: -20, y: 0 });
    A.conceal([root, ...conds, ...outs], 'close', { a: 0, b: 0.3 });
    A.conceal(g, 'close', { a: 0, b: 0.3 });
    caption(A, 'fallbacks', 'close', {
      t: 'If we are wrong, we already know what changes.',
      b: 'Each of the riskiest choices has a named test and a fallback, both written down before any data exists.',
      c: 'TECH-04 · TECH-05 · F2 · O-21',
    });
  });

  /* ------------------------------------------------------------- close */
  K.scenes.push(function close(A) {
    const R = X.RING;
    // the nine step dots come home, all completed
    X.dots.forEach((d, k) => {
      const [x, y] = X.ringPos(k);
      A.move(d.p, 'close', { x, y, s: 1.5 }, 0, 0.05);
      X.lit(k, 'close', 0, 0.05);
    });
    A.to(X.dotsG, 'close', { autoAlpha: 1 }, 0.3, 0.7);
    const full = S('circle', { cx: R.x, cy: R.y, r: 262, fill: 'none', stroke: C.sys, 'stroke-width': 3, transform: `rotate(-90 ${R.x} ${R.y})` }, K.L.bg);
    A.draw(full, 'close', 0.4, 1, { ease: 'power2.out' });
    const glow = S('circle', { cx: R.x, cy: R.y, r: 60, fill: 'url(#glow-mary)' }, K.L.bg);
    const core = S('circle', { cx: R.x, cy: R.y, r: 15, fill: C.mary, class: 'breathe' }, K.L.bg);
    A.reveal([glow, core], 'close', { a: 0.5, b: 0.9 });

    const kick = block('abs kicker', 120, 150, 1000, 'Socio-Cognitive Engineering 2026 · Group 04');
    const title = block('abs statement', 110, 238, 1150, '<h1>The <em>wait</em><br>is the design.</h1>');
    const thanks = block('abs lede', 120, 640, 800, 'Thank you. We would love your questions, especially the hard ones about CL4, CL5 and Pepper.');
    const names = block('abs names', 120, 858, 1300, 'Diana Banţă <i></i> Roham Koohestani <i></i> Gints Kuļikovskis <i></i> Antoni Nowakowski <i></i> Rayan Salmi');
    const link = block('abs label', 120, 910, 1100, '<a href="https://xwiki.ewi.tudelft.nl/xwiki/wiki/sce2026group04" target="_blank" rel="noopener" style="color:var(--sys);text-decoration:none;pointer-events:auto">xwiki.ewi.tudelft.nl/xwiki/wiki/sce2026group04</a>');
    A.reveal([kick, title, thanks, names, link], 'close', { a: 0.35, b: 1, stagger: 0.07, y: 40 });
  });
})();
