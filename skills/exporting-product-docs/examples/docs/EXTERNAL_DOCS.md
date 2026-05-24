# External Docs — Roomly

**Version:** 1.0.0
**Date:** 2026-05-24
**Status:** Final
**Source:** TECHSTACK v1.0.0, ARCHITECTURE v1.0.0
**Owner:** Tech Lead

---

Registry of external APIs, specs, and services Roomly depends on or references.

## 1. Registry

| ID | Resource | Why it matters |
|----|----------|----------------|
| `EXT-API-001` | Corporate IdP OAuth 2.0 endpoints | Sign-in (`F4`, `API-AUTH-001`). |
| `EXT-SVC-001` | PostgreSQL 16 docs | `tstzrange` + GiST exclusion constraint (`AD-02`). |
| `EXT-STD-001` | iCalendar (RFC 5545) | Reference for v2 calendar sync (deferred). |

## 2. Notes

- `EXT-SVC-001` — the exclusion-constraint pattern in [DATABASE §2](./DATABASE.md#2-ddl) relies on the `btree_gist` extension.
- `EXT-STD-001` — kept for v2 only; not used in v1 scope.

## Traceability

| Local ID | Upstream IDs |
|----------|--------------|
| `EXT-API-001` | `F4`, `API-AUTH-001` |
| `EXT-SVC-001` | `AD-02`, `db.bookings` |
| `EXT-STD-001` | (v2 — deferred) |

## Change Log

| Version | Date | Author | Change |
|---------|------|--------|--------|
| 1.0.0 | 2026-05-24 | Tech Lead | Initial external registry. |
