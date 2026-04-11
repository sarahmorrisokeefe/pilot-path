# Cadence Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Transform the PilotPath aviation study app into Cadence, a music theory learning app with VexFlow notation rendering, 5 topic courses, a configurable practice quiz, placement test, and gamification system.

**Architecture:** Reuse existing React + Vite + TypeScript + Tailwind + Supabase + Capacitor infrastructure. Replace all aviation content and branding. Add VexFlow as a lazy-loaded dependency for music notation. Extend the type system for staff-based questions and gamification features. Keep the Course > Module > Lesson > Question hierarchy.

**Tech Stack:** React 18, Vite 5, TypeScript, Tailwind CSS 3, Supabase, Capacitor 8, VexFlow 4, Framer Motion

**Spec:** `docs/superpowers/specs/2026-04-10-cadence-design.md`

---

## File Structure

### Files to Delete
- `src/data/ppl.ts`
- `src/data/groundSchool.ts`
- `src/data/ir.ts`
- `src/data/cpl.ts`
- `src/utils/referenceLinks.ts`
- `src/components/ui/ReferenceLink.tsx`

### Files to Create
- `src/components/music/StaffNotation.tsx` — VexFlow wrapper, renders notes on a staff
- `src/components/music/ChordDiagram.tsx` — Renders chord (stacked notes) via StaffNotation
- `src/components/music/IntervalDiagram.tsx` — Renders two notes showing an interval
- `src/components/music/KeySignatureDisplay.tsx` — Renders a key signature on a staff
- `src/components/music/ScaleDisplay.tsx` — Renders ascending/descending scale
- `src/data/notationBasics.ts` — Course 1 content: clefs, note names, accidentals
- `src/data/rhythmAndMeter.ts` — Course 2 content: note values, time signatures, dots/ties
- `src/data/scalesAndKeys.ts` — Course 3 content: major scales, minor scales, key signatures
- `src/data/intervals.ts` — Course 4 content: half/whole steps, interval quality, inversion
- `src/data/chords.ts` — Course 5 content: triads, inversions, seventh chords
- `src/data/placementTest.ts` — Curated placement test question pool
- `src/pages/PlacementTest.tsx` — Adaptive placement test page
- `src/hooks/usePlacement.ts` — Placement test state management

### Files to Modify (grouped by task)
- `tailwind.config.js` — Replace sky palette with Cadence custom colors
- `src/index.css` — Update body background classes
- `index.html` — Update meta tags, title, theme color
- `capacitor.config.ts` — Update app name, ID, colors
- `public/favicon.svg` — Replace airplane with music note
- `package.json` — Rename package, add vexflow dependency
- `vite.config.ts` — Add vexflow to manualChunks
- `src/types/index.ts` — Extend Question, add StaffConfig, PlacementResult, badges
- `src/hooks/useProgress.ts` — Change storage key, add daily goal, badges, level
- `src/hooks/useDarkMode.ts` — Change storage key
- `src/lib/supabase.ts` — Update console warning text
- `src/App.tsx` — Add placement route, update StatusBar colors
- `src/components/layout/Layout.tsx` — Rebrand header, update colors
- `src/components/layout/BottomNav.tsx` — New tab labels, icons, paths, colors
- `src/components/ui/Button.tsx` — Replace sky classes with Cadence palette
- `src/components/ui/Badge.tsx` — Replace sky classes
- `src/components/ui/ProgressBar.tsx` — Replace sky classes
- `src/components/ui/Card.tsx` — No aviation references but verify
- `src/components/dashboard/CourseCard.tsx` — Update colors
- `src/components/quiz/QuestionCard.tsx` — Replace sky classes, add VexFlow rendering
- `src/components/quiz/StudyCard.tsx` — Replace sky classes, add VexFlow rendering, remove ReferenceLink
- `src/components/quiz/FeedbackPanel.tsx` — Replace sky classes
- `src/pages/Home.tsx` — Rebrand, redesign as discovery-first, add daily goal
- `src/pages/Courses.tsx` — Rename route to /learn, update colors
- `src/pages/CourseDetail.tsx` — Update colors, remove module locking
- `src/pages/ModuleDetail.tsx` — Update colors, add mastery display
- `src/pages/Lesson.tsx` — Update colors, confetti colors, remove ReferenceLink
- `src/pages/PracticeTest.tsx` — Redesign as configurable quiz builder
- `src/pages/WeakAreas.tsx` — Rename to Review, update colors
- `src/pages/Progress.tsx` — Update colors, add badges/level display
- `src/pages/Auth.tsx` — Rebrand
- `src/pages/Settings.tsx` — Remove FAA links, add music resources, daily goal config
- `src/data/courses.ts` — Replace aviation courses with music theory courses
- `src/utils/index.ts` — Remove module locking logic, remove referenceLink imports
- `README.md` — Update for Cadence
- `TESTFLIGHT.md` — Update app name and bundle ID references

---

## Task 1: Tailwind Config and CSS Foundation

**Files:**
- Modify: `tailwind.config.js`
- Modify: `src/index.css`

- [ ] **Step 1: Replace sky palette with Cadence custom colors in tailwind.config.js**

Replace the entire `colors` object in `tailwind.config.js:10-22`:

```javascript
colors: {
  cadence: {
    50: '#eef0ff',
    100: '#dfe2ff',
    200: '#c6caff',
    300: '#a5b4fc',
    400: '#7c85e8',
    500: '#5558c8',
    600: '#3d4280',
    700: '#3d4280',
    800: '#2d3161',
    900: '#1e2147',
    950: '#0d0f1f',
  },
  copper: {
    300: '#eac9a8',
    400: '#e0b08a',
    500: '#d4956b',
    600: '#c07a4e',
    700: '#a66339',
  },
},
```

- [ ] **Step 2: Update body background in src/index.css**

Replace line 12 in `src/index.css`:
```css
@apply bg-[#f5f3ff] dark:bg-[#0d0f1f] text-slate-900 dark:text-slate-100;
```

- [ ] **Step 3: Verify Tailwind compiles with new config**

Run: `npx tailwindcss --content './src/**/*.tsx' --output /dev/null`
Expected: No errors

- [ ] **Step 4: Commit**

```bash
git add tailwind.config.js src/index.css
git commit -m "feat(cadence): replace sky palette with Cadence indigo+copper color system"
```

---

## Task 2: HTML Meta, Favicon, and Package Config

**Files:**
- Modify: `index.html`
- Modify: `public/favicon.svg`
- Modify: `package.json`
- Modify: `capacitor.config.ts`
- Modify: `src/lib/supabase.ts`

- [ ] **Step 1: Update index.html meta tags**

In `index.html`, make these changes:
- Line 7: change `content="#0ea5e9"` to `content="#2d3161"`
- Line 8: remove or keep apple-mobile-web-app-capable (keep)
- Line 9: keep apple-mobile-web-app-status-bar-style
- Line 10: change `content="PilotPath"` to `content="Cadence"`
- Line 11: change `content` to `"Master music theory with Cadence — the gamified study app for beginners through AP Music Theory."`
- Line 15: change `<title>PilotPath ✈️</title>` to `<title>Cadence</title>`

- [ ] **Step 2: Replace favicon.svg**

Replace `public/favicon.svg` with:
```svg
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
  <rect width="100" height="100" rx="20" fill="#2d3161"/>
  <text x="50" y="68" text-anchor="middle" font-size="55" fill="#d4956b">♩</text>
</svg>
```

- [ ] **Step 3: Update package.json name**

Change `"name": "pilotpath"` to `"name": "cadence"` on line 2.

- [ ] **Step 4: Update capacitor.config.ts**

- `appId`: `'com.sarahoke.cadence'`
- `appName`: `'Cadence'`
- `SplashScreen.backgroundColor`: `'#2d3161'`
- `StatusBar.backgroundColor`: `'#2d3161'`

- [ ] **Step 5: Update supabase.ts console warning**

In `src/lib/supabase.ts`, change `'[PilotPath]'` to `'[Cadence]'` in the console.warn string.

- [ ] **Step 6: Commit**

```bash
git add index.html public/favicon.svg package.json capacitor.config.ts src/lib/supabase.ts
git commit -m "feat(cadence): update meta tags, favicon, package name, and Capacitor config"
```

---

## Task 3: Layout and Navigation Rebrand

**Files:**
- Modify: `src/components/layout/Layout.tsx`
- Modify: `src/components/layout/BottomNav.tsx`

- [ ] **Step 1: Rebrand Layout.tsx header and colors**

In `src/components/layout/Layout.tsx`:

Replace line 20 `bg-sky-50` with `bg-[#f5f3ff]` and add `dark:bg-[#0d0f1f]`:
```tsx
<div className="min-h-screen bg-[#f5f3ff] dark:bg-[#0d0f1f] flex flex-col">
```

Replace lines 41-46 (the logo section):
```tsx
<div className="flex items-center gap-2">
  <span className="text-2xl text-copper-500">♩</span>
  <span className="font-black text-xl text-cadence-800 dark:text-cadence-300 tracking-tight">
    Cadence
  </span>
</div>
```

Replace all `sky-500` with `cadence-800`, `sky-600` with `cadence-700`, `sky-700` with `cadence-800`, `sky-400` with `cadence-300` throughout the file. Specifically:
- Line 55: Sign In button `bg-sky-500 hover:bg-sky-600 active:bg-sky-700` → `bg-cadence-800 hover:bg-cadence-700 active:bg-cadence-600`
- Line 66: Avatar `bg-sky-500` → `bg-cadence-800`, `hover:bg-sky-600` → `hover:bg-cadence-700`
- Lines 120-129: Footer links `text-sky-500 dark:text-sky-400 hover:text-sky-700 dark:hover:text-sky-600` → `text-cadence-800 dark:text-cadence-300 hover:text-cadence-600 dark:hover:text-cadence-400`

- [ ] **Step 2: Update BottomNav.tsx tabs and colors**

Replace the `tabs` array (lines 3-9) with:
```tsx
const tabs = [
  { id: 'home', label: 'Home', icon: '🏠', path: '/' },
  { id: 'learn', label: 'Learn', icon: '📚', path: '/learn' },
  { id: 'practice', label: 'Practice', icon: '🎯', path: '/practice' },
  { id: 'review', label: 'Review', icon: '🔄', path: '/review' },
  { id: 'progress', label: 'Progress', icon: '📊', path: '/progress' },
] as const
```

Replace all `sky-500` and `sky-400` color references:
- Line 35: `text-sky-500 dark:text-sky-400` → `text-cadence-800 dark:text-cadence-300`
- Line 49: `bg-sky-500 dark:bg-sky-400` → `bg-cadence-800 dark:bg-cadence-300`

- [ ] **Step 3: Build and verify no errors**

Run: `npm run build`
Expected: Build succeeds with no TypeScript errors

- [ ] **Step 4: Commit**

```bash
git add src/components/layout/Layout.tsx src/components/layout/BottomNav.tsx
git commit -m "feat(cadence): rebrand header, footer, and bottom nav"
```

---

## Task 4: UI Components Color Swap

**Files:**
- Modify: `src/components/ui/Button.tsx`
- Modify: `src/components/ui/Badge.tsx`
- Modify: `src/components/ui/ProgressBar.tsx`
- Modify: `src/components/ui/Card.tsx`
- Modify: `src/components/dashboard/CourseCard.tsx`

- [ ] **Step 1: Update Button.tsx**

In `src/components/ui/Button.tsx`, replace the primary variant (line 13):
```tsx
primary:
  'bg-cadence-800 hover:bg-cadence-700 active:bg-cadence-600 text-white shadow-sm shadow-cadence-200 dark:shadow-cadence-900/40',
```

Replace focus ring (line 47):
```tsx
focus:outline-none focus:ring-2 focus:ring-cadence-400 focus:ring-offset-2
```

- [ ] **Step 2: Update Badge.tsx**

In `src/components/ui/Badge.tsx`, find the `sky` variant and replace with a `cadence` variant using `bg-cadence-100 text-cadence-800 dark:bg-cadence-900/30 dark:text-cadence-300`.

- [ ] **Step 3: Update ProgressBar.tsx**

In `src/components/ui/ProgressBar.tsx`, replace the default sky color (line 11) with `bg-cadence-800 dark:bg-cadence-400`.

- [ ] **Step 4: Update CourseCard.tsx**

In `src/components/dashboard/CourseCard.tsx`, replace any `sky-*` classes with their `cadence-*` equivalents.

- [ ] **Step 5: Build and verify**

Run: `npm run build`
Expected: No errors

- [ ] **Step 6: Commit**

```bash
git add src/components/ui/Button.tsx src/components/ui/Badge.tsx src/components/ui/ProgressBar.tsx src/components/ui/Card.tsx src/components/dashboard/CourseCard.tsx
git commit -m "feat(cadence): update UI component colors to Cadence palette"
```

---

## Task 5: Quiz Components Color Swap + Remove ReferenceLink

**Files:**
- Modify: `src/components/quiz/QuestionCard.tsx`
- Modify: `src/components/quiz/StudyCard.tsx`
- Modify: `src/components/quiz/FeedbackPanel.tsx`
- Delete: `src/components/ui/ReferenceLink.tsx`
- Delete: `src/utils/referenceLinks.ts`

- [ ] **Step 1: Update QuestionCard.tsx colors**

Replace all `sky-*` classes with `cadence-*` equivalents:
- Selected option border/bg: `border-sky-500 bg-sky-50` → `border-cadence-800 bg-cadence-50`
- Any `sky-*` text colors → `cadence-800` (light) / `cadence-300` (dark)

- [ ] **Step 2: Update StudyCard.tsx colors and remove ReferenceLink import**

Remove the `ReferenceLink` import and any `<ReferenceLink>` usage. Replace `sky-*` classes with `cadence-*`.

- [ ] **Step 3: Update FeedbackPanel.tsx colors**

Replace `sky-*` → `cadence-*` in all color classes.

- [ ] **Step 4: Delete ReferenceLink.tsx and referenceLinks.ts**

```bash
rm src/components/ui/ReferenceLink.tsx src/utils/referenceLinks.ts
```

- [ ] **Step 5: Remove referenceLinks import from src/utils/index.ts if present**

Check `src/utils/index.ts` for any re-export of `referenceLinks` and remove it.

- [ ] **Step 6: Build and verify**

Run: `npm run build`
Expected: No errors (no remaining imports of deleted files)

- [ ] **Step 7: Commit**

```bash
git add -A
git commit -m "feat(cadence): update quiz component colors, remove FAA reference links"
```

---

## Task 6: Page Rebrand — Auth, Settings, Lesson

**Files:**
- Modify: `src/pages/Auth.tsx`
- Modify: `src/pages/Settings.tsx`
- Modify: `src/pages/Lesson.tsx`

- [ ] **Step 1: Rebrand Auth.tsx**

- Replace `PilotPath` text with `Cadence`
- Replace airplane emoji with music note `♩`
- Replace all `sky-*` classes with `cadence-*`

- [ ] **Step 2: Update Settings.tsx**

- Remove FAA Website and FAA Handbooks links
- Add: `{ label: 'musictheory.net', url: 'https://www.musictheory.net/' }` and `{ label: 'AP Music Theory', url: 'https://apcentral.collegeboard.org/courses/ap-music-theory' }`
- Replace all `sky-*` classes with `cadence-*`
- Update app version display from PilotPath to Cadence

- [ ] **Step 3: Update Lesson.tsx**

- Replace confetti color `#0ea5e9` with `#2d3161` (line 73 and line 153)
- Replace `sky-*` classes with `cadence-*`
- Remove any `ReferenceLink` import/usage if present

- [ ] **Step 4: Build and verify**

Run: `npm run build`
Expected: No errors

- [ ] **Step 5: Commit**

```bash
git add src/pages/Auth.tsx src/pages/Settings.tsx src/pages/Lesson.tsx
git commit -m "feat(cadence): rebrand Auth, Settings, and Lesson pages"
```

---

## Task 7: Types Extension

**Files:**
- Modify: `src/types/index.ts`

- [ ] **Step 1: Extend QuestionType and add StaffConfig**

Add to `src/types/index.ts` after line 3:

```typescript
export type QuestionType = 'multiple-choice' | 'true-false' | 'staff-identify' | 'staff-select'

export interface NoteSpec {
  keys: string[]         // VexFlow format: e.g., ['c/4'], ['e/4', 'g/4', 'b/4'] for chord
  duration: string       // e.g., 'q' (quarter), 'h' (half), 'w' (whole)
  accidental?: string    // e.g., '#', 'b', 'n'
}

export interface StaffConfig {
  notes: NoteSpec[]
  clef: 'treble' | 'bass' | 'alto' | 'tenor'
  keySignature?: string
  timeSignature?: string
  width?: number
  height?: number
  showLabels?: boolean
}

export type DiagramType = 'chord' | 'interval' | 'scale' | 'key-signature' | 'notation'
```

- [ ] **Step 2: Extend Question interface**

Add optional fields to `Question` (after line 13):
```typescript
staffConfig?: StaffConfig
diagramType?: DiagramType
difficulty?: number  // 1-5, used by placement test
```

- [ ] **Step 3: Extend LessonSlide with staffConfig**

Add to `LessonSlide` interface (after line 22):
```typescript
staffConfig?: StaffConfig
diagramType?: DiagramType
```

- [ ] **Step 4: Add PlacementResult and badge types**

Add after the `UserProgress` interface:

```typescript
export interface PlacementResult {
  completedAt: string
  score: number
  recommendedCourseIndex: number
  skillLevel: number // 1-5
}

export type BadgeId =
  | 'first-steps'
  | 'note-reader'
  | 'rhythm-keeper'
  | 'scale-master'
  | 'interval-pro'
  | 'chord-builder'
  | 'perfect-score'
  | 'week-warrior'
  | 'dedicated'
  | 'century'
  | 'scholar'

export interface Badge {
  id: BadgeId
  name: string
  description: string
  icon: string
  earnedAt?: string
}
```

- [ ] **Step 5: Extend UserProgress**

Add to `UserProgress` interface:
```typescript
placementResult?: PlacementResult
badges: BadgeId[]
dailyGoal: number            // quizzes per day (1, 3, or 5)
dailyGoalProgress: number    // quizzes completed today
dailyGoalDate: string | null // ISO date for today tracking
level: number
```

- [ ] **Step 6: Update TabId type**

Replace line 117:
```typescript
export type TabId = 'home' | 'learn' | 'practice' | 'review' | 'progress'
```

- [ ] **Step 7: Build and verify types compile**

Run: `npm run build`
Expected: Type errors in files that reference old types (expected at this stage — `useProgress.ts` will need updating). Fix any blocking errors.

- [ ] **Step 8: Commit**

```bash
git add src/types/index.ts
git commit -m "feat(cadence): extend type system for staff notation, badges, placement, and daily goals"
```

---

## Task 8: Storage Keys and Progress Hook Updates

**Files:**
- Modify: `src/hooks/useProgress.ts`
- Modify: `src/hooks/useDarkMode.ts`

- [ ] **Step 1: Update storage keys**

In `src/hooks/useProgress.ts`, change line 45:
```typescript
const PROGRESS_KEY = 'cadence_progress'
```

In `src/hooks/useDarkMode.ts`, change the key from `'pilotpath_theme'` to `'cadence_theme'`.

- [ ] **Step 2: Update defaultProgress to include new fields**

In `src/hooks/useProgress.ts`, update `defaultProgress`:
```typescript
const defaultProgress: UserProgress = {
  courses: {},
  weakAreas: {},
  testResults: [],
  totalXP: 0,
  streak: {
    current: 0,
    longest: 0,
    lastStudied: null,
  },
  lastActivity: null,
  badges: [],
  dailyGoal: 3,
  dailyGoalProgress: 0,
  dailyGoalDate: null,
  level: 1,
}
```

- [ ] **Step 3: Add level calculation helper**

Add before `useProgress()`:
```typescript
function calculateLevel(totalXP: number): number {
  const thresholds = [0, 50, 150, 300, 500, 800, 1200, 1800, 2500, 3500]
  for (let i = thresholds.length - 1; i >= 0; i--) {
    if (totalXP >= thresholds[i]) return i + 1
  }
  return 1
}
```

- [ ] **Step 4: Update completeLesson to track daily goal and level**

In the `completeLesson` callback, add daily goal tracking in the return object (inside the `setProgress` callback, before the final return):

```typescript
const today = getTodayDateString()
const dailyGoalDate = prev.dailyGoalDate === today ? prev.dailyGoalDate : today
const dailyGoalProgress = prev.dailyGoalDate === today ? prev.dailyGoalProgress + 1 : 1
const newTotalXP = prev.totalXP + (alreadyCompleted ? 0 : xpEarned)
// Bonus XP if daily goal just hit
const dailyGoalBonus = (dailyGoalProgress === prev.dailyGoal && prev.dailyGoalProgress < prev.dailyGoal) ? 15 : 0

return {
  ...prev,
  // ... existing fields ...
  totalXP: newTotalXP + dailyGoalBonus,
  dailyGoalProgress,
  dailyGoalDate,
  level: calculateLevel(newTotalXP + dailyGoalBonus),
}
```

- [ ] **Step 5: Build and verify**

Run: `npm run build`
Expected: No errors

- [ ] **Step 6: Commit**

```bash
git add src/hooks/useProgress.ts src/hooks/useDarkMode.ts
git commit -m "feat(cadence): update storage keys, add daily goal tracking and level system"
```

---

## Task 9: Routing Updates

**Files:**
- Modify: `src/App.tsx`
- Modify: `src/pages/Home.tsx`

- [ ] **Step 1: Update routes in App.tsx**

In `src/App.tsx`, update the Routes:
- Change `<Route path="/courses" ...>` to `<Route path="/learn" ...>` (keep component as `Courses`)
- Change `<Route path="/courses/:courseId" ...>` to `<Route path="/learn/:courseId" ...>`
- Change `<Route path="/courses/:courseId/modules/:moduleId" ...>` to `<Route path="/learn/:courseId/modules/:moduleId" ...>`
- Change `<Route path="/courses/:courseId/modules/:moduleId/lessons/:lessonId" ...>` to `<Route path="/learn/:courseId/modules/:moduleId/lessons/:lessonId" ...>`
- Change `<Route path="/weak-areas" ...>` to `<Route path="/review" ...>`
- Add: `<Route path="/placement" element={<PlacementTest />} />`  (import can be a placeholder that redirects to / for now)

- [ ] **Step 2: Update navigate paths in Home.tsx**

In `src/pages/Home.tsx`:
- Line 79: change `/courses/` to `/learn/`
- Line 116: change `/weak-areas` to `/review`
- Line 146: change `/courses` to `/learn`

Also replace all `sky-*` classes with `cadence-*` (this is the full Home rebrand):
- Line 47: `from-sky-500 to-blue-600` → `from-cadence-800 to-cadence-600`
- Line 50: `text-sky-100` → `text-cadence-300`
- Line 54: `text-sky-100` → `text-cadence-300`
- Line 57: `text-sky-200` → `text-cadence-400`
- Line 62: `bg-sky-300` → `bg-cadence-400`
- Line 63: `text-sky-100` → `text-cadence-300`
- Line 82-83: `border-sky-200 dark:border-sky-800 bg-sky-50 dark:bg-sky-900/20` → `border-cadence-200 dark:border-cadence-800 bg-cadence-50 dark:bg-cadence-900/20`
- Line 99: `text-sky-500 dark:text-sky-400` → `text-cadence-800 dark:text-cadence-300`
- Line 147: `text-sky-500` → `text-cadence-800`
- Line 170: `bg-sky-500` → `bg-cadence-800`

- [ ] **Step 3: Update navigate paths in any other pages referencing old routes**

Search all pages for `/courses/` and `/weak-areas` paths and update to `/learn/` and `/review`. Key files: `CourseDetail.tsx`, `ModuleDetail.tsx`, `Courses.tsx`.

- [ ] **Step 4: Build and verify**

Run: `npm run build`
Expected: No errors

- [ ] **Step 5: Commit**

```bash
git add -A
git commit -m "feat(cadence): update routing (/learn, /review, /placement) and rebrand Home page"
```

---

## Task 10: Remaining Page Color Swaps

**Files:**
- Modify: `src/pages/Courses.tsx`
- Modify: `src/pages/CourseDetail.tsx`
- Modify: `src/pages/ModuleDetail.tsx`
- Modify: `src/pages/PracticeTest.tsx`
- Modify: `src/pages/WeakAreas.tsx`
- Modify: `src/pages/Progress.tsx`

- [ ] **Step 1: Replace all sky-* classes in each page**

For each file, replace every instance of `sky-` Tailwind classes with the appropriate `cadence-` equivalent. Replace `#0ea5e9` hex references with `#2d3161`. Replace any remaining aviation copy (e.g., "FAA-Style Practice Test" → "Practice Quiz", "Full FAA written test" → "Music Theory Quiz").

- [ ] **Step 2: Update PracticeTest.tsx aviation copy**

- Replace "Full FAA-Style Practice Test" with "Practice Quiz"
- Replace airplane emoji `✈️` with `🎯`
- Replace any FAA references in description text

- [ ] **Step 3: Build and verify**

Run: `npm run build`
Expected: No errors

- [ ] **Step 4: Full text search for remaining aviation references**

Run: `grep -ri "pilot\|aviation\|faa\|airplane\|✈\|flight\|airspace\|pilotpath" src/`
Expected: No matches (except possibly import paths or git-ignored files)

- [ ] **Step 5: Commit**

```bash
git add -A
git commit -m "feat(cadence): complete color swap and aviation copy removal across all pages"
```

---

## Task 11: Delete Aviation Content, Create Course Structure

**Files:**
- Delete: `src/data/ppl.ts`, `src/data/groundSchool.ts`, `src/data/ir.ts`, `src/data/cpl.ts`
- Modify: `src/data/courses.ts`

- [ ] **Step 1: Delete aviation data files**

```bash
rm src/data/ppl.ts src/data/groundSchool.ts src/data/ir.ts src/data/cpl.ts
```

- [ ] **Step 2: Rewrite courses.ts with music theory course structure**

Replace entire `src/data/courses.ts` with the 5 music theory courses. Each course imports its modules from the corresponding data file (which will be created in subsequent tasks). For now, create the structure with empty module arrays that will be populated:

```typescript
import type { Course } from '../types'

// Module imports will be added as content tasks are completed
// import { notationBasicsModules } from './notationBasics'
// import { rhythmAndMeterModules } from './rhythmAndMeter'
// import { scalesAndKeysModules } from './scalesAndKeys'
// import { intervalsModules } from './intervals'
// import { chordsModules } from './chords'

export const COURSES: Course[] = [
  {
    id: 'notation-basics',
    title: 'Notation Basics',
    shortTitle: 'Notation',
    description: 'Learn to read the staff, identify clefs, and understand accidentals.',
    icon: '🎼',
    color: 'cadence-800',
    bgGradient: 'bg-gradient-to-br from-cadence-800 to-cadence-600',
    modules: [], // notationBasicsModules
    testConfig: { questionCount: 15, timeLimit: 10, passingScore: 70 },
  },
  {
    id: 'rhythm-and-meter',
    title: 'Rhythm & Meter',
    shortTitle: 'Rhythm',
    description: 'Master note values, time signatures, and rhythmic patterns.',
    icon: '🥁',
    color: 'copper-500',
    bgGradient: 'bg-gradient-to-br from-copper-500 to-copper-700',
    modules: [], // rhythmAndMeterModules
    testConfig: { questionCount: 15, timeLimit: 10, passingScore: 70 },
  },
  {
    id: 'scales-and-keys',
    title: 'Scales & Keys',
    shortTitle: 'Scales',
    description: 'Explore major and minor scales, key signatures, and the circle of fifths.',
    icon: '🎹',
    color: 'cadence-600',
    bgGradient: 'bg-gradient-to-br from-cadence-600 to-cadence-800',
    modules: [], // scalesAndKeysModules
    testConfig: { questionCount: 20, timeLimit: 15, passingScore: 70 },
  },
  {
    id: 'intervals',
    title: 'Intervals',
    shortTitle: 'Intervals',
    description: 'Identify and construct intervals — the building blocks of harmony.',
    icon: '📏',
    color: 'copper-600',
    bgGradient: 'bg-gradient-to-br from-copper-600 to-copper-500',
    modules: [], // intervalsModules
    testConfig: { questionCount: 20, timeLimit: 15, passingScore: 70 },
  },
  {
    id: 'chords',
    title: 'Chords',
    shortTitle: 'Chords',
    description: 'Build and identify triads, inversions, and seventh chords.',
    icon: '🎸',
    color: 'cadence-700',
    bgGradient: 'bg-gradient-to-br from-cadence-700 to-cadence-900',
    modules: [], // chordsModules
    testConfig: { questionCount: 20, timeLimit: 15, passingScore: 70 },
  },
]
```

- [ ] **Step 3: Build to verify structure compiles**

Run: `npm run build`
Expected: May have errors from files importing deleted data. Fix any remaining imports of ppl/groundSchool/ir/cpl.

- [ ] **Step 4: Commit**

```bash
git add -A
git commit -m "feat(cadence): replace aviation courses with music theory course structure"
```

---

## Task 12: Install VexFlow and Create StaffNotation Component

**Files:**
- Modify: `package.json` (via npm install)
- Modify: `vite.config.ts`
- Create: `src/components/music/StaffNotation.tsx`

- [ ] **Step 1: Install VexFlow**

```bash
npm install vexflow
```

- [ ] **Step 2: Add vexflow to manualChunks in vite.config.ts**

In `vite.config.ts`, add to `manualChunks` (line 13):
```typescript
manualChunks: {
  vendor: ['react', 'react-dom', 'react-router-dom'],
  motion: ['framer-motion'],
  supabase: ['@supabase/supabase-js'],
  vexflow: ['vexflow'],
},
```

- [ ] **Step 3: Create StaffNotation.tsx**

Create `src/components/music/StaffNotation.tsx`:

```tsx
import { useRef, useEffect } from 'react'
import { Renderer, Stave, StaveNote, Voice, Formatter, Accidental } from 'vexflow'
import type { StaffConfig } from '../../types'
import { useDarkMode } from '../../hooks/useDarkMode'

interface StaffNotationProps extends StaffConfig {
  className?: string
}

export function StaffNotation({
  notes,
  clef = 'treble',
  keySignature,
  timeSignature,
  width = 300,
  height = 150,
  showLabels = false,
  className = '',
}: StaffNotationProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const { isDark } = useDarkMode()

  useEffect(() => {
    if (!containerRef.current) return

    // Clear previous render
    containerRef.current.innerHTML = ''

    const renderer = new Renderer(containerRef.current, Renderer.Backends.SVG)
    renderer.resize(width, height)
    const context = renderer.getContext()

    // Dark mode colors
    const color = isDark ? '#e2e8f0' : '#1e293b'
    context.setFillStyle(color)
    context.setStrokeStyle(color)

    const stave = new Stave(10, 20, width - 20)
    stave.addClef(clef)
    if (keySignature) stave.addKeySignature(keySignature)
    if (timeSignature) stave.addTimeSignature(timeSignature)
    stave.setStyle({ strokeStyle: color, fillStyle: color })
    stave.setContext(context).draw()

    if (notes.length === 0) return

    const staveNotes = notes.map((note) => {
      const staveNote = new StaveNote({
        keys: note.keys,
        duration: note.duration,
        clef,
      })
      staveNote.setStyle({ strokeStyle: color, fillStyle: color })

      if (note.accidental) {
        staveNote.addModifier(new Accidental(note.accidental), 0)
      }

      return staveNote
    })

    const voice = new Voice({ num_beats: 4, beat_value: 4 }).setStrict(false)
    voice.addTickables(staveNotes)

    new Formatter().joinVoices([voice]).format([voice], width - 60)
    voice.draw(context, stave)

    // Apply color to all SVG elements for dark mode
    const svg = containerRef.current.querySelector('svg')
    if (svg) {
      svg.querySelectorAll('*').forEach((el) => {
        const element = el as SVGElement
        if (element.getAttribute('stroke') && element.getAttribute('stroke') !== 'none') {
          element.setAttribute('stroke', color)
        }
        if (element.getAttribute('fill') && element.getAttribute('fill') !== 'none') {
          element.setAttribute('fill', color)
        }
      })
    }
  }, [notes, clef, keySignature, timeSignature, width, height, isDark])

  return <div ref={containerRef} className={className} />
}
```

- [ ] **Step 4: Build and verify VexFlow renders**

Run: `npm run build`
Expected: No errors. VexFlow in its own chunk.

- [ ] **Step 5: Commit**

```bash
git add package.json package-lock.json vite.config.ts src/components/music/StaffNotation.tsx
git commit -m "feat(cadence): install VexFlow and create StaffNotation component"
```

---

## Task 13: Additional Music Notation Components

**Files:**
- Create: `src/components/music/ChordDiagram.tsx`
- Create: `src/components/music/IntervalDiagram.tsx`
- Create: `src/components/music/KeySignatureDisplay.tsx`
- Create: `src/components/music/ScaleDisplay.tsx`

- [ ] **Step 1: Create ChordDiagram.tsx**

```tsx
import { StaffNotation } from './StaffNotation'
import type { NoteSpec } from '../../types'

interface ChordDiagramProps {
  keys: string[]      // e.g., ['c/4', 'e/4', 'g/4']
  clef?: 'treble' | 'bass' | 'alto' | 'tenor'
  label?: string
  width?: number
  height?: number
  className?: string
}

export function ChordDiagram({
  keys,
  clef = 'treble',
  label,
  width = 200,
  height = 150,
  className = '',
}: ChordDiagramProps) {
  const note: NoteSpec = { keys, duration: 'w' }

  return (
    <div className={`flex flex-col items-center ${className}`}>
      <StaffNotation notes={[note]} clef={clef} width={width} height={height} />
      {label && (
        <p className="text-sm font-medium text-slate-600 dark:text-slate-400 mt-1">{label}</p>
      )}
    </div>
  )
}
```

- [ ] **Step 2: Create IntervalDiagram.tsx**

```tsx
import { StaffNotation } from './StaffNotation'
import type { NoteSpec } from '../../types'

interface IntervalDiagramProps {
  lowNote: string   // e.g., 'c/4'
  highNote: string  // e.g., 'e/4'
  clef?: 'treble' | 'bass' | 'alto' | 'tenor'
  label?: string
  width?: number
  height?: number
  className?: string
}

export function IntervalDiagram({
  lowNote,
  highNote,
  clef = 'treble',
  label,
  width = 250,
  height = 150,
  className = '',
}: IntervalDiagramProps) {
  const notes: NoteSpec[] = [
    { keys: [lowNote], duration: 'h' },
    { keys: [highNote], duration: 'h' },
  ]

  return (
    <div className={`flex flex-col items-center ${className}`}>
      <StaffNotation notes={notes} clef={clef} width={width} height={height} />
      {label && (
        <p className="text-sm font-medium text-slate-600 dark:text-slate-400 mt-1">{label}</p>
      )}
    </div>
  )
}
```

- [ ] **Step 3: Create KeySignatureDisplay.tsx**

```tsx
import { StaffNotation } from './StaffNotation'

interface KeySignatureDisplayProps {
  keySignature: string  // e.g., 'G', 'Bb', 'F#'
  clef?: 'treble' | 'bass' | 'alto' | 'tenor'
  label?: string
  width?: number
  height?: number
  className?: string
}

export function KeySignatureDisplay({
  keySignature,
  clef = 'treble',
  label,
  width = 200,
  height = 150,
  className = '',
}: KeySignatureDisplayProps) {
  return (
    <div className={`flex flex-col items-center ${className}`}>
      <StaffNotation notes={[]} clef={clef} keySignature={keySignature} width={width} height={height} />
      {label && (
        <p className="text-sm font-medium text-slate-600 dark:text-slate-400 mt-1">{label}</p>
      )}
    </div>
  )
}
```

- [ ] **Step 4: Create ScaleDisplay.tsx**

```tsx
import { StaffNotation } from './StaffNotation'
import type { NoteSpec } from '../../types'

interface ScaleDisplayProps {
  notes: string[]     // e.g., ['c/4', 'd/4', 'e/4', 'f/4', 'g/4', 'a/4', 'b/4', 'c/5']
  clef?: 'treble' | 'bass' | 'alto' | 'tenor'
  keySignature?: string
  label?: string
  width?: number
  height?: number
  className?: string
}

export function ScaleDisplay({
  notes,
  clef = 'treble',
  keySignature,
  label,
  width = 400,
  height = 150,
  className = '',
}: ScaleDisplayProps) {
  const noteSpecs: NoteSpec[] = notes.map((key) => ({
    keys: [key],
    duration: 'q',
  }))

  return (
    <div className={`flex flex-col items-center ${className}`}>
      <StaffNotation
        notes={noteSpecs}
        clef={clef}
        keySignature={keySignature}
        width={width}
        height={height}
      />
      {label && (
        <p className="text-sm font-medium text-slate-600 dark:text-slate-400 mt-1">{label}</p>
      )}
    </div>
  )
}
```

- [ ] **Step 5: Build and verify**

Run: `npm run build`
Expected: No errors

- [ ] **Step 6: Commit**

```bash
git add src/components/music/
git commit -m "feat(cadence): add ChordDiagram, IntervalDiagram, KeySignatureDisplay, ScaleDisplay components"
```

---

## Task 14: Notation Basics Course Content

**Files:**
- Create: `src/data/notationBasics.ts`
- Modify: `src/data/courses.ts`

- [ ] **Step 1: Create notationBasics.ts with 3 modules**

Create `src/data/notationBasics.ts` with modules for Clefs & the Staff, Note Names & Ledger Lines, and Accidentals. Each module should have 1 lesson with 3-5 custom study slides and 5-8 quiz questions. Include `staffConfig` on questions that involve note identification.

Content should be sourced from standard music theory curriculum. Example question structure:

```typescript
import type { Module } from '../types'

export const notationBasicsModules: Module[] = [
  {
    id: 'clefs-and-staff',
    courseId: 'notation-basics',
    title: 'Clefs & the Staff',
    description: 'Learn the treble, bass, alto, and tenor clefs and how to read the five-line staff.',
    icon: '🎼',
    order: 1,
    lessons: [
      {
        id: 'intro-to-clefs',
        title: 'Introduction to Clefs',
        xpReward: 15,
        slides: [
          {
            id: 'clef-slide-1',
            topic: 'The Musical Staff',
            explanation: 'Music is written on a staff consisting of five horizontal lines and four spaces. Each line and space represents a different pitch. The higher a note is placed on the staff, the higher it sounds.',
          },
          {
            id: 'clef-slide-2',
            topic: 'The Treble Clef',
            explanation: 'The treble clef (also called the G clef) curls around the second line of the staff, marking it as the note G above middle C. It is used for higher-pitched instruments and voices, including piano right hand, violin, flute, and soprano voice.',
            staffConfig: {
              notes: [],
              clef: 'treble',
              width: 200,
              height: 120,
            },
            diagramType: 'notation',
          },
          {
            id: 'clef-slide-3',
            topic: 'The Bass Clef',
            explanation: 'The bass clef (also called the F clef) has two dots that surround the fourth line, marking it as the note F below middle C. It is used for lower-pitched instruments including piano left hand, cello, bassoon, and bass voice.',
            staffConfig: {
              notes: [],
              clef: 'bass',
              width: 200,
              height: 120,
            },
            diagramType: 'notation',
          },
        ],
        questions: [
          {
            id: 'nb-q1',
            text: 'How many lines does a standard musical staff have?',
            type: 'multiple-choice',
            options: ['4', '5', '6', '7'],
            correctAnswer: 1,
            explanation: 'A standard musical staff consists of five horizontal lines and four spaces.',
            topic: 'The Staff',
          },
          {
            id: 'nb-q2',
            text: 'The treble clef is also known as the:',
            type: 'multiple-choice',
            options: ['F clef', 'C clef', 'G clef', 'D clef'],
            correctAnswer: 2,
            explanation: 'The treble clef is also called the G clef because it curls around the second line of the staff, designating it as G.',
            topic: 'Clefs',
          },
          {
            id: 'nb-q3',
            text: 'The bass clef designates the fourth line of the staff as which note?',
            type: 'multiple-choice',
            options: ['C', 'D', 'E', 'F'],
            correctAnswer: 3,
            explanation: 'The bass clef (F clef) has two dots surrounding the fourth line, marking it as F below middle C.',
            topic: 'Clefs',
          },
          {
            id: 'nb-q4',
            text: 'The alto clef is a type of C clef.',
            type: 'true-false',
            options: ['True', 'False'],
            correctAnswer: 0,
            explanation: 'The alto clef is indeed a C clef. It places middle C on the third (middle) line of the staff. It is primarily used by the viola.',
            topic: 'Clefs',
          },
          {
            id: 'nb-q5',
            text: 'Which clef is most commonly used by the viola?',
            type: 'multiple-choice',
            options: ['Treble clef', 'Bass clef', 'Alto clef', 'Tenor clef'],
            correctAnswer: 2,
            explanation: 'The viola primarily uses the alto clef, which places middle C on the third line of the staff.',
            topic: 'Clefs',
          },
        ],
      },
    ],
  },
  // ... Note Names & Ledger Lines module
  // ... Accidentals module
]
```

Write the full content for all 3 modules with complete questions and slides. This is the largest step — take care with music theory accuracy.

- [ ] **Step 2: Wire notationBasics into courses.ts**

In `src/data/courses.ts`, uncomment the import and set `modules: notationBasicsModules` for the Notation Basics course.

- [ ] **Step 3: Build and verify**

Run: `npm run build`
Expected: No errors

- [ ] **Step 4: Commit**

```bash
git add src/data/notationBasics.ts src/data/courses.ts
git commit -m "feat(cadence): add Notation Basics course content (3 modules)"
```

---

## Task 15: Rhythm & Meter Course Content

**Files:**
- Create: `src/data/rhythmAndMeter.ts`
- Modify: `src/data/courses.ts`

- [ ] **Step 1: Create rhythmAndMeter.ts**

Follow the same pattern as notationBasics.ts. Three modules:
1. Note Values & Rests (whole through sixteenth notes)
2. Time Signatures (simple and compound meter)
3. Dots, Ties & Syncopation

Each module: 1 lesson, 3-5 slides, 5-8 questions. Include `staffConfig` where applicable.

- [ ] **Step 2: Wire into courses.ts**

- [ ] **Step 3: Build and verify**

- [ ] **Step 4: Commit**

```bash
git add src/data/rhythmAndMeter.ts src/data/courses.ts
git commit -m "feat(cadence): add Rhythm & Meter course content (3 modules)"
```

---

## Task 16: Scales & Keys Course Content

**Files:**
- Create: `src/data/scalesAndKeys.ts`
- Modify: `src/data/courses.ts`

- [ ] **Step 1: Create scalesAndKeys.ts**

Three modules:
1. Major Scales (W-W-H-W-W-W-H pattern, all 12 keys)
2. Minor Scales (natural, harmonic, melodic)
3. Key Signatures & Circle of Fifths

Include `staffConfig` with `diagramType: 'scale'` and `diagramType: 'key-signature'` where applicable.

- [ ] **Step 2: Wire into courses.ts**

- [ ] **Step 3: Build and verify**

- [ ] **Step 4: Commit**

```bash
git add src/data/scalesAndKeys.ts src/data/courses.ts
git commit -m "feat(cadence): add Scales & Keys course content (3 modules)"
```

---

## Task 17: Intervals Course Content

**Files:**
- Create: `src/data/intervals.ts`
- Modify: `src/data/courses.ts`

- [ ] **Step 1: Create intervals.ts**

Three modules:
1. Half Steps & Whole Steps
2. Interval Quality (M, m, P, A, d)
3. Interval Inversion

Include `staffConfig` with `diagramType: 'interval'` for visual questions.

- [ ] **Step 2: Wire into courses.ts**

- [ ] **Step 3: Build and verify**

- [ ] **Step 4: Commit**

```bash
git add src/data/intervals.ts src/data/courses.ts
git commit -m "feat(cadence): add Intervals course content (3 modules)"
```

---

## Task 18: Chords Course Content

**Files:**
- Create: `src/data/chords.ts`
- Modify: `src/data/courses.ts`

- [ ] **Step 1: Create chords.ts**

Three modules:
1. Triads (major, minor, diminished, augmented)
2. Triad Inversions (root position, 1st, 2nd inversion, figured bass)
3. Seventh Chords (Maj7, dom7, min7, half-dim, full-dim)

Include `staffConfig` with `diagramType: 'chord'` for visual questions.

- [ ] **Step 2: Wire into courses.ts**

- [ ] **Step 3: Build and verify**

- [ ] **Step 4: Commit**

```bash
git add src/data/chords.ts src/data/courses.ts
git commit -m "feat(cadence): add Chords course content (3 modules)"
```

---

## Task 19: Wire VexFlow Into Quiz and Study Components

**Files:**
- Modify: `src/components/quiz/QuestionCard.tsx`
- Modify: `src/components/quiz/StudyCard.tsx`

- [ ] **Step 1: Add VexFlow rendering to QuestionCard.tsx**

Import `StaffNotation` (lazy-loaded) and the diagram components. Before the question text, add conditional rendering:

```tsx
import { lazy, Suspense } from 'react'

const StaffNotation = lazy(() => import('../music/StaffNotation').then(m => ({ default: m.StaffNotation })))
const ChordDiagram = lazy(() => import('../music/ChordDiagram').then(m => ({ default: m.ChordDiagram })))
const IntervalDiagram = lazy(() => import('../music/IntervalDiagram').then(m => ({ default: m.IntervalDiagram })))
const KeySignatureDisplay = lazy(() => import('../music/KeySignatureDisplay').then(m => ({ default: m.KeySignatureDisplay })))
const ScaleDisplay = lazy(() => import('../music/ScaleDisplay').then(m => ({ default: m.ScaleDisplay })))
```

In the JSX, before the question text:
```tsx
{question.staffConfig && (
  <Suspense fallback={<div className="h-32 flex items-center justify-center text-slate-400">Loading notation...</div>}>
    <div className="mb-4 flex justify-center">
      <StaffNotation {...question.staffConfig} />
    </div>
  </Suspense>
)}
```

- [ ] **Step 2: Add VexFlow rendering to StudyCard.tsx**

Same pattern — render staff notation between the topic heading and explanation text when `slide.staffConfig` is present.

- [ ] **Step 3: Build and verify**

Run: `npm run build`
Expected: No errors

- [ ] **Step 4: Commit**

```bash
git add src/components/quiz/QuestionCard.tsx src/components/quiz/StudyCard.tsx
git commit -m "feat(cadence): integrate VexFlow notation into quiz and study components"
```

---

## Task 20: Placement Test

**Files:**
- Create: `src/data/placementTest.ts`
- Create: `src/hooks/usePlacement.ts`
- Create: `src/pages/PlacementTest.tsx`
- Modify: `src/App.tsx`

- [ ] **Step 1: Create placementTest.ts**

Create a pool of ~30 questions spanning all 5 course topics, each tagged with `difficulty: 1-5`:

```typescript
import type { Question } from '../types'

export const placementQuestions: (Question & { difficulty: number })[] = [
  // Difficulty 1 — Notation Basics
  { id: 'pl-1', text: 'How many lines does a musical staff have?', type: 'multiple-choice', options: ['3', '4', '5', '6'], correctAnswer: 2, explanation: '...', topic: 'Notation Basics', difficulty: 1 },
  // ... 29 more questions spanning difficulty 1-5 and all topics
]
```

- [ ] **Step 2: Create usePlacement.ts**

```typescript
import { useState, useCallback } from 'react'
import { useStorage } from './useStorage'
import { placementQuestions } from '../data/placementTest'
import type { PlacementResult } from '../types'

const PLACEMENT_KEY = 'cadence_placement_done'

export function usePlacement() {
  const [done, setDone] = useStorage<boolean>(PLACEMENT_KEY, false)
  const [currentDifficulty, setCurrentDifficulty] = useState(3)
  const [questionIndex, setQuestionIndex] = useState(0)
  const [correctCount, setCorrectCount] = useState(0)
  const [totalAsked, setTotalAsked] = useState(0)
  const [selectedQuestions, setSelectedQuestions] = useState<typeof placementQuestions>([])

  const getNextQuestion = useCallback(() => {
    const available = placementQuestions.filter(
      (q) => Math.abs(q.difficulty - currentDifficulty) <= 1 && !selectedQuestions.includes(q)
    )
    if (available.length === 0) return null
    return available[Math.floor(Math.random() * available.length)]
  }, [currentDifficulty, selectedQuestions])

  const answerQuestion = useCallback((correct: boolean) => {
    setTotalAsked((n) => n + 1)
    if (correct) {
      setCorrectCount((n) => n + 1)
      setCurrentDifficulty((d) => Math.min(5, d + 1))
    } else {
      setCurrentDifficulty((d) => Math.max(1, d - 1))
    }
    setQuestionIndex((i) => i + 1)
  }, [])

  const isComplete = totalAsked >= 10 || (totalAsked >= 8 && getNextQuestion() === null)

  const getResult = useCallback((): PlacementResult => {
    const score = totalAsked > 0 ? Math.round((correctCount / totalAsked) * 100) : 0
    // Map score to recommended course: 0-30 → course 0, 31-50 → 1, 51-70 → 2, 71-85 → 3, 86+ → 4
    const courseMap = [30, 50, 70, 85]
    let recommended = 0
    for (let i = 0; i < courseMap.length; i++) {
      if (score > courseMap[i]) recommended = i + 1
    }
    return {
      completedAt: new Date().toISOString(),
      score,
      recommendedCourseIndex: recommended,
      skillLevel: Math.max(1, Math.min(5, Math.round(currentDifficulty))),
    }
  }, [correctCount, totalAsked, currentDifficulty])

  const completePlacement = useCallback(() => {
    setDone(true)
  }, [setDone])

  const skipPlacement = useCallback(() => {
    setDone(true)
  }, [setDone])

  return {
    placementDone: done,
    currentQuestion: getNextQuestion(),
    questionNumber: totalAsked + 1,
    totalQuestions: 10,
    isComplete,
    answerQuestion,
    getResult,
    completePlacement,
    skipPlacement,
  }
}
```

- [ ] **Step 3: Create PlacementTest.tsx page**

Build the placement test page using the existing quiz UI patterns (QuestionCard-style layout). Include:
- Progress indicator (question X of 10-15)
- Skip button
- Results screen with recommended starting course
- "Start Learning" button that navigates to the recommended course

- [ ] **Step 4: Wire into App.tsx routing**

Add import and route for PlacementTest. In `AppRoutes`, add redirect logic:
```tsx
// If placement not done and user hasn't skipped, redirect to /placement
```

- [ ] **Step 5: Build and verify**

Run: `npm run build`
Expected: No errors

- [ ] **Step 6: Commit**

```bash
git add src/data/placementTest.ts src/hooks/usePlacement.ts src/pages/PlacementTest.tsx src/App.tsx
git commit -m "feat(cadence): add adaptive placement test"
```

---

## Task 21: Configurable Practice Quiz

**Files:**
- Modify: `src/pages/PracticeTest.tsx`

- [ ] **Step 1: Redesign PracticeTest.tsx as configurable quiz builder**

Replace the current single-test format with:
1. Topic selector (checkboxes for each course, grouped)
2. Question count selector (10, 25, 50 radio buttons)
3. Timer toggle with presets
4. Start button

The quiz flow reuses the existing `useQuiz` hook — just pass it a filtered question pool based on selected topics.

- [ ] **Step 2: Build and verify**

Run: `npm run build`
Expected: No errors

- [ ] **Step 3: Commit**

```bash
git add src/pages/PracticeTest.tsx
git commit -m "feat(cadence): redesign Practice tab as configurable quiz builder"
```

---

## Task 22: Utils Cleanup and Module Unlocking Removal

**Files:**
- Modify: `src/utils/index.ts`
- Modify: `src/pages/CourseDetail.tsx`
- Modify: `src/pages/ModuleDetail.tsx`

- [ ] **Step 1: Remove module locking logic from utils**

In `src/utils/index.ts`, find and modify `isModuleLocked` to always return `false` (or remove it and update callers). Topics are not locked in Cadence.

- [ ] **Step 2: Update CourseDetail.tsx**

Remove any locked-state UI (grayed out modules, lock icons). All modules should be accessible.

- [ ] **Step 3: Update ModuleDetail.tsx**

Add mastery display — show the average quiz score across lessons and a "Score 80%+ to master" indicator.

- [ ] **Step 4: Build and verify**

Run: `npm run build`
Expected: No errors

- [ ] **Step 5: Commit**

```bash
git add src/utils/index.ts src/pages/CourseDetail.tsx src/pages/ModuleDetail.tsx
git commit -m "feat(cadence): remove module locking, add mastery display"
```

---

## Task 23: Progress Page — Badges and Level Display

**Files:**
- Modify: `src/pages/Progress.tsx`

- [ ] **Step 1: Add badge definitions**

Add a `BADGES` constant mapping `BadgeId` to display info (name, description, icon).

- [ ] **Step 2: Add badge grid to Progress page**

Show earned badges in color, unearned ones grayed out. Display current level with XP progress to next level.

- [ ] **Step 3: Add daily goal progress display**

Show daily goal ring/bar (e.g., "2 of 3 quizzes today").

- [ ] **Step 4: Build and verify**

Run: `npm run build`
Expected: No errors

- [ ] **Step 5: Commit**

```bash
git add src/pages/Progress.tsx
git commit -m "feat(cadence): add badges, level, and daily goal to Progress page"
```

---

## Task 24: Home Page Redesign — Discovery-First Dashboard

**Files:**
- Modify: `src/pages/Home.tsx`

- [ ] **Step 1: Redesign Home.tsx**

Restructure the Home page layout:
1. Hero card with streak, XP, daily goal ring, and level
2. Continue Learning section (most recent in-progress topic)
3. Topic Map — all 5 courses as cards showing progress, mastery badges
4. Needs Review callout (if weak areas exist)

Update all navigation paths to use `/learn/` prefix.

- [ ] **Step 2: Build and verify**

Run: `npm run build`
Expected: No errors

- [ ] **Step 3: Commit**

```bash
git add src/pages/Home.tsx
git commit -m "feat(cadence): redesign Home as discovery-first dashboard"
```

---

## Task 25: Documentation Update

**Files:**
- Modify: `README.md`
- Modify: `TESTFLIGHT.md`

- [ ] **Step 1: Rewrite README.md for Cadence**

Update title, description, features list, setup instructions. Replace all PilotPath/aviation references. Update bundle ID to `com.sarahoke.cadence`.

- [ ] **Step 2: Update TESTFLIGHT.md**

Replace PilotPath → Cadence, update bundle ID, update keywords to music/theory/AP/study.

- [ ] **Step 3: Commit**

```bash
git add README.md TESTFLIGHT.md
git commit -m "docs: update README and TESTFLIGHT for Cadence"
```

---

## Task 26: Final Audit

- [ ] **Step 1: Search for remaining aviation references**

```bash
grep -ri "pilot\|aviation\|faa\|airplane\|✈\|flight\|airspace\|pilotpath\|sky-" src/ index.html public/ capacitor.config.ts README.md TESTFLIGHT.md
```

Fix any remaining references found.

- [ ] **Step 2: Search for remaining old storage keys**

```bash
grep -r "pilotpath_" src/
```

Expected: No matches.

- [ ] **Step 3: Full build and verify**

```bash
npm run build
```

Expected: Clean build, no errors, no warnings except chunk size.

- [ ] **Step 4: Dev server smoke test**

```bash
npm run dev
```

Verify in browser:
- Home tab renders with Cadence branding
- Learn tab shows 5 music theory courses
- Can navigate into a course and complete a lesson
- Practice tab shows configurable quiz builder
- Review tab shows weak areas (may be empty)
- Progress tab shows XP, streaks, badges
- Dark mode works correctly
- All Cadence colors render (indigo primary, copper accent)

- [ ] **Step 5: Final commit**

```bash
git add -A
git commit -m "feat(cadence): final audit — remove all remaining aviation references"
```
