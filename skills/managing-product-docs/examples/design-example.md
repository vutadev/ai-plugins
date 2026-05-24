# Design System Example — TaskFlow Lite

> Illustrative example only. Adapt the pattern to project evidence; do not copy this as a fixed skeleton.

Project context: TaskFlow Lite helps a support team intake, triage, assign, and verify small customer tasks before release.

---
version: 1.0.0
date: 2026-05-24
status: Draft
source: PRD v1.0, SITEMAP v1.0
owner: Product Lead
name: TaskFlow Lite Calm Operations
colors:
  primary: "#1F4E5F"
  accent: "#F2A65A"
  neutral: "#F7F9FA"
typography:
  body-md:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: 400
    lineHeight: 1.5
spacing:
  sm: 8px
  md: 16px
  lg: 24px
rounded:
  md: 8px
components:
  button-primary:
    backgroundColor: "{colors.primary}"
    textColor: "#FFFFFF"
    rounded: "{rounded.md}"
---

## Overview

TaskFlow Lite should feel calm, operational, and low-drama for teams processing many small tasks.

## Do's and Don'ts

- Do reserve accent orange for release blockers and primary calls to action.
- Don't use more than one alert color on the same task card.
