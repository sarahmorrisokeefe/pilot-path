import { useState, useMemo, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import confetti from 'canvas-confetti'
import { Layout } from '../components/layout/Layout'
import { Button } from '../components/ui/Button'
import { QuestionCard } from '../components/quiz/QuestionCard'
import { COURSES } from '../data/courses'
import { useQuiz, type QuizResults } from '../hooks/useQuiz'
import { useProgress } from '../hooks/useProgress'
import { shuffleArray, scoreToColor } from '../utils'
import type { Question } from '../types'

// ─── Question pool builder ──────────────────────────────────────────────────

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

// ─── Timer presets (seconds) ────────────────────────────────────────────────

const TIMER_PRESETS: Record<number, number> = {
  10: 5 * 60,
  25: 12 * 60,
  50: 25 * 60,
}

const QUESTION_COUNTS = [10, 25, 50] as const

// ─── Component ──────────────────────────────────────────────────────────────

export function PracticeTest() {
  const navigate = useNavigate()
  const { completeLesson } = useProgress()

  // ── Config state ──────────────────────────────────────────────────────────
  const [selectedCourses, setSelectedCourses] = useState<Set<string>>(new Set())
  const [questionCount, setQuestionCount] = useState<number>(10)
  const [timerEnabled, setTimerEnabled] = useState(false)
  const [started, setStarted] = useState(false)
  const [results, setResults] = useState<QuizResults | null>(null)

  // ── Build questions once when quiz starts ─────────────────────────────────
  const questions = useMemo(() => {
    if (!started) return []
    const pool = gatherQuestions(Array.from(selectedCourses))
    return shuffleArray(pool).slice(0, questionCount)
  }, [started, selectedCourses, questionCount])

  const handleComplete = useCallback((r: QuizResults) => {
    setResults(r)
    if (r.score >= 80) {
      confetti({ particleCount: 120, spread: 80, origin: { y: 0.6 }, colors: ['#2d3161', '#22c55e', '#f59e0b'] })
    }
  }, [])

  const quiz = useQuiz({ questions, onComplete: handleComplete })

  // ── Course toggle ─────────────────────────────────────────────────────────
  const toggleCourse = (id: string) => {
    setSelectedCourses((prev) => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })
  }

  // ── Topic breakdown for results ───────────────────────────────────────────
  const topicBreakdown = useMemo(() => {
    if (!results) return {}
    const breakdown: Record<string, { correct: number; total: number }> = {}
    questions.forEach((q, i) => {
      if (!breakdown[q.topic]) breakdown[q.topic] = { correct: 0, total: 0 }
      breakdown[q.topic].total++
      if (quiz.answers[i] === q.correctAnswer) breakdown[q.topic].correct++
    })
    return breakdown
  }, [results, questions, quiz.answers])

  const xpEarned = results ? Math.round((results.score / 100) * questionCount * 2) : 0

  // ─── Configuration Screen ─────────────────────────────────────────────────
  if (!started) {
    return (
      <Layout title="Practice Quiz">
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="space-y-5">
          {/* Topic selector */}
          <div>
            <h2 className="text-sm font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wide mb-3">
              Topics
            </h2>
            <div className="space-y-2">
              {COURSES.map((c) => {
                const isSelected = selectedCourses.has(c.id)
                return (
                  <button
                    key={c.id}
                    onClick={() => toggleCourse(c.id)}
                    className={`
                      w-full flex items-center gap-3 p-3.5 rounded-xl border-2 text-left
                      transition-all duration-150 touch-manipulation
                      ${isSelected
                        ? 'border-cadence-800 bg-cadence-50 dark:bg-cadence-900/30'
                        : 'border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-800 hover:border-cadence-300'}
                    `}
                  >
                    <div className={`w-10 h-10 ${c.bgGradient} rounded-xl flex items-center justify-center text-xl flex-shrink-0`}>
                      {c.icon}
                    </div>
                    <span className="font-semibold text-sm text-slate-900 dark:text-white flex-1">
                      {c.title}
                    </span>
                    <div
                      className={`w-5 h-5 rounded-md border-2 flex items-center justify-center transition-colors ${
                        isSelected
                          ? 'border-cadence-800 bg-cadence-800'
                          : 'border-slate-300 dark:border-slate-600'
                      }`}
                    >
                      {isSelected && (
                        <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                        </svg>
                      )}
                    </div>
                  </button>
                )
              })}
            </div>
          </div>

          {/* Question count */}
          <div>
            <h2 className="text-sm font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wide mb-3">
              Questions
            </h2>
            <div className="flex gap-2">
              {QUESTION_COUNTS.map((n) => (
                <button
                  key={n}
                  onClick={() => setQuestionCount(n)}
                  className={`
                    flex-1 py-3 rounded-xl border-2 text-sm font-bold transition-all touch-manipulation
                    ${questionCount === n
                      ? 'border-cadence-800 bg-cadence-50 dark:bg-cadence-900/30 text-cadence-800 dark:text-cadence-300'
                      : 'border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:border-cadence-300'}
                  `}
                >
                  {n}
                </button>
              ))}
            </div>
          </div>

          {/* Timer toggle */}
          <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-100 dark:border-slate-700 p-4 flex items-center justify-between">
            <div>
              <p className="font-semibold text-sm text-slate-900 dark:text-white">Timer</p>
              {timerEnabled && (
                <p className="text-xs text-slate-500 mt-0.5">
                  {Math.floor(TIMER_PRESETS[questionCount] / 60)} minutes
                </p>
              )}
            </div>
            <button
              onClick={() => setTimerEnabled((prev) => !prev)}
              className={`
                relative w-12 h-7 rounded-full transition-colors duration-200
                ${timerEnabled ? 'bg-cadence-800' : 'bg-slate-300 dark:bg-slate-600'}
              `}
            >
              <span
                className={`
                  absolute top-0.5 w-6 h-6 bg-white rounded-full shadow transition-transform duration-200
                  ${timerEnabled ? 'translate-x-5' : 'translate-x-0.5'}
                `}
              />
            </button>
          </div>

          {/* Start button */}
          <Button
            onClick={() => setStarted(true)}
            variant="primary"
            fullWidth
            size="lg"
            disabled={selectedCourses.size === 0}
          >
            {selectedCourses.size === 0 ? 'Select at least one topic' : `Start Quiz (${questionCount} questions)`}
          </Button>
        </motion.div>
      </Layout>
    )
  }

  // ─── Results Screen ───────────────────────────────────────────────────────
  if (quiz.completed && results) {
    return (
      <Layout title="Quiz Results" hideNav>
        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="space-y-5 py-4">
          <div className="text-center">
            <div className="text-6xl mb-3">{results.score >= 80 ? '🎉' : results.score >= 50 ? '📖' : '💪'}</div>
            <h2 className="font-black text-3xl text-slate-900 dark:text-white">
              {results.score >= 80 ? 'Great Job!' : results.score >= 50 ? 'Keep Going!' : 'Keep Practicing!'}
            </h2>
          </div>

          <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-100 dark:border-slate-700 p-5 text-center">
            <p className={`text-6xl font-black ${results.score >= 80 ? 'text-green-500' : results.score >= 50 ? 'text-amber-500' : 'text-red-500'}`}>
              {results.score}%
            </p>
            <p className="text-slate-500 text-sm mt-1">
              {results.correctCount} of {results.totalCount} correct
            </p>
            <div className="inline-flex items-center gap-1.5 mt-2 px-3 py-1 rounded-full text-sm font-bold bg-cadence-100 dark:bg-cadence-900/40 text-cadence-800 dark:text-cadence-300">
              +{xpEarned} XP earned
            </div>
          </div>

          {/* Topic breakdown */}
          <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-100 dark:border-slate-700 p-4">
            <h3 className="font-bold text-slate-900 dark:text-white text-sm mb-3">Score by Topic</h3>
            <div className="space-y-2.5">
              {Object.entries(topicBreakdown)
                .sort((a, b) => (a[1].correct / a[1].total) - (b[1].correct / b[1].total))
                .map(([topic, { correct, total }]) => {
                  const pct = Math.round((correct / total) * 100)
                  return (
                    <div key={topic}>
                      <div className="flex justify-between text-xs mb-1">
                        <span className="text-slate-600 dark:text-slate-300 font-medium">{topic}</span>
                        <span className={`font-bold ${scoreToColor(pct)}`}>{correct}/{total}</span>
                      </div>
                      <div className="h-1.5 bg-slate-100 dark:bg-slate-700 rounded-full overflow-hidden">
                        <div
                          className={`h-full rounded-full ${pct >= 80 ? 'bg-green-500' : pct >= 70 ? 'bg-amber-500' : 'bg-red-500'}`}
                          style={{ width: `${pct}%` }}
                        />
                      </div>
                    </div>
                  )
                })}
            </div>
          </div>

          <div className="space-y-2">
            <Button onClick={() => { setStarted(false); setResults(null) }} variant="secondary" fullWidth>
              New Quiz
            </Button>
            <Button onClick={() => navigate('/learn')} variant="primary" fullWidth>
              Back to Courses
            </Button>
          </div>
        </motion.div>
      </Layout>
    )
  }

  // ─── Quiz In Progress ─────────────────────────────────────────────────────
  if (questions.length === 0) {
    return (
      <Layout title="Practice Quiz">
        <div className="text-center py-12">
          <p className="text-slate-500 dark:text-slate-400">
            No questions available for the selected topics.
          </p>
          <Button onClick={() => setStarted(false)} variant="secondary" className="mt-4">
            Go Back
          </Button>
        </div>
      </Layout>
    )
  }

  return (
    <Layout title={`Practice Quiz`} hideNav>
      {/* Progress bar */}
      <div className="mb-4">
        <div className="h-2 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
          <div
            className="h-2 bg-cadence-800 rounded-full transition-all duration-300"
            style={{ width: `${quiz.progress}%` }}
          />
        </div>
      </div>

      <QuestionCard
        question={quiz.currentQuestion}
        selectedAnswer={quiz.selectedAnswer}
        showFeedback={quiz.showFeedback}
        onSelect={quiz.selectAnswer}
        questionNumber={quiz.currentIndex + 1}
        totalQuestions={questions.length}
      />

      {/* Feedback + advance */}
      {quiz.showFeedback && (
        <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="mt-4 space-y-3">
          <div
            className={`rounded-xl p-3 border ${
              quiz.isCorrect
                ? 'bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-700'
                : 'bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-700'
            }`}
          >
            <p className={`text-xs font-bold mb-1 ${quiz.isCorrect ? 'text-green-700 dark:text-green-300' : 'text-red-700 dark:text-red-300'}`}>
              {quiz.isCorrect ? 'Correct!' : 'Not quite'}
            </p>
            <p className="text-sm text-slate-600 dark:text-slate-300">
              {quiz.currentQuestion.explanation}
            </p>
          </div>
          <Button onClick={quiz.advance} variant="primary" fullWidth>
            {quiz.currentIndex === questions.length - 1 ? 'See Results' : 'Next Question'}
          </Button>
        </motion.div>
      )}
    </Layout>
  )
}
