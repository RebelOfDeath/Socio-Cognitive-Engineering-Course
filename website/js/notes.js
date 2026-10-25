/* Speaker notes in presentation order: what we say. Press N in the deck. */
(function () {
  'use strict';
  Object.assign(K.notes, {
    "cover": [
      "Our project is about the first weeks in a care home, and about how a robot could help a new resident meet someone. Before we introduce our persona Elena, we want to start with two quick questions for you."
    ],
    "open-q1": [
      "First: think back to the last time you walked into a room where you knew nobody at all: your first day at university, a new job, or moving to a new city.",
      "Even when you are young, sharp, and know why you are there, walking up to strangers and starting from zero takes effort."
    ],
    "open-q2": [
      "Second: think of one close friend you have today. What actually turned that first hello into a real friendship?",
      "It is almost never being introduced to ten people at once around a loud table. Usually you discover one small thing in common, there is no pressure, and you run into each other a second time before the first conversation is forgotten."
    ],
    "open-hook": [
      "Now imagine doing that at eighty-one, after moving into a care home with mild Alzheimer’s disease.",
      "On day one you are introduced to the whole dining table at once; by the evening every name is gone, and staying in your room feels safer. Our goal is a quiet host that helps a newcomer find one person worth meeting again. Pepper does not pretend to be a friend, and it does not replace the people around her."
    ],
    "arrive": [
      "Elena is 81 and has mild Alzheimer’s disease. Her son brings her in after a fall at home.",
      "For twenty-five years she ran the post office counter in a small town, and she knew half the town by name. In the care home she knows nobody."
    ],
    "flurry": [
      "On her first day a care worker introduces her to her whole table and to several staff, one after the other.",
      "By the evening she remembers none of the names. The other residents give her space, and she waits for them to come to her. Over the following weeks she spends more and more time in her room. That is our first problem scenario, PS-01."
    ],
    "wait": [
      "Down the corridor, in Room 12, lives Jan. He ran the bakery in the same town for thirty years, and the people he used to talk to here have died or moved away, so he stays in his room. That is PS-02.",
      "Elena and Jan share a town and decades of the same streets, and neither of them knows it. People underestimate how much a new acquaintance likes them, the liking gap, so each waits for the other to make the first move. And when someone is invited face to face in the lounge, they may say yes out of politeness and then avoid the person who asked; that is PS-04."
    ],
    "context": [
      "We worked out two lines of the problem in the wiki, meaningful connections and morning care. Today we present connections in depth; morning care has its own pages, from situated activities to evaluation.",
      "Briefly, who is involved and what is at stake. Residents decide whether to meet and what is shared; the activity coordinator approves every match and keeps the relationship map; the care worker brings people together and takes the painful questions; relatives help with the life story.",
      "Social connectedness is the value we design for; autonomy, privacy, dignity and truthfulness limit how. Four of our six value tensions show here: matching needs personal facts, an invitation can pressure, a painful truth can hurt, and repeating names can expose forgetting."
    ],
    "rules": [
      "What does the research tell Pepper to do? People underestimate how much others like them, and saying no to someone’s face is hard, so Pepper asks each person alone, where saying no is easier. Strangers connect over something they share, so Pepper names one shared thing that both released, once. Speakers prefer to repair their own slips, and help offered too soon exposes the slip, so Pepper steps back.",
      "And it does not improvise: in the design every sentence is prepared and checked, and nothing leaves the home. Those are pass criteria for the verification; they have not been measured yet. You will see all of this in the story."
    ],
    "part2-video": [
      "Video, about three minutes: Elena and Jan’s first week as use case UC02. Elena releases what others may know, Pepper asks her and then Jan in private, introduces them with the one thing they share, stays silent while they talk, and keeps a short record. It starts when this stop is reached and pauses when you move on; click the video to pause it."
    ],
    "demo-video": [
      "Video, about four minutes: the proof of concept. A getting-to-know-you conversation with Elena in Dutch on the phone screen, the residents it suggests she meet, and a simulated Pepper talking with another resident. It starts when this stop is reached and pauses when you move on; click the video to pause it."
    ],
    "formative-claims": [
      "The formative walkthrough is planned and has not been run yet, so we show what it tests, not results.",
      "It follows EM-01 on a smaller scale. The operator stages events on the build: a refusal, an unclear answer, an unapproved match, a blocked pair, a wrong profile entry. Two evaluators log every run independently. Then four to six peers each go through a private ask and an introduction and answer three questions, one per Claim: would you meet this person again, how easy was it to say no, and did Pepper know more about you than you would like. Peers without dementia can only give early signals, and loneliness, CL9, cannot be probed in one session."
    ],
    "formative-changes": [
      "For every possible result we agreed the change in advance, so that the walkthrough cannot be read to suit us. An unclear answer taken as yes means one question per answer, and no clear answer counts as no. A slow correction gets a ‘That’s wrong’ button. If two or more peers find saying no hard, Pepper asks with no staff standing by; if two or more feel exposed, matching uses places and interests only.",
      "One result we know already from the code: the proof of concept sends speech to Google Cloud and uses a hosted language model for the conversation, so PR6, nothing leaves the home, cannot pass on this build. The consent questions, introductions and corrections are prepared lines."
    ],
    "summative-intro": [
      "The summative test is the Kinnect two-home study, ER-03. The walkthrough runs each event five times, too few for the EM-01 criteria, so the Premises are rerun at full size first. CL1, repeat contact, needs real residents over weeks; it is the closest Claim to ER-03’s primary hypothesis, which has no Claim ID yet. The adverse Claims CL3 and CL4 need residents and relatives, observed and interviewed, and ER-03 does not include those measures yet. Loneliness, CL9, needs months, and this study does not measure it."
    ],
    "verify": [
      "First the Premises. ER-03 itself says they must be verified on the build before the study, because otherwise a null result could just mean the System did not work. The revised build runs through EM-01: 50 runs for disclosure events and 20 for the rest, plus a full-day network capture. Every criterion met supports a Premise; met only with a restriction qualifies it; any failed run challenges it, and it is fixed and rerun before residents take part."
    ],
    "study": [
      "Then the validation: two care homes over the same weeks. One uses Kinnect, one keeps its usual activities. Thirty residents recruited per home, so that twenty-five complete. The graphic is the plan, not a result."
    ],
    "study-method": [
      "Thirty residents per home with mild to moderate dementia or MCI; consent from a representative, their own assent, and separate consent for badges. Care staff at both homes are trained in the protocol and take part in the debriefing interviews.",
      "Four weeks of set-up, with two baseline weeks at both homes. Week one: daily one-to-one sessions and profiles. Weeks two and three: matching and private asks. Weeks three and four: joint sessions with matched pairs. Week five: final agitation scores, badge data and debriefing interviews."
    ],
    "measures": [
      "The primary outcome is joint social time from location badges. The two key secondary outcomes are dyadic interactions from room scans and the share of the waking day spent in one’s own bedroom, corrected with Holm. Agitation is the harm check. Conversational engagement and affect are exploratory, at the Kinnect home only. First-time usability needs 18 of 25 residents.",
      "ER-03 does not measure reciprocated friendship or loneliness, so CL1 is tested through proxies and CL9 stays untested. It also has no measure for pressure or exposure, CL3 and CL4. We say that openly."
    ],
    "outcomes": [
      "The criteria are fixed in advance. The primary Claim is supported if the primary outcome and both key secondary outcomes are met with no rise in agitation; it is qualified if a secondary is missed or agitation rises; it is challenged if the primary outcome is not met, and that is reported as not shown, never as no effect. With one home per arm, a difference tells us about these two homes only.",
      "For the adverse Claims, supported means the risk is real, and then the pre-committed change applies: suggestions only for residents who ask for CL3, places and interests only for CL4. Those verdicts need the observation and interviews of EM-03 or EM-04 next to ER-03."
    ],
    "next": [
      "Four things change in the next cycle, each with a reason.",
      "The artifact: our proof of concept sends what residents say to Google Cloud and a hosted model. That breaks PR6 and TECH-07, so no resident may use it until speech runs on the robot and the model is local or gone.",
      "The foundation: our rule to ask each resident alone rests on HFC-17, that saying no to someone’s face is hard. That evidence comes from healthy adults. We don’t know whether a resident with dementia feels the same pressure when a robot asks, or more. So we compare pressure signs after Pepper’s asks with those after staff asks. If Pepper’s asks produce more, CL3 holds and Pepper stops offering and only answers residents who ask.",
      "The specification: ER-03’s hypotheses have no Claim IDs, so its verdict could not change the design; we tie the primary one to CL1. And the summative test: ER-03 counts time spent near each other, which falls short of friendship, so we add the friendship, pressure and exposure measures."
    ],
    "again": [
      "Back to Elena and Jan. After their walk, Pepper asks each of them alone whether they would like to meet again, and both say yes. This is the outcome we design for, not evidence that it works; whether it happens is what the summative test will tell us."
    ],
    "thanks": [
      "Thank you. Everything we showed is in our wiki, and the prototype code is on GitHub."
    ],
    "claim-example": [
      "Before the changes, one example of how a Claim relates to a Function. In SCE every Claim belongs to a Function: it is an effect we expect that Function to have.",
      "Take the introduction Elena and Jan get. Function F3: Pepper introduces them by name with the one thing both agreed to share, the post office and the bakery. Claim CL1 is about F3: introductions on shared ground lead to more repeat contact and more mutual friendships than introductions as usual, because people befriend people like themselves and rarely follow up a good first talk. We test it with M-02, whether the pair meets again within fourteen days, and M-05, whether they name each other. CL1 is the reason F3 exists.",
      "Function F1, asking each resident for a yes, carries an adverse Claim, CL3: because refusing is uncomfortable, a resident may say yes out of politeness and avoid the other afterwards. We look for pressure signs during the ask and avoidance the next week. If that happens more after Pepper’s introductions than after staff ones, F1 itself changes: Pepper only makes suggestions to residents who ask. So one Claim justifies the Function, and the other limits it."
    ]
  });
})();
