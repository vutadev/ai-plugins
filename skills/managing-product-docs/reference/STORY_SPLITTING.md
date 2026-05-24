# Story Splitting Reference

When a `US-*` fails the **S**mall criterion in `reference/INVEST.md`, split it using one of the patterns below. A good split produces ≥2 stories, each independently shippable, each delivering visible value, each ≤5 dev-days.

Source: BA Zone Digital School material (Phúc NT) + community-standard agile patterns.

---

## Splitting Triggers

Split when ANY of these is true:

- Estimate >5 developer-days.
- Acceptance criteria count ≥7.
- Title contains "AND" (or implicit conjunction: "manage", "handle all").
- Multiple personas in the same story.
- Multiple CRUD operations bundled (Create + Update + Delete in one).
- Story spans multiple workflow stages.
- INVEST `I` fails because of internal coupling.

Stop splitting when:

- Each piece delivers user-visible value on its own.
- Estimate ≤5 days.
- AC count ≤7.
- Persona is singular (per story).

---

## Six Split Patterns

### 1. By CRUD operation

Split a "manage X" story into Create / Read / Update / Delete (and List). Often Read + List ship first as the smallest valuable slice.

**Example:** `US-LIB-01: Manage book inventory` → `US-LIB-01: List books`, `US-LIB-02: Add new book`, `US-LIB-03: Edit book details`, `US-LIB-04: Delete book`.

### 2. By persona

Split when one story serves two distinct roles whose needs diverge.

**Example:** `US-CHK-01: Check out an order (customer + admin)` → `US-CHK-01: Customer self-checkout`, `US-CHK-02: Admin overrides on a customer order`.

### 3. By data type

Split by the shape or category of input/output handled.

**Example:** `US-IMP-01: Import contacts (CSV + Excel + JSON)` → one story per file format. Ship the highest-value format first.

### 4. By business rule

Split when one story bundles multiple policy paths (e.g. discount tiers, trial vs paid, free vs premium).

**Example:** `US-PAY-01: Apply promo discount` → `US-PAY-01: Flat-amount promo`, `US-PAY-02: Percentage promo`, `US-PAY-03: BOGO promo`.

### 5. By workflow stage

Split a long pipeline into its discrete steps; ship each stage independently.

**Example:** `US-ONB-01: Complete onboarding` → `US-ONB-01: Sign-up form`, `US-ONB-02: Email verification`, `US-ONB-03: Profile setup`, `US-ONB-04: Tutorial walkthrough`.

### 6. By platform

Split by the surface or device the story targets.

**Example:** `US-NOTIF-01: Receive notifications` → `US-NOTIF-01: Receive web push`, `US-NOTIF-02: Receive mobile push`, `US-NOTIF-03: Receive email`.

---

## Anti-Patterns (Do NOT Split This Way)

| Anti-pattern | Why it fails |
|--------------|--------------|
| **By tech layer** ("backend story" + "frontend story") | Neither delivers user value alone; both must ship together — fails Independent. |
| **By team / department** ("BA story" + "QA story") | Stories describe user-facing increments, not internal handoffs. |
| **Horizontal slice** ("data model first, then UI later") | Same trap as tech-layer split — invisible work that delivers no observable behavior. |
| **By task / activity** ("design the schema", "write the API") | These are tasks, not stories. Tasks live under a story, never replace it. |
| **By non-functional concern alone** ("make it fast", "make it secure") | Lift the NFR into the parent story's AC instead, with measurable threshold. |

---

## Quick Decision Aid

```text
Story too big?
  ├─ Multiple CRUD verbs?      → split by CRUD (pattern 1)
  ├─ Multiple personas?         → split by persona (pattern 2)
  ├─ Multiple data formats?     → split by data type (pattern 3)
  ├─ Multiple policy branches?  → split by business rule (pattern 4)
  ├─ Linear pipeline?           → split by workflow stage (pattern 5)
  ├─ Multiple devices/surfaces? → split by platform (pattern 6)
  └─ None of the above?         → re-read the story; you may be conflating
                                  scope with implementation depth.
```

After splitting: re-run INVEST on each new story. Re-check estimate and AC count. Update `USER_STORIES.md` Story Index and traceability tables following `reference/user-stories-guide.md` so the split is auditable.
