# User Stories — {{PROJECT_NAME}}

**Version:** {{SEMVER}}
**Date:** {{YYYY-MM-DD}}
**Status:** Draft
**Source:** PRD v{{x.y}}, SRS v{{x.y}}
**Owner:** {{name}}

---

## 1. Conventions

- **Story ID:** `US-{CAT}-{NN}` where `{CAT}` mirrors the parent PRD feature category (e.g. `US-AUTH-01` for an auth feature). Two-digit sequence per category.
- **AC ID:** `AC-{CAT}-{NN}-{N}` nested under its story (e.g. `AC-AUTH-01-1`, `AC-AUTH-01-2`). Sequence resets per story.
- **Priority:** MoSCoW — Must / Should / Could / Won't.
- **Estimate:** Story points (Fibonacci 1/2/3/5/8) OR t-shirt (XS/S/M/L/XL). Pick one and stay consistent across the doc.
- **INVEST cell:** `✅` pass, `⚠️` watch, `❌` fail. Failed cells block commit — split or refine the story.
- **AC voice:** Gherkin Given / When / Then. Each AC tests exactly one scenario.
- **Coverage minimum:** ≥3 AC per story (≥1 happy path + ≥1 edge / validation + ≥1 negative / error). See `reference/INVEST.md` for criteria depth and `reference/STORY_SPLITTING.md` for splitting patterns.

## 2. Story Index

| US ID | Title | Persona | Priority | Estimate | Status | Related `F-*` | Related `FR-*` |
|-------|-------|---------|----------|----------|--------|---------------|----------------|
| `US-{CAT}-{NN}` | {{title}} | {{persona}} | {{Must/Should/Could/Won't}} | {{SP or size}} | {{Draft/Ready/In Sprint/Done}} | `F-N` | `FR-XXX-NNN` |

Group rows by category. Categories mirror PRD `F-*` and SRS (`AUTH`, `BOT`, `RISK`, etc.).

## 3. Stories

Pick a stable order (by category, then sequence). Each story uses the full template below — no shortcuts.

### US-{CAT}-{NN}: {{Concise title — verb + object}}

**As a** {{specific persona — never the generic word "user"; prefer a role from PRD §Personas, e.g. "authenticated learner with an active subscription"}}

**I want to** {{action — measurable, testable, single intent}}

**So that** {{business value — outcome for user or business; do NOT restate the want}}

#### Metadata

- **Epic / Feature:** `F-N` (from PRD §Features)
- **Priority:** {{Must | Should | Could | Won't}}
- **Estimate:** {{e.g. 3 SP}} (target ≤5 days; if larger, split — see `reference/STORY_SPLITTING.md`)
- **Dependencies:** {{`US-OTHER-NN` ids or "none"}}
- **Assumptions:** {{external truths this story relies on}}

#### INVEST Self-check

| Criterion | ✅/⚠️/❌ | Note |
|-----------|---------|------|
| **I**ndependent | | Can ship without other stories? |
| **N**egotiable | | Implementation left open? |
| **V**aluable | | User or business benefit clear? |
| **E**stimable | | Team can forecast effort? |
| **S**mall | | Fits in one sprint (≤5 days)? |
| **T**estable | | QA can write test cases from AC? |

If any cell is `❌`, split or refine before commit.

#### Acceptance Criteria

##### AC-{CAT}-{NN}-1: {{Happy path scenario name}}

**Given** {{precondition 1}}
**And** {{precondition 2 — if any}}

**When** {{user action — single trigger}}

**Then** {{primary outcome — measurable, observable}}
**And** {{secondary outcome — if any}}

##### AC-{CAT}-{NN}-2: {{Edge / validation scenario name}}

**Given** {{edge context}}

**When** {{trigger}}

**Then** {{system handles correctly}}
**And** {{specific message or behavior}}

##### AC-{CAT}-{NN}-3: {{Negative / error scenario name}}

**Given** {{error context}}

**When** {{action that triggers error}}

**Then** {{system handles error correctly}}
**And** {{user-visible message}}
**And** {{no unintended side effect — explicit guarantee}}

(Add `AC-{CAT}-{NN}-4` … as needed. Cap at 7 AC; beyond that, split the story per `reference/STORY_SPLITTING.md`.)

#### Notes / Open Questions

- {{open item}}
- {{decision still owed}}

(Repeat the per-story block for each story. Use `---` between stories.)

## 4. Pre-commit Checklist

Run through this checklist for **every story** before flipping its Status to `Ready`:

- [ ] Persona is specific — never the bare word "user".
- [ ] "So that" delivers outcome, does not restate "I want".
- [ ] Each AC tests exactly one scenario.
- [ ] Given / When / Then are measurable (numbers, states, named messages).
- [ ] No vague adjectives in AC: "fast", "intuitive", "user-friendly", "secure", "appropriate".
- [ ] No implementation detail in AC: API names, DB tables, function names, code references.
- [ ] No UI specifics in AC: pixel positions, exact colors, exact wording of button labels.
- [ ] ≥1 happy + ≥1 edge + ≥1 negative AC present.
- [ ] QA can write a TC from each AC without further questions.
- [ ] Estimate ≤5 days; AC count ≤7. Otherwise split.
- [ ] All six INVEST cells filled (no blanks, no `❌`).
- [ ] Story cites at least one PRD `F-*` and at least one SRS `FR-*`.

## 5. Traceability

### US → F (PRD)

| US ID | PRD Feature |
|-------|-------------|
| `US-XXX-NN` | `F-N` |

### US → FR (SRS)

| US ID | SRS IDs |
|-------|---------|
| `US-XXX-NN` | `FR-XXX-NNN`, `FR-YYY-NNN` |

### AC → TC (TESTCASES)

| AC ID | TC IDs |
|-------|--------|
| `AC-XXX-NN-N` | `TC-XXX-NNN` |

Print orphan rows (any `US-*` with no `F-*`, any `AC-*` with no `TC-*`) — these block the verification gate.

## Change Log

| Version | Date | Author | Change |
|---------|------|--------|--------|
| {{x.y}} | {{YYYY-MM-DD}} | {{name}} | {{what changed}} |
