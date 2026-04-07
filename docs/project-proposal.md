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

## Deferred — Not Building in V1

- User accounts and saved itineraries
- User-submitted reviews or crowdsourced data
- Real-time flight integration and delay tracking
- Native mobile app (site will be mobile-responsive)

---

## Definition of Done

A user can enter an airport and a layover duration, receive a timed itinerary with a logistics warning block, and know immediately whether their airport is supported. Nothing else is required to ship.
