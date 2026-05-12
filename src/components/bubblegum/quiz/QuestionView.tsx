import { lazy, Suspense } from 'react'
import { motion } from 'framer-motion'
import { Doodle } from '../Doodle'
import { Mono } from '../Mono'
import { PrimaryButton } from '../PrimaryButton'
import type { Question } from '../../../types'

const StaffNotation = lazy(() =>
  import('../../music/StaffNotation').then((m) => ({ default: m.StaffNotation }))
)

interface QuestionViewProps {
  question: Question
  selectedAnswer: number | null
  showFeedback: boolean
  isCorrect: boolean
  isLast: boolean
  onSelect: (index: number) => void
  onContinue: () => void
  /** Per-question XP shown on the Encore caption (0 hides it). */
  xpReward?: number
  /** Hides the staff render even when question.staffConfig exists. */
  hideStaff?: boolean
}

const STATE_CLASSES = {
  idle:     'bg-white border-bubblegum-cream-hi text-bubblegum-plum active:scale-[0.98]',
  selected: 'bg-white border-bubblegum-plum text-bubblegum-plum',
  right:    'bg-bubblegum-mint border-bubblegum-plum text-bubblegum-plum',
  wrong:    'bg-bubblegum-cherry/20 border-bubblegum-cherry text-bubblegum-plum',
  reveal:   'bg-bubblegum-mint border-bubblegum-plum text-bubblegum-plum',
  dim:      'bg-white border-bubblegum-cream-hi text-bubblegum-plum opacity-55',
} as const

export function QuestionView({
  question,
  selectedAnswer,
  showFeedback,
  isCorrect,
  isLast,
  onSelect,
  onContinue,
  xpReward = 0,
  hideStaff = false,
}: QuestionViewProps) {
  const shortOptions = question.options.every((o) => o.length <= 5)
  return (
    <motion.div
      key={question.id}
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.22 }}
      className="flex flex-col gap-3.5"
    >
      <div>
        <Mono>{question.topic} · question</Mono>
        <p className="mt-1 text-[22px] font-black leading-[1.15] tracking-[-0.02em] text-bubblegum-plum">
          {question.text}
        </p>
      </div>

      {question.staffConfig && !hideStaff && (
        <div
          className={`relative overflow-hidden rounded-3xl bg-white p-5 ${
            showFeedback && !isCorrect ? 'animate-bg-shake' : ''
          }`}
        >
          <Doodle ch="♪" x={18} y={14} size={18} rot={-15} color="#ffaf95" opacity={0.4} />
          <Suspense
            fallback={
              <div className="flex h-32 items-center justify-center text-bubblegum-plum-dim">
                Loading notation…
              </div>
            }
          >
            <div className="flex justify-center">
              <StaffNotation {...question.staffConfig} />
            </div>
          </Suspense>
        </div>
      )}

      <div className={`grid gap-2.5 ${shortOptions ? 'grid-cols-2' : 'grid-cols-1'}`}>
        {question.options.map((option, idx) => {
          const isSelected = selectedAnswer === idx
          const isAnswerCorrect = idx === question.correctAnswer
          const state: keyof typeof STATE_CLASSES = !showFeedback
            ? isSelected ? 'selected' : 'idle'
            : isSelected && isAnswerCorrect ? 'right'
            : isSelected && !isAnswerCorrect ? 'wrong'
            : isAnswerCorrect ? 'reveal'
            : 'dim'

          return (
            <button
              key={idx}
              type="button"
              onClick={() => onSelect(idx)}
              disabled={showFeedback}
              className={`relative rounded-[18px] border-[3px] p-4 text-center transition-all touch-manipulation select-none ${STATE_CLASSES[state]} ${
                shortOptions ? 'text-[22px] font-black' : 'text-sm font-extrabold leading-snug'
              } ${state === 'wrong' ? 'animate-bg-shake' : ''}`}
            >
              {option}
              {state === 'right' && (
                <>
                  <span
                    className="absolute -right-2 -top-2.5 flex h-6 w-6 origin-center items-center justify-center rounded-full bg-bubblegum-plum text-sm text-bubblegum-cream animate-bg-tick"
                    aria-hidden="true"
                  >
                    ✓
                  </span>
                  {xpReward > 0 && (
                    <span
                      className="pointer-events-none absolute -top-2 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full bg-bubblegum-butter px-2.5 py-1 text-[11px] font-black tracking-tight text-bubblegum-plum animate-bg-float-up"
                      aria-hidden="true"
                    >
                      +{Math.max(1, Math.floor(xpReward / 4))} XP ⭐
                    </span>
                  )}
                </>
              )}
              {state === 'wrong' && (
                <span
                  className="absolute -right-2 -top-2.5 flex h-6 w-6 origin-center items-center justify-center rounded-full bg-bubblegum-cherry text-sm text-white animate-bg-tick"
                  aria-hidden="true"
                >
                  ✕
                </span>
              )}
              {state === 'reveal' && (
                <div className="mt-1">
                  <Mono size="xs" tone="plum">correct</Mono>
                </div>
              )}
            </button>
          )
        })}
      </div>

      {!showFeedback && (
        <button
          type="button"
          disabled
          className="mt-1 cursor-not-allowed rounded-full border-2 border-dashed border-bubblegum-plum-dim bg-bubblegum-cream py-3.5 text-sm font-extrabold text-bubblegum-plum-dim"
        >
          Tap a note to answer
        </button>
      )}

      {showFeedback && (
        <FeedbackPanel
          isCorrect={isCorrect}
          isLast={isLast}
          explanation={question.explanation}
          correctOption={question.options[question.correctAnswer]}
          onContinue={onContinue}
          xpReward={xpReward}
        />
      )}
    </motion.div>
  )
}

interface FeedbackPanelProps {
  isCorrect: boolean
  isLast: boolean
  explanation: string
  correctOption: string
  onContinue: () => void
  xpReward?: number
}

function FeedbackPanel({
  isCorrect,
  isLast,
  explanation,
  correctOption,
  onContinue,
  xpReward = 0,
}: FeedbackPanelProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, ease: [0.36, 0.07, 0.19, 0.97] }}
      className={`relative overflow-hidden rounded-3xl p-5 ${
        isCorrect ? 'bg-bubblegum-mint' : 'border-t-4 border-bubblegum-cherry bg-bubblegum-cherry/20'
      }`}
    >
      <Doodle
        ch={isCorrect ? '♪' : '♭'}
        x={20}
        y={14}
        size={isCorrect ? 22 : 26}
        rot={-15}
        color={isCorrect ? '#3a224f' : '#ff7faf'}
        opacity={isCorrect ? 0.25 : 0.4}
      />

      <div className="flex items-center gap-3.5">
        <span
          className={`inline-block leading-none ${isCorrect ? 'animate-bg-pop-in' : ''}`}
          style={{ fontSize: '52px', transform: `rotate(${isCorrect ? -12 : -8}deg)` }}
          aria-hidden="true"
        >
          {isCorrect ? '🎉' : '🎧'}
        </span>
        <div className="flex-1">
          <p
            className={`text-2xl font-black leading-none tracking-[-0.025em] text-bubblegum-plum ${
              isCorrect ? 'animate-bg-pop-in' : ''
            }`}
          >
            {isCorrect ? 'Encore!' : 'Off-key — close though!'}
          </p>
          <div className="mt-1">
            {isCorrect ? (
              xpReward > 0 ? (
                <Mono size="sm">+{Math.max(1, Math.floor(xpReward / 4))} XP for this song</Mono>
              ) : (
                <Mono size="sm">nice ear</Mono>
              )
            ) : (
              <Mono size="sm" tone="cherry">no XP this song</Mono>
            )}
          </div>
        </div>
      </div>

      <p className="mt-3 text-sm font-bold leading-relaxed text-bubblegum-plum">
        {!isCorrect && (
          <>
            It's actually <strong className="text-bubblegum-green">{correctOption}</strong>.{' '}
          </>
        )}
        {explanation}
      </p>

      <div className="mt-4">
        <PrimaryButton tone="plum" onClick={onContinue}>
          {isLast ? 'See the set →' : isCorrect ? 'Next track →' : 'Got it, next one →'}
        </PrimaryButton>
      </div>
    </motion.div>
  )
}
