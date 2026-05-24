# Design System — Roomly

> Visual design system for Roomly. Tokens in the YAML block are normative; the prose explains how to apply them.

---
version: 1.0.0
date: 2026-05-24
status: Final
source: PRD v1.0.0, SITEMAP v1.0.0
owner: Design Lead
name: Roomly Calm Productivity
colors:
  primary: "#2D5BFF"
  secondary: "#5B6472"
  accent: "#16A34A"
  neutral: "#F5F7FA"
  surface: "#FFFFFF"
  error: "#DC2626"
typography:
  headline-lg:
    fontFamily: Inter
    fontSize: 28px
    fontWeight: 600
    lineHeight: 1.2
  body-md:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: 400
    lineHeight: 1.6
  label-sm:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: 500
    lineHeight: 1
    letterSpacing: 0.04em
spacing:
  xs: 4px
  sm: 8px
  md: 16px
  lg: 24px
  xl: 40px
rounded:
  sm: 6px
  md: 10px
  full: 9999px
components:
  button-primary:
    backgroundColor: "{colors.primary}"
    textColor: "#FFFFFF"
    rounded: "{rounded.md}"
    padding: 12px
  badge-confirmed:
    backgroundColor: "{colors.accent}"
    textColor: "#FFFFFF"
    rounded: "{rounded.full}"
---

## Overview

Roomly should feel fast, calm, and trustworthy — booking a room is a quick utility task, not a destination. Favor whitespace and clear status over decoration.

## Colors

- **Primary (#2D5BFF):** the single action color — book, confirm, primary buttons.
- **Accent (#16A34A):** reserved for the `Confirmed` state and success.
- **Error (#DC2626):** conflict and "too late to cancel" messages only.
- **Neutral (#F5F7FA):** page background; cards sit on `surface` white.

## Typography

Inter throughout. Headlines at 28px/600 for page titles; body at 16px for content; uppercase-ish labels at 12px with light tracking for metadata (room capacity, timestamps).

## Layout

8px spacing scale. Room cards use 24px (`lg`) internal padding and a max content width of 1100px on desktop.

## Components

Primary button uses `colors.primary` with 10px radius. The booking status uses `badge-confirmed` (accent, pill) for confirmed and `colors.secondary` for cancelled.

## Do's and Don'ts

- Do use primary blue for exactly one action per screen.
- Don't use accent green for anything except success/confirmed states.
- Do keep conflict messaging in `error` red with a clear next step.
