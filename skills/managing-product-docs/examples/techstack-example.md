# Tech Stack Example — TaskFlow Lite

> Illustrative example only. Adapt the pattern to project evidence; do not copy this as a fixed skeleton.

Project context: TaskFlow Lite helps a support team intake, triage, assign, and verify small customer tasks before release.

## Stack Choice Example

| ID | Layer | Choice | Version | Rationale | Source |
|---|---|---|---|---|---|
| TS-LANG-01 | Language | TypeScript | 5.5.x | Shared types across CLI and API | package.json |
| TS-DATA-01 | Data | SQLite | 3.x | Single-file local persistence for small teams | user decision 2026-05-20 |

**Rejected alternative:** Postgres was deferred because multi-tenant hosting is out of scope for v1.
