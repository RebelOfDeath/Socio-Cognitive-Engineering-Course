# Speaker notes

Exported from `js/notes.js` (press N in the deck). The formative results are placeholders until the walkthrough has run (press P to see them).

## Opening

**01 Meaningful connections**

Our project is about the first weeks in a care home, and about how a robot could help a new resident meet someone. Before we introduce our persona Elena, we want to start with two quick questions for you.

**02 A room of strangers**

First: think back to the last time you walked into a room where you knew nobody at all—your first day at university, a new job, or moving to a new city.

Even when you are young, sharp, and know why you are there, walking up to strangers and starting from zero takes effort.

**03 How strangers become friends**

Second: think of one close friend you have today. What actually turned that first hello into a real friendship?

It is almost never being introduced to ten people at once around a loud table. Usually you discover one small thing in common, there is no pressure, and you run into each other a second time before the first conversation is forgotten.

**04 Starting over at eighty-one**

Now imagine doing that at eighty-one, after moving into a care home with mild Alzheimer’s disease.

On day one you are introduced to the whole dining table at once; by the evening, every name is gone, and staying in your room feels safer. Our goal is not to build a robot companion that replaces human contact, but a quiet host that helps a newcomer find one person worth meeting again.

## Moving in

**05 Elena moves in**

Elena is 81 and has mild Alzheimer’s disease. Her son brings her in after a fall at home.

For twenty-five years she ran the post office counter in a small town, and she knew half the town by name. In the care home she knows nobody.

**06 She meets everyone at once**

On her first day a care worker introduces her to her whole table and to several staff, one after the other.

By the evening she remembers none of the names. The other residents give her space, and she waits for them to come to her. She also believes she will go home soon, so she sees little point in getting to know anyone. Over the following weeks she spends more and more time in her room.

**07 Jan stays in his room**

Two doors down lives Jan. He ran the bakery in the same town for thirty years and moved in two years ago.

The people he used to talk to here have died or moved away. When staff invite him to the lounge he says he will come next time. They ask less often, and every week it gets harder for him to go.

**08 Same town, without knowing it**

Elena and Jan share a town and decades of the same streets, and neither of them knows it.

Research on the liking gap shows that after a conversation, people think the other person liked them less than they actually did. So even after a good first talk, nobody makes the second move.

**09 Saying yes to be polite**

When residents do invite each other, it usually happens in the lounge with others listening. Turning someone down there feels rude, so people agree and later avoid the lounge.

People who ask tend to underestimate how hard it is to say no, and conversations often go on longer than both people want.

## Background

**10 Who decides, what we protect**

We worked out two lines of the problem, meaningful connections and morning care; for the technology and the evaluation we carried connections through, because an introduction asks Pepper to reason about people. Both are in the wiki.

Briefly, who is involved and what is at stake. Residents decide whether to meet and what is shared; the activity coordinator approves every match and keeps the relationship map; the care worker brings people together and takes the painful questions; relatives help with the life story.

Social connectedness is the value we design for; autonomy, privacy, dignity and truthfulness limit how. They clash in four places that shape UC02: matching needs personal facts, an invitation can pressure, a painful truth can hurt, and repeating names can expose forgetting.

**11 Four design rules**

What does the research tell Pepper to do? People underestimate how much others like them, and saying no to someone’s face is hard — so Pepper asks each person alone, where no costs nothing. Strangers connect over one thing they share — so Pepper names one shared thing, once. People with dementia prefer to repair their own slips, and help singles them out — so Pepper steps back.

And it never improvises: every sentence is prepared and checked, and nothing leaves the home. You will see all of this in the story.

## Elena and Jan · UC02

**12 The life-story interview**

Now we follow Elena with the System in place, through our selected use case, UC02 Introducing two residents. Its precondition is a profile: on her second day, with her son, she decides item by item what other residents may know. Her work, her town and her garden are released; her diagnosis and her husband’s death stay private.

**13 The coordinator approves a match**

UC02 steps 1 and 2. The System finds three residents who share something Elena released, never health, losses or family conflicts. The coordinator approves one of them: Jan. This is Premise PR2.

**14 Pepper asks Elena**

In the quiet corner, Pepper asks Elena whether she would like to meet Jan. She can say no, and nobody would ever hear about it. She says yes, and she also agrees that Pepper may tell Jan about the post office.

**15 Pepper asks Jan**

The next morning Myra walks Jan to the lounge, and Pepper asks him in the same way. He says he would like that. Neither of them knows that the other was asked.

**16 “Your bread!”**

That afternoon Myra brings them to the same table. Pepper shows two photos, says both names, and mentions the one thing they share.

Elena recognises his bread straight away. She used to work across the road.

**17 Pepper stays silent**

They talk about the town and its old customers. At one point Elena loses a word, and Jan waits until she finds it herself. Pepper says nothing while they talk.

When the conversation runs down, Pepper suggests a walk in the garden, and Jan proposes the next day after lunch.

**18 A walk in the garden**

The activity they chose: the next day Myra opens the garden door and they walk once round the garden. Pepper suggested a walk only because both prefer it and are assessed fit for it. The reminder at the agreed time belongs to UC03, which we leave aside today.

**19 The record**

UC02 ends with a short record: one introduction accepted by both, one walk, one note to Myra. No audio and nothing of what they said. That is Premise PR6.

## Use case and criteria

**20 UC02 Introducing two residents**

This is the use case we carry through the evaluation: UC02, Introducing two residents. These are the six steps you just watched. The coordinator approves the match; Pepper asks each person alone; Myra brings them together; Pepper introduces them with one shared thing and stays silent; afterwards it asks each of them privately whether to meet again; and the System keeps a short record.

Pepper suggests, people decide. Each step is checked by a Premise — that is the next slide.

**21 Premises, measures and criteria**

Does the system do what we promised? We check that without residents: team members act out each situation many times and count mistakes. A no never reaches the other person — zero of fifty may leak. Only approved matches, never health or family details. Names as plain statements, one shared thing, a wrong fact corrected within three seconds. And almost nothing stored: no audio, nothing leaves the home.

**22 Claims, measures and criteria**

Does it help, and could it hurt? That only real residents can tell us, over weeks. We hope they meet again and become friends, more than in a home without Pepper — that is CL1, our main claim. Less loneliness, CL9, is a long shot.

Two risks we watch for: people saying yes just to be polite and then avoiding each other, and matching feeling exposing. For each we decided in advance what we would change if we see it.

## Artifact

**23 What we built**

What we built is a software prototype of Pepper’s side of UC02. It is meant to run on the robot; here it runs on screen. Implemented: released and private profile items, the relationship map, consent-gated suggestions, the two private asks, the correction with an error flag, and the record.

Simulated: Pepper’s speech comes from a language model, and the residents are role-players. Operator-controlled: the care home, including the events we inject. Not built: the robot itself, its tablet, staff notes.

**24 Demo video**

WIP — the recorded demo plays here. Narrate: the coordinator approves the match; Elena is asked alone; Jan is asked alone; the introduction names one shared item; Pepper stays silent; the activity is offered; each is asked “again?” privately; the record shows only decisions.

## Formative evaluation

**25 The walkthrough as formative evaluation**

How did we test the prototype? Two parts. Does it work: the team acted out eleven situations in the prototype, five times each — refusals, unapproved matches, a planted wrong fact, the record afterwards — and two evaluators who had not written the script checked every step.

How does it feel: five peers played residents talking to the prototype, and after each ask and each introduction answered three questions. This is a signal, not proof: an on-screen prototype, not the robot, and not residents with dementia.

**26 A planted mistake**

One of the planted events: a wrong fact in Jan’s profile, unknown to the evaluators. When Jan corrected it, the prototype had to say plainly that it had it wrong, within three seconds, and flag it for the coordinator. It did so in three of five runs; the other two took about four seconds.

**27 Findings: Premises**

Did the prototype keep its promises? Matching held: no unapproved match, blocked pair or private detail. Ask first broke once: an unsure ‘hm, okay’ was counted as a yes — although a no never reached the other person.

The other two problems both come from the online language model: two corrections were slow and once it said ‘Do you remember the bakery?’, and every sentence went to an online service. Those Premises are challenged.

**28 Findings: Claims and surprises**

How did it feel to be asked? Four of five would meet their partner again, and the shared item opened every conversation. One of five found saying no hard — it felt rude to refuse something so polite. Two of five felt Pepper knew too much: ‘how does it know where I worked?’

And a surprise: Pepper suggested an activity while two pairs were still talking, and they ignored it. Loneliness cannot be tested in one session.

**29 What the findings change**

What we change before it runs on Pepper: prepared lines only, nothing online. Unsure means no, and a yes is confirmed with a tap. Pepper says where it knows something from, and matching uses places and interests only. It asks with no staff standing by. And the activity comes only when the talk stalls or at the end. Each change is rechecked on the revised prototype, and then on Pepper itself.

## Planned summative test

**30 What the summative test addresses**

The summative test is the Kinnect two-home study. It first re-verifies the four UC02 Premises at full size on the revised build, then validates the Claims with residents. The walkthrough cannot settle CL1, CL3 or CL4: those need real residents with dementia, over weeks, in their own home. Loneliness, CL9, needs months, and this study does not measure it.

**31 Verification gate**

First the gate: the revised build runs through EM-01 at full size, 50 runs for disclosure events and 20 for the rest, plus a full-day network capture. A full pass supports a Premise; a pass with a restriction qualifies it; any consent or privacy violation challenges it and blocks resident testing until fixed.

**32 Two care homes, compared**

Then the validation: two care homes over the same weeks. One uses Kinnect, one keeps its usual activities. Thirty residents recruited per home, twenty-five to complete. The graphic is the plan, not a result.

**33 Participants, tasks and procedure**

Thirty residents per home with mild to moderate dementia or MCI, aiming for twenty-five to complete; representative consent, their own assent, and separate consent for badges.

Four weeks of setup with two baseline weeks at both homes. Week one: daily one-to-one sessions and profiles. Weeks two and three: matching and private asks. Weeks three and four: joint sessions with matched pairs. Week five: final agitation scores, badge data and debriefing interviews.

**34 Measures per Claim**

The primary outcome is joint social time from location badges, which is our proxy for repeat contact in CL1, together with dyadic interactions, conversational engagement and time in the bedroom. Agitation is the harm check for CL3. The week-five debriefing interviews are coded for pressure and exposure, for CL3 and CL4. First-time usability needs 18 of 25 residents.

This study does not measure reciprocated friendship or loneliness, so CL1 is tested through proxies and CL9 stays untested. We say that openly.

## Outcomes and limits

**35 Support, qualify or challenge**

The criteria are fixed in advance. CL1 is supported if joint social time and dyadic interactions both rise more at the Kinnect home; one of the two qualifies it; neither challenges it, without proving there is no effect.

For the adverse Claims, supported means the risk is real: a rise in agitation or pressure codes for CL3, exposure codes for CL4, and then the pre-committed change applies. Usability is supported at 18 of 25.

**36 Limitations**

One home per arm: the home may explain the difference. Five weeks of badge proximity shows contact, not friendship. Being observed changes behaviour, and observers are not blind. Badges sit uneasily with our rejection of tracking, and the on-robot language processing the study assumes does not exist yet.

## Next iteration

**37 The next SCE cycle**

The next iteration closes the loop. Foundation: people want to know how Pepper knows things, and a bystander makes refusing harder. Specification: no clear answer means no, places and interests only, a source line, the activity at the end, and a new PR3 criterion of zero generated utterances. Artifact: a revised build on prepared lines, fully local.

That build must pass the full verification gate; then the two-home study runs, and its Claim verdicts feed the next Foundation.

## Meet again

**38 “Would you like to meet Jan again?”**

Back to Elena and Jan. After their walk, Pepper asks each of them alone whether they would like to meet again, and both say yes. This is the outcome we design for, not evidence that it works; whether it happens is what the summative test will tell us.

**39 Thank you**

Thank you. Everything we showed is in our wiki, and the prototype code is on GitHub.
