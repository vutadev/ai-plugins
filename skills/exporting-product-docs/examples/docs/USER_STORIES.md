# User Stories — Roomly

**Version:** 1.0.0
**Date:** 2026-05-24
**Status:** Final
**Source:** SRS v1.0.0
**Owner:** Product Lead

---

Sprint-ready slices with Gherkin acceptance criteria. Each story is INVEST-checked and maps to an SRS requirement; see [SRS §3.2](./SRS.md#32-create) for the booking rule these stories satisfy.

## US-BOOK-01 Book a room

> As an **Employee**, I want to reserve a free room for a time slot, so that I have a guaranteed space for my meeting.

- `AC-BOOK-01-1` **Given** a room free from 10:00–11:00, **When** I book that slot, **Then** the booking is confirmed and shows status `Confirmed`.
- `AC-BOOK-01-2` **Given** a room already booked 10:00–11:00, **When** I try to book 10:30–11:30, **Then** I see a "room is taken" message and no booking is created.

**INVEST:** Independent of US-BOOK-02; valuable (core flow); estimable (~2d); testable via `AC-BOOK-01-*`.

## US-BOOK-02 Cancel a booking

> As an **Employee**, I want to cancel a booking I no longer need, so that the room frees up for others.

- `AC-BOOK-02-1` **Given** my booking starts in 60 minutes, **When** I cancel it, **Then** its status becomes `Cancelled` and the slot is searchable again.
- `AC-BOOK-02-2` **Given** my booking starts in 5 minutes, **When** I try to cancel, **Then** I see a "too late to cancel" message (`BR-BOOK-03`).

**INVEST:** Independent; small; testable via `AC-BOOK-02-*`.

## US-AUTH-01 Sign in

> As an **Employee**, I want to sign in with my work account, so that my bookings are tied to me.

- `AC-AUTH-01-1` **Given** a personal email, **When** I attempt sign-in, **Then** access is denied (`BR-AUTH-01`).

## Traceability

| Local ID | Upstream IDs |
|----------|--------------|
| `US-BOOK-01` | `FR-BOOK-001` |
| `US-BOOK-02` | `FR-BOOK-002` |
| `US-AUTH-01` | `FR-AUTH-001` |

## Change Log

| Version | Date | Author | Change |
|---------|------|--------|--------|
| 1.0.0 | 2026-05-24 | Product Lead | Initial stories with Gherkin AC. |
