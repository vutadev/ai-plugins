# API Reference — {{PROJECT_NAME}}

**Version:** {{SEMVER}}
**Date:** {{YYYY-MM-DD}}
**Status:** {{Draft | Review | Final}}
**Source:** SRS v{{X.Y}}, ARCHITECTURE v{{X.Y}}
**Owner:** {{name}}

---

## 1. Overview

- **Base URL:** `{{base_url}}` (e.g. `https://api.example.com/v1`)
- **API Style:** {{REST | GraphQL | gRPC | mixed}}
- **Versioning Scheme:** {{URL path (`/v1/`) | Header (`Accept-Version`) | Query param}}
- **Content Type:** `application/json` (unless noted)
- **Character Encoding:** UTF-8

## 2. Authentication & Authorization

### 2.1 Auth Method

{{Bearer token | API key | OAuth 2.0 | Session cookie | ...}}

### 2.2 Token Flow

{{Describe how clients obtain and refresh tokens. Mermaid sequenceDiagram if non-trivial.}}

### 2.3 Scopes / Permissions

| Scope | Description | Required for |
|-------|-------------|--------------|
| `{{scope}}` | {{description}} | `API-{{RESOURCE}}-{{NNN}}` |

### 2.4 Key Rotation

{{Policy for rotating API keys / secrets. Frequency, overlap window, revocation.}}

## 3. Common Conventions

### 3.1 Pagination

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `page` | integer | 1 | Page number (1-indexed) |
| `per_page` | integer | {{default}} | Items per page (max {{max}}) |

Response includes: `total`, `page`, `per_page`, `total_pages`.

### 3.2 Filtering & Sorting

{{Describe query parameter conventions: `?filter[field]=value`, `?sort=field:asc`, etc.}}

### 3.3 Request ID

Every response includes `X-Request-Id` header for tracing.

## 4. Error Format

All errors return:

```json
{
  "error": {
    "code": "{{ERROR_CODE}}",
    "message": "{{human-readable message}}",
    "details": {}
  }
}
```

### 4.1 Global Error Codes

| HTTP Status | Error Code | Description |
|-------------|-----------|-------------|
| 400 | `BAD_REQUEST` | {{description}} |
| 401 | `UNAUTHORIZED` | {{description}} |
| 403 | `FORBIDDEN` | {{description}} |
| 404 | `NOT_FOUND` | {{description}} |
| 409 | `CONFLICT` | {{description}} |
| 422 | `VALIDATION_ERROR` | {{description}} |
| 429 | `RATE_LIMITED` | {{description}} |
| 500 | `INTERNAL_ERROR` | {{description}} |

## 5. Rate Limits & Quotas

| Tier | Requests / min | Burst | Scope |
|------|---------------|-------|-------|
| {{tier}} | {{limit}} | {{burst}} | {{per-key | per-user | per-IP}} |

Rate limit headers: `X-RateLimit-Limit`, `X-RateLimit-Remaining`, `X-RateLimit-Reset`.

## 6. Endpoints

### 6.1 {{Resource Group Name}}

#### `API-{{RESOURCE}}-{{NNN}}` — {{Short Description}}

| | |
|---|---|
| **Method** | `{{GET|POST|PUT|PATCH|DELETE}}` |
| **Path** | `{{/resource/:id/action}}` |
| **Auth** | {{Required scope or "Public"}} |
| **Implements** | `{{FR-*}}`, Component `{{C-*}}` |

**Request Parameters:**

| Name | In | Type | Required | Description |
|------|----|------|----------|-------------|
| `{{param}}` | {{path|query|header}} | {{type}} | {{yes|no}} | {{description}} |

**Request Body:**

```json
{{request body example or "N/A"}}
```

**Response — `{{status_code}}`:**

```json
{{response body example}}
```

**Error Responses:**

| Status | Code | When |
|--------|------|------|
| {{status}} | `{{ERROR_CODE}}` | {{condition}} |

---

*(Repeat §6.N for each resource group. Group endpoints by domain resource.)*

## 7. Common Schemas

### 7.1 {{SchemaName}}

```json
{
  "{{field}}": "{{type}} — {{description}}"
}
```

*(Define shared request/response objects referenced by multiple endpoints.)*

## 8. Webhooks / Events

*(Skip section if project has no webhooks.)*

| Event | Trigger | Payload Schema | Retry Policy |
|-------|---------|---------------|--------------|
| `{{event.name}}` | {{when fired}} | §7.N | {{retry count, backoff}} |

**Webhook Security:** {{HMAC signature header, verification steps}}

## 9. Deprecation Policy

- Deprecated endpoints marked with `Deprecated` badge and `Sunset` response header.
- Minimum deprecation notice: {{N}} months.
- Deprecated endpoints return `Warning` header with migration guidance.
- Removal announced in ROADMAP milestone.

---

## Traceability

| Local ID | Upstream IDs |
|----------|--------------|
| `{{API-RESOURCE-NNN}}` | `{{FR-*}}`, `{{C-*}}` |

## Change Log

| Version | Date | Author | Change |
|---------|------|--------|--------|
| {{x.y}} | {{YYYY-MM-DD}} | {{name}} | {{what changed}} |
