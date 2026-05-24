# Product Requirements Document — Roomly

**Version:** 1.0.0
**Date:** 2026-05-24
**Status:** Final
**Source:** Founder brief 2026-05-10
**Owner:** Product Lead

---

> Illustrative example for the `exporting-product-docs` skill. Roomly is a small office meeting-room booking web app, used here to show a coherent, cross-linked doc set.

Roomly lets employees find an open meeting room and book it in seconds, and lets office managers keep room inventory and policy in one place. This PRD owns business scope; every downstream doc refines it without inventing new scope.

**How to read:** Start with §2 Features and §4 Personas. Engineering should pair this with [SRS](./SRS.md) and [ARCHITECTURE](./ARCHITECTURE.md).

## 1. Problem & Goals

Employees waste time hunting for free rooms and double-book by accident. Roomly gives a single source of truth for availability and bookings.

- **G1** Cut time-to-book to under 30 seconds.
- **G2** Eliminate double-bookings.
- **G3** Give managers self-service room and policy control.

**Success measures:** median booking flow < 30s; zero overlapping confirmed bookings; 90% of rooms managed without IT tickets.

## 2. Features

| ID | Feature | Summary |
|----|---------|---------|
| `F1` | Room search & availability | Find rooms free in a time window. |
| `F2` | Booking create & confirm | Reserve a room for a slot. |
| `F3` | Booking cancel | Release a reserved slot. |
| `F4` | Authentication | Corporate email sign-in. |
| `F5` | Room management | Managers add/edit/retire rooms. |

## 3. Out of Scope (v1)

- Recurring bookings.
- Calendar (Google/Outlook) two-way sync — see [EXTERNAL_DOCS](./EXTERNAL_DOCS.md) for the iCal reference kept for v2.
- Mobile native apps (responsive web only).

## 4. Personas

- **Employee** — books a room for a meeting; wants speed and certainty.
- **Office Manager** — owns room inventory and booking policy.

## 5. Doc Set

Archetype: **Web App** — all 15 docs included to demonstrate the full export. No optional docs skipped.

## 6. Open Questions

- None blocking v1. Recurring bookings deferred to roadmap M3 (see [ROADMAP](./ROADMAP.md)).

## Change Log

| Version | Date | Author | Change |
|---------|------|--------|--------|
| 1.0.0 | 2026-05-24 | Product Lead | Initial scope frozen for v1. |
