---
name: managing-product-docs
description: Use when user asks to create, extract, update, refine, or audit product documentation (PRD, tech stack, architecture, SRS, sitemap, design system, roadmap, use cases, user flows, business rules, database design, API reference, test cases) for a software project — covers greenfield init from a brief, brownfield extraction from existing code, incremental updates after scope/feature/tech/architecture/design changes, and gap audits to detect drift between docs and code.
---

# Creating Product Docs

## Overview

Produce a coherent doc set (up to 13 docs) for software project planning. Docs share stable IDs and cross-reference each other so implementation can begin without ambiguity. Each doc has a single, distinct purpose — no overlap.

**Consistent, repeatable, archetype-driven.** Every project produced with this skill starts from the same templates, same headers, same ID conventions, same section structure. The **project archetype** determines which docs are mandatory vs optional — not every project needs all 13. Differences live in content and doc selection only. Use the templates and style guide bundled with this skill — do not freestyle.

## Required Companion Files

This skill ships with reusable scaffolding. **Always read these before writing:**

- `reference/STYLE.md` — header block format, ID prefix registry, table conventions, Mermaid theme, footer format. Single source of truth for formatting.
- `templates/PRD.md`, `templates/TECHSTACK.md`, `templates/ARCHITECTURE.md`, `templates/BUSINESS_RULES.md`, `templates/SRS.md`, `templates/USECASES.md`, `templates/USERFLOWS.md`, `templates/SITEMAP.md`, `templates/DESIGN.md`, `templates/DATABASE.md`, `templates/API_REFERENCE.md`, `templates/TESTCASES.md`, `templates/ROADMAP.md` — skeleton for each doc with placeholder syntax `{{PLACEHOLDER}}`.
- `templates/REVIEW_REPORT.md` — gap-audit output template for **review** mode.

Workflow: copy template → fill placeholders → keep section order intact → never delete required sections (Change Log, Traceability).

## When to Use

- User asks for PRD, SRS, design system, requirements doc, planning doc, or any of the doc types
- User has a project brief and wants an implementable spec (greenfield)
- Existing project needs formal documentation extracted from code (brownfield)
- User adds a feature, changes scope, or reverses a decision and wants docs updated (update)
- User wants to know if docs match current code, or asks "are the docs still accurate?" (review)

**Do NOT use:**
- Single one-off doc (just write that one — don't force the full set)
- Architecture decision records (ADRs), RFCs, or design proposals (different format)
- Auto-generated API docs (OpenAPI/Swagger output) — this skill covers hand-curated API contracts, not generated references

## Operation Modes

Pick ONE mode at the start of every invocation. Mode determines which phases run.

| Mode | Trigger | Inputs | Outputs |
|------|---------|--------|---------|
| **greenfield-init** | No `docs/` exists; user has a brief or idea | User brief + clarifying Q&A | All mandatory + selected optional docs per archetype, v1.0, Status=Draft |
| **brownfield-extract** | `docs/` empty/sparse; codebase exists | Code + git history + README + user interviews | All mandatory + selected optional docs per archetype, v1.0, Status=Draft, "Source: extracted from commit `<sha>`" |
| **update** | Docs exist (≥v1.0); scope/feature/tech/architecture/decision changed | Existing docs + change request | Affected docs only, version bumped, Change Log updated |
| **review** | Docs exist; user wants drift audit | Existing docs + current code + recent git log | `REVIEW_REPORT.md` listing gaps, no doc edits unless approved |

**Detect mode automatically:**
1. `ls docs/` — if empty/missing → greenfield-init OR brownfield-extract.
2. If repo has substantial code (>50 source files) and no docs → brownfield-extract.
3. If repo is empty/minimal and user has brief → greenfield-init.
4. If `docs/PRD.md` exists and user says "add", "update", "refine", "change" → update.
5. If `docs/PRD.md` exists and user says "review", "audit", "check", "are docs current" → review.
6. When ambiguous, ask user which mode they want.

## The 13-Doc Set

| Order | File | Required | Purpose | Source |
|-------|------|----------|---------|--------|
| 1 | `PRD.md` | **MANDATORY** | What we build (features, scope, decisions) — business focus, no tech stack or source code | User brief + clarifying questions |
| 2 | `TECHSTACK.md` | **MANDATORY** | Concrete technology choices (`TS-*` IDs), versions, alternatives considered | User brief + repo manifests |
| 3 | `ARCHITECTURE.md` | **MANDATORY** | Components (`C-*`), deployment topology, integration points, ADR-lite decisions (`AD-*`) | PRD features + TECHSTACK |
| 4 | `BUSINESS_RULES.md` | OPTIONAL | Why (policy that survives code rewrites) | PRD constraints |
| 5 | `SRS.md` | **MANDATORY** | Testable requirements with `FR-*`/`NFR-*` IDs | PRD features + ARCHITECTURE |
| 6 | `USECASES.md` | OPTIONAL | Actor-driven interactions (Cockburn-style) | SRS + actors |
| 7 | `USERFLOWS.md` | OPTIONAL | End-to-end journeys (Mermaid) | UseCases stitched together |
| 8 | `SITEMAP.md` | OPTIONAL | UI route/page hierarchy | PRD §5.2 UI pages |
| 9 | `DESIGN.md` | OPTIONAL | Visual design system — tokens, colors, typography, layout, components (Google design.md format) | PRD §5.2 UI pages + brand brief |
| 10 | `DATABASE.md` | OPTIONAL | Physical schema (DDL, ER diagram, indexes) | PRD §5.1 entities + SRS |
| 11 | `API_REFERENCE.md` | OPTIONAL | Hand-curated API contracts — endpoints, auth, errors, versioning, examples (`API-*` IDs) | SRS + ARCHITECTURE |
| 12 | `TESTCASES.md` | **MANDATORY** | Executable test cases (`TC-*`) traced to FR/NFR/UC | SRS + USECASES |
| 13 | `ROADMAP.md` | **MANDATORY** | Milestones, dates, exit gates | All upstream docs |

All files go to `docs/` at project root.

## Project Archetypes

The archetype determines which OPTIONAL docs to include. **MANDATORY docs are always produced.** Detect archetype during Discovery (G1/B2) or ask user.

| Archetype | Always include (MANDATORY) | Include (OPTIONAL) | Typically skip |
|-----------|---------------------------|-------------------|----------------|
| **Web App** (UI + API + DB) | PRD, TECHSTACK, ARCH, SRS, TESTCASES, ROADMAP | BUSINESS_RULES, USECASES, USERFLOWS, SITEMAP, DESIGN, DATABASE, API_REFERENCE | — |
| **Backend Service / API** | PRD, TECHSTACK, ARCH, SRS, TESTCASES, ROADMAP | BUSINESS_RULES, USECASES, DATABASE, API_REFERENCE | SITEMAP, DESIGN, USERFLOWS |
| **Library / SDK** | PRD, TECHSTACK, ARCH, SRS, TESTCASES, ROADMAP | API_REFERENCE, USECASES | SITEMAP, DESIGN, USERFLOWS, DATABASE |
| **CLI Tool** | PRD, TECHSTACK, ARCH, SRS, TESTCASES, ROADMAP | BUSINESS_RULES, USECASES, DATABASE | SITEMAP, DESIGN, USERFLOWS, API_REFERENCE |
| **Mobile App** | PRD, TECHSTACK, ARCH, SRS, TESTCASES, ROADMAP | USECASES, USERFLOWS, DESIGN, DATABASE, API_REFERENCE | SITEMAP (use USERFLOWS instead) |
| **Internal Tool / Admin** | PRD, TECHSTACK, ARCH, SRS, TESTCASES, ROADMAP | USECASES, SITEMAP, DATABASE | DESIGN (or lite version), USERFLOWS, API_REFERENCE |

**Rules:**
- User can override any archetype selection ("I want DESIGN even though it's a CLI tool" → include it).
- When a doc is skipped, its downstream dependents still work — cross-refs to skipped docs are omitted, not broken.
- Skipped docs are recorded in PRD §"Doc Set" section so the decision is auditable.
- If project evolves (backend grows a UI), re-evaluate archetype and add previously-skipped docs.

## Workflow — greenfield-init

### G1. Discovery (REQUIRED before any writing)

1. Read existing project files (codebase, README, partial docs, package manifests).
2. Map user brief against discovered context.
3. List **all** open questions — gaps in scope, technology choices, deployment target, single-user vs multi-user, security model, etc.
4. **Ask the user to resolve open questions BEFORE writing.** Never guess. Suggest defaults but require confirmation.

### G2. PRD First

PRD is the only doc that captures decisions directly. Sections:
- Overview, Personas, Features (`F1`, `F2`, ...), Solution Context (entities + UI pages only — no tech stack or deployment), NFRs, Milestones (high-level only — detail goes to ROADMAP), Risks, Open Questions, **Doc Set** (archetype + included/skipped status for all 13 docs), **Resolved Decisions**, Glossary.
- "Open Questions" section at end with suggested defaults — user resolves these before continuing.

### G3. Loop on Open Questions

User answers → update PRD's Resolved Decisions section (preserves audit trail) → confirm scope is frozen for this iteration. Don't add new features mid-stream.

### G4. Generate Downstream Docs in Strict Order

For EACH doc selected by archetype: `cp templates/{NAME}.md docs/{NAME}.md` mentally — start from the template, never from scratch. Apply `reference/STYLE.md` header. Each builds on the prior; reordering causes drift. **Skip docs not selected by archetype — record skipped docs in PRD §"Doc Set".**

1. **TECHSTACK.md** — concrete tech choices keyed by category (`TS-LANG-01`, `TS-FW-02`, `TS-RT-03`, `TS-INFRA-04`, `TS-OBS-05`, `TS-SEC-06`, `TS-BUILD-07`, `TS-TEST-08`). Each entry: Choice, Version (pinned), Rationale, Alternatives considered + reject reason, License, Source (user brief, repo manifests, or resolved decision). Lock file references where applicable (`package-lock.json`, `poetry.lock`, etc.).
2. **ARCHITECTURE.md** — system decomposition. Components `C-{NN}` with responsibility, owned data, exposed interface, dependencies. Mermaid `flowchart LR` for component graph, `C4`-lite context/container/component levels. Deployment topology (process boundaries, network binds, container layout). Integration points (external services, queues, IPC). ADR-lite block: `AD-{NN}` with Decision / Context / Consequences / Status. Cross-ref each component to TS-* it consumes.
3. **BUSINESS_RULES.md** — extract policy from PRD constraints. ID prefix per category (`BR-AC` access, `BR-RI` risk, `BR-AU` audit, etc). Each rule: Statement (SHALL/MUST NOT), Rationale, Enforcement Point, Violation Behavior, Related SRS/PRD IDs. End with conflict-resolution table and SRS→BR traceability matrix.
4. **SRS.md** — IEEE-style. Stable IDs per category (`FR-AUTH-001`, `NFR-PERF-001`). Every requirement testable. Explicit "Out of Scope" list naming features NOT being built. Cross-ref each requirement to the component(s) `C-{NN}` that implement it.
5. **USECASES.md** — actor list first, then UC index table, then Cockburn-style detail (Actor, Scope, Level, Preconditions, Trigger, Main Success Scenario numbered, Extensions, Postconditions, Related SRS) for the 10–15 most critical UCs. ID prefix per category (`UC-BO-02`).
6. **USERFLOWS.md** — 10–15 flows tying multiple UCs together. Mermaid `flowchart TD` for branching, `sequenceDiagram` for actor-system interactions. Each flow: trigger, actors, numbered narrative, exits, cross-refs to UCs and routes.
7. **SITEMAP.md** — full route tree, sidebar/topbar layout, persistent UI elements (e.g. always-visible kill switch), modal inventory, nav rules (auth redirect, 401 handling). Mark every route as `gated` or `public`.
8. **DESIGN.md** — visual design system following the [Google design.md spec](https://github.com/google-labs-code/design.md). YAML frontmatter contains design tokens (colors, typography, spacing, rounded, components) merged with doc header fields (version, date, status, source, owner). Markdown body sections in order: Overview (brand personality), Colors, Typography, Layout, Elevation & Depth, Shapes, Components, Do's and Don'ts. Token references use `{path.to.token}` syntax. Source: PRD §5.2 UI pages + user brand brief. Omit sections not relevant to the project but keep section order.
9. **DATABASE.md** — Mermaid `erDiagram`, enums, full table definitions (columns, types, constraints, defaults), indexes (including partial indexes), partitioning strategy (RANGE by month for time-series), retention, role permissions (separate `migrate` / `app` / `audit` roles), backup commands, restore procedure, sample DDL excerpts for the most-referenced tables. Append-only audit tables enforced via `REVOKE UPDATE/DELETE`.
10. **API_REFERENCE.md** — hand-curated API contract doc. Not auto-generated — captures design intent, not implementation artifact. Sections: API Overview (base URL, versioning scheme, auth method), Authentication & Authorization (token flow, scopes, key rotation), Endpoints by Resource (grouped by domain; each endpoint: method, path, description, request params/body, response schema, error codes, example request/response, related `FR-*`/`C-*`), Common Schemas (shared request/response objects), Error Codes (global error format, code registry), Rate Limits & Quotas, Pagination & Filtering conventions, Webhooks/Events (if applicable), Deprecation Policy. Cross-ref each endpoint to the `FR-*` it implements and the `C-*` that owns it. ID prefix `API-{RESOURCE}-{NNN}` (e.g. `API-AUTH-001`, `API-ORDER-003`).
11. **TESTCASES.md** — executable test cases `TC-{CAT}-{NNN}` with Preconditions, Steps (numbered), Expected Result, Priority (P0/P1/P2), Type (unit/integration/e2e/manual), Test Data, Related FR/NFR/UC. Group by feature. Coverage matrix at end: every `FR-*` / `NFR-*` / `UC-*` mapped to ≥1 `TC-*`. Print orphan FR/NFR/UC.
12. **ROADMAP.md** — milestones with hard exit gates, ASCII timeline, critical path, workstream allocation, risk-vs-schedule, release plan. Today's date and target date explicit.

## Workflow — brownfield-extract

Project has code, no docs (or sparse docs). Reverse-engineer to PRD-grade documentation, then run downstream like greenfield.

### B1. Inventory the Code

1. List top-level dirs, language stack, package manifests, config files.
2. Read `README.md`, `CONTRIBUTING.md`, `docker-compose.yml`, `.env.example`, root config.
3. Walk routes/endpoints — REST, RPC, CLI commands, UI pages — list every entry point.
4. Walk data — schema files, migrations, models — list every entity.
5. Walk tests — test names enumerate user-visible behavior. Capture test framework, structure, naming pattern, fixtures (feeds TESTCASES.md).
6. Skim `git log --since=6.months` for active workstreams; ignore noise commits.
7. Extract tech stack from manifests (`package.json`, `requirements.txt`, `pyproject.toml`, `go.mod`, `Cargo.toml`, `pom.xml`, `Dockerfile`, IaC) — exact versions from lock files (feeds TECHSTACK.md).
8. Map architecture: process boundaries (services, workers, daemons), network binds, container topology from `docker-compose.yml` / k8s manifests / Procfile, internal module boundaries (feeds ARCHITECTURE.md).

### B2. Synthesize Discovered Scope

Draft a "Discovered Scope" memo (in-conversation, not a file) listing:
- Features observed (group by entry point family).
- Tech stack with pinned versions (manifests + lock files).
- Architecture: components, boundaries, deployment topology, integrations.
- Persistent entities (from schema).
- Roles/personas hinted at (from auth code).
- NFRs implied by code (rate limits, retries, indexes).
- Existing test inventory (counts by type, naming patterns, coverage gaps).
- Apparent open questions (anything ambiguous in code/tests).

### B3. Validate with User

Present "Discovered Scope" to user. Ask:
- "Is this list complete? What's missing?"
- "Which features are deprecated / planned-for-removal?"
- "What was the original intent here?" — for any code that confused you.
- "Resolve these ambiguities" — list each one.

User answers become the Resolved Decisions section of the new PRD.

### B4. Write Docs at v1.0

Run G2–G4 with discovered scope. Cite source verbatim:
- Each PRD feature `Source: <file path>:<line>` or `Source: commit <sha>`.
- Each TECHSTACK entry pins to lock-file line: `Source: package-lock.json:42`.
- Each ARCHITECTURE component cites the dir/module that implements it: `Source: src/services/billing/`.
- Each ARCHITECTURE `AD-{NN}` cites the commit/PR that introduced the decision; if unknown, mark Status: `Inferred`.
- Each SRS requirement traces to a code entry point.
- Each DATABASE table copies the existing schema verbatim (do not redesign).
- Each TESTCASES `TC-*` derives from an existing test file: `Source: tests/auth_test.py::test_login_expiry`.
- Each DESIGN.md token cites the existing theme file: `Source: tailwind.config.ts:12` or `Source: src/styles/variables.css:5`. If no theme file exists, source from user brand brief.
- Each API_REFERENCE `API-*` cites the route handler: `Source: src/routes/auth.ts:45` or `Source: api/v1/orders.py::OrderView`. If OpenAPI spec exists, cross-reference but don't copy — hand-curate intent and policy.
- ROADMAP backfills past milestones from git tags + future from user plans.

Status remains `Draft` until user signs off, then bump to `Final`.

## Workflow — update

Docs exist; something changed. Identify what, propagate carefully, bump versions correctly.

### U1. Classify the Change

| Trigger | Severity | First touch |
|---------|----------|-------------|
| Typo, wording, formatting | Patch | The doc in question; bump patch (e.g. 1.2.0 → 1.2.1) |
| New feature in scope | Minor | PRD; cascade downstream |
| Decision reversal (changed deployment model, dropped feature) | Major | PRD; cascade EVERYTHING; bump major |
| Library version bump (compat) | Patch or Minor | TECHSTACK; cascade ARCHITECTURE/SRS only if behavior changes |
| Replace tech (e.g. Postgres → MySQL, Express → Fastify) | Major | TECHSTACK; cascade ARCHITECTURE, then DATABASE/SRS as needed |
| New component or split/merge components | Minor | ARCHITECTURE; cascade SRS if interface changes |
| New ADR or reverse existing ADR | Minor or Major | ARCHITECTURE; cascade per affected components |
| New requirement detail without scope change | Minor | SRS; cascade UC/UF if user-facing, TESTCASES always |
| New table/column | Minor | DATABASE; cascade SRS if observable, TESTCASES if behavior changes |
| New/changed API endpoint | Minor | API_REFERENCE; cascade TC if behavior changes |
| API versioning or auth scheme change | Major | API_REFERENCE; cascade SRS if contract-breaking |
| New test case for existing requirement | Patch or Minor | TESTCASES only |
| Test case fails to reflect requirement (contradiction) | Patch | Fix TESTCASES; if requirement wrong, fix SRS first |
| New milestone or date slip | Minor | ROADMAP only; do NOT touch upstream |
| Brand/design system change (new palette, typography, spacing) | Minor or Major | DESIGN; cascade SITEMAP if component naming affected |
| Bug found in current docs (contradiction with code) | Patch or Minor | Fix at source-of-truth doc; cascade |

### U2. Ripple Analysis

Before editing, list every doc affected. Use the source-of-truth hierarchy:

```
PRD changes        → TECHSTACK? ARCH? BR? SRS? UC? UF? SITEMAP? DESIGN? DB? API? TC? ROADMAP?
TECHSTACK changes  → ARCH? SRS? (only if behavior changes) DB? (engine swap)
ARCH changes       → SRS? DB? API? SITEMAP? (only if surface changes)
BR changes         → SRS? UC? TC?
SRS changes        → UC? UF? DB? API? TC (always — every FR/NFR needs ≥1 TC)
UC changes         → UF? SITEMAP? TC?
SITEMAP changes    → DESIGN? (if component names referenced in design tokens)
DESIGN changes     → none upstream (DESIGN is leaf — visual only)
DB changes         → SRS? TC? (only if behavior observable)
API changes        → TC? (only if behavior observable; API is near-leaf)
TC changes         → none upstream (TC is leaf)
```

Lower-numbered docs cascade to higher; never the reverse. If you find yourself "patching SRS to match new code," stop — fix PRD first.

### U3. Edit, Bump, Log

For every affected doc:
1. Edit content.
2. Bump version per §U1 (patch / minor / major).
3. Update header `Version` and `Date`.
4. Append a Change Log row: `| 1.3.0 | 2026-04-25 | name | Added F4 mobile API per user request 2026-04-22 |`.
5. If new IDs introduced, register the prefix in `reference/STYLE.md` only if a NEW category was added (extremely rare).

### U4. Re-run Verification

Run all verification checks (header parity, ID coverage, route coverage, schema coverage, Mermaid validity, hierarchy, footer parity, no invented prefixes). Update affected traceability tables.

## Workflow — review (gap audit)

User wants to know if docs match code. Produce a structured gap report; do NOT silently edit docs.

### R1. Establish Baseline

1. Read every doc in `docs/`. Note version, date, status.
2. Walk current code as in B1 (inventory).
3. Compute diff: code-as-is vs docs-as-written.

### R2. Detect Gaps

For each category, list discrepancies:

| Gap type | What to look for |
|----------|------------------|
| Code without doc | Endpoint, table, env var, feature flag, component, test, dependency exists in code but not in any doc |
| Doc without code | Feature in PRD, requirement in SRS, table in DB, route in SITEMAP, `TC-*` in TESTCASES, `C-*` in ARCHITECTURE that has no implementation |
| Drift | Doc and code both exist but disagree (different param names, different defaults, different field types) |
| Stale decision | Resolved Decisions in PRD or `AD-*` in ARCHITECTURE references a tech/approach no longer in code |
| Missing trace | SRS requirement with no UC; UC with no UF; route with no UC; `FR-*`/`NFR-*`/`UC-*` with no `TC-*`; `C-*` with no `TS-*` dependencies listed |
| Outdated milestone | ROADMAP milestone date passed without exit-gate evidence |
| Stale dependency | `package.json` / `requirements.txt` / lock file differs from TECHSTACK pinned versions |
| Stale architecture | New service/process/queue exists in deploy config but no `C-*` in ARCHITECTURE |
| Test orphan | Test exists in code but not catalogued as `TC-*`; or `TC-*` references a test file that no longer exists |
| API orphan | Public API endpoint in code with no `API-*` entry in API_REFERENCE (when API_REFERENCE is included) |
| Missing optional doc | Project has grown to need a previously-skipped doc (e.g. backend service now has UI → needs SITEMAP/DESIGN) |

### R3. Produce REVIEW_REPORT

Write `docs/REVIEW_REPORT.md` from `templates/REVIEW_REPORT.md`. Group findings by severity (Critical / Major / Minor / Cosmetic). For each, propose a concrete fix that points to the affected doc + section + suggested change.

### R4. Hand Back to User

Do NOT auto-apply fixes. User reviews report and either:
- Approves all fixes → switch to **update** mode for each.
- Approves a subset → switch to **update** mode for selected items.
- Rejects → close `REVIEW_REPORT.md` (keep for history) and stop.

## Cross-Doc ID Conventions

| Prefix | Owner doc | Example |
|--------|-----------|---------|
| `F-*` | PRD | `F1`, `F2.3` |
| `TS-*` | TECHSTACK | `TS-LANG-01`, `TS-FW-02` |
| `C-*` | ARCHITECTURE | `C-01` (component) |
| `AD-*` | ARCHITECTURE | `AD-03` (architectural decision) |
| `BR-*` | BusinessRules | `BR-RI-05` |
| `FR-*`, `NFR-*` | SRS | `FR-AUTH-001`, `NFR-PERF-003` |
| `UC-*` | UseCases | `UC-BO-02` |
| `UF-*` | UserFlows | `UF-08` |
| `API-*` | API_REFERENCE | `API-AUTH-001`, `API-ORDER-003` |
| `TC-*` | TESTCASES | `TC-AUTH-001` |
| `M*` | ROADMAP | `M0`, `M1` |

**Reuse IDs verbatim across docs.** Never invent parallel ID universes. Every downstream doc ends with a traceability section mapping its IDs back to upstream SRS/PRD.

## Source-of-Truth Hierarchy

ROADMAP §10 must list all included docs in this order (mark skipped docs as "N/A — not applicable for this archetype"):

1. PRD — what we build (business focus) — **MANDATORY**
2. TECHSTACK — what we build it with — **MANDATORY**
3. ARCHITECTURE — how the parts fit (components + ADRs) — **MANDATORY**
4. BusinessRules — why (policy that survives code) — OPTIONAL
5. SRS — testable requirements — **MANDATORY**
6. UseCases — actor interactions — OPTIONAL
7. UserFlows — end-to-end journeys — OPTIONAL
8. SITEMAP — UI surface — OPTIONAL
9. DESIGN — visual design system (tokens + components) — OPTIONAL
10. Database — physical schema — OPTIONAL
11. API_REFERENCE — API contracts (endpoints, auth, errors) — OPTIONAL
12. TESTCASES — verification — **MANDATORY**
13. ROADMAP — when — **MANDATORY**

## Verification (Run After Writing All Included Docs)

Checks apply only to docs included by archetype. Skip checks for omitted docs.

1. **Header parity** — every included doc opens with the `reference/STYLE.md` header block (Version, Date, Status, Source, Owner). DESIGN.md merges these into YAML frontmatter. No exceptions.
2. **ID coverage** — every `FR-*` in SRS is covered by ≥1 `UC-*` (functional) or `BR-*` (policy). Print missing. *(Skip if USECASES/BUSINESS_RULES omitted — trace to TC instead.)*
3. **Test coverage** — every `FR-*`, `NFR-*`, `UC-*` is covered by ≥1 `TC-*` in TESTCASES. Print orphan FR/NFR/UC.
4. **Route coverage** — every gated SITEMAP route is reachable from ≥1 `UF-*`. *(Skip if SITEMAP omitted.)*
5. **Schema coverage** — every entity in PRD §5.1 has full DDL in DATABASE.md, and every table in DATABASE.md traces to a PRD/SRS feature. *(Skip if DATABASE omitted.)*
6. **Stack coverage** — every `TS-*` entry in TECHSTACK has pinned version and lock file match. TECHSTACK is self-sourced (user brief + manifests), not from PRD.
7. **Component coverage** — every `C-*` in ARCHITECTURE is implemented by ≥1 `FR-*` (or marked `Status: Infrastructure`); every `FR-*` cites the `C-*` that implements it.
8. **ADR coverage** — every `AD-*` cites Status (`Proposed`/`Accepted`/`Superseded`/`Inferred`) and consequences. Superseded ADRs link to replacement.
9. **Mermaid validity** — paste each diagram into mermaid.live to confirm parse.
10. **Hierarchy** — ROADMAP §10 lists all 13 docs in canonical order (skipped docs marked "N/A").
11. **Footer parity** — included downstream docs end with Traceability + Change Log; PRD/ROADMAP end with Change Log only.
12. **No invented prefixes** — grep for ID prefixes; every prefix appears in `reference/STYLE.md` registry.
13. **Design token validity** — DESIGN.md YAML frontmatter parses without error; no duplicate `##` section headings; token references (`{path.to.token}`) resolve to defined values; required sections present in spec order. *(Skip if DESIGN omitted.)*
14. **API coverage** — every `API-*` in API_REFERENCE traces to ≥1 `FR-*` and ≥1 `C-*`. Every public endpoint in code has a corresponding `API-*` entry. *(Skip if API_REFERENCE omitted.)*
15. **Doc set audit** — PRD §"Doc Set" lists all 13 docs with status (Included / Skipped + reason). No doc is silently absent.

## Common Mistakes

| Mistake | Fix |
|---------|-----|
| Writing SRS before resolving PRD open questions | Always loop on PRD first; never proceed with vague reqs |
| Inventing parallel ID universes (`REQ-*` and `FR-*`) | Reuse upstream IDs verbatim |
| Auto-generating long docs without user input on tradeoffs | Pause and ask — generic docs are worse than no docs |
| Skipping BUSINESS_RULES.md when project has policy/compliance constraints | Even if archetype says optional, include it when non-trivial policy exists — rewrites lose intent without it |
| Confusing UseCase and UserFlow | UC = one actor interaction; UF = multi-UC end-to-end journey |
| Confusing TECHSTACK and ARCHITECTURE | TECHSTACK = what tech (versions, libs); ARCHITECTURE = how parts compose (components, deployment, decisions) |
| Confusing ARCHITECTURE and SRS | ARCHITECTURE = structure & decisions; SRS = behavior requirements. Components describe shape, FRs describe what they must do |
| Putting tech stack details in PRD | PRD is business-only — tech choices, versions, deployment all belong in TECHSTACK and ARCHITECTURE |
| TESTCASES that just paraphrase the FR | TC must specify steps + expected result + test data — executable, not aspirational |
| Adding features in downstream docs | Features belong in PRD only — downstream docs only refine |
| Hardcoded users/roles tables when PRD says single-user | Match auth complexity to PRD scope; don't over-engineer |
| Forgetting append-only enforcement on audit tables | Use DB role permissions (`REVOKE UPDATE/DELETE`), not application-level |
| Mixing high-level and date-specific milestones in PRD | High-level summary in PRD; full milestone detail with dates only in ROADMAP |
| Putting API surface or deployment details in PRD | PRD is business-focused — API contracts go in SRS, deployment in ARCHITECTURE |
| DESIGN.md with duplicate section headings | Google spec rejects files with duplicate `##` headings — one of each only |
| Design tokens that don't match prose colors | Token values in YAML frontmatter are normative; prose uses descriptive names that map to tokens |
| ADR without Consequences section | Decision without consequences = wishful thinking; document tradeoffs honestly |
| `TC-*` with no `Related FR` | Orphan test — either trace to a requirement or delete |
| Dumping OpenAPI/Swagger output into API_REFERENCE | API_REFERENCE is hand-curated contracts, not generated spec — captures design intent, examples, and policy |
| Writing API_REFERENCE for project with no public/internal API | Skip it — archetype decides; CLI tools and pure-UI apps rarely need it |
| Producing all 13 docs for a simple library | Use archetype selection — libraries skip SITEMAP, DESIGN, USERFLOWS, DATABASE |
| Silently skipping an optional doc without recording it | Always record skipped docs in PRD §"Doc Set" with reason |

## Output Conventions

- Markdown only. No HTML except inside Mermaid blocks.
- Each doc starts with header: title, version, date (YYYY-MM-DD), source citation (e.g. "Source: PRD v1.2, SRS v1.1").
- Use tables for index/lookup material; numbered lists for sequenced procedures.
- Code/DDL in fenced blocks with language tag.
- Bind environment-specific values (ports, paths) to a config table — don't sprinkle through prose.

## Red Flags — Stop and Re-check

- About to write SRS but PRD has unresolved open questions → stop, ask user
- About to write SRS but TECHSTACK / ARCHITECTURE empty → stop, finish them first (FRs reference `C-*`)
- About to write DATABASE.md but PRD doesn't specify the DB engine → stop, ask user (engine choice is a `TS-*` entry too)
- About to write TESTCASES with no SRS in place → stop, SRS first; TC require `FR-*`/`NFR-*`/`UC-*` to trace
- About to invent a new ID prefix → check `reference/STYLE.md` registry first; only PRD/SRS/TECHSTACK/ARCHITECTURE introduce new prefixes
- About to bump a library version in code without updating TECHSTACK → stop, update TECHSTACK first (lock-file is doc input, not bypass)
- Skipping `reference/STYLE.md` header block ("just this once") → stop, paste the header
- Filling a doc from scratch instead of copying its template → stop, copy `templates/{NAME}.md`
- Tempted to add a feature not in PRD → put it in a "Future" section, don't include in this iteration
- Generated doc is mostly restating PRD verbatim → trim; downstream docs add structure, not repetition
- Writing `AD-*` for a decision already in code with no context → mark Status: `Inferred`, ask user for original rationale
- About to write API_REFERENCE but project has no API endpoints → skip, record in PRD §"Doc Set"
- About to produce all 13 docs without checking archetype → stop, determine archetype first, skip irrelevant docs
