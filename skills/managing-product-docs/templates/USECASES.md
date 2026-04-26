# Use Cases — {{PROJECT_NAME}}

**Version:** {{SEMVER}}
**Date:** {{YYYY-MM-DD}}
**Status:** Draft
**Source:** PRD v{{x.y}}, SRS v{{x.y}}
**Owner:** {{name}}

---

## 1. Actors

| Actor | Type | Description |
|-------|------|-------------|
| {{Actor}} | Primary / Supporting / System / External | {{role}} |

## 2. Use-Case Index

| UC ID | Name | Actor | Trigger | Primary SRS |
|-------|------|-------|---------|-------------|
| UC-{CAT}-{NN} | {{name}} | {{actor}} | {{event}} | `FR-XXX-NNN` |

Group rows by category. Categories mirror SRS (e.g. AUTH, BOT, RISK).

## 3. Detailed Use Cases (Cockburn-style)

Pick top 10–15 most critical UCs. Each gets full template:

### UC-{CAT}-{NN} {{Name}}

- **Actor:** primary actor.
- **Scope:** system / subsystem / org.
- **Level:** user-goal / sub-function / summary.
- **Preconditions:** what must be true before this UC starts.
- **Trigger:** event that starts the UC.
- **Main Success Scenario:**
  1. Step.
  2. Step.
  3. Step.
- **Extensions (alternate flows):**
  - 2a. Alternate condition → step.
  - 3a. Alternate condition → step.
- **Postconditions:** what is true after success.
- **Related SRS:** `FR-XXX-NNN`, `FR-YYY-NNN`.
- **Related BR:** `BR-XXX-NN`.
- **Route:** `/path` (cite SITEMAP).

(Repeat for each detailed UC.)

## 4. Briefly-Stated Use Cases

UCs not detailed above get one-line summary in §2 index only. No detail block needed.

---

## Traceability

### UC → SRS
| UC ID | SRS IDs |
|-------|---------|

### UC → SITEMAP route
| UC ID | Route |
|-------|-------|

### UC → BR
| UC ID | BR IDs |
|-------|--------|

## Change Log

| Version | Date | Author | Change |
|---------|------|--------|--------|
