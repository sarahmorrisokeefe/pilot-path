interface WordmarkProps {
  size?: 'sm' | 'md' | 'lg'
}

const sizeClasses = {
  sm: { glyph: 'h-6 w-6',  word: 'text-base' },
  md: { glyph: 'h-8 w-8',  word: 'text-xl' },
  lg: { glyph: 'h-10 w-10', word: 'text-2xl' },
}

export function Wordmark({ size = 'md' }: WordmarkProps) {
  const s = sizeClasses[size]
  return (
    <div className="flex items-center gap-1.5">
      <img
        src="/logo.png"
        alt=""
        aria-hidden="true"
        className={`-rotate-[10deg] dark:drop-shadow-glow-peach ${s.glyph}`}
      />
      <span
        className={`font-black tracking-tighter text-bubblegum-plum dark:text-night-fg ${s.word}`}
      >
        cadence
      </span>
    </div>
  )
}
