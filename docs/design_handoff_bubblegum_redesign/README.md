# Handoff: Cadence "Bubblegum × Live Set" Redesign

> **One-line:** A full visual + voice redesign of the Cadence music-theory app from "serious indigo" to "candy pastel + concert-tour vocabulary." This package contains 30+ designed screens across 9 sections, ready to be implemented in the existing `sarahmorrisokeefe/cadence` codebase.

---

## Overview

Cadence (the existing app) is a gamified music-theory study app built on **React 18 + Vite + Tailwind**, wrapped for iOS via **Capacitor 8**. The current visual system is indigo + slate — clean and competent but reads "businessy" and adult.

This redesign keeps every feature, route, and information architecture intact. It only changes **two things**:

1. **Visual system** — candy pastel palette on cream, ultra-rounded shapes, no shadows, doodled music notes as background. Internal name: **"Bubblegum"**.
2. **Copy vocabulary** — concert-tour language replaces generic gamification terms. Internal name: **"Live Set"**. (Level → Track, Streak → Nights, etc. See the full mapping below.)

The deliverable is **nine sections of designed mobile screens** (mocked at 412×880 inside an iPhone bezel) covering every primary surface the production app exposes.

## About the Design Files

The files in this bundle are **design references created in HTML** — React prototypes rendered into a Design Canvas, demonstrating the intended look, vocabulary, and motion. They are **not production code to copy directly**.

Your job is to **recreate these designs inside the existing Cadence codebase** — the `sarahmorrisokeefe/cadence` React/Vite/Tailwind app — using the existing patterns (`max-w-lg` column, Tailwind classes, React + Framer Motion, the `useDarkMode` hook, `canvas-confetti`, VexFlow for real notation rendering). You should reuse and replace the existing components rather than ship the prototype's inline-style JSX.

**Where the prototype uses inline styles, the production version should use Tailwind classes.** A token mapping is included below.

## Fidelity

**High-fidelity.** Every screen has final colors, typography, spacing, copy, and animation timing. The HTML prototypes use the actual Inter variable font, the actual pastel palette, the actual cubic-bezier easing curve, and the actual copy that should ship.

Treat exact hex values, font weights, border-radii, and animation durations as ship-ready. Treat inline-style structure (`style={{…}}`) as scaffolding — you'll convert these to Tailwind / CSS modules / styled-components matching the rest of the codebase.

---

## How to read this bundle

```
design_handoff_bubblegum_redesign/
├── README.md                ← this file
├── Bubblegum App.html       ← open this in a browser to see every screen
├── design-canvas.jsx        ← Figma-ish canvas wrapper (don't ship; reference only)
├── colors_and_type.css      ← the EXISTING Cadence tokens, included so you can diff
├── fonts/
│   └── Inter-VariableFont_opsz_wght.ttf
└── bubblegum/               ← each screen as a standalone React component
    ├── bg-shared.jsx        ← palette, helpers, TabBar, AppHeader (start here)
    ├── bg-signin.jsx
    ├── bg-home.jsx
    ├── bg-setlist.jsx
    ├── bg-album.jsx
    ├── bg-study.jsx
    ├── bg-quiz.jsx          ← three states: default, correct (Encore!), wrong (Off-key)
    ├── bg-results.jsx
    ├── bg-progress.jsx
    ├── bg-empty-states.jsx  ← 5 components: signed-out, day 1, locked album, empty records, empty B-sides
    ├── bg-soundcheck.jsx
    ├── bg-backstage.jsx     ← settings
    ├── bg-motion.jsx        ← 4 animated demos: encore, donut, streak, shake
    └── bg-dark.jsx          ← Bubblegum Night (dark mode): 4 screens
```

**Open `Bubblegum App.html` in any modern browser.** It loads all components into a pan-and-zoom Design Canvas with 9 sections — drag artboards to compare, click any one for fullscreen focus.

---

## The two big ideas

### 1. Visual system: "Bubblegum"

**Palette** (replaces indigo-and-slate entirely)

| Name | Hex | Role |
|---|---|---|
| `cream` | `#fff7e0` | App body background, behind everything |
| `creamHi` | `#fffdf3` | Subtle alternate surface |
| `white` | `#ffffff` | Card surfaces (replaces `bg-white`) |
| `butter` | `#ffd66b` | Hero cards, primary stat panels |
| `peach` | `#ffaf95` | Streaks, focused links, hero accent |
| `mint` | `#a8e6b8` | Daily goal, success, "Encore" celebration |
| `sky` | `#a8d8ff` | "Up next" surface, info |
| `lavender` | `#cfb6ff` | Album / Notation card, nav avatar |
| `pink` | `#ffb3d9` | Soft accents, Scales album |
| `cherry` | `#ff7faf` | Headline highlights, wrong-answer accent |
| `plum` | `#3a224f` | **All text**, plum-pill primary CTAs |
| `plumSoft` | `#6b4a85` | Secondary text |
| `plumDim` | `#9d85b6` | Tertiary text, disabled, dim labels |
| `green` | `#27a059` | Success markers over pastels |
| `rose` | `#e84d6f` | Wrong-answer accent (warmer than `red-500`) |

**Rules**

- Background: cream + a subtle radial-gradient "bubble pattern" (see `bg-shared.jsx`, `bgBubblePattern`)
- Radius scale: **18–32px everywhere**. No sharp corners.
  - `rounded-3xl` (24px) for cards
  - `rounded-[32px]` for hero panels
  - `rounded-full` for pills, buttons, avatars
  - `rounded-2xl` (16px) for inputs only
- **No shadows on cards.** Flat pastel does the work. Soft shadow is allowed only on floating tab bar.
- **Plum is the only ink color.** All body text, labels, icons.
- **Numerals oversized + rotated −3°.** All XP / streak / score / level numerals are `font-black`, tabular-nums, and `transform: rotate(-3deg) inline-block`.
- **Wordmark glyph** `♩` is rotated `−10°`, color `peach`, font-family `serif`.
- **Highlight key words via butter/peach pill** behind the text (instead of italics/bold/underline).
- **Doodled note glyphs** (`♪ ♬ ♫ ♩`) scatter on hero backgrounds at low opacity, rotated 8–20°.
- **Eyebrows** use monospace UPPERCASE for the "venue marquee" feel.

### 2. Copy vocabulary: "Live Set"

Apply this rename **everywhere** the existing app uses the left column. The right column is the new copy.

| Cadence concept | Live Set copy |
|---|---|
| Level | **Track** (e.g. Track 06) |
| Streak | **Nights** |
| Daily goal | **Tonight's Set** |
| Topics / Courses index | **Setlist** |
| Course (Notation, Rhythm, …) | **Album** |
| Lessons in a course | **Tracks (A1, A2, B1, B2, …)** |
| Advanced / bonus content | **Encore** |
| Practice quiz | **Soundcheck** |
| Review (spaced repetition) | **B-Sides** |
| Achievements | **Records** (gold / platinum / etc.) |
| Score ≥ 90% | "Crowd's going wild!" + 🌟 STANDING OVATION |
| Score 70–89% | "Solid set!" + 👏 GREAT SET |
| Score 50–69% | "Almost there!" + 🎤 KEEP PLAYING |
| Score < 50% | "Tune up!" + 🎧 ENCORE LATER |
| Right answer | **"Encore!"** + 🎉 |
| Wrong answer | **"Off-key — close though!"** + 🎧 |
| Sign in (CTA) | "Take the stage →" |
| Sign in (hero) | "Get a backstage pass to save your set." |
| Settings page name | **Backstage** |
| Settings → Profile | **Performer card** |
| Settings → Set length | "Tonight's set length: 3 songs" |
| Settings → Dark mode | **House lights** |
| Settings → Sign out | **Leave the stage** |
| Settings → Reset data | **Wipe the setlist** |
| Empty B-sides | "All clear — nothing to rehearse." |
| Empty records | "No records yet — but tonight's the night." |
| Empty home (Day 1) | "Welcome, [name] 🎤 The stage is yours." |
| First track CTA | "Play your first track: [name]" |
| Streak reminder copy | "Last call — keep your nights lit." |
| Tip jar | "Drop a tip in the jar" (Ko-fi) |

**Tone overall:** still the friendly tutor, just with a venue's vocabulary. Never use the live-set language when it would be confusing — e.g. mid-quiz feedback says "It's actually G, not B" not "It's actually a G string." Music-theory terms stay clinical.

---

## Tailwind config additions

Add this `theme.extend` to `tailwind.config.js`. Existing `cadence` and `copper` palettes can stay (production code references them) but new components should use the `bubblegum` namespace.

```js
// tailwind.config.js (excerpt)
module.exports = {
  theme: {
    extend: {
      colors: {
        bubblegum: {
          cream:    '#fff7e0',
          'cream-hi': '#fffdf3',
          butter:   '#ffd66b',
          peach:    '#ffaf95',
          mint:     '#a8e6b8',
          sky:      '#a8d8ff',
          lavender: '#cfb6ff',
          pink:     '#ffb3d9',
          cherry:   '#ff7faf',
          plum:     '#3a224f',
          'plum-soft': '#6b4a85',
          'plum-dim':  '#9d85b6',
        },
        // dark-mode "night" surfaces — see Dark Mode section below
        night: {
          ink:    '#180e23',
          panel:  '#261735',
          panel2: '#34234a',
          'panel-hi': '#3d2b58',
          fg:     '#fff7e0',
          fg2:    '#d8c8e8',
          fg3:    '#a191b0',
          'fg-dim': '#6e5e80',
        },
      },
      borderRadius: {
        bubble: '32px',  // hero panels
      },
      backgroundImage: {
        'bubble-pattern': `radial-gradient(circle at 12% 18%, rgba(255,175,149,0.33) 0 8px, transparent 9px),
                           radial-gradient(circle at 78% 8%, rgba(168,230,184,0.33) 0 10px, transparent 11px),
                           radial-gradient(circle at 90% 70%, rgba(207,182,255,0.33) 0 12px, transparent 13px),
                           radial-gradient(circle at 6% 80%, rgba(168,216,255,0.33) 0 8px, transparent 9px),
                           radial-gradient(circle at 50% 40%, rgba(255,214,107,0.2) 0 6px, transparent 7px)`,
      },
      keyframes: {
        'bg-pop-in': {
          '0%':   { opacity: '0', transform: 'scale(.6) rotate(-12deg)' },
          '55%':  { opacity: '1', transform: 'scale(1.15) rotate(-3deg)' },
          '100%': { opacity: '1', transform: 'scale(1) rotate(-3deg)' },
        },
        'bg-rise': {
          '0%':   { opacity: '0', transform: 'translateY(60px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'bg-tick': {
          '0%':   { transform: 'scale(0) rotate(-30deg)' },
          '60%':  { transform: 'scale(1.3) rotate(8deg)' },
          '100%': { transform: 'scale(1) rotate(0deg)' },
        },
        'bg-shake': {
          '0%, 100%': { transform: 'translateX(0)' },
          '10%, 50%, 90%': { transform: 'translateX(-8px)' },
          '30%, 70%': { transform: 'translateX(8px)' },
        },
      },
      animation: {
        'bg-pop-in': 'bg-pop-in .5s cubic-bezier(.36,.07,.19,.97) both',
        'bg-rise':   'bg-rise .45s cubic-bezier(.36,.07,.19,.97) both',
        'bg-tick':   'bg-tick .35s cubic-bezier(.36,.07,.19,.97) both',
        'bg-shake':  'bg-shake .5s cubic-bezier(.36,.07,.19,.97)',
      },
    },
  },
};
```

---

## Screens — section by section

The HTML prototype is organized into 9 sections, in priority order:

### 01 — First impression
**`bg-signin.jsx` → BGSignIn**
First-run / signed-out landing. Hero headline "Learn music theory like **your next** **tour**" (cherry + butter pills behind highlighted words). Five Album pills below it. Primary CTA: "Take the stage →". Secondary: "I already have an account". Footer link: "Skip for now — browse without a backstage pass."

### 02 — Main tabs
**`bg-home.jsx` → BGHome** · The daily landing. Greeting → Tonight's Set hero (XP + nights + tonight progress) → 2-of-3 daily-goal mint card → Up Next sky card → 4-album setlist grid → B-Sides preview.

**`bg-setlist.jsx` → BGSetlist** · Browse-all-albums page. Title with butter highlight pill, filter chips (All / On tour / Almost done / Opening), six album cards including a locked Encore album. Each card shows icon, tagline, track count, progress bar.

**`bg-progress.jsx` → BGProgress** · Records tab. Three stat tiles (XP / track / nights) → 7-day XP bar graph → 2-column "Records" grid of trophies (earned + in-progress + locked).

### 03 — Album → Track flow
**`bg-album.jsx` → BGAlbum** · One album's detail. Lavender hero with album title + progress, then track list — A1/A2/A3 etc., with a "NOW" pill on the current track, dashed B1/B2 ahead, and a locked Encore ★ track at the bottom.

**`bg-study.jsx` → BGStudy** · The "key fact" card before a quiz. Heading with butter highlight pill ("the G line"), a stylised treble staff with the relevant line emphasized, an explainer in a peach-tinted block with a 💡, and a mint mnemonic card ("Every Good Boy Does Fine").

**`bg-quiz.jsx` → BGQuizDefault** · Quiz question, no answer yet. Progress dots header, treble staff, 4 options (F / A / G / B), disabled "Tap a note to answer" CTA.

### 04 — Feedback moments
**`bg-quiz.jsx` → BGQuizCorrect** · "Encore!" — mint bottom panel, big 🎉, "+15 XP · combo ×3 🔥", inline explanation, primary "Next track →" CTA.

**`bg-quiz.jsx` → BGQuizWrong** · "Off-key — close though!" — cherry-tinted bottom panel with a `border-top: 4px solid cherry`, 🎧 icon. Inline correction. Two secondary buttons: "💡 Show me the trick" and "Add to B-sides".

**`bg-results.jsx` → BGResults** · End-of-set celebration. STANDING OVATION mono eyebrow, "Crowd's going wild!", a 200×200 score donut with butter fill + counting-up number + sparkle decorations, 3-stat row (XP / Combo / Time), and a "New record unlocked" callout. Two CTAs: "Play next track →" + "Back to setlist".

### 05 — Empty + locked states
- **BGSignedOutHome** — alt Home. "Get a backstage pass to save your set." Browse-the-venue grid is still tappable.
- **BGFirstNightHome** — Day 1 Home. XP shows `0` (faded), big "Play your first track: The 5 Lines" CTA, "What's on the marquee" 3-column album preview, streak tease.
- **BGLockedAlbum** — locked Encore album. Hero is gated, then a checklist showing "1 of 5 albums done" with a strikethrough on the completed one. Below: blurred preview of locked tracks.
- **BGEmptyRecords** — three silhouette trophies, "No records yet — but tonight's the night.", 4-card preview of records to chase.
- **BGEmptyBSides** — mint hero "All clear — nothing to rehearse." + 1/2/3 explainer of how spaced repetition works.

### 06 — Soundcheck (practice quiz)
**`bg-soundcheck.jsx` → BGSoundcheck** · Practice tab landing. Big butter "Tonight's mix" quick-start hero, 4 mode tiles (Speed run / Endless / B-side fix / Hard mode — last is locked), a "Mix your own" card with album filter chips + length slider, a recent-sessions list with personal-best badge.

### 07 — Backstage (settings)
**`bg-backstage.jsx` → BGBackstage` · Settings. Performer-card hero (avatar + email + edit), then sectioned setting lists:
- **The show**: Set length, B-sides, Hard mode
- **The venue**: Audio, Confetti, House lights (dark mode), Language
- **Setlist reminders**: Showtime nudge, Streak saver, Weekly review
- **Tip jar** (Ko-fi)
- **The fine print**: Account, Privacy & terms, Send a postcard
- **Danger zone** (dashed cherry border): Wipe the setlist, Leave the stage

### 08 — Motion pass
**`bg-motion.jsx`** — four self-looping animations to spec the production motion:
- **MotionEncore** — full correct-answer choreography: option turns green → checkmark pops with `bg-tick` → 22-particle confetti burst from the option → "+15 XP ⭐" floats up and fades → mint celebration panel slides up with `bg-rise`.
- **MotionDonut** — score donut fills 0 → 92 over 1500ms with ease-out cubic, while the number counts up using `requestAnimationFrame`. Sparkles appear at the end.
- **MotionStreak** — daily goal arc fills 2/3 → 3/3, sparkle burst, streak number bumps 7 → 8 with `bg-streak-glow` pulse on the 🔥.
- **MotionShake** — wrong answer: the staff card and the wrong option both shake with `bg-shake`, then the correct option reveals with a "CORRECT" mono label and the cherry feedback panel slides up.

All curves use `cubic-bezier(0.36, 0.07, 0.19, 0.97)` — the existing Cadence bounce curve. The motion language doesn't change; only the celebration *amount* increases.

### 09 — Bubblegum Night (dark mode)
**`bg-dark.jsx`** — four screens (sign-in, home, encore quiz, backstage) in dark mode.

**The strategy is not to invert.** Background goes cream → deep plum (`#180e23` — warm dark, never blue-black). Cards become slightly-lighter plum panels (`#261735`). Pastels stay the same hue but become *glowing accents*: each colored card carries a `box-shadow: 0 0 40px -16px <accent>77`. The `♩` glyph and any peach text get a `drop-shadow(0 0 12px peach77)`. **Butter takes over the "paper" / primary-CTA role plum had in light mode**, with a butter glow ring. Primary text becomes cream (`#fff7e0`).

User toggles this from `Backstage › The venue › House lights`.

---

## State management

Nothing in this redesign changes app state. Everything currently in `useReducer`/`useState` stays. The vocabulary rename is a presentation-layer concern; XP numbers, course IDs, lesson progress, streak math, etc. all stay identical.

The only new pieces of state needed are:
- A theme preference (`light` / `night`) — likely already exists as `useDarkMode`. Rename the user-facing label to "House lights".
- (Optional, polish) A `motionPreference` for users who toggle `prefers-reduced-motion` — apply fallbacks on the four animations above.

---

## Design tokens — quick map

```css
/* Drop into src/index.css or use as Tailwind config (see above) */
:root {
  /* surfaces */
  --bg-cream:    #fff7e0;
  --bg-cream-hi: #fffdf3;
  --bg-white:    #ffffff;

  /* pastels */
  --bg-butter:   #ffd66b;
  --bg-peach:    #ffaf95;
  --bg-mint:     #a8e6b8;
  --bg-sky:      #a8d8ff;
  --bg-lavender: #cfb6ff;
  --bg-pink:     #ffb3d9;
  --bg-cherry:   #ff7faf;

  /* ink */
  --bg-plum:     #3a224f;
  --bg-plum-soft:#6b4a85;
  --bg-plum-dim: #9d85b6;

  /* state */
  --bg-green:    #27a059;
  --bg-rose:     #e84d6f;

  /* motion */
  --bg-spring:   cubic-bezier(0.36, 0.07, 0.19, 0.97);
}

/* night mode */
.dark, [data-theme="dark"] {
  --bg-ink:      #180e23;
  --bg-panel:    #261735;
  --bg-panel-2:  #34234a;
  --bg-panel-hi: #3d2b58;
  --bg-fg:       #fff7e0;
  --bg-fg-2:     #d8c8e8;
  --bg-fg-3:     #a191b0;
  --bg-fg-dim:   #6e5e80;
}
```

---

## Assets

**Fonts.** Already in production (`Inter` from Google Fonts at runtime, or self-hosted variable font as included here at `fonts/Inter-VariableFont_opsz_wght.ttf`). No new typeface.

**Icons.** All emoji (matches existing Cadence iconography). One new internal icon: the doodled `♩ ♪ ♬ ♫` glyphs rendered as `font-family: serif` for the hand-drawn feel.

**Notation.** The HTML prototype uses a stylised SVG of a treble staff. **Production must use VexFlow** (already a Cadence dependency) for real notation rendering. Match the color tokens — `plum` for light mode staff lines, `fg` for dark mode, with the highlighted line in `peach` and the highlighted note in `mint` (Encore) / `cherry` (Off-key) / `plum` (default).

**Logo / brand mark.** Reuse the existing `♩` (U+2669 QUARTER NOTE) glyph. Color it `peach` instead of `copper-500`. Rotate `−10°` everywhere.

**No new image assets.** All decoration is CSS gradients, SVG, and emoji.

---

## Implementation suggestion

1. **Phase 1 — Tokens.** Add the `bubblegum` and `night` palettes to `tailwind.config.js`. Replace any direct `bg-cadence-*` / `bg-slate-*` references in components you're about to update.
2. **Phase 2 — Shared primitives.** Reimplement these from `bg-shared.jsx` as proper React components in `src/components/bubblegum/`:
   - `<Wordmark>`, `<AppHeader back title>`, `<TabBar active>`, `<PrimaryButton>`, `<GhostButton>`, `<Pill>`, `<Mono>`, `<Eyebrow>`, `<CategoryChip>`, `<Doodle>`.
3. **Phase 3 — Replace existing screens, one route at a time.** Start with `Home` (highest traffic), then `Course Detail (Album)`, then `Quiz` (the 3 quiz states share most markup), then `Results`, then `Setlist (Learn)`, `Soundcheck (Practice)`, `B-Sides (Review)`, `Records (Progress)`, then `Backstage (Settings)`, then `Sign In`.
4. **Phase 4 — Empty + locked states.** Wire these as variants of their parent screens (`<BGHome variant="signedOut">`, `<BGHome variant="firstNight">`, etc.).
5. **Phase 5 — Motion.** The existing app uses **Framer Motion** + Tailwind keyframes + `canvas-confetti`. Reuse all of it:
   - Existing `bounceIn` → keep for entry; pair with the new `bg-pop-in` keyframe for the celebration moments.
   - Existing `canvas-confetti` colors → change to `[#ff7faf, #ffaf95, #ffd66b, #a8e6b8, #a8d8ff, #cfb6ff]` (the pastels).
   - The donut count-up: use `useMotionValue` + `useTransform` from Framer Motion instead of the prototype's `requestAnimationFrame`.
6. **Phase 6 — Copy.** Sweep every i18n string / hardcoded label against the vocabulary table above. This is its own PR.
7. **Phase 7 — Dark mode.** Plug into the existing `useDarkMode` hook. Rename the user-facing toggle to "House lights" inside Backstage.
8. **Phase 8 — Accessibility audit.** Verify `plum` (4.5:1+) on every pastel surface; `cherry` text on `peach` is the one combo that's marginal — use `plum` for body text on peach surfaces.

---

## Still open (good first follow-ups after the initial port)

- **VexFlow integration.** Replace the prototype's stylised SVG staffs with real VexFlow rendering using the new color tokens.
- **Accessibility audit.** Especially: night-mode glow rings need a non-glow fallback under `prefers-reduced-motion: reduce` or `prefers-contrast: more`.
- **Auth flow.** Email/password forms, OAuth buttons, password-reset. Not mocked in this bundle — design pass needed.
- **Edit performer card.** Tapping it on Backstage is a stub — needs name change, avatar pastel-color picker.
- **Night versions of remaining screens.** This bundle includes night versions of Sign In / Home / Quiz Encore / Backstage. Setlist, Album, Soundcheck, Records, Study, Empty states all need a night palette pass before ship.

---

## Reference

- Live design canvas (open in browser): `Bubblegum App.html`
- Existing design tokens (for diffing): `colors_and_type.css`
- Existing app source (for context): `sarahmorrisokeefe/cadence` @ `main`
- Existing app live: <https://cadence-music-theory.vercel.app>
