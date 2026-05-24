# Business Rules Example — TaskFlow Lite

> Illustrative example only. Adapt the pattern to project evidence; do not copy this as a fixed skeleton.

Project context: TaskFlow Lite helps a support team intake, triage, assign, and verify small customer tasks before release.

## Rule Example

### BR-TASK-01 Priority must be explicit before assignment

**Statement:** A task must not be assigned to an engineer until priority is one of `Low`, `Normal`, `High`, or `Release Blocker`.

**Rationale:** assignment without priority causes release queue churn.

**Enforcement point:** task intake service validation.

**Violation behavior:** reject assignment and show `Select a priority before assigning this task`.

**Related:** FR-TASK-001, TC-TASK-002.
