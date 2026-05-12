# Roadmap — {{PROJECT_NAME}}

**Version:** {{SEMVER}}
**Date:** {{YYYY-MM-DD}}
**Status:** Draft
**Source:** PRD v{{x.y}}, SRS v{{x.y}}, all other docs
**Owner:** {{name}}

---

## 1. Today and Targets

- **Today:** {{YYYY-MM-DD}}.
- **Alpha target:** {{YYYY-MM-DD}}.
- **Beta target:** {{YYYY-MM-DD}}.
- **GA target:** {{YYYY-MM-DD}}.

## 2. Milestones

### M{N} {{Name}} ({{N weeks}})

**Window:** {{YYYY-MM-DD}} → {{YYYY-MM-DD}}.
**Goal:** one sentence.
**Workstreams:**
- {{stream}}: {{tasks}}.
**Deliverables:**
- {{file/feature}}.
**Hard Exit Gate (all must pass):**
- [ ] {{verifiable check}}.
- [ ] {{verifiable check}}.

(Repeat for each milestone. Number M0, M1, M2, ...)

## 3. ASCII Timeline

```
2026-04-25                             2027-04-02
|----[M0]----[M1]----------[M2]------------[M3]----[M4]------[M5]|
 2w   4w        8w            8w         16w       11w
```

## 4. Critical Path

List dependencies that block downstream work:

1. M0 Postgres + Alembic → unblocks M1 schema.
2. M1 auth + skeleton → unblocks M2 bot engine.
3. ...

## 5. Workstream Allocation

| Stream | Owner | M0 | M1 | M2 | M3 | M4 | M5 |
|--------|-------|----|----|----|----|----|----|

## 6. Risk vs Schedule

| Risk | Likelihood | Schedule Impact | Mitigation | Owner |
|------|-----------|-----------------|------------|-------|

## 7. Release Plan

| Tag | Milestone | Date | Audience |
|-----|-----------|------|----------|
| 0.1.0 | M0 done | {{date}} | internal |
| 0.5.0 | M3 done | {{date}} | beta |
| 1.0.0 | M5 done | {{date}} | GA |

## 8. Cadence

- Weekly: progress check, gate review.
- Bi-weekly: risk review.
- End of milestone: gate verification, no advancement until all gates green.

## 9. Glossary

Mirror PRD §1.4. Roadmap-specific terms only.

## 10. Source-of-Truth Hierarchy

When docs disagree, this order wins:

1. **PRD** — what we build.
2. **BusinessRules** — why (policy that survives code).
3. **SRS** — testable requirements.
4. **USER_STORIES** — agile backlog (`US-*` + Gherkin `AC-*`).
5. **UseCases** — actor interactions.
6. **UserFlows** — end-to-end journeys.
7. **SITEMAP** — UI surface.
8. **Database** — physical schema.
9. **ROADMAP** — when.
10. **EXTERNAL_DOCS** — external APIs, specs, resources we consume (leaf — reference catalog).

(Mirror the full source-of-truth hierarchy from `SKILL.md §Source-of-Truth Hierarchy`. Mark skipped docs as "N/A — not applicable for this archetype".)

Lower-numbered doc wins ties. Update upstream first; do not amend downstream to paper over PRD drift.

---

## Change Log

| Version | Date | Author | Change |
|---------|------|--------|--------|
