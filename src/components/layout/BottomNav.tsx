import { useLocation, useNavigate } from 'react-router-dom'
import { useRequireAuth } from '../../hooks/useRequireAuth'

interface Tab {
  id: string
  label: string
  icon: string
  path: string
  authRequired?: boolean
  authMessage?: string
}

const tabs: readonly Tab[] = [
  { id: 'home', label: 'Home', icon: '🏠', path: '/' },
  { id: 'learn', label: 'Learn', icon: '📚', path: '/learn' },
  { id: 'practice', label: 'Practice', icon: '🎯', path: '/practice', authRequired: true, authMessage: 'Sign in to take practice quizzes' },
  { id: 'review', label: 'Review', icon: '🔄', path: '/review', authRequired: true, authMessage: 'Sign in to review weak areas' },
  { id: 'progress', label: 'Progress', icon: '📊', path: '/progress', authRequired: true, authMessage: 'Sign in to track your progress' },
] as const

export function BottomNav() {
  const location = useLocation()
  const navigate = useNavigate()
  const { gate } = useRequireAuth()

  const isActive = (path: string) => {
    if (path === '/') return location.pathname === '/'
    return location.pathname.startsWith(path)
  }

  const handleTabClick = (tab: Tab) => {
    if (tab.authRequired) {
      gate(() => navigate(tab.path), tab.authMessage)
    } else {
      navigate(tab.path)
    }
  }

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 bg-white dark:bg-slate-800 border-t border-slate-200 dark:border-slate-700 safe-bottom">
      <div className="flex items-stretch max-w-lg mx-auto">
        {tabs.map((tab) => {
          const active = isActive(tab.path)
          return (
            <button
              key={tab.id}
              onClick={() => handleTabClick(tab)}
              className={`
                relative flex-1 flex flex-col items-center justify-center gap-0.5
                min-h-[56px] py-2 px-1
                transition-colors duration-150
                touch-manipulation select-none
                ${active
                  ? 'text-cadence-800 dark:text-cadence-300'
                  : 'text-slate-400 dark:text-slate-500 hover:text-slate-600 dark:hover:text-slate-300'
                }
              `}
              aria-label={tab.label}
              aria-current={active ? 'page' : undefined}
            >
              <span className={`text-xl leading-none transition-transform duration-150 ${active ? 'scale-110' : ''}`}>
                {tab.icon}
              </span>
              <span className={`text-[10px] font-medium leading-none ${active ? 'font-bold' : ''}`}>
                {tab.label}
              </span>
              {active && (
                <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-8 h-0.5 bg-cadence-800 dark:bg-cadence-300 rounded-full" />
              )}
            </button>
          )
        })}
      </div>
    </nav>
  )
}
