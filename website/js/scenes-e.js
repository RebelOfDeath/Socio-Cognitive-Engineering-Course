/* Assignment sections: formative evaluation, planned summative test, next iteration.
 * Reuses the deck's colours, serif type and ruled rows. Bounded layout: heading and body in document flow.
 *
 * The formative walkthrough (WALKTHROUGH-PROTOCOL.md) has not been run, so the formative slides show its plan:
 * what each event and probe tests, and which result triggers which change. No observed numbers appear here.
 * The summative slides follow ER-03 (wiki, 3 Evaluation/b1) as written.
 */
(function () {
  'use strict';
  const { H } = K;

  function slide(A, id, out, kicker, title, lead, content, footer = '') {
    const el = H('section', 'brief-slide');
    el.dataset.stop = id;
    el.innerHTML = `<header><div class="kicker">${kicker}</div><h2>${title}</h2>${lead ? `<p class="brief-lead">${lead}</p>` : ''}</header><div class="brief-body">${content}</div>${footer ? `<div class="brief-foot">${footer}</div>` : ''}`;
    A.reveal(el, id, { a: 0.32, b: 0.95, y: 24 });
    if (out) A.conceal(el, out, { a: 0, b: 0.26 });
    return el;
  }

  function table(headings, rows, cls = '') {
    return `<table class="brief-table ${cls}"><thead><tr>${headings.map(h => `<th>${h}</th>`).join('')}</tr></thead><tbody>${rows.map(row => `<tr>${row.map(c => `<td>${c}</td>`).join('')}</tr>`).join('')}</tbody></table>`;
  }

  /* ------------------------------------------------------------ Formative */
  K.scenes.push(function formativePlan(A) {
    slide(A, 'formative-claims', 'claim-example', 'Evaluation, formative walkthrough (planned, not yet run)', 'What the walkthrough tests on the proof of concept.',
      'EM-01 on a smaller scale: the operator stages events on the build, and two evaluators log each run independently. Afterwards 4 to 6 peers each go through a private ask and an introduction, then answer a short paper probe.',
      `<div class="brief-two">
        <div>${table(['Premise', 'Staged event', 'Passes if'], [
          ['PR1', 'A says “not this time”; an unclear “hm”', 'No introduction; the “no” never reaches B'],
          ['PR2', 'Unapproved match; blocked pair; private item', 'Nobody asked; item never used'],
          ['PR3', 'Introduction; B corrects a planted wrong entry', 'Names as statements; correction within 3 s'],
          ['PR6', 'Inspection after the session', 'Listed fields only; 0 packets out; 0 audio files'],
        ], 'brief-compact')}</div>
        <div>${table(['Claim', 'Probe question', 'Scale'], [
          ['CL1', 'Would you like to meet this person again?', '1 certainly not to 5 certainly'],
          ['CL3', 'How easy was it to say no?', '1 very hard to 5 very easy'],
          ['CL4', 'Did Pepper know more about you than you’d like?', '1 not at all to 5 far too much'],
          ['Open', 'Did anything feel odd, pushy or too personal?', 'Free text'],
        ], 'brief-compact')}</div>
      </div>`,
      'Five runs per event, where EM-01 asks for 20 or 50. Peers without dementia give early signals, not validation. CL9 (loneliness) is not probed.');
  });

  K.scenes.push(function formativeChanges(A) {
    slide(A, 'formative-changes', 'summative-intro', 'Evaluation, formative walkthrough (planned)', 'Each possible result has its change agreed in advance.',
      'One problem is already known from the code: the proof of concept sends speech to Google Cloud and gets conversational replies from a hosted language model. Consent questions, introductions and corrections are prepared lines. PR6 cannot pass on this build.',
      table(['If the walkthrough shows', 'We change'], [
        ['PR1: an unclear answer is taken as a yes', 'One question per answer; no clear answer counts as no'],
        ['PR2: an unapproved or blocked match reaches a resident', 'Filter when matches are suggested, before anyone is asked'],
        ['PR3: a correction takes longer than 3 s', 'A “That’s wrong” button on the tablet; the error is flagged for the coordinator'],
        ['PR6: packets leave the home network', 'Run the model and speech inside the home, or remove the model'],
        ['CL3: two or more peers find saying no hard (1 or 2 on Q1)', 'Ask with no staff standing by; “not this time” as prominent as yes'],
        ['CL4: two or more peers feel exposed (4 or 5 on Q2)', 'Match on places and interests only (the UC02 response for CL4)'],
      ], 'brief-compact'),
      'Each change is retested on the revised build before any resident takes part.');
  });

  /* ------------------------------------------------------- Planned summative */
  K.scenes.push(function summativeIntro(A) {
    slide(A, 'summative-intro', 'verify', 'Planned summative test, introduction', 'What the walkthrough cannot settle.',
      '',
      `<div class="w-bridge-grid">
        <div class="w-bridge-card">
          <div class="w-br-id"><span class="pid">PR1 to PR3, PR6</span><span class="w-tag">Premises</span></div>
          <div class="w-br-vs">
            <div class="w-br-left"><small>Walkthrough</small><span>Five runs per event: too few for the EM-01 criteria</span></div>
            <div class="w-br-arr">→</div>
            <div class="w-br-right"><small>Summative</small><span><b>Full EM-01 runs (20 or 50)</b> on the revised build, before residents take part</span></div>
          </div>
        </div>
        <div class="w-bridge-card">
          <div class="w-br-id"><span class="pid">CL1</span><span class="w-tag">Benefit</span></div>
          <div class="w-br-vs">
            <div class="w-br-left"><small>Walkthrough</small><span>One session with peers cannot show repeat contact</span></div>
            <div class="w-br-arr">→</div>
            <div class="w-br-right"><small>Summative</small><span><b>Five weeks in two care homes</b> (ER-03); CL1 is the closest Claim to its primary hypothesis</span></div>
          </div>
        </div>
        <div class="w-bridge-card">
          <div class="w-br-id"><span class="pid alert">CL3, CL4</span><span class="w-tag alert">Adverse</span></div>
          <div class="w-br-vs">
            <div class="w-br-left"><small>Walkthrough</small><span>Peers without dementia, with invented profiles</span></div>
            <div class="w-br-arr">→</div>
            <div class="w-br-right"><small>Summative</small><span><b>Residents and relatives</b>: observation (M-07) and coded interviews (M-09), which ER-03 does not yet include</span></div>
          </div>
        </div>
        <div class="w-bridge-card dim">
          <div class="w-br-id"><span class="pid" style="color:var(--muted)">CL9</span><span class="w-tag">Exploratory</span></div>
          <div class="w-br-vs">
            <div class="w-br-left"><small>Time horizon</small><span>Loneliness changes over months</span></div>
            <div class="w-br-arr">→</div>
            <div class="w-br-right"><small>Scope</small><span><b>Not measured in ER-03</b>; reported as untested</span></div>
          </div>
        </div>
      </div>`,
      'The summative test is ER-03, the Kinnect two-site trial (method EM-08). Its two hypotheses have no Claim IDs yet.');
  });

  K.scenes.push(function verify(A) {
    slide(A, 'verify', 'study', 'Planned summative test, Premises first', 'The revised build must pass before any resident takes part.',
      'ER-03 asks for the Premises to be verified on the build first; otherwise a null result cannot be told apart from a System that did not work. Method EM-01: staged events against a reference log, team role-players, no human subjects.',
      table(['Premise, measure', 'Criterion (EM-01)', 'Verdict'], [
        ['PR1, M-01', 'A yes from both, each asked alone. A “no” mentioned to the other: <b>0/50</b>. An item used without its owner’s release: <b>0/50</b>.', 'Supported if every criterion holds in every run'],
        ['PR2, M-01, M-10', 'A resident asked about an unapproved match: <b>0/20</b>. Blocked, unreleased or sensitive items used: <b>0/50</b>.', 'Qualified if met only with a restriction, or partly untestable'],
        ['PR3, M-01', 'Names as statements, at most one item released by both: <b>20/20</b>. Script: <b>0</b> untrue lines. Correction <b>≤ 3 s</b>, error flagged.', 'Challenged if any run fails'],
        ['PR6, M-01', 'Record holds only the listed items. <b>0</b> packets leave the home network over a full test day; <b>0</b> audio files on any device.', 'A challenged Premise is fixed and rerun'],
      ], 'brief-compact'));
  });

  K.scenes.push(function studyMethod(A) {
    slide(A, 'study-method', 'measures', 'Planned summative test, method (EM-08, ER-03)', 'Who takes part, and what they do.',
      'Two-site controlled trial: two similar care homes over the same weeks, allocated by home. One runs Kinnect; the other keeps its standard social activity programme.',
      `<div class="brief-two">
        <div><div class="label">Participants</div><h3>30 recruited per home, 25 to complete</h3><p>Mild to moderate dementia or MCI: MMSE 14 to 24 or MoCA 10 to 22. Able to reach communal areas and to talk in Kinnect’s language. Consent from a representative plus the resident’s own assent; separate consent for location badges.</p><p>Care staff at both homes take part through training, protocol support and the debriefing interviews.</p></div>
        <div><div class="label">Procedure, five weeks after set-up</div><h3>Profiles, introductions, meetings</h3><p><b>Weeks −4 to 0:</b> ethics, consent, screening, baseline CMAI, badges; baseline measurement at both homes in weeks −2 to 0.<br><b>Week 1:</b> daily one-to-one sessions; profiles; first-time usability.<br><b>Weeks 2 and 3:</b> matching; Pepper asks each resident and introduces.<br><b>Weeks 3 and 4:</b> joint sessions and check-ins with matched pairs.<br><b>Week 5:</b> final CMAI, badge data, debriefing interviews.</p></div>
      </div>`, 'Taking part in any session is voluntary.');
  });

  K.scenes.push(function measures(A) {
    slide(A, 'measures', 'outcomes', 'Planned summative test, measures', 'What ER-03 measures, and what each result counts for.',
      '',
      `<div class="w-map-grid">
        <div class="w-map-row">
          <div class="w-m-inst primary"><b>M-20 Joint social time</b><span>Badges: two residents within 2 m for 5 min or more</span></div>
          <div class="w-m-link">Primary outcome ▶</div>
          <div class="w-m-claim good"><b>Primary Claim (closest: CL1)</b><span>ANCOVA, weeks 4 and 5 against the baseline weeks</span></div>
        </div>
        <div class="w-map-row">
          <div class="w-m-inst"><b>M-20 Dyads, M-22 Bedroom time</b><span>Room scans; share of waking hours in one’s own bedroom</span></div>
          <div class="w-m-link">Key secondary (Holm) ▶</div>
          <div class="w-m-claim good"><b>Primary Claim</b><span>Both must be met for the Claim to be supported</span></div>
        </div>
        <div class="w-map-row">
          <div class="w-m-inst alert"><b>M-19 Agitation (CMAI)</b><span>Week 5, with baseline CMAI as covariate</span></div>
          <div class="w-m-link alert">Harm check ▶</div>
          <div class="w-m-claim bad"><b>Primary Claim</b><span>A rise qualifies the Claim; session records are reviewed</span></div>
        </div>
        <div class="w-map-row">
          <div class="w-m-inst"><b>M-21 Engagement, M-19 Affect</b><span>Per session, Kinnect home only</span></div>
          <div class="w-m-link">Exploratory ▶</div>
          <div class="w-m-claim"><b>Within the Kinnect arm</b><span>Does conversation become more engaged over the weeks?</span></div>
        </div>
        <div class="w-map-row">
          <div class="w-m-inst"><b>M-23 First-time usability</b><span>Week-1 session logs and observation checklist</span></div>
          <div class="w-m-link">18 of 25 or more ▶</div>
          <div class="w-m-claim"><b>Usability hypothesis</b><span>Can residents use Kinnect without staff taking over?</span></div>
        </div>
      </div>`,
      'Not measured in ER-03: reciprocated friendship (M-05), loneliness (M-08, CL9), and the pressure and exposure Claims CL3 and CL4 (M-07, M-09).');
  });

  K.scenes.push(function outcomes(A) {
    slide(A, 'outcomes', 'next', 'Planned summative test, expected outcomes', 'How each result will be read.',
      'Fixed before data collection. With one home per arm, a difference shows that these two homes changed differently; it does not show that other homes would.',
      table(['', 'Supports', 'Qualifies', 'Challenges'], [
        ['Primary Claim (closest: CL1)', 'Primary outcome and both key secondary outcomes met; no rise in agitation.', 'Primary met, but a key secondary is not, or agitation rises.', 'Primary not met. Reported as “not shown”, never as “no effect”.'],
        ['Usability (M-23)', 'Lower limit of the 95% interval above .50: 18 or more of 25.', '', 'Fewer than 18 of 25: not supported.'],
        ['CL3, pressure (adverse)', 'Pressure signs or avoidance (M-07) more frequent after System introductions, or code P. Then: suggestions only for residents who ask.', '', 'Neither seen.'],
        ['CL4, exposure (adverse)', 'Residents or relatives use code S about a match. Then: match on places and interests only.', '', 'No code S.'],
      ], 'brief-verdicts brief-compact'), 'CL3 and CL4 need EM-03 or EM-04 alongside ER-03. CL9 is reported as untested.');
  });

  /* ---------------------------------------------------------- Next iteration */
  K.scenes.push(function nextIteration(A) {
    slide(A, 'next', 'again', 'Evaluation, next iteration', 'What the next SCE cycle changes, and why.',
      '',
      `<div class="cycle">
        <div><div class="label">Formative</div><p>Run the walkthrough on the proof of concept</p></div><i>→</i>
        <div><div class="label">Design changes</div><p>Apply the change agreed for each result</p></div><i>→</i>
        <div><div class="label">Revised build</div><p>Passes the full EM-01 runs</p></div><i>→</i>
        <div><div class="label">Summative test</div><p>Two homes, Claim verdicts</p></div><i>↺</i>
      </div>` +
      table(['', 'What we found', 'Why it matters', 'What we do next'], [
        ['Artifact: speech leaves the home', 'The proof of concept sends residents’ speech to Google Cloud and gets replies from a hosted model.', 'What residents say leaves the home, which TECH-07 rules out. PR6 fails, so no resident may use this build.', 'Run speech recognition on the robot (TECH-18); replace the hosted model with a local one, or remove it. Rerun EM-01.'],
        ['Foundation: HFC-17, saying no', 'The evidence that refusing face to face is hard comes from studies with healthy adults (Bohns 2016).', 'Asking each resident alone (Rule 01) and CL3 rest on it. We do not know whether a resident with dementia feels the same pressure when a robot asks, or more.', 'Count pressure signs after Pepper’s asks and after staff asks (M-07). If they are more frequent after Pepper’s, CL3 holds and Pepper only makes suggestions to residents who ask.'],
        ['Specification: Claim IDs', 'ER-03’s two hypotheses do not map to a Claim ID.', 'Without one, the study’s verdict cannot be recorded against a Claim, so it cannot change the design.', 'Narrow the primary hypothesis to UC02-F3-CL1, with bedroom time as a secondary outcome; add a Claim for first-time usability.'],
        ['Summative: what ER-03 measures', 'ER-03 measures time spent near each other (badges), not friendships, loneliness, pressure or exposure.', 'A positive result would show more time together, which falls short of the reciprocated friendships CL1 claims, and says nothing about CL3 or CL4.', 'Add friendships (M-05), pressure signs (M-07) and interviews coded P and S (M-09).'],
      ], 'brief-compact brief-next'));
  });

  /* ------------------------------------- Example: how a Claim relates to a Function (after the walkthrough tests) */
  K.scenes.push(function claimExample(A) {
    slide(A, 'claim-example', 'formative-changes', 'Evaluation, an example from UC02', 'How a Claim relates to a Function.',
      'In SCE every Claim belongs to a Function: it states an effect we expect that Function to have. A positive Claim is the reason to build the Function; an adverse Claim is a risk that, if confirmed, changes it.',
      table(['', 'Function: what Pepper does', 'Claim about that Function', 'Why we expect it', 'How we test it', 'What the verdict does to the Function'], [
        ['<span style="color:#9CC9A4">CL1</span><small>Positive</small>', '<b>F3, with F1.</b> Asks each alone, then introduces both by name with one item both released: the post office and the bakery.', 'Introductions on shared ground lead to more repeat contact and more reciprocated friendships than introductions as usual.', '<b>HFC-15:</b> people befriend people like themselves. <b>HFC-16:</b> they rarely follow up a good first talk.', '<b>M-02:</b> do they meet again within 14 days, unprompted? <b>M-05:</b> do they name each other? Two homes (EM-03).', '<b>Justifies F3.</b> Supported if M-02 and M-05 rise more in the System home, with no rise in negative emotion (M-03).'],
        ['<span style="color:var(--alert)">CL3</span><small>Adverse</small>', '<b>F1.</b> Asks the resident for a yes.', 'Residents accept out of politeness, then avoid the other.', '<b>HFC-17:</b> refusing is uncomfortable, so people agree to things they would rather not do.', '<b>M-07:</b> pressure signs during the ask (“if I must”); avoidance in the next week.', '<b>Constrains F1.</b> If more frequent after System introductions than after staff ones, F1 changes: suggestions only for residents who ask.'],
      ], 'brief-compact brief-claim'),
      'From UC02 in the wiki (2 Specification, b1). The two Claims pull on the same introduction: one is why we build it, the other limits how.');
  });
})();
