# Layover — Database Schema

---

## Tables

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

---

## Relationships

- One airport has one logistics record
- One airport has many itineraries
- One itinerary has many itinerary steps
