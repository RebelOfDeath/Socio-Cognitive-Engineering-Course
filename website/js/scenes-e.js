/* Assignment sections: formative evaluation, planned summative test, next iteration.
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
  const ph = t => `<span class="ph">${t}</span>`;
  // P highlights the placeholder numbers (presenter check only).
  window.addEventListener('keydown', e => {
    if (e.metaKey || e.ctrlKey || e.altKey) return;
    if (e.key === 'p' || e.key === 'P') document.body.classList.toggle('show-ph');
  });

  /* ------------------------------------------------------------ Formative */
  K.scenes.push(function formativeClaims(A) {
    slide(A, 'formative-claims', 'formative-changes', 'Evaluation · Formative findings · Claims', 'How did it feel to be asked?',
      '',
      `<div class="fcards w-fcards-b">
        <div class="fcard ok">
          <div class="w-dots-row"><span class="big">${ph('4 / 5')}</span><div class="w-peeps"><i class="on ok"></i><i class="on ok"></i><i class="on ok"></i><i class="on ok"></i><i></i></div></div>
          <div class="ft">Would meet their partner again</div>
          <div class="fq">Shared item opened 5 / 5 talks immediately</div>
          <div class="ftag">CL1 · Positive Signal</div>
        </div>
        <div class="fcard mid">
          <div class="w-dots-row"><span class="big">${ph('1 / 5')}</span><div class="w-peeps"><i class="on mid"></i><i></i><i></i><i></i><i></i></div></div>
          <div class="ft">Found saying no hard</div>
          <div class="fq">“Felt rude to refuse” — happened when staff stood nearby</div>
          <div class="ftag">CL3 · Weak Signal</div>
        </div>
        <div class="fcard no">
          <div class="w-dots-row"><span class="big">${ph('2 / 5')}</span><div class="w-peeps"><i class="on no"></i><i class="on no"></i><i></i><i></i><i></i></div></div>
          <div class="ft">Felt Pepper knew too much</div>
          <div class="fq">“How does it know where I worked?” (Source unclear)</div>
          <div class="ftag">CL4 · Risk Seen</div>
        </div>
      </div>
      <div class="w-surprise-flow">
        <span class="w-sf-badge">⚡ Unexpected Finding</span>
        <div class="w-sf-step">Pair still talking warmly</div>
        <span class="w-sf-arr">+</span>
        <div class="w-sf-step bad">Pepper offers activity on timer</div>
        <span class="w-sf-arr">→</span>
        <div class="w-sf-step">Ignored by <b>${ph('2 of 5')} pairs</b></div>
      </div>`,
      '5 peer role-players (1 session): early signals only. CL9 (loneliness) requires months.');
  });

  K.scenes.push(function formativeChanges(A) {
    slide(A, 'formative-changes', 'summative-intro', 'Evaluation · Formative evaluation · design changes', 'What we change before it runs on Pepper.',
      '',
      `<div class="w-changes-grid">
        <div class="w-chg-card">
          <span class="w-chg-tag">PR3 · PR6</span>
          <div class="w-chg-from">✗ Hosted LLM leaked packets &amp; asked “Do you remember…?”</div>
          <div class="w-chg-to">✓ <b>Prepared templates only</b> · 100% local execution</div>
        </div>
        <div class="w-chg-card">
          <span class="w-chg-tag">PR1</span>
          <div class="w-chg-from">✗ Ambiguous “hm, okay” counted as consent</div>
          <div class="w-chg-to">✓ <b>Unsure = No</b> · Yes confirmed with 1 tablet tap</div>
        </div>
        <div class="w-chg-card">
          <span class="w-chg-tag alert">CL4</span>
          <div class="w-chg-from">✗ “How does it know where I worked?”</div>
          <div class="w-chg-to">✓ <b>State source</b> (“From your intake”) + <b>Places &amp; interests only</b></div>
        </div>
        <div class="w-chg-card">
          <span class="w-chg-tag">CL3</span>
          <div class="w-chg-from">✗ Hesitation to refuse when a bystander stood near</div>
          <div class="w-chg-to">✓ <b>No staff standing by</b> during private ask</div>
        </div>
        <div class="w-chg-card span-2">
          <span class="w-chg-tag gold">Surprise Fix</span>
          <div class="w-chg-from">✗ Activity prompt interrupted 2 / 5 pairs mid-conversation</div>
          <div class="w-chg-to">✓ <b>Wait for silence stall (≥ 10 s) or end of session</b> before offering an activity</div>
        </div>
      </div>`,
      'All 5 fixes are re-verified on the revised build before any resident testing.');
  });

  /* ------------------------------------------------------- Planned summative */
  K.scenes.push(function summativeIntro(A) {
    slide(A, 'summative-intro', 'verify', 'Planned summative test · introduction', 'What the walkthrough cannot settle.',
      '',
      `<div class="w-bridge-grid">
        <div class="w-bridge-card">
          <div class="w-br-id"><span class="pid">PR1–PR3, PR6</span><span class="w-tag">Verification Gate</span></div>
          <div class="w-br-vs">
            <div class="w-br-left"><small>Walkthrough Limit</small><span>Small sample (5–20 runs) on LLM speech that broke</span></div>
            <div class="w-br-arr">→</div>
            <div class="w-br-right"><small>Summative Requirement</small><span><b>Full EM-01 gate (20 / 50 runs)</b> on local prepared-line build</span></div>
          </div>
        </div>
        <div class="w-bridge-card">
          <div class="w-br-id"><span class="pid">CL1</span><span class="w-tag">Primary Benefit</span></div>
          <div class="w-br-vs">
            <div class="w-br-left"><small>Walkthrough Limit</small><span>1-session peer role-play cannot show lasting ties</span></div>
            <div class="w-br-arr">→</div>
            <div class="w-br-right"><small>Summative Requirement</small><span><b>5-week longitudinal tracking</b> across 2 care homes (ER-03)</span></div>
          </div>
        </div>
        <div class="w-bridge-card">
          <div class="w-br-id"><span class="pid alert">CL3 &amp; CL4</span><span class="w-tag alert">Adverse Risks</span></div>
          <div class="w-br-vs">
            <div class="w-br-left"><small>Walkthrough Limit</small><span>Peers don’t feel real dementia stigma or profile exposure</span></div>
            <div class="w-br-arr">→</div>
            <div class="w-br-right"><small>Summative Requirement</small><span><b>Real residents, staff &amp; decliners</b> in daily care routines</span></div>
          </div>
        </div>
        <div class="w-bridge-card dim">
          <div class="w-br-id"><span class="pid" style="color:var(--muted)">CL9</span><span class="w-tag">Exploratory Boundary</span></div>
          <div class="w-br-vs">
            <div class="w-br-left"><small>Time Horizon</small><span>Trait loneliness changes over months, not 5 weeks</span></div>
            <div class="w-br-arr">→</div>
            <div class="w-br-right"><small>Honest Scope</small><span><b>Left untested in ER-03</b>; reported openly as a limitation</span></div>
          </div>
        </div>
      </div>`,
      'Two-stage summative architecture: Stage 1 Full EM-01 Verification Gate → Stage 2 Two-Home Controlled Trial (ER-03).');
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
      '',
      `<div class="w-map-grid">
        <div class="w-map-row">
          <div class="w-m-inst primary"><b>M-20 · Joint Social Time</b><span>Badges: ≥ 5 min within 2 m + room scans &amp; dyads</span></div>
          <div class="w-m-link">─── Primary Proxy ──▶</div>
          <div class="w-m-claim good"><b>CL1 · Repeat Contact</b><span>Primary benefit outcome (ANCOVA Wks 4–5 vs. Baseline)</span></div>
        </div>
        <div class="w-map-row">
          <div class="w-m-inst"><b>M-21 Turn-Taking · M-22 Bedroom Time</b><span>On-robot coherence + % waking day alone in room</span></div>
          <div class="w-m-link">── Secondary (Holm) ─▶</div>
          <div class="w-m-claim good"><b>CL1 · Engagement &amp; Isolation</b><span>Active conversation &amp; reduced room withdrawal</span></div>
        </div>
        <div class="w-map-row">
          <div class="w-m-inst alert"><b>M-19 · Agitation (CMAI)</b><span>Cohen-Mansfield score at Wk 0 vs. Wk 5 + session affect</span></div>
          <div class="w-m-link alert">──── Harm Check ───▶</div>
          <div class="w-m-claim bad"><b>CL3 · Polite-Yes Pressure</b><span>Detects distress or agitation from social prompts</span></div>
        </div>
        <div class="w-map-row">
          <div class="w-m-inst alert"><b>Week-5 Coded Interviews (M-09)</b><span>Residents (incl. decliners), relatives &amp; care staff</span></div>
          <div class="w-m-link alert">── Codes P &amp; S ────▶</div>
          <div class="w-m-claim bad"><b>CL3 (Code P) &amp; CL4 (Code S)</b><span>Qualitative pressure (P) &amp; profile exposure (S)</span></div>
        </div>
        <div class="w-map-row">
          <div class="w-m-inst"><b>M-23 · First-Time Usability</b><span>Week-1 session logs &amp; observation checklist</span></div>
          <div class="w-m-link">── Threshold ≥ 18/25 ▶</div>
          <div class="w-m-claim"><b>Baseline Usability</b><span>Can residents interact without staff takeover?</span></div>
        </div>
      </div>`,
      'Explicit gap: Reciprocated friendship (M-05) & loneliness (M-08 / CL9) are not in ER-03; CL1 relies on proximity proxies.');
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
      `<div class="w-limits-grid">
        <div class="w-lim-card">
          <div class="w-lim-num">01 · Cluster Confounding</div>
          <h3>One care home per arm</h3>
          <div class="w-lim-pair">
            <div class="threat"><b>Threat:</b> Building layout, staff culture, or cohort mix may drive differences.</div>
            <div class="mitig"><b>Mitigation:</b> 2-week baseline ANCOVA; multi-site cluster RCT needed next.</div>
          </div>
        </div>
        <div class="w-lim-card">
          <div class="w-lim-num">02 · Proxy &amp; Time Horizon</div>
          <h3>Proximity ≠ friendship</h3>
          <div class="w-lim-pair">
            <div class="threat"><b>Threat:</b> 2m badge proximity over 5 weeks captures contact &amp; novelty, not deep ties.</div>
            <div class="mitig"><b>Mitigation:</b> Triangulate with dyad scans; add M-05 &amp; M-08 in Cycle 2.</div>
          </div>
        </div>
        <div class="w-lim-card">
          <div class="w-lim-num">03 · Unblinded Observation</div>
          <h3>Hawthorne &amp; dyad dependence</h3>
          <div class="w-lim-pair">
            <div class="threat"><b>Threat:</b> Visible robot &amp; observers alter behaviour; matched pairs are non-independent.</div>
            <div class="mitig"><b>Mitigation:</b> Identical observation schedule in Home B; pair-clustered analysis.</div>
          </div>
        </div>
        <div class="w-lim-card">
          <div class="w-lim-num">04 · Ethical &amp; Tech Tension</div>
          <h3>Location badges &amp; TECH-18 gap</h3>
          <div class="w-lim-pair">
            <div class="threat"><b>Threat:</b> Study badges clash with our no-tracking rule; local NLP (TECH-18) is unbuilt.</div>
            <div class="mitig"><b>Mitigation:</b> Separate badge consent for trial only; prepared-line + tablet build.</div>
          </div>
        </div>
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
      </div>
      <div class="w-next-board">
        <div class="w-nb-col">
          <div class="w-nb-head"><span>01</span><strong>Foundation</strong></div>
          <div class="w-nb-item"><b>HV-08 / VT-01:</b> Document LLM fluency vs. truth &amp; local-privacy trade-off</div>
          <div class="w-nb-item"><b>VT-01:</b> Residents need to know <i>how</i> Pepper knows a fact</div>
          <div class="w-nb-item"><b>HFC-17:</b> Nearby staff increase pressure to say yes</div>
        </div>
        <div class="w-nb-col">
          <div class="w-nb-head"><span>02</span><strong>Specification</strong></div>
          <div class="w-nb-item"><b>PR3 Criterion:</b> <code>0 generated utterances</code></div>
          <div class="w-nb-item"><b>F1 &amp; UC02:</b> Unsure = No (+ tap); ask with no staff nearby</div>
          <div class="w-nb-item"><b>F2 &amp; F3:</b> Places/interests only; cite source; prompt at stall</div>
        </div>
        <div class="w-nb-col">
          <div class="w-nb-head"><span>03</span><strong>Artifact</strong></div>
          <div class="w-nb-item"><b>Speech:</b> Replace cloud LLM with prepared templates</div>
          <div class="w-nb-item"><b>Input:</b> Local yes / no / “not this time” + tablet tap fallback</div>
          <div class="w-nb-item"><b>Retest:</b> Pass full EM-01 gate on physical Pepper</div>
        </div>
        <div class="w-nb-col">
          <div class="w-nb-head"><span>04</span><strong>Summative (ER-03)</strong></div>
          <div class="w-nb-item"><b>Expand Measures:</b> Add reciprocated ties (M-05) &amp; loneliness (M-08)</div>
          <div class="w-nb-item"><b>Pre-committed Triggers:</b> CL3 → pull-only; CL4 → places/interests</div>
          <div class="w-nb-item"><b>Close Loop:</b> Feed two-home verdicts into Cycle 2</div>
        </div>
      </div>`);
  });
})();
