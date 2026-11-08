# Final presentation: plan and progress

The animated Elena and Jan story opens the deck; the background is two slides; UC02 and the proof of concept are shown as videos; evaluation runs as one chain: planned formative walkthrough → change agreed per result → planned summative test (ER-03) → next iteration. Opening and ending are the originals.

| Outline item | Stop IDs |
|---|---|
| Opening | cover, open-q1, open-q2, open-hook |
| Moving in (problem scenarios) | arrive, flurry, wait |
| Background | context (stakeholders, values, tensions), rules (human factors and technology) |
| Elena and Jan, UC02 | part2-video |
| Artifact | demo-video |
| Formative evaluation (planned) | formative-claims, claim-example (how a Claim relates to a Function: CL1 to F3, CL3 to F1), formative-changes |
| Planned summative test | summative-intro, verify, study, study-method, measures |
| Outcomes | outcomes |
| Next iteration | next |
| Ending | again, thanks |

23 stops. The summative test is the Kinnect study (EM-08, ER-03) as written in the wiki. Its hypotheses have no Claim IDs yet; UC02-F3-CL1 is the closest. ER-03 does not measure CL3, CL4, CL9, M-05 or M-09, and the slides say so.

## Status

1. ✅ Structure
2. ✅ Walkthrough protocol and result sheet: `WALKTHROUGH-PROTOCOL.md`
3. ⬜ Run the walkthrough (team). Until then the formative slides show the plan, with no results.
4. ✅ Summative slides checked against ER-03, the measures (b4.1) and the methods (b5.1) on 2026-10-25
5. ⬜ Once the walkthrough has run: put its results on the formative slides and update the next iteration
6. ✅ PDF export: `export/export-pdf.py`

## Known from the code, without the walkthrough

The proof of concept (`sce-poc`) speaks consent questions, introductions and corrections from prepared lines (`server/lines.ts`), but it uses Google Cloud speech and a hosted language model (Claude or Gemini, `server/llm/`). PR6 (no packet leaves the home) cannot pass on this build.
