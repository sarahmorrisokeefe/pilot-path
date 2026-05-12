import { type ReactNode } from 'react'
import { Wordmark } from './Wordmark'

interface AppHeaderProps {
  back?: boolean
  title?: string
  onBack?: () => void
  right?: ReactNode
  userInitial?: string
  onAvatarClick?: () => void
}

export function AppHeader({
  back = false,
  title,
  onBack,
  right,
  userInitial,
  onAvatarClick,
}: AppHeaderProps) {
  return (
    <header className="relative z-[1] flex items-center justify-between px-5 py-4">
      {back ? (
        <div className="flex items-center gap-2.5">
          <button
            type="button"
            onClick={onBack}
            aria-label="Go back"
            className="flex h-9 w-9 items-center justify-center rounded-full bg-white text-lg font-black text-bubblegum-plum touch-manipulation"
          >
            ←
          </button>
          {title && (
            <span className="text-base font-black tracking-tight text-bubblegum-plum">
              {title}
            </span>
          )}
        </div>
      ) : (
        <Wordmark />
      )}

      {right !== undefined ? (
        right
      ) : (
        <button
          type="button"
          onClick={onAvatarClick}
          aria-label="Profile"
          className="flex h-[38px] w-[38px] items-center justify-center rounded-full border-[3px] border-white bg-bubblegum-lavender text-[15px] font-black text-bubblegum-plum touch-manipulation"
        >
          {userInitial ?? 'S'}
        </button>
      )}
    </header>
  )
}
