---
name: managing-product-docs
description: Use when user asks to create, extract, update, refine, or audit product documentation (PRD, tech stack, architecture, SRS, user stories with INVEST + Gherkin acceptance criteria, sitemap, design system, roadmap, use cases, user flows, business rules, database design, API reference, test cases, external docs) for a software project — covers greenfield init from a brief, brownfield extraction from existing code, incremental updates after scope/feature/tech/architecture/design changes, and gap audits to detect drift between docs and code.
---

# Creating Product Docs

## Overview

Produce a coherent doc set (up to 15 docs) for software project planning. Docs share stable IDs and cross-reference each other so implementation can begin without ambiguity. Each doc has a single, distinct purpose — no overlap.

**Consistent, repeatable, archetype-driven.** Every project produced with this skill starts from the same templates, same headers, same ID conventions, same section structure. The **project archetype** determines which docs are mandatory vs optional — not every project needs all 15. Differences live in content and doc selection only. Use the templates and style guide bundled with this skill — do not freestyle.

## Required Companion Files

This skill ships with reusable scaffolding. **Always read these before writing:**

- `reference/STYLE.md` — header block format, ID prefix registry, table conventions, Mermaid theme, footer format. Single source of truth for formatting.
- `reference/INVEST.md` — six-criteria reference for grading user stories before commit.
- `reference/STORY_SPLITTING.md` — splitting triggers, six split patterns, anti-patterns. Use whenever a story fails INVEST `S`.
- `templates/PRD.md`, `templates/TECHSTACK.md`, `templates/ARCHITECTURE.md`, `templates/BUSINESS_RULES.md`, `templates/SRS.md`, `templates/USER_STORIES.md`, `templates/USECASES.md`, `templates/USERFLOWS.md`, `templates/SITEMAP.md`, `templates/DESIGN.md`, `templates/DATABASE.md`, `templates/API_REFERENCE.md`, `templates/TESTCASES.md`, `templates/ROADMAP.md`, `templates/EXTERNAL_DOCS.md` — skeleton for each doc with placeholder syntax `{{PLACEHOLDER}}`.
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
- Single one-off user story or AC (use `templates/USER_STORIES.md` directly without invoking the full skill — no need to spin up PRD/TECHSTACK/etc. for a single backlog item)
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

## The 15-Doc Set

| Order | File | Required | Purpose | Source |
|-------|------|----------|---------|--------|
| 1 | `PRD.md` | **MANDATORY** | What we build (features, scope, decisions) — business focus, no tech stack or source code | User brief + clarifying questions |
| 2 | `TECHSTACK.md` | **MANDATORY** | Concrete technology choices (`TS-*` IDs), versions, alternatives considered | User brief + repo manifests |
| 3 | `ARCHITECTURE.md` | **MANDATORY** | Components (`C-*`), deployment topology, integration points, ADR-lite decisions (`AD-*`) | PRD features + TECHSTACK |
| 4 | `BUSINESS_RULES.md` | OPTIONAL | Why (policy that survives code rewrites) | PRD constraints |
| 5 | `SRS.md` | **MANDATORY** | Testable requirements with `FR-*`/`NFR-*` IDs | PRD features + ARCHITECTURE |
| 6 | `USER_STORIES.md` | OPTIONAL | Sprint-ready user stories (`US-*`) with INVEST self-check + Gherkin acceptance criteria (`AC-*`) | PRD features + SRS FRs |
| 7 | `USECASES.md` | OPTIONAL | Actor-driven interactions (Cockburn-style) | SRS + actors |
| 8 | `USERFLOWS.md` | OPTIONAL | End-to-end journeys (Mermaid) | UseCases stitched together |
| 9 | `SITEMAP.md` | OPTIONAL | UI route/page hierarchy | PRD §5.2 UI pages |
| 10 | `DESIGN.md` | OPTIONAL | Visual design system — tokens, colors, typography, layout, components (Google design.md format) | PRD §5.2 UI pages + brand brief |
| 11 | `DATABASE.md` | OPTIONAL | Physical schema (DDL, ER diagram, indexes) | PRD §5.1 entities + SRS |
| 12 | `API_REFERENCE.md` | OPTIONAL | Hand-curated API contracts — endpoints, auth, errors, versioning, examples (`API-*` IDs) | SRS + ARCHITECTURE |
| 13 | `TESTCASES.md` | **MANDATORY** | Executable test cases (`TC-*`) traced to FR/NFR/UC/AC | SRS + USECASES + USER_STORIES |
| 14 | `ROADMAP.md` | **MANDATORY** | Milestones, dates, exit gates | All upstream docs |
| 15 | `EXTERNAL_DOCS.md` | OPTIONAL | Registry of external APIs, specs, standards, resources we consume or follow (`EXT-*` IDs) — pointers only, never paste content | TECHSTACK + ARCHITECTURE + integration code |

All files go to `docs/` at project root.

**USECASES vs USER_STORIES (when to pick which):** They are alternative views of behavior. Cockburn-style `UC-*` are formal actor-interaction specs favored by compliance and enterprise stakeholders. Agile `US-*` with Gherkin AC are sprint-ready backlog slices favored by Scrum / XP teams. Most projects pick one; both can coexist if stakeholders genuinely need both views (rare). Default per archetype is documented below; user can override.

## Project Archetypes

The archetype determines which OPTIONAL docs to include. **MANDATORY docs are always produced.** Detect archetype during Discovery (G1/B2) or ask user.

| Archetype | Always include (MANDATORY) | Include (OPTIONAL) | Typically skip |
|-----------|---------------------------|-------------------|----------------|
| **Web App** (UI + API + DB) | PRD, TECHSTACK, ARCH, SRS, TESTCASES, ROADMAP | BUSINESS_RULES, **USER_STORIES** *(default ON for Scrum teams)*, USECASES, USERFLOWS, SITEMAP, DESIGN, DATABASE, API_REFERENCE, EXTERNAL_DOCS | — |
| **Backend Service / API** | PRD, TECHSTACK, ARCH, SRS, TESTCASES, ROADMAP | BUSINESS_RULES, USECASES, DATABASE, API_REFERENCE, EXTERNAL_DOCS | SITEMAP, DESIGN, USERFLOWS, USER_STORIES *(no end-user surface)* |
| **Library / SDK** | PRD, TECHSTACK, ARCH, SRS, TESTCASES, ROADMAP | API_REFERENCE, USECASES, EXTERNAL_DOCS | SITEMAP, DESIGN, USERFLOWS, DATABASE, USER_STORIES *(consumer is a developer, not an end user)* |
| **CLI Tool** | PRD, TECHSTACK, ARCH, SRS, TESTCASES, ROADMAP | BUSINESS_RULES, USECASES, DATABASE, EXTERNAL_DOCS | SITEMAP, DESIGN, USERFLOWS, API_REFERENCE, USER_STORIES *(usage stories optional — UC normally suffices)* |
| **Mobile App** | PRD, TECHSTACK, ARCH, SRS, TESTCASES, ROADMAP | **USER_STORIES** *(default ON for Scrum teams)*, USECASES, USERFLOWS, DESIGN, DATABASE, API_REFERENCE, EXTERNAL_DOCS | SITEMAP (use USERFLOWS instead) |
| **Internal Tool / Admin** | PRD, TECHSTACK, ARCH, SRS, TESTCASES, ROADMAP | **USER_STORIES** *(default ON for Scrum teams)*, USECASES, SITEMAP, DATABASE, EXTERNAL_DOCS | DESIGN (or lite version), USERFLOWS, API_REFERENCE |

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
- Overview, Personas, Features (`F1`, `F2`, ...), Solution Context (entities + UI pages only — no tech stack or deployment), NFRs, Milestones (high-level only — detail goes to ROADMAP), Risks, Open Questions, **Doc Set** (archetype + included/skipped status for all 15 docs), **Resolved Decisions**, Glossary.
- "Open Questions" section at end with suggested defaults — user resolves these before continuing.

### G3. Loop on Open Questions

User answers → update PRD's Resolved Decisions section (preserves audit trail) → confirm scope is frozen for this iteration. Don't add new features mid-stream.

### G4. Generate Downstream Docs in Strict Order

For EACH doc selected by archetype: `cp templates/{NAME}.md docs/{NAME}.md` mentally — start from the template, never from scratch. Apply `reference/STYLE.md` header. Each builds on the prior; reordering causes drift. **Skip docs not selected by archetype — record skipped docs in PRD §"Doc Set".**

1. **TECHSTACK.md** — concrete tech choices keyed by category (`TS-LANG-01`, `TS-FW-02`, `TS-RT-03`, `TS-INFRA-04`, `TS-OBS-05`, `TS-SEC-06`, `TS-BUILD-07`, `TS-TEST-08`). Each entry: Choice, Version (pinned), Rationale, Alternatives considered + reject reason, License, Source (user brief, repo manifests, or resolved decision). Lock file references where applicable (`package-lock.json`, `poetry.lock`, etc.).
2. **ARCHITECTURE.md** — system decomposition. Components `C-{NN}` with responsibility, owned data, exposed interface, dependencies. Mermaid `flowchart LR` for component graph, `C4`-lite context/container/component levels. Deployment topology (process boundaries, network binds, container layout). Integration points (external services, queues, IPC). ADR-lite block: `AD-{NN}` with Decision / Context / Consequences / Status. Cross-ref each component to TS-* it consumes.
3. **BUSINESS_RULES.md** — extract policy from PRD constraints. ID prefix per category (`BR-AC` access, `BR-RI` risk, `BR-AU` audit, etc). Each rule: Statement (SHALL/MUST NOT), Rationale, Enforcement Point, Violation Behavior, Related SRS/PRD IDs. End with conflict-resolution table and SRS→BR traceability matrix.
4. **SRS.md** — IEEE-style. Stable IDs per category (`FR-AUTH-001`, `NFR-PERF-001`). Every requirement testable. Explicit "Out of Scope" list naming features NOT being built. Cross-ref each requirement to the component(s) `C-{NN}` that implement it.
5. **USER_STORIES.md** — agile sprint backlog. For each PRD `F-*`: elicit specific persona(s), slice into stories ≤5 dev-days each, assign ID `US-{CAT}-{NN}` matching the feature category. For each story: fill all six **INVEST** cells (use `reference/INVEST.md`); attach Metadata (Epic / Priority MoSCoW / Estimate / Dependencies / Assumptions); write ≥3 Gherkin AC blocks `AC-{CAT}-{NN}-{N}` covering ≥1 happy + ≥1 edge + ≥1 negative path. Trace each `US-*` to its source `F-*` and to ≥1 `FR-*`. Trace each `AC-*` to ≥1 `TC-*` (forward — TESTCASES is written after). Run §4 Pre-commit Checklist for every story before flipping Status to `Ready`. Split stories per `reference/STORY_SPLITTING.md` whenever INVEST `S` fails (estimate >5 days, AC ≥7, "AND" in title, multi-persona). *(Skip when archetype excludes USER_STORIES.)*
6. **USECASES.md** — actor list first, then UC index table, then Cockburn-style detail (Actor, Scope, Level, Preconditions, Trigger, Main Success Scenario numbered, Extensions, Postconditions, Related SRS) for the 10–15 most critical UCs. ID prefix per category (`UC-BO-02`).
7. **USERFLOWS.md** — 10–15 flows tying multiple UCs together. Mermaid `flowchart TD` for branching, `sequenceDiagram` for actor-system interactions. Each flow: trigger, actors, numbered narrative, exits, cross-refs to UCs and routes.
8. **SITEMAP.md** — full route tree, sidebar/topbar layout, persistent UI elements (e.g. always-visible kill switch), modal inventory, nav rules (auth redirect, 401 handling). Mark every route as `gated` or `public`.
9. **DESIGN.md** — visual design system following the [Google design.md spec](https://github.com/google-labs-code/design.md). YAML frontmatter contains design tokens (colors, typography, spacing, rounded, components) merged with doc header fields (version, date, status, source, owner). Markdown body sections in order: Overview (brand personality), Colors, Typography, Layout, Elevation & Depth, Shapes, Components, Do's and Don'ts. Token references use `{path.to.token}` syntax. Source: PRD §5.2 UI pages + user brand brief. Omit sections not relevant to the project but keep section order.
10. **DATABASE.md** — Mermaid `erDiagram`, enums, full table definitions (columns, types, constraints, defaults), indexes (including partial indexes), partitioning strategy (RANGE by month for time-series), retention, role permissions (separate `migrate` / `app` / `audit` roles), backup commands, restore procedure, sample DDL excerpts for the most-referenced tables. Append-only audit tables enforced via `REVOKE UPDATE/DELETE`.
11. **API_REFERENCE.md** — hand-curated API contract doc. Not auto-generated — captures design intent, not implementation artifact. Sections: API Overview (base URL, versioning scheme, auth method), Authentication & Authorization (token flow, scopes, key rotation), Endpoints by Resource (grouped by domain; each endpoint: method, path, description, request params/body, response schema, error codes, example request/response, related `FR-*`/`C-*`), Common Schemas (shared request/response objects), Error Codes (global error format, code registry), Rate Limits & Quotas, Pagination & Filtering conventions, Webhooks/Events (if applicable), Deprecation Policy. Cross-ref each endpoint to the `FR-*` it implements and the `C-*` that owns it. ID prefix `API-{RESOURCE}-{NNN}` (e.g. `API-AUTH-001`, `API-ORDER-003`).
12. **TESTCASES.md** — executable test cases `TC-{CAT}-{NNN}` with Preconditions, Steps (numbered), Expected Result, Priority (P0/P1/P2), Type (unit/integration/e2e/manual), Test Data, Related FR/NFR/UC (and `AC-*` when USER_STORIES included). Group by feature. Coverage matrix at end: every `FR-*` / `NFR-*` / `UC-*` (and `AC-*` when present) mapped to ≥1 `TC-*`. Print orphan FR/NFR/UC/AC.
13. **ROADMAP.md** — milestones with hard exit gates, ASCII timeline, critical path, workstream allocation, risk-vs-schedule, release plan. Today's date and target date explicit.
14. **EXTERNAL_DOCS.md** — registry of external APIs, specs, standards, and resources the project consumes or follows. **Pointers only — never paste external content** (it drifts). Each entry: ID (`EXT-{CAT}-{NNN}`), Provider, URL, Version/Revision, Last Verified date (YYYY-MM-DD), Type (API/SDK/STD/SVC/COMP/REF), Why We Depend, Cross-refs to `TS-*`/`C-*`/`FR-*`/`API-*`, Auth/Access level, Notes/Gotchas. Group by category. Link Health Summary flags stale entries (>6 months). Deprecation table tracks sunset resources. When EXTERNAL_DOCS is included, TECHSTACK cross-refs `EXT-*` for documentation URLs instead of inlining them.

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
9. Identify external dependencies: third-party API calls (HTTP clients, SDK imports), external service integrations, referenced standards/specs in comments or config, compliance markers. Record URLs from code comments, README links, or config files (feeds EXTERNAL_DOCS.md).

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
- Each USER_STORIES `US-*` derives from observed feature entry points (UI flows, CLI commands, API resources) and existing test names — backfill INVEST best-effort, mark cells `⚠️` where intent is uncertain. Each `AC-*` derives from an existing test scenario or product behavior; cite the test file or behavior source: `Source: tests/checkout/test_promo.py::test_flat_amount`. Flag stories whose original PO intent cannot be inferred as Open Questions on the PRD before flipping to `Final`.
- Each TESTCASES `TC-*` derives from an existing test file: `Source: tests/auth_test.py::test_login_expiry`.
- Each DESIGN.md token cites the existing theme file: `Source: tailwind.config.ts:12` or `Source: src/styles/variables.css:5`. If no theme file exists, source from user brand brief.
- Each API_REFERENCE `API-*` cites the route handler: `Source: src/routes/auth.ts:45` or `Source: api/v1/orders.py::OrderView`. If OpenAPI spec exists, cross-reference but don't copy — hand-curate intent and policy.
- Each EXTERNAL_DOCS `EXT-*` cites the code that imports/calls the external resource: `Source: src/services/payment.ts:3 (import stripe)` or `Source: docker-compose.yml:15 (redis service)`. Set `Last Verified` to today's date.
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
| New requirement detail without scope change | Minor | SRS; cascade UC/UF if user-facing, USER_STORIES if backlog impacted, TESTCASES always |
| New / refined user story | Minor | USER_STORIES; cascade TESTCASES always (every new `AC-*` needs ≥1 `TC-*`) |
| AC scenario added to existing US | Patch or Minor | USER_STORIES; cascade TESTCASES always |
| User story split (one US becomes several) | Minor | USER_STORIES; cascade TESTCASES (re-key `TC-*` Related AC); update PRD §Doc Set if status changes |
| New table/column | Minor | DATABASE; cascade SRS if observable, TESTCASES if behavior changes |
| New/changed API endpoint | Minor | API_REFERENCE; cascade TC if behavior changes |
| API versioning or auth scheme change | Major | API_REFERENCE; cascade SRS if contract-breaking |
| New external dependency / API version change | Minor | EXTERNAL_DOCS; cascade TECHSTACK if SDK version changes |
| External resource sunset / URL moved | Patch or Minor | EXTERNAL_DOCS only (update URL + Last Verified) |
| New test case for existing requirement | Patch or Minor | TESTCASES only |
| Test case fails to reflect requirement (contradiction) | Patch | Fix TESTCASES; if requirement wrong, fix SRS first |
| New milestone or date slip | Minor | ROADMAP only; do NOT touch upstream |
| Brand/design system change (new palette, typography, spacing) | Minor or Major | DESIGN; cascade SITEMAP if component naming affected |
| Bug found in current docs (contradiction with code) | Patch or Minor | Fix at source-of-truth doc; cascade |

### U2. Ripple Analysis

Before editing, list every doc affected. Use the source-of-truth hierarchy:

```
PRD changes        → TECHSTACK? ARCH? BR? SRS? US? UC? UF? SITEMAP? DESIGN? DB? API? TC? ROADMAP?
TECHSTACK changes  → ARCH? SRS? (only if behavior changes) DB? (engine swap)
ARCH changes       → SRS? DB? API? SITEMAP? (only if surface changes)
BR changes         → SRS? US? UC? TC?
SRS changes        → US? UC? UF? DB? API? TC (always — every FR/NFR needs ≥1 TC)
US changes         → TC (always — every AC needs ≥1 TC)
UC changes         → UF? SITEMAP? TC?
SITEMAP changes    → DESIGN? (if component names referenced in design tokens)
DESIGN changes     → none upstream (DESIGN is leaf — visual only)
DB changes         → SRS? TC? (only if behavior observable)
API changes        → TC? (only if behavior observable; API is near-leaf)
TC changes         → none upstream (TC is leaf)
EXT_DOCS changes   → none upstream (EXT_DOCS is leaf — a reference catalog)
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
| External dep without EXT-* | Code imports/calls a third-party API or service not catalogued in EXTERNAL_DOCS (when EXTERNAL_DOCS is included) |
| Stale EXT-* (link rot) | `EXT-*` entry has `Last Verified` older than 6 months — URL may be broken or content changed |

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
| `US-*` | USER_STORIES | `US-AUTH-01` |
| `AC-*` | USER_STORIES | `AC-AUTH-01-1` |
| `UC-*` | UseCases | `UC-BO-02` |
| `UF-*` | UserFlows | `UF-08` |
| `API-*` | API_REFERENCE | `API-AUTH-001`, `API-ORDER-003` |
| `TC-*` | TESTCASES | `TC-AUTH-001` |
| `M*` | ROADMAP | `M0`, `M1` |
| `EXT-*` | EXTERNAL_DOCS | `EXT-API-001`, `EXT-STD-003` |

**Reuse IDs verbatim across docs.** Never invent parallel ID universes. Every downstream doc ends with a traceability section mapping its IDs back to upstream SRS/PRD.

## Source-of-Truth Hierarchy

ROADMAP §10 must list all included docs in this order (mark skipped docs as "N/A — not applicable for this archetype"):

1. PRD — what we build (business focus) — **MANDATORY**
2. TECHSTACK — what we build it with — **MANDATORY**
3. ARCHITECTURE — how the parts fit (components + ADRs) — **MANDATORY**
4. BusinessRules — why (policy that survives code) — OPTIONAL
5. SRS — testable requirements — **MANDATORY**
6. USER_STORIES — agile backlog (`US-*` + Gherkin `AC-*`) — OPTIONAL
7. UseCases — actor interactions (Cockburn-style) — OPTIONAL
8. UserFlows — end-to-end journeys — OPTIONAL
9. SITEMAP — UI surface — OPTIONAL
10. DESIGN — visual design system (tokens + components) — OPTIONAL
11. Database — physical schema — OPTIONAL
12. API_REFERENCE — API contracts (endpoints, auth, errors) — OPTIONAL
13. TESTCASES — verification — **MANDATORY**
14. ROADMAP — when — **MANDATORY**
15. EXTERNAL_DOCS — external APIs, specs, resources we consume — OPTIONAL

## Verification (Run After Writing All Included Docs)

Checks apply only to docs included by archetype. Skip checks for omitted docs.

1. **Header parity** — every included doc opens with the `reference/STYLE.md` header block (Version, Date, Status, Source, Owner). DESIGN.md merges these into YAML frontmatter. No exceptions.
2. **ID coverage** — every `FR-*` in SRS is covered by ≥1 `UC-*` (functional) or `BR-*` (policy). Print missing. *(Skip if USECASES/BUSINESS_RULES omitted — trace to TC instead.)*
3. **Test coverage** — every `FR-*`, `NFR-*`, `UC-*` is covered by ≥1 `TC-*` in TESTCASES. When USER_STORIES is included, every `AC-*` is also covered by ≥1 `TC-*`. Print orphan FR/NFR/UC/AC.
4. **Route coverage** — every gated SITEMAP route is reachable from ≥1 `UF-*`. *(Skip if SITEMAP omitted.)*
5. **Schema coverage** — every entity in PRD §5.1 has full DDL in DATABASE.md, and every table in DATABASE.md traces to a PRD/SRS feature. *(Skip if DATABASE omitted.)*
6. **Stack coverage** — every `TS-*` entry in TECHSTACK has pinned version and lock file match. TECHSTACK is self-sourced (user brief + manifests), not from PRD.
7. **Component coverage** — every `C-*` in ARCHITECTURE is implemented by ≥1 `FR-*` (or marked `Status: Infrastructure`); every `FR-*` cites the `C-*` that implements it.
8. **ADR coverage** — every `AD-*` cites Status (`Proposed`/`Accepted`/`Superseded`/`Inferred`) and consequences. Superseded ADRs link to replacement.
9. **Mermaid validity** — paste each diagram into mermaid.live to confirm parse.
10. **Hierarchy** — ROADMAP §10 lists all 15 docs in canonical order (skipped docs marked "N/A").
11. **Footer parity** — included downstream docs end with Traceability + Change Log; PRD/ROADMAP end with Change Log only.
12. **No invented prefixes** — grep for ID prefixes; every prefix appears in `reference/STYLE.md` registry.
13. **Design token validity** — DESIGN.md YAML frontmatter parses without error; no duplicate `##` section headings; token references (`{path.to.token}`) resolve to defined values; required sections present in spec order. *(Skip if DESIGN omitted.)*
14. **API coverage** — every `API-*` in API_REFERENCE traces to ≥1 `FR-*` and ≥1 `C-*`. Every public endpoint in code has a corresponding `API-*` entry. *(Skip if API_REFERENCE omitted.)*
15. **EXT coverage** — every `EXT-*` in EXTERNAL_DOCS is cited by ≥1 upstream doc (`TS-*`, `C-*`, `FR-*`, or `API-*`). Print orphan `EXT-*` entries. *(Skip if EXTERNAL_DOCS omitted.)*
16. **External-dep coverage** — every TECHSTACK entry consuming a third-party service/API has a matching `EXT-*` entry. *(Skip if EXTERNAL_DOCS omitted.)*
17. **Link freshness** — flag `EXT-*` entries with `Last Verified` older than 6 months. *(Skip if EXTERNAL_DOCS omitted.)*
18. **US INVEST coverage** — every `US-*` in USER_STORIES has all six INVEST cells filled (no blanks, no `❌`). Print stories that fail. *(Skip if USER_STORIES omitted.)*
19. **US AC coverage** — every `US-*` has ≥3 `AC-*` (≥1 happy + ≥1 edge + ≥1 negative). Print stories that fail. *(Skip if USER_STORIES omitted.)*
20. **AC → TC trace** — every `AC-*` traces to ≥1 `TC-*` in TESTCASES. Print orphan AC. *(Skip if USER_STORIES omitted.)*
21. **US → F trace** — every `US-*` cites a PRD `F-*`; print orphan stories. Every PRD `F-*` cites ≥1 `US-*` (or is explicitly marked "no story carved — covered by SRS only"); print orphan features. *(Skip if USER_STORIES omitted.)*
22. **Story sizing** — flag stories with estimate >5 dev-days OR `AC-*` count >7. Refer to `reference/STORY_SPLITTING.md` and split. *(Skip if USER_STORIES omitted.)*
23. **Doc set audit** — PRD §"Doc Set" lists all 15 docs with status (Included / Skipped + reason). No doc is silently absent.

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
| Producing all 15 docs for a simple library | Use archetype selection — libraries skip SITEMAP, DESIGN, USERFLOWS, DATABASE, USER_STORIES |
| Silently skipping an optional doc without recording it | Always record skipped docs in PRD §"Doc Set" with reason |
| Pasting external API docs into EXTERNAL_DOCS | EXTERNAL_DOCS is pointers only — URL + version + last-verified date. Pasted content drifts instantly |
| Missing `Last Verified` date on `EXT-*` entries | Every entry needs a verification date — without it, link rot is undetectable |
| Conflating TECHSTACK and EXTERNAL_DOCS | TECHSTACK = what we install (SDK v3.2.1). EXTERNAL_DOCS = where to read about it (Stripe API Reference v2024-01-01) |
| Inlining doc URLs in TECHSTACK when EXTERNAL_DOCS is included | When EXTERNAL_DOCS exists, TECHSTACK cross-refs `EXT-*` for doc URLs — single source of truth for external links |
| Generic "user" persona in `US-*` | Replace with a specific role from PRD §Personas — INVEST `V` fails without a named persona |
| "So that" clause restates "I want to" | Rewrite the value to a distinct user / business outcome — "Five Whys" until a real benefit surfaces |
| Vague AC adjectives ("fast", "intuitive", "user-friendly") | Replace with measurable threshold (latency in ms, named state, exact message) |
| UI pixel detail in AC ("button at top right, 16 px padding") | Move to DESIGN.md; AC names behavior, not chrome |
| Implementation detail in AC (API names, DB tables, function names) | Move to ARCHITECTURE/SRS; AC stays user-observable |
| Single AC for the whole story | Split into ≥3 (happy + edge + negative) — INVEST `T` fails otherwise |
| ≥7 AC in one story without splitting | Apply `reference/STORY_SPLITTING.md` patterns; one big story becomes several small ones |
| Both USECASES and USER_STORIES with overlapping detail | Pick one as the source of truth for behavior; the other (if kept) cross-refs and stays terse |
| `TC-*` claims `Related AC` but the AC doesn't exist | Either author the AC first or remove the trace; orphan refs poison verification |
| Skipping INVEST self-check ("we'll do it later") | INVEST blocks story commit — the table is the gate, not optional documentation |

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
- About to produce all 15 docs without checking archetype → stop, determine archetype first, skip irrelevant docs
- ARCHITECTURE cites third-party integration but no `EXT-*` exists (when EXTERNAL_DOCS included) → stop, add the `EXT-*` entry first
- About to write USER_STORIES with PRD `F-*` empty or unresolved Open Questions → stop, finish PRD first; stories without features are unmoored
- About to write USER_STORIES with SRS empty → stop, write SRS first; stories cite `FR-*` for traceability
- About to write `AC-*` with no `FR-*` to point at → stop, link the AC to its source FR or remove it (orphan AC fails verification check #20)
- About to flip a story to `Ready` with INVEST cells blank → stop, fill all six cells using `reference/INVEST.md`
- Story estimate >5 days OR `AC-*` count >7 → stop, split via `reference/STORY_SPLITTING.md` before committing
- About to write `TC-*` with `Related AC` pointing at a non-existent `AC-*` → stop, author the AC in USER_STORIES first
- About to add a story not covered by any PRD `F-*` → stop, the feature is missing — promote it to PRD §Features first
