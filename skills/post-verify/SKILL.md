---
name: post-verify
description: Use after completing a task, feature, fix, refactor, release step, or handoff when the agent must verify the real runtime behavior before saying it is done. Applies to backend, frontend, CLI, batch jobs, integrations, docs-generated artifacts, and fullstack work. Use curl/http clients for HTTP checks, agent-browser for browser checks, screenshots, command-line probes, logs, or manual evidence; proactively start local services when safe. Every check must leave a reviewable artifact file (API request/response logs, screenshots, HTML captures); source code files are never evidence. Includes explicit fresh mode for local development verification when the user asks to resolve port conflicts, clear local data, start a clean session, or restart from scratch.
---

# Post-Verify

## Principle

Prove the finished work in the running system or final artifact. Passing tests, typechecks, or build commands are useful evidence, but they do not replace a runtime or artifact check.

Report observations from this session only. Mark checks as passing only when directly verified.

## Evidence Artifacts

Every check must leave a reviewable artifact on disk. A check without an artifact does not count as verified, even if it ran.

Store all verification data under `<project_dir>/.artifacts/`, split by type, with one timestamped subdirectory per verification pass (local time, one timestamp for the whole pass):

```text
<project_dir>/.artifacts/
  logs/<YYYYMMDD-HHMMSS-feature>/         API, CLI, job logs (.log, .jsonc, .jsonl)
  screenshots/<YYYYMMDD-HHMMSS-feature>/  UI screenshots (.png)
  html/<YYYYMMDD-HHMMSS-feature>/         HTML captures and snapshots
  docs/<YYYYMMDD-HHMMSS-feature>/         produced documents, exports, rendered output
```

Name files with a sequence prefix and the check they prove: `01-health.log`, `02-create-user.jsonc`, `03-dashboard-loaded.png`. Ensure `.artifacts/` is git-ignored; never commit verification artifacts.

Curate for manual review. Keep only files a human reviewer needs: the final request/response per check, final-state screenshots, the produced artifact. Before reporting, delete debug dumps, retry noise, and redundant intermediate captures.

Required per lane:

| Lane | Required artifact |
|---|---|
| Backend/API | Log file (`.log`, `.jsonc`, or `.jsonl`) containing the exact request (curl command or equivalent) plus the full captured response: status line, key headers, and body. Real captured content only - never placeholders, summaries, or hand-written expected output. |
| Frontend/UI | Screenshot per verified state under `.artifacts/screenshots/`, and an HTML capture (`agent-browser snapshot` output or saved page HTML) under `.artifacts/html/` when a screenshot alone cannot show the verified behavior. |
| CLI/tooling | Log file with the exact command, exit code, and captured stdout/stderr. |
| Integration/jobs | Log file with the trigger and the observed result: response, persisted record, emitted event, or log excerpt. |
| Docs/artifact | The produced artifact itself, or a log of the render/parse/validation output. |

Rules:

- Report every artifact by its exact file path, down to the file name - never a directory-only reference.
- Include the reviewable URL in the report whenever the verified surface has one (page route, API base, preview link, deployed URL).
- Never include or cite source code files as evidence. Code shows intent, not runtime behavior. If the only available "evidence" is the code itself, the check is not verified - mark it `[ ]`.
- Capture artifacts at check time with `tee` or output redirection, not by reconstructing them afterward from memory.
- Mask secrets (tokens, cookies, credentials) in every artifact.

## Operating Modes

Use **default mode** unless the user explicitly asks for fresh mode.

Default mode:

- Discover and use the real project entry point before declaring verification blocked.
- Start missing local services when the boot command is clear from project instructions, scripts, or config.
- If verification is blocked by a port conflict, stale browser/session state, stale local data, or a wedged dev server, ask before switching to fresh mode.

Fresh mode:

- Use only when the user says `fresh`, `start from fresh`, `restart clean`, `kill and start`, `clear data`, `start from scratch`, `new session`, `resolve port conflict`, or equivalent wording.
- Identify the project command, expected URL or port, conflicting process, and stale state candidate before acting.
- Stop only clearly project-owned local development processes. Send a graceful interrupt or terminate first; use force only after a short timeout.
- Ask before killing an unknown process or a process that may belong to another project or user workflow.
- Allow clearing project-local development data so verification starts from a scratch session: browser session state for this project, app cookies/localStorage/sessionStorage, documented temp/cache artifacts, local containers, local volumes, seed/dev databases, or documented local development reset commands.
- Prefer documented reset commands over manual deletion. When no reset command exists, clear only paths or resources that are clearly scoped to the project.
- Never clear production data, shared credentials, global user caches, unrelated browser profiles, or unrelated processes.
- Restart from the documented local command and wait for readiness before running checks.

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
Mode: default|fresh
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
| Browser/UI | `agent-browser` | `agent-browser` snapshot, screenshot, and dev server logs |
| CLI/tooling | run the installed command exactly as a user would | dry-run, fixture command, help/version plus output artifact check |
| Worker/job | enqueue or invoke the job entry point | local fixture invocation, log inspection with known input |
| Generated artifact | open/render/parse the output format | checksum, schema validation, text extraction |

Respect project instructions for how to boot services. If they are missing, infer from common commands such as `make dev`, `npm run dev`, `pnpm dev`, `docker compose up`, or the repository README. Record the command used.

Use `agent-browser` for browser work. When the user asks for `--headed`, headed, or non-headless mode, run `agent-browser open --headed <url>`.

Do not hard-code ports, credentials, tenant names, or skill names from another project. Discover them from config, environment, seed data, docs, or the user request. Mask secrets in the report.

When a needed local service is not running, proactively try to start it if the command is clear. If the expected port is occupied, inspect it first:

```bash
lsof -nP -iTCP:<port> -sTCP:LISTEN
```

In default mode, use an alternate port only when the project supports it and the changed behavior does not depend on the original port. In fresh mode, stop the project-owned conflicting process, clear project-local stale state when relevant, restart the service, and record the evidence.

### 4. Fresh Mode Setup

Skip this section unless fresh mode is active.

1. Find the local boot command from project docs, package scripts, make targets, compose files, or framework config.
2. Find expected ports and readiness probes from config, logs, health routes, or dev server output.
3. Inspect any conflicting port with `lsof` and confirm the process is project-owned before stopping it.
4. Stop stale project-owned servers, containers, or workers. Prefer graceful commands such as Ctrl-C, `docker compose down`, or the package manager's documented stop command.
5. Clear project-local development data needed for a clean session: Browser profiles, browser storage, app session data, local temp/cache folders, local containers/volumes, seed/dev databases, or documented dev reset commands.
6. Recreate required seed data or run documented migrations when the clean session needs them.
7. Restart the service from the documented command. Capture the command, URL, port, PID or container name, and readiness signal.
8. Continue to lane checks only after the restarted system responds or produces a clear blocking error.

### 5. Run Lane Checks

#### Backend/API

Verify status codes and meaningful response fields. Include negative cases where relevant.

Capture every request and response into the artifact directory as it runs. Example shape:

```bash
ART_DIR="<project_dir>/.artifacts/logs/<YYYYMMDD-HHMMSS-feature>"
mkdir -p "$ART_DIR"

{ echo "# curl -sS -i $BASE_URL/health"
  curl -sS -i "$BASE_URL/health"
} | tee "$ART_DIR/01-health.log"

{ echo "# curl -sS -i $BASE_URL/path-under-test (auth masked)"
  curl -sS -i "$BASE_URL/path-under-test" \
    -H "authorization: Bearer $TOKEN"
} | tee "$ART_DIR/02-path-under-test.log"
```

For JSON responses, also save the parsed body as `.jsonc` (with a comment naming the request) or append one request/response pair per line to a `.jsonl` file when checking many cases.

Record in the report: status, key body fields, any relevant server log line or trace id, and the artifact file path for each check. An API check whose log file is missing or empty is not verified.

#### Frontend/UI

Exercise each acceptance step through the UI:

1. Open the actual route and record its URL for the report.
2. Interact with the relevant controls.
3. Re-check the page after every submit, navigation, or state change.
4. Capture a screenshot for every verified state - a frontend check without a screenshot is not verified.
5. Save an HTML capture (`agent-browser snapshot` output redirected to a file in the artifact directory) when the verified behavior is not visible in a screenshot alone: DOM attributes, hidden state, aria labels, injected data.

Use `agent-browser` for every browser step. Save screenshots under `.artifacts/screenshots/` and HTML captures under `.artifacts/html/`, in the pass's timestamped subdirectory. Use one timestamp for all artifacts from the same verification pass.

```text
<project_dir>/.artifacts/screenshots/<YYYYMMDD-HHMMSS-feature>/<nn>-<state>.png
<project_dir>/.artifacts/html/<YYYYMMDD-HHMMSS-feature>/<nn>-<state>.html
```

Do not save screenshots directly under `<project_dir>/`.

Example shape:

```bash
agent-browser open --headed "$WEB_URL/path"
agent-browser snapshot
agent-browser click <ref>
agent-browser snapshot > "<project_dir>/.artifacts/html/<YYYYMMDD-HHMMSS-feature>/01-state.html"
agent-browser screenshot --filename="<project_dir>/.artifacts/screenshots/<YYYYMMDD-HHMMSS-feature>/01-state.png"
agent-browser close
```

#### CLI/Tooling

Run the command as documented or as installed:

```bash
<command> <representative arguments> 2>&1 | tee "$ART_DIR/03-cli-run.log"
echo "exit: ${PIPESTATUS[0]}" | tee -a "$ART_DIR/03-cli-run.log"
```

Verify exit code, stdout/stderr, and produced files. For destructive commands, use a fixture, temp directory, dry-run, or test environment.

#### Integrations And Jobs

Use local fakes, sandbox credentials, fixtures, or recorded payloads when available. Verify both the request/enqueue side and the observable result: response, persisted record, emitted event, log, email preview, or output object.

#### Docs And Artifacts

Open, render, parse, or validate the produced artifact. Examples: preview markdown, inspect generated HTML, extract text from PDF/DOCX, validate JSON/schema, or open an exported file. Save the produced artifact copy or the render/validation output under `.artifacts/docs/<YYYYMMDD-HHMMSS-feature>/`.

### 6. Report

Always emit a report, even when checks fail:

```markdown
## Post-Verify Report

Mode: default|fresh
Scope: <lanes>

### Checks
- [x] <golden path> -> <observed evidence> -> `<artifact file>`
- [x] <edge case> -> <observed evidence> -> `<artifact file>`
- [ ] <failed or blocked check> -> expected <x>, got <y> FAILED

### Verdict
PASSED|FAILED|BLOCKED - <n> of <m> checks passed.

### Evidence
- review url: `<page route, API base, preview or deployed URL, or n/a>`
- artifacts:
  - `.artifacts/logs/<pass>/01-health.log`
  - `.artifacts/screenshots/<pass>/02-dashboard.png`
  - `.artifacts/html/<pass>/03-form-state.html`
- command: `<exact command or tool action>`
- service: `<boot command, URL/port, PID/container, readiness signal>`
- fresh: `<stopped process, cleared project-local data/session state, seed/reset command, restart evidence, or n/a>`
- log/trace: `<short reference>`
```

Use these rules:

- `[x]` means personally observed passing in this run.
- `[ ]` means failed, blocked, skipped, or not run.
- `PASSED` only when every check is `[x]`.
- `FAILED` when a check ran and behavior was wrong.
- `BLOCKED` when verification could not run because of missing services, credentials, tooling, or access.
- Every `[x]` must point to an artifact file that exists on disk with real captured content.
- Never list source code files under Evidence.
- Include enough evidence for another agent to repeat the check.

### 7. Recommend Next Action

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
- Citing source code as verification evidence.
- Reporting an API check without a saved `.log`/`.jsonc`/`.jsonl` file containing the real request and response.
- Reporting a frontend check without a screenshot or HTML capture.
- Writing an artifact file after the fact instead of capturing it while the check ran.
- Omitting the review URL when the verified surface has one.
- Reporting an artifact directory instead of exact file names.
- Saving verification data outside `<project_dir>/.artifacts/`.
- Leaving debug dumps, retry noise, or redundant captures in `.artifacts/` instead of curating for manual review.
- Reusing another project's ports, credentials, paths, or screenshots.
- Skipping edge cases because the golden path passed.
- Reporting `PASSED` while any check is `[ ]`.
- Hiding a blocked check inside a vague summary.
- Killing a process without identifying it and confirming it is project-owned or user-approved.
- Clearing unscoped local data, global caches, shared browser profiles, credentials, or production resources.
- Claiming fresh verification without cleared-session, service restart, and readiness evidence.

## Quick Reference

```text
mode -> classify -> matrix -> start or fresh clear/restart -> run real checks + capture artifacts -> report checkbox evidence + artifact paths + review url -> next action
```
