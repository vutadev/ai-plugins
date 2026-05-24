# Software Requirements Specification — Roomly

**Version:** 1.0.0
**Date:** 2026-05-24
**Status:** Final
**Source:** PRD v1.0.0, BUSINESS_RULES v1.0.0
**Owner:** Tech Lead

---

Testable behavior for Roomly. Every requirement traces to a PRD feature and is covered by [TESTCASES](./TESTCASES.md).

## 1. At a glance

| ID | Requirement | Feature |
|----|-------------|---------|
| `FR-AUTH-001` | Corporate-email sign-in | `F4` |
| `FR-ROOM-001` | Search rooms free in a window | `F1` |
| `FR-BOOK-001` | Create a confirmed booking | `F2` |
| `FR-BOOK-002` | Cancel a booking | `F3` |
| `FR-ADMIN-001` | Manage rooms | `F5` |

## 2. Authentication

### 2.1 Sign-in

- `FR-AUTH-001` The system SHALL authenticate users via the corporate IdP and SHALL reject any email outside `@roomly.example` (`BR-AUTH-01`).

## 3. Booking

### 3.1 Search

- `FR-ROOM-001` The system SHALL return rooms with no confirmed booking overlapping the requested `[start, end)` window.

### 3.2 Create

- `FR-BOOK-001` The system SHALL create a confirmed booking only when the slot is free (`BR-BOOK-01`) and duration ≤ 4h (`BR-BOOK-02`). On overlap it SHALL return `409 Conflict`.

### 3.3 Cancel

- `FR-BOOK-002` The system SHALL allow cancellation only 15+ minutes before start (`BR-BOOK-03`).

## 4. Administration

- `FR-ADMIN-001` The system SHALL let Office Managers create, edit, and retire rooms (`BR-ADMIN-01`).

## 5. Non-Functional

- `NFR-PERF-001` Search SHALL return within 300 ms p95 for ≤ 500 rooms.
- `NFR-SEC-001` All booking mutations SHALL require an authenticated session.

## Traceability

| Local ID | Upstream IDs |
|----------|--------------|
| `FR-AUTH-001` | `F4`, `BR-AUTH-01` |
| `FR-ROOM-001` | `F1` |
| `FR-BOOK-001` | `F2`, `BR-BOOK-01`, `BR-BOOK-02` |
| `FR-BOOK-002` | `F3`, `BR-BOOK-03` |
| `FR-ADMIN-001` | `F5`, `BR-ADMIN-01` |

## Change Log

| Version | Date | Author | Change |
|---------|------|--------|--------|
| 1.0.0 | 2026-05-24 | Tech Lead | Initial FR/NFR set. |
