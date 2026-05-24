# Architecture — Roomly

**Version:** 1.0.0
**Date:** 2026-05-24
**Status:** Final
**Source:** PRD v1.0.0, TECHSTACK v1.0.0
**Owner:** Tech Lead

---

Component and deployment view for Roomly, plus ADR-lite decisions. Stack choices live in [TECHSTACK §2](./TECHSTACK.md#2-stack-by-layer).

## 1. Components

| ID | Component | Responsibility |
|----|-----------|----------------|
| `C-01` | Web client | React UI for search, booking, admin. |
| `C-02` | API server | Booking logic, policy enforcement, persistence. |
| `C-03` | PostgreSQL | Durable store for `db.users`, `db.rooms`, `db.bookings`. |
| `C-04` | Corporate IdP | OAuth identity provider for `F4`. |

## 2. Booking sequence

The confirm path enforces `BR-BOOK-01` (no double-booking) inside one transaction.

```mermaid
sequenceDiagram
  actor E as Employee
  participant W as Web client (C-01)
  participant A as API server (C-02)
  participant D as PostgreSQL (C-03)
  E->>W: Pick room + time slot
  W->>A: POST /bookings
  A->>D: BEGIN; insert booking (exclusion constraint)
  alt slot free
    D-->>A: committed
    A-->>W: 201 Created
  else slot taken
    D-->>A: constraint violation
    A-->>W: 409 Conflict
  end
```

## 3. Decisions (ADR-lite)

| ID | Decision | Rationale |
|----|----------|-----------|
| `AD-01` | Single Next.js app hosts UI + API | Small team, low traffic; avoids a separate service. |
| `AD-02` | DB exclusion constraint for overlap | Pushes `BR-BOOK-01` to the datastore — race-proof, no app-level locks. |

## Traceability

| Local ID | Upstream IDs |
|----------|--------------|
| `C-02` | `F2`, `F3`, `BR-BOOK-01` |
| `C-04` | `F4` |
| `AD-02` | `BR-BOOK-01`, `NFR-SEC-001` |

## Change Log

| Version | Date | Author | Change |
|---------|------|--------|--------|
| 1.0.0 | 2026-05-24 | Tech Lead | Initial components + ADRs. |
