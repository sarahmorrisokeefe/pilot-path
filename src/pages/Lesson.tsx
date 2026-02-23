import { useEffect, useRef, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import confetti from 'canvas-confetti'
import { Layout } from '../components/layout/Layout'
import { ProgressBar } from '../components/ui/ProgressBar'
import { QuestionCard } from '../components/quiz/QuestionCard'
import { FeedbackPanel } from '../components/quiz/FeedbackPanel'
import { StudyCard } from '../components/quiz/StudyCard'
import { Button } from '../components/ui/Button'
import { getCourseById } from '../data/courses'
import { useProgress } from '../hooks/useProgress'
import { useQuiz } from '../hooks/useQuiz'
import type { QuizResults } from '../hooks/useQuiz'
import type { LessonSlide, Question } from '../types'

// ─── Derive study slides from questions ─────────────────────────────────────
// One slide per question — teaches the concept behind every quiz item.

function deriveSlidesFromQuestions(questions: Question[]): LessonSlide[] {
  return questions.map((q) => ({
    id: `${q.id}-slide`,
    topic: q.topic,
    explanation: q.explanation,
    // For true/false, "True"/"False" alone is meaningless — carry the question text
    // so the study card can show what the key fact is referring to.
    questionText: q.type === 'true-false' ? q.text : undefined,
    keyFact: q.options[q.correctAnswer],
    reference: q.reference,
  }))
}

// ─── Main component ──────────────────────────────────────────────────────────

export function Lesson() {
  const { courseId, moduleId, lessonId } = useParams<{
    courseId: string
    moduleId: string
    lessonId: string
  }>()
  const navigate = useNavigate()
  const { completeLesson } = useProgress()
  const resultRef = useRef<QuizResults | null>(null)
  const xpRef = useRef(0)

  // ── Phase state machine ──────────────────────────────────────────────────
  const [phase, setPhase] = useState<'study' | 'quiz' | 'results'>('study')
  const [slideIndex, setSlideIndex] = useState(0)

  const course = getCourseById(courseId ?? '')
  const mod = course?.modules.find((m) => m.id === moduleId)
  const lesson = mod?.lessons.find((l) => l.id === lessonId)

  // Build slides once (custom if provided, otherwise derived)
  const slides: LessonSlide[] = lesson
    ? (lesson.slides ?? deriveSlidesFromQuestions(lesson.questions))
    : []

  const handleComplete = (results: QuizResults) => {
    resultRef.current = results
    if (!course || !mod || !lesson) return
    const xp = completeLesson({
      courseId: course.id,
      moduleId: mod.id,
      lessonId: lesson.id,
      correctCount: results.correctCount,
      totalCount: results.totalCount,
      questions: lesson.questions,
      answers: results.answers,
    })
    xpRef.current = xp
    if (results.score === 100) {
      confetti({ particleCount: 120, spread: 80, origin: { y: 0.6 }, colors: ['#0ea5e9', '#22c55e', '#f59e0b'] })
    }
  }

  const quiz = useQuiz({
    questions: lesson?.questions ?? [],
    onComplete: handleComplete,
  })

  // ── Study slide navigation ───────────────────────────────────────────────

  const handleSlideNext = () => {
    if (slideIndex < slides.length - 1) {
      setSlideIndex((i) => i + 1)
    } else {
      // Last slide tapped — move to transition screen
      setSlideIndex(slides.length)
    }
  }

  const handleSlidePrev = () => {
    if (slideIndex > 0) setSlideIndex((i) => i - 1)
  }

  const handleSkipToQuiz = () => {
    setPhase('quiz')
  }

  const handleStartQuiz = () => {
    setPhase('quiz')
  }

  const handleReviewSlides = () => {
    setSlideIndex(0)
  }

  const handleRetry = () => {
    quiz.reset()
    setPhase('study')
    setSlideIndex(0)
    resultRef.current = null
    xpRef.current = 0
  }

  if (!course || !mod || !lesson) {
    return (
      <Layout title="Not Found" backPath={`/courses/${courseId}`} hideNav>
        <p className="text-center text-slate-500 mt-8">Lesson not found.</p>
      </Layout>
    )
  }

  // ── Completed screen ─────────────────────────────────────────────────────

  if (quiz.completed && resultRef.current) {
    const r = resultRef.current
    const isPerfect = r.score === 100
    const passed = r.score >= 70

    return (
      <Layout title="Lesson Complete!" hideNav>
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center py-8 space-y-5"
        >
          <div className="text-7xl">{isPerfect ? '🌟' : passed ? '✅' : '📖'}</div>
          <div>
            <h2 className="font-black text-3xl text-slate-900 dark:text-white">
              {isPerfect ? 'Perfect!' : passed ? 'Well Done!' : 'Keep Practicing!'}
            </h2>
            <p className="text-slate-500 dark:text-slate-400 mt-1">{lesson.title}</p>
          </div>

          {/* Score ring */}
          <div className="relative inline-flex items-center justify-center">
            <svg className="w-32 h-32 -rotate-90" viewBox="0 0 100 100">
              <circle cx="50" cy="50" r="40" fill="none" stroke="currentColor" className="text-slate-200 dark:text-slate-700" strokeWidth="8" />
              <circle
                cx="50" cy="50" r="40" fill="none"
                stroke={isPerfect ? '#22c55e' : passed ? '#0ea5e9' : '#f59e0b'}
                strokeWidth="8"
                strokeDasharray={`${2 * Math.PI * 40}`}
                strokeDashoffset={`${2 * Math.PI * 40 * (1 - r.score / 100)}`}
                strokeLinecap="round"
                className="transition-all duration-1000"
              />
            </svg>
            <div className="absolute text-center">
              <p className="text-3xl font-black text-slate-900 dark:text-white">{r.score}%</p>
              <p className="text-xs text-slate-500">{r.correctCount}/{r.totalCount} correct</p>
            </div>
          </div>

          <div className="bg-amber-50 dark:bg-amber-900/20 rounded-2xl p-4 border border-amber-200 dark:border-amber-700">
            <p className="text-amber-700 dark:text-amber-300 font-black text-2xl">+{xpRef.current} XP</p>
            {isPerfect && <p className="text-amber-600 dark:text-amber-400 text-xs mt-1">Includes +10 XP perfect score bonus! 🎯</p>}
          </div>

          <div className="space-y-3">
            <Button
              onClick={() => navigate(`/courses/${course.id}/modules/${mod.id}`)}
              variant="primary"
              fullWidth
              size="lg"
            >
              Back to Module
            </Button>
            <Button
              onClick={handleRetry}
              variant="secondary"
              fullWidth
            >
              Retry Lesson
            </Button>
          </div>
        </motion.div>
      </Layout>
    )
  }

  // ── Progress bar value ───────────────────────────────────────────────────
  const progressValue =
    phase === 'study'
      ? (slideIndex / Math.max(slides.length, 1)) * 100
      : quiz.progress

  return (
    <Layout
      title={lesson.title}
      backPath={`/courses/${course.id}/modules/${mod.id}`}
      hideNav
    >
      <div className="space-y-4">
        {/* Progress header */}
        <div className="flex items-center gap-3">
          <div className="flex-1">
            <ProgressBar value={progressValue} color={course.color} height="h-2.5" />
          </div>
          <span className="text-xs font-bold text-amber-500 whitespace-nowrap">
            ⭐ {lesson.xpReward} XP
          </span>
        </div>

        {/* ── STUDY PHASE ────────────────────────────────────────────── */}
        {phase === 'study' && slideIndex < slides.length && (
          <StudyCard
            slide={slides[slideIndex]}
            slideIndex={slideIndex}
            totalSlides={slides.length}
            onNext={handleSlideNext}
            onPrev={handleSlidePrev}
            onSkip={handleSkipToQuiz}
          />
        )}

        {/* ── TRANSITION SCREEN ──────────────────────────────────────── */}
        {phase === 'study' && slideIndex >= slides.length && (
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.25 }}
            className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-100 dark:border-slate-700 shadow-sm p-8 text-center space-y-5"
          >
            <div className="text-6xl">🎓</div>
            <div>
              <h2 className="font-black text-2xl text-slate-900 dark:text-white">
                Great work!
              </h2>
              <p className="text-slate-500 dark:text-slate-400 text-sm mt-2">
                You've reviewed all {slides.length} concept{slides.length !== 1 ? 's' : ''}.
                Ready to test your knowledge?
              </p>
            </div>
            <div className="space-y-3 pt-2">
              <button
                onClick={handleStartQuiz}
                className="w-full py-3.5 rounded-xl bg-sky-500 hover:bg-sky-600 active:bg-sky-700 text-white font-bold text-base transition-colors touch-manipulation focus:outline-none focus:ring-2 focus:ring-sky-400 focus:ring-offset-2"
              >
                🚀 Start Quiz
              </button>
              <button
                onClick={handleReviewSlides}
                className="w-full py-3 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 font-semibold text-sm hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors touch-manipulation"
              >
                ← Review Slides
              </button>
            </div>
          </motion.div>
        )}

        {/* ── QUIZ PHASE ─────────────────────────────────────────────── */}
        {phase === 'quiz' && (
          <>
            <QuestionCard
              question={quiz.currentQuestion}
              selectedAnswer={quiz.selectedAnswer}
              showFeedback={quiz.showFeedback}
              onSelect={quiz.selectAnswer}
              questionNumber={quiz.currentIndex + 1}
              totalQuestions={lesson.questions.length}
            />

            <AnimatePresence>
              {quiz.showFeedback && (
                <FeedbackPanel
                  question={quiz.currentQuestion}
                  isCorrect={quiz.isCorrect}
                  isLast={quiz.currentIndex === lesson.questions.length - 1}
                  onContinue={quiz.advance}
                />
              )}
            </AnimatePresence>
          </>
        )}
      </div>
    </Layout>
  )
}
