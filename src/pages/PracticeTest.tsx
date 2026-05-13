import { useState, useMemo, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import confetti from 'canvas-confetti'
import {
  BubblegumLayout,
  Doodle,
  Mono,
  Eyebrow,
  Pill,
  PrimaryButton,
} from '../components/bubblegum'
import {
  QuizHeader,
  QuestionView,
  ResultsView,
  bestStreak,
} from '../components/bubblegum/quiz'
import { COURSES } from '../data/courses'
import { useQuiz, type QuizResults } from '../hooks/useQuiz'
import { shuffleArray } from '../utils'
import { getAlbumTone, TONE_BG } from '../utils/bubblegum'
import type { Question } from '../types'

const BUBBLEGUM_CONFETTI = ['#ff7faf', '#ffaf95', '#ffd66b', '#a8e6b8', '#a8d8ff', '#cfb6ff']

function gatherQuestions(courseIds: string[]): Question[] {
  const all: Question[] = []
  for (const id of courseIds) {
    const course = COURSES.find((c) => c.id === id)
    if (!course) continue
    for (const mod of course.modules) {
      for (const lesson of mod.lessons) {
        all.push(...lesson.questions)
      }
    }
  }
  return all
}

const QUESTION_COUNTS = [5, 15, 30] as const
const DEFAULT_LENGTH = 15

export function PracticeTest() {
  const navigate = useNavigate()

  const [selectedCourses, setSelectedCourses] = useState<Set<string>>(
    () => new Set(COURSES.map((c) => c.id))
  )
  const [questionCount, setQuestionCount] = useState<number>(DEFAULT_LENGTH)
  const [started, setStarted] = useState(false)
  const [results, setResults] = useState<QuizResults | null>(null)

  const questions = useMemo(() => {
    if (!started) return []
    const pool = gatherQuestions(Array.from(selectedCourses))
    return shuffleArray(pool).slice(0, questionCount)
  }, [started, selectedCourses, questionCount])

  const handleComplete = useCallback((r: QuizResults) => {
    setResults(r)
    if (r.score >= 80) {
      confetti({
        particleCount: 120,
        spread: 80,
        origin: { y: 0.6 },
        colors: BUBBLEGUM_CONFETTI,
      })
    }
  }, [])

  const quiz = useQuiz({ questions, onComplete: handleComplete })

  const toggleCourse = (id: string) => {
    setSelectedCourses((prev) => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })
  }

  const topicBreakdown = useMemo(() => {
    if (!results) return [] as { topic: string; correct: number; total: number; pct: number }[]
    const breakdown: Record<string, { correct: number; total: number }> = {}
    questions.forEach((q, i) => {
      if (!breakdown[q.topic]) breakdown[q.topic] = { correct: 0, total: 0 }
      breakdown[q.topic].total++
      if (quiz.answers[i] === q.correctAnswer) breakdown[q.topic].correct++
    })
    return Object.entries(breakdown)
      .map(([topic, v]) => ({
        topic,
        correct: v.correct,
        total: v.total,
        pct: Math.round((v.correct / v.total) * 100),
      }))
      .sort((a, b) => a.pct - b.pct)
  }, [results, questions, quiz.answers])

  const xpEarned = results
    ? Math.round((results.score / 100) * questionCount * 2)
    : 0

  const startQuickMix = () => {
    setSelectedCourses(new Set(COURSES.map((c) => c.id)))
    setQuestionCount(10)
    setStarted(true)
  }
  const startSpeedRun = () => {
    setSelectedCourses(new Set(COURSES.map((c) => c.id)))
    setQuestionCount(30)
    setStarted(true)
  }
  const startCustom = () => {
    if (selectedCourses.size === 0) return
    setStarted(true)
  }
  const resetToConfig = () => {
    setStarted(false)
    setResults(null)
    quiz.reset()
  }

  // ── Results ───────────────────────────────────────────────────────────────
  if (quiz.completed && results) {
    return (
      <BubblegumLayout hideHeader hideTabBar>
        <ResultsView
          score={results.score}
          correctCount={results.correctCount}
          totalCount={results.totalCount}
          timeTaken={results.timeTaken}
          bestRun={bestStreak(results.answers, questions)}
          xpEarned={xpEarned}
          subtitle="Soundcheck mix"
          onPrimary={resetToConfig}
          primaryLabel="Mix another set →"
          onSecondary={() => navigate('/')}
          secondaryLabel="Back to home"
          onClose={resetToConfig}
          extras={
            topicBreakdown.length > 0 ? <TopicBreakdown items={topicBreakdown} /> : null
          }
        />
      </BubblegumLayout>
    )
  }

  // ── In-progress ────────────────────────────────────────────────────────────
  if (started && questions.length > 0) {
    return (
      <BubblegumLayout hideHeader hideTabBar>
        <QuizHeader
          progressValue={quiz.progress / 100}
          stepLabel={`${quiz.currentIndex + 1}/${questions.length}`}
          onClose={resetToConfig}
        />
        <QuestionView
          question={quiz.currentQuestion}
          selectedAnswer={quiz.selectedAnswer}
          showFeedback={quiz.showFeedback}
          isCorrect={quiz.isCorrect}
          isLast={quiz.currentIndex === questions.length - 1}
          onSelect={quiz.selectAnswer}
          onContinue={quiz.advance}
        />
      </BubblegumLayout>
    )
  }

  if (started && questions.length === 0) {
    return (
      <BubblegumLayout activeTab="practice">
        <div className="mt-8 rounded-3xl bg-white dark:bg-night-panel p-6 text-center">
          <p className="text-3xl">🎧</p>
          <p className="mt-2 text-base font-black text-bubblegum-plum">
            No questions in the selected albums.
          </p>
          <div className="mt-4">
            <PrimaryButton onClick={resetToConfig}>Pick again →</PrimaryButton>
          </div>
        </div>
      </BubblegumLayout>
    )
  }

  // ── Soundcheck landing ─────────────────────────────────────────────────────
  return (
    <BubblegumLayout activeTab="practice">
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col gap-[18px] pt-1"
      >
        <div className="px-1">
          <p className="text-[28px] font-black leading-tight tracking-[-0.025em] text-bubblegum-plum dark:text-night-fg">
            <span className="inline-block -rotate-1 rounded-lg bg-bubblegum-peach px-2">
              Soundcheck
            </span>
          </p>
          <p className="mt-1.5 text-[13px] font-semibold text-bubblegum-plum-soft">
            Mix tracks from every album. Keep the chops sharp.
          </p>
        </div>

        {/* Quick-mix hero */}
        <button
          type="button"
          onClick={startQuickMix}
          className="relative overflow-hidden rounded-bubble bg-bubblegum-butter p-[22px] text-left text-bubblegum-plum transition-transform active:scale-[0.99] touch-manipulation"
        >
          <Doodle ch="♪" x={20} y={10} size={28} rot={-15} color="#ffaf95" />
          <Doodle ch="♬" x={290} y={8} size={42} rot={12} color="#ffaf95" opacity={0.5} />
          <Doodle ch="✦" x={310} y={130} size={22} color="#ff7faf" opacity={0.6} />

          <div className="flex items-start justify-between">
            <div className="min-w-0">
              <Mono>quick set · 10 songs</Mono>
              <p className="mt-1 text-[26px] font-black leading-[1.05] tracking-[-0.025em]">
                Tonight's mix
              </p>
              <p className="mt-1.5 max-w-[220px] text-[13px] font-semibold text-bubblegum-plum-soft">
                A random shuffle across every album — about 3 minutes.
              </p>
            </div>
            <span
              className="flex h-[60px] w-[60px] flex-shrink-0 -rotate-6 items-center justify-center rounded-full bg-bubblegum-plum text-xl font-black text-bubblegum-cream"
              aria-hidden="true"
            >
              ▶
            </span>
          </div>

          <div className="mt-3 flex flex-wrap gap-1.5">
            {COURSES.slice(0, 3).map((c) => (
              <Pill key={c.id} tone="white" size="sm">
                {c.icon} {c.shortTitle}
              </Pill>
            ))}
            <Pill tone="peach" size="sm">+20 XP</Pill>
          </div>
        </button>

        {/* Mode picker */}
        <div>
          <Eyebrow>pick your set 🎚</Eyebrow>
          <div className="grid grid-cols-2 gap-3">
            <ModeTile
              name="Speed run"
              icon="⚡"
              desc="30 questions · all albums"
              tone="cherry"
              onClick={startSpeedRun}
            />
            <ModeTile
              name="B-side fix"
              icon="🔁"
              desc="Just your stumbles"
              tone="mint"
              onClick={() => navigate('/review')}
            />
            <ModeTile name="Endless" icon="♾" desc="Until you flub" tone="lavender" locked />
            <ModeTile name="Hard mode" icon="🌶" desc="Encore-difficulty" tone="peach" locked />
          </div>
        </div>

        {/* Mix your own */}
        <div className="rounded-bubble bg-white dark:bg-night-panel p-5">
          <Eyebrow>mix your own 🎛</Eyebrow>

          <Mono size="xs">pull from these albums</Mono>
          <div className="mt-2 flex flex-wrap gap-1.5">
            {COURSES.map((c) => {
              const on = selectedCourses.has(c.id)
              const tone = getAlbumTone(c.id, 'lavender')
              return (
                <button
                  key={c.id}
                  type="button"
                  onClick={() => toggleCourse(c.id)}
                  className={`inline-flex items-center gap-1 rounded-full border-2 px-3.5 py-2 text-xs font-extrabold touch-manipulation transition-colors ${
                    on
                      ? `${TONE_BG[tone]} border-bubblegum-plum text-bubblegum-plum`
                      : 'border-transparent bg-bubblegum-cream-hi text-bubblegum-plum-dim dark:bg-night-panel-hi dark:text-night-fg-dim'
                  }`}
                >
                  <span
                    className={`text-base leading-none ${on ? '' : 'grayscale opacity-60'}`}
                    aria-hidden="true"
                  >
                    {c.icon}
                  </span>
                  {c.shortTitle}
                </button>
              )
            })}
          </div>

          <div className="mt-5">
            <div className="mb-2 flex items-baseline justify-between">
              <Mono size="xs">set length</Mono>
              <span className="font-mono text-sm font-black text-bubblegum-plum">
                {questionCount} songs
              </span>
            </div>
            <div className="flex gap-2">
              {QUESTION_COUNTS.map((n) => {
                const active = n === questionCount
                return (
                  <button
                    key={n}
                    type="button"
                    onClick={() => setQuestionCount(n)}
                    className={`flex-1 rounded-full py-2.5 text-sm font-extrabold transition-colors touch-manipulation ${
                      active
                        ? 'bg-bubblegum-plum text-bubblegum-cream dark:bg-bubblegum-butter dark:text-bubblegum-plum'
                        : 'bg-bubblegum-cream-hi text-bubblegum-plum dark:bg-night-panel-hi dark:text-night-fg'
                    }`}
                  >
                    {n}
                  </button>
                )
              })}
            </div>
          </div>

          <div className="mt-5">
            <PrimaryButton onClick={startCustom} disabled={selectedCourses.size === 0}>
              {selectedCourses.size === 0
                ? 'Pick at least one album'
                : `Start your mix · ${questionCount} songs →`}
            </PrimaryButton>
          </div>
        </div>
      </motion.div>
    </BubblegumLayout>
  )
}

interface ModeTileProps {
  name: string
  icon: string
  desc: string
  tone: 'cherry' | 'mint' | 'lavender' | 'peach'
  locked?: boolean
  onClick?: () => void
}

const MODE_TONE_BG: Record<ModeTileProps['tone'], string> = {
  cherry:   'bg-bubblegum-cherry/30',
  mint:     'bg-bubblegum-mint',
  lavender: 'bg-bubblegum-lavender',
  peach:    'bg-bubblegum-peach',
}

function ModeTile({ name, icon, desc, tone, locked = false, onClick }: ModeTileProps) {
  return (
    <button
      type="button"
      onClick={locked ? undefined : onClick}
      disabled={locked}
      className={`relative rounded-[22px] p-4 text-left text-bubblegum-plum ${MODE_TONE_BG[tone]} ${
        locked ? 'cursor-not-allowed opacity-55' : 'touch-manipulation transition-transform active:scale-[0.98]'
      }`}
    >
      <div
        className="mb-1 inline-block -rotate-6 text-[32px] leading-none"
        aria-hidden="true"
      >
        {icon}
      </div>
      <p className="text-[15px] font-black tracking-tight">{name}</p>
      <p className="mt-0.5 text-[11px] font-bold text-bubblegum-plum-soft">{desc}</p>
      {locked && (
        <span
          className="absolute right-3 top-3 flex h-6 w-6 items-center justify-center rounded-full bg-bubblegum-plum text-xs text-bubblegum-cream"
          aria-hidden="true"
        >
          🔒
        </span>
      )}
    </button>
  )
}

function TopicBreakdown({
  items,
}: {
  items: { topic: string; correct: number; total: number; pct: number }[]
}) {
  return (
    <div className="rounded-3xl bg-white dark:bg-night-panel p-4">
      <Eyebrow>score by topic</Eyebrow>
      <div className="mt-1 flex flex-col gap-2.5">
        {items.map(({ topic, correct, total, pct }) => {
          const bar = pct >= 80 ? 'bg-bubblegum-green' : pct >= 60 ? 'bg-bubblegum-butter' : 'bg-bubblegum-cherry'
          return (
            <div key={topic}>
              <div className="mb-1 flex items-baseline justify-between">
                <span className="text-xs font-bold text-bubblegum-plum">{topic}</span>
                <Mono size="xs" tone={pct >= 80 ? 'plum' : pct >= 60 ? 'plum-soft' : 'cherry'}>
                  {correct}/{total} · {pct}%
                </Mono>
              </div>
              <div className="h-1.5 overflow-hidden rounded-full bg-bubblegum-cream-hi">
                <div className={`h-full rounded-full ${bar}`} style={{ width: `${pct}%` }} />
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
