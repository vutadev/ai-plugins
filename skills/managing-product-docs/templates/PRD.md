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

What already exists. Stack, deployment, current capabilities. Cite repo, key files, README sections.

## 4. Features

### F1. {{Feature Group Name}}
**Goal:** one sentence.
**Why:** business motivation.
**Requirements summary:** bullet list. Each item gets full SRS treatment downstream.
**Acceptance bar:** how we know it works.

### F2. {{Feature Group Name}}
(repeat)

## 5. Target Architecture

### 5.1 Component diagram
Mermaid `flowchart LR` showing services + data flow.

### 5.2 Stack
| Layer | Technology | Version | Reason |
|-------|------------|---------|--------|

### 5.3 Data Model (high level)
Entity list with one-line description. Full schema lives in `DATABASE.md`.

### 5.4 Deployment
- Host model (single-host / multi-host / cloud).
- Network binds (e.g. `127.0.0.1` only).
- Container topology if applicable.

## 6. API Surface (high level)

Group by resource. Each row: method, path, purpose. Full contract in SRS.

| Method | Path | Purpose |
|--------|------|---------|

## 7. UI Pages (high level)

Page list with one-line purpose. Full route tree in `SITEMAP.md`.

## 8. Non-Functional Requirements (summary)

Performance, reliability, security, observability targets — one bullet each. Detail in SRS.

## 9. Milestones (high level)

| ID | Name | Duration | Exit Gate |
|----|------|----------|-----------|

Detail and dates live in `ROADMAP.md`.

## 10. Risks

| Risk | Likelihood | Impact | Mitigation |
|------|-----------|--------|------------|

## 11. Open Questions

Number each. Suggested default in italics. User must resolve before moving to SRS.

1. {{Question}}? *Suggested: {{default}}*
2. ...

## 12. Resolved Decisions

Append-only log. Once user resolves an open question, move it here.

| # | Question | Decision | Date | Rationale |
|---|----------|----------|------|-----------|

## Change Log

| Version | Date | Author | Change |
|---------|------|--------|--------|
