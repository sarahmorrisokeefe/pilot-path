import { motion } from 'framer-motion'
import type { Question } from '../../types'
import { Button } from '../ui/Button'
import { ReferenceLink } from '../ui/ReferenceLink'

interface FeedbackPanelProps {
  question: Question
  isCorrect: boolean
  isLast: boolean
  onContinue: () => void
}

export function FeedbackPanel({ question, isCorrect, isLast, onContinue }: FeedbackPanelProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, ease: 'easeOut' }}
      className={`
        rounded-2xl p-4 mt-4 border-2
        ${isCorrect
          ? 'bg-green-50 dark:bg-green-900/20 border-green-400 dark:border-green-600'
          : 'bg-red-50 dark:bg-red-900/20 border-red-400 dark:border-red-600'
        }
      `}
    >
      {/* Status */}
      <div className="flex items-center gap-2 mb-2">
        <span className="text-2xl">{isCorrect ? '🎉' : '📖'}</span>
        <p className={`font-bold text-base ${isCorrect ? 'text-green-700 dark:text-green-300' : 'text-red-700 dark:text-red-300'}`}>
          {isCorrect ? 'Correct!' : 'Not quite!'}
        </p>
      </div>

      {/* Explanation */}
      <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed mb-2">
        {question.explanation}
      </p>

      {/* Reference */}
      {question.reference && (
        <ReferenceLink
          reference={question.reference}
          className="text-slate-500 dark:text-slate-400 mb-3"
        />
      )}

      <Button
        onClick={onContinue}
        variant={isCorrect ? 'success' : 'primary'}
        fullWidth
        size="md"
      >
        {isLast ? '🏁 See Results' : 'Continue →'}
      </Button>
    </motion.div>
  )
}
