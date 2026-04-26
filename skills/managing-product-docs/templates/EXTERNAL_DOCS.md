# External Documents & Resources — {{PROJECT_NAME}}

**Version:** {{SEMVER}}
**Date:** {{YYYY-MM-DD}}
**Status:** {{Draft | Review | Final}}
**Source:** TECHSTACK v{{X.Y}}, ARCHITECTURE v{{X.Y}}
**Owner:** {{name}}

---

## 1. Overview

Registry of external documents, APIs, specifications, and resources this project depends on or references. **Pointers only — never paste external content** (it drifts instantly). Each entry records where to find the resource, which version we coded against, and when the link was last verified.

### 1.1 Relationship to Other Docs

- **TECHSTACK** lists what we install (SDK package + pinned version). When EXTERNAL_DOCS is included, TECHSTACK cross-refs `EXT-*` for the external documentation URL instead of inlining URLs.
- **API_REFERENCE** documents APIs we **expose**. EXTERNAL_DOCS documents APIs we **consume**.
- **ARCHITECTURE** `C-*` components cite `EXT-*` for third-party integration points.

## 2. Category Index

| Category Code | Meaning | Examples |
|---------------|---------|----------|
| `API` | Third-party API documentation | Stripe API, Twilio API, OpenAI API |
| `SDK` | Library / SDK reference docs | AWS SDK, React docs, Prisma docs |
| `STD` | Standards, RFCs, specifications | OAuth 2.0 RFC 6749, OpenAPI 3.1, WCAG 2.1 |
| `SVC` | Hosted service documentation | AWS S3, Vercel, Supabase |
| `COMP` | Compliance / regulatory docs | GDPR guidelines, PCI-DSS, SOC 2 |
| `REF` | Other reference material | Design system, style guide, internal wiki |

## 3. External Resources

### 3.1 {{Category Name}} (`EXT-{{CAT}}`)

#### `EXT-{{CAT}}-{{NNN}}` — {{Resource Name}}

| Field | Value |
|-------|-------|
| **Provider** | {{organization / maintainer}} |
| **URL** | {{canonical documentation URL}} |
| **Version / Revision** | {{API version, spec revision, or "latest" with date}} |
| **Last Verified** | {{YYYY-MM-DD}} |
| **Type** | {{API \| SDK \| STD \| SVC \| COMP \| REF}} |
| **Why We Depend** | {{one sentence — what project capability requires this}} |
| **Cross-refs** | `{{TS-*}}`, `{{C-*}}`, `{{FR-*}}`, `{{API-*}}` |
| **Auth / Access** | {{public \| API key required \| paid subscription \| internal}} |
| **Notes / Gotchas** | {{breaking change history, deprecation warnings, rate limits, known issues}} |

---

*(Repeat §3.N for each category group. One subsection per category, entries ordered by ID within.)*

## 4. Link Health Summary

| Status | Count | Action |
|--------|------:|--------|
| Verified (< 3 months) | {{N}} | None |
| Stale (3–6 months) | {{N}} | Re-verify at next doc update |
| Expired (> 6 months) | {{N}} | Re-verify immediately |
| Broken / Moved | {{N}} | Fix URL or mark deprecated |

## 5. Deprecation & Replacement

Track external resources that have been superseded or deprecated:

| Deprecated `EXT-*` | Reason | Replacement `EXT-*` | Migration Date |
|---------------------|--------|---------------------|----------------|
| `{{EXT-CAT-NNN}}` | {{sunset / breaking change / better alternative}} | `{{EXT-CAT-NNN}}` or "N/A" | {{YYYY-MM-DD}} |

---

## Traceability

| Local ID | Upstream IDs |
|----------|--------------|
| `{{EXT-CAT-NNN}}` | `{{TS-*}}`, `{{C-*}}`, `{{FR-*}}` |

## Change Log

| Version | Date | Author | Change |
|---------|------|--------|--------|
| {{x.y}} | {{YYYY-MM-DD}} | {{name}} | {{what changed}} |
