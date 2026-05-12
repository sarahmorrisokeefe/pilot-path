import { type ButtonHTMLAttributes, type ReactNode } from 'react'

export type PrimaryButtonTone = 'plum' | 'butter' | 'peach' | 'cherry' | 'mint'

interface PrimaryButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode
  fullWidth?: boolean
  tone?: PrimaryButtonTone
}

const toneClasses: Record<PrimaryButtonTone, string> = {
  plum:   'bg-bubblegum-plum text-bubblegum-cream active:bg-bubblegum-plum-soft',
  butter: 'bg-bubblegum-butter text-bubblegum-plum active:brightness-95',
  peach:  'bg-bubblegum-peach text-bubblegum-plum active:brightness-95',
  cherry: 'bg-bubblegum-cherry text-bubblegum-plum active:brightness-95',
  mint:   'bg-bubblegum-mint text-bubblegum-plum active:brightness-95',
}

export function PrimaryButton({
  children,
  fullWidth = true,
  tone = 'plum',
  className = '',
  disabled,
  ...props
}: PrimaryButtonProps) {
  return (
    <button
      disabled={disabled}
      className={`
        inline-flex items-center justify-center gap-2
        rounded-full font-black tracking-tight
        px-6 py-4 text-[15px] min-h-[52px]
        transition-all duration-150
        focus:outline-none focus:ring-2 focus:ring-bubblegum-plum focus:ring-offset-2 focus:ring-offset-bubblegum-cream
        disabled:opacity-40 disabled:cursor-not-allowed
        select-none touch-manipulation
        ${toneClasses[tone]}
        ${fullWidth ? 'w-full' : ''}
        ${className}
      `}
      {...props}
    >
      {children}
    </button>
  )
}
