import { type ButtonHTMLAttributes, type ReactNode } from 'react'

interface GhostButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode
  fullWidth?: boolean
}

export function GhostButton({
  children,
  fullWidth = true,
  className = '',
  disabled,
  ...props
}: GhostButtonProps) {
  return (
    <button
      disabled={disabled}
      className={`
        inline-flex items-center justify-center gap-2
        rounded-full font-extrabold tracking-tight
        px-6 py-[15px] text-sm min-h-[48px]
        bg-white text-bubblegum-plum
        dark:bg-night-panel dark:text-night-fg
        active:bg-bubblegum-cream-hi dark:active:bg-night-panel-hi
        transition-all duration-150
        focus:outline-none focus:ring-2 focus:ring-bubblegum-plum focus:ring-offset-2 focus:ring-offset-bubblegum-cream
        dark:focus:ring-bubblegum-butter dark:focus:ring-offset-night-ink
        disabled:opacity-40 disabled:cursor-not-allowed
        select-none touch-manipulation
        ${fullWidth ? 'w-full' : ''}
        ${className}
      `}
      {...props}
    >
      {children}
    </button>
  )
}
