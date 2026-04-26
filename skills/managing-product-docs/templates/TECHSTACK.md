# Tech Stack — {{PROJECT_NAME}}

**Version:** {{SEMVER}}
**Date:** {{YYYY-MM-DD}}
**Status:** Draft
**Source:** PRD v{{x.y}} §5.2
**Owner:** {{name}}

---

## 1. Purpose

Single source of truth for every technology choice on this project. Pinned versions, why we picked it, what we considered and rejected. Lock files (`package-lock.json`, `poetry.lock`, `go.sum`, `Cargo.lock`, `pnpm-lock.yaml`) are the authoritative install state — this doc explains intent.

## 2. Conventions

- IDs: `TS-{CAT}-{NN}` where CAT ∈ {`LANG`, `FW`, `RT`, `INFRA`, `OBS`, `SEC`, `BUILD`, `TEST`, `DATA`, `MSG`, `CACHE`, `CDN`}.
- Versions: pinned (no caret/tilde ranges in this doc).
- Lifecycle: `Adopted` (in use), `Trial` (limited use, evaluating), `Hold` (do not adopt new uses), `Deprecated` (planned removal, cite replacement).

## 3. Stack at a Glance

| ID | Layer | Choice | Version | Lifecycle | Source |
|----|-------|--------|---------|-----------|--------|
| `TS-LANG-01` | Language | {{e.g. Python}} | {{3.12.4}} | Adopted | PRD §5.2 |
| `TS-FW-02` | Web framework | {{e.g. FastAPI}} | {{0.115.0}} | Adopted | PRD §5.2 |
| `TS-RT-03` | Runtime | {{e.g. uvicorn}} | {{0.30.0}} | Adopted | PRD §5.2 |
| `TS-DATA-04` | Primary DB | {{e.g. Postgres}} | {{18.0}} | Adopted | PRD §5.2 |
| `TS-INFRA-05` | Container | {{e.g. Docker Compose}} | {{2.29.0}} | Adopted | PRD §5.4 |
| `TS-OBS-06` | Logging | {{e.g. structlog}} | {{24.4.0}} | Adopted | NFR-OBS-001 |
| `TS-SEC-07` | Secrets | {{e.g. age}} | {{1.2.0}} | Adopted | BR-SEC-01 |
| `TS-BUILD-08` | CI | {{e.g. GitHub Actions}} | n/a | Adopted | — |
| `TS-TEST-09` | Test framework | {{e.g. pytest}} | {{8.3.3}} | Adopted | NFR-MAINT-001 |

## 4. Detail by Choice

### TS-{CAT}-{NN} {{Choice Name}}

**Layer:** {{e.g. web framework}}
**Version (pinned):** {{x.y.z}}
**Lifecycle:** {{Adopted | Trial | Hold | Deprecated}}
**License:** {{MIT / Apache-2.0 / BSD-3 / proprietary}}
**Lock file ref:** {{`package-lock.json` line {{N}} / `poetry.lock` `[[package]] name = "..."`}}
**Rationale:** one paragraph — why this beat alternatives for THIS project's constraints.
**Alternatives considered:**

| Option | Version | Why rejected |
|--------|---------|-------------|
| {{alt}} | {{ver}} | {{one sentence}} |

**Upgrade policy:** {{patch auto / minor monthly / major requires ADR}}.
**Replacement plan (if Deprecated):** cite `AD-{NN}` in ARCHITECTURE.

(Repeat for every entry in §3.)

## 5. Version Pin Strategy

| Category | Pin Style | Reason |
|----------|-----------|--------|
| Languages, runtimes | Exact (`==3.12.4`) | Reproducible builds across env |
| Frameworks | Minor-locked (`~=0.115.0`) | Patch fixes auto, minor reviewed |
| Dev/test tools | Compatible (`^8.3`) | Low blast radius |
| Security-critical | Exact + signature verified | Supply-chain |

## 6. Lock File Inventory

| File | Path | Tool | Last regen |
|------|------|------|-----------|
| {{package-lock.json}} | `./` | npm | {{YYYY-MM-DD}} |
| {{poetry.lock}} | `./` | poetry | {{YYYY-MM-DD}} |

Lock files MUST be committed. CI MUST fail on lock-file drift.

## 7. License Inventory

| License | Count | Notes |
|---------|------:|-------|
| MIT | {{N}} | OK for distribution |
| Apache-2.0 | {{N}} | OK; preserve NOTICE |
| GPL-3.0 | {{N}} | Review — copyleft |

Forbidden licenses: {{list}}. Source: BR-{{LIC}}-{{NN}}.

## 8. Supply Chain & Security

- SBOM generation: {{tool, e.g. `syft`}}, on every release.
- CVE scan: {{tool, e.g. `trivy` / `pip-audit`}} in CI; fail on Critical.
- Pinned by hash where supported (`pip install --require-hashes`, npm `--integrity`).

---

## Traceability

### TS → PRD §5.2 stack table

| TS ID | PRD §5.2 row |
|-------|--------------|
| `TS-LANG-01` | {{row}} |

### TS → ARCHITECTURE component dependencies

| TS ID | Components that use it (`C-*`) |
|-------|-------------------------------|
| `TS-FW-02` | `C-01`, `C-03` |

### TS → NFR / BR

| TS ID | NFR/BR |
|-------|--------|
| `TS-OBS-06` | `NFR-OBS-001` |

## Change Log

| Version | Date | Author | Change |
|---------|------|--------|--------|
