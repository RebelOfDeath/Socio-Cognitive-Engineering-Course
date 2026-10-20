/*
 * Shared vocabulary for the story: stops, chapters, palette, DOM helpers and
 * the recurring illustration (the floor plan of the home, with its residents
 * as dots). Scene files push builder functions onto K.scenes; main.js runs
 * them in order.
 */
(function () {
  'use strict';

  const NS = 'http://www.w3.org/2000/svg';
  const art = document.getElementById('art');
  const layer = document.getElementById('layer');

  const C = {
    bg: '#1A2340', bg2: '#243054', card: '#243054', ink: '#F4EAD5', line: '#4E4B46', muted: 'rgba(244,234,213,.46)',
    elena: '#D4A574', jan: '#F4EAD5', sys: '#E8C77A', myra: '#A9B4D6', mc: '#8C8A84', alert: '#E08A72',
  };

  const WIKI = 'https://xwiki.ewi.tudelft.nl/xwiki/wiki/sce2026group04';
  const POC = 'https://github.com/gintskk/sce-poc';

  const CHAPTERS = [
    'Opening', 'Moving in', 'Background', 'Elena and Jan · UC02',
    'Use case and criteria', 'Artifact', 'Formative evaluation',
    'Planned summative test', 'Outcomes and limits', 'Next iteration', 'Meet again',
  ];

  /* w = length of the transition into this stop (in viewport heights of scroll).
     dur = how long the glide into it takes when advancing with the keyboard. */
  const STOPS = [
    { id: 'cover', ch: 0, title: 'Meaningful connections' },
    { id: 'open-q1', ch: 0, title: 'A room of strangers', w: 0.7, dur: 550 },
    { id: 'open-q2', ch: 0, title: 'How strangers become friends', w: 0.7, dur: 550 },
    { id: 'open-hook', ch: 0, title: 'Starting over at eighty-one', w: 0.7, dur: 550 },
    { id: 'arrive', ch: 1, title: 'Elena moves in', w: 1.4, dur: 2600 },
    { id: 'flurry', ch: 1, title: 'She meets everyone at once', w: 1.4, dur: 2600 },
    { id: 'jan', ch: 1, title: 'Jan stays in his room', w: 1.2, dur: 2000 },
    { id: 'wait', ch: 1, title: 'Same town, without knowing it', w: 1.2, dur: 2000 },
    { id: 'polite', ch: 1, title: 'Saying yes to be polite' },
    { id: 'context', ch: 2, title: 'Who decides, what we protect', w: 1.2 },
    { id: 'rules', ch: 2, title: 'Four design rules', w: 1.2 },
    { id: 'interview', ch: 3, title: 'The life-story interview', w: 1.3, dur: 2000 },
    { id: 'match', ch: 3, title: 'The coordinator approves a match', w: 1.3, dur: 2200 },
    { id: 'ask', ch: 3, title: 'Pepper asks Elena', w: 1.2, dur: 2000 },
    { id: 'askjan', ch: 3, title: 'Pepper asks Jan', w: 1.2, dur: 2000 },
    { id: 'meet', ch: 3, title: '“Your bread!”', w: 1.3, dur: 2200 },
    { id: 'pause', ch: 3, title: 'Pepper stays silent', w: 1.1, dur: 1800 },
    { id: 'walk', ch: 3, title: 'A walk in the garden', w: 1.8, dur: 3600 },
    { id: 'record', ch: 3, title: 'The record' },
    { id: 'who', ch: 4, title: 'UC02 Introducing two residents', w: 1.2 },
    { id: 'premises', ch: 4, title: 'Premises, measures and criteria', w: 1.1, dur: 1100 },
    { id: 'claims', ch: 4, title: 'Claims, measures and criteria', w: 1.1, dur: 1100 },
    { id: 'poc', ch: 5, title: 'What we built', w: 1.2, dur: 1400 },
    { id: 'demo', ch: 5, title: 'Demo video', w: 1.1, dur: 1100 },
    { id: 'formative-method', ch: 6, title: 'The walkthrough as formative evaluation', w: 1.1, dur: 1100 },
    { id: 'poc-wrong', ch: 6, title: 'A planted mistake', w: 1.2, dur: 1600 },
    { id: 'formative-premises', ch: 6, title: 'Findings: Premises', w: 1.1, dur: 1100 },
    { id: 'formative-claims', ch: 6, title: 'Findings: Claims and surprises', w: 1.1, dur: 1100 },
    { id: 'formative-changes', ch: 6, title: 'What the findings change', w: 1.1, dur: 1100 },
    { id: 'formative-live', ch: 6, title: 'Live audience walkthrough', w: 1.1, dur: 1200 },
    { id: 'summative-intro', ch: 7, title: 'What the summative test addresses', w: 1.1, dur: 1100 },
    { id: 'verify', ch: 7, title: 'Verification gate', w: 1.1, dur: 1100 },
    { id: 'study', ch: 7, title: 'Two care homes, compared', w: 1.4, dur: 2600 },
    { id: 'study-method', ch: 7, title: 'Participants, tasks and procedure', w: 1.1, dur: 1100 },
    { id: 'measures', ch: 7, title: 'Measures per Claim', w: 1.1, dur: 1100 },
    { id: 'outcomes', ch: 8, title: 'Support, qualify or challenge', w: 1.1, dur: 1100 },
    { id: 'limitations', ch: 8, title: 'Limitations', w: 1.1, dur: 1100 },
    { id: 'next', ch: 9, title: 'The next SCE cycle', w: 1.1, dur: 1100 },
    { id: 'again', ch: 10, title: '“Would you like to meet Jan again?”', w: 1.4, dur: 2600 },
    { id: 'thanks', ch: 10, title: 'Thank you', w: 1.2, dur: 2000 },
  ];

  /* ------------------------------------------------------------ helpers */

  function S(tag, attrs, parent, text) {
    const e = document.createElementNS(NS, tag);
    if (attrs) for (const k in attrs) if (attrs[k] != null) e.setAttribute(k, attrs[k]);
    if (text != null) e.textContent = text;
    (parent || art).appendChild(e);
    return e;
  }

  function H(tag, cls, parent, html) {
    const e = document.createElement(tag);
    if (cls) e.className = cls;
    if (html != null) e.innerHTML = html;
    (parent || layer).appendChild(e);
    return e;
  }

  function place(e, x, y, w, h) {
    e.style.left = x + 'px';
    e.style.top = y + 'px';
    if (w != null) e.style.width = w + 'px';
    if (h != null) e.style.height = h + 'px';
    return e;
  }

  const G = (parent, attrs) => S('g', attrs, parent);

  const ln = extra => Object.assign({
    fill: 'none', stroke: C.ink, 'stroke-width': 2,
    'stroke-linecap': 'round', 'stroke-linejoin': 'round',
  }, extra);

  function block(cls, x, y, w, html, parent) {
    return place(H('div', cls, parent, html), x, y, w);
  }

  /* A link to a cited work. Opens in a new tab so the deck keeps its place. */
  const ref = (label, url) => `<a class="ref" href="${url}" target="_blank" rel="noopener">${label}</a>`;

  const doi = (label, d) => ref(label, 'https://doi.org/' + d);

  /* Top-right marker for where we are in Elena's week. */
  function dayMark(A, inId, outId, n, w) {
    const el = H('div', 'day', null, `<div class="n">${n}</div><div class="w">${w || 'Elena’s first week'}</div>`);
    A.reveal(el, inId, { a: 0.2, b: 0.7, y: -12 });
    if (outId) A.conceal(el, outId, { a: 0, b: 0.3, y: 0 });
    return el;
  }

  /* Speaker notes per stop: what we say out loud, shown with N. */
  const notes = {};
  const note = (id, ...ps) => { (notes[id] = notes[id] || []).push(...ps); };

  /* A caption: kicker, headline, a one-line subtitle (s), citation line.
     The longer body (b) goes to the speaker notes, since we tell it. */
  function caption(A, inId, outId, o) {
    if (o.b) note(inId, o.b);
    const el = H('div', 'cap' + (o.cls ? ' ' + o.cls : ''));
    place(el, o.x ?? 120, o.y ?? 250, o.w);
    let html = '';
    if (o.k) html += `<div class="k"${o.kc ? ` style="color:${o.kc}"` : ''}>${o.k}</div>`;
    if (o.t) html += `<h2>${o.t}</h2>`;
    if (o.s) html += `<p class="b">${o.s}</p>`;
    if (o.wx) html += o.wx;
    if (o.c) html += `<div class="c">${o.c}</div>`;
    el.innerHTML = html;
    A.reveal([...el.children], inId, { a: o.a ?? 0.4, b: 1, stagger: 0.06, y: 30 });
    if (outId) A.conceal(el, outId, { a: 0, b: 0.3 });
    return el;
  }

  /* One spoken line: who says it, and what. */
  function say(A, inId, outId, o) {
    const el = block('line ' + (o.cls || 'sys'), o.x, o.y, o.w,
      `<div class="who">${o.who}</div><div class="say">${o.text}</div>`);
    A.reveal(el, inId, { a: o.a ?? 0.45, b: o.b ?? 1, y: 18 });
    if (outId) A.conceal(el, outId, { a: 0, b: 0.3 });
    return el;
  }

  /* -------------------------------------------------------- A/B Review System */
  const AB_DEFS = {
    'open-q1': { type: 'discard', labelA: 'Keep icebreaker Q1', labelB: 'Discard slide', summary: 'Generic icebreaker (“room of strangers”); can be asked verbally on the cover.' },
    'open-q2': { type: 'discard', labelA: 'Keep Q2 slide', labelB: 'Discard (merged into #04)', summary: 'Merged the 3 friendship conditions (Common ground, Easy no, 2nd meeting) into the visual flow on #04.' },
    'open-hook': { type: 'widget', labelA: 'Text bullet cards', labelB: 'Visual contrast pipeline', summary: 'Replaces bullet-point lists with a 2-track visual flow diagram (Usual Day 1 vs. Kinnect Host Loop).' },
    'arrive': { type: 'widget', labelA: 'Prose subtitle', labelB: 'Persona badge strip', summary: 'Replaces small subtitle sentence with scannable visual persona badges (81 yrs · Mild Alzheimer’s · Post office · Knows 0).' },
    'flurry': { type: 'widget', labelA: 'Prose subtitle', labelB: 'Overload counter widget', summary: 'Replaces prose subtitle with a visual stat comparison (8+ names at lunch → 0 remembered by evening).' },
    'jan': { type: 'discard', labelA: 'Keep separate Jan slide', labelB: 'Discard (merged into #08)', summary: 'Merged Jan’s profile & room isolation into the shared-town diagram on the next stop (#08).' },
    'wait': { type: 'widget', labelA: 'Prose caption only', labelB: 'Merged Elena–Jan gap widget', summary: 'Combines #07 + #08 into a visual profile-bridge diagram showing Elena & Jan’s shared town + liking gap.' },
    'polite': { type: 'discard', labelA: 'Keep polite-yes slide', labelB: 'Discard (covered in Rules)', summary: 'No floor-plan animation; polite-refusal pressure (HFC-17) is already covered in #10 (VT-02) and #11 (Rule 1).' },
    'context': { type: 'widget', labelA: '12-row text columns', labelB: 'Governance & tension diagram', summary: 'Turns 12 dense text rows into a Stakeholder Decision Chain + 4 visual Value-Tension balance bars.' },
    'rules': { type: 'widget', labelA: 'Prose sentence rows', labelB: '2×2 visual rule cards', summary: 'Turns long prose sentences into 4 visual Trigger → Pepper Rule cards with zero small text.' },
    'interview': { type: 'widget', labelA: '5-row text list', labelB: 'Visual privacy filter gate', summary: 'Turns the profile list into a 2-bucket visual privacy filter (🔓 Released for matching vs. 🔒 Locked private).' },
    'match': { type: 'widget', labelA: 'Prose subtitle', labelB: '3-candidate match funnel', summary: 'Replaces subtitle with a visual 3-candidate filter showing why the coordinator approves Jan (PR2).' },
    'ask': { type: 'widget', labelA: 'Elena ask quotes only', labelB: 'Merged 2-way private ask widget', summary: 'Combines #14 + #15 into a visual double-blind consent diagram (Elena ✓ + Jan ✓, zero cross-disclosure).' },
    'askjan': { type: 'discard', labelA: 'Keep separate Jan ask', labelB: 'Discard (merged into #14)', summary: 'Identical dialogue to Elena’s private ask; merged into the 2-way consent widget on #14.' },
    'meet': { type: 'widget', labelA: 'Long spoken quote', labelB: 'Chest-tablet intro widget', summary: 'Replaces the long text quote with a visual mockup of Pepper’s chest tablet (2 photos + 1 shared town).' },
    'pause': { type: 'widget', labelA: 'Spoken quotes only', labelB: 'Merged silence + walk timeline', summary: 'Combines #17 + #18 into a 3-step visual card (Silent self-repair → Garden prompt → Myra walk note).' },
    'walk': { type: 'discard', labelA: 'Keep 3.6s garden walk', labelB: 'Discard (merged into #17)', summary: 'Next-day reminder belongs to UC03; the walk agreement and Myra’s note are now shown on #17.' },
    'record': { type: 'widget', labelA: 'Text counter card', labelB: 'Visual data-minimization split', summary: 'Shows a crisp ✓ Logged (3 counters) vs. ✗ Never Stored (0 audio · 0 transcripts · 0 cloud) diagram.' },
    'premises': { type: 'widget', labelA: '4-row text table', labelB: '2×2 verification dashboard', summary: 'Turns 4 prose rows into a 2×2 dashboard with large pass-threshold badges and rule pills.' },
    'claims': { type: 'widget', labelA: 'Paragraph columns', labelB: 'Benefit vs. Risk-Fallback matrix', summary: 'Turns prose descriptions into a visual Claim → Measure → Pre-committed Fallback flow.' },
    'poc': { type: 'widget', labelA: '3 prose paragraphs', labelB: '3-tier architecture & fidelity chips', summary: 'Replaces 3 paragraphs of small text with scannable Implemented / Simulated / Operator-Injected pills.' },
    'formative-method': { type: 'widget', labelA: '2 prose blocks', labelB: '2-track testing pipeline diagram', summary: 'Turns prose paragraphs into a visual 2-track pipeline (55 EM-01 verification runs + 5-peer probe).' },
    'poc-wrong': { type: 'widget', labelA: 'Prose + quote card', labelB: '3-step planted error timeline', summary: 'Turns the planted error into a visual 3-step flow with a 3/5 vs. 2/5 latency bar.' },
    'formative-premises': { type: 'widget', labelA: '4 sentence rows', labelB: 'Visual telemetry & LLM root-cause', summary: 'Adds visual pass bars (15/15, 19/20, 3/5) and highlights Hosted LLM as the shared root cause of PR3 & PR6.' },
    'formative-claims': { type: 'widget', labelA: 'Number cards + text', labelB: '5-peer dot meters + surprise flow', summary: 'Adds 5-person visual dot meters (●●●●○) and a visual conversation-interruption diagram.' },
    'formative-changes': { type: 'widget', labelA: '5 text rows', labelB: 'Failure → Fix visual cards', summary: 'Compact visual cards pairing each walkthrough failure with its pre-Pepper engineering fix.' },
    'formative-live': { type: 'widget', labelA: '3 dense text paragraphs', labelB: 'Visual live-walkthrough board', summary: 'Replaces 160+ words of 19.5px text with Persona cards, Name-Lookup flow, Control pills & 6-item form tags.' },
    'summative-intro': { type: 'widget', labelA: '4-row prose table', labelB: 'Formative → Summative bridge', summary: 'Replaces dense table prose with 4 visual bridge cards (Walkthrough limit → 2-Home trial solution).' },
    'verify': { type: 'widget', labelA: '4×3 compact text table', labelB: 'Pre-trial traffic-light gate diagram', summary: 'Replaces the 12-cell text table with 4 threshold counters feeding a 🟢 Pass / 🟡 Qualify / 🔴 Stop gate.' },
    'study-method': { type: 'widget', labelA: '2 dense prose columns', labelB: 'Cohort funnel & 5-phase stepper', summary: 'Replaces long paragraphs with a 30→25 participant funnel, inclusion badges, and a 5-week visual stepper.' },
    'measures': { type: 'widget', labelA: '5-row compact table', labelB: 'Measure → Claim node map', summary: 'Visual diagram mapping each ER-03 instrument (M-19 to M-23 + interviews) to the UC02 Claim it informs.' },
    'outcomes': { type: 'widget', labelA: '15-cell prose table', labelB: 'Color-coded verdict matrix', summary: 'Replaces 15 prose cells with concise 🟢 Supports / 🟡 Qualifies / 🔴 Challenges formula pills.' },
    'limitations': { type: 'widget', labelA: '4 prose paragraphs', labelB: '2×2 Threat ↔ Mitigation cards', summary: 'Replaces paragraph text with structured Threat vs. Mitigation/Scope visual cards.' },
    'next': { type: 'widget', labelA: 'Cycle + 4-row prose table', labelB: 'Cycle + 4-column SCE layer board', summary: 'Replaces the dense bottom prose table with a 4-column board (Foundation · Spec · Artifact · Summative).' },
  };

  const abState = {};
  let skipDiscarded = false;
  try {
    const saved = JSON.parse(localStorage.getItem('sce_ab_state') || '{}');
    for (const k in AB_DEFS) abState[k] = saved[k] === 'A' ? 'A' : 'B';
    skipDiscarded = localStorage.getItem('sce_ab_skip') === '1';
  } catch (_) {
    for (const k in AB_DEFS) abState[k] = 'B';
  }

  function saveAbState() {
    try {
      localStorage.setItem('sce_ab_state', JSON.stringify(abState));
      localStorage.setItem('sce_ab_skip', skipDiscarded ? '1' : '0');
    } catch (_) {}
  }

  function abChoice(id) {
    return abState[id] || 'B';
  }

  function isStopDiscarded(id) {
    return AB_DEFS[id]?.type === 'discard' && abChoice(id) === 'B';
  }

  function isStopSkipped(stopObj) {
    return skipDiscarded && stopObj && isStopDiscarded(stopObj.id);
  }

  function abWrap(id, opt, ...els) {
    els.flat().forEach(el => {
      if (!el) return;
      el.classList.add('ab-opt');
      el.dataset.abStop = id;
      el.dataset.abOpt = opt;
    });
    return els[0];
  }

  function discardCard(A, inId, outId, o) {
    const def = AB_DEFS[inId] || {};
    const el = block('ab-discard-card', o.x ?? 120, o.y ?? 210, o.w ?? 760, `
      <div class="ab-dc-badge"><span>Option B · Slide Discarded / Merged</span><i>Saves 1 slide</i></div>
      <h3>${o.title || 'Removed to shorten pre-evaluation section'}</h3>
      <p class="ab-dc-why">${o.why || def.summary}</p>
      ${o.kept ? `<div class="ab-dc-kept"><div class="label">Where the content lives now</div><p>${o.kept}</p></div>` : ''}
      <div class="ab-dc-actions">
        <button type="button" class="ab-btn-keep-b" data-act="next">Skip to next kept slide →</button>
        <button type="button" class="ab-btn-switch-a" data-act="switch-a" data-stop="${inId}">Switch to Option A (Keep original slide)</button>
      </div>
    `);
    abWrap(inId, 'B', el);
    A.reveal(el, inId, { a: 0.25, b: 0.85, y: 18 });
    if (outId) A.conceal(el, outId, { a: 0, b: 0.28 });
    return el;
  }

  function applyAb() {
    document.body.classList.toggle('skip-discarded', skipDiscarded);
    document.querySelectorAll('.ab-opt').forEach(el => {
      const id = el.dataset.abStop;
      const opt = el.dataset.abOpt;
      const active = abChoice(id) === opt;
      if (active) el.removeAttribute('data-ab-hidden');
      else el.setAttribute('data-ab-hidden', 'true');
    });
    window.Deck?.refreshHud?.();
    renderAbModal();
  }

  function setAbChoice(id, opt) {
    if (!AB_DEFS[id]) return;
    abState[id] = opt === 'A' ? 'A' : 'B';
    saveAbState();
    applyAb();
  }

  function toggleCurrentAb() {
    const stops = window.Deck?.stops || STOPS;
    const h = location.hash.replace('#', '');
    const cur = stops.find(s => s.id === h) || stops[0];
    if (cur && AB_DEFS[cur.id]) {
      setAbChoice(cur.id, abChoice(cur.id) === 'A' ? 'B' : 'A');
    }
  }

  function toggleSkipDiscarded(val) {
    skipDiscarded = val ?? !skipDiscarded;
    saveAbState();
    applyAb();
  }

  let abBarEl = null, abModalEl = null, abModalOpen = false, currentStopObj = STOPS[0];

  function initAbUi() {
    abBarEl = document.createElement('div');
    abBarEl.id = 'ab-bar';
    abBarEl.className = 'ab-ui';
    document.body.appendChild(abBarEl);

    abModalEl = document.createElement('div');
    abModalEl.id = 'ab-modal';
    abModalEl.className = 'ab-ui';
    abModalEl.hidden = true;
    document.body.appendChild(abModalEl);

    document.body.addEventListener('click', e => {
      const btn = e.target.closest('[data-act]');
      if (!btn) {
        if (e.target === abModalEl) toggleAbModal(false);
        return;
      }
      e.stopPropagation();
      const act = btn.dataset.act;
      if (act === 'set-ab') setAbChoice(btn.dataset.stop, btn.dataset.opt);
      else if (act === 'switch-a') setAbChoice(btn.dataset.stop, 'A');
      else if (act === 'next') window.Deck?.next?.();
      else if (act === 'toggle-skip') toggleSkipDiscarded();
      else if (act === 'open-modal') toggleAbModal(true);
      else if (act === 'close-modal') toggleAbModal(false);
      else if (act === 'all-a') { for (const k in AB_DEFS) abState[k] = 'A'; saveAbState(); applyAb(); }
      else if (act === 'all-b') { for (const k in AB_DEFS) abState[k] = 'B'; saveAbState(); applyAb(); }
      else if (act === 'goto') { toggleAbModal(false); window.Deck?.goTo?.(btn.dataset.stop); }
      else if (act === 'copy-choices') {
        const lines = Object.keys(AB_DEFS).map(k => `${k}: Option ${abChoice(k)} (${abChoice(k) === 'B' ? AB_DEFS[k].labelB : AB_DEFS[k].labelA})`);
        navigator.clipboard?.writeText(lines.join('\n'));
        btn.textContent = '✓ Copied choices to clipboard!';
        setTimeout(() => { btn.textContent = 'Copy choices summary'; }, 2000);
      }
    });

    applyAb();
  }

  function updateAbHud(s) {
    currentStopObj = s || currentStopObj;
    if (!abBarEl || !currentStopObj) return;
    const id = currentStopObj.id;
    const def = AB_DEFS[id];
    const discCount = Object.keys(AB_DEFS).filter(k => isStopDiscarded(k)).length;
    const bCount = Object.keys(AB_DEFS).filter(k => abChoice(k) === 'B').length;
    const totChanged = Object.keys(AB_DEFS).length;

    if (def) {
      const cur = abChoice(id);
      const isDisc = def.type === 'discard';
      abBarEl.innerHTML = `
        <div class="ab-bar-inner has-ab">
          <div class="ab-tag ${isDisc ? 'disc' : 'widg'}">${isDisc ? '✂ Pre-UC02 Cut Candidate' : '❖ Visual Widget / Diagram'}</div>
          <div class="ab-switch">
            <button type="button" class="${cur === 'A' ? 'on' : ''}" data-act="set-ab" data-stop="${id}" data-opt="A"><b>Option A</b> · ${def.labelA}</button>
            <button type="button" class="${cur === 'B' ? 'on b-on' : ''}" data-act="set-ab" data-stop="${id}" data-opt="B"><b>Option B</b> · ${def.labelB}</button>
          </div>
          <span class="ab-hint"><kbd>B</kbd> toggle</span>
          <div class="ab-sep"></div>
          <button type="button" class="ab-skip-btn ${skipDiscarded ? 'on' : ''}" data-act="toggle-skip" title="Shortcut: X">
            ${skipDiscarded ? `Skipping ${discCount} discarded (${STOPS.length - discCount} stops)` : `Showing all ${STOPS.length} stops (${discCount} marked discard)`}
          </button>
          <button type="button" class="ab-rev-btn" data-act="open-modal" title="Shortcut: R">Review All (${bCount}/${totChanged} B)</button>
        </div>`;
    } else {
      abBarEl.innerHTML = `
        <div class="ab-bar-inner no-ab">
          <span class="ab-unchanged">Slide kept as-is</span>
          <div class="ab-sep"></div>
          <button type="button" class="ab-skip-btn ${skipDiscarded ? 'on' : ''}" data-act="toggle-skip" title="Shortcut: X">
            ${skipDiscarded ? `Skipping ${discCount} discarded (${STOPS.length - discCount} stops)` : `Showing all ${STOPS.length} stops (${discCount} marked discard)`}
          </button>
          <button type="button" class="ab-rev-btn" data-act="open-modal" title="Shortcut: R">Review All (${bCount}/${totChanged} B)</button>
        </div>`;
    }
  }

  function renderAbModal() {
    if (!abModalEl || abModalEl.hidden) return;
    const discCount = Object.keys(AB_DEFS).filter(k => isStopDiscarded(k)).length;
    const rows = STOPS.filter(s => AB_DEFS[s.id]).map(s => {
      const def = AB_DEFS[s.id];
      const idx = STOPS.indexOf(s) + 1;
      const cur = abChoice(s.id);
      return `<div class="ab-m-row ${cur === 'B' ? 'is-b' : 'is-a'}">
        <div class="ab-m-title">
          <a href="#${s.id}" data-act="goto" data-stop="${s.id}"><span>${String(idx).padStart(2, '0')}</span> ${s.title}</a>
          <span class="ab-m-type ${def.type}">${def.type === 'discard' ? 'Cut / Merge' : 'Widget / Diagram'}</span>
        </div>
        <div class="ab-m-desc">${def.summary}</div>
        <div class="ab-m-btns">
          <button type="button" class="${cur === 'A' ? 'on' : ''}" data-act="set-ab" data-stop="${s.id}" data-opt="A">A · Original</button>
          <button type="button" class="${cur === 'B' ? 'on b-on' : ''}" data-act="set-ab" data-stop="${s.id}" data-opt="B">B · ${def.type === 'discard' ? 'Discard' : 'Widget'}</button>
        </div>
      </div>`;
    }).join('');

    abModalEl.innerHTML = `
      <div class="ab-m-box">
        <header class="ab-m-head">
          <div>
            <div class="kicker">Manual Review · Option A vs. Option B</div>
            <h2>Slide Comparison &amp; Deck Shortening (${STOPS.length} → ${STOPS.length - discCount} stops)</h2>
          </div>
          <div class="ab-m-head-actions">
            <button type="button" data-act="all-a">Select All Option A</button>
            <button type="button" data-act="all-b" class="b-on">Select All Option B</button>
            <button type="button" data-act="copy-choices">Copy choices summary</button>
            <button type="button" data-act="close-modal" class="close">✕ Close (Esc)</button>
          </div>
        </header>
        <div class="ab-m-list">${rows}</div>
      </div>`;
  }

  function toggleAbModal(open) {
    abModalOpen = open ?? !abModalOpen;
    if (!abModalEl) return;
    abModalEl.hidden = !abModalOpen;
    if (abModalOpen) renderAbModal();
  }

  /* -------------------------------------------------------- the home */
  /*
   * A plain floor plan: seven rooms along the top, a corridor, the lounge
   * (with Pepper), a quiet corner and the entrance below, the garden outside.
   * Residents are dots; connections are lines drawn between them.
   */
  const PLAN = { x: 1000, y: 230, w: 800, roomH: 170, corr: 60, lowH: 190 };
  const ROOMS = [
    { id: 'R-GERRIT', n: 3, name: 'Gerrit' },
    { id: 'R-WILLEM', n: 7, name: 'Willem' },
    { id: 'R-RIA', n: 9, name: 'Ria' },
    { id: 'R-JAN', n: 12, name: 'Jan', c: 'jan' },
    { id: 'R-ELENA', n: 14, name: 'Elena', c: 'elena' },
    { id: 'R-ANS', n: 21, name: 'Ans' },
    { id: 'R-CORRIE', n: 22, name: 'Corrie' },
  ];
  const roomW = PLAN.w / ROOMS.length;
  const roomCenter = i => [PLAN.x + roomW * (i + 0.5), PLAN.y + PLAN.roomH * 0.55];
  const lowY = PLAN.y + PLAN.roomH + PLAN.corr;
  const SPOTS = {
    entrance: [PLAN.x + 720, lowY + 120],
    door: [PLAN.x + 720, lowY + PLAN.lowH + 30],
    corridor: y => [y, PLAN.y + PLAN.roomH + PLAN.corr / 2],
    lounge: [PLAN.x + 210, lowY + 100],
    table: [PLAN.x + 300, lowY + 120],
    quiet: [PLAN.x + 540, lowY + 95],
    pepper: [PLAN.x + 120, lowY + 70],
    gardenDoor: [PLAN.x + 230, lowY + PLAN.lowH],
    garden: [PLAN.x + 400, lowY + PLAN.lowH + 120],
  };

  function buildHome(A, parent) {
    const root = G(parent);
    const walls = [];
    const W = (d, extra) => { const p = S('path', ln(Object.assign({ d, 'stroke-width': 2.2 }, extra)), root); walls.push(p); return p; };
    const { x, y, w, roomH, corr, lowH } = PLAN;
    const bottom = lowY + lowH;
    // outer walls, with a gap for the entrance (right) and the garden door (bottom)
    W(`M ${x + 680} ${bottom} H ${x} V ${y} H ${x + w} V ${bottom} H ${x + 760}`);
    // rooms
    W(`M ${x} ${y + roomH} H ${x + w}`, { 'stroke-opacity': 0.5 });
    for (let i = 1; i < ROOMS.length; i++) W(`M ${x + roomW * i} ${y} V ${y + roomH}`, { 'stroke-opacity': 0.5 });
    // lower row: lounge | quiet corner | entrance hall
    W(`M ${x} ${lowY} H ${x + w}`, { 'stroke-opacity': 0.5, 'stroke-dasharray': '2 8' });
    W(`M ${x + 460} ${lowY} V ${bottom}`, { 'stroke-opacity': 0.5 });
    W(`M ${x + 620} ${lowY} V ${bottom}`, { 'stroke-opacity': 0.5 });
    // garden: a loop path outside
    const loop = S('path', ln({ d: `M ${x + 160} ${bottom + 120} C ${x + 160} ${bottom + 60} ${x + 640} ${bottom + 60} ${x + 640} ${bottom + 120} C ${x + 640} ${bottom + 180} ${x + 160} ${bottom + 180} ${x + 160} ${bottom + 120} Z`, stroke: C.jan, 'stroke-opacity': 0.55, 'stroke-dasharray': '3 9' }), root);
    gsap.set(loop, { autoAlpha: 0 });

    const labels = G(root);
    const L = (tx, ty, t, extra) => S('text', Object.assign({ x: tx, y: ty, class: 'st-mono', 'font-size': 12, fill: C.muted, 'letter-spacing': '1.6' }, extra), labels, t);
    ROOMS.forEach((r, i) => L(x + roomW * i + 12, y + 24, String(r.n).padStart(2, '0')));
    L(x + 16, lowY + 28, 'LOUNGE');
    L(x + 476, lowY + 28, 'QUIET CORNER');
    L(x + 636, lowY + 28, 'ENTRANCE');
    L(x + 16, bottom + 46, 'GARDEN');
    gsap.set(labels, { autoAlpha: 0 });

    // residents
    const dots = {};
    ROOMS.forEach((r, i) => {
      const [cx, cy] = roomCenter(i);
      const g = G(root);
      const col = r.c ? C[r.c] : C.muted;
      const p = A.xf(g, cx, cy, 1);
      const halo = S('circle', { r: 30, fill: col, 'fill-opacity': 0.12 }, g);
      const ring = S('circle', { r: 22, fill: 'none', stroke: col, 'stroke-width': 1.6, 'stroke-dasharray': '3 6', class: 'spin' }, g);
      const core = S('circle', { r: r.c ? 11 : 8, fill: col }, g);
      const name = S('text', { y: 44, 'text-anchor': 'middle', class: 'st-sans', 'font-size': 15, 'font-weight': 500, fill: r.c ? col : C.muted }, g, r.name);
      gsap.set([halo, ring], { autoAlpha: 0 });
      dots[r.name.toLowerCase()] = { g, p, halo, ring, core, name, home: [cx, cy] };
    });

    // Pepper, as a small indigo glyph in the lounge
    const pep = G(root);
    const pepP = A.xf(pep, ...SPOTS.pepper, 1);
    S('rect', { x: -13, y: -20, width: 26, height: 40, rx: 11, fill: C.sys }, pep);
    S('circle', { cx: -5, cy: -9, r: 2.6, fill: C.bg }, pep);
    S('circle', { cx: 5, cy: -9, r: 2.6, fill: C.bg }, pep);
    const pepPulse = S('circle', { r: 26, fill: 'none', stroke: C.sys, 'stroke-width': 2, class: 'pulse' }, pep);
    S('text', { y: 40, 'text-anchor': 'middle', class: 'st-mono', 'font-size': 11, fill: C.sys, 'letter-spacing': '1.6' }, pep, 'PEPPER');
    gsap.set([pep, pepPulse], { autoAlpha: 0 });

    return { root, walls, loop, labels, dots, pepper: { g: pep, p: pepP, pulse: pepPulse } };
  }

  /* A curved thread between two points, for connections. */
  function thread(parent, a, b, color, bend = -60, extra) {
    const mx = (a[0] + b[0]) / 2, my = (a[1] + b[1]) / 2 + bend;
    return S('path', ln(Object.assign({ d: `M ${a[0]} ${a[1]} Q ${mx} ${my} ${b[0]} ${b[1]}`, stroke: color, 'stroke-width': 2.6 }, extra)), parent);
  }

  window.K = {
    NS, art, layer, C, WIKI, POC, CHAPTERS, STOPS, PLAN, ROOMS, SPOTS,
    S, H, G, ln, place, block, ref, doi, caption, say, dayMark, note, notes,
    buildHome, thread,
    AB_DEFS, abChoice, setAbChoice, abWrap, discardCard, applyAb,
    isStopDiscarded, isStopSkipped, toggleCurrentAb, toggleSkipDiscarded,
    initAbUi, updateAbHud, toggleAbModal,
    get abModalOpen() { return abModalOpen; },
    scenes: [], ctx: {}, L: null,
  };
})();
