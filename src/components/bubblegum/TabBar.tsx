export type BubblegumTabId = 'home' | 'learn' | 'practice' | 'review' | 'progress'

interface TabBarProps {
  active: BubblegumTabId
  onTabClick?: (id: BubblegumTabId) => void
}

interface Tab {
  id: BubblegumTabId
  icon: string
  label: string
}

const tabs: readonly Tab[] = [
  { id: 'home',     icon: '🏠', label: 'Home' },
  { id: 'learn',    icon: '📚', label: 'Setlist' },
  { id: 'practice', icon: '🎯', label: 'Soundcheck' },
  { id: 'review',   icon: '🔄', label: 'B-Sides' },
  { id: 'progress', icon: '📊', label: 'Records' },
] as const

export function TabBar({ active, onTabClick }: TabBarProps) {
  return (
    <nav
      className="flex rounded-full bg-white p-1.5 shadow-[0_8px_24px_-8px_rgba(58,34,79,0.2)]"
      aria-label="Primary"
    >
      {tabs.map((tab) => {
        const isActive = tab.id === active
        return (
          <button
            key={tab.id}
            type="button"
            onClick={() => onTabClick?.(tab.id)}
            aria-current={isActive ? 'page' : undefined}
            aria-label={tab.label}
            className={`
              flex-1 rounded-full py-[7px] text-center
              text-bubblegum-plum
              touch-manipulation select-none
              transition-colors duration-150
              ${isActive ? 'bg-bubblegum-butter font-black' : 'bg-transparent font-semibold'}
            `}
          >
            <div className="text-xl leading-none">{tab.icon}</div>
            <div
              className={`mt-0.5 text-[9px] ${isActive ? 'opacity-100' : 'opacity-70'}`}
            >
              {tab.label}
            </div>
          </button>
        )
      })}
    </nav>
  )
}
