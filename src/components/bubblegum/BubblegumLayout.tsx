import { type ReactNode } from 'react'
import { useNavigate } from 'react-router-dom'
import { AppHeader } from './AppHeader'
import { TabBar, type BubblegumTabId } from './TabBar'
import { useAuth } from '../../context/AuthContext'
import { useRequireAuth } from '../../hooks/useRequireAuth'

interface BubblegumLayoutProps {
  children: ReactNode
  activeTab?: BubblegumTabId
  hideTabBar?: boolean
  hideHeader?: boolean
  back?: boolean
  title?: string
  onBack?: () => void
  headerRight?: ReactNode
}

const TAB_ROUTES: Record<BubblegumTabId, { path: string; authMessage?: string }> = {
  home:     { path: '/' },
  learn:    { path: '/learn' },
  practice: { path: '/practice', authMessage: 'Sign in to take practice quizzes' },
  review:   { path: '/review',   authMessage: 'Sign in to review weak areas' },
  progress: { path: '/progress', authMessage: 'Sign in to track your progress' },
}

export function BubblegumLayout({
  children,
  activeTab,
  hideTabBar = false,
  hideHeader = false,
  back = false,
  title,
  onBack,
  headerRight,
}: BubblegumLayoutProps) {
  const navigate = useNavigate()
  const { user } = useAuth()
  const { gate } = useRequireAuth()

  const handleTabClick = (id: BubblegumTabId) => {
    const route = TAB_ROUTES[id]
    if (route.authMessage) {
      gate(() => navigate(route.path), route.authMessage)
    } else {
      navigate(route.path)
    }
  }

  const userInitial = user?.email?.[0]?.toUpperCase()

  return (
    <div className="relative min-h-screen bg-bubblegum-cream bg-bubble-pattern text-bubblegum-plum">
      <div className="safe-top" />

      {!hideHeader && (
        <AppHeader
          back={back}
          title={title}
          onBack={onBack ?? (() => navigate(-1))}
          right={headerRight}
          userInitial={userInitial}
          onAvatarClick={() => navigate(user ? '/settings' : '/auth')}
        />
      )}

      <main
        className={`relative z-[1] mx-auto w-full max-w-lg px-5 ${
          hideTabBar ? 'pb-6' : 'pb-28'
        }`}
      >
        {children}
      </main>

      {!hideTabBar && activeTab && (
        <div className="fixed inset-x-0 bottom-[18px] z-30 px-4 safe-bottom">
          <div className="mx-auto max-w-lg">
            <TabBar active={activeTab} onTabClick={handleTabClick} />
          </div>
        </div>
      )}
    </div>
  )
}
