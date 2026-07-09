# Signal Intelligence — Product Safety Intelligence Dashboard

A single-page enterprise dashboard for pharmacovigilance analysts to triage safety signals, monitor case workload, and explore MedDRA taxonomy — built to prioritize decision-making speed over decorative complexity.

## Getting started

```bash
npm install
npm run dev
```

The app runs at `http://localhost:8080`. Mock data only — no backend/API required.

```bash
npm run build   # production build
npm run preview # preview the production build
```

## Design rationale

This dashboard is a redesign of an existing internal tool, restructured around one core question: **what does the analyst need to see first?**

The original interface (not included in this repo) organized content by data source — literature feed, internal cases, MedDRA taxonomy, governance — in the order those systems happened to exist, with no indication of which signals were actually urgent. This version inverts that: content is ordered by **decision priority**, not by system of origin.

**Key structural decisions:**

- **Triage-first layout.** The top of the page is a "What needs attention" row of severity-ranked signal cards — critical/warning/stable — designed to be scanned in under 5 seconds. This didn't exist in the original and is the single biggest functional addition.
- **One semantic color system.** Red / amber / green (`--severity-critical`, `--severity-warning`, `--severity-stable`) is reserved exclusively for status and severity. Every other surface in the product is monochrome, with a single indigo accent (`--accent-neutral`) for interactive elements. Color communicates meaning; it doesn't decorate.
- **Consolidated taxonomy view.** Instead of three separate visualizations of the same MedDRA hierarchy, there is one treemap (shaded by report frequency, single hue) with a toggle to a collapsed hierarchy list — progressive disclosure instead of redundant charts.
- **Real workload visualization.** Case stages (Intake → Triage → Medical Review → Safety Evaluation → Closed) are shown as a horizontal bar chart with SLA-breached stages highlighted in the critical color, replacing an earlier flow diagram that had an unresolved/unmapped data source.
- **No duplicate metrics.** Every number (SLA-at-risk count, case intake, etc.) lives in exactly one place.
- **Labeled navigation.** The sidebar uses icon + text labels with scroll-spy active-state tracking, rather than icon-only navigation.

## Interactivity (not a static mockup)

- Product switcher, date-range filter, severity filter, and search are wired through shared state (`DashboardContext`) and actually filter the triage cards and cases table.
- Cases table supports sorting (by column), tab filtering (All / Open / SLA breach), and pagination.
- Loading skeleton states and empty states are implemented for filtered-to-zero results.
- The Signal Intelligence panel's Treemap ↔ Hierarchy toggle re-renders the same underlying data in two different structures.

## Stack

- React 19 + TypeScript
- TanStack Start / TanStack Router (file-based routing — this project uses a single route, `/`)
- Tailwind CSS v4
- Recharts (bar chart, line sparkline)
- Framer Motion (restrained: staggered blur-in on section titles only, card enter/exit transitions, animated bar/segment fills — no animation on live numeric values)
- lucide-react (icons)

> Note: this was scaffolded via [Lovable](https://lovable.dev), which defaults to a TanStack Start project structure (including SSR entry points and file-based routing) even for a single-page app. The dashboard itself is one route (`src/routes/index.tsx`); the surrounding server/router scaffolding is framework boilerplate, not additional app complexity.

## Project structure
