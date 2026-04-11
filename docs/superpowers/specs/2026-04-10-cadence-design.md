# Cadence — Design Spec

Transform the existing PilotPath (React + Vite + TypeScript + Tailwind + Supabase + Capacitor) aviation study app into **Cadence**, a music theory learning and quiz app targeting complete beginners through AP Music Theory exam candidates.

---

## 1. Product Overview

### What Cadence Is

A gamified, mobile-first music theory study and quiz app. The content arc runs from "what is a whole step" through Roman numeral analysis, voice leading, and musical form. Two primary audiences:

- **Beginners** who have never studied music theory
- **Advanced students** preparing for the AP Music Theory exam

### What Cadence Is Not (Out of Scope)

- Ear training (audio playback, melodic/harmonic dictation) — planned for v2
- Sight singing
- MIDI input
- Heavy gamification (leaderboards, combos, unlockable cosmetics) — v2
- AP Exam simulator (full-length timed mock) — v2

---

## 2. Infrastructure Retained (Do Not Remove)

These systems carry over unchanged from PilotPath:

- Vercel deployment + analytics + speed insights
- Capacitor iOS setup (`capacitor.config.ts`, `ios:build`/`ios:open` scripts, `TESTFLIGHT.md`)
- Supabase auth + cloud sync
- Dark mode with system detection
- PWA / mobile-first layout with safe areas
- `user_progress` table structure in Supabase

---

## 3. Branding

### Name

**Cadence**

### Color Palette — "Warm Indigo Night"

| Role | Hex | Tailwind | Usage |
|------|-----|----------|-------|
| Primary | `#2d3161` | custom `cadence-800` | Buttons, header, active states |
| Primary light | `#3d4280` | custom `cadence-700` | Hover states, gradients |
| Accent | `#d4956b` | custom `copper-500` | Progress bars, highlights, music note icon |
| Accent light | `#e0b08a` | custom `copper-400` | Hover on accent elements |
| Light BG | `#f5f3ff` | `purple-50` / custom | Page backgrounds (light mode) |
| Dark BG | `#0d0f1f` | custom | Page backgrounds (dark mode) |
| Dark surface | `#161433` | custom | Cards/surfaces in dark mode |
| XP / Streak | `#f59e0b` | `amber-500` | XP badges, streak fire, achievements |
| Links (dark) | `#a5b4fc` | `indigo-300` | Interactive text in dark mode |
| Links (light) | `#2d3161` | same as primary | Interactive text in light mode |
| Success | `#10b981` | `emerald-500` | Correct answers |
| Error | `#ef4444` | `red-500` | Incorrect answers |

**Accessibility:** All primary text combinations meet WCAG AAA (7:1+). Accent on dark meets WCAG AA (6.1:1). Links on dark meet AAA (7.8:1).

### Icon

Music note (♩) in copper on indigo background. Existing `assets/icon.svg` and `assets/icon.png` to be updated with new palette.

### Favicon

Replace airplane SVG with music note. Background `#2d3161`, note `#d4956b`.

---

## 4. Navigation

### Bottom Nav (5 tabs)

| Tab | Label | Icon | Description |
|-----|-------|------|-------------|
| 1 | Home | House | Discovery-first dashboard |
| 2 | Learn | Book/GraduationCap | Browse all topic courses |
| 3 | Practice | Target/Pencil | Configurable quiz builder |
| 4 | Review | RefreshCw/RotateCcw | Weak areas — topics needing more work |
| 5 | Progress | BarChart/TrendingUp | Stats, XP, streaks, badges |

### Routing Changes

| Old Route | New Route | Notes |
|-----------|-----------|-------|
| `/courses` | `/learn` | Rename |
| `/practice` | `/practice` | Keep, but redesign content |
| `/weak-areas` | `/review` | Rename |
| `/progress` | `/progress` | Keep |
| — | `/placement` | New: placement test |

---

## 5. Content Architecture

### Philosophy: Topic-Based, Not Level-Based

Topics are standalone courses, not locked levels. Users can jump into any topic. Suggested order exists but is not enforced. The placement test recommends a starting point but does not gate content.

This mirrors musictheory.net's approach: each topic area is self-contained, exercises are organized by activity type.

### Content Hierarchy

```
Course (topic area)
  └── Module (subtopic)
        └── Lesson
              ├── Study slides (text + VexFlow diagrams)
              └── Quiz (5-10 questions, mastery threshold)
```

### MVP Topics (Modules 1-5)

**Course 1: Notation Basics**
- Module: Clefs & the Staff (treble, bass, alto, tenor clefs; staff lines and spaces)
- Module: Note Names & Ledger Lines (note identification on each clef; ledger line reading)
- Module: Accidentals (sharps, flats, naturals, double sharps, double flats; enharmonic equivalents)

**Course 2: Rhythm & Meter**
- Module: Note Values & Rests (whole through sixteenth notes and corresponding rests)
- Module: Time Signatures (simple meter: 2/4, 3/4, 4/4; compound meter: 6/8, 9/8, 12/8)
- Module: Dots, Ties & Syncopation (dotted notes, ties, syncopated rhythms)

**Course 3: Scales & Keys**
- Module: Major Scales (whole/half step patterns, all 12 major scales)
- Module: Minor Scales (natural, harmonic, melodic minor)
- Module: Key Signatures & Circle of Fifths (identifying and writing key signatures, relative/parallel keys)

**Course 4: Intervals**
- Module: Half Steps & Whole Steps (chromatic vs diatonic half steps)
- Module: Interval Quality (major, minor, perfect, augmented, diminished; identifying and writing)
- Module: Interval Inversion (inversion rules, compound intervals)

**Course 5: Chords**
- Module: Triads (major, minor, diminished, augmented; construction and identification)
- Module: Triad Inversions (root position, first inversion, second inversion; figured bass)
- Module: Seventh Chords (major 7, dominant 7, minor 7, half-diminished, fully diminished; inversions)

### Future Topics (v2, Modules 6-9)

- Course 6: Roman Numeral Analysis
- Course 7: Cadences
- Course 8: Musical Form
- Course 9: Voice Leading Basics

### Question Types

| Type | Description | Rendering |
|------|-------------|-----------|
| `multiple-choice` | Text question with 4 text options | Text only |
| `true-false` | True/false statement | Text only |
| `staff-identify` | Staff notation displayed, identify what's shown | VexFlow renders staff, text options |
| `staff-select` | Question asks user to pick the correct notation | VexFlow renders multiple staves as options |

Questions extend the existing `Question` type with:
- `staffConfig?` — VexFlow rendering configuration (notes, clef, key signature, time signature)
- `diagramType?` — which VexFlow component to use (`'chord' | 'interval' | 'scale' | 'key-signature' | 'notation'`)

### Content Sourcing

Structure content from the College Board AP Music Theory Course and Exam Description. Questions should mirror AP exam format where applicable.

---

## 6. Notation Rendering — VexFlow

### Dependency

`vexflow` (npm) — the standard library for rendering music notation as SVG in the browser.

### Component Architecture

| Component | Purpose | Used In |
|-----------|---------|---------|
| `<StaffNotation>` | Core wrapper. Renders notes on a staff from declarative config. | Everything below |
| `<ChordDiagram>` | Renders stacked chord notes | Chord lessons/quizzes |
| `<IntervalDiagram>` | Renders two notes showing an interval | Interval lessons/quizzes |
| `<KeySignatureDisplay>` | Renders a key signature | Scale/key lessons |
| `<ScaleDisplay>` | Renders ascending/descending scale | Scale lessons/quizzes |

### `StaffNotation` Props

```typescript
interface StaffNotationProps {
  notes: NoteSpec[]          // pitch, duration, accidental
  clef: 'treble' | 'bass' | 'alto' | 'tenor'
  keySignature?: string     // e.g., "G", "Bb"
  timeSignature?: string    // e.g., "4/4"
  width?: number
  height?: number
  showLabels?: boolean      // overlay note names
}
```

### Dark Mode Support

VexFlow renders SVG. The wrapper must override stroke/fill colors based on the current theme:
- Light mode: black staff lines, black noteheads
- Dark mode: `#e2e8f0` (slate-200) staff lines and noteheads

### Performance

VexFlow is a large library (~500KB). Mitigations:
- Code-split into its own chunk via `vite.config.ts` `manualChunks`
- Lazy-load `StaffNotation` with `React.lazy()` — only loaded when a lesson/quiz needs notation
- Renders to SVG (not canvas) for accessibility and crisp scaling

---

## 7. Home Tab — Discovery-First Dashboard

### Layout (top to bottom)

1. **Header** — "Cadence ♩" logo in indigo, dark mode toggle, profile avatar
2. **Hero card** — Gradient card with current streak, total XP, daily goal progress (e.g., "2 of 3 quizzes today")
3. **Continue Learning** — If user has in-progress topics, show the most recent one with a "Continue" button
4. **Topic Map** — All topic courses as cards in a grid/list. Each card shows:
   - Topic name and icon
   - Progress percentage (filled ring or bar)
   - Mastery badge if earned
   - Greyed/muted if not yet started, colored if in progress or complete
5. **Daily Challenge** (stretch goal) — Optional quick 5-question challenge from mixed topics for bonus XP

### Gamification Elements on Home

- Streak counter with fire icon (amber)
- Total XP display
- Daily goal ring (e.g., 3 quizzes per day)
- Level indicator (based on total XP thresholds)

---

## 8. Gamification System (MVP — Medium Engagement)

### XP

- Completing a quiz: 10-25 XP (scaled by question count and score)
- Perfect score bonus: +10 XP
- Completing a lesson (study slides + quiz): +5 XP bonus
- Placement test completion: +50 XP

### Streaks

- One quiz per day maintains streak
- Streak counter displayed on Home and Progress tabs
- Streak freeze: not in MVP (v2 feature)

### Daily Practice Goal

- Default: complete 3 quizzes per day
- Configurable in Settings (1, 3, 5)
- Progress ring on Home tab
- Bonus XP for hitting daily goal: +15 XP

### Milestone Badges

Earned automatically, displayed on Progress tab:

| Badge | Condition |
|-------|-----------|
| First Steps | Complete first lesson |
| Note Reader | Complete Notation Basics course |
| Rhythm Keeper | Complete Rhythm & Meter course |
| Scale Master | Complete Scales & Keys course |
| Interval Pro | Complete Intervals course |
| Chord Builder | Complete Chords course |
| Perfect Score | Get 100% on any quiz |
| Week Warrior | 7-day streak |
| Dedicated | 30-day streak |
| Century | Earn 100 total XP |
| Scholar | Earn 1,000 total XP |

### Level System

Total XP maps to a level number displayed on the profile:

| Level | XP Required |
|-------|-------------|
| 1 | 0 |
| 2 | 50 |
| 3 | 150 |
| 4 | 300 |
| 5 | 500 |
| 6 | 800 |
| 7 | 1200 |
| 8 | 1800 |
| 9 | 2500 |
| 10 | 3500 |

---

## 9. Practice Tab — Configurable Quiz Builder

### UI

1. **Topic selector** — Multi-select checkboxes for which topics to include. Grouped by course. Only topics the user has started are pre-checked; all are selectable.
2. **Question count** — Radio buttons: 10, 25, 50
3. **Timer toggle** — Optional countdown timer. Presets based on question count (10 questions = 5 min, 25 = 15 min, 50 = 30 min). Can be turned off.
4. **Start button**

### Quiz Flow

Same as existing lesson quiz flow:
- One question at a time
- Immediate feedback after each answer (correct/incorrect + explanation)
- VexFlow rendering for `staff-identify` and `staff-select` questions
- Results screen at end with score breakdown by topic, XP earned
- Option to retry missed questions

---

## 10. Placement Test

### Trigger

On first launch after auth (or first launch ever), if `cadence_placement_done` is not set in storage.

### Format

- 10-15 questions, adaptive difficulty
- Algorithm: start at difficulty 3 (out of 5), go up on correct, down on incorrect
- Question pool: ~30 curated questions tagged with difficulty (1-5) and topic area
- Spans notation basics through chords

### Results

- Score mapped to a recommended starting course
- Skill level stored in user profile (`placementResult` field on `UserProgress`)
- Recommended course highlighted on the Learn tab
- Courses above the recommended level are not locked — just not highlighted

### Skip Option

Users can skip the placement test entirely. Defaults to recommending Course 1 (Notation Basics).

---

## 11. Course / Lesson Flow

### Learn Tab

Grid/list of all topic courses. Each card shows:
- Course name, icon, description
- Module count and completion progress
- Mastery badge if all modules meet threshold

### Course Detail Page

List of modules within a topic. Each module shows:
- Module name
- Lesson count and completion
- Mastery percentage (average quiz score across lessons)
- Mastery threshold indicator: "Score 80%+ to master"

**No hard locks.** All modules within a course are accessible. Mastery is tracked but not enforced for progression.

### Lesson Flow

1. **Study phase** — 3-5 slides with explanatory text and VexFlow diagrams where relevant. "Next" button to advance.
2. **Quiz phase** — 5-10 questions. Immediate feedback per question. Results screen at end.
3. **Completion** — XP awarded, mastery percentage recorded, badge check triggered.

### Mastery

- Per-module: average score across all lessons in that module
- Threshold: 80% to earn "mastered" status
- Mastery is display-only — does not lock/unlock content
- Users can retry quizzes to improve mastery

---

## 12. Review Tab (Weak Areas)

Shows topics where the user's quiz scores are below the mastery threshold (80%). For each weak topic:

- Topic name and current average score
- "Practice" button that launches a quick quiz from that topic's question pool
- Questions weighted toward ones the user has previously answered incorrectly

This is a rename/reskin of the existing Weak Areas page with the same underlying logic.

---

## 13. Progress Tab

### Stats displayed:

- Total XP and current level
- Current streak and longest streak
- Daily goal progress
- Per-course mastery breakdown (bar chart or ring per course)
- Badges earned (grid of earned badges, greyed-out unearned ones)
- Total questions answered, accuracy percentage

---

## 14. Settings

### Changes from PilotPath:

- Remove: FAA Website link, FAA Handbooks & Manuals link
- Add: Link to musictheory.net, AP Music Theory Course Description
- Keep: Dark mode toggle, sign out, account info, app version
- Add: Daily goal configuration (1, 3, 5 quizzes per day)
- Update: App name to "Cadence", version reset

---

## 15. Storage Keys

| Old Key | New Key | Notes |
|---------|---------|-------|
| `pilotpath_progress` | `cadence_progress` | Complete content change — no migration needed |
| `pilotpath_theme` | `cadence_theme` | Dark mode preference |
| — | `cadence_placement_done` | New: placement test completion flag |

---

## 16. Files to Delete

- `src/data/ppl.ts` — Private Pilot content
- `src/data/groundSchool.ts` — Ground school content
- `src/data/ir.ts` — Instrument Rating content
- `src/data/cpl.ts` — Commercial Pilot content
- `src/utils/referenceLinks.ts` — FAA reference link parsing
- `src/components/ui/ReferenceLink.tsx` — FAA reference link component

---

## 17. Files to Create

- `src/components/music/StaffNotation.tsx`
- `src/components/music/ChordDiagram.tsx`
- `src/components/music/IntervalDiagram.tsx`
- `src/components/music/KeySignatureDisplay.tsx`
- `src/components/music/ScaleDisplay.tsx`
- `src/data/notationBasics.ts`
- `src/data/rhythmAndMeter.ts`
- `src/data/scalesAndKeys.ts`
- `src/data/intervals.ts`
- `src/data/chords.ts`
- `src/data/placementTest.ts`
- `src/pages/PlacementTest.tsx`
- `src/hooks/usePlacement.ts`

---

## 18. Capacitor Config Changes

```typescript
const config: CapacitorConfig = {
  appId: 'com.sarahoke.cadence',
  appName: 'Cadence',
  webDir: 'dist',
  plugins: {
    SplashScreen: {
      backgroundColor: '#2d3161',  // primary indigo
      // ... rest unchanged
    },
    StatusBar: {
      backgroundColor: '#2d3161',
      // ... rest unchanged
    },
  },
}
```

---

## 19. v2 Backlog

Items explicitly deferred from MVP:

- **Modules 6-9:** Roman Numeral Analysis, Cadences, Musical Form, Voice Leading
- **AP Exam Simulator:** Full-length timed mock exam matching AP format
- **Heavy gamification:** Leaderboards, timed challenges, combo multipliers, unlockable cosmetic themes, weekly challenges
- **Ear training:** Audio playback, melodic/harmonic dictation
- **Sight singing**
- **MIDI input**
- **Streak freeze** (maintain streak without practicing)
