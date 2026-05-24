# Software Requirements Specification Example — TaskFlow Lite

> Illustrative example only. Adapt the pattern to project evidence; do not copy this as a fixed skeleton.

Project context: TaskFlow Lite helps a support team intake, triage, assign, and verify small customer tasks before release.

## Requirement Example

### FR-TASK-001 Normalize task intake

**Statement:** The system shall require title, source, priority, and owner candidate before a task can enter the triage queue.

**Source:** F1 Task intake and triage.

**Implemented by:** C-01.

**Acceptance bar:** invalid intake is rejected with a field-specific error message.

### NFR-PERF-001 Intake response time

The system shall validate and store a task in under 500 ms for 95 percent of requests on the local SQLite profile.
