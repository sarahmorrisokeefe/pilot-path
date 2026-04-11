import { lazy, Suspense } from 'react'
import { motion } from 'framer-motion'
import type { Question } from '../../types'

const StaffNotation = lazy(() => import('../music/StaffNotation').then(m => ({ default: m.StaffNotation })))

interface QuestionCardProps {
  question: Question
  selectedAnswer: number | null
  showFeedback: boolean
  onSelect: (index: number) => void
  questionNumber: number
  totalQuestions: number
}

const optionLetters = ['A', 'B', 'C', 'D']

export function QuestionCard({
  question,
  selectedAnswer,
  showFeedback,
  onSelect,
  questionNumber,
  totalQuestions,
}: QuestionCardProps) {
  const getOptionStyle = (index: number) => {
    if (!showFeedback) {
      if (selectedAnswer === index) {
        return 'border-cadence-800 bg-cadence-50 dark:bg-cadence-900/30 text-cadence-800 dark:text-cadence-300'
      }
      return 'border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-800 hover:border-cadence-300 dark:hover:border-cadence-700 hover:bg-cadence-50/50 dark:hover:bg-cadence-900/20 active:scale-[0.98]'
    }
    if (index === question.correctAnswer) {
      return 'border-green-500 bg-green-50 dark:bg-green-900/30 text-green-700 dark:text-green-300'
    }
    if (selectedAnswer === index && index !== question.correctAnswer) {
      return 'border-red-400 bg-red-50 dark:bg-red-900/30 text-red-700 dark:text-red-300'
    }
    return 'border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-800 opacity-50'
  }

  return (
    <motion.div
      key={question.id}
      initial={{ opacity: 0, x: 30 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.25, ease: 'easeOut' }}
    >
      {/* Question counter */}
      <p className="text-sm font-medium text-slate-400 dark:text-slate-500 mb-3">
        Question {questionNumber} of {totalQuestions}
      </p>

      {/* Staff notation (lazy-loaded) */}
      {question.staffConfig && (
        <Suspense fallback={<div className="h-32 flex items-center justify-center text-slate-400">Loading notation...</div>}>
          <div className="mb-4 flex justify-center">
            <StaffNotation {...question.staffConfig} />
          </div>
        </Suspense>
      )}

      {/* Question text */}
      <div className="bg-white dark:bg-slate-800 rounded-2xl p-4 mb-4 shadow-sm border border-slate-100 dark:border-slate-700">
        <p className="text-base font-semibold text-slate-900 dark:text-white leading-snug">
          {question.text}
        </p>
      </div>

      {/* Options */}
      <div className="space-y-2.5">
        {question.options.map((option, index) => (
          <button
            key={index}
            onClick={() => !showFeedback && onSelect(index)}
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
                ${!showFeedback && selectedAnswer === index
                  ? 'bg-cadence-800 text-white'
                  : showFeedback && index === question.correctAnswer
                  ? 'bg-green-500 text-white'
                  : showFeedback && selectedAnswer === index && index !== question.correctAnswer
                  ? 'bg-red-400 text-white'
                  : 'bg-slate-100 dark:bg-slate-700 text-slate-500 dark:text-slate-400'
                }
              `}
            >
              {showFeedback && index === question.correctAnswer ? '✓' :
               showFeedback && selectedAnswer === index && index !== question.correctAnswer ? '✗' :
               optionLetters[index]}
            </span>
            <span className="leading-snug">{option}</span>
          </button>
        ))}
      </div>
    </motion.div>
  )
}
