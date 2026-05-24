# Database Design Example — TaskFlow Lite

> Illustrative example only. Adapt the pattern to project evidence; do not copy this as a fixed skeleton.

Project context: TaskFlow Lite helps a support team intake, triage, assign, and verify small customer tasks before release.

## Table Example

### `tasks`

| Column | Type | Constraints | Source |
|---|---|---|---|
| `id` | text | primary key | FR-TASK-001 |
| `title` | text | not null | FR-TASK-001 |
| `priority` | text | check in Low, Normal, High, Release Blocker | BR-TASK-01 |
| `created_at` | datetime | not null default current timestamp | NFR-AUDIT-001 |

**Trace:** PRD entity `Task`; SRS `FR-TASK-001`; rule `BR-TASK-01`.
