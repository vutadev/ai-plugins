# Test Cases — Roomly

**Version:** 1.0.0
**Date:** 2026-05-24
**Status:** Final
**Source:** SRS v1.0.0, USER_STORIES v1.0.0
**Owner:** QA Lead

---

Executable test cases traced to requirements and acceptance criteria. Every `FR-*` has at least one case.

## 1. At a glance

| ID | Verifies | Type |
|----|----------|------|
| `TC-AUTH-001` | `FR-AUTH-001` | E2E |
| `TC-BOOK-001` | `FR-BOOK-001`, `AC-BOOK-01-1` | Integration |
| `TC-BOOK-002` | `BR-BOOK-01`, `AC-BOOK-01-2` | Integration |
| `TC-BOOK-003` | `FR-BOOK-002`, `AC-BOOK-02-2` | Integration |
| `TC-ROOM-001` | `FR-ROOM-001` | Integration |

## 2. Cases

### `TC-BOOK-002` Reject overlapping booking

- **Given** room `r-12` booked 10:00–11:00.
- **When** `POST /bookings` for `r-12` 10:30–11:30.
- **Then** response is `409 Conflict` and no new row in `db.bookings`.

### `TC-BOOK-003` Reject late cancel

- **Given** a booking starting in 5 minutes.
- **When** `DELETE /bookings/:id`.
- **Then** response is `422` with message "too late to cancel" (`BR-BOOK-03`).

## Traceability

| Local ID | Upstream IDs |
|----------|--------------|
| `TC-AUTH-001` | `FR-AUTH-001` |
| `TC-BOOK-001` | `FR-BOOK-001`, `AC-BOOK-01-1` |
| `TC-BOOK-002` | `BR-BOOK-01`, `AC-BOOK-01-2` |
| `TC-BOOK-003` | `FR-BOOK-002`, `AC-BOOK-02-2` |
| `TC-ROOM-001` | `FR-ROOM-001` |

## Change Log

| Version | Date | Author | Change |
|---------|------|--------|--------|
| 1.0.0 | 2026-05-24 | QA Lead | Initial coverage for v1 requirements. |
