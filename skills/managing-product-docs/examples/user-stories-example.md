# User Stories Example — TaskFlow Lite

> Illustrative example only. Adapt the pattern to project evidence; do not copy this as a fixed skeleton.

Project context: TaskFlow Lite helps a support team intake, triage, assign, and verify small customer tasks before release.

## Story Example

### US-TASK-01: Triage a new task

As a support coordinator, I want to normalize a new task before assignment so that engineers receive actionable work.

**Trace:** F1, FR-TASK-001

| INVEST | Check |
|---|---|
| I | Can ship with manual source entry before email import exists |
| N | Leaves UI layout to DESIGN/SITEMAP |
| V | Reduces assignment churn |
| E | Similar to existing create form |
| S | Estimated 3 dev-days |
| T | Covered by TC-TASK-001 |

#### AC-TASK-01-1: Valid intake enters triage queue

Given a coordinator enters title, source, priority, and owner candidate
When they submit the task
Then the task appears in the triage queue with status `Ready for assignment`.
