# Roadmap Example — TaskFlow Lite

> Illustrative example only. Adapt the pattern to project evidence; do not copy this as a fixed skeleton.

Project context: TaskFlow Lite helps a support team intake, triage, assign, and verify small customer tasks before release.

## Feature Completion Checklist Example

- [x] [F1 Task intake and triage](../PRD.md#f1-task-intake-and-triage) — M1 — evidence: TC-TASK-001..004 pass.
- [ ] [F2 Email import](../PRD.md#f2-email-import) — M2 — blocked by unresolved mailbox auth decision.

## Milestone Example

### M1 Triage-ready MVP

**Duration:** 2 weeks

**Exit gates:**
- F1 complete and covered by TC-TASK-001 through TC-TASK-004.
- SQLite migration verified on a clean checkout.
- PRD open questions for email import explicitly deferred.

**Critical path:** task schema → intake service → triage UI → integration tests.
