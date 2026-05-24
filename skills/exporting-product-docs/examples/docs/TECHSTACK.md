# Tech Stack — Roomly

**Version:** 1.0.0
**Date:** 2026-05-24
**Status:** Final
**Source:** PRD v1.0.0
**Owner:** Tech Lead

---

Technology choices for Roomly, pinned to versions. Downstream docs ([ARCHITECTURE](./ARCHITECTURE.md), [DATABASE](./DATABASE.md)) build on these.

## 1. At a glance

| ID | Layer | Choice | Version |
|----|-------|--------|--------:|
| `TS-LANG-01` | Language | TypeScript | 5.4 |
| `TS-FW-01` | Web framework | Next.js (React) | 14.2 |
| `TS-RT-01` | Runtime | Node.js | 20 LTS |
| `TS-DATA-01` | Datastore | PostgreSQL | 16 |
| `TS-SEC-01` | Auth | OAuth 2.0 via corporate IdP | — |
| `TS-TEST-01` | Test | Vitest + Playwright | 1.x / 1.4x |
| `TS-INFRA-01` | Host | Fly.io | — |

## 2. Stack by Layer

### 2.1 Application

TypeScript end to end (`TS-LANG-01`) keeps one language across client and API. Next.js (`TS-FW-01`) serves the React UI and the booking API routes.

### 2.2 Data

PostgreSQL (`TS-DATA-01`) holds users, rooms, and bookings. Concurrency control for `BR-BOOK-01` uses a transactional exclusion constraint (see [DATABASE](./DATABASE.md)).

### 2.3 Configuration sample

```yaml
# fly.toml (excerpt)
app: roomly
primary_region: sin
[env]
  NODE_ENV: production
  DATABASE_POOL_MAX: "10"
```

```bash
# local bootstrap
pnpm install
pnpm db:migrate
pnpm dev
```

## Traceability

| Local ID | Upstream IDs |
|----------|--------------|
| `TS-LANG-01` | `F1`, `F2`, `F4` |
| `TS-DATA-01` | `F1`, `F2`, `F3` |
| `TS-SEC-01` | `F4` |

## Change Log

| Version | Date | Author | Change |
|---------|------|--------|--------|
| 1.0.0 | 2026-05-24 | Tech Lead | Initial stack pinned. |
