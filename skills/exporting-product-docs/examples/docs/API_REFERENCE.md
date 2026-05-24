# API Reference — Roomly

**Version:** 1.0.0
**Date:** 2026-05-24
**Status:** Final
**Source:** SRS v1.0.0, DATABASE v1.0.0
**Owner:** Tech Lead

---

HTTP contracts for the Roomly API (`C-02`). All booking mutations require an authenticated session (`NFR-SEC-001`).

## 1. At a glance

| ID | Method + Path | Requirement |
|----|---------------|-------------|
| `API-AUTH-001` | `POST /auth/session` | `FR-AUTH-001` |
| `API-ROOM-001` | `GET /rooms` | `FR-ROOM-001` |
| `API-BOOK-001` | `POST /bookings` | `FR-BOOK-001` |
| `API-BOOK-002` | `DELETE /bookings/:id` | `FR-BOOK-002` |

## 2. Search rooms — `API-ROOM-001`

```http
GET /rooms?from=2026-05-25T10:00:00Z&to=2026-05-25T11:00:00Z
Authorization: Bearer <session>
```

```json
{
  "rooms": [
    { "id": "r-12", "name": "Orchid", "capacity": 6, "floor": 3 }
  ]
}
```

## 3. Create booking — `API-BOOK-001`

```http
POST /bookings
Content-Type: application/json
Authorization: Bearer <session>
```

```json
{
  "roomId": "r-12",
  "from": "2026-05-25T10:00:00Z",
  "to": "2026-05-25T11:00:00Z"
}
```

On overlap the API returns `409 Conflict` (`BR-BOOK-01`). See [SRS §3.3](./SRS.md#33-cancel) for the cancel rule paired with this endpoint.

## Traceability

| Local ID | Upstream IDs |
|----------|--------------|
| `API-ROOM-001` | `FR-ROOM-001` |
| `API-BOOK-001` | `FR-BOOK-001`, `BR-BOOK-01` |
| `API-BOOK-002` | `FR-BOOK-002`, `BR-BOOK-03` |

## Change Log

| Version | Date | Author | Change |
|---------|------|--------|--------|
| 1.0.0 | 2026-05-24 | Tech Lead | Initial endpoint contracts. |
