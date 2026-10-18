# Speaker notes

What we say at each stop; the screen only carries the headline. Press N in the deck to see the notes for the current stop.

Generated from the deck (`K.notes` in `js/`); edit the scene files, not this file.

## Cover

**01 Meaningful connections**

Our project is about the first weeks in a care home, and about how a robot could help a new resident meet someone. We tell it through one person, Elena.

## I Moving in

**02 Elena moves in**

Elena is 81 and has mild Alzheimer’s disease. Her son brings her in after a fall at home.

For twenty-five years she ran the post office counter in a small town, and she knew half the town by name. In the care home she knows nobody.

**03 She meets everyone at once**

On her first day a care worker introduces her to her whole table and to several staff, one after the other.

By the evening she remembers none of the names. The other residents give her space, and she waits for them to come to her. She also believes she will go home soon, so she sees little point in getting to know anyone. Over the following weeks she spends more and more time in her room.

**04 Jan stays in his room**

Two doors down lives Jan. He ran the bakery in the same town for thirty years and moved in two years ago.

The people he used to talk to here have died or moved away. When staff invite him to the lounge he says he will come next time. They ask less often, and every week it gets harder for him to go.

**05 Same town, without knowing it**

Elena and Jan share a town and decades of the same streets, and neither of them knows it.

Research on the liking gap shows that after a conversation, people think the other person liked them less than they actually did. So even after a good first talk, nobody makes the second move.

**06 Saying yes to be polite**

When residents do invite each other, it usually happens in the lounge with others listening. Turning someone down there feels rude, so people agree and later avoid the lounge.

People who ask tend to underestimate how hard it is to say no, and conversations often go on longer than both people want.

## II Two lines

**07 Two lines of the problem**

We worked on two lines of the problem at the same time. Besides meaningful connections, we developed morning care, where Pepper helps a resident with dementia brush her own teeth with graduated prompts.

Each line has its own situated activities, problem scenarios, values, tensions, human factors and claims. The bottom line is the morning-care work.

**08 Why we picked connections**

For the choice of technology and for the summative evaluation, we went with meaningful connections.

In morning care, Pepper mostly gives instructions at the sink, such as “Toothpaste next.” Introducing two people asks more of it. It has to judge who might get on and whether a yes was meant. It also has to respect what someone wants to keep private. That puts both the social and the cognitive side of the course into the design. Both lines are documented in our wiki.

## III What matters

**09 Stakeholders**

Seven stakeholders are involved. The resident and the fellow resident take part directly, and so do the care worker and the activity coordinator.

The coordinator matters most for our design. They run the life-story interview and keep the relationship map, and every match needs their approval before anyone is asked.

Relatives arrange the move and help write the life story. Medical staff decide who may walk in the garden, and management decides whether the home uses the System at all.

**10 Human values**

We identified eight human values. Social connectedness is the one the design exists for. We mean conversations that can grow into friendships, and Pepper never stands in for people.

The other seven limit how we may get there. Autonomy means residents choose whether to meet and what is shared. Dignity means a forgotten name passes without comment. Privacy means a life story belongs to its owner. Truthfulness means Pepper never lies, even kindly.

**11 Value tensions**

These values pull against each other in six places.

Matching on personal facts helps people connect but costs privacy, so residents release items one by one and the coordinator approves each match. Encouraging people to meet can feel like pressure, so Pepper asks in private and a no reaches nobody.

A painful truth can hurt, so Pepper hands those questions to a trusted care worker and never tells a therapeutic lie. Repeating names helps people remember but can expose forgetting, so Pepper says both names to both people as a plain statement.

## IV What we know

**12 Human factors**

We built on eleven human factors concepts. These six shaped the design most.

The liking gap and the difficulty of saying no explain why residents wait for each other and why polite yeses are common. Theory of mind is often affected in dementia, and residents misread nods and polite agreement. A system watching them would misread them too, so we do not let it guess.

People become friends with people who are like them, and shared background gives them something to talk about. In conversation, speakers prefer to repair their own slips. Help that comes too early takes their turn, and help aimed at one person singles them out.

**13 Design rules**

Three design rules follow from that literature.

Pepper asks each person alone, because nobody can read a polite yes and a private no costs nothing. At the introduction it names one thing the two share, once. After that it stays quiet, so a slip is theirs to fix and nobody is singled out.

## V The technology

**14 Technology choices**

We chose Pepper as a host in the lounge. It asks by voice and takes a yes or no on its tablet, and at an introduction it shows both photos. Its cameras are covered.

Each resident has a profile with their life story, preferences and past ties, and each item is marked shareable or private. Matching uses only released items and needs the coordinator’s approval. Everything runs on a local server inside the home, and room presence sensing is opt-in.

We left out a pocket guide carried all day, cloud speech services, audio recording, and location tracking with GPS, cameras or wristbands.

**15 Prepared sentences**

In the System we specify, Pepper only says sentences we wrote and checked in advance. A generated sentence could say something untrue about someone’s life, and nobody could check it before it was said.

For the summative study, Pepper will run a language model on the robot itself (TECH-18), so conversation data never leaves it.

## VI Elena’s first week

**16 The life-story interview**

Now we follow Elena through her first week with the System in place.

On her second day she sits down with the activity coordinator and her son for the life-story interview. She decides, item by item, what other residents may know. Her work at the post office, her town and her garden are shareable. Her diagnosis stays private, and so does her husband’s death last year. If she asks about him, Myra answers, as agreed with her son.

**17 Pepper says hello**

When Elena comes into the lounge for coffee, Pepper greets her and explains what it does. It says nothing more that day.

Pepper acts as a host who knows who might like to meet. It speaks in short adult sentences and never praises or uses pet names.

**18 The coordinator approves a match**

The System finds three residents who share something Elena released. The coordinator approves one of them: Jan.

Months ago Jan agreed that Myra may be told when he stays in his room for days. Last week she received such a note, and she has been looking in on him since.

**19 Pepper asks Elena**

In the quiet corner, Pepper asks Elena whether she would like to meet Jan. She can say no, and nobody would ever hear about it. She says yes, and she also agrees that Pepper may tell Jan about the post office.

**20 Pepper asks Jan**

The next morning Myra walks Jan to the lounge, and Pepper asks him in the same way. He says he would like that. Neither of them knows that the other was asked.

**21 “Your bread!”**

That afternoon Myra brings them to the same table. Pepper shows two photos, says both names, and mentions the one thing they share.

Elena recognises his bread straight away. She used to work across the road.

**22 Pepper stays silent**

They talk about the town and its old customers. At one point Elena loses a word, and Jan waits until she finds it herself. Pepper says nothing while they talk.

When the conversation runs down, Pepper suggests a walk in the garden, and Jan proposes the next day after lunch.

**23 “When can I go home?”**

That evening Elena asks Pepper when she can go home. Pepper does not answer the question itself. It offers to fetch Myra, and Myra comes and talks with her as agreed with her son.

Pepper never states the fact and never denies it, and it does not bring the topic up again.

**24 A walk in the garden**

The next day, after lunch, Myra gets a note on her phone about the walk. Jan has forgotten the plan, but he likes the idea when Myra mentions it.

Myra opens the garden door, and they walk once round the garden together. Pepper suggested a walk because both of them are assessed as fit for it.

**25 The record**

Afterwards the System keeps a short record: one introduction accepted by both, one walk, and two notes to Myra. It keeps no audio and no transcript of what they said to each other.

## VII The design

**26 Who decides**

Our team design pattern sets out who decides what. Elena and Jan decide whether to meet and what others learn about them. The coordinator approves matches and keeps the relationship map.

Myra brings people together and handles the painful questions. Pepper suggests matches and makes the introduction, then stays out of the way.

**27 How Pepper speaks**

Pepper’s speech follows three interaction design patterns.

Ask first means asking each person alone, in advance, with two options, and treating a no as final. Truthful deferral means a painful question goes to the trusted person, and Pepper neither answers nor denies it. Wait, then redirect gently means that when someone stops mid-sentence, Pepper waits about eight seconds and then offers a way back, said to both people.

**28 What Pepper never does**

Some of our objectives are easiest to state as things Pepper never does. It never asks someone whether they remember a name, and it never tells a lie, even a kind one. A refusal is never passed on, and Pepper does not pretend to be a person or a friend.

**29 Claims**

A claim is a prediction about what the design will do, and the evaluation tests it. Five claims describe what the design should achieve. CL1 is the main one: residents introduced this way meet again and become friends.

Four claims are adverse. They describe ways the design could hurt residents, and for each one we decided in advance what we would change if the evaluation confirms it.

## VIII The prototype

**30 A live walkthrough**

Gints built a proof of concept that works as a live walkthrough. Role-players speak as the residents, out loud and in ten languages, and an operator plays the care home.

A language model plays the TECH-18 version of Pepper, and evaluators check each step against what our use cases expect.

**31 Getting to know someone**

Pepper gets to know a resident by asking what they like to talk about, whom they would like to meet, and whom they would rather not. What it learns goes into a profile that the coordinator can review and edit.

Only pairs where nobody said “rather not” can be suggested, and nobody hears about a suggestion until they are asked alone.

**32 The relationship map**

The coordinator keeps a relationship map. For each pair it shows whether both agreed, whether a meeting may be offered, whether someone said not again, or whether there is no record yet. Pepper only offers pairs the map allows.

**33 “I had that wrong.”**

To test the prototype, we change one profile entry before a run without telling the evaluators which one. Here Jan’s bakery is placed on the wrong street.

When Jan corrects it, Pepper has to admit the mistake plainly, and the error is flagged for the coordinator together with the item it came from.

## IX How we will know

**34 Checking the premises**

The evaluation has two parts. First we check the premises: does the System behave as we specified? We test that with role-players and staged events, before any resident takes part.

Only once these checks pass do we test the claims with real residents.

**35 The Kinnect study**

The summative evaluation is the Kinnect study. It runs in two care homes over the same weeks. One home uses Kinnect, and the other keeps its usual activity programme.

We need 25 residents per home to finish the study to detect a medium to large effect. To allow for dropout we recruit 30 per home, sixty in total.

**36 Measures**

The main outcome is joint social time: how often two residents spend at least five minutes within two metres of each other, measured with location badges and compared with the weeks before the study.

We also count conversations and measure time alone in the bedroom. Agitation is our check for harm. A second claim is that first-time users understand Pepper. That holds if at least 18 of 25 residents complete the steps in the first week.

## X Meet again

**37 “Would you like to meet Jan again?”**

Back to Elena and Jan. After their walk, Pepper asks each of them alone whether they would like to meet again, and both say yes. That is what we design for: two people who want to see each other again.

**38 Thank you**

Thank you. Everything we showed is in our wiki, and the prototype code is on GitHub.
