import { useState, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Layout } from '../components/layout/Layout'
import { Button } from '../components/ui/Button'
import { usePlacement } from '../hooks/usePlacement'
import { COURSES } from '../data/courses'

type Phase = 'welcome' | 'quiz' | 'results'

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
  const [result, setResult] = useState<ReturnType<typeof getResult> | null>(null)

  const optionLetters = ['A', 'B', 'C', 'D']

  const handleSelect = useCallback(
    (index: number) => {
      if (showFeedback || !currentQuestion) return
      setSelectedAnswer(index)
      setShowFeedback(true)

      const correct = index === currentQuestion.correctAnswer
      answerQuestion(currentQuestion.id, correct)

      // Auto-advance after a short delay
      setTimeout(() => {
        setSelectedAnswer(null)
        setShowFeedback(false)
        // Check completion after state updates
      }, 1200)
    },
    [showFeedback, currentQuestion, answerQuestion]
  )

  // Transition to results when complete
  if (phase === 'quiz' && isComplete && !showFeedback && !result) {
    const r = getResult()
    setResult(r)
    setPhase('results')
  }

  const handleSkip = () => {
    skipPlacement()
    navigate('/learn')
  }

  const handleFinish = () => {
    completePlacement()
    navigate('/learn')
  }

  // ─── Welcome Screen ──────────────────────────────────────────────────────────
  if (phase === 'welcome') {
    return (
      <Layout title="Placement Test" hideNav>
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center py-8 space-y-6"
        >
          <div className="w-24 h-24 bg-gradient-to-br from-cadence-800 to-cadence-600 rounded-3xl flex items-center justify-center text-5xl mx-auto shadow-lg">
            🎯
          </div>
          <div>
            <h1 className="font-black text-2xl text-slate-900 dark:text-white">
              Find Your Level
            </h1>
            <p className="text-slate-500 dark:text-slate-400 text-sm mt-2 max-w-xs mx-auto">
              Answer 10 adaptive questions so we can recommend the best starting
              point for you.
            </p>
          </div>

          <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-100 dark:border-slate-700 p-4 space-y-3 text-left">
            {[
              { icon: '🧠', text: 'Questions adapt to your skill level' },
              { icon: '⏱️', text: 'Takes about 2-3 minutes' },
              { icon: '📊', text: 'Get a personalized course recommendation' },
            ].map((item) => (
              <div key={item.text} className="flex items-center gap-3">
                <span className="text-xl">{item.icon}</span>
                <p className="text-sm text-slate-600 dark:text-slate-300">
                  {item.text}
                </p>
              </div>
            ))}
          </div>

          <div className="space-y-2">
            <Button
              onClick={() => setPhase('quiz')}
              variant="primary"
              fullWidth
              size="lg"
            >
              Start Placement Test
            </Button>
            <button
              onClick={handleSkip}
              className="text-sm text-slate-400 dark:text-slate-500 hover:text-cadence-800 dark:hover:text-cadence-300 font-medium transition-colors touch-manipulation"
            >
              Skip and explore on my own
            </button>
          </div>
        </motion.div>
      </Layout>
    )
  }

  // ─── Results Screen ──────────────────────────────────────────────────────────
  if (phase === 'results' && result) {
    const recommended = COURSES[result.recommendedCourseIndex]
    const levelLabels = ['', 'Beginner', 'Elementary', 'Intermediate', 'Advanced', 'Expert']

    return (
      <Layout title="Your Results" hideNav>
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="space-y-5 py-4"
        >
          <div className="text-center">
            <div className="text-6xl mb-3">🎉</div>
            <h2 className="font-black text-3xl text-slate-900 dark:text-white">
              Placement Complete
            </h2>
          </div>

          <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-100 dark:border-slate-700 p-5 text-center">
            <p className="text-6xl font-black text-cadence-800 dark:text-cadence-300">
              {result.score}%
            </p>
            <p className="text-slate-500 text-sm mt-1">
              Skill Level: {levelLabels[result.skillLevel]}
            </p>
          </div>

          {recommended && (
            <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-100 dark:border-slate-700 p-4">
              <p className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wide mb-3">
                Recommended Starting Course
              </p>
              <div className="flex items-center gap-3">
                <div
                  className={`w-12 h-12 ${recommended.bgGradient} rounded-xl flex items-center justify-center text-2xl flex-shrink-0`}
                >
                  {recommended.icon}
                </div>
                <div>
                  <p className="font-bold text-slate-900 dark:text-white">
                    {recommended.title}
                  </p>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                    {recommended.description}
                  </p>
                </div>
              </div>
            </div>
          )}

          <Button onClick={handleFinish} variant="primary" fullWidth size="lg">
            Start Learning
          </Button>
        </motion.div>
      </Layout>
    )
  }

  // ─── Quiz Screen ──────────────────────────────────────────────────────────────
  const q = currentQuestion
  if (!q) {
    return (
      <Layout title="Placement Test" hideNav>
        <p className="text-center text-slate-500 mt-8">Loading...</p>
      </Layout>
    )
  }

  const getOptionStyle = (index: number) => {
    if (!showFeedback) {
      if (selectedAnswer === index) {
        return 'border-cadence-800 bg-cadence-50 dark:bg-cadence-900/30 text-cadence-800 dark:text-cadence-300'
      }
      return 'border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-800 hover:border-cadence-300 dark:hover:border-cadence-700 hover:bg-cadence-50/50 dark:hover:bg-cadence-900/20 active:scale-[0.98]'
    }
    if (index === q.correctAnswer) {
      return 'border-green-500 bg-green-50 dark:bg-green-900/30 text-green-700 dark:text-green-300'
    }
    if (selectedAnswer === index && index !== q.correctAnswer) {
      return 'border-red-400 bg-red-50 dark:bg-red-900/30 text-red-700 dark:text-red-300'
    }
    return 'border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-800 opacity-50'
  }

  return (
    <Layout title="Placement Test" hideNav>
      {/* Progress bar */}
      <div className="mb-4">
        <div className="flex justify-between text-xs text-slate-500 dark:text-slate-400 mb-1.5">
          <span>Question {questionNumber} of 10</span>
          <button
            onClick={handleSkip}
            className="text-slate-400 hover:text-cadence-800 dark:hover:text-cadence-300 font-medium transition-colors touch-manipulation"
          >
            Skip
          </button>
        </div>
        <div className="h-2 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
          <div
            className="h-2 bg-cadence-800 rounded-full transition-all duration-300"
            style={{ width: `${((questionNumber - 1) / 10) * 100}%` }}
          />
        </div>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={q.id}
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -30 }}
          transition={{ duration: 0.25, ease: 'easeOut' }}
        >
          {/* Question text */}
          <div className="bg-white dark:bg-slate-800 rounded-2xl p-4 mb-4 shadow-sm border border-slate-100 dark:border-slate-700">
            <p className="text-base font-semibold text-slate-900 dark:text-white leading-snug">
              {q.text}
            </p>
          </div>

          {/* Options */}
          <div className="space-y-2.5">
            {q.options.map((option, index) => (
              <button
                key={index}
                onClick={() => handleSelect(index)}
                disabled={showFeedback}
                className={`
                  w-full text-left flex items-center gap-3 p-3.5 rounded-xl border-2
                  transition-all duration-150 touch-manipulation select-none min-h-[52px]
                  font-medium text-sm
                  ${getOptionStyle(index)}
                `}
              >
                <span
                  className={`
                    flex-shrink-0 w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold
                    ${
                      !showFeedback && selectedAnswer === index
                        ? 'bg-cadence-800 text-white'
                        : showFeedback && index === q.correctAnswer
                        ? 'bg-green-500 text-white'
                        : showFeedback &&
                          selectedAnswer === index &&
                          index !== q.correctAnswer
                        ? 'bg-red-400 text-white'
                        : 'bg-slate-100 dark:bg-slate-700 text-slate-500 dark:text-slate-400'
                    }
                  `}
                >
                  {showFeedback && index === q.correctAnswer
                    ? '✓'
                    : showFeedback &&
                      selectedAnswer === index &&
                      index !== q.correctAnswer
                    ? '✗'
                    : optionLetters[index]}
                </span>
                <span className="leading-snug">{option}</span>
              </button>
            ))}
          </div>

          {/* Feedback explanation */}
          {showFeedback && (
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-4 bg-slate-50 dark:bg-slate-700/50 rounded-xl p-3 border border-slate-200 dark:border-slate-600"
            >
              <p className="text-sm text-slate-600 dark:text-slate-300">
                {q.explanation}
              </p>
            </motion.div>
          )}
        </motion.div>
      </AnimatePresence>
    </Layout>
  )
}
