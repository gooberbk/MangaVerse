---
name: testing-mangaverse
description: Test the MangaVerse Next.js app end-to-end. Use when verifying UI changes, new pages, or visual polish.
---

# Testing MangaVerse

## Local Dev Setup

1. `cd /home/ubuntu/repos/MangaVerse`
2. `npm install`
3. `npx next dev -p 3000` (or `npm run dev`)
4. App runs at `http://localhost:3000`

## Key Routes

| Route | Description |
|-------|-------------|
| `/` | Homepage — hero, trending, latest, genres, popular |
| `/browse` | Browse/catalog with filters |
| `/library` | User library (mock data) |
| `/account` | Account/profile settings page |
| `/login` | Login form |
| `/register` | Registration form |
| `/manga/[slug]` | Manga detail page |
| `/manga/[slug]/chapter/[num]` | Reader page |
| `/genres` | Genre listing |
| `/latest` | Latest updates |
| `/popular` | Popular ranking |

## Build & Lint

- `npm run build` — Next.js production build (must pass before PR)
- `npm run lint` — ESLint check
- No CI is configured on the repo; rely on local build/lint checks.

## Tech Stack

- Next.js 15 (App Router)
- React 19
- Tailwind CSS v4 (with `@import "tailwindcss"` and `@theme` block in `globals.css`)
- TypeScript (strict mode)
- No backend/database — all mock data in `lib/mock/`

## Design System Notes

- Dark theme with glassmorphism: `glass` utility = `border-white/10 bg-white/5 backdrop-blur-xl`
- `glass-panel` utility = gradient border via `::before` pseudo + box-shadow (used on account page panels)
- Color tokens: `accent-purple`, `accent-pink`, `accent-red`, `accent-blue`, `accent-electric`
- Custom utilities defined in `app/globals.css` under `@layer utilities`
- Tailwind v4 note: `@apply` cannot reference custom utility classes defined in the same `@layer utilities` block. Inline the styles directly instead.

## Testing Tips

- The app is UI-only with mock data — no auth or backend needed for testing.
- For visual testing, focus on: gradient borders, glow accents, glassmorphism panels, responsive layout.
- Select dropdowns use `select-premium` class with `appearance: none` + custom SVG chevron. Verify they don't show browser default styling.
- Toggle switches use gradient backgrounds when active (purple→pink).
- Account page interactive elements to test: Save Changes (shows success toast for 3s), Delete Account (shows confirmation panel, Cancel returns to default).
- SiteHeader has both desktop nav (Library, Account links) and mobile hamburger menu.

## Devin Secrets Needed

None — the app runs entirely with mock data and no external services.
