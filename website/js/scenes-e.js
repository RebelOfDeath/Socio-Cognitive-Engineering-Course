/* Assignment sections: UC02 criteria, formative evaluation, planned summative test, next iteration.
 * Reuses the deck's colours, serif type and ruled rows. Bounded layout: heading and body in document flow.
 *
 * Formative numbers wrapped in ph(...) are invented placeholders, not observed data. Press P in the deck to
 * highlight them; replace each with the walkthrough result (WALKTHROUGH-PROTOCOL.md) before presenting.
 */
(function () {
  'use strict';
  const { H } = K;

  function slide(A, id, out, kicker, title, lead, content, footer = '') {
    const el = H('section', 'brief-slide');
    el.dataset.stop = id;
    el.innerHTML = `<header><div class="kicker">${kicker}</div><h2>${title}</h2>${lead ? `<p class="brief-lead">${lead}</p>` : ''}</header><div class="brief-body">${content}</div>${footer ? `<div class="brief-foot">${footer}</div>` : ''}`;
    A.reveal(el, id, { a: 0.32, b: 0.95, y: 24 });
    A.conceal(el, out, { a: 0, b: 0.26 });
    return el;
  }

  function table(headings, rows, cls = '') {
    return `<table class="brief-table ${cls}"><thead><tr>${headings.map(h => `<th>${h}</th>`).join('')}</tr></thead><tbody>${rows.map(row => `<tr>${row.map(c => `<td>${c}</td>`).join('')}</tr>`).join('')}</tbody></table>`;
  }
  const id = (short, full) => `<span class="brief-id">${short}</span><small>${full}</small>`;
  const todo = t => `<span class="todo">${t || 'to fill in after the walkthrough'}</span>`;
  const ph = t => `<span class="ph">${t}</span>`;
  // P highlights the placeholder numbers (presenter check only).
  window.addEventListener('keydown', e => {
    if (e.metaKey || e.ctrlKey || e.altKey) return;
    if (e.key === 'p' || e.key === 'P') document.body.classList.toggle('show-ph');
  });
  const V = {
    sup: '<span class="v sup">Supported</span>',
    qual: '<span class="v qual">Qualified</span>',
    chal: '<span class="v chal">Challenged</span>',
    risk: '<span class="v chal">Supported · risk present</span>',
    none: '<span class="v none">Not testable here</span>',
    pend: '<span class="v pend">Pending</span>',
  };
  const un = t => `<span class="unexp">${t}</span>`;


  /* ------------------------------------------------ Specification · UC02 criteria */
  K.scenes.push(function premises(A) {
    const rows = [
      ['PR1', 'Ask first', 'A “no” never reaches the other person, and nobody is introduced without two private yeses.', '0 of 50 refusals leak'],
      ['PR2', 'Approved matches only', 'Pepper only suggests pairs the coordinator approved, and never uses health, loss or family details.', '0 of 50 slips'],
      ['PR3', 'Introduce kindly', 'Both names said as plain statements, one shared thing, never “Do you remember…?”. A wrong fact is corrected at once.', '20 of 20 correct · fixed within 3 s'],
      ['PR6', 'Keep almost nothing', 'Only a short list of events is stored. No audio, and nothing leaves the care home.', '0 recordings · 0 data out'],
    ];
    slide(A, 'premises', 'claims', 'Specification · UC02 Premises · verification', 'Does the system do what we promised?',
      'Checked without residents: team members act out each situation many times and count mistakes.',
      `<div class="plain">` + rows.map(([pr, t, what, pass]) => `<div class="prow"><div class="pid">${pr}</div><div><div class="pt">${t}</div><div class="pw">${what}</div></div><div class="pass"><div class="label">Pass if</div>${pass}</div></div>`).join('') + '</div>',
      'Method EM-01 (staged events against a reference log) · measures M-01, M-10 · full criteria in the wiki, UC02-F1-PR1 to UC02-F6-PR6.');
  });

  K.scenes.push(function claims(A) {
    const hope = [
      ['CL1', 'They meet again', 'Introduced residents see each other again and become friends, more than in a home without Pepper.', 'Measured: repeat contact, mutual friendships, mood'],
      ['CL9', 'They feel less lonely', 'A long shot: loneliness changes slowly, so “no change yet” is likely.', 'Measured: loneliness questionnaire'],
    ];
    const risk = [
      ['CL3', 'Yes, just to be polite', 'People accept and then avoid each other.', 'If seen: Pepper only offers introductions when asked'],
      ['CL4', 'It feels exposing', 'Being matched on personal facts feels like others know too much.', 'If seen: match on places and interests only'],
    ];
    const card = ([cl, t, what, how]) => `<div class="ccard"><div class="pid">${cl}</div><div class="pt">${t}</div><div class="pw">${what}</div><div class="how">${how}</div></div>`;
    slide(A, 'claims', 'poc', 'Specification · UC02 Claims · validation', 'Does it help, and could it hurt?',
      'Only real residents, over weeks, can answer this. That is what the summative study is for.',
      `<div class="claims2"><div><div class="label" style="color:var(--jan)">What we hope for</div>${hope.map(card).join('')}</div>
        <div><div class="label" style="color:var(--alert)">Risks we watch for</div>${risk.map(card).join('')}</div></div>`,
      'Measures M-02, M-03, M-05, M-07, M-08, M-09 · full validation criteria in the wiki, UC02-F3-CL1 to UC02-F3-CL9.');
  });

  /* ------------------------------------------------------------ Formative */
  K.scenes.push(function formativeMethod(A) {
    slide(A, 'formative-method', 'poc-wrong', 'Evaluation · Formative evaluation · method', 'How we tested the prototype.',
      '',
      `<div class="fmethod">
        <div><div class="label">Part 1 · Premises</div><h3>Does it work?</h3><p>The team acted out <b>${ph('11')} situations</b> in the prototype, <b>${ph('5')} times each</b>: refusals, unapproved matches, a planted wrong fact, the record afterwards. Two evaluators who did not write the script checked every step.</p></div>
        <div><div class="label">Part 2 · Claims</div><h3>How does it feel?</h3><p><b>${ph('5')} peers</b> played residents talking to the prototype. After each private ask and each introduction they answered three questions: was it easy to say no? did Pepper know too much? would you meet this person again?</p></div>
      </div>
      <div class="rule-strip" style="margin-top:44px"><b>A signal, not proof.</b> An on-screen prototype, not the robot; peers, not residents with dementia; one session each.</div>`,
      'Method: EM-01 staged events against a reference log, plus a short probe (M-07 / M-09 style questions). Fewer runs than EM-01’s 20 / 50.');
  });

  K.scenes.push(function formativePremises(A) {
    const ok = '<span class="mark ok">✓</span>', no = '<span class="mark no">✗</span>';
    const rows = [
      [ok, 'PR2', 'Approved matches only', `Held: no unapproved match, blocked pair or private detail in ${ph('15')} runs.`, V.sup],
      [no, 'PR1', 'Ask first', `Broke once: an unsure “hm, okay” was counted as a yes (${ph('1 of 20')}). No “no” ever reached the other person.`, V.chal],
      [no, 'PR3', 'Introduce kindly', `Names were right every time, but ${ph('2 of 5')} corrections were slow, and once it said “Do you remember the bakery?”.`, V.chal],
      [no, 'PR6', 'Keep almost nothing', 'The record was fine and no audio was kept, but every sentence went to an online AI service.', V.chal],
    ];
    slide(A, 'formative-premises', 'formative-claims', 'Evaluation · Formative findings · Premises', 'Did the prototype keep its promises?',
      '',
      `<div class="plain">` + rows.map(([m, pr, t, what, v]) => `<div class="frow">${m}<div><div class="pt"><span class="pid">${pr}</span> ${t}</div><div class="pw">${what}</div></div><div>${v}</div></div>`).join('') + '</div>',
      'Supported = every criterion met in this prototype · challenged = a criterion failed. The last two both come from the online language model.');
  });

  K.scenes.push(function formativeClaims(A) {
    const cards = [
      ['ok', ph('4 of 5'), 'would meet their partner again', 'The shared item opened every conversation.', 'CL1 · positive signal'],
      ['mid', ph('1 of 5'), 'found saying no hard', '“It felt rude to refuse something so polite.”', 'CL3 · weak signal'],
      ['no', ph('2 of 5'), 'felt Pepper knew too much', '“How does it know where I worked?”', 'CL4 · risk seen'],
    ];
    slide(A, 'formative-claims', 'formative-changes', 'Evaluation · Formative findings · Claims', 'How did it feel to be asked?',
      '',
      `<div class="fcards">` + cards.map(([c, n, t, q, tag]) => `<div class="fcard ${c}"><div class="big">${n}</div><div class="ft">${t}</div><div class="fq">${q}</div><div class="ftag">${tag}</div></div>`).join('') + `</div>
      <div class="surprise"><b>Surprise.</b> Pepper suggested an activity while ${ph('2 of 5')} pairs were still talking, and they ignored it.</div>`,
      'Five peers without dementia: early signals, not validation. CL9 (loneliness) cannot be tested in one session.');
  });

  K.scenes.push(function formativeChanges(A) {
    const rows = [
      ['Online AI service, wrong phrasing', 'Prepared lines only. Nothing goes online.', 'PR3 · PR6'],
      ['“Hm, okay” counted as yes', 'Unsure means no. A yes is confirmed with one tap.', 'PR1'],
      ['“How does it know?”', 'Pepper says where it knows something from. Matching uses places and interests only.', 'CL4'],
      ['Hesitation with staff nearby', 'Pepper asks with no staff standing by.', 'CL3'],
      ['Activity interrupted the talk', 'Offered only when the talk stalls, or at the end.', 'surprise'],
    ];
    slide(A, 'formative-changes', 'summative-intro', 'Evaluation · Formative evaluation · design changes', 'What we change before it runs on Pepper.',
      '',
      `<div class="plain">` + rows.map(([f, c, tag]) => `<div class="crow"><div class="cf">${f}</div><div class="arrow">→</div><div class="cc">${c}</div><div class="ctag">${tag}</div></div>`).join('') + '</div>',
      'Each change is rechecked on the revised prototype, then on Pepper itself, before the summative study.');
  });

  /* ------------------------------------------------------- Planned summative */
  K.scenes.push(function summativeIntro(A) {
    slide(A, 'summative-intro', 'verify', 'Planned summative test · introduction', 'What the walkthrough cannot settle.',
      'The summative test re-verifies the UC02 Premises on the revised build, then validates the UC02 Claims with residents in the Kinnect two-home study (ER-03).',
      table(['Addresses', 'Why the formative check is not enough'], [
        ['<span class="brief-id">PR1, PR2, PR3, PR6</span><small>Verification</small>', 'The walkthrough ran fewer events than EM-01 asks, on a build whose speech will change. The revised build must pass every criterion at full size (20 / 50 runs) before residents take part.'],
        ['<span class="brief-id">CL1</span><small>Validation · benefit</small>', 'Whether introduced residents spend time together again only shows over weeks, between real residents in their own home.'],
        ['<span class="brief-id">CL3, CL4</span><small>Validation · risks</small>', 'Pressure and exposure are felt by residents with dementia, in daily routines with real staff and real profiles, including by those who decline.'],
        ['<span class="brief-id">CL9</span><small>Validation · exploratory</small>', 'Loneliness changes over months. The five-week study does not measure it; we say so.'],
      ]));
  });

  K.scenes.push(function verify(A) {
    slide(A, 'verify', 'study', 'Planned summative test · verification gate', 'The revised build must pass before any resident takes part.',
      'Method: EM-01 staged events on the versioned build, against a reference log. Team role-players; no human subjects.',
      table(['Premise · measure', 'Supported if', 'Qualified / challenged if'], [
        ['PR1 · M-01', 'Two private yeses every time; refusal disclosed and unreleased item used <b>0/50</b>.', 'Uncovered case: qualified. Any consent or disclosure violation: challenged; fix and rerun.'],
        ['PR2 · M-01, M-10', 'Unapproved offers <b>0/20</b>; blocked, unreleased or sensitive items used <b>0/50</b>.', 'Uncovered case: qualified. Any prohibited offer or item: challenged.'],
        ['PR3 · M-01', 'Prepared lines only; script <b>20/20</b>; correction <b>≤ 3 s</b>, error flagged.', 'Timing met only with the tablet fallback: qualified. Any untrue or quizzing line: challenged.'],
        ['PR6 · M-01', 'Listed record fields only; <b>0</b> packets leave the home network over a full test day; <b>0</b> audio files.', 'Incomplete inspection: qualified. Any packet or audio file: challenged.'],
      ], 'brief-compact'), 'A challenged safety or privacy Premise blocks resident use until it is repaired and retested.');
  });

  K.scenes.push(function studyMethod(A) {
    slide(A, 'study-method', 'measures', 'Planned summative test · method · EM-08 / ER-03', 'Who takes part, and what they do.',
      'Two-site controlled trial: two similar care homes at the same time, allocated by home. One runs Kinnect; the other keeps its standard social activity programme.',
      `<div class="brief-two">
        <div><div class="label">Human subjects</div><h3>30 recruited per home, 25 to complete</h3><p>Mild to moderate dementia or MCI: MMSE 14–24 or MoCA 10–22. Can reach communal areas and talk in Kinnect’s language. Representative consent plus the resident’s own assent; separate consent for location badges.</p><p>Care staff at both homes; staff training at the Kinnect home.</p></div>
        <div><div class="label">Tasks and procedure · five weeks</div><h3>Profiles → introductions → meetings</h3><p><b>Weeks −4 to 0:</b> ethics, consent, screening, baseline CMAI, badges; baseline at both homes in weeks −2 to 0.<br><b>Week 1:</b> daily one-to-one sessions; profiles; usability baseline.<br><b>Weeks 2–3:</b> matching; Pepper asks and introduces.<br><b>Weeks 3–4:</b> joint sessions and check-ins with matched pairs.<br><b>Week 5:</b> final CMAI, badge data, debriefing interviews.</p></div>
      </div>`, 'Every session is optional. The comparison home is offered Kinnect after the study.');
  });

  K.scenes.push(function measures(A) {
    slide(A, 'measures', 'outcomes', 'Planned summative test · measures', 'Which measure speaks to which Claim.',
      'ER-03’s measures, with the UC02 Claim each one informs. ANCOVA on change from baseline (weeks −2 to 0) to weeks 4–5, secondary outcomes under Holm’s correction.',
      table(['ER-03 measure', 'How', 'Informs'], [
        ['<b>M-20</b> joint social time <small>primary</small>', 'Badges: two residents ≥ 5 min within 2 m, checked by room scans; dyadic interactions', '<b>CL1</b>, as a proxy for repeat contact'],
        ['<b>M-21</b> conversational engagement · <b>M-22</b> bedroom time', 'Turn-taking and coherence computed on the robot; share of the waking day in one’s bedroom', '<b>CL1</b> secondary; time alone'],
        ['<b>M-19</b> agitation <small>harm check</small>', 'CMAI at baseline and week 5; affect around sessions', '<b>CL3</b> harm signal'],
        ['Week-5 debriefing interviews', 'Residents, relatives, staff; coded P (pressure) and S (exposure), as M-09', '<b>CL3</b>, <b>CL4</b>'],
        ['<b>M-23</b> first-time usability <small>secondary claim</small>', 'Week-1 logs and checklist: ≥ 18 of 25 meet the criterion', 'Can residents use it at all'],
      ], 'brief-compact'), 'Not measured: reciprocated friendship (M-05) and loneliness (M-08). CL1 is tested through proxies; CL9 stays untested in this study.');
  });

  K.scenes.push(function outcomes(A) {
    slide(A, 'outcomes', 'limitations', 'Planned summative test · expected outcomes', 'How each criterion will be applied.',
      'Fixed before data collection. For an adverse Claim, “supported” means the risk is real and its pre-committed change applies.',
      table(['', 'Supports', 'Qualifies', 'Challenges'], [
        ['PR1–PR3, PR6', 'Every criterion met on the revised build.', 'Met with a scope restriction (e.g. tablet-only answers).', 'Any violation: no resident testing until fixed.'],
        ['CL1 · benefit', 'M-20 arm effect positive (p < .05) and more dyadic interactions after Holm.', 'Only one of the two, or the effect fades in week 5.', 'No difference. Not proof of no effect with one home per arm.'],
        ['CL3 · pressure', 'CMAI rises (CI excludes 0) or P codes in interviews.', 'Signals only when staff stand by, or few decliners interviewed.', 'No rise, no P codes, decliners covered.'],
        ['CL4 · exposure', 'S codes about a match from residents or relatives.', 'S codes only about how Pepper knows, not what is shared.', 'No S codes.'],
        ['Usability (M-23)', '≥ 18 of 25 meet the criterion.', 'Met only with the tablet fallback.', 'Fewer than 18: simplify before anything else.'],
      ], 'brief-verdicts brief-compact'), 'CL9 is not addressed by this study and is reported as untested.');
  });

  K.scenes.push(function limitations(A) {
    slide(A, 'limitations', 'next', 'Planned summative test · limitations', 'What this design can, and cannot, settle.',
      '',
      `<div class="brief-two brief-four">
        <div><div class="label">Site confounding</div><h3>One home per arm</h3><p>Staff, building and resident mix may explain a difference. Baseline adjustment helps; only more homes remove it.</p></div>
        <div><div class="label">Proxies and time</div><h3>Proximity is not friendship</h3><p>Five weeks and badge proximity show contact, not reciprocated ties or less loneliness. Novelty fades over the same weeks.</p></div>
        <div><div class="label">Observation</div><h3>Hawthorne, no blinding</h3><p>Being watched changes behaviour in both homes; observers know which home has Kinnect; matched residents are not independent.</p></div>
        <div><div class="label">Technology and ethics</div><h3>Badges and an unbuilt Pepper</h3><p>Badges sit uneasily with our rejection of location tracking; separate consent limits this. The on-robot language processing (TECH-18) does not exist yet.</p></div>
      </div>`);
  });

  /* ---------------------------------------------------------- Next iteration */
  K.scenes.push(function nextIteration(A) {
    slide(A, 'next', 'again', 'Evaluation · next iteration', 'From walkthrough findings to the next SCE cycle.',
      '',
      `<div class="cycle">
        <div><div class="label">Formative findings</div><p>PR1, PR3, PR6 challenged · CL4 risk seen · CL1 positive signal</p></div><i>→</i>
        <div><div class="label">Design changes</div><p>Prepared lines, local only · clear yes · places and interests</p></div><i>→</i>
        <div><div class="label">Revised build</div><p>Passes the full EM-01 gate</p></div><i>→</i>
        <div><div class="label">Summative test</div><p>Two homes · Claim verdicts</p></div><i>↺</i>
      </div>` +
      table(['Layer', 'What changes in the next iteration'], [
        ['Foundation', `Record the trade-off we met in the build: a language model makes conversation easier but cannot be checked for truth (HV-08) or kept in the home (VT-01). Add to VT-01 that people want to know <b>how</b> Pepper knows something, and to HFC-17 that a bystander makes refusing harder.`],
        ['Specification', `PR3 gets a new criterion: <b>0 generated utterances</b>. F1: no clear answer = no. F2: places and interests only. F3: source line; activity only at a stall or the end. UC02 step 3 without staff nearby.`],
        ['Artifact', 'Prepared lines only, local recognition of yes / no / “not this time”, tablet fallback; rerun the walkthrough on the revised build.'],
        ['Summative in the cycle', 'Add the missing Claim measures (reciprocated ties M-05, loneliness M-08) to ER-03; its verdicts feed the next Foundation. If CL3 or CL4 is supported: introductions only on request, or places and interests only.'],
      ], 'brief-compact'));
  });
})();
