import { type ReactNode } from 'react'
import { useNavigate } from 'react-router-dom'
import { BottomNav } from './BottomNav'
import { useDarkMode } from '../../hooks/useDarkMode'
import { useAuth } from '../../context/AuthContext'

interface LayoutProps {
  children: ReactNode
  hideNav?: boolean
  title?: string
  backPath?: string
}

export function Layout({ children, hideNav = false, title, backPath }: LayoutProps) {
  const { isDark, toggle } = useDarkMode()
  const { user } = useAuth()
  const navigate = useNavigate()

  return (
    <div className="min-h-screen bg-[#f5f3ff] dark:bg-[#0d0f1f] flex flex-col">
      {/* Header */}
      <header className="sticky top-0 z-30 bg-white/90 dark:bg-slate-800/90 backdrop-blur-sm border-b border-slate-200 dark:border-slate-700 safe-top transform-gpu">
        <div className="flex items-center justify-between px-4 h-14">
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
                <span className="text-2xl text-copper-500">♩</span>
                <span className="font-black text-xl text-cadence-800 dark:text-cadence-300 tracking-tight">
                  Cadence
                </span>
              </div>
            )}
          </div>
          {/* Right side: avatar + settings + dark mode toggle */}
          <div className="flex items-center gap-1">
            {/* Signed-in: avatar circle */}
            {user && (
              <button
                onClick={() => navigate('/settings')}
                className="w-8 h-8 rounded-full bg-cadence-800 text-white text-xs font-bold flex items-center justify-center touch-manipulation hover:bg-cadence-700 transition-colors"
                aria-label="Settings"
              >
                {user.email?.[0]?.toUpperCase() ?? '?'}
              </button>
            )}

            {/* Settings gear (signed-in only — avatar already links to settings too) */}
            {user && <button
              onClick={() => navigate('/settings')}
              className="p-2 rounded-xl text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors touch-manipulation"
              aria-label="Settings"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </button>

            }

            {/* Dark mode toggle */}
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
        </div>
      </header>

      {/* Main content */}
      <main className="flex-1 max-w-lg mx-auto w-full px-4 py-4">
        {children}
      </main>

      {/* Footer */}
      <footer className={`max-w-lg mx-auto w-full px-4 pt-2 text-center ${!hideNav ? 'pb-28' : 'pb-6'}`}>
        <p className="text-xs text-slate-400 dark:text-slate-500">
          Created by{' '}
          <a
            href="https://okeefesarah.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-cadence-800 dark:text-cadence-300 hover:text-cadence-800 dark:hover:text-cadence-700 transition-colors"
          >
            Sarah O'Keefe
          </a>
        </p>
        <a
          href="https://ko-fi.com/sarahmorrisokeefe"
          target="_blank"
          rel="noopener noreferrer"
          className="mt-1 inline-block text-xs text-cadence-800 dark:text-cadence-300 hover:text-cadence-800 dark:hover:text-cadence-700 transition-colors"
        >
          ☕ Support this app on Ko-fi
        </a>
      </footer>

      {!hideNav && <BottomNav />}
    </div>
  )
}
