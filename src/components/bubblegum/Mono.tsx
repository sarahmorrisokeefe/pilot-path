import { type ReactNode } from 'react'

interface MonoProps {
  children: ReactNode
  size?: 'xs' | 'sm' | 'md'
  tone?: 'plum' | 'plum-soft' | 'plum-dim' | 'cherry'
  uppercase?: boolean
}

const sizeClasses = {
  xs: 'text-[10px]',
  sm: 'text-[11px]',
  md: 'text-xs',
}

const toneClasses = {
  plum: 'text-bubblegum-plum',
  'plum-soft': 'text-bubblegum-plum-soft',
  'plum-dim': 'text-bubblegum-plum-dim',
  cherry: 'text-bubblegum-cherry',
}

export function Mono({
  children,
  size = 'sm',
  tone = 'plum-soft',
  uppercase = true,
}: MonoProps) {
  return (
    <span
      className={`font-mono font-extrabold tracking-[0.12em] ${sizeClasses[size]} ${toneClasses[tone]} ${uppercase ? 'uppercase' : ''}`}
    >
      {children}
    </span>
  )
}
