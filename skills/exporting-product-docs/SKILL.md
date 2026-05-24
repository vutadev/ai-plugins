---
name: exporting-product-docs
description: Use when the user wants to export, convert, render, or publish a managing-product-docs markdown doc set (PRD, SRS, ARCHITECTURE, DESIGN, etc. in a docs/ folder) to offline HTML for reading, sharing, or printing/PDF.
---

# Exporting Product Docs

Convert a `managing-product-docs` doc set (markdown under `docs/`) to a self-contained, offline, deployable **docs-site**: left sidebar nav, light/dark toggle, client-side search, on-this-page TOC, Mermaid diagrams, code highlighting, and resolved cross-doc links.

Ships a bundled Node script — run it, don't reimplement. Export is mechanical, so a committed deterministic script is preferred over the guide-first style of `managing-product-docs`.

## When to use

- A `docs/` folder from `managing-product-docs` needs HTML output.
- User wants one shareable/printable file of the whole set.

Not for: authoring docs (use `managing-product-docs`); arbitrary unrelated markdown — this is scoped to the product-docs set (knows doc order, header block, DESIGN tokens, STYLE anchors).

## Run

Needs Node 18+. No install — `scripts/build.mjs` is pre-bundled.

```bash
node <skill>/scripts/build.mjs --in docs --out docs/html --mode both
```

`--help` for flags. Defaults: `--in docs`, `--out docs/html`, `--mode both`.

`examples/docs/` holds a complete sample doc set (Roomly); `examples/html/` is its rendered output — open `examples/html/index.html` to see what this skill produces.

| Mode | Output | For |
|---|---|---|
| `per-doc` | docs-site: page per doc + `index.html` home + shared `assets/` | browsing, deploying |
| `combined` | single `combined.html`, everything inlined | sharing, printing, PDF |

## Behavior worth knowing

- **Docs-site UI (per-doc).** Sidebar grouped by phase (Product / Requirements / Engineering / Design / Delivery) with active state; topbar search (offline, inlined index) + light/dark toggle (persisted); right-rail on-this-page TOC with scroll-spy; prev/next pager + breadcrumb; responsive sidebar drawer.
- **Offline.** Per-doc references local `assets/` (`doc.css`, `highlight.css`, `app.js`, `search-index.js`, vendored Mermaid); combined inlines all. No CDN.
- **Mermaid** renders client-side and re-themes with the light/dark toggle.
- **Anchors** use GitHub slugs (`## 4.1 Foo` → `#41-foo`), matching STYLE.md cross-refs so `./SRS.md#41-...` resolves.
- **DESIGN.md** YAML token block → Design Tokens table (not mangled to `<hr>`).
- **Links** rewritten: `.md`→`.html` (per-doc); cross-doc → `#doc--anchor` (combined).

## PDF

Combined prints well, but Mermaid needs JS — make the PDF through a browser: Print → Save as PDF, or `chrome --headless --print-to-pdf=out.pdf combined.html`. Non-JS PDF tools leave diagrams blank.

## Common mistakes

- `--in` at project root instead of `docs/` → exports README and junk.
- Non-browser / JS-disabled PDF → blank diagrams.
- Moving an `.html` out of its sibling `assets/` (per-doc) breaks it — move the whole folder, or use `combined`.
- Cross-refs resolve only when source follows STYLE.md (`./<DOC>.md#<slug>`); a link to a missing heading stays dangling (preserved, not invented).

## Maintaining

Edit `scripts/src/build.js`, then rebuild the committed bundle:

```bash
cd scripts && npm install && npm run build
```

Styling/runtime live in `assets/` (`doc.css`, `highlight.css` with light/dark via `html[data-theme]`, and `app.js`); edit them for theming. `build.mjs` reads assets at runtime, so only `src/build.js` changes need a rebuild.

`scripts/vendor/mermaid.min.js` is pinned (10.9.1); highlight.js languages are a curated subset in `src/build.js` — to add one, edit both the `import` block and the registration object. Bump deliberately.
