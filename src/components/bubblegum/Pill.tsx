import { type ReactNode } from 'react'

export type BubblegumTone =
  | 'butter'
  | 'peach'
  | 'mint'
  | 'sky'
  | 'lavender'
  | 'pink'
  | 'cherry'
  | 'plum'
  | 'white'
  | 'cream'

interface PillProps {
  children: ReactNode
  tone?: BubblegumTone
  size?: 'sm' | 'md'
}

// Pastel-bg pills keep plum text in both modes; white/cream/plum pills flip.
const toneClasses: Record<BubblegumTone, string> = {
  butter:   'bg-bubblegum-butter text-bubblegum-plum',
  peach:    'bg-bubblegum-peach text-bubblegum-plum',
  mint:     'bg-bubblegum-mint text-bubblegum-plum',
  sky:      'bg-bubblegum-sky text-bubblegum-plum',
  lavender: 'bg-bubblegum-lavender text-bubblegum-plum',
  pink:     'bg-bubblegum-pink text-bubblegum-plum',
  cherry:   'bg-bubblegum-cherry text-bubblegum-plum',
  plum:     'bg-bubblegum-plum text-bubblegum-cream dark:bg-bubblegum-butter dark:text-bubblegum-plum',
  white:    'bg-white text-bubblegum-plum dark:bg-night-panel dark:text-night-fg',
  cream:    'bg-bubblegum-cream text-bubblegum-plum dark:bg-night-panel dark:text-night-fg',
}

const sizeClasses = {
  sm: 'px-2.5 py-1 text-[11px]',
  md: 'px-3 py-1.5 text-xs',
}

export function Pill({ children, tone = 'peach', size = 'md' }: PillProps) {
  return (
    <span
      className={`inline-flex items-center gap-1 rounded-full font-extrabold tracking-tight ${toneClasses[tone]} ${sizeClasses[size]}`}
    >
      {children}
    </span>
  )
}
