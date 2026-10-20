/* Assignment sections: UC02 criteria, formative evaluation, planned summative test, next iteration.
 * Reuses the deck's colours, serif type and ruled rows. Bounded layout: heading and body in document flow.
 *
 * Formative numbers wrapped in ph(...) are invented placeholders, not observed data. Press P in the deck to
 * highlight them; replace each with the walkthrough result (WALKTHROUGH-PROTOCOL.md) before presenting.
 */
(function () {
  'use strict';
  const { H } = K;

  function slideAB(A, id, out, kicker, title, o) {
    const el = H('section', 'brief-slide');
    el.dataset.stop = id;
    el.innerHTML = `
      <div class="ab-opt" data-ab-stop="${id}" data-ab-opt="A">
        <header><div class="kicker">${kicker}</div><h2>${title}</h2>${o.leadA ? `<p class="brief-lead">${o.leadA}</p>` : ''}</header>
        <div class="brief-body">${o.contentA}</div>
        ${o.footerA ? `<div class="brief-foot">${o.footerA}</div>` : ''}
      </div>
      <div class="ab-opt" data-ab-stop="${id}" data-ab-opt="B">
        <header><div class="kicker">${o.kickerB || kicker}</div><h2>${o.titleB || title}</h2>${o.leadB ? `<p class="brief-lead">${o.leadB}</p>` : ''}</header>
        <div class="brief-body">${o.contentB}</div>
        ${o.footerB ? `<div class="brief-foot">${o.footerB}</div>` : ''}
      </div>`;
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
  const V = {
    sup: '<span class="v sup">Supported</span>',
    qual: '<span class="v qual">Qualified</span>',
    chal: '<span class="v chal">Challenged</span>',
    risk: '<span class="v chal">Supported · risk present</span>',
    none: '<span class="v none">Not testable here</span>',
    pend: '<span class="v pend">Pending</span>',
  };

  /* ------------------------------------------------ Specification · UC02 criteria */
  K.scenes.push(function premises(A) {
    const rows = [
      ['PR1', 'Ask first', 'A “no” never reaches the other person, and nobody is introduced without two private yeses.', '0 of 50 refusals leak'],
      ['PR2', 'Approved matches only', 'Pepper only suggests pairs the coordinator approved, and never uses health, loss or family details.', '0 of 50 slips'],
      ['PR3', 'Introduce kindly', 'Both names said as plain statements, one shared thing, never “Do you remember…?”. A wrong fact is corrected at once.', '20 of 20 correct · fixed within 3 s'],
      ['PR6', 'Keep almost nothing', 'Only a short list of events is stored. No audio, and nothing leaves the care home.', '0 recordings · 0 data out'],
    ];
    slideAB(A, 'premises', 'claims', 'Specification · UC02 Premises · verification', 'Does the system do what we promised?', {
      leadA: 'Checked without residents: team members act out each situation many times and count mistakes.',
      contentA: `<div class="plain">` + rows.map(([pr, t, what, pass]) => `<div class="prow"><div class="pid">${pr}</div><div><div class="pt">${t}</div><div class="pw">${what}</div></div><div class="pass"><div class="label">Pass if</div>${pass}</div></div>`).join('') + '</div>',
      footerA: 'Method EM-01 (staged events against a reference log) · measures M-01, M-10 · full criteria in the wiki, UC02-F1-PR1 to UC02-F6-PR6.',
      contentB: `
        <div class="w-pr-grid">
          <div class="w-pr-card">
            <div class="w-pr-top"><span class="pid">PR1</span><strong>Ask First</strong><span class="w-pass-badge">Pass: 0 / 50 leaks</span></div>
            <div class="w-pr-pills">
              <span class="ok">✓ 2 private yeses before any intro</span>
              <span class="ok">✓ A “no” never reaches the other person</span>
              <span class="ok">✓ Only released profile items used</span>
            </div>
          </div>
          <div class="w-pr-card">
            <div class="w-pr-top"><span class="pid">PR2</span><strong>Approved Matches Only</strong><span class="w-pass-badge">Pass: 0 / 50 slips</span></div>
            <div class="w-pr-pills">
              <span class="ok">✓ Coordinator-approved pairs only</span>
              <span class="no">✗ Never health, loss, or family details</span>
              <span class="no">✗ Never blocked pairs</span>
            </div>
          </div>
          <div class="w-pr-card">
            <div class="w-pr-top"><span class="pid">PR3</span><strong>Introduce Kindly</strong><span class="w-pass-badge">Pass: 20 / 20 · ≤ 3 s</span></div>
            <div class="w-pr-pills">
              <span class="ok">✓ Plain name statements + 1 shared fact</span>
              <span class="no">✗ Never “Do you remember…?”</span>
              <span class="ok">✓ Wrong fact admitted &amp; flagged ≤ 3 s</span>
            </div>
          </div>
          <div class="w-pr-card">
            <div class="w-pr-top"><span class="pid">PR6</span><strong>Keep Almost Nothing</strong><span class="w-pass-badge">Pass: 0 audio · 0 out</span></div>
            <div class="w-pr-pills">
              <span class="ok">✓ Short event counters only</span>
              <span class="no">✗ 0 audio recordings</span>
              <span class="no">✗ 0 packets leave care home network</span>
            </div>
          </div>
        </div>`,
      footerB: 'EM-01 Verification (staged role-play against reference log, no residents needed) · Measures M-01, M-10.',
    });
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
    slideAB(A, 'claims', 'poc', 'Specification · UC02 Claims · validation', 'Does it help, and could it hurt?', {
      leadA: 'Only real residents, over weeks, can answer this. That is what the summative study is for.',
      contentA: `<div class="claims2"><div><div class="label" style="color:var(--jan)">What we hope for</div>${hope.map(card).join('')}</div>
        <div><div class="label" style="color:var(--alert)">Risks we watch for</div>${risk.map(card).join('')}</div></div>`,
      footerA: 'Measures M-02, M-03, M-05, M-07, M-08, M-09 · full validation criteria in the wiki, UC02-F3-CL1 to UC02-F3-CL9.',
      contentB: `
        <div class="w-claims-matrix">
          <div class="w-cm-col">
            <div class="w-cm-head good"><span>✦ Intended Benefits</span><i>Tested over weeks with residents</i></div>
            <div class="w-cm-card good">
              <div class="w-cm-row1"><span class="pid">CL1</span><strong>They meet again &amp; form ties</strong><span class="w-tag">Primary</span></div>
              <div class="w-cm-flow">
                <span>1-to-1 Intro</span><i>→</i><span>Voluntary repeat contact ↑</span><i>→</i><span>Reciprocated ties ↑</span>
              </div>
              <div class="w-cm-meta">📊 <b>Measures:</b> Proximity badges (M-20), Dyads, Mood, Friendship (M-05)</div>
            </div>
            <div class="w-cm-card dim">
              <div class="w-cm-row1"><span class="pid">CL9</span><strong>They feel less lonely</strong><span class="w-tag">Long-Term Exploratory</span></div>
              <div class="w-cm-flow">
                <span>Months of stable ties</span><i>→</i><span>Loneliness score ↓</span>
              </div>
              <div class="w-cm-meta">📋 <b>Measure:</b> Loneliness scale (M-08) · <i>Slow to shift; not expected in 5 weeks</i></div>
            </div>
          </div>
          <div class="w-cm-col">
            <div class="w-cm-head bad"><span>⚠ Adverse Risks &amp; Pre-Committed Fallbacks</span><i>Built-in safety triggers</i></div>
            <div class="w-cm-card bad">
              <div class="w-cm-row1"><span class="pid alert">CL3</span><strong>Polite “yes”, later avoidance</strong><span class="w-tag alert">Social Pressure</span></div>
              <div class="w-cm-flow">
                <span>Feels rude to refuse</span><i>→</i><span>Avoids lounge / Agitation ↑</span>
              </div>
              <div class="w-cm-fix">🔧 <b>If triggered:</b> Switch to <b>pull-only</b> (offer introductions only when asked)</div>
            </div>
            <div class="w-cm-card bad">
              <div class="w-cm-row1"><span class="pid alert">CL4</span><strong>Matching feels exposing</strong><span class="w-tag alert">Privacy Risk</span></div>
              <div class="w-cm-flow">
                <span>Personal life facts used</span><i>→</i><span>“How does it know that?”</span>
              </div>
              <div class="w-cm-fix">🔧 <b>If triggered:</b> Restrict matching to <b>places &amp; general interests only</b></div>
            </div>
          </div>
        </div>`,
      footerB: 'Validation requires real residents over weeks · Measures M-02, M-03, M-05, M-07, M-08, M-09.',
    });
  });

  /* ------------------------------------------------------------ Formative */
  K.scenes.push(function formativeMethod(A) {
    slideAB(A, 'formative-method', 'poc-wrong', 'Evaluation · Formative evaluation · method', 'How we tested the prototype.', {
      contentA: `<div class="fmethod">
        <div><div class="label">Part 1 · Premises</div><h3>Does it work?</h3><p>The team acted out <b>${ph('11')} situations</b> in the prototype, <b>${ph('5')} times each</b>: refusals, unapproved matches, a planted wrong fact, the record afterwards. Two evaluators who did not write the script checked every step.</p></div>
        <div><div class="label">Part 2 · Claims</div><h3>How does it feel?</h3><p><b>${ph('5')} peers</b> played residents talking to the prototype. After each private ask and each introduction they answered three questions: was it easy to say no? did Pepper know too much? would you meet this person again?</p></div>
      </div>
      <div class="rule-strip" style="margin-top:44px"><b>A signal, not proof.</b> An on-screen prototype, not the robot; peers, not residents with dementia; one session each.</div>`,
      footerA: 'Method: EM-01 staged events against a reference log, plus a short probe (M-07 / M-09 style questions). Fewer runs than EM-01’s 20 / 50.',
      contentB: `
        <div class="w-fmethod-tracks">
          <div class="w-fm-track">
            <div class="w-fmt-head"><span class="w-badge gold">Track 1 · Premises (EM-01 Verification)</span><strong>Does it keep its rules?</strong></div>
            <div class="w-fmt-pipeline">
              <div class="w-fmt-node"><div class="big">${ph('11')} × ${ph('5')}</div><span><b>${ph('55')} Staged Runs</b><br>Refusals, blocked pairs, wrong fact, record</span></div>
              <div class="w-fmt-arr">→</div>
              <div class="w-fmt-node"><div class="big">2</div><span><b>Blind Evaluators</b><br>Did not write script; checked vs. reference log</span></div>
            </div>
          </div>
          <div class="w-fm-track">
            <div class="w-fmt-head"><span class="w-badge elena">Track 2 · Claims (Role-Play Probe)</span><strong>How does it feel to be asked?</strong></div>
            <div class="w-fmt-pipeline">
              <div class="w-fmt-node"><div class="big">${ph('5')}</div><span><b>Peer Role-Players</b><br>Assigned resident personas &amp; profiles</span></div>
              <div class="w-fmt-arr">→</div>
              <div class="w-fmt-node"><div class="big">3 Qs</div><span><b>Post-Ask &amp; Post-Intro Probe</b><br>1. Easy to say no? · 2. Knew too much? · 3. Meet again?</span></div>
            </div>
          </div>
        </div>
        <div class="w-scope-strip">
          <span class="w-ss-title">⚠ Early Signal, Not Proof</span>
          <span class="w-ss-pill">🖥️ On-screen UI (not physical Pepper)</span>
          <span class="w-ss-pill">👥 5 peers (not dementia residents)</span>
          <span class="w-ss-pill">⏱️ 1 session (smaller than EM-01’s 20/50 runs)</span>
        </div>`,
      footerB: 'Formative Walkthrough Protocol · EM-01 staged events + M-07 / M-09 perception probes.',
    });
  });

  K.scenes.push(function formativePremises(A) {
    const ok = '<span class="mark ok">✓</span>', no = '<span class="mark no">✗</span>';
    const rows = [
      [ok, 'PR2', 'Approved matches only', `Held: no unapproved match, blocked pair or private detail in ${ph('15')} runs.`, V.sup],
      [no, 'PR1', 'Ask first', `Broke once: an unsure “hm, okay” was counted as a yes (${ph('1 of 20')}). No “no” ever reached the other person.`, V.chal],
      [no, 'PR3', 'Introduce kindly', `Names were right every time, but ${ph('2 of 5')} corrections were slow, and once it said “Do you remember the bakery?”.`, V.chal],
      [no, 'PR6', 'Keep almost nothing', 'The record was fine and no audio was kept, but every sentence went to an online AI service.', V.chal],
    ];
    slideAB(A, 'formative-premises', 'formative-claims', 'Evaluation · Formative findings · Premises', 'Did the prototype keep its promises?', {
      contentA: `<div class="plain">` + rows.map(([m, pr, t, what, v]) => `<div class="frow">${m}<div><div class="pt"><span class="pid">${pr}</span> ${t}</div><div class="pw">${what}</div></div><div>${v}</div></div>`).join('') + '</div>',
      footerA: 'Supported = every criterion met in this prototype · challenged = a criterion failed. The last two both come from the online language model.',
      contentB: `
        <div class="w-scorecard">
          <div class="w-sc-row ok">
            <div class="w-sc-id"><span class="mark ok">✓</span><b>PR2</b><span>Approved Matches</span></div>
            <div class="w-sc-meter"><div class="bar"><i style="width:100%"></i></div><span><b>${ph('15 / 15')}</b> clean · 0 unapproved · 0 private details</span></div>
            <div class="w-sc-cause">Rule engine held</div>
            <div>${V.sup}</div>
          </div>
          <div class="w-sc-row no">
            <div class="w-sc-id"><span class="mark no">✗</span><b>PR1</b><span>Ask First</span></div>
            <div class="w-sc-meter"><div class="bar"><i class="warn" style="width:95%"></i></div><span><b>${ph('0 / 15')}</b> leaks · <b>${ph('1 / 20')}</b> unsure <i>“hm, okay”</i> taken as yes</span></div>
            <div class="w-sc-cause alert">Ambiguous speech</div>
            <div>${V.chal}</div>
          </div>
          <div class="w-sc-row no llm-group">
            <div class="w-sc-id"><span class="mark no">✗</span><b>PR3</b><span>Introduce Kindly</span></div>
            <div class="w-sc-meter"><div class="bar"><i class="bad" style="width:60%"></i></div><span><b>${ph('3 / 5')}</b> fixes ≤ 3 s · <b>1</b> asked <i>“Do you remember the bakery?”</i></span></div>
            <div class="w-sc-cause llm">⚡ Hosted LLM</div>
            <div>${V.chal}</div>
          </div>
          <div class="w-sc-row no llm-group">
            <div class="w-sc-id"><span class="mark no">✗</span><b>PR6</b><span>Keep Almost Nothing</span></div>
            <div class="w-sc-meter"><div class="bar"><i class="bad" style="width:50%"></i></div><span><b>0</b> audio kept · <b>Every utterance</b> sent to cloud LLM API</span></div>
            <div class="w-sc-cause llm">⚡ Hosted LLM</div>
            <div>${V.chal}</div>
          </div>
        </div>`,
      footerB: 'Key insight: Both PR3 (improvised question + latency) and PR6 (cloud traffic) failed because of the hosted language model.',
    });
  });

  K.scenes.push(function formativeClaims(A) {
    const cards = [
      ['ok', ph('4 of 5'), 'would meet their partner again', 'The shared item opened every conversation.', 'CL1 · positive signal'],
      ['mid', ph('1 of 5'), 'found saying no hard', '“It felt rude to refuse something so polite.”', 'CL3 · weak signal'],
      ['no', ph('2 of 5'), 'felt Pepper knew too much', '“How does it know where I worked?”', 'CL4 · risk seen'],
    ];
    slideAB(A, 'formative-claims', 'formative-changes', 'Evaluation · Formative findings · Claims', 'How did it feel to be asked?', {
      contentA: `<div class="fcards">` + cards.map(([c, n, t, q, tag]) => `<div class="fcard ${c}"><div class="big">${n}</div><div class="ft">${t}</div><div class="fq">${q}</div><div class="ftag">${tag}</div></div>`).join('') + `</div>
      <div class="surprise"><b>Surprise.</b> Pepper suggested an activity while ${ph('2 of 5')} pairs were still talking, and they ignored it.</div>`,
      footerA: 'Five peers without dementia: early signals, not validation. CL9 (loneliness) cannot be tested in one session.',
      contentB: `
        <div class="fcards w-fcards-b">
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
      footerB: '5 peer role-players (1 session): early signals only. CL9 (loneliness) requires months.',
    });
  });

  K.scenes.push(function formativeChanges(A) {
    const rows = [
      ['Online AI service, wrong phrasing', 'Prepared lines only. Nothing goes online.', 'PR3 · PR6'],
      ['“Hm, okay” counted as yes', 'Unsure means no. A yes is confirmed with one tap.', 'PR1'],
      ['“How does it know?”', 'Pepper says where it knows something from. Matching uses places and interests only.', 'CL4'],
      ['Hesitation with staff nearby', 'Pepper asks with no staff standing by.', 'CL3'],
      ['Activity interrupted the talk', 'Offered only when the talk stalls, or at the end.', 'surprise'],
    ];
    slideAB(A, 'formative-changes', 'formative-live', 'Evaluation · Formative evaluation · design changes', 'What we change before it runs on Pepper.', {
      contentA: `<div class="plain">` + rows.map(([f, c, tag]) => `<div class="crow"><div class="cf">${f}</div><div class="arrow">→</div><div class="cc">${c}</div><div class="ctag">${tag}</div></div>`).join('') + '</div>',
      footerA: 'Each change is rechecked on the revised prototype, then on Pepper itself, before the summative study.',
      contentB: `
        <div class="w-changes-grid">
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
      footerB: 'All 5 fixes are re-verified on the revised build before any resident testing.',
    });
  });

  K.scenes.push(function formativeLive(A) {
    slideAB(A, 'formative-live', 'summative-intro', 'Evaluation · Formative evaluation · live cognitive walkthrough', 'Live walkthrough: Pepper as a connection-maker.', {
      leadA: `For our live session (${ph('10+')} concurrent participants), visitors role-play an older resident, interact with Pepper’s chest tablet, and complete an in-app feedback form.`,
      contentA: `<div class="live-grid">
        <div class="art-cols live-cols">
          <div><div class="label">Role-play personas &amp; connection-making</div><p>On entry, each participant is assigned <b>Elena (81)</b>, botanical illustrator with early-onset Alzheimer’s; <b>Jan (75)</b>, former lighthouse keeper who just moved in; or <b>Ria (79)</b>, former theatre costume designer. Rather than only proposing walks, Pepper acts as a <b>connection-maker</b>—suggesting introductions and shared activities (chess, stargazing, classical vinyl, sketching, greenhouse tea) with a 2×2 resident photo grid.</p></div>
          <div><div class="label">Human-factor workarounds &amp; embodied view</div><p>Supports <b>visual &amp; biographical name lookup</b> when a resident forgets a name (e.g. <i>“What was the name of the gray-haired man with the yellow cat on his shirt?”</i> → Willem, 84) and word-finding slips. Recorded Pepper animations (wave hello, nod yes, gesture no, talk) pair with a tracked chest-tablet bezel, large typeface, and an outside <b>Enlarge Tablet</b> button for mobile.</p></div>
          <div><div class="label">Scientific controls &amp; feedback form</div><p>Participants test <b>speech rate</b> (Slow 0.8×, Calm 1.0×, Brisk 1.25×) and <b>conversation style</b> (Warm &amp; chatty vs. Direct &amp; brief) with gestures enabled, then submit a 6-item <b>Participant Feedback Form</b> rating connection-making, tablet legibility, speech rate, directness, and gesturing.</p></div>
        </div>
        <div class="live-shots">
          <figure><img src="img/poc/Screenshot 2026-10-20 013151.png" alt="Pepper robot simulation holding the chest tablet"><figcaption>Embodied Pepper simulation · tracked chest tablet &amp; enlarge button</figcaption></figure>
          <figure><img src="img/poc/Screenshot 2026-10-20 013239.png" alt="Participant Feedback Form"><figcaption>In-app Participant Feedback Form · 6 evaluation items</figcaption></figure>
        </div>
      </div>`,
      footerA: `Live cognitive walkthrough prototype · ${K.ref('github.com/gintskk/sce-poc', K.POC)} · responses logged via POST /api/feedback.`,
      contentB: `
        <div class="live-grid" style="margin-top:10px">
          <div class="w-live-board">
            <div class="w-lb-card">
              <div class="w-lb-head"><span class="w-badge elena">1 · Role-Play Personas (${ph('10+')} Concurrent Users)</span></div>
              <div class="w-persona-strip">
                <div class="w-p-pill"><b>Elena, 81</b><span>Botanical illustrator · Early Alzheimer’s</span></div>
                <div class="w-p-pill"><b>Jan, 75</b><span>Lighthouse keeper · New arrival</span></div>
                <div class="w-p-pill"><b>Ria, 79</b><span>Costume designer · Seeks peers</span></div>
              </div>
            </div>
            <div class="w-lb-card">
              <div class="w-lb-head"><span class="w-badge gold">2 · Connection-Maker &amp; Visual Name Lookup</span></div>
              <div class="w-lookup-flow">
                <div class="w-lf-q">“Gray-haired man with the yellow cat on his shirt?”</div>
                <div class="w-lf-arr">→</div>
                <div class="w-lf-a"><b>Willem, 84</b><span>2×2 Photo Grid</span></div>
              </div>
              <div class="w-act-pills">
                <span>♟️ Chess</span><span>🔭 Stargazing</span><span>🎵 Classical Vinyl</span><span>✏️ Sketching</span><span>🍵 Greenhouse Tea</span>
              </div>
            </div>
            <div class="w-lb-card">
              <div class="w-lb-head"><span class="w-badge">3 · Live Scientific Controls → 6-Item Feedback Form</span></div>
              <div class="w-ctrl-row">
                <div class="w-ctrl-group"><span>Speech Rate</span><b>0.8×</b><b class="on">1.0×</b><b>1.25×</b></div>
                <div class="w-ctrl-group"><span>Style</span><b class="on">Warm &amp; Chatty</b><b>Direct &amp; Brief</b></div>
                <div class="w-ctrl-group"><span>Mobile UI</span><b class="on">🔍 Enlarge Tablet</b></div>
              </div>
            </div>
          </div>
          <div class="live-shots">
            <figure><img src="img/poc/Screenshot 2026-10-20 013151.png" alt="Pepper robot simulation holding the chest tablet"><figcaption>Embodied Pepper simulation · tracked chest tablet &amp; enlarge button</figcaption></figure>
            <figure><img src="img/poc/Screenshot 2026-10-20 013239.png" alt="Participant Feedback Form"><figcaption>In-app Participant Feedback Form · 6 evaluation items</figcaption></figure>
          </div>
        </div>`,
      footerB: `Live cognitive walkthrough prototype · ${K.ref('github.com/gintskk/sce-poc', K.POC)} · 6-item ratings logged via POST /api/feedback.`,
    });
  });

  /* ------------------------------------------------------- Planned summative */
  K.scenes.push(function summativeIntro(A) {
    slideAB(A, 'summative-intro', 'verify', 'Planned summative test · introduction', 'What the walkthrough cannot settle.', {
      leadA: 'The summative test re-verifies the UC02 Premises on the revised build, then validates the UC02 Claims with residents in the Kinnect two-home study (ER-03).',
      contentA: table(['Addresses', 'Why the formative check is not enough'], [
        ['<span class="brief-id">PR1, PR2, PR3, PR6</span><small>Verification</small>', 'The walkthrough ran fewer events than EM-01 asks, on a build whose speech will change. The revised build must pass every criterion at full size (20 / 50 runs) before residents take part.'],
        ['<span class="brief-id">CL1</span><small>Validation · benefit</small>', 'Whether introduced residents spend time together again only shows over weeks, between real residents in their own home.'],
        ['<span class="brief-id">CL3, CL4</span><small>Validation · risks</small>', 'Pressure and exposure are felt by residents with dementia, in daily routines with real staff and real profiles, including by those who decline.'],
        ['<span class="brief-id">CL9</span><small>Validation · exploratory</small>', 'Loneliness changes over months. The five-week study does not measure it; we say so.'],
      ]),
      contentB: `
        <div class="w-bridge-grid">
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
      footerB: 'Two-stage summative architecture: Stage 1 Full EM-01 Verification Gate → Stage 2 Two-Home Controlled Trial (ER-03).',
    });
  });

  K.scenes.push(function verify(A) {
    slideAB(A, 'verify', 'study', 'Planned summative test · verification gate', 'The revised build must pass before any resident takes part.', {
      leadA: 'Method: EM-01 staged events on the versioned build, against a reference log. Team role-players; no human subjects.',
      contentA: table(['Premise · measure', 'Supported if', 'Qualified / challenged if'], [
        ['PR1 · M-01', 'Two private yeses every time; refusal disclosed and unreleased item used <b>0/50</b>.', 'Uncovered case: qualified. Any consent or disclosure violation: challenged; fix and rerun.'],
        ['PR2 · M-01, M-10', 'Unapproved offers <b>0/20</b>; blocked, unreleased or sensitive items used <b>0/50</b>.', 'Uncovered case: qualified. Any prohibited offer or item: challenged.'],
        ['PR3 · M-01', 'Prepared lines only; script <b>20/20</b>; correction <b>≤ 3 s</b>, error flagged.', 'Timing met only with the tablet fallback: qualified. Any untrue or quizzing line: challenged.'],
        ['PR6 · M-01', 'Listed record fields only; <b>0</b> packets leave the home network over a full test day; <b>0</b> audio files.', 'Incomplete inspection: qualified. Any packet or audio file: challenged.'],
      ], 'brief-compact'),
      footerA: 'A challenged safety or privacy Premise blocks resident use until it is repaired and retested.',
      contentB: `
        <div class="w-gate-diagram">
          <div class="w-gd-inputs">
            <div class="label" style="margin-bottom:10px">EM-01 Full-Scale Staged Stress Test (No Residents)</div>
            <div class="w-gd-box"><b>PR1 · Consent</b><span><b>0 / 50</b> refusal or private leaks · 2 private yeses</span></div>
            <div class="w-gd-box"><b>PR2 · Matching</b><span><b>0 / 20</b> unapproved · <b>0 / 50</b> health/loss/blocked</span></div>
            <div class="w-gd-box"><b>PR3 · Phrasing</b><span><b>20 / 20</b> prepared lines · Fix &amp; flag <b>≤ 3.0 s</b></span></div>
            <div class="w-gd-box"><b>PR6 · Network</b><span><b>0</b> outbound packets (24h capture) · <b>0</b> audio files</span></div>
          </div>
          <div class="w-gd-arrow">⟹</div>
          <div class="w-gd-traffic">
            <div class="label" style="margin-bottom:10px">Gate Verdict &amp; Trial Authorization</div>
            <div class="w-gt-light sup">
              <span class="dot">🟢</span>
              <div><strong>Supported (All Thresholds Met)</strong><span>Cleared to deploy in Home A for resident trial</span></div>
            </div>
            <div class="w-gt-light qual">
              <span class="dot">🟡</span>
              <div><strong>Qualified (Met via Fallback)</strong><span>E.g., ≤ 3 s met only via tablet tap; proceed with scope note</span></div>
            </div>
            <div class="w-gt-light chal">
              <span class="dot">🔴</span>
              <div><strong>Challenged (Any Safety / Privacy Breach)</strong><span><b>HARD STOP:</b> Block resident trial; repair &amp; rerun EM-01</span></div>
            </div>
          </div>
        </div>`,
      footerB: 'Zero-tolerance gate: No resident is exposed to the robot until PR1, PR2, PR3, and PR6 pass at full sample size.',
    });
  });

  K.scenes.push(function studyMethod(A) {
    slideAB(A, 'study-method', 'measures', 'Planned summative test · method · EM-08 / ER-03', 'Who takes part, and what they do.', {
      leadA: 'Two-site controlled trial: two similar care homes at the same time, allocated by home. One runs Kinnect; the other keeps its standard social activity programme.',
      contentA: `<div class="brief-two">
        <div><div class="label">Human subjects</div><h3>30 recruited per home, 25 to complete</h3><p>Mild to moderate dementia or MCI: MMSE 14–24 or MoCA 10–22. Can reach communal areas and talk in Kinnect’s language. Representative consent plus the resident’s own assent; separate consent for location badges.</p><p>Care staff at both homes; staff training at the Kinnect home.</p></div>
        <div><div class="label">Tasks and procedure · five weeks</div><h3>Profiles → introductions → meetings</h3><p><b>Weeks −4 to 0:</b> ethics, consent, screening, baseline CMAI, badges; baseline at both homes in weeks −2 to 0.<br><b>Week 1:</b> daily one-to-one sessions; profiles; usability baseline.<br><b>Weeks 2–3:</b> matching; Pepper asks and introduces.<br><b>Weeks 3–4:</b> joint sessions and check-ins with matched pairs.<br><b>Week 5:</b> final CMAI, badge data, debriefing interviews.</p></div>
      </div>`,
      footerA: 'Every session is optional. The comparison home is offered Kinnect after the study.',
      contentB: `
        <div class="w-study-layout">
          <div class="w-cohort-card">
            <div class="label" style="color:var(--elena)">Participants &amp; Ethics (Per Care Home)</div>
            <div class="w-funnel">
              <div class="w-fn-box"><b>30</b><span>Recruited</span></div>
              <div class="w-fn-arr">→</div>
              <div class="w-fn-box accent"><b>25</b><span>Target Completers</span></div>
              <div class="w-fn-Note">× 2 Homes<br>(N = 50 total)</div>
            </div>
            <div class="w-criteria-chips">
              <span>🧠 Mild–Moderate Dementia / MCI (MMSE 14–24 · MoCA 10–22)</span>
              <span>🚶 Able to reach communal lounge &amp; converse</span>
              <span>✍️ Dual Consent: Legal Representative + Resident Assent</span>
              <span>📍 Separate opt-in consent for proximity badges</span>
            </div>
          </div>
          <div class="w-stepper-card">
            <div class="label" style="color:var(--sys)">9-Week Trial Protocol (Both Homes Tracked in Parallel)</div>
            <div class="w-stepper">
              <div class="w-st-row"><span class="wk">Wks −4–0</span><strong>Setup &amp; 2-Wk Baseline</strong><span>Ethics, screening, baseline CMAI &amp; proximity badges</span></div>
              <div class="w-st-row"><span class="wk gold">Week 1</span><strong>1-on-1 Intake &amp; Usability</strong><span>Profile tagging with family; first-time usability (M-23)</span></div>
              <div class="w-st-row"><span class="wk gold">Wks 2–3</span><strong>Matching &amp; Private Asks</strong><span>Coordinator approves pairs; Pepper runs UC02 steps 3–5</span></div>
              <div class="w-st-row"><span class="wk gold">Wks 3–4</span><strong>Joint Sessions &amp; Follow-Ups</strong><span>Matched pairs meet; private “meet again?” check-ins</span></div>
              <div class="w-st-row"><span class="wk">Week 5</span><strong>Post-Test &amp; Coded Debriefs</strong><span>Final CMAI, badge readout, resident/staff/family interviews</span></div>
            </div>
          </div>
        </div>`,
      footerB: 'Every session is voluntary. Comparison home (Home B) is offered Kinnect after Week 5.',
    });
  });

  K.scenes.push(function measures(A) {
    slideAB(A, 'measures', 'outcomes', 'Planned summative test · measures', 'Which measure speaks to which Claim.', {
      leadA: 'ER-03’s measures, with the UC02 Claim each one informs. ANCOVA on change from baseline (weeks −2 to 0) to weeks 4–5, secondary outcomes under Holm’s correction.',
      contentA: table(['ER-03 measure', 'How', 'Informs'], [
        ['<b>M-20</b> joint social time <small>primary</small>', 'Badges: two residents ≥ 5 min within 2 m, checked by room scans; dyadic interactions', '<b>CL1</b>, as a proxy for repeat contact'],
        ['<b>M-21</b> conversational engagement · <b>M-22</b> bedroom time', 'Turn-taking and coherence computed on the robot; share of the waking day in one’s bedroom', '<b>CL1</b> secondary; time alone'],
        ['<b>M-19</b> agitation <small>harm check</small>', 'CMAI at baseline and week 5; affect around sessions', '<b>CL3</b> harm signal'],
        ['Week-5 debriefing interviews', 'Residents, relatives, staff; coded P (pressure) and S (exposure), as M-09', '<b>CL3</b>, <b>CL4</b>'],
        ['<b>M-23</b> first-time usability <small>secondary claim</small>', 'Week-1 logs and checklist: ≥ 18 of 25 meet the criterion', 'Can residents use it at all'],
      ], 'brief-compact'),
      footerA: 'Not measured: reciprocated friendship (M-05) and loneliness (M-08). CL1 is tested through proxies; CL9 stays untested in this study.',
      contentB: `
        <div class="w-map-grid">
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
      footerB: 'Explicit gap: Reciprocated friendship (M-05) & loneliness (M-08 / CL9) are not in ER-03; CL1 relies on proximity proxies.',
    });
  });

  K.scenes.push(function outcomes(A) {
    slideAB(A, 'outcomes', 'limitations', 'Planned summative test · expected outcomes', 'How each criterion will be applied.', {
      leadA: 'Fixed before data collection. For an adverse Claim, “supported” means the risk is real and its pre-committed change applies.',
      contentA: table(['', 'Supports', 'Qualifies', 'Challenges'], [
        ['PR1–PR3, PR6', 'Every criterion met on the revised build.', 'Met with a scope restriction (e.g. tablet-only answers).', 'Any violation: no resident testing until fixed.'],
        ['CL1 · benefit', 'M-20 arm effect positive (p < .05) and more dyadic interactions after Holm.', 'Only one of the two, or the effect fades in week 5.', 'No difference. Not proof of no effect with one home per arm.'],
        ['CL3 · pressure', 'CMAI rises (CI excludes 0) or P codes in interviews.', 'Signals only when staff stand by, or few decliners interviewed.', 'No rise, no P codes, decliners covered.'],
        ['CL4 · exposure', 'S codes about a match from residents or relatives.', 'S codes only about how Pepper knows, not what is shared.', 'No S codes.'],
        ['Usability (M-23)', '≥ 18 of 25 meet the criterion.', 'Met only with the tablet fallback.', 'Fewer than 18: simplify before anything else.'],
      ], 'brief-verdicts brief-compact'),
      footerA: 'CL9 is not addressed by this study and is reported as untested.',
      contentB: `
        <div class="w-verdict-matrix">
          <div class="w-vm-head">
            <div>Target</div>
            <div class="sup">🟢 Supports</div>
            <div class="qual">🟡 Qualifies</div>
            <div class="chal">🔴 Challenges</div>
          </div>
          <div class="w-vm-row">
            <div class="w-vm-id"><b>PR1–3, PR6</b><span>Verification Gate</span></div>
            <div class="w-vm-cell sup">100% pass at full N (20 / 50)</div>
            <div class="w-vm-cell qual">Pass requires tablet fallback</div>
            <div class="w-vm-cell chal">Any breach → <b>Block trial</b></div>
          </div>
          <div class="w-vm-row">
            <div class="w-vm-id"><b>CL1</b><span>Repeat Contact</span></div>
            <div class="w-vm-cell sup"><b>M-20 ↑</b> (p &lt; .05) <b>+ Dyads ↑</b></div>
            <div class="w-vm-cell qual">Only 1 rises, or fades by Wk 5</div>
            <div class="w-vm-cell chal">Null difference between homes</div>
          </div>
          <div class="w-vm-row adverse">
            <div class="w-vm-id"><b class="alert">CL3 (Risk)</b><span>Polite Pressure</span></div>
            <div class="w-vm-cell chal"><b>CMAI ↑</b> or <b>P-codes</b> → <i>Go pull-only</i></div>
            <div class="w-vm-cell qual">Pressure only with staff nearby</div>
            <div class="w-vm-cell sup">No CMAI rise &amp; 0 P-codes</div>
          </div>
          <div class="w-vm-row adverse">
            <div class="w-vm-id"><b class="alert">CL4 (Risk)</b><span>Felt Exposure</span></div>
            <div class="w-vm-cell chal"><b>S-codes</b> on match → <i>Places/interests</i></div>
            <div class="w-vm-cell qual">S-codes only on source phrasing</div>
            <div class="w-vm-cell sup">0 S-codes from residents/family</div>
          </div>
          <div class="w-vm-row">
            <div class="w-vm-id"><b>M-23</b><span>Usability</span></div>
            <div class="w-vm-cell sup"><b>≥ 18 / 25</b> complete unaided</div>
            <div class="w-vm-cell qual">≥ 18 / 25 via tablet buttons only</div>
            <div class="w-vm-cell chal">&lt; 18 / 25 → Simplify UI first</div>
          </div>
        </div>`,
      footerB: 'Note: For adverse risk claims (CL3, CL4), “Supported” means the harm occurred and triggers our pre-committed design fallback.',
    });
  });

  K.scenes.push(function limitations(A) {
    slideAB(A, 'limitations', 'next', 'Planned summative test · limitations', 'What this design can, and cannot, settle.', {
      contentA: `<div class="brief-two brief-four">
        <div><div class="label">Site confounding</div><h3>One home per arm</h3><p>Staff, building and resident mix may explain a difference. Baseline adjustment helps; only more homes remove it.</p></div>
        <div><div class="label">Proxies and time</div><h3>Proximity is not friendship</h3><p>Five weeks and badge proximity show contact, not reciprocated ties or less loneliness. Novelty fades over the same weeks.</p></div>
        <div><div class="label">Observation</div><h3>Hawthorne, no blinding</h3><p>Being watched changes behaviour in both homes; observers know which home has Kinnect; matched residents are not independent.</p></div>
        <div><div class="label">Technology and ethics</div><h3>Badges and an unbuilt Pepper</h3><p>Badges sit uneasily with our rejection of location tracking; separate consent limits this. The on-robot language processing (TECH-18) does not exist yet.</p></div>
      </div>`,
      contentB: `
        <div class="w-limits-grid">
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
        </div>`,
    });
  });

  /* ---------------------------------------------------------- Next iteration */
  K.scenes.push(function nextIteration(A) {
    const cycleHtml = `<div class="cycle">
      <div><div class="label">Formative findings</div><p>PR1, PR3, PR6 challenged · CL4 risk seen · CL1 positive signal</p></div><i>→</i>
      <div><div class="label">Design changes</div><p>Prepared lines, local only · clear yes · places and interests</p></div><i>→</i>
      <div><div class="label">Revised build</div><p>Passes the full EM-01 gate</p></div><i>→</i>
      <div><div class="label">Summative test</div><p>Two homes · Claim verdicts</p></div><i>↺</i>
    </div>`;
    slideAB(A, 'next', 'again', 'Evaluation · next iteration', 'From walkthrough findings to the next SCE cycle.', {
      contentA: cycleHtml + table(['Layer', 'What changes in the next iteration'], [
        ['Foundation', `Record the trade-off we met in the build: a language model makes conversation easier but cannot be checked for truth (HV-08) or kept in the home (VT-01). Add to VT-01 that people want to know <b>how</b> Pepper knows something, and to HFC-17 that a bystander makes refusing harder.`],
        ['Specification', `PR3 gets a new criterion: <b>0 generated utterances</b>. F1: no clear answer = no. F2: places and interests only. F3: source line; activity only at a stall or the end. UC02 step 3 without staff nearby.`],
        ['Artifact', 'Prepared lines only, local recognition of yes / no / “not this time”, tablet fallback; rerun the walkthrough on the revised build.'],
        ['Summative in the cycle', 'Add the missing Claim measures (reciprocated ties M-05, loneliness M-08) to ER-03; its verdicts feed the next Foundation. If CL3 or CL4 is supported: introductions only on request, or places and interests only.'],
      ], 'brief-compact'),
      contentB: cycleHtml + `
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
        </div>`,
    });
  });
})();
