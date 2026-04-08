# Layover — V1 Implementation Tasks

Each task is scoped to 1–2 hours and maps directly to a must-have feature from the project proposal.

---

## Feature 1 — Layover Input Form

| # | Task | Notes |
|---|---|---|
| 1.1 | Scaffold Next.js app in `/frontend` | `npx create-next-app`, configure Tailwind v4, verify dev server runs |
| 1.2 | Build airport search input | Text input with debounce, filters a local list by city name or IATA code |
| 1.3 | Build duration selector | Button group for 3hr / 5hr / 8hr / 12hr+ presets, one selected at a time |
| 1.4 | Wire up form state & submit | Connect airport + duration into a single form, validate both fields selected before submit routes to `/itinerary/[code]/[duration]` |

---

## Feature 2 — Timed Itinerary Output Card

| # | Task | Notes |
|---|---|---|
| 2.1 | Seed itinerary data for 1 airport | Pick one airport (e.g. YVR), write JSON/DB rows for one itinerary with 3–4 steps |
| 2.2 | Build the itinerary card component | Renders step title, description, duration at location, transit method/cost to next step |
| 2.3 | Add elapsed time + leave-by calculation | Given a start time, compute and display cumulative elapsed time and final leave-by time at each step |
| 2.4 | Build the `/itinerary/[code]/[duration]` page | Fetches the right itinerary, renders the card, handles no-data state |

---

## Feature 3 — Logistics Warning Block

| # | Task | Notes |
|---|---|---|
| 3.1 | Seed logistics data for 1 airport | Write visa notes, bag storage notes, re-entry notes for the same airport as 2.1 |
| 3.2 | Build the warning block component | Displays each logistics note as a distinct callout, visually distinct from the itinerary card |
| 3.3 | Place warning block on itinerary page | Renders above the itinerary card, always shown when logistics data exists |

---

## Feature 4 — Airport Coverage Indicator

| # | Task | Notes |
|---|---|---|
| 4.1 | Add `coverage_status` to airport data | Enum: `full` / `limited` / `unsupported` — set for all seeded airports |
| 4.2 | Build the coverage badge component | Three visual states: green (Full Coverage), yellow (Limited Data), grey (Not Supported) |
| 4.3 | Show badge on input form | Appears dynamically once an airport is selected, before the user submits |
| 4.4 | Block submit for unsupported airports | If status is `unsupported`, disable the generate button and show a message |

---

## Summary

| Feature | Tasks |
|---|---|
| Layover input form | 1.1 – 1.4 |
| Timed itinerary output card | 2.1 – 2.4 |
| Logistics warning block | 3.1 – 3.3 |
| Airport coverage indicator | 4.1 – 4.4 |
| **Total** | **14 tasks** |

Roughly 2–3 days of focused work to reach the definition of done.
