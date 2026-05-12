interface WordmarkProps {
  size?: 'sm' | 'md' | 'lg'
}

const sizeClasses = {
  sm: { glyph: 'text-2xl', word: 'text-base' },
  md: { glyph: 'text-3xl', word: 'text-xl' },
  lg: { glyph: 'text-4xl', word: 'text-2xl' },
}

export function Wordmark({ size = 'md' }: WordmarkProps) {
  const s = sizeClasses[size]
  return (
    <div className="flex items-center gap-1.5">
      <span
        className={`inline-block font-serif leading-none text-bubblegum-peach dark:drop-shadow-glow-peach ${s.glyph}`}
        style={{ transform: 'rotate(-10deg)' }}
        aria-hidden="true"
      >
        ♩
      </span>
      <span
        className={`font-black tracking-tighter text-bubblegum-plum dark:text-night-fg ${s.word}`}
      >
        cadence
      </span>
    </div>
  )
}
