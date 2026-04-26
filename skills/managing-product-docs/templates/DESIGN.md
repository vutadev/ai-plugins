---
version: "{{SEMVER}}"
date: "{{YYYY-MM-DD}}"
status: Draft
source: "{{PRD §UI, brand brief}}"
owner: "{{name}}"
specVersion: alpha
name: "{{DESIGN_SYSTEM_NAME}}"
description: "{{one-line design system description}}"
colors:
  primary: "{{#HEX}}"
  secondary: "{{#HEX}}"
  tertiary: "{{#HEX}}"
  neutral: "{{#HEX}}"
typography:
  headline-lg:
    fontFamily: "{{font}}"
    fontSize: 48px
    fontWeight: 600
    lineHeight: 1.1
    letterSpacing: -0.02em
  body-md:
    fontFamily: "{{font}}"
    fontSize: 16px
    fontWeight: 400
    lineHeight: 1.6
  label-md:
    fontFamily: "{{font}}"
    fontSize: 12px
    fontWeight: 500
    lineHeight: 1
    letterSpacing: 0.1em
rounded:
  sm: 4px
  md: 8px
  lg: 12px
  full: 9999px
spacing:
  xs: 4px
  sm: 8px
  md: 16px
  lg: 32px
  xl: 64px
components:
  button-primary:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.neutral}"
    rounded: "{rounded.md}"
    padding: 12px
---

# Design System — {{PROJECT_NAME}}

## Overview

{{Brand personality, target audience, emotional response the UI should evoke. Professional vs playful, dense vs spacious. Foundational context for high-level stylistic decisions when no specific rule or token is defined.}}

## Colors

{{Color palette description. Semantic role for each palette. Why these colors — brand rationale.}}

- **Primary ({{#HEX}}):** {{role and usage}}
- **Secondary ({{#HEX}}):** {{role and usage}}
- **Tertiary ({{#HEX}}):** {{role and usage}}
- **Neutral ({{#HEX}}):** {{role and usage}}

## Typography

{{Typography strategy. Font pairing rationale. Hierarchy intent.}}

- **Headlines:** {{font, weight, usage}}
- **Body:** {{font, size, readability intent}}
- **Labels:** {{font, style, technical data usage}}

## Layout

{{Layout model: fluid grid, fixed-max-width, safe areas. Spacing scale (e.g. 8px base). Containment principles.}}

## Elevation & Depth

{{How visual hierarchy is conveyed. Shadow strategy or flat-design alternative. Tonal layers vs box-shadow levels.}}

## Shapes

{{Shape language. Corner radius strategy. Sharp vs rounded rationale.}}

## Components

### Buttons
{{Primary, secondary, tertiary variants. Sizing, padding, states (hover, active, disabled).}}

### Input Fields
{{Text inputs, labels, helper text, error states.}}

### Cards
{{Container styling, internal padding, border treatment.}}

### Navigation
{{Nav bar, sidebar, tab styling.}}

{{Add project-specific components as needed.}}

## Do's and Don'ts

- Do {{guideline}}
- Don't {{anti-pattern}}
- Do maintain WCAG AA contrast ratios (4.5:1 for normal text)
- Don't mix rounded and sharp corners in the same view
- Do {{guideline}}
- Don't {{anti-pattern}}

---

## Traceability

| Local ID | Upstream IDs |
|----------|--------------|
| DESIGN §Overview | PRD §UI, brand brief |
| DESIGN §Colors | PRD §UI palette |
| DESIGN §Components | SITEMAP routes, SRS UI requirements |

## Change Log

| Version | Date | Author | Change |
|---------|------|--------|--------|
