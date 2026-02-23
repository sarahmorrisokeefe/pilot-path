import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import confetti from 'canvas-confetti'
import { Layout } from '../components/layout/Layout'
import { QuestionCard } from '../components/quiz/QuestionCard'
import { FeedbackPanel } from '../components/quiz/FeedbackPanel'
import { ProgressBar } from '../components/ui/ProgressBar'
import { Badge } from '../components/ui/Badge'
import { Button } from '../components/ui/Button'
import { useProgress } from '../hooks/useProgress'
import { getTopWeakAreas, shuffleArray } from '../utils'
import { getCourseById } from '../data/courses'
import type { Question } from '../types'

export function WeakAreas() {
  const { progress } = useProgress()
  const weakAreas = getTopWeakAreas(progress, 30)
  const [quizMode, setQuizMode] = useState(false)
  const [questions, setQuestions] = useState<Question[]>([])
  const [currentIndex, setCurrentIndex] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null)
  const [showFeedback, setShowFeedback] = useState(false)
  const [correct, setCorrect] = useState(0)
  const [done, setDone] = useState(false)

  const startReview = () => {
    // Build question objects from weak areas
    const qs: Question[] = []
    for (const wa of weakAreas) {
      const course = getCourseById(wa.courseId)
      if (!course) continue
      const mod = course.modules.find((m) => m.id === wa.moduleId)
      if (!mod) continue
      const lesson = mod.lessons.find((l) => l.id === wa.lessonId)
      if (!lesson) continue
      const q = lesson.questions.find((q) => q.id === wa.questionId)
      if (q) qs.push(q)
    }
    setQuestions(shuffleArray(qs).slice(0, 20))
    setCurrentIndex(0)
    setSelectedAnswer(null)
    setShowFeedback(false)
    setCorrect(0)
    setDone(false)
    setQuizMode(true)
  }

  const selectAnswer = (idx: number) => {
    if (showFeedback) return
    setSelectedAnswer(idx)
    setShowFeedback(true)
    if (idx === questions[currentIndex].correctAnswer) {
      setCorrect((c) => c + 1)
    }
  }

  const advance = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex((i) => i + 1)
      setSelectedAnswer(null)
      setShowFeedback(false)
    } else {
      setDone(true)
      if (correct / questions.length >= 0.8) {
        confetti({ particleCount: 100, spread: 70, origin: { y: 0.6 } })
      }
    }
  }

  // Quiz done screen
  if (quizMode && done) {
    const score = Math.round((correct / questions.length) * 100)
    return (
      <Layout title="Review Complete!">
        <div className="text-center py-8 space-y-5">
          <div className="text-6xl">{score >= 80 ? '🎉' : '📖'}</div>
          <h2 className="font-black text-3xl text-slate-900 dark:text-white">{score}%</h2>
          <p className="text-slate-500">{correct}/{questions.length} correct</p>
          <div className="space-y-3">
            <Button onClick={startReview} variant="primary" fullWidth>Review Again</Button>
            <Button onClick={() => setQuizMode(false)} variant="secondary" fullWidth>Back to Weak Areas</Button>
          </div>
        </div>
      </Layout>
    )
  }

  // Quiz mode
  if (quizMode && questions.length > 0) {
    const progress2 = ((currentIndex + (showFeedback ? 1 : 0)) / questions.length) * 100
    const isCorrect = selectedAnswer === questions[currentIndex].correctAnswer
    return (
      <Layout title="Weak Areas Review" hideNav>
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <div className="flex-1">
              <ProgressBar value={progress2} color="bg-amber-500" height="h-2.5" />
            </div>
            <span className="text-xs font-bold text-amber-500 whitespace-nowrap">🎯 Review</span>
          </div>
          <QuestionCard
            question={questions[currentIndex]}
            selectedAnswer={selectedAnswer}
            showFeedback={showFeedback}
            onSelect={selectAnswer}
            questionNumber={currentIndex + 1}
            totalQuestions={questions.length}
          />
          <AnimatePresence>
            {showFeedback && (
              <FeedbackPanel
                question={questions[currentIndex]}
                isCorrect={isCorrect}
                isLast={currentIndex === questions.length - 1}
                onContinue={advance}
              />
            )}
          </AnimatePresence>
        </div>
      </Layout>
    )
  }

  // Empty state
  if (weakAreas.length === 0) {
    return (
      <Layout title="Weak Areas">
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="text-center py-16 space-y-3">
          <div className="text-6xl">🎯</div>
          <h2 className="font-black text-2xl text-slate-900 dark:text-white">No weak areas yet!</h2>
          <p className="text-slate-500 dark:text-slate-400 text-sm max-w-xs mx-auto">
            Complete some lessons and any topics you miss will show up here for targeted review.
          </p>
        </motion.div>
      </Layout>
    )
  }

  // List view
  return (
    <Layout title="Weak Areas">
      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="space-y-4">
        <div className="flex items-center justify-between">
          <p className="text-slate-500 dark:text-slate-400 text-sm">
            {weakAreas.length} topic{weakAreas.length !== 1 ? 's' : ''} flagged for review
          </p>
          <Button onClick={startReview} variant="primary" size="sm">
            🎯 Start Review
          </Button>
        </div>

        <div className="space-y-3">
          {weakAreas.map((wa, idx) => (
            <motion.div
              key={wa.questionId}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.04 }}
              className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-100 dark:border-slate-700 p-4"
            >
              <div className="flex items-start justify-between gap-2">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <Badge variant="amber">{wa.topic}</Badge>
                    <span className="text-xs text-red-500 font-semibold">
                      ✗ {wa.incorrectCount}×
                    </span>
                  </div>
                  <p className="text-sm text-slate-700 dark:text-slate-300 line-clamp-2 leading-snug">
                    {wa.questionText}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <Button onClick={startReview} variant="primary" fullWidth size="lg">
          🎯 Review All Weak Areas
        </Button>
      </motion.div>
    </Layout>
  )
}
