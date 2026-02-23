import { motion } from 'framer-motion'
import type { Question } from '../../types'

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
        return 'border-sky-500 bg-sky-50 dark:bg-sky-900/30 text-sky-700 dark:text-sky-300'
      }
      return 'border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-800 hover:border-sky-300 dark:hover:border-sky-600 hover:bg-sky-50/50 dark:hover:bg-sky-900/20 active:scale-[0.98]'
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
                  ? 'bg-sky-500 text-white'
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
