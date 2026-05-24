# VutaDev AI Plugins

Reusable skills for AI coding agents. Install with a single command via [skills.sh](https://skills.sh).

## Available Skills

| Skill | Description |
|-------|-------------|
| **managing-product-docs** | Create, extract, update, and audit product documentation (PRD, tech stack, architecture, SRS, design system, database, API reference, test cases, roadmap, and more) for software projects. Supports greenfield init, brownfield extraction, incremental updates, and gap audits. |

## Installation

### Quick Install (All Agents)

```bash
npx skills add vutadev/ai-plugins --all
```

This auto-detects installed agents and installs all skills to each.

### Claude Code

```bash
npx skills add vutadev/ai-plugins -a claude-code
```

After installation, invoke via `/managing-product-docs` in your Claude Code session.

### OpenAI Codex

```bash
npx skills add vutadev/ai-plugins -a codex
```

### Google Gemini CLI

```bash
npx skills add vutadev/ai-plugins -a gemini-cli
```

### Cursor

```bash
npx skills add vutadev/ai-plugins -a cursor
```

### GitHub Copilot

```bash
npx skills add vutadev/ai-plugins -a github-copilot
```

### Windsurf (Codeium)

```bash
npx skills add vutadev/ai-plugins -a windsurf
```

### Other Agents

The skills CLI supports 45+ agents. Use `--agent` to target any supported agent:

```bash
npx skills add vutadev/ai-plugins -a <agent-name>
```

### Install a Specific Skill

```bash
npx skills add vutadev/ai-plugins -s managing-product-docs
```

### Install Globally (User-Level)

```bash
npx skills add vutadev/ai-plugins -g
```

## Managing Installed Skills

```bash
# List installed skills
npx skills list

# Update to latest version
npx skills update

# Remove skills
npx skills remove -a '*' -s '*' -y
```

## Skill: managing-product-docs

Produces a coherent doc set (up to 15 docs) for software project planning. Every doc shares stable IDs and cross-references so implementation can begin without ambiguity. The skill is guide-first: `SKILL.md` routes to detailed `reference/<doc>-guide.md` files and illustrative `examples/*-example.md` files rather than fixed templates.

### Supported Docs

| # | Document | Required | Purpose |
|---|----------|----------|---------|
| 1 | PRD | Mandatory | What we build (features, scope, decisions) |
| 2 | TECHSTACK | Mandatory | Technology choices, versions, alternatives |
| 3 | ARCHITECTURE | Mandatory | Components, deployment, integration points |
| 4 | BUSINESS_RULES | Optional | Policy that survives code rewrites |
| 5 | SRS | Mandatory | Testable requirements (FR/NFR) |
| 6 | USER_STORIES | Optional | Sprint-ready stories with INVEST self-check + Gherkin AC |
| 7 | USECASES | Optional | Actor-driven interactions |
| 8 | USERFLOWS | Optional | End-to-end journeys (Mermaid diagrams) |
| 9 | SITEMAP | Optional | UI route/page hierarchy |
| 10 | DESIGN | Optional | Visual design system (tokens, colors, typography) |
| 11 | DATABASE | Optional | Physical schema, ER diagrams, DDL |
| 12 | API_REFERENCE | Optional | Hand-curated API contracts |
| 13 | TESTCASES | Mandatory | Executable test cases traced to requirements |
| 14 | ROADMAP | Mandatory | Milestones, dates, exit gates |
| 15 | EXTERNAL_DOCS | Optional | Registry of external APIs/specs/resources |

### Operation Modes

- **greenfield-init** — Start from a brief or idea, produce full doc set
- **brownfield-extract** — Reverse-engineer docs from existing codebase
- **update** — Propagate scope/feature/tech changes across affected docs
- **review** — Gap audit between docs and current code

### Project Archetypes

The skill auto-selects which optional docs to include based on project type:

- **Web App** — includes all optional docs, with USER_STORIES default ON for Scrum teams
- **Backend Service / API** — skips SITEMAP, DESIGN, USERFLOWS, USER_STORIES
- **Library / SDK** — skips SITEMAP, DESIGN, USERFLOWS, DATABASE, USER_STORIES
- **CLI Tool** — skips SITEMAP, DESIGN, USERFLOWS, API_REFERENCE, USER_STORIES
- **Mobile App** — includes USER_STORIES by default; skips SITEMAP
- **Internal Tool / Admin** — includes USER_STORIES by default; skips DESIGN, USERFLOWS, API_REFERENCE

## Contributing

1. Create a new directory under `skills/`
2. Add a `SKILL.md` with YAML frontmatter (`name` and `description` fields)
3. Include any reference files, examples, scripts, or assets your skill needs

## License

MIT for this repository unless otherwise noted. Vendored `google-labs-code/design.md` spec material is Apache-2.0; see `licenses/APACHE-2.0.txt` and `skills/managing-product-docs/reference/design-spec.md`.
