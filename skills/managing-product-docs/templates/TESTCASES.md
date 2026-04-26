# Test Cases — {{PROJECT_NAME}}

**Version:** {{SEMVER}}
**Date:** {{YYYY-MM-DD}}
**Status:** Draft
**Source:** SRS v{{x.y}}, USECASES v{{x.y}}
**Owner:** {{name}}

---

## 1. Purpose

Executable test cases. Each one traces to ≥1 SRS requirement (`FR-*` / `NFR-*`) and/or use case (`UC-*`). This doc is the bridge between requirements and the test suite — every `TC-*` should map to a runnable test in `tests/`.

## 2. Conventions

- IDs: `TC-{CAT}-{NNN}`. CAT mirrors the SRS / UC category code (`AUTH`, `BOT`, `RISK`, etc.).
- Type: `unit` | `integration` | `e2e` | `manual` | `perf` | `security`.
- Priority: `P0` (blocker, must pass before release) | `P1` (release-target) | `P2` (nice to have).
- Steps numbered; expected results explicit and observable.

## 3. Test Environment

| Env | Purpose | Data | Reset between runs |
|-----|---------|------|--------------------|
| `local` | dev | seed fixtures | yes |
| `ci` | gated merge | ephemeral DB per run | yes |
| `staging` | pre-prod | sanitised prod snapshot | weekly |

Tooling: `TS-TEST-09` (e.g. `pytest`), `TS-TEST-10` (e.g. `playwright`).

## 4. Fixtures & Test Data

| Fixture | Path | Purpose | Owner |
|---------|------|---------|-------|
| `users.seed.sql` | `tests/fixtures/` | 3 users (admin, op, viewer) | `C-01` |
| `factories.py` | `tests/` | Factory-boy entity builders | shared |

Forbidden in tests: live external API calls, hard-coded current dates, sleep > 100ms.

## 5. Test Case Index

| ID | Title | Type | Priority | Related FR/NFR/UC | Status |
|----|-------|------|----------|-------------------|--------|
| `TC-AUTH-001` | Login with valid credentials | integration | P0 | `FR-AUTH-001`, `UC-AUTH-01` | Drafted |
| `TC-AUTH-002` | Login rejects expired token | unit | P0 | `FR-AUTH-002`, `BR-SEC-03` | Drafted |
| `TC-PERF-001` | Cold-start API < 250 ms p95 | perf | P1 | `NFR-PERF-001` | Pending |

(Group rows by category section heading below.)

## 6. Test Cases — Detail

### 6.1 AUTH

#### `TC-AUTH-001` Login with valid credentials

**Type:** integration
**Priority:** P0
**Related:** `FR-AUTH-001`, `UC-AUTH-01`
**Component under test:** `C-01`
**Preconditions:**
- DB seeded with user `alice@example.com` / password hash for `Hunter2!`.
- API service running on `127.0.0.1:8080`.
- No active session for alice.

**Test Data:**
```json
{ "email": "alice@example.com", "password": "Hunter2!" }
```

**Steps:**
1. POST `/auth/login` with the test data above.
2. Capture response status and body.
3. Capture `Set-Cookie` header.
4. GET `/me` with the captured cookie.

**Expected Result:**
- Step 1: HTTP 200, body `{"user_id": <int>, "expires_at": <ISO>}`.
- Step 3: cookie `session=` is `HttpOnly; Secure; SameSite=Strict`; `Max-Age` ≤ 3600.
- Step 4: HTTP 200, body `email == "alice@example.com"`.

**Postconditions:** session row inserted in `db.sessions` with `user_id = alice.id`.
**Implementation:** `tests/integration/auth/test_login.py::test_login_success` (or `Pending` if not yet written).
**Notes:** none.

---

#### `TC-AUTH-002` Login rejects expired token

(Repeat structure.)

### 6.2 {{Next category}}

(Repeat.)

## 7. Non-Functional Test Cases

### 7.1 Performance (`TC-PERF-*`)

For each NFR-PERF-* requirement, define: load profile, ramp-up, duration, success threshold, measurement tool.

### 7.2 Security (`TC-SEC-*`)

For each NFR-SEC-* / BR-SEC-* rule: attack vector, expected defence, observable signal.

### 7.3 Reliability (`TC-REL-*`)

Failure injection scenarios (DB down, dependency timeout, disk full).

## 8. Coverage Matrix

### 8.1 FR coverage

| FR ID | Covering TCs | Gap? |
|-------|--------------|------|
| `FR-AUTH-001` | `TC-AUTH-001` | no |
| `FR-AUTH-002` | `TC-AUTH-002`, `TC-AUTH-003` | no |
| `FR-{...}-NNN` | — | **YES — author needed** |

### 8.2 NFR coverage

| NFR ID | Covering TCs | Gap? |
|--------|--------------|------|
| `NFR-PERF-001` | `TC-PERF-001` | no |

### 8.3 UC coverage

| UC ID | Covering TCs | Gap? |
|-------|--------------|------|
| `UC-AUTH-01` | `TC-AUTH-001` | no |

**Verification rule:** every `FR-*`, `NFR-*`, `UC-*` MUST appear in at least one row above with ≥1 covering `TC-*`. Print all "Gap = YES" rows and resolve before status = `Final`.

## 9. Execution & Reporting

- CI runs `unit` + `integration` on every PR; `e2e` nightly; `perf` weekly.
- Pass criteria for release: 100 % of P0, ≥ 95 % of P1.
- Report format: JUnit XML at `reports/junit/`; HTML summary at `reports/html/`.
- Flaky-test policy: any test failing intermittently across 3 runs is quarantined and gets a follow-up issue within 48 h.

---

## Traceability

### TC → FR / NFR / UC / BR

| TC ID | FR | NFR | UC | BR |
|-------|----|-----|----|----|
| `TC-AUTH-001` | `FR-AUTH-001` | — | `UC-AUTH-01` | — |
| `TC-AUTH-002` | `FR-AUTH-002` | — | — | `BR-SEC-03` |

### TC → Component

| TC ID | `C-*` |
|-------|-------|
| `TC-AUTH-001` | `C-01` |

## Change Log

| Version | Date | Author | Change |
|---------|------|--------|--------|
