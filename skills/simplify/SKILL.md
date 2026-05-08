---
name: simplify
description: Use when recently modified code should be refined for clarity, consistency, maintainability, and reuse without changing behavior.
---

# Simplify Code

## Overview

Refine code for clarity, consistency, and maintainability while preserving exact behavior. Prioritize readable, explicit code over clever compact code.

## When to Use

Use this skill when:

- Code was recently written or modified and needs a cleanup pass.
- The user asks to simplify, clean up, refactor lightly, deslop, reduce duplication, or improve readability.
- A change works but has unnecessary nesting, redundant abstractions, unclear names, or obvious comments.
- Code should better match project conventions without changing functionality.

Do not use this skill for:

- Adding features or changing behavior.
- Broad architecture redesigns.
- Performance rewrites that alter algorithms or risk behavior changes.
- Files outside the recently touched scope, unless the user explicitly requests broader review.

## Core Principles

1. **Preserve functionality.** Never change what the code does; only change how it is expressed. Keep public APIs, outputs, data shape, error behavior, side effects, and control flow semantics intact.
2. **Apply project standards.** Follow conventions from `AGENTS.md`, README files, language configs, linters, formatters, and nearby code.
3. **Enhance clarity.** Reduce unnecessary complexity and nesting, remove duplication, improve names, consolidate related logic, and delete comments that only restate obvious code.
4. **Keep balance.** Do not over-compress code, introduce clever one-liners, merge unrelated concerns, or remove abstractions that make the code easier to understand or extend.
5. **Focus scope.** Prefer recently modified or explicitly requested files. Skip files where a safe, meaningful simplification is not available.

## Simplification Rules

Prefer:

- Existing utilities and local patterns over new abstractions.
- Explicit `if`/`else` or `switch` logic over nested ternaries.
- Clear intermediate variables when they improve readability.
- Small deletions and consolidation over new layers.
- Direct code when an abstraction is used only once and adds no clarity.

Avoid:

- Renaming exported symbols or changing function signatures without explicit instruction.
- Reordering logic when order might affect behavior.
- Removing comments that explain non-obvious constraints, decisions, or edge cases.
- Introducing new dependencies.
- Expanding scope to unrelated files.

If unsure whether a change preserves behavior, leave the code unchanged and report why.

## Process

1. Identify the recently modified or requested code sections.
2. Read nearby code and project guidance to infer local style.
3. Look for safe opportunities to improve clarity, reuse, and consistency.
4. Apply the smallest behavior-preserving edits that materially improve maintainability.
5. Verify with the most relevant available check: targeted tests, typecheck, lint, build, or diagnostics.
6. Report what changed, what was skipped, and verification evidence.

## Output Format

```markdown
## Files Simplified
- `path/to/file`: brief description of behavior-preserving simplification

## Changes Applied
- Category: what changed and why

## Skipped
- `path/to/file`: reason no safe meaningful simplification was made

## Verification
- Command/check: result
- Gaps: anything not verified
```

## Failure Modes to Avoid

- **Behavior changes:** Changing exports, signatures, outputs, error handling, async timing, side effects, or control-flow semantics.
- **Scope creep:** Refactoring files not recently touched or explicitly requested.
- **Over-abstraction:** Adding helpers, wrappers, or classes for one-off logic.
- **Over-compression:** Replacing clear code with dense chains, nested ternaries, or hard-to-debug expressions.
- **Comment damage:** Deleting comments that encode business rules, constraints, or non-obvious rationale.
