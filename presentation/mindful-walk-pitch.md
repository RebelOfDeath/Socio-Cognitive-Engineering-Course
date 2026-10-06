---
marp: true
theme: default
paginate: true
headingDivider: 2
style: |
  section {
    font-family: "Segoe UI", Helvetica, Arial, sans-serif;
    color: #222624;
    background: #ffffff;
  }
  h1, h2, h3 { color: #2c4a34; }
  footer { font-size: 15px; color: #66706b; }
  section table tr { background-color: transparent; border-top: none; }
  section table tr:nth-child(2n) { background-color: #f2f5f2; }
  section table th, section table td { border-color: #dde3de; }
  section.photo {
    color: #fff;
    justify-content: flex-end;
    text-shadow: 0 2px 10px rgba(0, 0, 0, .75);
  }
  section.photo h1, section.photo h2, section.photo h3 { color: #fff; }
  section.photo h1 { font-size: 84px; margin: 0; }
  section.photo h2 { font-size: 60px; margin: 0; }
  section.photo h3 { font-size: 34px; font-weight: 400; margin-top: 10px; }
  section.dark { background: #1f3a2b; color: #fff; justify-content: center; }
  section.dark h2 { color: #fff; font-size: 72px; margin: 0; }
  section.dark h3 { color: #cfe0d3; font-size: 36px; font-weight: 400; }
  section.statement { justify-content: center; }
  section.statement h2 { font-size: 64px; margin: 0 0 20px; }
  section.statement h3 { font-size: 36px; font-weight: 400; color: #222624; max-width: 980px; line-height: 1.35; }
  section.voice h2, section.pair h2, section.words h2 { font-size: 40px; }
  section.voice ul { list-style: none; padding: 0; }
  section.voice > ul > li { font-size: 46px; color: #1f3a2b; margin: 26px 0 0; }
  section.voice ul ul li { font-size: 22px; color: #66706b; margin: 4px 0 0; }
  section.verbs { justify-content: center; }
  section.verbs h2 { font-size: 40px; }
  section.verbs ul { list-style: none; padding: 0; display: flex; gap: 52px; margin: 0; }
  section.verbs li { font-size: 56px; font-weight: 600; color: #1f3a2b; margin: 0; line-height: 1.2; }
  section.pair ul { list-style: none; padding: 0; display: flex; gap: 70px; }
  section.pair > ul > li { flex: 1; font-size: 24px; color: #66706b; }
  section.pair ul ul li { font-size: 44px; color: #1f3a2b; margin-top: 12px; line-height: 1.25; }
  section.words ul {
    list-style: none;
    padding: 0;
    columns: 2;
    font-size: 50px;
    line-height: 1.7;
    color: #1f3a2b;
  }
  section.kept h2 { font-size: 40px; }
  section.kept ul { list-style: none; padding: 0; }
  section.kept > ul { columns: 2; column-gap: 60px; }
  section.kept > ul > li { font-size: 34px; color: #1f3a2b; font-weight: 600; break-inside: avoid; margin: 0 0 26px; }
  section.kept ul ul li { font-size: 21px; color: #66706b; font-weight: 400; margin: 4px 0 0; }
  section.sa { justify-content: flex-start; padding-top: 70px; }
  section.sa h2 { font-size: 46px; margin-bottom: 30px; }
  section.sa table { display: table; width: 100%; font-size: 30px; border-collapse: collapse; }
  section.sa thead { display: none; }
  section.sa table tr td { background: transparent; border: none; border-bottom: 1px solid #dde3de; padding: 16px 18px; vertical-align: top; line-height: 1.4; }
  section.sa table tr td:first-child { width: 24%; font-size: 20px; font-weight: 600; color: #1f3a2b; text-transform: uppercase; letter-spacing: .05em; padding-top: 24px; }
  section.sa table tr:last-child td:last-child { color: #8c6512; }
  section.glance { justify-content: flex-start; padding-top: 56px; }
  section.glance h2 { font-size: 42px; margin-bottom: 18px; }
  section.glance table { display: table; width: 100%; font-size: 26px; border-collapse: collapse; }
  section.glance thead { display: none; }
  section.glance table tr td { background: transparent; border: none; border-bottom: 1px solid #dde3de; padding: 10px 16px; }
  section.glance table tr td:first-child { width: 13%; color: #1f3a2b; font-weight: 600; font-size: 21px; }
  section.glance table tr td:nth-child(2) { width: 40%; font-weight: 600; }
  section.glance table tr td:nth-child(3) { color: #66706b; }
  section.glance.dense table { font-size: 20px; }
  section.glance.dense table tr td { padding: 3px 16px; }
  section.glance.dense table tr td:first-child { font-size: 18px; }
  section.diagram, section.table { justify-content: flex-start; padding-top: 44px; }
  section.diagram h2, section.table h2 { font-size: 40px; margin-bottom: 14px; }
  section.diagram p { text-align: center; margin: 0; }
  section.table table { display: table; width: 100%; font-size: 23px; }
  section.table th { background: #1f3a2b; color: #fff; }
  section.table p { font-size: 20px; color: #66706b; margin-top: 14px; }
---

## Original concept: Tooth brushing

<!-- _class: voice -->

- "Toothpaste next."
- "Now brush the back teeth."
- "Now rinse."

<!--
- Bathroom; two minutes, twice a day
- This is all the robot said: instructions
- No room for theory of mind
- Needs a steady grip; if the hands fail, the concept fails
-->

## Think of your last vacation.

<!-- _class: dark -->

### What do you remember?

<!--
- Ask the room; wait twenty seconds
- Two or three people share
- Then, out loud: "Hands up if you were moving: walking, hiking, swimming, cycling"
- Count the hands
-->

## Moving helps memory

<!-- _class: statement -->
<!-- _footer: "Pastor & Bourdin-Kreitz (2024), Scientific Reports 14, 7580" -->

### The same museum tour, walked or seated: the walkers remembered far more of who was where.

<!--
- Link back to the hands
- Walking AR tour against a seated VR tour of the same museum
- Large effect: d = 1.31, 28 adults
- Fresh air and movement also steady emotions
-->

## More to talk about

<!-- _class: photo -->

![bg brightness:.6](img/bench-c.jpg)

<!--
- Walks bring people together: a fellow resident, a relative on the phone
- Side by side, a pause costs less: no face to watch, things to look at
- Less repetition in the final presentation
-->

## What a walk can serve

<!-- _class: words -->

- Company
- Dignity
- Truthfulness
- Privacy
- Identity
- Autonomy
- Well-being
- Safety

<!--
- Eight Human Values from our Foundation
- Company: a chat, a mate, less loneliness
- Dignity: a slip is not remarked on
- Truthfulness: no deception; painful news from a trusted person
- Privacy: no secret passed on; nothing leaves the care home
- Identity: the old trade, the old town
-->

## Mindful Walk

<!-- _class: verbs -->

- Walk
- Talk
- Ask
- Wait
- Redirect

<!--
- Walk: fresh air and movement stimulate memory and steady emotions
- Talk: with a fellow resident, or a relative on the phone
- Ask: consent before joining someone, and before every conversation starter
- Wait: the speaker gets the first chance to fix a slip
- Redirect: gently, to the place, the thread, or a shared topic
-->

## SA-01 · A walk on your own

<!-- _class: sa -->

| | |
|---|---|
| Who | Resident, alone; staff glance from the window |
| When | Varies widely · 5-30 min · fine weather |
| Goal | Fresh air, movement, a change of scene |
| What breaks down | Nobody to talk to<br>Forgets where or why<br>A painful question to a passing worker |

<!--
- Only residents assessed fit; enclosed garden loop
- Loneliness: some stop going out
- Addressed by: the guide as a bridge to a person, or as company where agreed
-->

## SA-02 · A walk with a fellow resident

<!-- _class: sa -->

| | |
|---|---|
| Who | Two residents, matched by staff |
| When | Occasional · 15-30 min |
| Goal | Company as the reason to go out |
| What breaks down | Two who dislike each other<br>"I suppose so": going along to please<br>A slip nobody notices |

<!--
- Both often have dementia: neither notices the other's slips
- Talking slows walking and raises fall risk
- Addressed by: asking each alone; a relationship map; the guide keeps the thread
-->

## SA-03 · A walk on the phone with a relative

<!-- _class: sa -->

| | |
|---|---|
| Who | Resident walking; relative calling |
| When | Calls weekly or more · 5-20 min |
| Goal | Stay in touch between visits |
| What breaks down | "You told me already"<br>A stumble the relative cannot see<br>"Come and get me" |

<!--
- Voice only: no face, no gesture; wind, hearing loss
- The relative knows the life story, yet "What did you do today?" fails
- Addressed by: whispered hints to the relative; a bench offered; a help key
-->

## SA-04 · Losing and finding the thread

<!-- _class: sa -->

| | |
|---|---|
| Who | Resident, with a partner or a relative |
| When | Many times per conversation |
| Goal | Keep talking after a slip, without losing face |
| What breaks down | Nobody notices<br>Helped too fast, or quizzed<br>Withdraws after repeated slips |

<!--
- Slips: a lost thread, a missing word, a repeated story, a belief from another time
- Speakers prefer to fix their own slips; in dementia, repair succeeds less often
- Addressed by: wait, then redirect gently
-->

## SA-05 · Answering a painful question

<!-- _class: sa -->

| | |
|---|---|
| Who | Resident asks; whoever is near answers |
| When | Daily on a ward |
| Goal | A truthful answer, from someone trusted |
| What breaks down | Blunt news from a stranger<br>A kind lie, found out<br>Different answers from different staff |

<!--
- "Where is my husband?" "When can I go home?"
- Agreements are in staff heads, not passed on
- Addressed by: the guide defers to a trusted person; one agreed answer
-->

## Stakeholders

<!-- _class: glance -->

| | | |
|---|---|---|
| ST-01 | Resident with dementia | walks, talks, consents |
| ST-02 | Fellow resident | walking partner |
| ST-03 | Relative | on the phone; keeper of the life story |
| ST-04 | Care worker | alerts, painful questions |
| ST-05 | Activity coordinator | pairs, settings, relationship map |
| ST-06 | Medical and therapy staff | fall risk, medical news |
| ST-07 | Care home management | exits, data, local server |

<!--
- Seven stakeholders
- The relative is now direct: on the call
-->

## Problem scenarios

<!-- _class: glance -->

| | | |
|---|---|---|
| PS-01 | A slip nobody noticed | the partner misses it; she withdraws |
| PS-02 | The call that went quiet | a repeated story, an unseen stumble |
| PS-03 | The wrong answer | blunt news; earlier, a kind lie |

<!--
- One per walk
- In each, a slip or a question meets nobody prepared for it
-->

## Human values

<!-- _class: glance -->

| | | |
|---|---|---|
| HV-01 | Autonomy | own reasons, own settings, own consent |
| HV-02 | Dignity | slips not remarked on |
| HV-03 | Privacy | no secret passed on |
| HV-04 | Safety | help arrives quickly |
| HV-05 | Well-being | fresh air, calm |
| HV-06 | Social connectedness | company and conversation |
| HV-07 | Identity | own past, own words |
| HV-08 | Truthfulness | no deception |

<!--
- Social connectedness leads: company is the reason to walk
- Truthfulness: no deception by design; errors corrected; painful truths from a trusted person
-->

## Value tensions

<!-- _class: glance -->

| | | |
|---|---|---|
| VT-01 | Connectedness vs Safety | talk at a stop, not on the move |
| VT-02 | Dignity vs Connectedness | wait first; help both, as a statement |
| VT-03 | Truthfulness vs Well-being | no lies; painful news from a trusted person |
| VT-04 | Privacy vs Connectedness | starters only with consent, per walk |
| VT-05 | Privacy vs Identity | listen on the device; keep nothing said |
| VT-06 | Autonomy vs Safety | gate alert; no lock, no GPS |
| VT-07 | Connectedness vs Autonomy | asked alone; no tallies |

<!--
- Right column: how the design resolves each tension
-->

## Human factors concepts

<!-- _class: glance -->

| | | |
|---|---|---|
| HFC-01 | Fresh air, movement and memory | on foot, remembered better |
| HFC-02 | Walking while talking | attention shared with the path |
| HFC-03 | Conversation repair | the speaker fixes it first |
| HFC-04 | Common ground | old memories, shared |
| HFC-05 | Theory of mind | partners miss each other's slips |
| HFC-06 | Face and personhood | correcting erodes standing |
| HFC-07 | Coping and loneliness | slips lead to withdrawal |
| HFC-08 | Truth and trust | lies found out cost trust |

<!--
- HFC-01 is the vacation question
- HFC-05: theory of mind weakens in dementia; the System keeps a simple model of each walker
-->

## Measures

<!-- _class: glance dense -->

| | | |
|---|---|---|
| M-01 | System performance | staged events, latency |
| M-02 | Walks and company | per week, with whom |
| M-03 | Observed emotion | OERS, rated live |
| M-04 | Slips and recovery | every slip, coded live |
| M-05 | Conversation | talk and its quality |
| M-06 | Safety while talking | stumbles, tiredness |
| M-07 | The walkers' own view | three faces, "Again?" |
| M-08 | Loneliness | 6-item scale, per phase |
| M-09 | Privacy, tone and trust | interview codes |
| M-10 | Sensitive topics, errors | deferrals, corrections |

<!--
- Validated instruments where they exist: OERS, the De Jong Gierveld loneliness scale
- Nothing is recorded: observers code live
-->

## Evaluation methods

<!-- _class: glance -->

| | | |
|---|---|---|
| EM-01 | Prototype | demonstration, staged verification |
| EM-02 | Observed walks | live listening, no recording |
| EM-03 | ABAB per case | pair walks and phone walks |
| EM-04 | Interviews | residents, relatives, staff |

<!--
- Detailed in the Evaluation section
-->

## Technology options

<!-- _class: glance -->

| | | |
|---|---|---|
| TECH-01 | Pepper at the door | selected |
| TECH-02 | Pocket guide | selected |
| TECH-03 | Landmark beacons | selected |
| TECH-04 | Local server, a copy per resident | selected |
| TECH-05 | Exchange between copies | selected |
| TECH-06 | Walker model and starters | selected |
| TECH-07 | Cloud speech and language | rejected: data leaves the home |
| TECH-08 | Audio recording | rejected: a store of secrets |
| TECH-09 | GPS, cameras, wristbands | rejected: monitoring |

<!--
- Six selected, three rejected; the rejections are part of the rationale
- No internet connection: nothing leaves the care home
-->

## What we keep from morning care

<!-- _class: kept -->

- Wait before helping
  - The speaker repairs first; then one gentle cue
- A person in reach
  - The System calls; it does not tell
- A minimal record
  - Six items; nothing said, no route
- No cameras
  - Item sensors then, beacons now
- An adult voice
  - Statements, never quizzes; no praise
- A safe fallback
  - If the System fails, walks go on as today

<!--
- New activity, same principles
- Graduated prompting became wait, then redirect gently
- The care-worker handover became the trusted person
- Three-item record then, six items now
- Also kept: staged tests, the within-resident comparison, adverse claims
-->

## Jan

<!-- _class: photo -->

![bg brightness:.55](img/post-slot.jpg)

### Thirty years on the post round

<!--
- Our first resident persona
- Postal worker for thirty years, on foot and by bike
- Moderate dementia: today is gone, the round is vivid
- Repeats stories; laughs slips off
- Daughter Anne calls twice a week
- "I'm not a dog to be walked"
-->

## Elena

<!-- _class: photo -->

![bg brightness:.5](img/post-box.jpg)

### Twenty-five years behind the post office counter

<!--
- Our second resident persona
- Mild Alzheimer's disease; notices her own slips, and is embarrassed by them
- Widowed last year; lonely since
- Lives two doors from Jan; both worked for the post in the same town
- "Give me a moment first"
-->

## Thread in the pocket, person in reach

<!-- _class: diagram -->

![w:1110](img/garden.svg)

<!--
- Pepper at the door: asks each walker alone, introduces, welcomes back
- A pocket guide each; a copy of the System per resident, on a local server
- Beacons at the pond, roses, bench and gate
- Listens on the device; no GPS, no route; nothing leaves the home
- The speaker repairs first, the companion second, the System third
-->

## What the guide keeps track of

<!-- _class: diagram -->

![w:1110](img/mind-panel.svg)

<!--
- Theory of mind, kept simple: one model per walker, for one walk
- Common ground: what they share, and what may be mentioned
- The thread, what was said already, a belief from another time, the walker's state
- It decides when to wait, redirect or pass on
- Deleted at the end of the walk
-->

## How the voice speaks

<!-- _class: voice -->

- "Elena was telling you about pension day."
  - Wait first; then redirect gently, to both
- "May I mention the post office counter to Jan?"
  - Ask first, alone; "no" is final
- "That's one for Myra. Shall I ask her to come?"
  - Never deceive; painful truths come from a trusted person

<!--
- Three rules
- Statements, not questions, while walking
- Never "What were you saying?", "You told me", "Do you remember?"
-->

## On the phone

<!-- _class: pair -->

- To Jan
  - "Bench on your left. Sit and talk?"
- To Anne only
  - "Told before. The roses are out."

<!--
- Calls run through the pocket guide; nothing said is kept
- Hints reach the relative only, and only because both agreed
- Talking on the move slows walking: the guide offers a bench
- The relative has a help key
-->

## Is Thomas coming today?

<!-- _class: photo -->

![bg brightness:.5](img/walk-couple.jpg)

### Painful truths come from a trusted person

<!--
- Elena walks alone; Thomas died last year
- The relationship map lists his death, the trusted person, and the approach agreed with her son
- The guide never lies and never denies: it calls Myra
- Myra comes, sits down, and answers as agreed
-->

## Settings follow the resident

<!-- _class: table -->

| Setting | Options | Set by |
|---|---|---|
| Guide on walks alone | silent · bridge to a person · company | resident, with staff |
| Conversation starters | off · own life · shared with listed partners | resident; each one asked per walk |
| Word help | off · after a wait | resident |
| Hints to a relative | off · on | resident and relative |
| Learn own words and dialect | off · on | resident and representative |
| Walk length | minutes | physiotherapist; the resident can shorten it |

Safety alerts always on · sensitive topics agreed with family and staff

<!--
- The answer to "a dog being walked": the walk serves the resident's own reasons
- Each resident decides how much help, and what may be shared
- Jan: bridge only, hints to Anne. Elena: company on walks alone, word help after a wait
-->

## What could go wrong

<!-- _class: words -->

- Exposing a slip
- Cutting in
- Stumbling mid-talk
- Walked like a dog
- Listened in on
- A secret let slip

<!--
- Help can expose the slip it means to hide
- The guide may cut in before the speaker repairs
- Talking on the move: more stumbles, tiredness missed
- The walk may feel like being walked, for staff's sake
- A listening guide may feel like eavesdropping
- An out-of-date map may let a secret through
- Each one tested; if true, the design changes
-->

## Design scenarios

<!-- _class: glance -->

| | | |
|---|---|---|
| DS-01 | Pension day | Jan and Elena: a lost thread found again |
| DS-02 | Anne on the line | a repeated story, a bench, "Come and get me" |
| DS-03 | Is Thomas coming? | Elena alone; Myra comes |

<!--
- One per walk; Jan and Elena in two each
-->

## Personas and robot profiles

<!-- _class: glance -->

| | | |
|---|---|---|
| HP-01 | Jan | resident, former postal worker |
| HP-02 | Elena | resident, ran the post office counter |
| HP-03 | Anne | Jan's daughter, on the phone |
| HP-04 | Myra | care worker, Elena's trusted person |
| RP-01 | Pepper | at the door |
| RP-02 | Pocket guide | keeps the thread |

<!--
- Four people, two devices, one voice
- Settings per resident
-->

## Objective stories

<!-- _class: glance -->

| | | |
|---|---|---|
| OS-01 | Tell us both | F2 · Dignity, Company |
| OS-02 | A word in my ear | F2 · Company, Truthfulness |
| OS-03 | Not a dog | F1 · Autonomy, Dignity |

<!--
- Each ties a Function to a value, in a stakeholder's words
-->

## Objectives

<!-- _class: glance -->

| | | |
|---|---|---|
| OBJ-01 | Talk recovers | Must |
| OBJ-02 | Walk with company | Must |
| OBJ-03 | Safe while talking | Must |
| OBJ-04 | No deception | Must |
| OBJ-05 | No secret revealed | Must |
| OBJ-06 | The resident's own walk | Must |
| OBJ-07 | Adult voice | Should |
| OBJ-08 | Less lonely | Should |

<!--
- Six Musts; talk that recovers comes first
-->

## Use cases and functions

<!-- _class: glance -->

| | | |
|---|---|---|
| UC01 | A walk with a fellow resident | F1-F6 |
| UC02 | A walk on the phone | F1-F6 |
| UC03 | A walk on your own | F1-F6 |
| F1 | Ask first | alone, per walk; "no" is final |
| F2 | Keep the thread | wait, then redirect gently |
| F3 | Watch pace and rest | starters only at a stop |
| F4 | Defer sensitive topics | to a trusted person |
| F5 | Call for help | gate, cord, stumble, help key |
| F6 | Keep a short record | six items; nothing said |

<!--
- Three use cases share six functions
- UC01, the pair walk, is the main use case
-->

## Claims

<!-- _class: glance dense -->

| | | |
|---|---|---|
| CL1 | Slips recovered | more, on pair walks |
| CL2 | Hints on calls | fewer repetitions exposed |
| CL3 | Help that exposes (adverse) | more embarrassment |
| CL4 | Cutting in (adverse) | less self-repair |
| CL5 | Talking on the move (adverse) | more stumbles |
| CL6 | Asking first | more walks with company |
| CL7 | Painful questions | answered by a trusted person |
| CL8 | Walked like a dog (adverse) | "Again?" falls |
| CL9 | A listening guide (adverse) | felt as eavesdropping |
| CL10 | Loneliness | lower; exploratory |

<!--
- Ten claims, five adverse
- Success criteria in the Evaluation section
-->

## Design patterns

<!-- _class: glance -->

| | | |
|---|---|---|
| TDP-01 | Thread in the pocket, person in reach | speaker first, companion second, System third |
| IDP-01 | Wait, then redirect gently | the place, the thread, a shared topic |
| IDP-02 | Ask first | alone, before; "no" is final |
| IDP-03 | Truthful deferral | never deceive; pass painful truths on |

<!--
- One team pattern, three interaction patterns
-->

## Evaluation

<!-- _class: dark -->

### Verification and validation

<!--
- Verification: do the Functions work as specified (Premises)
- Validation: do they have the intended effect (Claims)
- Four phases, sixteen weeks
-->

## Evaluation plan

<!-- _class: diagram -->

![w:1110](img/study-plan.svg)

<!--
- Phase 1: prototype and staged checks, no residents
- Phase 2: operator-voiced pilot; tune the wait and the wording
- Phase 3: ABAB validation of the Claims
- Phase 4: interviews with residents, relatives and staff
- Ethics approval before any resident takes part
-->

## The prototype: three builds

<!-- _class: table -->

| Build | What it is | Used for |
|---|---|---|
| A · Operator-voiced | A researcher triggers every line from a console | Pilot with residents (Phase 2) |
| B · Automated | Sensing, walker model and alerts on the devices; the operator approves starters | Staged verification (Phase 1) |
| C · Demonstration | Role-players, injected events, the walker model on screen | The demo: three scenes, one per walk |

Phone on the rollator as the pocket guide · five beacons · laptop server with no internet uplink · Pepper at the door

<!--
- Shows every Function end to end
- The screen shows each walker's model live, and why the guide chose each step
- The demo ends by showing what is not kept: no audio file, no traffic outside the home
-->

## Phase 1: staged verification

<!-- _class: table -->

| Test event | Required behaviour | Acceptance criterion (proposed) |
|---|---|---|
| Mid-sentence stop | No System speech during the wait | 8 s, in 20 of 20 trials |
| No resumption after the wait | Thread echoed to both, as a statement | ≤ 3 s, in 19 of 20 trials |
| Starter without this walk's consent | Never used | 0 of 50 trials |
| Question on a listed sensitive topic | Truthful deferral; trusted person alerted | ≤ 10 s; the fact never stated |
| Stumble while talking | Offer to sit; a second stumble alerts staff | ≤ 3 s; ≤ 10 s |
| Full test day | No packet leaves the home; no audio file | 0 |

20 trials per event, 50 for disclosure · no human participants · criteria to be agreed with care staff

<!--
- Staged events against a timestamped reference log
- Premises PR1-PR6
- Numbers are proposals; care workers set the final ones
-->

## Phase 2: operator-voiced pilot

<!-- _class: table -->

| Factor | Condition A | Condition B |
|---|---|---|
| Wait before help | 5 s | 10 s |
| First help after a slip | The place: "The pond's just ahead." | The thread: "Elena was telling you..." |
| Hint to the relative | One word: "Roses." | A line: "Told before. The roses are out." |

A researcher voices the guide · 2 resident pairs, 2 phone pairs, not in Phase 3 · outcomes: slips recovered (M-04), observed emotion (M-03)

<!--
- Formative: before anything is automated
- Each factor varied across short walks
- What residents respond to best becomes the default
-->

## Phase 3: summative validation

<!-- _class: diagram -->

![w:1110](img/abab.svg)

<!--
- Single-case ABAB: baseline, intervention, baseline, intervention
- Two tracks: 4 resident pairs, 4 resident-relative pairs; 12 residents
- Each case is its own control; phase changes on randomly drawn days
- At least 5 observed walks per phase
- Safety alerts stay on in every phase
-->

## Observed walks: live listening, no recording

<!-- _class: diagram -->

![w:1110](img/observation.svg)

<!--
- One researcher per walk, about 10 m behind, listening through a headset
- Asked before each walk: may the researcher listen today?
- Emotion rated live (OERS); every slip coded: type, who repaired, how fast, at what cost to face
- Codes only, never words
- Stop at any sign of distress
-->

## Success criteria

<!-- _class: table -->

| Claim | Criterion, set in advance |
|---|---|
| Slips recovered (CL1) | Recovery up at all three phase changes, in 3 of 4 pairs |
| Phone walks (CL2) | Fewer repetitions exposed; relatives rate calls higher |
| Company (CL6) | More walks with company; more observed pleasure |
| Painful questions (CL7) | All passed to the trusted person; errors corrected |
| Exposing, cutting in (CL3, CL4) | Adverse if face signs rise or self-repair falls |
| Stumbles (CL5) | Adverse if stumbles rise in 2 of 4 cases |

<!--
- Each criterion is set before the study starts
- Any disclosure, or an error that causes distress, stops the B phase
- A null result on loneliness is likely; we report it either way
-->

<!-- ## Next steps -->

<!-- _class: words -->
<!-- 
- Relationship map
- Evidence check
- Prototype build
- Ethics approval -->

<!--
- Relationship map and consent forms with care staff
- Evidence pass on the references
- Build A of the prototype on the garden loop
- Ethics approval before any resident takes part
- Open for questions
-->
