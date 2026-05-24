# Product Requirements Document Example — TaskFlow Lite

> Illustrative example only. Adapt the pattern to project evidence; do not copy this as a fixed skeleton.

Project context: TaskFlow Lite helps a support team intake, triage, assign, and verify small customer tasks before release.

## Feature Example

### F1 Task intake and triage

**Problem:** incoming tasks arrive from email and chat with inconsistent priority, owner, and release-impact metadata.

**Outcome:** a coordinator can normalize each task before it enters the weekly release queue.

**In scope:** create task, set priority, assign owner, mark release impact.

**Out of scope:** customer-facing portal and automated SLA prediction.

**Success measure:** 90 percent of tasks have owner and priority within 10 minutes of intake.

## Doc Set Adaptation

For a CLI variant of this project, skip `SITEMAP.md` and `DESIGN.md`; keep `USECASES.md` and `TESTCASES.md`.
