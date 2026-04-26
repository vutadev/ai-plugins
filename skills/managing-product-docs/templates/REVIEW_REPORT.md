# Doc-vs-Code Gap Audit — {{PROJECT_NAME}}

**Version:** {{SEMVER}}
**Date:** {{YYYY-MM-DD}}
**Status:** Draft
**Source:** docs/ at commit `{{sha}}`, code at commit `{{sha}}`
**Owner:** {{name}}
**Reviewer:** {{name}}

---

## 1. Summary

- Total findings: {{N}}
- Critical: {{N}} — Major: {{N}} — Minor: {{N}} — Cosmetic: {{N}}
- Recommended action: {{Update PRD/SRS/... | No-op | Block release}}

## 2. Methodology

- Docs reviewed: list all 8 by name + version.
- Code surface walked: routes, schema, env vars, feature flags, tests.
- Tools used (if any): grep patterns, schema dump, OpenAPI introspection.

## 3. Findings

### F-001 {{Short title}} — Severity: {{Critical|Major|Minor|Cosmetic}}

- **Type:** {{Code-without-doc | Doc-without-code | Drift | Stale-decision | Missing-trace | Outdated-milestone | Stale-dependency}}
- **Where in code:** `path/to/file.py:NN`
- **Where in docs:** `docs/SRS.md §3.2` (or "absent")
- **Observed:** what the code does / what the doc says.
- **Expected:** what should match.
- **Proposed fix:** edit `docs/{X}.md` §Y.Z; bump version {a.b}→{a.b+1}; add Change Log row.
- **Effort:** {{S | M | L}}.

(Repeat for every finding. Number F-001, F-002, ...)

## 4. Severity Definitions

| Severity | Meaning |
|----------|---------|
| Critical | Doc claim contradicts production code — risks misleading new contributors or breaking deploys. |
| Major | Significant feature/decision missing from docs — implementation cannot rely on docs alone. |
| Minor | Detail drift — names, defaults, paths off by small amounts. |
| Cosmetic | Formatting, wording, broken cross-link, missing Change Log row. |

## 5. Cascading Fixes

When a finding requires updating multiple docs (per ripple-analysis rules), list the cascade:

| Finding | Primary doc | Cascades to |
|---------|------------|-------------|
| F-001 | PRD | SRS, UC, DB |

## 6. Recommended Order

Fix in this order:
1. Critical (block any release)
2. Major (within next milestone)
3. Minor (next planned doc bump)
4. Cosmetic (opportunistic)

## 7. Sign-off

| Role | Name | Date | Decision |
|------|------|------|----------|
| Owner | | | Approve all / Approve subset / Reject |
| Engineering lead | | | |

---

## Change Log

| Version | Date | Author | Change |
|---------|------|--------|--------|
| 1.0 | {{YYYY-MM-DD}} | {{name}} | Initial gap audit |
