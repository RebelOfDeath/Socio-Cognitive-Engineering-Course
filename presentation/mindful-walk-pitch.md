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
- Tested straight after and 48 hours later
-->

## More to talk about

<!-- _class: photo -->

![bg brightness:.6](img/bench-c.jpg)

<!--
- Walks bring residents together: partner, volunteer, family
- Every walk differs: season, weather, stories
- Less repetition in the final presentation
-->

## What a walk can serve

<!-- _class: words -->

- Company
- Identity
- Autonomy
- Well-being
- Dignity
- Safety

<!--
- Six Human Values from our Foundation
- Company: a partner with a shared past
- Identity: the old round, the old songs
- Autonomy: whether, where, how long
- Well-being, dignity, safety
-->

## Mindful Walk

<!-- _class: verbs -->

- Walk
- Notice
- Remember
- Rest
- Listen

<!--
- Walk: daily, outdoors, with company
- Notice: feet, air, birdsong
- Remember: the life story along the route
- Rest and listen: rain days, dusk
- Walking comes first
-->


## SA-01 · Accompanied walk

<!-- _class: sa -->

| | |
|---|---|
| Who | Resident, with a care worker, volunteer or family |
| When | Daily after lunch · 15-45 min · often skipped |
| Goal | Move, get daylight, stay oriented, return safely |
| What breaks down | Loses place or purpose<br>Heads for the old home<br>Cancelled: no staff, bad weather |

<!--
- Today's fix: closed garden loop, coded exits, family and volunteers
- The companion is the resident's anchor
- Addressed by: present-moment cues, gate alert
-->

## SA-02 · Fitting walks between care tasks

<!-- _class: sa -->

| | |
|---|---|
| Who | Care worker or activity coordinator |
| When | Daily activity slot · 30-60 min with preparation |
| Goal | Every resident who can walk gets a safe walk |
| What breaks down | No time, so the walk is skipped<br>The group follows the slowest walker<br>One turns back, all return |

<!--
- Walks compete with care tasks for the same staff time
- Addressed by: walks with a partner and the guide; staff in reach
-->

## SA-03 · Bad-weather indoor exercise

<!-- _class: sa -->

| | |
|---|---|
| Who | Resident; care worker sets up; physiotherapist plans |
| When | Rain, ice, heat or darkness · 10-20 min |
| Goal | Keep moving when going out is not possible |
| What breaks down | No destination, no company<br>Stops after a few minutes<br>Often skipped |

<!--
- The exercise stays; daylight, sights and company go
- Addressed by: seated practice at the window
-->

## SA-04 · Walking with a fellow resident

<!-- _class: sa -->

| | |
|---|---|
| Who | Resident and walking partner, matched by a care worker |
| When | When staff spot a match · 15-30 min |
| Goal | Company as the reason to go out |
| What breaks down | No partner available<br>Mismatch in pace<br>Talk dries up |

<!--
- The match decides whether the walk works
- Addressed by: pairing on a shared past; memory prompts
-->

## SA-05 · Relaxation session

<!-- _class: sa -->

| | |
|---|---|
| Who | Residents, led by the activity coordinator |
| When | Weekly or less · 20-45 min |
| Goal | Calm and rest, seated or lying |
| What breaks down | Recording too abstract and too fast<br>Drift goes unnoticed<br>Calm fades within the hour |

<!--
- Recordings are made for general audiences
- Addressed by: concrete cues, paced to the resident
-->

## SA-06 · Winding down to rest

<!-- _class: sa -->

| | |
|---|---|
| Who | Resident, calmed by a care worker |
| When | Afternoon rest and evening · 5-30 min |
| Goal | A calm evening; medication only as a last resort |
| What breaks down | No time at handover<br>Up again once staff leave<br>Evening news upsets |

<!--
- Restlessness peaks when staff time is lowest
- Addressed by: lying practice with the docked guide
-->

## SA-07 · Listening to radio, news or audiobooks

<!-- _class: sa -->

| | |
|---|---|
| Who | Resident; staff switch on; family knows the tastes |
| When | Daily, at rest · minutes to hours |
| Goal | Chosen listening; keep in touch with the world |
| What breaks down | Cannot work the device<br>Station picked by staff<br>Plot lost between days |

<!--
- Preferences known to family, not to whoever switches on
- Addressed by: two-option offers from the life story
-->

## Stakeholders

<!-- _class: glance -->

| | | |
|---|---|---|
| ST-01 | Resident with dementia | walks, rests, listens |
| ST-02 | Care worker | escorts, calms, gets alerts |
| ST-03 | Family member | keeper of the life story |
| ST-04 | Walking partner | fellow resident, shared past |
| ST-05 | Care home management | exits, staffing, data |
| ST-06 | Medical and therapy staff | mobility, relaxation, PRN |
| ST-07 | Volunteer | walks one-to-one |
| ST-08 | Activity coordinator | profiles, pairs, sessions |

<!--
- Eight stakeholders; ST-08 is new for this concept
-->

## Problem scenarios

<!-- _class: glance -->

| | | |
|---|---|---|
| PS-01 | Losing the thread mid-walk | place and purpose gone |
| PS-02 | No reason to go out | no purpose, no company |
| PS-03 | Rain cancels the walk | indoor exercise bores |
| PS-04 | Lost in the recording | too abstract, too fast |
| PS-05 | Restless at dusk | nobody can stay |
| PS-06 | Radio on, nobody listening | nobody asked the resident |

<!--
- Three on the walk, three at rest
-->

## Human values

<!-- _class: glance -->

| | | |
|---|---|---|
| HV-01 | Autonomy | whether, where, how long |
| HV-02 | Dignity | spoken to as an adult |
| HV-03 | Privacy | no route, no listening log |
| HV-04 | Safety | help arrives quickly |
| HV-05 | Well-being | body, daylight, calm |
| HV-06 | Attentive care | staff time where needed |
| HV-07 | Social connectedness | company on the walk |
| HV-08 | Identity | who you were |

<!--
- Five carried over from morning care; Safety, Social connectedness and Identity are new
-->

## Value tensions

<!-- _class: glance -->

| | | |
|---|---|---|
| VT-01 | Autonomy vs Safety | garden with a partner; gate alert, no lock |
| VT-02 | Privacy vs Safety | beacons, no GPS |
| VT-03 | Identity vs Well-being | curated topics; never test |
| VT-04 | Autonomy vs Well-being | news on request, never hidden |
| VT-05 | Dignity vs Well-being | plain, adult voice |
| VT-06 | Privacy vs Identity | profile written with family |
| VT-07 | Attentive care vs Social connectedness | never the voice alone |

<!--
- Right column: how the design resolves each tension
-->

## Human factors concepts

<!-- _class: glance -->

| | | |
|---|---|---|
| HFC-01 | Walking, place and memory | on foot, remembered better |
| HFC-02 | Present-moment attention | the present asks little of memory |
| HFC-03 | Attention restoration | nature draws attention |
| HFC-04 | Reminiscence and personhood | old memories last longest |
| HFC-05 | Personalised listening | the familiar calms |
| HFC-06 | Elderspeak | sing-song talks down |
| HFC-07 | Perceived surveillance | tracked feels supervised |
| HFC-08 | Robot embodiment | form decides the role |

<!--
- HFC-01 is the vacation question; the recall task tests it
-->

## Measures

<!-- _class: glance dense -->

| | | |
|---|---|---|
| M-01 | Guide performance | staged events, latency |
| M-02 | Walking | minutes, early terminations |
| M-03 | Same-day recall | free recall, three pictures |
| M-04 | Observed affect | OERS |
| M-05 | Engagement | OME |
| M-06 | Agitation | CMAI |
| M-07 | Perceived autonomy | self-report and observer |
| M-08 | Privacy and tone | interview codes |
| M-09 | Care-worker time | minutes per walk |
| M-10 | Human company | minutes per week |
| M-11 | Listening uptake | accepted, minutes listened |

<!--
- Validated instruments where they exist: OERS, OME, CMAI
-->

## Evaluation methods

<!-- _class: glance -->

| | | |
|---|---|---|
| EM-01 | Staged garden and room verification | no participants |
| EM-02 | Within-resident comparison | ABAB, residents |
| EM-03 | Staff and family interview | acceptance in practice |
| EM-04 | Human-operated prototype test | cue wording and timing |

<!--
- Detailed in the Evaluation section
-->

## Technology options

<!-- _class: glance -->

| | | |
|---|---|---|
| TECH-01 | Pepper as indoor host | selected |
| TECH-02 | Pocket guide | selected |
| TECH-03 | Garden beacons | selected |
| TECH-04 | Staff alerts and session record | selected |
| TECH-05 | Listening library and recommender | selected |
| TECH-06 | GPS tracker | rejected: route trace |
| TECH-07 | Pepper on the walk | rejected: terrain |
| TECH-08 | Headphones | rejected: shuts out the garden |
| TECH-09 | Stress wristband | rejected: body data |

<!--
- Five selected, four rejected; the rejections are part of the rationale
-->

## What we keep from morning care

<!-- _class: kept -->

- Wait before helping
  - Silence first; one cue at a time
- A person in reach
  - The System calls a care worker when its help runs out
- A minimal record
  - Four items; no step-by-step trace, no route
- No cameras
  - Item sensors then, beacons now
- An adult voice
  - Phrased as offers; no praise, no endearments
- A safe fallback
  - If the System fails, care goes on as today

<!--
- New activity, same principles
- Graduated prompting became cue, then silence
- The care-worker handover became the alert
- Three-item record then, four items now
- Also kept: staged tests, the within-resident comparison, adverse claims
-->


## Jan

<!-- _class: photo -->

![bg brightness:.55](img/post-slot.jpg)

### Thirty years on the post round

<!--
- Our persona
- Postal worker: thirty years, on foot and by bike
- Moderate dementia: today is gone, the round is vivid
- Refused a GPS watch: "I'm not a parcel"
- Kees, two doors down, sorted the post at the same depot
- On the walk: a memory prompt at the rose bed; they talk for ten minutes
-->

## Voice in the pocket, person in reach

<!-- _class: diagram -->

![w:1110](img/garden.svg)

<!--
- Pepper indoors only: no grass, no gravel
- Pocket guide outside, same voice
- Beacons at pond, roses, bench and gate
- No GPS, no route stored; microphone off outdoors
- A person always walks along
-->

## How the voice speaks

<!-- _class: voice -->

- "Feel your feet on the path."
  - Mention what is here, then silence
- A memory, stated from the life story
  - Never "Do you remember?"
- "A walk with Kees, or a sit by the window?"
  - Two options; "no" is fine

<!--
- Three rules
- Adult words, normal pitch
- No praise, no endearments
-->

## Rest, seated or lying

<!-- _class: pair -->

- On rain days, at the window
  - "Rain on the glass."
- At dusk, in bed
  - "Lie back. Feel the pillow under your head."

<!--
- Rain: Pepper at the window
- Breathing light on Pepper's shoulders
- Dusk: guide docked at the bedside
- Concrete cues: nothing to remember
-->

## Listening that fits

<!-- _class: photo -->

![bg brightness:.55](img/radio-a.jpg)

### Brass band, football, the morning news

<!--
- Two options from the life story
- News in the morning, calm in the evening
- News always on request, never hidden
- Short stories; a recap for long books
-->

## What could go wrong

<!-- _class: words -->

- Memories that hurt
- A childish voice
- Feeling watched
- Kept from the news

<!--
- Memories can hurt: "I must go home"
- The voice may sound childish
- The robot may feel like being watched
- Calm evenings may feel like censorship
- Each one tested; if true, the design changes
-->

## Design scenarios

<!-- _class: glance -->

| | | |
|---|---|---|
| DS-01 | Back on the round | garden walk with Kees |
| DS-02 | Rain at the window | seated practice, then music |
| DS-03 | Winding down at dusk | lying practice, news, a story |

<!--
- Same resident, Jan, in all three
-->

## Personas and robot profiles

<!-- _class: glance -->

| | | |
|---|---|---|
| HP-01 | Jan | resident, former postal worker |
| HP-02 | Myra | care worker |
| HP-03 | Sanne | activity coordinator |
| HP-04 | Kees | walking partner |
| RP-01 | Pepper | indoor host |
| RP-02 | Pocket guide | the outdoor voice |

<!--
- Four people, two devices, one voice
-->

## Objective stories

<!-- _class: glance -->

| | | |
|---|---|---|
| OS-01 | The walk itself | F2 · Well-being |
| OS-02 | Ask, don't test | F2 · Dignity, Identity |
| OS-03 | My station | F6 · Autonomy, Identity |

<!--
- Each ties a Function to a value, in a stakeholder's words
-->

## Objectives

<!-- _class: glance -->

| | | |
|---|---|---|
| OBJ-01 | Walk more | Must |
| OBJ-02 | Stay in the moment | Must |
| OBJ-03 | Welcome memories | Should |
| OBJ-04 | Calm at rest | Should |
| OBJ-05 | Own choice | Must |
| OBJ-06 | Adult voice | Should |
| OBJ-07 | Help without tracking | Must |
| OBJ-08 | Time freed, company kept | Should |
| OBJ-09 | Listening that fits | Could |

<!--
- Four Musts; walking comes first
-->

## Use cases and functions

<!-- _class: glance -->

| | | |
|---|---|---|
| UC01 | Guided garden walk | F1, F2, F4, F5 |
| UC02 | Seated or lying practice | F1, F3, F5 |
| UC03 | Listening | F5, F6 |
| F1 | Invite | two options; no is final |
| F2 | Guide the walk | cues, memories, the way back |
| F3 | Guide practice | body, breath, sound |
| F4 | Call a person | gate, cord, fall, silence |
| F5 | Keep a short record | four items |
| F6 | Recommend listening | two options; news on request |

<!--
- Three use cases share six functions
-->

## Claims

<!-- _class: glance dense -->

| | | |
|---|---|---|
| CL1 | Invitation | more walks started |
| CL2 | Present-moment cues | fewer turn-backs, longer walks |
| CL3 | Walking and recall | walk remembered better than the chair |
| CL4 | Memory prompts | more engagement |
| CL5 | Memory prompts (adverse) | stir "I must go home" |
| CL6 | Voice (adverse) | sounds childish |
| CL7 | Alerts | in time, not felt as tracking |
| CL8 | Staff time | less time, same company |
| CL9 | Paced practice | longer engagement |
| CL10 | Dusk practice | less evening agitation |
| CL11 | Robot in the room (adverse) | feels like being watched |
| CL12 | Personal offers | accepted more often |
| CL13 | Calm evenings | less distress |
| CL14 | Evening default (adverse) | kept from the news |

<!--
- Fourteen claims, four adverse
- Success criteria in the Evaluation section
-->

## Design patterns

<!-- _class: glance -->

| | | |
|---|---|---|
| TDP-01 | Voice in the pocket, person in reach | System anchors; a person keeps company; staff keep safety |
| IDP-01 | Present-moment cue | mention what is here, then silence |
| IDP-02 | Memory invitation | state, never ask |
| IDP-03 | Two-option offer | two concrete options; no is fine |

<!--
- One team pattern, three interaction patterns
-->

## Evaluation

<!-- _class: dark -->

### Verification and validation

<!--
- Verification: do the Functions work as specified (Premises)
- Validation: do they have the intended effect (Claims)
- Four phases, thirteen weeks
-->

## Evaluation plan

<!-- _class: diagram -->

![w:1110](img/study-plan.svg)

<!--
- Phase 1: technical checks, no residents
- Phase 2: human-operated prototype, tune the voice
- Phase 3: ABAB validation of the Claims
- Phase 4: interviews with staff and family
- Ethics approval before any resident takes part
-->

## Phase 1: technical verification

<!-- _class: table -->

| Test event | Required behaviour | Acceptance criterion (proposed) |
|---|---|---|
| Walker passes the gate beacon | Alert on the care worker's phone | ≤ 10 s, in 19 of 20 trials |
| Pull-cord | Alert; "Someone is coming" | ≤ 10 s, in 20 of 20 trials |
| Device dropped, no response | Two check-ins, then an alert | ≤ 2 min |
| Stop at a bench | Wait, then offer seated practice | after 60-90 s |
| Resident declines an offer | No repeat offer | for ≥ 30 min |
| Session ends | Record contains four items, nothing else | 100% of records |

20 trials per event · no human participants · criteria to be agreed with care staff

<!--
- Staged events against a timestamped reference log
- Premises PR1-PR6
- Numbers are proposals; care workers set the final ones
-->

## Phase 2: human-operated prototype test

<!-- _class: table -->

| Factor | Condition A | Condition B |
|---|---|---|
| Memory cue | Question: "Do you remember your round?" | Statement from the life story |
| Silence between cues | 30 s | 90 s |
| Form of address | First name | No name |

A researcher voices the guide from a script · 4-6 residents · outcomes: observed affect (M-04), engagement (M-05), "talked down" codes (M-08)

<!--
- Formative: before anything is automated
- Each factor varied across short walks and sessions
- The wording residents respond to best goes into the script
-->

## Phase 3: summative validation

<!-- _class: diagram -->

![w:1110](img/abab.svg)

<!--
- Single-case ABAB: baseline, intervention, baseline, intervention
- 8-12 residents, each their own control
- Walk data every walk; observer on sample walks
- Agitation rated by staff at the end of each phase
- Recall task and interview in intervention phases only
-->

## Recall task: ambulatory versus seated encoding

<!-- _class: diagram -->

![w:1110](img/recall.svg)

<!--
- The vacation question, tested on residents (CL3)
- Same target event: a bell, walking or seated
- One hour later: free recall, then a choice of three pictures
- Stop at any sign of discomfort
-->

## Success criteria

<!-- _class: table -->

| Claim | Confirmed if |
|---|---|
| Walking (CL1, CL2) | More walks per week; longer walks; fewer early terminations |
| Recall (CL3) | Ambulatory recall above seated recall, within participants |
| Reminiscence (CL4, CL5) | Higher engagement; no rise in gate alerts or sadness |
| Dignity (CL6) | No "talked down" codes from residents or staff |
| Staffing (CL8) | Fewer staff minutes per walk; human company not reduced |
| Evenings (CL10, CL13) | Lower evening agitation (CMAI) |

<!--
- Each criterion is set before the study starts
- Staffing counts only if human company stays the same
- A null result on recall weakens the walking-first argument; we report it either way
-->

<!-- ## Next steps -->

<!-- _class: words -->
<!-- 
- Garden policy
- Evidence check
- Cue script
- Prototype test -->

<!--
- Garden policy with management
- Evidence pass on the references
- First cue script with one family
- Human-operated prototype test on the garden loop
- Open for questions
-->
