/* III What matters, IV What we know, V The technology */
(function () {
  'use strict';
  const { C, block, caption, doi } = K;

  /* ----------------------------------------------------- III What matters */
  K.scenes.push(function stakeholders(A) {
    const rows = [
      ['ST-01', 'Resident with dementia', 'direct'],
      ['ST-02', 'Fellow resident', 'direct'],
      ['ST-04', 'Care worker', 'direct'],
      ['ST-05', 'Activity coordinator', 'direct'],
      ['ST-03', 'Relative', 'indirect'],
      ['ST-06', 'Medical and therapy staff', 'indirect'],
      ['ST-07', 'Care home management', 'indirect'],
    ];
    const el = block('rowlist', 900, 230, 900, rows.map(([i, t, kind]) =>
      `<div class="r" style="grid-template-columns:100px 1fr 120px;align-items:center"><div class="i" style="color:var(--elena)">${i}</div><div class="t">${t}</div><div><span class="tag" style="color:${kind === 'direct' ? C.ink : C.muted}">${kind}</span></div></div>`).join(''));
    A.reveal([...el.children], 'stakeholders', { a: 0.3, b: 1, stagger: 0.06 });
    A.conceal(el, 'values');
    caption(A, 'stakeholders', 'values', {
      y: 320, w: 640,
      k: 'a2 Stakeholders',
      t: 'Seven stakeholders.',
      s: 'Four of them take part directly when someone new moves in. The activity coordinator approves every match.',
    });
  });

  K.scenes.push(function values(A) {
    const V = [
      ['HV-01', 'Autonomy'], ['HV-02', 'Dignity'], ['HV-03', 'Privacy'], ['HV-04', 'Safety'],
      ['HV-05', 'Well-being'], ['HV-06', 'Social connectedness', true], ['HV-07', 'Identity'], ['HV-08', 'Truthfulness'],
    ];
    const cells = V.map(([id, n, lead], i) => block('abs', 820 + (i % 4) * 255, 330 + Math.floor(i / 4) * 230, 240, `
        <div class="label" style="color:${lead ? C.elena : C.muted}">${id}</div>
        <div style="font:500 ${lead ? 44 : 46}px/1 var(--serif);margin-top:14px;color:${lead ? C.elena : C.ink}">${n}</div>`));
    A.reveal(cells, 'values', { a: 0.3, b: 1, stagger: 0.05 });
    A.conceal(cells, 'tensions');
    caption(A, 'values', 'tensions', {
      y: 320, w: 640,
      k: 'b1 Human values',
      t: 'Eight human values.',
      s: 'Social connectedness is the one we design for. The other seven limit how the System may pursue it.',
      c: `${doi('Ryan and Deci (2000)', '10.1037/0003-066X.55.1.68')} ${'<span class="cite">Kitwood (1997)</span>'} ${doi('Wang et al. (2026)', '10.1007/s12369-026-01422-x')}`,
    });
  });

  K.scenes.push(function tensions(A) {
    const T = [
      ['VT-01', 'Privacy', 'Connection', 'provisional', ''],
      ['VT-02', 'Connection', 'Autonomy', 'open', doi('Black et al. 2010', '10.1097/JGP.0b013e3181bd1de2')],
      ['VT-03', 'Truth', 'Well-being', 'provisional', ''],
      ['VT-04', 'Dignity', 'Connection', 'open', ''],
      ['VT-05', 'Privacy', 'Identity', 'open', doi('Berridge and Grigorovich 2022', '10.3389/fsoc.2022.957246')],
      ['VT-06', 'Privacy', 'Well-being', 'open', ''],
    ];
    const els = T.map(([id, l, r, st, cite], i) => block('vs', 120 + (i % 3) * 580, 470 + Math.floor(i / 3) * 220, 520, `
      <div class="id">${id}</div>
      <div class="pair">${l} <i>VS</i> ${r}</div>${cite ? `<div class="label" style="margin-top:12px">${cite}</div>` : ''}`));
    A.reveal(els, 'tensions', { a: 0.3, b: 1, stagger: 0.06 });
    A.conceal(els, 'hfc');
    caption(A, 'tensions', 'hfc', {
      cls: 'wide', y: 200,
      k: 'b2 Value tensions', kc: C.alert,
      t: 'Six value tensions shaped the design.',
      s: 'Four of the six involve privacy or autonomy.',
    });
  });

  /* ---------------------------------------------------- IV What we know */
  K.scenes.push(function hfc(A) {
    const F = [
      ['HFC-16', 'The liking gap', `${doi('Boothby et al. 2018', '10.1177/0956797618783714')}, ${doi('Epley and Schroeder 2014', '10.1037/a0037323')}`],
      ['HFC-17', 'Saying no is hard', `${doi('Bohns 2016', '10.1177/0963721415628011')}, ${doi('Mastroianni et al. 2021', '10.1073/pnas.2011809118')}`],
      ['HFC-05', 'Theory of mind', doi('Bora et al. 2015', '10.1136/jnnp-2014-309445')],
      ['HFC-15', 'Shared background', `${doi('McPherson et al. 2001', '10.1146/annurev.soc.27.1.415')}, ${doi('de Medeiros et al. 2012', '10.1177/1471301211421186')}`],
      ['HFC-03', 'Conversation repair', `${doi('Schegloff et al. 1977', '10.2307/413107')}, ${doi('Orange et al. 1996', '10.1044/jshr.3904.881')}`],
      ['HFC-06', 'Face and personhood', `${'<span class="cite">Goffman 1967</span>'}, ${doi('Williams et al. 2009', '10.1177/1533317508318472')}`],
    ];
    const els = F.map(([id, t, refs], i) => block('abs', 120 + (i % 3) * 570, 470 + Math.floor(i / 3) * 230, 520, `
      <div class="label" style="color:var(--elena)">${id}</div>
      <div style="font:500 54px/1 var(--serif);margin:14px 0 16px">${t}</div><div class="label" style="text-transform:none;letter-spacing:.02em;font-size:15px">${refs}</div>`));
    A.reveal(els, 'hfc', { a: 0.3, b: 1, stagger: 0.06 });
    A.conceal(els, 'implies');
    caption(A, 'hfc', 'implies', {
      cls: 'wide', y: 200,
      k: 'b3 Human factors concepts',
      t: 'What the literature tells us.',
      s: 'We drew on eleven concepts about meeting someone new. These six influenced the design most.',
    });
  });

  K.scenes.push(function implies(A) {
    const R = [
      ['1', 'Ask each person alone.', 'HFC-05, HFC-16, HFC-17'],
      ['2', 'Name one shared thing, once.', 'HFC-15, HFC-04'],
      ['3', 'Then step back.', 'HFC-03, HFC-06'],
    ];
    const els = R.map(([n, t, ids], i) => block('abs', 120, 250 + i * 240, 1680, `
      <div style="display:grid;grid-template-columns:90px 1fr 320px;gap:30px;align-items:baseline;border-top:1px solid var(--line);padding-top:30px">
        <div style="font:italic 500 72px/1 var(--serif);color:var(--elena)">${n}</div>
        <div style="font:500 96px/.95 var(--serif);letter-spacing:-.015em;white-space:nowrap">${t}</div>
        <div class="label" style="text-align:right">${ids}</div>
      </div>`));
    A.reveal(els, 'implies', { a: 0.25, b: 1, stagger: 0.14 });
    A.conceal(els, 'tech');
  });

  /* ---------------------------------------------------- V The technology */
  K.scenes.push(function tech(A) {
    const sel = [['TECH-01', 'Pepper in the lounge'], ['TECH-06', 'A resident profile'], ['TECH-05', 'Consent-gated matching'], ['TECH-04', 'A local server'], ['TECH-03', 'Room presence, opt-in']];
    const list = block('rowlist', 820, 250, 560, '<div class="label" style="margin-bottom:14px;color:var(--jan)">Selected</div>' +
      sel.map(([i, t]) => `<div class="r" style="align-items:center"><div class="i" style="color:var(--jan)">${i}</div><div class="t">${t}</div></div>`).join(''));
    const rej = [['TECH-02', 'A pocket guide'], ['TECH-07', 'Cloud speech'], ['TECH-08', 'Audio recording'], ['TECH-09', 'GPS, cameras']];
    const never = block('never', 1470, 250, 360, '<div class="lab">Rejected</div>' +
      rej.map(([i, t]) => `<div class="label" style="margin-top:20px">${i}</div><div class="it">${t}<i></i></div>`).join(''));
    const strikes = [...never.querySelectorAll('.it i')];
    gsap.set(strikes, { scaleX: 0 });
    A.reveal([...list.children], 'tech', { a: 0.25, b: 0.9, stagger: 0.05 });
    A.reveal([...never.children].filter(e => !e.matches('i')), 'tech', { a: 0.4, b: 0.9, stagger: 0.03 });
    A.to(strikes, 'tech', { scaleX: 1, stagger: 0.04 * A.dur('tech') }, 0.7, 0.85);
    A.conceal([list, never], 'prepared');
    caption(A, 'tech', 'prepared', {
      y: 320, w: 620,
      k: 'c1 Technology options',
      t: 'All data stays inside the care home.',
      s: 'We kept technology a resident can see and refuse, and left out anything that listens or watches all day.',
      c: `${doi('Niemeijer et al. (2010)', '10.1017/S1041610210000037')}`,
    });
  });

  K.scenes.push(function prepared(A) {
    const st = block('abs statement', 110, 250, 1500, '<h1 style="font-size:150px;line-height:.92">Every sentence is <em>prepared</em><br>and checked first.</h1>');
    A.reveal(st, 'prepared', { a: 0.2, b: 0.7 });
    const ex = block('abs', 120, 640, 1100, `<div class="label">A prepared line, TECH-06</div>
      <div style="font:italic 500 46px/1.16 var(--serif);color:var(--sys);margin-top:16px">“Elena, this is Jan. Jan, this is Elena. You both worked in [town]: Elena at the post office counter, Jan at the bakery.”</div>
      <div class="label" style="margin-top:26px;text-transform:none;letter-spacing:.02em;font-size:15px">${doi('Wang et al. (2026)', '10.1007/s12369-026-01422-x')}</div>`);
    A.reveal(ex, 'prepared', { a: 0.45, b: 1 });
    A.conceal([st, ex], 'interview');
  });
})();
