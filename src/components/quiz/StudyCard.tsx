import { lazy, Suspense } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import type { LessonSlide } from '../../types'

const StaffNotation = lazy(() => import('../music/StaffNotation').then(m => ({ default: m.StaffNotation })))

interface StudyCardProps {
  slide: LessonSlide
  slideIndex: number
  totalSlides: number
  onNext: () => void
  onPrev: () => void
  onSkip: () => void
}

export function StudyCard({
  slide,
  slideIndex,
  totalSlides,
  onNext,
  onPrev,
  onSkip,
}: StudyCardProps) {
  const isFirst = slideIndex === 0

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={slide.id}
        initial={{ opacity: 0, x: 24 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -24 }}
        transition={{ duration: 0.22 }}
        className="flex flex-col gap-4"
      >
        {/* Header row: badge + counter + skip */}
        <div className="flex items-center justify-between">
          <span className="inline-flex items-center gap-1.5 text-xs font-bold text-cadence-700 dark:text-cadence-300 bg-cadence-50 dark:bg-cadence-900/30 px-2.5 py-1 rounded-full">
            📖 Study
          </span>

          <div className="flex items-center gap-3">
            <span className="text-xs text-slate-400 dark:text-slate-500 font-medium">
              {slideIndex + 1} / {totalSlides}
            </span>
            <button
              onClick={onSkip}
              className="text-xs text-slate-400 dark:text-slate-500 hover:text-cadence-800 dark:hover:text-cadence-300 font-medium transition-colors touch-manipulation"
            >
              Skip to Quiz →
            </button>
          </div>
        </div>

        {/* Main card */}
        <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-100 dark:border-slate-700 shadow-sm p-5 space-y-4">
          {/* Topic headline */}
          <h2 className="text-xl font-black text-slate-900 dark:text-white leading-tight">
            {slide.topic}
          </h2>

          {/* Staff notation (lazy-loaded) */}
          {slide.staffConfig && (
            <Suspense fallback={<div className="h-32 flex items-center justify-center text-slate-400">Loading notation...</div>}>
              <div className="flex justify-center">
                <StaffNotation {...slide.staffConfig} />
              </div>
            </Suspense>
          )}

          {/* Question context (true/false only) — gives "True"/"False" a subject */}
          {slide.questionText && (
            <div className="bg-slate-50 dark:bg-slate-700/50 rounded-xl px-3.5 py-3 border border-slate-200 dark:border-slate-600">
              <p className="text-xs font-bold text-slate-500 dark:text-slate-400 mb-1">Question</p>
              <p className="text-sm font-medium text-slate-700 dark:text-slate-200 leading-snug italic">
                {slide.questionText}
              </p>
            </div>
          )}

          {/* Explanation */}
          <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
            {slide.explanation}
          </p>

          {/* Key fact chip */}
          {slide.keyFact && (
            <div className="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-700/50 rounded-xl p-3.5 space-y-1">
              <p className="text-xs font-bold text-amber-700 dark:text-amber-400 flex items-center gap-1">
                💡 Key Fact
              </p>
              <p className="text-sm font-semibold text-amber-900 dark:text-amber-200">
                {slide.keyFact}
              </p>
            </div>
          )}

        </div>

        {/* Dot progress */}
        <div className="flex items-center justify-center gap-1.5 py-1">
          {Array.from({ length: totalSlides }).map((_, i) => (
            <span
              key={i}
              className={`rounded-full transition-all duration-300 ${
                i === slideIndex
                  ? 'w-4 h-2 bg-cadence-800'
                  : i < slideIndex
                  ? 'w-2 h-2 bg-cadence-300 dark:bg-cadence-700'
                  : 'w-2 h-2 bg-slate-200 dark:bg-slate-700'
              }`}
            />
          ))}
        </div>

        {/* Navigation buttons */}
        <div className="flex gap-3">
          <button
            onClick={onPrev}
            disabled={isFirst}
            className="flex-1 py-3 rounded-xl border border-slate-200 dark:border-slate-700 text-sm font-semibold text-slate-600 dark:text-slate-400 disabled:opacity-30 disabled:cursor-not-allowed hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors touch-manipulation"
          >
            ← Prev
          </button>
          <button
            onClick={onNext}
            className="flex-[2] py-3 rounded-xl bg-cadence-800 hover:bg-cadence-700 active:bg-cadence-600 text-white text-sm font-bold transition-colors touch-manipulation focus:outline-none focus:ring-2 focus:ring-cadence-400 focus:ring-offset-2"
          >
            {slideIndex === totalSlides - 1 ? 'Finish Review →' : 'Next →'}
          </button>
        </div>
      </motion.div>
    </AnimatePresence>
  )
}
