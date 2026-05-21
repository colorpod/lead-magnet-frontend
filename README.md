# Lead Magnet Frontend

Lightweight mobile-first frontend for a Qazi lead magnet opt-in page.

## What it includes

- Hero/value-prop section
- Email capture form UI
- Goal dropdown for lightweight segmentation
- Client-side success state
- Mobile-first responsive styling
- Optional download URL via `VITE_LEAD_MAGNET_URL`

## Local setup

```bash
npm install
npm run dev
```

Vite will print a local URL, usually:

```bash
http://127.0.0.1:5173/
```

## Configure the download button

Copy the example env file:

```bash
cp .env.example .env
```

Then set:

```bash
VITE_LEAD_MAGNET_URL=https://your-real-download-or-confirmation-url
```

## Build

```bash
npm run build
```

The static production output is generated in `dist/`.

## Deploy notes

This is a static Vite app, so it can deploy cleanly to:

- Cloudflare Pages
- Netlify
- Vercel
- Any static host serving `dist/`

Build command:

```bash
npm run build
```

Output directory:

```bash
dist
```

## Integration note

The current first version stores the submitted lead locally to power the success state. Replace the placeholder in `src/main.ts` with the approved production integration when ready:

- Kit / ConvertKit endpoint
- Tally form embed/API
- Cloudflare Worker/serverless endpoint
- Zapier webhook, if approved

Do not put private API keys in this frontend repo.
