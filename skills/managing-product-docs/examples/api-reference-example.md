# API Reference Example — TaskFlow Lite

> Illustrative example only. Adapt the pattern to project evidence; do not copy this as a fixed skeleton.

Project context: TaskFlow Lite helps a support team intake, triage, assign, and verify small customer tasks before release.

## Endpoint Example

### API-TASK-001 Create task

`POST /tasks`

**Description:** create a normalized task in the triage queue.

**Request example:**

```json
{
  "title": "Verify billing export",
  "source": "support-email",
  "priority": "High",
  "ownerCandidate": "eng-ops"
}
```

**Responses:**
- `201 Created` with task ID and status.
- `422 Unprocessable Entity` when priority is missing.

**Trace:** FR-TASK-001, C-01, TC-TASK-001

**Lifecycle sketch:**

```mermaid
sequenceDiagram
  actor Client
  participant API as API Gateway
  participant Auth as Auth Service
  participant Tasks as C-01 Task Intake Service
  Client->>API: POST /tasks
  API->>Auth: Validate token and scope
  alt Unauthorized
    Auth-->>API: Unauthorized
    API-->>Client: 401 Unauthorized
  else Authorized
    Auth-->>API: Authorized
    API->>Tasks: Validate and create task
    Tasks-->>API: Task result or validation error
    API-->>Client: 201 Created or 422 validation error
  end
```
