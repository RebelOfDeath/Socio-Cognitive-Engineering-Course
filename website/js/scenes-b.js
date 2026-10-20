/* III What matters, IV What we know, V The technology */
(function () {
  'use strict';
  const { C, block, caption, doi, abWrap } = K;
  /* III Background in two slides: context (stakeholders, values, tensions) and design rules (human factors + technology) */

  /* ----------------------------------------------------- III What matters */
  K.scenes.push(function context(A) {
    const col = (x, label, lc, rows) => block('abs', x, 540, 520, `<div class="label" style="color:${lc}">${label}</div>` +
      rows.map(([i, t, sub, hi]) => `<div style="display:grid;grid-template-columns:96px 1fr;gap:14px;align-items:baseline;border-top:1px solid var(--line);padding:12px 0">
        <div class="label" style="color:${hi ? 'var(--elena)' : 'var(--muted)'}">${i}</div>
        <div><div style="font:500 ${hi ? 36 : 32}px/1.05 var(--serif);color:${hi ? 'var(--elena)' : 'var(--ink)'}">${t}</div>${sub ? `<div style="font:400 16px/1.4 var(--sans);color:var(--ink-2);margin-top:4px">${sub}</div>` : ''}</div></div>`).join(''));
    const elsA = [
      col(120, 'Who decides', C.ink, [
        ['ST-01/02', 'Residents', 'decide whether to meet, and what is shared', true],
        ['ST-05', 'Activity coordinator', 'approves every match; keeps the map'],
        ['ST-04', 'Care worker', 'brings people together; painful questions'],
        ['ST-03', 'Relative', 'helps with the life story (indirect)'],
      ]),
      col(690, 'What we protect', C.ink, [
        ['HV-06', 'Social connectedness', 'the value we design for', true],
        ['HV-01, 03', 'Autonomy, privacy', 'limit how we pursue it'],
        ['HV-02', 'Dignity', 'adult voice, no quizzing'],
        ['HV-08', 'Truthfulness', 'no kind lies, no playing along'],
      ]),
      col(1260, 'Where they pull apart', C.alert, [
        ['VT-01', 'Privacy vs connection', 'matching needs personal facts'],
        ['VT-02', 'Connection vs autonomy', 'an invitation can pressure'],
        ['VT-03', 'Truth vs well-being', '“When can I go home?”'],
        ['VT-04', 'Dignity vs connection', 'repeating names can patronise'],
      ]),
    ];
    elsA.forEach((el, i) => A.reveal([...el.children], 'context', { a: 0.3 + i * 0.08, b: 1, stagger: 0.04 }));
    A.conceal(elsA, 'rules');
    const capA = caption(A, 'context', 'rules', {
      cls: 'wide', y: 170,
      k: 'Foundation · stakeholders, values and tensions',
      t: 'Who decides, what we protect, and where it clashes.',
      s: 'The parts of the stakeholders, values and tensions that the design answers to.',
      c: `${doi('Ryan and Deci (2000)', '10.1037/0003-066X.55.1.68')} ${'<span class="cite">Kitwood (1997)</span>'} ${doi('Black et al. (2010)', '10.1097/JGP.0b013e3181bd1de2')}`,
    });
    abWrap('context', 'A', ...elsA, capA);

    const elB = block('abs', 120, 155, 1680, `
      <div class="kicker" style="color:var(--elena)">Foundation · Stakeholders, Values &amp; Tensions</div>
      <h2 style="font:500 72px/1.02 var(--serif);margin:18px 0 34px">Who holds authority — and where our values pull apart.</h2>
      <div class="w-context-grid">
        <div class="w-gov-panel">
          <div class="label" style="color:var(--elena);margin-bottom:18px">Governance Chain · Who Decides</div>
          <div class="w-gov-chain">
            <div class="w-gov-node primary">
              <span class="w-gov-id">ST-01 / 02</span>
              <div class="w-gov-main"><strong>Residents</strong><span>Own profile tags &amp; private yes/no</span></div>
              <span class="w-gov-role">Final Veto</span>
            </div>
            <div class="w-gov-arrow">↑ proposes only approved pairs</div>
            <div class="w-gov-node">
              <span class="w-gov-id">ST-05</span>
              <div class="w-gov-main"><strong>Activity Coordinator</strong><span>Curates relationship map &amp; approves matches</span></div>
              <span class="w-gov-role">Gatekeeper</span>
            </div>
            <div class="w-gov-arrow">↑ supported on the floor by</div>
            <div class="w-gov-dual">
              <div class="w-gov-node compact">
                <span class="w-gov-id">ST-04</span>
                <div class="w-gov-main"><strong>Care Worker</strong><span>Walks residents &amp; handles distress</span></div>
              </div>
              <div class="w-gov-node compact">
                <span class="w-gov-id">ST-03</span>
                <div class="w-gov-main"><strong>Relative</strong><span>Co-creates life story at intake</span></div>
              </div>
            </div>
          </div>
        </div>
        <div class="w-tension-panel">
          <div class="w-target-banner">
            <span class="w-gov-id" style="color:var(--elena)">Target Value · HV-06</span>
            <strong>Social Connectedness</strong>
            <span class="w-tb-sub">Checked by 4 guardrails where values clash:</span>
          </div>
          <div class="w-tensions">
            <div class="w-t-row">
              <span class="w-t-id">VT-01</span>
              <div class="w-t-scale"><span class="l">Connectedness</span><span class="vs">⇄</span><span class="r">Privacy <i>HV-03</i></span></div>
              <div class="w-t-pill">Matching needs personal facts → <b>Released tags only</b></div>
            </div>
            <div class="w-t-row">
              <span class="w-t-id">VT-02</span>
              <div class="w-t-scale"><span class="l">Connectedness</span><span class="vs">⇄</span><span class="r">Autonomy <i>HV-01</i></span></div>
              <div class="w-t-pill">Public invite pressures a polite yes → <b>Ask 1-on-1 alone</b></div>
            </div>
            <div class="w-t-row">
              <span class="w-t-id">VT-03</span>
              <div class="w-t-scale"><span class="l">Well-being</span><span class="vs">⇄</span><span class="r">Truthfulness <i>HV-08</i></span></div>
              <div class="w-t-pill">“When do I go home?” → <b>No kind lies; hand to staff</b></div>
            </div>
            <div class="w-t-row">
              <span class="w-t-id">VT-04</span>
              <div class="w-t-scale"><span class="l">Connectedness</span><span class="vs">⇄</span><span class="r">Dignity <i>HV-02</i></span></div>
              <div class="w-t-pill">Quizzing exposes forgetting → <b>Plain adult statements</b></div>
            </div>
          </div>
        </div>
      </div>
      <div class="brief-foot" style="margin-top:26px">${doi('Ryan and Deci (2000)', '10.1037/0003-066X.55.1.68')} · Kitwood (1997) · ${doi('Black et al. (2010)', '10.1097/JGP.0b013e3181bd1de2')}</div>
    `);
    abWrap('context', 'B', elB);
    A.reveal(elB, 'context', { a: 0.25, b: 0.95, y: 22 });
    A.conceal(elB, 'rules');
  });

  /* ---------------------------------------------------- IV What we know */
  K.scenes.push(function rules(A) {
    const R = [
      ['People think others like them less than they do, and saying no to someone’s face is hard.', 'asks each person alone,', 'where “no” costs nothing.'],
      ['Strangers connect over one thing they share.', 'names one shared thing,', 'once.'],
      ['People with dementia want to repair their own slips, and help singles them out.', 'then steps back.', ''],
    ];
    const head = block('abs', 120, 150, 1680, `<div class="label" style="color:var(--elena)">Human factors → design rules</div>
      <h2 style="font:500 76px/1.02 var(--serif);margin:22px 0 0">What the research tells Pepper to do.</h2>`);
    const rows = R.map(([why, rule, tail], i) => block('abs', 120, 350 + i * 160, 1680, `
      <div class="why-row"><div class="why">${why}</div><div class="arrow">→</div>
      <div class="rule"><span>So Pepper </span><b>${rule}</b> ${tail}</div></div>`));
    const strip = block('abs', 120, 845, 1680, `<div class="rule-strip"><b>And it never improvises.</b> Every sentence is prepared and checked; nothing leaves the home: no cloud speech, no recording, no tracking.</div>`);
    const cite = block('abs', 120, 935, 1680, `<div class="label" style="text-transform:none;letter-spacing:.02em;font-size:14px">${doi('Boothby et al. 2018', '10.1177/0956797618783714')} · ${doi('Bohns 2016', '10.1177/0963721415628011')} · ${doi('McPherson et al. 2001', '10.1146/annurev.soc.27.1.415')} · ${doi('Orange et al. 1996', '10.1044/jshr.3904.881')} · ${doi('Williams et al. 2009', '10.1177/1533317508318472')} · ${doi('Niemeijer et al. 2010', '10.1017/S1041610210000037')}</div>`);
    A.reveal(head, 'rules', { a: 0.15, b: 0.45 });
    A.reveal(rows, 'rules', { a: 0.3, b: 0.9, stagger: 0.1 });
    A.reveal([strip, cite], 'rules', { a: 0.75, b: 1 });
    A.conceal([head, ...rows, strip, cite], 'interview');
    abWrap('rules', 'A', head, ...rows, strip, cite);

    const elB = block('abs', 120, 150, 1680, `
      <div class="label" style="color:var(--elena)">Human Factors &amp; Technology → 4 Design Rules</div>
      <h2 style="font:500 72px/1.02 var(--serif);margin:18px 0 34px">Four rules that govern every interaction.</h2>
      <div class="w-rules-grid">
        <div class="w-rule-card">
          <div class="w-rc-top"><span class="w-rc-num">Rule 01 · IDP-02</span><span class="w-rc-tag">Liking Gap &amp; Polite Yes</span></div>
          <div class="w-rc-flow">
            <div class="w-rc-why">Refusing face-to-face feels rude</div>
            <div class="w-rc-arr">→</div>
            <div class="w-rc-do">Ask each person <b>alone</b></div>
          </div>
          <div class="w-rc-foot">“No” costs nothing and is never passed on (PR1)</div>
        </div>
        <div class="w-rule-card">
          <div class="w-rc-top"><span class="w-rc-num">Rule 02 · F3</span><span class="w-rc-tag">Homophily &amp; Memory</span></div>
          <div class="w-rc-flow">
            <div class="w-rc-why">Lists of facts overwhelm working memory</div>
            <div class="w-rc-arr">→</div>
            <div class="w-rc-do">Name <b>one shared thing</b>, once</div>
          </div>
          <div class="w-rc-foot">Plain statement with 2 photos; never “Do you remember…?” (PR3)</div>
        </div>
        <div class="w-rule-card">
          <div class="w-rc-top"><span class="w-rc-num">Rule 03 · IDP-01</span><span class="w-rc-tag">Conversational Self-Repair</span></div>
          <div class="w-rc-flow">
            <div class="w-rc-why">Publicly helping with lost words stigmatises</div>
            <div class="w-rc-arr">→</div>
            <div class="w-rc-do">Introduce, then <b>step back silent</b></div>
          </div>
          <div class="w-rc-foot">Wait for residents to self-repair; prompt only at a stall</div>
        </div>
        <div class="w-rule-card gold">
          <div class="w-rc-top"><span class="w-rc-num">Rule 04 · TECH / PR6</span><span class="w-rc-tag">Privacy &amp; Truthfulness</span></div>
          <div class="w-rc-flow">
            <div class="w-rc-why">Generative AI invents &amp; leaks to cloud</div>
            <div class="w-rc-arr">→</div>
            <div class="w-rc-do"><b>Prepared lines</b> · 100% local</div>
          </div>
          <div class="w-rc-foot">0 generated questions · 0 audio recordings · 0 cloud packets</div>
        </div>
      </div>
      <div class="brief-foot" style="margin-top:28px">${doi('Boothby et al. 2018', '10.1177/0956797618783714')} · ${doi('Bohns 2016', '10.1177/0963721415628011')} · ${doi('McPherson et al. 2001', '10.1146/annurev.soc.27.1.415')} · ${doi('Orange et al. 1996', '10.1044/jshr.3904.881')} · ${doi('Williams et al. 2009', '10.1177/1533317508318472')} · ${doi('Niemeijer et al. 2010', '10.1017/S1041610210000037')}</div>
    `);
    abWrap('rules', 'B', elB);
    A.reveal(elB, 'rules', { a: 0.25, b: 0.95, y: 22 });
    A.conceal(elB, 'interview');
  });
})();
