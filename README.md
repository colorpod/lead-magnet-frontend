# Lead Magnet Command Center

Internal dashboard UI for monitoring Qazi lead magnet performance.

This repo is **not** a customer-facing opt-in page. It is the visual dashboard shell for Waqas/Lucius to review how lead magnets are performing.

## Current dashboard sections

- Key metric cards
  - visitors
  - opt-ins
  - blended conversion rate
  - revenue influenced
- Funnel health
- Source breakdown
- Lead magnet inventory table
- Needs-attention panel
- Backend/integration notes

## Data status

Current data is seeded placeholder data for layout review only.

The intended next step is to connect this frontend to a backend/API pulling from the approved sources of truth, such as:

- Kit / ConvertKit for subscribers, forms, tags, and sequences
- QZD/go links for route/source/campaign attribution
- Hyros for downstream sales/revenue influence
- Cloudflare Worker/API for normalized dashboard endpoints

## Local setup

```bash
npm install
npm run dev
```

Local URL is usually:

```bash
http://127.0.0.1:5173/
```

## Build

```bash
npm run build
```

Production output:

```bash
dist
```

## GitHub Pages deploy

This repo deploys through `.github/workflows/deploy-pages.yml`.

Live preview:

```txt
https://colorpod.github.io/lead-magnet-frontend/
```

## Backend contract target

A future backend should expose a normalized JSON shape like:

```json
{
  "window": "last_30_days",
  "totals": {
    "visitors": 42432,
    "optIns": 6209,
    "conversionRate": 14.63,
    "revenueInfluenced": 48160
  },
  "magnets": [],
  "sources": []
}
```

Do not put private API keys in this frontend repo.
