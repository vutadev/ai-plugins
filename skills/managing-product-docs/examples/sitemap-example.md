# Sitemap Example — TaskFlow Lite

> Illustrative example only. Adapt the pattern to project evidence; do not copy this as a fixed skeleton.

Project context: TaskFlow Lite helps a support team intake, triage, assign, and verify small customer tasks before release.

## Route Example

| Route | Access | Purpose | Related |
|---|---|---|---|
| `/tasks` | gated | Triage queue list | UC-TASK-01, UF-01 |
| `/tasks/new` | gated | Create normalized task | UC-TASK-01 |
| `/settings/team` | admin | Manage owner candidates | FR-TEAM-001 |

**Adaptation:** a pure CLI implementation would skip SITEMAP and document commands in USECASES instead.
