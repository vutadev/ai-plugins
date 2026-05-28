---
name: post-verify
description: Use after completing a task, feature, fix, refactor, release step, or handoff when the agent must verify the real runtime behavior before saying it is done. Applies to backend, frontend, CLI, batch jobs, integrations, docs-generated artifacts, and fullstack work. Use curl/http clients for HTTP checks, playwright-cli for browser checks, screenshots, command-line probes, logs, or manual evidence; do not assume one specific repo, port, credential, or agent-specific follow-up workflow.
---

# Post-Verify

## Principle

Prove the finished work in the running system or final artifact. Passing tests, typechecks, or build commands are useful evidence, but they do not replace a runtime or artifact check.

Report observations from this session only. Mark checks as passing only when directly verified.

## Workflow

### 1. Classify the Surface

Inspect the task, changed files, and expected user impact. Choose every lane that applies:

| Lane | Use for |
|---|---|
| Backend/API | HTTP routes, services, workers, queues, databases, auth, migrations, server config |
| Frontend/UI | Pages, components, forms, navigation, visual states, client-side data flow |
| CLI/tooling | Commands, scripts, generated files, developer workflows |
| Integration | External APIs, webhooks, email, storage, payments, auth providers |
| Docs/artifact | Rendered docs, generated reports, exports, templates |

Output one line:

```text
Scope: <lanes> - touched: <files or areas>
```

### 2. Choose the Smallest Real Check

Create a short verification matrix before running probes:

- Golden path: the main behavior the user expects.
- Edges: one or two realistic failure, empty, invalid, permission, or rollback cases.
- Regression guard: one nearby behavior that should still work.

Prefer checks that exercise the actual entry point users or systems call. Avoid checking only an internal helper when a route, UI, command, or artifact can be verified.

### 3. Adapt to Available Tools

Use the best tools available in the current agent and environment:

| Need | Prefer | Fallback |
|---|---|---|
| HTTP/API | `curl -i`, `http`, repo test client | small script, framework client, documented manual request |
| Browser/UI | `playwright-cli` | `playwright-cli` snapshot, screenshot, and dev server logs |
| CLI/tooling | run the installed command exactly as a user would | dry-run, fixture command, help/version plus output artifact check |
| Worker/job | enqueue or invoke the job entry point | local fixture invocation, log inspection with known input |
| Generated artifact | open/render/parse the output format | checksum, schema validation, text extraction |

Respect project instructions for how to boot services. If they are missing, infer from common commands such as `make dev`, `npm run dev`, `pnpm dev`, `docker compose up`, or the repository README. Record the command used.

Use `playwright-cli` for browser work. When the user asks for `--headed`, headed, or non-headless mode, run `playwright-cli open --headed <url>`.

Do not hard-code ports, credentials, tenant names, or skill names from another project. Discover them from config, environment, seed data, docs, or the user request. Mask secrets in the report.

### 4. Run Lane Checks

#### Backend/API

Verify status codes and meaningful response fields. Include negative cases where relevant.

Example shape:

```bash
curl -sS -i "$BASE_URL/health" | sed -n '1,20p'
curl -sS -i "$BASE_URL/path-under-test" \
  -H "authorization: Bearer $TOKEN" \
  | sed -n '1,40p'
curl -sS -o /dev/null -w '%{http_code}\n' "$BASE_URL/path-under-test"
```

Record status, key body fields, and any relevant log line or trace id.

#### Frontend/UI

Exercise each acceptance step through the UI:

1. Open the actual route.
2. Interact with the relevant controls.
3. Re-check the page after every submit, navigation, or state change.
4. Capture a screenshot when visual state matters or when it helps future review.

Use `playwright-cli` for every browser step. Before saving screenshots, read and sort existing entries under `<project_dir>/screenshots`; choose the next numeric prefix for the feature/work directory so the new directory sorts last, such as `01-login`, `02-dashboard`, then `03-settings`.

Save screenshots only under:

```text
<project_dir>/screenshots/<NN-feature-or-work-name>/<filename>.png
```

Do not save screenshots directly under `<project_dir>/`.

Example shape:

```bash
playwright-cli open --headed "$WEB_URL/path"
playwright-cli snapshot
playwright-cli click <ref>
playwright-cli snapshot
playwright-cli screenshot --filename="<project_dir>/screenshots/<NN-feature>/01-state.png"
playwright-cli close
```

#### CLI/Tooling

Run the command as documented or as installed:

```bash
<command> --help
<command> <representative arguments>
```

Verify exit code, stdout/stderr, and produced files. For destructive commands, use a fixture, temp directory, dry-run, or test environment.

#### Integrations And Jobs

Use local fakes, sandbox credentials, fixtures, or recorded payloads when available. Verify both the request/enqueue side and the observable result: response, persisted record, emitted event, log, email preview, or output object.

#### Docs And Artifacts

Open, render, parse, or validate the produced artifact. Examples: preview markdown, inspect generated HTML, extract text from PDF/DOCX, validate JSON/schema, or open an exported file.

### 5. Report

Always emit a report, even when checks fail:

```markdown
## Post-Verify Report

Scope: <lanes>

### Checks
- [x] <golden path> -> <observed evidence>
- [x] <edge case> -> <observed evidence>
- [ ] <failed or blocked check> -> expected <x>, got <y> FAILED

### Verdict
PASSED|FAILED|BLOCKED - <n> of <m> checks passed.

### Evidence
- command: `<exact command or tool action>`
- artifact: `<path or URL>`
- log/trace: `<short reference>`
```

Use these rules:

- `[x]` means personally observed passing in this run.
- `[ ]` means failed, blocked, skipped, or not run.
- `PASSED` only when every check is `[x]`.
- `FAILED` when a check ran and behavior was wrong.
- `BLOCKED` when verification could not run because of missing services, credentials, tooling, or access.
- Include enough evidence for another agent to repeat the check.

### 6. Recommend Next Action

Suggest one to three concrete next steps based on the verdict and the agent's available workflow names:

| Result | Suggest |
|---|---|
| FAILED with clear cause | fix the cause, then rerun post-verify |
| FAILED with unclear cause | run the local debugging/diagnosis workflow |
| BLOCKED | state the missing prerequisite and exact command/access needed |
| PASSED after code changes | run code review or prepare commit/PR |
| PASSED after UI changes | run visual QA if available |
| PASSED for broad behavior | run deeper QA or regression sweep if risk is high |

Prefer generic wording when skill names differ between agents. If a known local skill exists, name it explicitly.

## Red Flags

- Claiming success from tests alone.
- Marking `[x]` without a probe, interaction, command, or artifact inspection in this session.
- Reusing another project's ports, credentials, paths, or screenshots.
- Skipping edge cases because the golden path passed.
- Reporting `PASSED` while any check is `[ ]`.
- Hiding a blocked check inside a vague summary.

## Quick Reference

```text
classify -> matrix -> run real checks -> report checkbox evidence -> next action
```
