import { type ReactNode } from 'react'

interface EyebrowProps {
  children: ReactNode
  tone?: 'plum-soft' | 'plum' | 'plum-dim' | 'cherry'
}

const toneClasses = {
  plum: 'text-bubblegum-plum',
  'plum-soft': 'text-bubblegum-plum-soft',
  'plum-dim': 'text-bubblegum-plum-dim',
  cherry: 'text-bubblegum-cherry',
}

export function Eyebrow({ children, tone = 'plum-soft' }: EyebrowProps) {
  return (
    <p className={`mb-2.5 text-[13px] font-black tracking-tight ${toneClasses[tone]}`}>
      {children}
    </p>
  )
}
