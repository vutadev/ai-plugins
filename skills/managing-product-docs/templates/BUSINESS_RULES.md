# Business Rules — {{PROJECT_NAME}}

**Version:** {{SEMVER}}
**Date:** {{YYYY-MM-DD}}
**Status:** Draft
**Source:** PRD v{{x.y}}
**Owner:** {{name}}

---

## 1. Purpose

Business rules are POLICY. They survive code rewrites. SRS is HOW we test policy compliance; this doc is WHY the policy exists.

## 2. Categories

| Code | Name | Scope |
|------|------|-------|
| BR-AC | Access | Authentication, sessions, password handling |
| BR-MT | Market | Order routing, validation pipeline |
| BR-RI | Risk | Position sizing, loss caps, kill switch |
| BR-BO | Bot | Bot lifecycle, restart policy |
| BR-BT | Backtest | Backtest determinism, immutability |
| BR-OP | Optimization | Promotion gates, audit |
| BR-AU | Audit | Append-only enforcement |
| BR-DA | Data | Cache reuse, gap handling |
| BR-SE | Security | Network bind, secret handling |
| BR-OPS | Operations | Backup, healthcheck, restore |

(Adapt category list to project. Keep ≤12 categories.)

## 3. Rules

### BR-{CAT}-{NN} {{Rule Name}}

**Statement:** System SHALL {{...}} / Operator MUST NOT {{...}}.
**Rationale:** Why this rule exists. Cite incident, regulation, or architectural constraint.
**Enforcement Point:** Where in stack the rule is enforced (DB role, validator, middleware).
**Violation Behavior:** What happens if rule breaks (rejection, alert, kill switch).
**Related:** `FR-XXX-NNN`, `NFR-XXX-NNN`, `PRD §X.Y`.

(Repeat for each rule.)

## 4. Conflict Resolution

When two rules conflict, this table specifies the winner:

| Rule A | Rule B | Winner | Reason |
|--------|--------|--------|--------|

## 5. Traceability — SRS to BR

Every functional/policy SRS requirement maps to ≥1 BR.

| SRS ID | BR IDs |
|--------|--------|

## Change Log

| Version | Date | Author | Change |
|---------|------|--------|--------|
