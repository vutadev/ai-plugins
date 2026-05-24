# INVEST Reference

Six criteria for evaluating user-story quality. Apply to every `US-*` described through `reference/user-stories-guide.md` before marking a story `Ready`.

Source: Bill Wake, *INVEST in Good Stories, and SMART Tasks* (2003). Wording adapted from the BA Zone Digital School training material (Phúc NT, MIT).

---

## The Six Criteria

### I — Independent

**Key question:** Can this story be built, tested, and shipped without waiting on another story?

**Common failures:**
- Story B can only start after Story A merges.
- Two stories must deploy in the same release for either to work.
- Tests need data produced by another story.

**Fixes:** Merge tightly-coupled stories. Pull the dependency out into its own prioritized story. Use mock / fixture data for independent verification.

### N — Negotiable

**Key question:** Is implementation deliberately left open, or has the story already prescribed how to build it?

**Red flags:**
- Multi-page UI specs down to pixel placement.
- Mandated technology choices ("must use Redis").
- Detailed algorithms embedded in the story body.

**Fixes:** Keep the story tight. Push "what" and "why" into the story; push "how" into AC, design docs, or refinement conversations.

### V — Valuable

**Key question:** What concrete benefit does the user or business gain?

**Red flags:**
- Empty or generic "So that" clause.
- Value visible only to developers (refactor, library bump).
- Cannot answer: "What breaks if we skip this?"

**Fixes:** Outcome-focused "So that" wording. Frame technical-debt stories with downstream business impact. Apply Five Whys until a user/business outcome surfaces.

### E — Estimable

**Key question:** Can the team forecast effort with reasonable confidence?

**Red flags:**
- Team answers "unknown — need to research".
- Estimate variance >3× across team members.
- Story contains genuine technical unknowns.

**Fixes:** Carve a spike story to investigate. Add missing context (constraints, data shape, prior art). Isolate unknowns into a separate prioritized item.

### S — Small

**Key question:** Finishable in one sprint without further splitting? Aim for ≤5 developer-days.

**Red flags:**
- Estimate >5 days.
- ≥7 acceptance criteria.
- Multiple CRUD operations.
- Title contains "AND".
- Multiple personas in one story.

**Fixes:** Split per `reference/STORY_SPLITTING.md` (CRUD / persona / data type / business rule / workflow stage / platform).

### T — Testable

**Key question:** Can QA write at least one executable test case from the AC without asking further questions?

**Red flags:**
- Vague language: "fast", "beautiful", "intuitive", "secure", "user-friendly".
- AC missing entirely.
- AC describes intent, not observable outcome.

**Fixes:** Restate every AC as Given / When / Then with measurable conditions (numbers, states, named messages). Define "Done" explicitly.

---

## Quick Validation Table

| Criterion | Check |
|-----------|-------|
| Independent | Runs without other stories. |
| Negotiable | Implementation open to refinement. |
| Valuable | User / business benefit named. |
| Estimable | Team can forecast effort. |
| Small | One sprint, ≤5 days. |
| Testable | AC measurable; QA can write TCs. |

Mark each cell `✅` (pass), `⚠️` (watch — proceed with note), or `❌` (fail — block commit).

---

## When INVEST Fails

Decision tree for failed cells:

1. **`I` fails** → Merge with the dependency story OR extract the dependency as its own prioritized story.
2. **`N` fails** → Strip prescriptive wording; move "how" into AC or design notes.
3. **`V` fails** → Run Five Whys to surface a user / business outcome; if none exists, drop or reclassify as technical task (not a story).
4. **`E` fails** → Spawn a spike story; defer this story to next refinement.
5. **`S` fails** → Apply `reference/STORY_SPLITTING.md` patterns; replace this story with the resulting set.
6. **`T` fails** → Rewrite each AC as Given / When / Then with measurable thresholds; remove vague adjectives; ensure ≥1 happy + ≥1 edge + ≥1 negative.

If two or more cells fail, reset the story — do not band-aid one cell at a time.
