# Sitemap — {{PROJECT_NAME}}

**Version:** {{SEMVER}}
**Date:** {{YYYY-MM-DD}}
**Status:** Draft
**Source:** PRD v{{x.y}}
**Owner:** {{name}}

---

## 1. Layout

### 1.1 Persistent UI
- **Topbar:** {{logo, kill switch always visible, session timer, healthcheck dot}}.
- **Sidebar:** {{collapsible nav, primary sections}}.
- **Footer:** {{version, build hash, doc links}}.

### 1.2 Layout regions
Mermaid or ASCII sketch of page chrome.

## 2. Route Tree

Indent by depth. Mark each as `gated` (auth required) or `public`.

```
/                                  public  → redirect /login or /dashboard
/login                             public  → password gate
/dashboard                         gated   → home
/charts                            gated
  /charts/:symbol                  gated
/strategies                        gated
  /strategies/new                  gated
  /strategies/:id                  gated
  /strategies/:id/edit             gated
/bots                              gated
  /bots/new                        gated
  /bots/:id                        gated
  /bots/:id/journal                gated
/backtest                          gated
  /backtest/new                    gated
  /backtest/:id                    gated
/optimization                      gated
  /optimization/:id                gated
/risk                              gated
/journal                           gated
/profiles                          gated
/settings                          gated
```

(Replace with project-specific routes.)

## 3. Per-Route Spec

For each route:

### `/{{path}}` ({{gated|public}})

- **Purpose:** one sentence.
- **Primary UC:** `UC-XXX-NN`.
- **Data sources:** {{API endpoints called}}.
- **Key actions:** {{buttons, forms}}.
- **Related routes:** {{where users go next}}.

## 4. Modal Inventory

Modals are not routes but need cataloging:

| Modal | Trigger | Purpose |
|-------|---------|---------|

## 5. Navigation Rules

- 401 response → redirect `/login` and preserve `?return=` query.
- Cookie expiry mid-session → toast + redirect `/login`.
- Kill switch button bypasses any in-progress form.
- Browser back-button after destructive action → confirm modal.

## 6. Component Inventory (optional)

Reusable components referenced by multiple routes. Helps frontend planning.

---

## Traceability

| Route | UCs | SRS |
|-------|-----|-----|

## Change Log

| Version | Date | Author | Change |
|---------|------|--------|--------|
