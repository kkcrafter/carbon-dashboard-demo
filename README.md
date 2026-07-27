# ESG Carbon Dashboard — Demo

Track CO₂e across sites: register facilities, enter monthly activity readings, and convert them
to emissions with centrally managed factors. React + TypeScript + Vite, built milestone by
milestone.

## Run it

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # tsc -b && vite build
npm run lint
```

No backend, no database. `src/api/*` is an in-memory fake with a 300 ms artificial delay,
seeded from `src/api/seed.ts`. **Data resets on page reload** — real persistence arrives in
milestone 07.

## Scope

- [x] **01 — Project setup & domain model.** Vite + TS project, `Facility` / `ActivityRecord` /
      `EmissionFactor` / `CalculationResult` types, seed data.
- [x] **02 — See the list of sites.** Facilities page rendering from the fake API, with loading state.
- [x] **03 — Manage sites.** Create, edit and delete a facility through a controlled form.
- [ ] **04 — Enter readings & calculate CO₂e.** Activity readings per site per month, multiplied by
      the matching emission factor. `ActivityForm` exists but is still mounted ad hoc in `App.tsx`
      (hardcoded to Munich Plant, logs to console) and no calculation runs yet.
- [ ] **05 — Drill into one site.** Per-facility detail view with its readings over time; needs routing.
- [ ] **06 — Overview screen.** Company-wide totals and trend in one view.
- [ ] **07 — Make the data real.** Replace the in-memory store with a real API so data survives reload.
- [ ] **08 — Scope 1/2/3 breakdown.** Group emissions by GHG Protocol scope for reporting.
- [ ] **09 — Lock it down.** Authentication and protected routes.
- [ ] **10 — Bulk import.** Upload a file of readings instead of typing them one at a time.
- [ ] **11 — Ship it.** Error boundaries, accessibility pass, deploy.

## Layout

```text
src/
  types/domain.ts        Facility, ActivityRecord, EmissionFactor, CalculationResult
  api/                   fake async data layer (facilities, activities, factors, seed)
  features/facilities/   FacilitiesPage, FacilityList, FacilityCard, FacilityForm
  features/activities/   ActivityList, ActivityForm
  components/            shared bits (Spinner)
```

Domain model in one paragraph: a **Facility** is a physical site. An **ActivityRecord** is one
measurement at that site for one month (120,000 kWh of electricity in 2026-04). An
**EmissionFactor** converts a quantity to kgCO₂e for a given category and region, and carries the
GHG Protocol scope. Multiply the two, store a **CalculationResult** so the number is auditable.
