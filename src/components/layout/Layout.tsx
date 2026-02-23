import { type ReactNode } from 'react'
import { BottomNav } from './BottomNav'
import { useDarkMode } from '../../hooks/useDarkMode'

interface LayoutProps {
  children: ReactNode
  hideNav?: boolean
  title?: string
  backPath?: string
}

export function Layout({ children, hideNav = false, title, backPath }: LayoutProps) {
  const { isDark, toggle } = useDarkMode()

  return (
    <div className="min-h-screen bg-sky-50 dark:bg-slate-900">
      {/* Header */}
      <header className="sticky top-0 z-30 bg-white/90 dark:bg-slate-800/90 backdrop-blur-sm border-b border-slate-200 dark:border-slate-700 safe-top">
        <div className="flex items-center justify-between px-4 h-14 max-w-lg mx-auto">
          <div className="flex items-center gap-3">
            {backPath && (
              <a
                href={backPath}
                className="text-slate-500 dark:text-slate-400 p-1 -ml-1 rounded-lg touch-manipulation"
                aria-label="Go back"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
                </svg>
              </a>
            )}
            {title ? (
              <h1 className="font-bold text-slate-900 dark:text-white text-lg leading-tight line-clamp-1">
                {title}
              </h1>
            ) : (
              <div className="flex items-center gap-2">
                <span className="text-2xl">✈️</span>
                <span className="font-black text-xl text-sky-600 dark:text-sky-400 tracking-tight">
                  PilotPath
                </span>
              </div>
            )}
          </div>
          <button
            onClick={toggle}
            className="p-2 rounded-xl text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors touch-manipulation"
            aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
          >
            {isDark ? (
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z" />
              </svg>
            ) : (
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M21.752 15.002A9.718 9.718 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 009.002-5.998z" />
              </svg>
            )}
          </button>
        </div>
      </header>

      {/* Main content */}
      <main className={`max-w-lg mx-auto px-4 py-4 ${!hideNav ? 'pb-24' : 'pb-4'}`}>
        {children}
      </main>

      {!hideNav && <BottomNav />}
    </div>
  )
}
