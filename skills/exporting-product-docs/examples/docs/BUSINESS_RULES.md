# Business Rules — Roomly

**Version:** 1.0.0
**Date:** 2026-05-24
**Status:** Final
**Source:** PRD v1.0.0
**Owner:** Product Lead

---

Durable policy that survives code rewrites. SRS requirements ([SRS](./SRS.md)) implement these rules.

## 1. Booking rules

| ID | Rule |
|----|------|
| `BR-BOOK-01` | A room MUST NOT hold two confirmed bookings whose time ranges overlap. |
| `BR-BOOK-02` | A single booking MUST NOT exceed 4 hours. |
| `BR-BOOK-03` | A booking MAY be cancelled only 15 minutes or more before its start time. |

## 2. Access rules

| ID | Rule |
|----|------|
| `BR-AUTH-01` | Only users with a verified `@roomly.example` corporate email MAY sign in. |
| `BR-ADMIN-01` | Only Office Managers MAY create, edit, or retire rooms. |

## Traceability

| Local ID | Upstream IDs |
|----------|--------------|
| `BR-BOOK-01` | `F2` |
| `BR-BOOK-02` | `F2` |
| `BR-BOOK-03` | `F3` |
| `BR-AUTH-01` | `F4` |
| `BR-ADMIN-01` | `F5` |

## Change Log

| Version | Date | Author | Change |
|---------|------|--------|--------|
| 1.0.0 | 2026-05-24 | Product Lead | Initial policy set. |
