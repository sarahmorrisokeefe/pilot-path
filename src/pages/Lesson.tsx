import { useRef, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import confetti from 'canvas-confetti'
import {
  BubblegumLayout,
  Doodle,
  Mono,
  PrimaryButton,
  GhostButton,
} from '../components/bubblegum'
import {
  QuizHeader,
  QuestionView,
  ResultsView,
  bestStreak,
} from '../components/bubblegum/quiz'
import { getCourseById } from '../data/courses'
import { useProgress } from '../hooks/useProgress'
import { useQuiz } from '../hooks/useQuiz'
import type { QuizResults } from '../hooks/useQuiz'
import type { LessonSlide, Question } from '../types'

const BUBBLEGUM_CONFETTI = ['#ff7faf', '#ffaf95', '#ffd66b', '#a8e6b8', '#a8d8ff', '#cfb6ff']

function deriveSlidesFromQuestions(questions: Question[]): LessonSlide[] {
  return questions.map((q) => ({
    id: `${q.id}-slide`,
    topic: q.topic,
    explanation: q.explanation,
    questionText: q.type === 'true-false' ? q.text : undefined,
    keyFact: q.options[q.correctAnswer],
    reference: q.reference,
  }))
}

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

  const [phase, setPhase] = useState<'study' | 'quiz'>('study')
  const [slideIndex, setSlideIndex] = useState(0)

  const course = getCourseById(courseId ?? '')
  const mod = course?.modules.find((m) => m.id === moduleId)
  const lesson = mod?.lessons.find((l) => l.id === lessonId)

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
    if (results.score >= 90) {
      confetti({
        particleCount: 120,
        spread: 80,
        origin: { y: 0.6 },
        colors: BUBBLEGUM_CONFETTI,
      })
    }
  }

  const quiz = useQuiz({
    questions: lesson?.questions ?? [],
    onComplete: handleComplete,
  })

  if (!course || !mod || !lesson) {
    return (
      <BubblegumLayout hideTabBar back title="Not found">
        <div className="mt-12 rounded-3xl bg-white p-6 text-center">
          <p className="text-3xl">🎧</p>
          <p className="mt-2 text-base font-black text-bubblegum-plum">Track not found.</p>
          <div className="mt-4">
            <PrimaryButton onClick={() => navigate(`/learn/${courseId ?? ''}`)}>
              Back to album →
            </PrimaryButton>
          </div>
        </div>
      </BubblegumLayout>
    )
  }

  if (quiz.completed && resultRef.current) {
    const r = resultRef.current
    return (
      <BubblegumLayout hideHeader hideTabBar>
        <ResultsView
          score={r.score}
          correctCount={r.correctCount}
          totalCount={r.totalCount}
          timeTaken={r.timeTaken}
          bestRun={bestStreak(r.answers, lesson.questions)}
          xpEarned={xpRef.current}
          subtitle={lesson.title}
          onPrimary={() => navigate(`/learn/${course.id}`)}
          primaryLabel="Play next track →"
          onSecondary={() => navigate('/learn')}
          secondaryLabel="Back to setlist"
          onClose={() => navigate(`/learn/${course.id}`)}
        />
      </BubblegumLayout>
    )
  }

  return (
    <BubblegumLayout hideHeader hideTabBar>
      <QuizHeader
        progressValue={
          phase === 'study'
            ? slideIndex / Math.max(slides.length, 1)
            : quiz.progress / 100
        }
        stepLabel={
          phase === 'study'
            ? `STUDY ${Math.min(slideIndex + 1, slides.length)}/${slides.length}`
            : `${quiz.currentIndex + 1}/${lesson.questions.length}`
        }
        onClose={() => navigate(`/learn/${course.id}/modules/${mod.id}`)}
      />

      {phase === 'study' && slideIndex < slides.length && (
        <StudyView
          slide={slides[slideIndex]}
          slideIndex={slideIndex}
          totalSlides={slides.length}
          onPrev={() => setSlideIndex((i) => Math.max(0, i - 1))}
          onNext={() => setSlideIndex((i) => i + 1)}
          onSkip={() => setPhase('quiz')}
          onStartQuiz={() => setPhase('quiz')}
          lessonTitle={lesson.title}
          xpReward={lesson.xpReward}
        />
      )}

      {phase === 'quiz' && (
        <QuestionView
          question={quiz.currentQuestion}
          selectedAnswer={quiz.selectedAnswer}
          showFeedback={quiz.showFeedback}
          isCorrect={quiz.isCorrect}
          isLast={quiz.currentIndex === lesson.questions.length - 1}
          onSelect={quiz.selectAnswer}
          onContinue={quiz.advance}
          xpReward={lesson.xpReward}
        />
      )}
    </BubblegumLayout>
  )
}

// ── Study slide ──────────────────────────────────────────────────────────────

function StudyView({
  slide,
  slideIndex,
  totalSlides,
  onPrev,
  onNext,
  onSkip,
  onStartQuiz,
  lessonTitle,
  xpReward,
}: {
  slide: LessonSlide
  slideIndex: number
  totalSlides: number
  onPrev: () => void
  onNext: () => void
  onSkip: () => void
  onStartQuiz: () => void
  lessonTitle: string
  xpReward: number
}) {
  const isLast = slideIndex === totalSlides - 1
  const isFirst = slideIndex === 0
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={slide.id}
        initial={{ opacity: 0, x: 18 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -18 }}
        transition={{ duration: 0.22 }}
        className="flex flex-col gap-4"
      >
        <div className="flex items-center justify-between">
          <Mono>study · {slide.topic}</Mono>
          <button
            type="button"
            onClick={onSkip}
            className="text-xs font-extrabold text-bubblegum-plum-soft underline touch-manipulation"
          >
            Skip to quiz →
          </button>
        </div>

        <div className="relative overflow-hidden rounded-3xl bg-white p-5">
          <Doodle ch="♪" x={18} y={14} size={18} rot={-15} color="#ffaf95" opacity={0.4} />

          {slide.questionText && (
            <p className="mb-3 text-sm font-semibold text-bubblegum-plum-soft">
              {slide.questionText}
            </p>
          )}

          <p className="text-[22px] font-black leading-[1.15] tracking-[-0.02em] text-bubblegum-plum">
            {lessonTitle}
          </p>

          <div className="mt-3 rounded-2xl bg-bubblegum-peach/30 p-3">
            <p className="flex items-start gap-2 text-sm font-semibold text-bubblegum-plum">
              <span className="text-base leading-none" aria-hidden="true">💡</span>
              <span>{slide.explanation}</span>
            </p>
          </div>

          {slide.keyFact && (
            <div className="mt-3 rounded-2xl bg-bubblegum-mint p-3">
              <Mono size="xs">key fact</Mono>
              <p className="mt-1 text-base font-black text-bubblegum-plum">{slide.keyFact}</p>
            </div>
          )}

          {slide.reference && (
            <p className="mt-3 text-[11px] font-semibold text-bubblegum-plum-dim">
              {slide.reference}
            </p>
          )}
        </div>

        <div className="flex items-center gap-2 pt-1">
          <GhostButton onClick={onPrev} disabled={isFirst} fullWidth={false}>
            ← Back
          </GhostButton>
          <div className="flex-1">
            {isLast ? (
              <PrimaryButton onClick={onStartQuiz}>Start quiz · +{xpReward} XP →</PrimaryButton>
            ) : (
              <PrimaryButton onClick={onNext}>
                Next ({slideIndex + 1}/{totalSlides}) →
              </PrimaryButton>
            )}
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  )
}

