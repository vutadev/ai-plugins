# Style Guide — Product Docs

Shared conventions across all included docs (up to 15). Apply to every file in `docs/`.

## Header Block (REQUIRED on every doc)

Every doc opens with:

```markdown
# {{DOC_TITLE}} — {{PROJECT_NAME}}

**Version:** {{SEMVER}}
**Date:** {{YYYY-MM-DD}}
**Status:** {{Draft | Review | Final}}
**Source:** {{upstream doc references, e.g. "PRD v1.2, SRS v1.1"}}
**Owner:** {{single owner — usually project lead}}

---
```

Rules:
- Version uses semver (`MAJOR.MINOR.PATCH`). See "Versioning Rules" below for bump triggers.
- Date uses ISO 8601 (`2026-04-25`). Never relative.
- Source field cites upstream doc + version. Top-level doc (PRD) cites user brief or commit hash.
- Status: `Draft` while iterating, `Review` when handed to user, `Final` when frozen for the milestone.

**Exception — DESIGN.md:** DESIGN.md uses YAML frontmatter for design tokens per local `reference/design-spec.md` (vendored from the Google design.md spec). Header fields are merged into the YAML block as lowercase keys (`version`, `date`, `status`, `source`, `owner`) alongside `colors`, `typography`, etc. The markdown body begins after the closing `---`. No separate markdown header block.

## Versioning Rules

| Bump | When | Examples |
|------|------|----------|
| **PATCH** (1.2.3 → 1.2.4) | Typo, formatting, broken link, traceability table fix, Change Log row added | Fix wording in §3.1; correct table header; add missing cross-ref |
| **MINOR** (1.2.x → 1.3.0) | New section, new ID, new feature/req/UC/UF/table/route/milestone, refined-but-compatible behavior | Add `FR-AUTH-009`; add new bot lifecycle state; add new milestone M5 |
| **MAJOR** (1.x.x → 2.0.0) | Decision reversal, scope removal, ID retired, fundamental architecture change | Drop multi-user feature; flip from Postgres to MySQL; rename ID prefix |

Cascading bumps:
- PRD bumps MAJOR → all downstream docs bump MAJOR even if their content is unchanged (header signals re-validation needed).
- PRD bumps MINOR → only directly-affected downstream docs bump (per ripple rules in `SKILL.md`).
- PATCH never cascades.

First release: `1.0.0` when status flips Draft → Final. Pre-release iterations stay `0.x.y`.

## Change Log Discipline

- Every version bump appends a row. No silent edits.
- Row format: `| {version} | {YYYY-MM-DD} | {author} | {what + why, one sentence} |`.
- Bug fixes cite the originating gap finding: `Fix F-007 from REVIEW_REPORT 2026-04-22`.
- Decision reversals cite resolution: `Drop F2 mobile per user decision 2026-04-22 (see PRD §12)`.

## Reader-Friendly Writing

- Open each doc with a two-to-four sentence summary and a "How to read" note that names the highest-value sections for the audience.
- Add an `At a glance` table when a doc contains more than a few features, requirements, components, endpoints, flows, test cases, or milestones.
- Prefer short tables, bullets, status badges (`Draft`, `Ready`, `Blocked`, `Done`), and direct ID links over long prose paragraphs.
- Cross-reference stable IDs wherever a reader needs to jump: `F-*`, `FR-*`, `US-*`, `UC-*`, `UF-*`, `API-*`, `TC-*`, and `M*`.
- Use Mermaid diagrams when a sequence, workflow, dependency chain, or relationship map is faster to understand visually than text.
- Avoid unexplained jargon. Define project-specific terms the first time they appear, or link to the owning doc/ID.
- Do not keep empty sections. Omit irrelevant sections or state a short reason when omission affects scope or verification.

## ID Prefix Registry (CANONICAL — DO NOT INVENT NEW PREFIXES)

| Prefix | Owner doc | Pattern | Example |
|--------|-----------|---------|---------|
| `F-{N}` | PRD | Feature group | `F1`, `F2.3` |
| `TS-{CAT}-{NN}` | TECHSTACK | Tech choice by layer | `TS-LANG-01`, `TS-FW-02`, `TS-INFRA-04` |
| `C-{NN}` | ARCHITECTURE | Component | `C-01`, `C-12` |
| `AD-{NN}` | ARCHITECTURE | Architectural decision (ADR-lite) | `AD-03` |
| `BR-{CAT}-{NN}` | BusinessRules | Category + 2-digit num | `BR-RI-05` |
| `FR-{CAT}-{NNN}` | SRS | Functional req | `FR-AUTH-001` |
| `NFR-{CAT}-{NNN}` | SRS | Non-functional req | `NFR-PERF-003` |
| `US-{CAT}-{NN}` | USER_STORIES | User story per feature category | `US-AUTH-01` |
| `AC-{CAT}-{NN}-{N}` | USER_STORIES | Gherkin acceptance criterion under a story | `AC-AUTH-01-1` |
| `UC-{CAT}-{NN}` | UseCases | Use case | `UC-BO-02` |
| `UF-{NN}` | UserFlows | User flow | `UF-08` |
| `API-{RESOURCE}-{NNN}` | API_REFERENCE | API endpoint | `API-AUTH-001`, `API-ORDER-003` |
| `TC-{CAT}-{NNN}` | TESTCASES | Test case | `TC-AUTH-001` |
| `M{N}` | ROADMAP | Milestone | `M0`, `M1` |
| `EXT-{CAT}-{NNN}` | EXTERNAL_DOCS | External resource | `EXT-API-001`, `EXT-STD-003` |
| `db.{table}` | DATABASE | Table reference in prose | `db.bots` |

Category codes (3–5 letters, ALL CAPS): `AUTH`, `RISK`, `BOT`, `BT` (backtest), `OPT` (optimization), `ACC` (access), `SEC`, `OPS`, `DATA`, `UI`, etc. Stay consistent — if PRD uses `AUTH`, every downstream doc uses `AUTH`.

**API_REFERENCE resource codes:** Use domain resource name matching category codes where possible (e.g. `API-AUTH-001` for auth endpoints, `API-ORDER-001` for order endpoints). Resource code = the domain the endpoint group belongs to.

**TECHSTACK category codes:** `LANG` (language), `FW` (framework), `RT` (runtime), `INFRA` (infrastructure/host), `OBS` (observability), `SEC` (security/secrets), `BUILD` (build/CI), `TEST` (test tooling), `DATA` (datastores), `MSG` (queues/streams), `CACHE`, `CDN`.

**EXTERNAL_DOCS category codes:** `API` (third-party API docs), `SDK` (library/SDK reference), `STD` (standards/RFCs/specs), `SVC` (hosted service docs), `COMP` (compliance/regulatory), `REF` (other reference material).

## Section Numbering

- Top-level sections: `## 1. Section Name` (numbered).
- Subsections: `### 1.1 Subsection` (dotted).
- Reference sections like `PRD §5.3` always cite numbered section.

## Tables

- Index/lookup tables use markdown pipe syntax.
- First column is ID, second is Name, third+ is metadata.
- ID columns left-aligned. Numeric columns right-aligned with `---:`.

## Mermaid

- ER diagrams: `erDiagram`.
- Branching flows: `flowchart TD` (top-down).
- Actor-system: `sequenceDiagram` with `actor` for humans, `participant` for systems.
- Workflow diagrams should show trigger → main path → branches → exits → recovery.
- Sequence diagrams should show actors/systems, auth/validation boundaries, error paths when material, and linked IDs in nearby prose.
- Always test render at mermaid.live before claiming complete.
- Theme: default Mermaid (no custom CSS — keeps portable).

## Code Fences

Always tag the language: ```` ```sql ````, ```` ```python ````, ```` ```yaml ````, ```` ```bash ````. Untagged fences fail to render with syntax highlighting.

## Cross-References

- Same-doc: `§3.2` (no doc name needed).
- Other doc: `[SRS §4.1](./SRS.md#41-functional-requirements)` (relative link + anchor).
- Upstream ID: bare ID in backticks, e.g. `` `FR-AUTH-001` ``.

## Footer (REQUIRED on all included downstream docs)

Every downstream doc ends with:

```markdown
---

## Traceability

| Local ID | Upstream IDs |
|----------|--------------|
| {{local-id}} | {{comma-separated upstream IDs}} |

## Change Log

| Version | Date | Author | Change |
|---------|------|--------|--------|
| {{x.y}} | {{YYYY-MM-DD}} | {{name}} | {{what changed}} |
```

PRD and ROADMAP use only Change Log (no traceability — they are the roots).

## Tone

- Imperative voice for requirements: "System SHALL ...", "Operator MUST ...".
- Declarative for descriptions: "Backtest engine reads OHLC from cache.".
- User-story prose uses end-user voice ("As a learner I want to bookmark a lesson, so that I can resume tomorrow"). AC uses scenario voice ("Given …, When …, Then …"). SRS imperative voice still applies to FR statements — the two registers coexist by living in different docs.
- No marketing language, no qualifiers ("powerful", "robust", "world-class").
- No future tense for current state ("will be" → "is").

## Forbidden Patterns

- Two prefixes for same concept (`REQ-*` and `FR-*`) — pick one, stick to it.
- Restating PRD verbatim in downstream docs — downstream adds structure, not repetition.
- Dates as "next week", "Q2", "soon" — always ISO date or explicit week number.
- Magic numbers without source — every threshold cites the SRS/BR ID that fixed it.
- TODO/FIXME in docs — open items go to PRD §"Open Questions" only.
- Vague AC adjectives ("fast", "beautiful", "intuitive", "user-friendly", "secure") without a measurable threshold — every AC uses numbers, named states, or named messages.
- Generic "user" persona in `US-*` — always name a specific role from PRD §Personas.
- "So that" clause that restates "I want to" — every story names a distinct outcome for user or business.
