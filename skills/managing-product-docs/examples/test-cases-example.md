# Test Cases Example — TaskFlow Lite

> Illustrative example only. Adapt the pattern to project evidence; do not copy this as a fixed skeleton.

Project context: TaskFlow Lite helps a support team intake, triage, assign, and verify small customer tasks before release.

## Test Case Example

### TC-TASK-001 Valid task intake creates triage item

**Related:** FR-TASK-001, UC-TASK-01, AC-TASK-01-1

**Type:** integration

**Preconditions:** coordinator account exists.

**Steps:**
1. Submit a task with title, source, priority, and owner candidate.
2. Open triage queue.

**Expected result:** task appears with status `Ready for assignment` and an audit event is recorded.
