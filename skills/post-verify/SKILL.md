---
name: post-verify
description: Use after completing a task, feature, fix, refactor, release step, or handoff when the agent must verify the real runtime behavior before saying it is done. Applies to backend, frontend, CLI, batch jobs, integrations, docs-generated artifacts, and fullstack work. Use curl/http clients for HTTP checks, agent-browser for browser checks, screenshots, command-line probes, logs, or manual evidence; proactively start local services when safe. Every pass leaves a human-readable HTML report backed by reviewable artifact files (request/response logs, screenshots); source code files are never evidence. Includes explicit fresh mode for local development verification when the user asks to resolve port conflicts, clear local data, start a clean session, or restart from scratch.
---

# Post-Verify

## Principle

Prove the finished work in the running system or final artifact. Verify against the task's goal - the outcome the user wanted - not the steps the agent took to build it. Passing tests, typechecks, or build commands are useful evidence, but they do not replace a runtime or artifact check.

Report observations from this session only. Mark checks as passing only when directly verified.

## Evidence Artifacts

One test decides whether a file is an artifact: **does it prove the behavior of the thing you changed, observed at check time?** If not, do not save it.

Never save (these prove setup ran, not that the feature behaves):

- Test, typecheck, lint, or build output. That is a separate gate - report its pass/fail inline in the verdict; never store it as an artifact.
- Readiness or health probes, boot logs, login/auth setup, service start/stop/restart captures.
- Retries, intermediate states, debug dumps. The final state is the proof.
- Raw DOM/snapshot dumps (`agent-browser snapshot`, `.yml` trees, saved page HTML). Read them live to observe state; put the observed value in the report as text, not a machine dump on disk.

Artifacts are for a human to review, not a machine to parse. Save exactly the files that prove the change - final request/response, final-state screenshot, produced file - and one HTML report that ties them together.

Store under `<project_dir>/.artifacts/`, one timestamped subdirectory per pass (local time, one timestamp for the whole pass):

```text
<project_dir>/.artifacts/
  report/<YYYYMMDD-HHMMSS-feature>/report.html   human-readable HTML report of the pass
  logs/<YYYYMMDD-HHMMSS-feature>/                 API, CLI, job logs (.log, .jsonc)
  screenshots/<YYYYMMDD-HHMMSS-feature>/          UI screenshots (.png)
  docs/<YYYYMMDD-HHMMSS-feature>/                 produced documents, exports, rendered output
```

Each pass produces one `report/<pass>/report.html`: a self-contained page a reviewer opens to see the check table, verdict, embedded screenshots, and key request/response excerpts, with the raw logs and screenshots linked by relative path. This report is the primary human-readable artifact; the logs and screenshots are its backing evidence.

Name backing files with a sequence prefix and the check they prove: `01-create-user.jsonc`, `02-dashboard-loaded.png`.

**Completion criterion:** before reporting, every file in the pass directory must be cited by a check in the report. Delete any file no check cites - this removes scaffolding, retries, and dumps in one pass. Ensure `.artifacts/` is git-ignored; never commit it.

Required per lane:

| Lane | Required artifact |
|---|---|
| Backend/API | Log file (`.log` or `.jsonc`) with the exact request (curl command or equivalent) plus the full captured response: status line, key headers, body. Real captured content only - never placeholders, summaries, or hand-written expected output. |
| Frontend/UI | Screenshot per verified state under `.artifacts/screenshots/`. When a screenshot cannot show the behavior (DOM attribute, hidden state, aria label, injected data), read it live with a snapshot and record the observed value as text in `report.html` - do not save the raw snapshot. |
| CLI/tooling | Log file with the exact command, exit code, and captured stdout/stderr. |
| Integration/jobs | Log file with the trigger and the observed result: response, persisted record, emitted event, or log excerpt. |
| Docs/artifact | The produced artifact itself, or a log of the render/parse/validation output. |

Rules:

- Report every artifact by its exact file path, down to the file name - never a directory-only reference.
- Include the reviewable URL in the report whenever the verified surface has one (page route, API base, preview link, deployed URL).
- Never cite source code as evidence. Code shows intent, not runtime behavior. If the only "evidence" is the code itself, the check is not verified - mark it `[ ]`.
- Capture artifacts at check time with `tee` or output redirection, not by reconstructing them afterward from memory.
- Mask secrets (tokens, cookies, credentials) in every artifact.

## Operating Modes

Use **default mode** unless the user explicitly asks for fresh mode.

Default mode:

- Discover and use the real project entry point before declaring verification blocked.
- Start missing local services when the boot command is clear from project instructions, scripts, or config.
- If verification is blocked by a port conflict, stale browser/session state, stale local data, or a wedged dev server, ask before switching to fresh mode.

Fresh mode (policy; procedure is in Fresh Mode Setup):

- Use only when the user says `fresh`, `start from fresh`, `restart clean`, `kill and start`, `clear data`, `start from scratch`, `new session`, `resolve port conflict`, or equivalent wording.
- Stop only clearly project-owned processes; graceful interrupt first, force only after a short timeout. Ask before killing an unknown process or one that may belong to another project or user workflow.
- Clearing is limited to project-local dev state: this project's browser session/cookies/localStorage, documented temp/cache, local containers/volumes, seed/dev databases, or documented reset commands. Prefer a documented reset command over manual deletion.
- Never clear production data, shared credentials, global user caches, unrelated browser profiles, or unrelated processes.

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

### 2. Extract the Goal, Then Choose the Smallest Real Check

First state the goal: what did the task set out to achieve for the user? Recover it from the request and the change, then sharpen it into one observable success sentence - a specific outcome you can see in the running system, not a restatement of the steps taken. "Users on the free plan see the upgrade CTA on the billing page," not "added the CTA component."

Derive the checks from that goal:

- Golden path: the sharpened goal, observed directly.
- Edges: one or two realistic failure, empty, invalid, permission, or rollback cases the goal implies.
- Regression guard: one nearby behavior that should still work.

Check the goal at the entry point users or systems actually call - a route, UI, command, or artifact. Do not re-run the agent's in-process steps or check only an internal helper; those show the work happened, not that the goal is met.

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

Capture the request and response for the route under test as it runs - not a health probe. Example shape:

```bash
ART_DIR="<project_dir>/.artifacts/logs/<YYYYMMDD-HHMMSS-feature>"
mkdir -p "$ART_DIR"

{ echo "# curl -sS -i -X POST $BASE_URL/users (auth masked)"
  curl -sS -i -X POST "$BASE_URL/users" \
    -H "authorization: Bearer $TOKEN" \
    -d '{"email":"a@b.com"}'
} | tee "$ART_DIR/01-create-user.log"
```

For JSON responses, save the parsed body as `.jsonc` with a comment naming the request.

Record in the report: status, key body fields, any relevant server log line or trace id, and the artifact file path for each check. An API check whose log file is missing or empty is not verified.

#### Frontend/UI

Exercise each acceptance step through the UI:

1. Open the actual route and record its URL for the report.
2. Interact with the relevant controls.
3. Re-check the page after every submit, navigation, or state change.
4. Capture a screenshot for every verified state - a frontend check without a screenshot is not verified.
5. When the behavior is not visible in a screenshot (DOM attribute, hidden state, aria label, injected data), read it live with `agent-browser snapshot` and write the observed value into `report.html` as text. Do not save the raw snapshot.

Use `agent-browser` for every browser step. Save screenshots under `.artifacts/screenshots/` in the pass's timestamped subdirectory. Use one timestamp for all artifacts from the same pass. Do not save screenshots directly under `<project_dir>/`.

```text
<project_dir>/.artifacts/screenshots/<YYYYMMDD-HHMMSS-feature>/<nn>-<state>.png
```

The screenshot path is a positional argument and must be absolute - the `agent-browser` server resolves relative paths against its own working directory, not the shell's, so a relative path fails or lands elsewhere.

Example shape:

```bash
ART="$(pwd)/.artifacts/screenshots/<YYYYMMDD-HHMMSS-feature>"
agent-browser open "$WEB_URL/path"
agent-browser snapshot   # read state live; observed value goes into report.html
agent-browser click <ref>
agent-browser screenshot --full "$ART/01-state.png"
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

Write `report/<pass>/report.html` and emit the same content to chat as Markdown. Never skip the report, even when checks fail.

`report.html` is a single self-contained page for a human reviewer: the check table with pass/fail, the verdict, each screenshot embedded (relative `<img>`), key request/response excerpts inline, and the review URL. Link the backing logs and screenshots by relative path so the reviewer can open one file and see everything.

Chat report shape (mirror it in `report.html`):

```markdown
## Post-Verify Report

Goal: <sharpened observable outcome the task set out to achieve>
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
- report: `.artifacts/report/<pass>/report.html`
- artifacts:
  - `.artifacts/logs/<pass>/01-create-user.log`
  - `.artifacts/screenshots/<pass>/02-dashboard.png`
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
- Reporting an API check without a saved `.log`/`.jsonc` file containing the real request and response.
- Reporting a frontend check without a screenshot.
- Saving test, typecheck, lint, build, readiness, boot, or login output as an artifact.
- Saving raw DOM/snapshot dumps (`.yml`, page HTML) instead of recording the observed value in `report.html`.
- Finishing a pass without a `report/<pass>/report.html`.
- Leaving a file in the pass directory that no check in the report cites.
- Writing an artifact file after the fact instead of capturing it while the check ran.
- Omitting the review URL when the verified surface has one.
- Reporting an artifact directory instead of exact file names.
- Saving verification data outside `<project_dir>/.artifacts/`.
- Reusing another project's ports, credentials, paths, or screenshots.
- Skipping edge cases because the golden path passed.
- Reporting `PASSED` while any check is `[ ]`.
- Hiding a blocked check inside a vague summary.
- Killing a process without identifying it and confirming it is project-owned or user-approved.
- Clearing unscoped local data, global caches, shared browser profiles, credentials, or production resources.
- Claiming fresh verification without cleared-session, service restart, and readiness evidence.

## Quick Reference

```text
mode -> extract+sharpen goal -> classify -> matrix from goal -> start or fresh clear/restart -> run real checks + capture artifacts -> write report.html + chat report (checks, verdict, artifact paths, review url) -> next action
```
