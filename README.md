# PilotPath ✈️

A gamified, mobile-first FAA written exam prep app — think Duolingo for pilots. Study for your Private, Instrument, and Commercial certificates through bite-sized lessons, instant feedback, and an XP/streak system that keeps you coming back.

---

## Features

- **4 Courses** — Ground School, PPL, Instrument Rating, Commercial Pilot (650 questions total)
- **Gamified progression** — XP rewards, streaks, locked modules, lesson completion confetti
- **Practice tests** — timed, full-length FAA-style exams with per-topic score breakdowns
- **Weak areas tracker** — automatically surfaces topics where you miss the most questions
- **Dark mode** — system-aware with manual toggle, persisted across sessions
- **Offline-ready** — all data lives in `localStorage`; no backend required
- **Capacitor-compatible** — swap `localStorage` to Capacitor Preferences for native iOS/Android

---

## Tech Stack

| Layer | Library |
|-------|---------|
| Framework | React 18 + Vite 5 |
| Language | TypeScript 5.5 (strict) |
| Styling | Tailwind CSS v3 |
| Routing | React Router v6 |
| Animation | Framer Motion |
| Celebration | canvas-confetti |
| Deployment | Vercel |

---

## Local Development

### Prerequisites

- Node.js 18+ (LTS recommended)
- npm 9+

### Install and Run

```bash
git clone https://github.com/your-username/pilotpath.git
cd pilotpath
npm install
npm run dev
```

The dev server starts at **http://localhost:5173** with hot-module reload.

### Other Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start dev server (HMR) |
| `npm run build` | TypeScript check + production build → `dist/` |
| `npm run preview` | Serve the `dist/` build locally |
| `npm run lint` | ESLint check |

---

## Deploying to Vercel

### One-click (recommended)

1. Push the repo to GitHub
2. Go to [vercel.com/new](https://vercel.com/new) → Import the repo
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

## Wrapping for iOS with Capacitor

### 1. Install Capacitor

```bash
npm install @capacitor/core @capacitor/ios
npx cap init PilotPath com.yourcompany.pilotpath --web-dir dist
```

### 2. Add the iOS platform

```bash
npx cap add ios
```

### 3. Swap localStorage for Capacitor Preferences *(optional but recommended)*

In `src/hooks/useStorage.ts`, replace the `localStorage` calls with `@capacitor/preferences`:

```typescript
import { Preferences } from '@capacitor/preferences'

// getItem  → (await Preferences.get({ key })).value
// setItem  → await Preferences.set({ key, value })
// removeItem → await Preferences.remove({ key })
```

### 4. Build and sync

```bash
npm run build
npx cap sync
```

### 5. Open in Xcode

```bash
npx cap open ios
```

Then select your development team in **Signing & Capabilities** and hit **Run**.

---

## Project Structure

```
src/
├── components/
│   ├── layout/        # Layout, BottomNav
│   ├── quiz/          # QuestionCard, FeedbackPanel
│   └── ui/            # Button, Card, ProgressBar, Badge, CourseCard
├── data/
│   ├── groundSchool.ts   # 150 questions (5 modules)
│   ├── ppl.ts            # 200 questions (10 modules)
│   ├── ir.ts             # 160 questions (8 modules)
│   ├── cpl.ts            # 140 questions (7 modules)
│   └── courses.ts        # Assembles all courses
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
│   ├── PracticeTest.tsx
│   ├── WeakAreas.tsx
│   └── Progress.tsx
├── types/
│   └── index.ts          # Module, Lesson, Question, Course, UserProgress
└── utils/
    └── index.ts
```

---

## Adding Questions

Each question in `src/data/*.ts` follows this shape:

```typescript
{
  id: 'ppl-m1-l1-q1',          // unique: course-module-lesson-question
  topic: 'Weather',
  type: 'multiple-choice',      // or 'true-false'
  text: 'What does BKN014 mean in a METAR?',
  options: ['Broken at 1,400 ft AGL', 'Broken at 14,000 ft MSL', '…', '…'],
  correctAnswer: 0,             // 0-based index into options[]
  explanation: 'Cloud heights in METARs are reported in hundreds of feet AGL.',
  reference: 'AIM 7-1-30'
}
```

---

## License

MIT
