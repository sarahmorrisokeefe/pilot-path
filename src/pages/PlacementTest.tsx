import { useCallback, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import {
  BubblegumLayout,
  Doodle,
  Mono,
  Eyebrow,
  PrimaryButton,
  GhostButton,
} from '../components/bubblegum'
import { QuizHeader, QuestionView } from '../components/bubblegum/quiz'
import { usePlacement } from '../hooks/usePlacement'
import type { PlacementResult } from '../types'
import { COURSES } from '../data/courses'
import { getAlbumTone, TONE_BG } from '../utils/bubblegum'

type Phase = 'welcome' | 'quiz' | 'results'

const TOTAL_QUESTIONS = 10
const LEVEL_LABELS = ['', 'Beginner', 'Elementary', 'Intermediate', 'Advanced', 'Expert'] as const

export function PlacementTest() {
  const navigate = useNavigate()
  const {
    currentQuestion,
    questionNumber,
    isComplete,
    answerQuestion,
    getResult,
    completePlacement,
    skipPlacement,
  } = usePlacement()

  const [phase, setPhase] = useState<Phase>('welcome')
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null)
  const [showFeedback, setShowFeedback] = useState(false)
  const [result, setResult] = useState<PlacementResult | null>(null)

  const handleSelect = useCallback(
    (index: number) => {
      if (showFeedback || !currentQuestion) return
      setSelectedAnswer(index)
      setShowFeedback(true)
      answerQuestion(currentQuestion.id, index === currentQuestion.correctAnswer)
    },
    [showFeedback, currentQuestion, answerQuestion]
  )

  const handleAdvance = useCallback(() => {
    if (!showFeedback) return
    setSelectedAnswer(null)
    setShowFeedback(false)
    if (isComplete) {
      setResult(getResult())
      setPhase('results')
    }
  }, [showFeedback, isComplete, getResult])

  const handleSkip = () => {
    skipPlacement()
    navigate('/learn')
  }

  const handleFinish = () => {
    completePlacement()
    navigate('/learn')
  }

  // ── Welcome ────────────────────────────────────────────────────────────────
  if (phase === 'welcome') {
    return (
      <BubblegumLayout hideHeader hideTabBar>
        <div className="relative -mx-5 flex min-h-[calc(100vh-2rem)] flex-col px-5 pt-2">
          <Doodle ch="♪" x={32} y={70}  size={32} rot={-15} color="#ffaf95" opacity={0.6} />
          <Doodle ch="♬" x={330} y={140} size={42} rot={12}  color="#cfb6ff" opacity={0.6} />
          <Doodle ch="✦" x={48} y={420}  size={22} color="#ff7faf" opacity={0.5} />

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            className="relative z-[1] mt-8 flex flex-col gap-5 text-center"
          >
            <div
              className="mx-auto flex h-24 w-24 -rotate-[6deg] items-center justify-center rounded-bubble bg-bubblegum-butter text-5xl"
              aria-hidden="true"
            >
              🎯
            </div>

            <div>
              <p className="text-[34px] font-black leading-[1.05] tracking-[-0.03em] text-bubblegum-plum dark:text-night-fg">
                Find your{' '}
                <span className="inline-block -rotate-[1deg] rounded-lg bg-bubblegum-peach px-2">
                  starting line
                </span>
              </p>
              <p className="mx-auto mt-3 max-w-[32ch] text-sm font-semibold text-bubblegum-plum-soft">
                Answer 10 quick questions so we can drop you on the right album.
                Takes a couple minutes.
              </p>
            </div>

            <div className="rounded-3xl bg-white p-4 text-left dark:bg-night-panel">
              {[
                { icon: '🧠', text: 'Questions adapt to your skill level' },
                { icon: '⏱️', text: 'About 2–3 minutes, no pressure' },
                { icon: '📊', text: 'Personalized album recommendation' },
              ].map((item) => (
                <div key={item.text} className="flex items-center gap-3 py-2">
                  <span
                    className="inline-block -rotate-[6deg] text-2xl leading-none"
                    aria-hidden="true"
                  >
                    {item.icon}
                  </span>
                  <p className="text-sm font-bold text-bubblegum-plum">{item.text}</p>
                </div>
              ))}
            </div>

            <div className="mt-2 flex flex-col gap-2">
              <PrimaryButton onClick={() => setPhase('quiz')}>
                Start placement →
              </PrimaryButton>
              <GhostButton onClick={handleSkip}>
                Skip — I'll explore on my own
              </GhostButton>
            </div>
          </motion.div>
        </div>
      </BubblegumLayout>
    )
  }

  // ── Results ────────────────────────────────────────────────────────────────
  if (phase === 'results' && result) {
    const recommended = COURSES[result.recommendedCourseIndex]
    const tone = recommended ? getAlbumTone(recommended.id, 'lavender') : 'lavender'
    const levelLabel = LEVEL_LABELS[result.skillLevel] ?? 'Beginner'

    return (
      <BubblegumLayout hideHeader hideTabBar>
        <div className="relative -mx-5 flex min-h-[calc(100vh-2rem)] flex-col px-5 pt-2">
          <Doodle ch="♪" x={28} y={70}  size={32} rot={-15} color="#ffaf95" opacity={0.55} />
          <Doodle ch="♬" x={330} y={60} size={40} rot={12}  color="#cfb6ff" opacity={0.55} />
          <Doodle ch="✦" x={350} y={300} size={22} color="#ff7faf" opacity={0.5} />

          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            className="relative z-[1] mt-8 flex flex-col gap-5"
          >
            <div className="text-center">
              <Mono size="sm" tone="cherry">🎉 PLACEMENT COMPLETE</Mono>
              <p className="mt-2 text-[34px] font-black leading-[1.05] tracking-[-0.03em] text-bubblegum-plum dark:text-night-fg">
                You're a{' '}
                <span className="inline-block -rotate-[1deg] rounded-lg bg-bubblegum-butter px-2">
                  {levelLabel}
                </span>
              </p>
              <p className="mt-2 text-sm font-semibold text-bubblegum-plum-soft">
                Scored {result.score}% on the placement set.
              </p>
            </div>

            {recommended && (
              <div>
                <Eyebrow>start your set here</Eyebrow>
                <div
                  className={`relative overflow-hidden rounded-3xl ${TONE_BG[tone]} p-5 text-bubblegum-plum`}
                >
                  <div className="flex items-center gap-3.5">
                    <div
                      className="flex h-[60px] w-[60px] flex-shrink-0 -rotate-[4deg] items-center justify-center rounded-[18px] bg-white text-[32px]"
                      aria-hidden="true"
                    >
                      {recommended.icon}
                    </div>
                    <div className="min-w-0 flex-1">
                      <Mono>album · recommended</Mono>
                      <p className="mt-0.5 text-lg font-black leading-tight">
                        {recommended.title}
                      </p>
                      <p className="mt-0.5 text-xs font-semibold text-bubblegum-plum-soft">
                        {recommended.description}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            <PrimaryButton onClick={handleFinish}>Open lessons →</PrimaryButton>
          </motion.div>
        </div>
      </BubblegumLayout>
    )
  }

  // ── Quiz ───────────────────────────────────────────────────────────────────
  if (!currentQuestion) {
    return (
      <BubblegumLayout hideHeader hideTabBar>
        <div className="mt-12 rounded-3xl bg-white p-6 text-center dark:bg-night-panel">
          <p className="text-3xl">🎧</p>
          <p className="mt-2 text-base font-black text-bubblegum-plum">Tuning up…</p>
        </div>
      </BubblegumLayout>
    )
  }

  const isCorrect = selectedAnswer === currentQuestion.correctAnswer
  const progressValue =
    (questionNumber - 1 + (showFeedback ? 1 : 0)) / TOTAL_QUESTIONS
  const isLast = questionNumber >= TOTAL_QUESTIONS

  return (
    <BubblegumLayout hideHeader hideTabBar>
      <QuizHeader
        progressValue={progressValue}
        stepLabel={`${questionNumber}/${TOTAL_QUESTIONS}`}
        onClose={handleSkip}
      />
      <QuestionView
        question={currentQuestion}
        selectedAnswer={selectedAnswer}
        showFeedback={showFeedback}
        isCorrect={isCorrect}
        isLast={isLast}
        onSelect={handleSelect}
        onContinue={handleAdvance}
      />
    </BubblegumLayout>
  )
}
