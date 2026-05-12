# Software Requirements Specification — {{PROJECT_NAME}}

**Version:** {{SEMVER}}
**Date:** {{YYYY-MM-DD}}
**Status:** Draft
**Source:** PRD v{{x.y}}, BusinessRules v{{x.y}}
**Owner:** {{name}}

---

## 1. Introduction

### 1.1 Purpose
IEEE-style. Every requirement is independently testable. IDs are stable.

### 1.2 Scope
What's in this SRS (mirrors PRD §1.2).

### 1.3 Definitions
Reference PRD §1.4 glossary. New terms specific to requirements only.

### 1.4 References
- PRD v{{x.y}}
- BusinessRules v{{x.y}}

## 2. Overall Description

### 2.1 Product Perspective
One paragraph. Cite component diagram in PRD §5.1.

### 2.2 User Classes
Mirror PRD §2 personas.

### 2.3 Operating Environment
OS, runtime versions, network constraints.

### 2.4 Constraints
Single-host, single-user, language constraints, license constraints, etc.

### 2.5 Assumptions
Things we depend on but don't control.

## 3. Functional Requirements

Group by category. Each requirement:

### FR-{CAT}-{NNN} {{Title}}
**Statement:** System SHALL {{...}}.
**Input:** {{...}}.
**Output:** {{...}}.
**Acceptance:** {{testable criterion — measurable}}.
**Related BR:** `BR-XXX-NN`.
**Related US:** `US-XXX-NN` (only if `USER_STORIES.md` is included; story AC expand this Acceptance line into Gherkin scenarios).

(Repeat per requirement, grouped under `## 3.X {{Category}}` headings.)

## 4. Non-Functional Requirements

### 4.1 Performance (NFR-PERF-*)
Latency, throughput, concurrency targets. Each as `NFR-PERF-NNN`.

### 4.2 Reliability (NFR-REL-*)
Uptime, recovery time, data durability.

### 4.3 Security (NFR-SEC-*)
Bind addresses, secret handling, audit logs.

### 4.4 Usability (NFR-USE-*)
Page load times, error message clarity.

### 4.5 Maintainability (NFR-MAINT-*)
Test coverage, lint pass, doc currency.

### 4.6 Compatibility (NFR-COMPAT-*)
Browser/OS/runtime versions.

### 4.7 Observability (NFR-OBS-*)
Logging, metrics, tracing, healthchecks.

## 5. Out of Scope

Explicit list of features NOT being built. Each item one line. Examples:
- No multi-user role system.
- No mobile native client.
- No external SaaS dependencies.

## 6. Acceptance Bars

Cross-cutting acceptance criteria that span multiple FRs.

| Bar | Target | Source |
|-----|--------|--------|

---

## Traceability

| FR/NFR | Upstream PRD Feature | Related BR | Related US |
|--------|---------------------|-----------|-----------|

## Change Log

| Version | Date | Author | Change |
|---------|------|--------|--------|
