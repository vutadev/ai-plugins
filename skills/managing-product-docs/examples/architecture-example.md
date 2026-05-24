# Architecture Example — TaskFlow Lite

> Illustrative example only. Adapt the pattern to project evidence; do not copy this as a fixed skeleton.

Project context: TaskFlow Lite helps a support team intake, triage, assign, and verify small customer tasks before release.

## Component Example

At a glance:

| ID | Name | Status | Key links |
|---|---|---|---|
| C-01 | Task Intake Service | Ready | FR-TASK-001, API-TASK-001 |

### C-01 Task Intake Service

**Responsibility:** validate incoming task metadata and persist normalized tasks.

**Owned data:** `db.tasks`, `db.task_events`.

**Exposed interface:** `POST /tasks` (API-TASK-001).

**Dependencies:** TS-LANG-01, TS-DATA-01.

**Related requirements:** FR-TASK-001.

### AD-01 SQLite for v1

**Status:** Accepted.
**Consequence:** easy local setup; future hosted collaboration will require migration planning.

## Sequence Diagram Example

```mermaid
sequenceDiagram
  actor Coordinator
  participant UI as Intake UI
  participant API as C-01 Task Intake Service
  participant DB as db.tasks
  Coordinator->>UI: Submit task metadata
  UI->>API: POST /tasks (API-TASK-001)
  API->>DB: Persist task and audit event
  alt Missing priority
    API-->>UI: 422 validation error
  else Valid task
    API-->>UI: 201 Created
  end
```
