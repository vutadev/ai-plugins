# Use Cases — Roomly

**Version:** 1.0.0
**Date:** 2026-05-24
**Status:** Final
**Source:** SRS v1.0.0, USER_STORIES v1.0.0
**Owner:** Product Lead

---

Actor-driven interactions. Each use case realizes one or more SRS requirements.

## UC-BOOK-01 Reserve a room

- **Actor:** Employee
- **Precondition:** Signed in (`FR-AUTH-001`).
- **Main flow:** search availability → pick room + slot → confirm → see `Confirmed`.
- **Alt flow:** slot taken → `409 Conflict` → return to search.
- **Postcondition:** A confirmed booking exists for the slot.

## UC-BOOK-02 Cancel a reservation

- **Actor:** Employee
- **Precondition:** Owns a future booking.
- **Main flow:** open booking → cancel → slot frees.
- **Exception:** within 15 min of start → cancellation refused (`BR-BOOK-03`).

## UC-ADMIN-01 Add a room

- **Actor:** Office Manager
- **Precondition:** Has manager role (`BR-ADMIN-01`).
- **Main flow:** open admin → add room (name, capacity, floor) → room appears in search.

## Traceability

| Local ID | Upstream IDs |
|----------|--------------|
| `UC-BOOK-01` | `FR-BOOK-001`, `US-BOOK-01` |
| `UC-BOOK-02` | `FR-BOOK-002`, `US-BOOK-02` |
| `UC-ADMIN-01` | `FR-ADMIN-001` |

## Change Log

| Version | Date | Author | Change |
|---------|------|--------|--------|
| 1.0.0 | 2026-05-24 | Product Lead | Initial use cases. |
