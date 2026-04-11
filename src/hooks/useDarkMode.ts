import { useEffect, useCallback } from 'react'
import { useStorage } from './useStorage'

type DarkModePreference = 'light' | 'dark' | 'system'

export function useDarkMode() {
  const [preference, setPreference] = useStorage<DarkModePreference>(
    'cadence_theme',
    'system'
  )

  const getEffectiveMode = useCallback((): 'light' | 'dark' => {
    if (preference === 'system') {
      return window.matchMedia('(prefers-color-scheme: dark)').matches
        ? 'dark'
        : 'light'
    }
    return preference
  }, [preference])

  const isDark = getEffectiveMode() === 'dark'

  useEffect(() => {
    const root = document.documentElement
    if (isDark) {
      root.classList.add('dark')
    } else {
      root.classList.remove('dark')
    }
  }, [isDark])

  // Listen for system preference changes when in system mode
  useEffect(() => {
    if (preference !== 'system') return
    const mq = window.matchMedia('(prefers-color-scheme: dark)')
    const handler = () => {
      const root = document.documentElement
      if (mq.matches) {
        root.classList.add('dark')
      } else {
        root.classList.remove('dark')
      }
    }
    mq.addEventListener('change', handler)
    return () => mq.removeEventListener('change', handler)
  }, [preference])

  const toggle = useCallback(() => {
    setPreference(isDark ? 'light' : 'dark')
  }, [isDark, setPreference])

  const setMode = useCallback(
    (mode: DarkModePreference) => {
      setPreference(mode)
    },
    [setPreference]
  )

  return { isDark, preference, toggle, setMode }
}
