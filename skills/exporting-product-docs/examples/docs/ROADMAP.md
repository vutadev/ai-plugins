# Roadmap — Roomly

**Version:** 1.0.0
**Date:** 2026-05-24
**Status:** Final
**Source:** PRD v1.0.0
**Owner:** Product Lead

---

Milestones, dates, and exit gates. Sequencing serves the PRD [features](./PRD.md#2-features).

## 1. Milestones

| ID | Milestone | Target | Exit gate |
|----|-----------|--------|-----------|
| `M0` | Foundation | 2026-06-06 | Auth (`F4`) works; schema migrated. |
| `M1` | Booking MVP | 2026-06-27 | `F1`+`F2`+`F3` pass `TC-BOOK-001..003`. |
| `M2` | Admin | 2026-07-11 | `F5` room management live. |
| `M3` | Polish & v2 prep | 2026-07-25 | NFRs met; recurring-booking spike done. |

## 2. Dependencies

```mermaid
flowchart LR
  M0 --> M1 --> M2 --> M3
```

## 3. Deferred to v2

- Recurring bookings.
- Calendar sync (see [EXTERNAL_DOCS](./EXTERNAL_DOCS.md), `EXT-STD-001`).

## Change Log

| Version | Date | Author | Change |
|---------|------|--------|--------|
| 1.0.0 | 2026-05-24 | Product Lead | Initial milestone plan. |
