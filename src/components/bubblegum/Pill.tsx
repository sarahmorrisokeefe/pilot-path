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

const toneClasses: Record<BubblegumTone, string> = {
  butter:   'bg-bubblegum-butter text-bubblegum-plum',
  peach:    'bg-bubblegum-peach text-bubblegum-plum',
  mint:     'bg-bubblegum-mint text-bubblegum-plum',
  sky:      'bg-bubblegum-sky text-bubblegum-plum',
  lavender: 'bg-bubblegum-lavender text-bubblegum-plum',
  pink:     'bg-bubblegum-pink text-bubblegum-plum',
  cherry:   'bg-bubblegum-cherry text-bubblegum-plum',
  plum:     'bg-bubblegum-plum text-bubblegum-cream',
  white:    'bg-white text-bubblegum-plum',
  cream:    'bg-bubblegum-cream text-bubblegum-plum',
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
