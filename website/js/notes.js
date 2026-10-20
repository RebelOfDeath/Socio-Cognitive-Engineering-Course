/* Speaker notes in presentation order: what we say. Press N in the deck. */
(function () {
  'use strict';
  Object.assign(K.notes, {
  "cover": [
    "Our project is about the first weeks in a care home, and about how a robot could help a new resident meet someone. Before we introduce our persona Elena, we want to start with two quick questions for you."
  ],
  "open-q1": [
    "First: think back to the last time you walked into a room where you knew nobody at all—your first day at university, a new job, or moving to a new city.",
    "Even when you are young, sharp, and know why you are there, walking up to strangers and starting from zero takes effort."
  ],
  "open-q2": [
    "Second: think of one close friend you have today. What actually turned that first hello into a real friendship?",
    "It is almost never being introduced to ten people at once around a loud table. Usually you discover one small thing in common, there is no pressure, and you run into each other a second time before the first conversation is forgotten."
  ],
  "open-hook": [
    "Now imagine doing that at eighty-one, after moving into a care home with mild Alzheimer’s disease.",
    "On day one you are introduced to the whole dining table at once; by the evening, every name is gone, and staying in your room feels safer. Our goal is not to build a robot companion that replaces human contact, but a quiet host that helps a newcomer find one person worth meeting again."
  ],
  "arrive": [
    "Elena is 81 and has mild Alzheimer’s disease. Her son brings her in after a fall at home.",
    "For twenty-five years she ran the post office counter in a small town, and she knew half the town by name. In the care home she knows nobody."
  ],
  "flurry": [
    "On her first day a care worker introduces her to her whole table and to several staff, one after the other.",
    "By the evening she remembers none of the names. The other residents give her space, and she waits for them to come to her. Over the following weeks she spends more and more time in her room."
  ],
  "wait": [
    "Two doors down in Room 12 lives Jan. He ran the bakery in the same town for thirty years, and the people he used to talk to here have died or moved away, so he stays in his room.",
    "Elena and Jan share a town and decades of the same streets, and neither of them knows it. Because of the liking gap, each waits for the other to make the first move—and when invitations happen in front of others in the lounge, people say yes just to be polite and later avoid the room."
  ],
  "context": [
    "We worked out two lines of the problem, meaningful connections and morning care; for the technology and the evaluation we carried connections through, because an introduction asks Pepper to reason about people. Both are in the wiki.",
    "Briefly, who is involved and what is at stake. Residents decide whether to meet and what is shared; the activity coordinator approves every match and keeps the relationship map; the care worker brings people together and takes the painful questions; relatives help with the life story.",
    "Social connectedness is the value we design for; autonomy, privacy, dignity and truthfulness limit how. They clash in four places that shape UC02: matching needs personal facts, an invitation can pressure, a painful truth can hurt, and repeating names can expose forgetting."
  ],
  "rules": [
    "What does the research tell Pepper to do? People underestimate how much others like them, and saying no to someone’s face is hard — so Pepper asks each person alone, where no costs nothing. Strangers connect over one thing they share — so Pepper names one shared thing, once. People with dementia prefer to repair their own slips, and help singles them out — so Pepper steps back.",
    "And it never improvises: every sentence is prepared and checked, and nothing leaves the home. You will see all of this in the story."
  ],
  "part2-video": [
    "Video: part2_3min.mp4. It starts when this stop is reached and pauses when you move on; click the video to pause it."
  ],
  "demo-video": [
    "Video: 2026-10-20 demos combined (faster).mp4. It starts when this stop is reached and pauses when you move on; click the video to pause it."
  ],
  "formative-claims": [
    "CL1 looks promising: four of five would meet their partner again, and the shared item opened every conversation. CL3 is a weak signal: one participant found refusing hard, and the one hesitation we saw came when a team member stood next to Pepper.",
    "CL4 is the clearest risk: two of five felt Pepper knew too much, and both asked how it knew where they had worked — it was the source, not the other person, that bothered them. The surprise: Pepper’s activity offer came while two pairs were still talking, and they ignored it. CL9 cannot be probed here."
  ],
  "formative-changes": [
    "Every finding leads to a change with a retest. Prepared lines only and no hosted model, for PR3 and PR6. No clear answer means no, confirmed with a tap, for PR1. A ‘That’s wrong’ button for slow corrections. For CL4 we apply the criterion’s response — places and interests only — and Pepper says where it knows something from. The ask happens without staff nearby, and the activity is offered only when the talk stalls or at the end."
  ],
  "summative-intro": [
    "The summative test is the Kinnect two-home study. It first re-verifies the four UC02 Premises at full size on the revised build, then validates the Claims with residents. The walkthrough cannot settle CL1, CL3 or CL4: those need real residents with dementia, over weeks, in their own home. Loneliness, CL9, needs months, and this study does not measure it."
  ],
  "verify": [
    "First the gate: the revised build runs through EM-01 at full size, 50 runs for disclosure events and 20 for the rest, plus a full-day network capture. A full pass supports a Premise; a pass with a restriction qualifies it; any consent or privacy violation challenges it and blocks resident testing until fixed."
  ],
  "study": [
    "Then the validation: two care homes over the same weeks. One uses Kinnect, one keeps its usual activities. Thirty residents recruited per home, twenty-five to complete. The graphic is the plan, not a result."
  ],
  "study-method": [
    "Thirty residents per home with mild to moderate dementia or MCI, aiming for twenty-five to complete; representative consent, their own assent, and separate consent for badges.",
    "Four weeks of setup with two baseline weeks at both homes. Week one: daily one-to-one sessions and profiles. Weeks two and three: matching and private asks. Weeks three and four: joint sessions with matched pairs. Week five: final agitation scores, badge data and debriefing interviews."
  ],
  "measures": [
    "The primary outcome is joint social time from location badges, which is our proxy for repeat contact in CL1, together with dyadic interactions, conversational engagement and time in the bedroom. Agitation is the harm check for CL3. The week-five debriefing interviews are coded for pressure and exposure, for CL3 and CL4. First-time usability needs 18 of 25 residents.",
    "This study does not measure reciprocated friendship or loneliness, so CL1 is tested through proxies and CL9 stays untested. We say that openly."
  ],
  "outcomes": [
    "The criteria are fixed in advance. CL1 is supported if joint social time and dyadic interactions both rise more at the Kinnect home; one of the two qualifies it; neither challenges it, without proving there is no effect.",
    "For the adverse Claims, supported means the risk is real: a rise in agitation or pressure codes for CL3, exposure codes for CL4, and then the pre-committed change applies. Usability is supported at 18 of 25."
  ],
  "next": [
    "The next iteration closes the loop. Foundation: people want to know how Pepper knows things, and a bystander makes refusing harder. Specification: no clear answer means no, places and interests only, a source line, the activity at the end, and a new PR3 criterion of zero generated utterances. Artifact: a revised build on prepared lines, fully local.",
    "That build must pass the full verification gate; then the two-home study runs, and its Claim verdicts feed the next Foundation."
  ],
  "again": [
    "Back to Elena and Jan. After their walk, Pepper asks each of them alone whether they would like to meet again, and both say yes. This is the outcome we design for, not evidence that it works; whether it happens is what the summative test will tell us."
  ],
  "thanks": [
    "Thank you. Everything we showed is in our wiki, and the prototype code is on GitHub."
  ]
});
})();
