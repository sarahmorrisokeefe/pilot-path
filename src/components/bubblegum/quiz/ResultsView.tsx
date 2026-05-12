import { useEffect, useState, type ReactNode } from 'react'
import { animate, motion, useMotionValue, useTransform } from 'framer-motion'
import { Doodle } from '../Doodle'
import { Mono } from '../Mono'
import { PrimaryButton } from '../PrimaryButton'
import { GhostButton } from '../GhostButton'
import type { Question } from '../../../types'

export interface ResultsCopy {
  tag: string
  headline: string
  closingNudge: string
}

/** Live Set headline copy bands per the README results table. */
export function defaultResultsCopy(score: number): ResultsCopy {
  if (score >= 90) {
    return {
      tag: '🌟 STANDING OVATION',
      headline: "Crowd's going wild!",
      closingNudge: "🔥 Tomorrow's track is queued up.",
    }
  }
  if (score >= 70) {
    return {
      tag: '👏 GREAT SET',
      headline: 'Solid set!',
      closingNudge: '🔁 Misses saved to your B-sides.',
    }
  }
  if (score >= 50) {
    return {
      tag: '🎤 KEEP PLAYING',
      headline: 'Almost there!',
      closingNudge: '🔁 We saved the misses to your B-sides.',
    }
  }
  return {
    tag: '🎧 ENCORE LATER',
    headline: 'Tune up!',
    closingNudge: '🔁 Every flub joined your B-sides — try again soon.',
  }
}

export function bestStreak(
  answers: (number | null)[],
  questions: Question[]
): number {
  let best = 0
  let cur = 0
  for (let i = 0; i < answers.length; i++) {
    if (answers[i] === questions[i].correctAnswer) {
      cur += 1
      best = Math.max(best, cur)
    } else {
      cur = 0
    }
  }
  return best
}

export function formatTime(seconds: number): string {
  const m = Math.floor(seconds / 60)
  const s = seconds % 60
  return `${m}:${String(s).padStart(2, '0')}`
}

interface ResultsViewProps {
  score: number
  correctCount: number
  totalCount: number
  /** Seconds. Omit to hide the time tile. */
  timeTaken?: number
  /** Best consecutive-correct run. Omit to hide the tile. */
  bestRun?: number
  /** XP earned this session. */
  xpEarned: number
  /** Subtitle under the headline (e.g. lesson title or "Quick set"). */
  subtitle?: string
  /** Override the score-band copy. */
  copy?: ResultsCopy
  onPrimary: () => void
  primaryLabel: string
  onSecondary?: () => void
  secondaryLabel?: string
  onClose?: () => void
  /** Rendered between stats and CTAs — for topic breakdowns, new-record callouts, etc. */
  extras?: ReactNode
}

export function ResultsView({
  score,
  correctCount,
  totalCount,
  timeTaken,
  bestRun,
  xpEarned,
  subtitle,
  copy,
  onPrimary,
  primaryLabel,
  onSecondary,
  secondaryLabel,
  onClose,
  extras,
}: ResultsViewProps) {
  const c = copy ?? defaultResultsCopy(score)

  return (
    <div className="relative -mx-5 flex flex-1 flex-col">
      {/* Confetti doodles scattered behind everything */}
      <Doodle ch="♪" x={28} y={70} size={36} rot={-15} color="#ffaf95" opacity={0.55} />
      <Doodle ch="♬" x={330} y={60} size={42} rot={12} color="#cfb6ff" opacity={0.55} />
      <Doodle ch="♫" x={50} y={210} size={28} rot={-8} color="#a8e6b8" opacity={0.65} />
      <Doodle ch="♩" x={340} y={260} size={38} rot={18} color="#a8d8ff" opacity={0.6} />
      <Doodle ch="♪" x={30} y={400} size={26} rot={-20} color="#ffd66b" opacity={0.7} />
      <Doodle ch="✦" x={360} y={410} size={24} color="#ff7faf" opacity={0.5} />

      {onClose && (
        <div className="relative z-[1] flex items-center px-5 pt-2">
          <button
            type="button"
            onClick={onClose}
            aria-label="Close results"
            className="flex h-9 w-9 items-center justify-center rounded-full bg-white text-base font-black text-bubblegum-plum touch-manipulation"
          >
            ✕
          </button>
        </div>
      )}

      <div className="relative z-[1] flex-1 overflow-y-auto px-5 pt-2">
        <div className="text-center">
          <Mono size="sm" tone="cherry">{c.tag}</Mono>
          <p className="mt-2 text-[42px] font-black leading-none tracking-[-0.035em] text-bubblegum-plum">
            {c.headline}
          </p>
          {subtitle && (
            <p className="mt-1 text-sm font-semibold text-bubblegum-plum-soft">{subtitle}</p>
          )}
        </div>

        <ScoreDonut score={score} correctCount={correctCount} totalCount={totalCount} />

        <div className="mt-5 grid grid-cols-3 gap-2.5">
          <StatTile label="XP earned" value={`+${xpEarned}`} tone="butter" />
          {bestRun != null ? (
            <StatTile label="Best run" value={`×${bestRun}`} tone="peach" />
          ) : (
            <StatTile label="Score" value={`${score}%`} tone="peach" />
          )}
          {timeTaken != null ? (
            <StatTile label="Time on stage" value={formatTime(timeTaken)} tone="lavender" />
          ) : (
            <StatTile label="Correct" value={`${correctCount}/${totalCount}`} tone="lavender" />
          )}
        </div>

        {extras && <div className="mt-4">{extras}</div>}

        <div className="mt-6 flex flex-col gap-2">
          <PrimaryButton tone="plum" onClick={onPrimary}>{primaryLabel}</PrimaryButton>
          {onSecondary && secondaryLabel && (
            <GhostButton onClick={onSecondary}>{secondaryLabel}</GhostButton>
          )}
        </div>

        <p className="mt-5 mb-6 text-center text-xs font-bold text-bubblegum-plum-soft">
          {c.closingNudge}
        </p>
      </div>
    </div>
  )
}

function ScoreDonut({
  score,
  correctCount,
  totalCount,
}: {
  score: number
  correctCount: number
  totalCount: number
}) {
  const r = 42
  const C = 2 * Math.PI * r
  const dash = (score / 100) * C

  // Count-up: animate a motion value 0 → score in sync with the arc.
  const motionScore = useMotionValue(0)
  const rounded = useTransform(motionScore, (v) => Math.round(v))
  const [displayScore, setDisplayScore] = useState(0)
  useEffect(() => {
    const controls = animate(motionScore, score, {
      duration: 1.2,
      ease: [0.36, 0.07, 0.19, 0.97],
    })
    const unsub = rounded.on('change', setDisplayScore)
    return () => {
      controls.stop()
      unsub()
    }
  }, [score, motionScore, rounded])

  return (
    <div className="mt-6 flex justify-center">
      <div className="relative h-[200px] w-[200px]">
        <svg viewBox="0 0 100 100" width="200" height="200">
          <circle cx="50" cy="50" r={r} fill="none" stroke="#ffffff" strokeWidth="12" />
          <motion.circle
            cx="50"
            cy="50"
            r={r}
            fill="none"
            stroke="#ffd66b"
            strokeWidth="12"
            strokeLinecap="round"
            transform="rotate(-90 50 50)"
            strokeDasharray={`${dash} ${C}`}
            initial={{ strokeDasharray: `0 ${C}` }}
            animate={{ strokeDasharray: `${dash} ${C}` }}
            transition={{ duration: 1.2, ease: [0.36, 0.07, 0.19, 0.97] }}
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span
            className="inline-block font-black leading-[0.9] tabular-nums text-bubblegum-plum"
            style={{ fontSize: '64px', letterSpacing: '-0.04em', transform: 'rotate(-2deg)' }}
          >
            {displayScore}
          </span>
          <Mono>{correctCount}/{totalCount} correct</Mono>
        </div>
        <span
          className="absolute right-7 top-1.5 text-xl text-bubblegum-cherry"
          style={{ transform: 'rotate(20deg)' }}
          aria-hidden="true"
        >
          ✦
        </span>
        <span className="absolute bottom-5 -left-1 text-base text-bubblegum-peach" aria-hidden="true">
          ✦
        </span>
      </div>
    </div>
  )
}

function StatTile({
  label,
  value,
  tone,
}: {
  label: string
  value: string
  tone: 'butter' | 'peach' | 'lavender' | 'mint' | 'sky'
}) {
  const bg = {
    butter:   'bg-bubblegum-butter',
    peach:    'bg-bubblegum-peach',
    lavender: 'bg-bubblegum-lavender',
    mint:     'bg-bubblegum-mint',
    sky:      'bg-bubblegum-sky',
  }[tone]
  return (
    <div className={`rounded-[18px] ${bg} p-3 text-center`}>
      <Mono size="xs">{label}</Mono>
      <p
        className="mt-1 inline-block text-[22px] font-black leading-none tabular-nums text-bubblegum-plum"
        style={{ letterSpacing: '-0.02em' }}
      >
        {value}
      </p>
    </div>
  )
}
