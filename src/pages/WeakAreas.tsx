import { useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import confetti from 'canvas-confetti'
import {
  BubblegumLayout,
  Doodle,
  Mono,
  Eyebrow,
  PrimaryButton,
  CategoryChip,
} from '../components/bubblegum'
import {
  QuizHeader,
  QuestionView,
  ResultsView,
  bestStreak,
} from '../components/bubblegum/quiz'
import { useProgress } from '../hooks/useProgress'
import { getTopWeakAreas, shuffleArray } from '../utils'
import { getCourseById } from '../data/courses'
import type { Question } from '../types'

const BUBBLEGUM_CONFETTI = ['#ff7faf', '#ffaf95', '#ffd66b', '#a8e6b8', '#a8d8ff', '#cfb6ff']

export function WeakAreas() {
  const { progress } = useProgress()
  const navigate = useNavigate()
  const weakAreas = useMemo(() => getTopWeakAreas(progress, 30), [progress])

  const [quizMode, setQuizMode] = useState(false)
  const [questions, setQuestions] = useState<Question[]>([])
  const [answers, setAnswers] = useState<(number | null)[]>([])
  const [currentIndex, setCurrentIndex] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null)
  const [showFeedback, setShowFeedback] = useState(false)
  const [startMs, setStartMs] = useState(0)
  const [done, setDone] = useState(false)

  const startReview = () => {
    const qs: Question[] = []
    for (const wa of weakAreas) {
      const course = getCourseById(wa.courseId)
      if (!course) continue
      const mod = course.modules.find((m) => m.id === wa.moduleId)
      if (!mod) continue
      const lesson = mod.lessons.find((l) => l.id === wa.lessonId)
      if (!lesson) continue
      const q = lesson.questions.find((qq) => qq.id === wa.questionId)
      if (q) qs.push(q)
    }
    const picked = shuffleArray(qs).slice(0, 20)
    setQuestions(picked)
    setAnswers(Array(picked.length).fill(null))
    setCurrentIndex(0)
    setSelectedAnswer(null)
    setShowFeedback(false)
    setDone(false)
    setStartMs(Date.now())
    setQuizMode(true)
  }

  const exitToList = () => {
    setQuizMode(false)
    setDone(false)
  }

  const onSelect = (idx: number) => {
    if (showFeedback) return
    setSelectedAnswer(idx)
    setShowFeedback(true)
    setAnswers((prev) => {
      const next = [...prev]
      next[currentIndex] = idx
      return next
    })
  }

  const advance = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex((i) => i + 1)
      setSelectedAnswer(null)
      setShowFeedback(false)
    } else {
      setDone(true)
      const correct = answers.filter((a, i) => a === questions[i]?.correctAnswer).length
      const score = Math.round((correct / questions.length) * 100)
      if (score >= 80) {
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 },
          colors: BUBBLEGUM_CONFETTI,
        })
      }
    }
  }

  // ── Done — celebration ────────────────────────────────────────────────────
  if (quizMode && done) {
    const correct = answers.filter((a, i) => a === questions[i]?.correctAnswer).length
    const total = questions.length
    const score = Math.round((correct / total) * 100)
    const timeTaken = Math.round((Date.now() - startMs) / 1000)
    return (
      <BubblegumLayout hideHeader hideTabBar>
        <ResultsView
          score={score}
          correctCount={correct}
          totalCount={total}
          timeTaken={timeTaken}
          bestRun={bestStreak(answers, questions)}
          xpEarned={0}
          subtitle="B-sides rehearsal"
          onPrimary={startReview}
          primaryLabel="Rehearse again →"
          onSecondary={exitToList}
          secondaryLabel="Back to B-sides"
          onClose={exitToList}
        />
      </BubblegumLayout>
    )
  }

  // ── In-progress ────────────────────────────────────────────────────────────
  if (quizMode && questions.length > 0) {
    const isCorrect = selectedAnswer === questions[currentIndex]?.correctAnswer
    const progressValue = (currentIndex + (showFeedback ? 1 : 0)) / questions.length
    return (
      <BubblegumLayout hideHeader hideTabBar>
        <QuizHeader
          progressValue={progressValue}
          stepLabel={`${currentIndex + 1}/${questions.length}`}
          onClose={exitToList}
        />
        <QuestionView
          question={questions[currentIndex]}
          selectedAnswer={selectedAnswer}
          showFeedback={showFeedback}
          isCorrect={isCorrect}
          isLast={currentIndex === questions.length - 1}
          onSelect={onSelect}
          onContinue={advance}
        />
      </BubblegumLayout>
    )
  }

  // ── Empty state — BGEmptyBSides ────────────────────────────────────────────
  if (weakAreas.length === 0) {
    return (
      <BubblegumLayout activeTab="review">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col gap-[18px] pt-1"
        >
          <div className="px-1">
            <p className="text-[28px] font-black leading-tight tracking-[-0.025em] text-bubblegum-plum">
              <span
                className="inline-block rounded-lg bg-bubblegum-cherry/40 px-2"
                style={{ transform: 'rotate(-1deg)' }}
              >
                B-sides
              </span>
            </p>
            <p className="mt-1.5 text-[13px] font-semibold text-bubblegum-plum-soft">
              The tracks you flub get queued here for a redo.
            </p>
          </div>

          {/* All clear hero */}
          <div className="relative overflow-hidden rounded-3xl bg-bubblegum-mint px-6 py-9 text-center">
            <Doodle ch="✦" x={30} y={20} size={18} color="#3a224f" opacity={0.2} />
            <Doodle ch="✦" x={310} y={26} size={22} color="#3a224f" opacity={0.2} />
            <Doodle ch="♪" x={50} y={200} size={26} rot={-15} color="#3a224f" opacity={0.2} />
            <Doodle ch="♬" x={300} y={210} size={30} rot={12} color="#3a224f" opacity={0.2} />

            <div
              className="inline-block text-[80px] leading-none"
              style={{ transform: 'rotate(-8deg)' }}
              aria-hidden="true"
            >
              🎯
            </div>
            <p className="mt-2.5 text-[26px] font-black leading-[1.1] tracking-[-0.025em] text-bubblegum-plum">
              All clear —
              <br />
              <span className="text-bubblegum-green">nothing to rehearse.</span>
            </p>
            <p className="mx-auto mt-3 max-w-[28ch] text-[13px] font-semibold leading-relaxed text-bubblegum-plum/85">
              You haven't missed a note. Keep this up and you'll never see a B-side here — but if you
              flub one, it'll show up for a quick redo a few days later.
            </p>
          </div>

          {/* How it works */}
          <div className="rounded-3xl bg-white p-4">
            <Eyebrow>how b-sides work</Eyebrow>
            <div className="mt-1 flex flex-col gap-3">
              {[
                ['1', 'peach', 'You flub a note in a quiz', 'It quietly joins your B-sides list.'],
                ['2', 'butter', 'A few days later it resurfaces', 'Spaced repetition — when forgetting starts to set in.'],
                ['3', 'mint', 'Nail it twice in a row', 'Off the list, into long-term memory.'],
              ].map(([n, tone, h, d]) => (
                <div key={n} className="flex gap-3">
                  <div
                    className={`flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full font-mono text-sm font-black text-bubblegum-plum ${
                      tone === 'peach' ? 'bg-bubblegum-peach'
                      : tone === 'butter' ? 'bg-bubblegum-butter'
                      : 'bg-bubblegum-mint'
                    }`}
                    aria-hidden="true"
                  >
                    {n}
                  </div>
                  <div>
                    <p className="text-[13px] font-black text-bubblegum-plum">{h}</p>
                    <p className="mt-0.5 text-xs font-semibold leading-relaxed text-bubblegum-plum-soft">
                      {d}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <button
            type="button"
            onClick={() => navigate('/practice')}
            className="mt-1 text-center text-xs font-bold text-bubblegum-plum-soft underline touch-manipulation"
          >
            Looking to practice anyway? Try Soundcheck →
          </button>
        </motion.div>
      </BubblegumLayout>
    )
  }

  // ── List of weak areas ─────────────────────────────────────────────────────
  return (
    <BubblegumLayout activeTab="review">
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col gap-[18px] pt-1"
      >
        <div className="px-1">
          <p className="text-[28px] font-black leading-tight tracking-[-0.025em] text-bubblegum-plum">
            <span
              className="inline-block rounded-lg bg-bubblegum-cherry/40 px-2"
              style={{ transform: 'rotate(-1deg)' }}
            >
              B-sides
            </span>
          </p>
          <p className="mt-1.5 text-[13px] font-semibold text-bubblegum-plum-soft">
            {weakAreas.length} track{weakAreas.length === 1 ? '' : 's'} queued for a redo.
          </p>
        </div>

        {/* Start rehearsal hero */}
        <div className="relative overflow-hidden rounded-bubble bg-bubblegum-peach p-[22px] text-bubblegum-plum">
          <Doodle ch="♪" x={20} y={10} size={28} rot={-15} color="#3a224f" opacity={0.2} />
          <Doodle ch="🔁" x={290} y={18} size={32} rot={12} color="#3a224f" opacity={0.4} />

          <Mono>tonight's rehearsal · {Math.min(weakAreas.length, 20)} songs</Mono>
          <p className="mt-1 text-[24px] font-black leading-[1.05] tracking-[-0.025em]">
            Run the B-sides
          </p>
          <p className="mt-1.5 max-w-[28ch] text-[13px] font-semibold text-bubblegum-plum/80">
            Just the tracks you've flubbed. Nail one twice to retire it.
          </p>
          <div className="mt-4">
            <PrimaryButton tone="plum" onClick={startReview}>
              Start the rehearsal →
            </PrimaryButton>
          </div>
        </div>

        {/* Weak-area cards */}
        <div className="flex flex-col gap-2">
          <Eyebrow>tracks queued 🔁</Eyebrow>
          {weakAreas.map((wa, idx) => (
            <motion.div
              key={wa.questionId}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.03 }}
              className="rounded-2xl bg-white p-3.5"
            >
              <div className="flex items-start gap-2">
                <CategoryChip tone="cherry">{wa.topic}</CategoryChip>
                <Mono size="xs" tone="cherry">
                  ✕ {wa.incorrectCount}×
                </Mono>
              </div>
              <p className="mt-2 line-clamp-2 text-sm font-bold leading-snug text-bubblegum-plum">
                {wa.questionText}
              </p>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </BubblegumLayout>
  )
}
