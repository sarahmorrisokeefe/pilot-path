import { type ReactNode } from 'react'
import { type BubblegumTone } from './Pill'

interface CategoryChipProps {
  children: ReactNode
  tone?: BubblegumTone
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

export function CategoryChip({ children, tone = 'lavender' }: CategoryChipProps) {
  return (
    <span
      className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-[11px] font-black tracking-tight ${toneClasses[tone]}`}
    >
      {children}
    </span>
  )
}
