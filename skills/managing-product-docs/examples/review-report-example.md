# Review Report Example — TaskFlow Lite

> Illustrative example only. Adapt the pattern to project evidence; do not copy this as a fixed skeleton.

Project context: TaskFlow Lite helps a support team intake, triage, assign, and verify small customer tasks before release.

## Finding Example

### FIND-001 Missing API contract for implemented endpoint — Severity: Major

**Evidence:** `src/routes/tasks.ts` exposes `POST /tasks`, but `API_REFERENCE.md` has no `API-TASK-*` entry.

**Impact:** client implementers cannot rely on request/response contract, and TESTCASES cannot trace endpoint behavior.

**Recommended fix:** add `API-TASK-001` to `API_REFERENCE.md`, then map `TC-TASK-001` to it.

**Do not auto-apply:** wait for user approval before switching to update mode.
