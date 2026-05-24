# User Flows — Roomly

**Version:** 1.0.0
**Date:** 2026-05-24
**Status:** Final
**Source:** USECASES v1.0.0
**Owner:** Product Lead

---

End-to-end journeys. Diagrams realize the use cases in [USECASES](./USECASES.md).

## UF-01 Search to booking

**Trigger:** Employee needs a room for a meeting.

```mermaid
flowchart TD
  A([Need a room]) --> B[Open /rooms]
  B --> C[Enter date + time window]
  C --> D{Any room free?}
  D -- No --> E[Adjust window]
  E --> C
  D -- Yes --> F[Select room]
  F --> G[Confirm booking]
  G --> H{Slot still free?}
  H -- No --> I[Show 409 conflict]
  I --> C
  H -- Yes --> J([Booking confirmed])
```

**Routes:** `/rooms`, `/rooms/:id`
**Realizes:** `UC-BOOK-01`

## UF-02 Cancel a booking

**Trigger:** Employee no longer needs a reserved room.

```mermaid
flowchart TD
  A([Open /bookings]) --> B[Select booking]
  B --> C{15+ min before start?}
  C -- No --> D[Show 'too late to cancel']
  C -- Yes --> E[Cancel]
  E --> F([Slot released])
```

**Routes:** `/bookings`
**Realizes:** `UC-BOOK-02`

## Traceability

| Local ID | Upstream IDs |
|----------|--------------|
| `UF-01` | `UC-BOOK-01` |
| `UF-02` | `UC-BOOK-02` |

## Change Log

| Version | Date | Author | Change |
|---------|------|--------|--------|
| 1.0.0 | 2026-05-24 | Product Lead | Initial flows with diagrams. |
