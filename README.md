# Sogni / Blogs & Newsletters

The home for Sogni stories — tutorials, walkthroughs, and the monthly **Sogni / Sync** newsletter, all in one place.

Live at: <https://natalieart.github.io/blogs-newsletters>

## Stack

Pure static HTML — no build step.

- `index.html` — single self-contained page with inline CSS + JS
- `assets/` — favicon set, OG preview image, square video previews, showcase clips

## Local preview

```bash
# any static server works
python3 -m http.server 8000
# then open http://localhost:8000
```

## What's inside

- **Hero** — split layout with a 6-clip video showcase that auto-cycles, swipes, and pauses on hover
- **Live stats** — fetched from `api.sogni.ai/v1/analytics/lifetime` (artists, GPUs, creations)
- **Blogs** — three square cards, two with autoplay video previews
- **Newsletters** — Vol 18 & 19 of Sogni / Sync as compact cover cards
- **Footer** — closing tagline, four-column nav grid, brand-colored social pills
- **Brand** — Sogni mint `#00FF9D` against `#0a0e02`, Inter + Open Sans + Space Mono (loaded from Google Fonts)

## Deploy

GitHub Pages serves directly from the repo root on the `main` branch.

After the first push, enable Pages in **Settings → Pages → Source: `main` / `/ (root)`**.
