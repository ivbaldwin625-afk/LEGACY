# NBA LEGACY V10

A lightweight, fan-made NBA encyclopedia for portfolio/resume use.

## Included
- Home / NBA history overview
- Teams directory with conference filters and team search
- Dedicated team profiles with franchise information and live roster loading
- Players database with search, filters, sorting and player categories
- Dedicated player profiles with career data when the ESPN feed is available
- Stats page with PPG, RPG, APG, SPG, BPG and FG%
- Hall of Fame legends
- Champions / Finals history
- About / league history
- Responsive mobile navigation
- Local fallback SVG assets for unavailable images

## Run
Open `index.html` directly, or use VS Code Live Server for the most reliable live-data behavior.

## Live data
Team rosters and current player data are requested from ESPN public endpoints from the browser. Internet access is required for live data. If a feed or image is unavailable, the site falls back gracefully.

## Structure
```text
NBA-Legacy-V10-Final/
├── index.html
├── style.css
├── app.js
├── README.md
└── assets/
    ├── player-placeholder.svg
    └── team-placeholder.svg
```
