import { Mono } from '../Mono'

interface QuizHeaderProps {
  progressValue: number
  stepLabel: string
  onClose: () => void
}

export function QuizHeader({ progressValue, stepLabel, onClose }: QuizHeaderProps) {
  const pct = Math.max(0, Math.min(100, progressValue * 100))
  return (
    <div className="-mx-5 mb-3 flex items-center gap-3 px-5 pt-2 pb-3">
      <button
        type="button"
        onClick={onClose}
        aria-label="Close"
        className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full bg-white text-base font-black text-bubblegum-plum touch-manipulation"
      >
        ✕
      </button>
      <div className="flex h-2 flex-1 overflow-hidden rounded-full bg-white/70">
        <div
          className="h-full rounded-full bg-bubblegum-peach transition-[width] duration-300"
          style={{ width: `${pct}%` }}
        />
      </div>
      <Mono size="xs">{stepLabel}</Mono>
    </div>
  )
}
