# Layover — V1 Design Proposal
Product & Technical Specification · Draft — April 2026

---

## At a Glance

| | |
|---|---|
| Pages | 4 |
| Must-have features | 4 |
| Launch airports | 8–12 |

---

## What We Are Building

**Product:** A web app that generates timed, realistic layover itineraries based on your airport and available time. The layover duration is the core input — it drives every recommendation.

**Audience:** Frequent flyers, backpackers, and budget travelers routing through major hub cities who are comfortable leaving the airport but need a confident plan to do it.

**Value proposition:** Not a list of tourist tips — a specific, trustworthy schedule with logistics warnings baked in and a hard leave-by time at every step.

---

## Features in Scope

### 1. Layover input form
Hero of the homepage. Airport search by city or code, time selector with presets (3hr / 5hr / 8hr / 12hr+). Every other feature depends on this being clean and simple.

### 2. Timed itinerary output card
Step-by-step schedule with transit time, time at each location, and a hard leave-by time. Elapsed time shown at every step so the user always knows where they stand.

### 3. Logistics warning block
Rendered before the itinerary. Flags visa/transit requirements, bag storage options, and customs re-entry time. This is what makes the product trustworthy.

### 4. Airport coverage indicator
Status badge on the input form showing Full Coverage, Limited Data, or Not Supported. Sets expectations before the user submits and protects trust in the result.

---

## Pages

| Page | URL | Description |
|---|---|---|
| Homepage | `/` | Entry point. Airport search, time selector, coverage badge. Nothing else competes with the form. |
| Itinerary results | `/itinerary/[code]/[duration]` | Core product page. Logistics warning block followed by the timed itinerary card. |
| Airport coverage | `/airports` | Reference page listing all airports and their coverage status. Linked from the coverage badge. |
| About | `/about` | Explains how itineraries and logistics data are built. Earns trust before the user walks out of an airport on our recommendation. |

---

## Database Schema

### `airports`

| Column | Type | Notes |
|---|---|---|
| `id` | string | Primary key — e.g. YVR |
| `name` | string | Full airport name |
| `city` / `country` | string | Used for display and search |
| `coverage_status` | enum | full / limited / unsupported |
| `customs_reentry_minutes` | integer | Estimate used in leave-by calculation |
| `timezone` | string | e.g. America/Vancouver |

### `itineraries`

| Column | Type | Notes |
|---|---|---|
| `id` | uuid | Primary key |
| `airport_id` | string | FK → airports.id |
| `duration_hours` | integer | 3 / 5 / 8 / 12 |
| `title` / `summary` | string | Display content for the results page |
| `min_duration_hours` | integer | Minimum layover for this itinerary to be viable |

### `itinerary_steps`

| Column | Type | Notes |
|---|---|---|
| `id` | uuid | Primary key |
| `itinerary_id` | uuid | FK → itineraries.id |
| `step_order` | integer | 1, 2, 3... |
| `title` / `description` | string | Step content shown in the itinerary card |
| `duration_minutes` | integer | Time spent at this step |
| `transit_minutes` | integer | Travel time to reach this step |
| `transit_method` / `cost` | string / decimal | e.g. SkyTrain / $4 USD |

### `logistics`

| Column | Type | Notes |
|---|---|---|
| `id` | uuid | Primary key |
| `airport_id` | string | FK → airports.id |
| `visa_notes` | text | Transit visa requirements and exceptions |
| `bag_storage_notes` | text | Where and how to store bags |
| `reentry_notes` | text | What to expect coming back through security |
| `last_updated` | timestamp | So users know how fresh the data is |

### Relationships

- One airport has one logistics record
- One airport has many itineraries
- One itinerary has many itinerary steps

---

## Deferred — Not Building in V1

- User accounts and saved itineraries
- User-submitted reviews or crowdsourced data
- Real-time flight integration and delay tracking
- Native mobile app (site will be mobile-responsive)

---

## Definition of Done

A user can enter an airport and a layover duration, receive a timed itinerary with a logistics warning block, and know immediately whether their airport is supported. Nothing else is required to ship.
