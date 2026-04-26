# Product Requirements Document — {{PROJECT_NAME}}

**Version:** {{SEMVER}}
**Date:** {{YYYY-MM-DD}}
**Status:** Draft
**Source:** {{user brief, commit hash, or prior version}}
**Owner:** {{name}}

---

## 1. Overview

### 1.1 Purpose
One paragraph: what this product is and the problem it solves.

### 1.2 Scope (in)
- Bullet list of what IS in scope this iteration.

### 1.3 Scope (out)
- Bullet list of what is NOT in scope. Explicit. Reference future iteration if planned.

### 1.4 Glossary
| Term | Definition |
|------|------------|

## 2. Personas

| Persona | Role | Goals | Pain Points |
|---------|------|-------|-------------|

## 3. Baseline (existing system, if any)

What already exists. Current capabilities, known limitations, deployment context. Cite repo, key files, README sections.

## 4. Features

### F1. {{Feature Group Name}}
**Goal:** one sentence.
**Why:** business motivation.
**Requirements summary:** bullet list. Each item gets full SRS treatment downstream.
**Acceptance bar:** how we know it works.

### F2. {{Feature Group Name}}
(repeat)

## 5. Solution Context

### 5.1 Key Entities (high level)
Entity list with one-line description. Full schema lives in `DATABASE.md`.

### 5.2 UI Pages (high level)
Page list with one-line purpose. Full route tree in `SITEMAP.md`.

## 6. Non-Functional Requirements (summary)

Performance, reliability, security, observability targets — one bullet each. Detail in SRS.

## 7. Milestones (high level)

| ID | Name | Duration | Exit Gate |
|----|------|----------|-----------|

Detail and dates live in `ROADMAP.md`.

## 8. Risks

| Risk | Likelihood | Impact | Mitigation |
|------|-----------|--------|------------|

## 9. Open Questions

Number each. Suggested default in italics. User must resolve before moving to SRS.

1. {{Question}}? *Suggested: {{default}}*
2. ...

## 10. Doc Set

Project archetype: **{{archetype}}**

| # | Document | Status | Reason |
|---|----------|--------|--------|
| 1 | PRD | Included | MANDATORY |
| 2 | TECHSTACK | Included | MANDATORY |
| 3 | ARCHITECTURE | Included | MANDATORY |
| 4 | BUSINESS_RULES | {{Included / Skipped}} | {{reason}} |
| 5 | SRS | Included | MANDATORY |
| 6 | USECASES | {{Included / Skipped}} | {{reason}} |
| 7 | USERFLOWS | {{Included / Skipped}} | {{reason}} |
| 8 | SITEMAP | {{Included / Skipped}} | {{reason}} |
| 9 | DESIGN | {{Included / Skipped}} | {{reason}} |
| 10 | DATABASE | {{Included / Skipped}} | {{reason}} |
| 11 | API_REFERENCE | {{Included / Skipped}} | {{reason}} |
| 12 | TESTCASES | Included | MANDATORY |
| 13 | ROADMAP | Included | MANDATORY |

## 11. Resolved Decisions

Append-only log. Once user resolves an open question, move it here.

| # | Question | Decision | Date | Rationale |
|---|----------|----------|------|-----------|

## Change Log

| Version | Date | Author | Change |
|---------|------|--------|--------|
