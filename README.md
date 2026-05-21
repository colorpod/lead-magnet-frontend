# Lead Magnet Monitor

Internal starter dashboard for keeping tabs on the new Qazi lead magnet system.

This repo is **not** a customer-facing opt-in page and it should not show fake performance numbers. It is the visual shell for the internal monitoring dashboard.

## Current state

- Clean dashboard shell
- No mock metric numbers
- Empty states for unconnected data
- Setup checklist for the real tracking sources
- Inventory shell for lead magnets
- Backend event contract notes

## Intended real data sources

Connect only after the new lead magnet system is defined:

- Lead magnet inventory: product/offer/funnel registry
- Traffic/source events: QZD/go links or router analytics
- Opt-ins: Kit / ConvertKit forms, tags, or webhook events
- Revenue impact: Hyros / checkout attribution

## Minimum event contract

Future backend/API should normalize events like:

```json
{
  "event": "opt_in",
  "leadMagnetId": "resolve-starter-kit",
  "emailHash": "sha256-redacted",
  "source": "youtube",
  "campaign": "lead-magnet-launch",
  "createdAt": "2026-05-21T00:00:00Z"
}
```

No private customer data or API keys should live in this frontend repo.

## Local setup

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
```

Production output:

```bash
dist
```

## Live preview

```txt
https://colorpod.github.io/lead-magnet-frontend/
```
