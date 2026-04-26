# Database Design — {{PROJECT_NAME}}

**Version:** {{SEMVER}}
**Date:** {{YYYY-MM-DD}}
**Status:** Draft
**Source:** PRD v{{x.y}}, SRS v{{x.y}}, BusinessRules v{{x.y}}
**Owner:** {{name}}

---

## 1. Conventions

- Engine: {{Postgres 18 / MySQL 8 / SQLite — pick one}}.
- Timestamps: `TIMESTAMPTZ`, UTC.
- PKs: `BIGSERIAL` unless noted.
- JSON columns: `JSONB`.
- Append-only tables enforced via DB role permissions, not application code.
- Migration tool: {{Alembic / Flyway / Prisma — pick one}}.

## 2. ER Diagram

```mermaid
erDiagram
    {{TABLE_A}} ||--o{ {{TABLE_B}} : "{{relation}}"
```

(Render at mermaid.live before claiming complete.)

## 3. Enums

```sql
CREATE TYPE {{enum_name}} AS ENUM ('a', 'b', 'c');
```

## 4. Tables

### `{{table_name}}`

**Purpose:** one sentence.
**Source:** PRD §X.Y entity, SRS `FR-XXX-NNN`.
**Append-only:** yes / no. (If yes, write permissions revoked from app role.)
**Partitioning:** none / RANGE by month / LIST by tenant.
**Retention:** indefinite / N days rolling.

```sql
CREATE TABLE {{table_name}} (
    id          BIGSERIAL PRIMARY KEY,
    {{col}}     {{type}} {{constraints}},
    created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX {{idx_name}} ON {{table_name}} ({{col}});
CREATE UNIQUE INDEX {{uniq_name}} ON {{table_name}} ({{cols}});
```

(Repeat for every table.)

## 5. Indexes Summary

| Table | Index | Type | Purpose |
|-------|-------|------|---------|

Partial indexes flagged with `WHERE` clause noted.

## 6. Partitioning Strategy

For time-series tables (`journal`, `audit`, `trades`):

- RANGE by month of timestamp column.
- Auto-create next-month partition via cron (or `pg_partman`).
- Detach old partitions after retention window; archive to Parquet/S3 if needed.

## 7. Roles & Permissions

| Role | Grants | Revokes |
|------|--------|---------|
| `{{app}}_migrate` | ALL on schema | none |
| `{{app}}_app` | SELECT/INSERT on most | UPDATE/DELETE on append-only |
| `{{app}}_audit` | SELECT only | all writes |

Sample grant block:

```sql
REVOKE UPDATE, DELETE ON {{audit_table}} FROM {{app}}_app;
GRANT SELECT, INSERT ON {{audit_table}} TO {{app}}_app;
```

## 8. Migrations

- Each migration ships with `up` and `down`.
- First migration encodes this doc verbatim — do not handcraft later.
- Migration filename: `NNNN_short_name.sql` (zero-padded ordinal).

## 9. Backups & Retention

- Daily `pg_dump --format=custom` at {{HH:MM}} local → `{{path}}`.
- Retention: {{N}} days.
- Restore command:
  ```bash
  pg_restore --clean --if-exists -d {{db}} {{dump_file}}
  ```
- Smoke test after restore: row counts on critical tables match expected ranges.

## 10. Sample DDL Excerpts

Canonical DDL for the most-referenced tables. Keep these in sync with §4.

---

## Traceability

### Tables → PRD entities
| Table | PRD §X.Y |
|-------|----------|

### Tables → SRS requirements
| Table | SRS IDs |
|-------|---------|

### Permissions → BR
| Grant/Revoke | BR ID |
|-------------|-------|

## Change Log

| Version | Date | Author | Change |
|---------|------|--------|--------|
