# Cadence

A gamified music theory study app for beginners through AP Music Theory. Learn notation, rhythm, scales, intervals, and chords through bite-sized lessons, instant feedback, and a progression system that keeps you coming back.

[See it live here](https://cadence-music-theory.vercel.app).

---

## Features

- **5 Course Topics** — Notation Basics, Rhythm & Meter, Scales & Keys, Intervals, Chords (106 questions total)
- **VexFlow Notation Rendering** — interactive staff notation for identifying notes, intervals, and chords
- **Placement Test** — adaptive difficulty assessment to recommend a starting point
- **Configurable Practice Quiz** — choose topic, question count, and time limit
- **Gamified Progression** — XP rewards, streaks, levels, badges, daily goals
- **Dark Mode** — system-aware with manual toggle, persisted across sessions
- **Offline-Ready** — all data lives in `localStorage`; no backend required
- **iOS via Capacitor** — native iOS build with Capacitor for TestFlight and App Store distribution

---

## Tech Stack

| Layer | Library |
|-------|---------|
| Framework | React 18 + Vite 5 |
| Language | TypeScript 5.5 (strict) |
| Styling | Tailwind CSS v3 |
| Routing | React Router v6 |
| Notation | VexFlow 4 |
| Animation | Framer Motion |
| Celebration | canvas-confetti |
| Deployment | Vercel |

---

## Getting Started

### Prerequisites

- Node.js 18+ (LTS recommended)
- npm 9+

### Install and Run

```bash
npm install
npm run dev
```

The dev server starts at **http://localhost:5173** with hot-module reload.

### Other Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start dev server (HMR) |
| `npm run build` | TypeScript check + production build |
| `npm run preview` | Serve the production build locally |
| `npm run lint` | ESLint check |

---

## Deploying to Vercel

### One-click (recommended)

1. Push the repo to GitHub
2. Go to [vercel.com/new](https://vercel.com/new) and import the repo
3. Vercel auto-detects Vite — no settings to change
4. Click **Deploy**

### CLI

```bash
npm i -g vercel
vercel --prod
```

The included `vercel.json` handles SPA routing (all paths rewrite to `index.html`):

```json
{
  "rewrites": [{ "source": "/(.*)", "destination": "/index.html" }]
}
```

---

## iOS Development (Capacitor)

The app is fully configured for native iOS via Capacitor. All Capacitor packages are installed and `capacitor.config.ts` is committed. The `ios/` folder is gitignored and regenerated locally.

### First-time iOS setup

```bash
# 1. Install dependencies (already done if you ran npm install)
npm install

# 2. Build web assets + add iOS platform
npm run build
npx cap add ios

# 3. Open in Xcode
npm run ios:open
# Select your Apple development team in Signing & Capabilities, then Run
```

### Ongoing development workflow

```bash
# After any code changes:
npm run ios:build   # builds Vite + syncs to Xcode project

# Then in Xcode: Cmd+R to re-run on simulator/device
```

### What's included

| Feature | Implementation |
|---------|---------------|
| Storage | `@capacitor/preferences` on native, `localStorage` on web (auto-detected) |
| Status bar | Syncs with dark mode via `@capacitor/status-bar` |
| Keyboard | `@capacitor/keyboard` — resize body on keyboard show |
| Splash screen | `@capacitor/splash-screen` — cadence purple, 2s auto-hide |
| Safe areas | CSS `env(safe-area-inset-top/bottom)` on header + bottom nav |
| Native feel | `-webkit-user-select: none`, `-webkit-touch-callout: none` |
| Viewport | `viewport-fit=cover` for edge-to-edge on notched devices |

### App icon

Source icon is at `assets/icon.svg`. To generate the 1024x1024 PNG:

```bash
node scripts/generate-icon.js

# Or use @capacitor/assets to generate all required sizes at once:
npx @capacitor/assets generate --ios
```

Then in Xcode: **Assets.xcassets -> AppIcon -> drag icon.png into the 1024x1024 slot.**

See `TESTFLIGHT.md` for the full TestFlight submission checklist.

---

## Project Structure

```
src/
├── components/
│   ├── layout/        # Layout, BottomNav
│   ├── quiz/          # QuestionCard, FeedbackPanel, StaffNotation
│   └── ui/            # Button, Card, ProgressBar, Badge, CourseCard
├── data/
│   ├── notationBasics.ts
│   ├── rhythmAndMeter.ts
│   ├── scalesAndKeys.ts
│   ├── intervals.ts
│   ├── chords.ts
│   ├── placement.ts
│   └── courses.ts
├── hooks/
│   ├── useDarkMode.ts
│   ├── useProgress.ts
│   ├── useQuiz.ts
│   └── useStorage.ts
├── pages/
│   ├── Home.tsx
│   ├── Courses.tsx
│   ├── CourseDetail.tsx
│   ├── ModuleDetail.tsx
│   ├── Lesson.tsx
│   ├── PlacementTest.tsx
│   ├── PracticeQuiz.tsx
│   ├── WeakAreas.tsx
│   └── Progress.tsx
├── types/
│   └── index.ts
└── utils/
    └── index.ts
```

---

## License

MIT

---

Built by [Sarah O'Keefe](https://github.com/sarahoke)
