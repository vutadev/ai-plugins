# Sitemap — Roomly

**Version:** 1.0.0
**Date:** 2026-05-24
**Status:** Final
**Source:** USERFLOWS v1.0.0, USECASES v1.0.0
**Owner:** Product Lead

---

UI routes and page hierarchy. Each route ties to a flow or use case.

## 1. Routes

| Route | Page | Auth | Realizes |
|-------|------|------|----------|
| `/login` | Sign-in | Public | `FR-AUTH-001` |
| `/rooms` | Room search | Employee | `UF-01` |
| `/rooms/:id` | Room detail + book | Employee | `UF-01` |
| `/bookings` | My bookings | Employee | `UF-02` |
| `/admin/rooms` | Room management | Manager | `UC-ADMIN-01` |

## 2. Hierarchy

```mermaid
flowchart TD
  Login[/login] --> Rooms[/rooms]
  Rooms --> Room[/rooms/:id]
  Rooms --> Bookings[/bookings]
  Login --> Admin[/admin/rooms]
```

## Traceability

| Local ID | Upstream IDs |
|----------|--------------|
| `/rooms` | `UF-01` |
| `/bookings` | `UF-02` |
| `/admin/rooms` | `UC-ADMIN-01` |

## Change Log

| Version | Date | Author | Change |
|---------|------|--------|--------|
| 1.0.0 | 2026-05-24 | Product Lead | Initial route map. |
