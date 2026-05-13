import { createContext, useCallback, useContext, useEffect, useState, type ReactNode } from 'react'
import { useNavigate } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'

interface AuthPromptContextValue {
  /** Show the auth prompt toast with a context-specific message. */
  showAuthPrompt: (message?: string) => void
}

const AuthPromptContext = createContext<AuthPromptContextValue | null>(null)

const DEFAULT_MESSAGE = 'Grab a backstage pass to save your set'
const AUTO_DISMISS_MS = 6000

export function AuthPromptProvider({ children }: { children: ReactNode }) {
  const [visible, setVisible] = useState(false)
  const [message, setMessage] = useState(DEFAULT_MESSAGE)
  const navigate = useNavigate()

  const showAuthPrompt = useCallback((msg?: string) => {
    setMessage(msg ?? DEFAULT_MESSAGE)
    setVisible(true)
  }, [])

  const dismiss = useCallback(() => setVisible(false), [])

  useEffect(() => {
    if (!visible) return
    const t = setTimeout(dismiss, AUTO_DISMISS_MS)
    return () => clearTimeout(t)
  }, [visible, dismiss])

  return (
    <AuthPromptContext.Provider value={{ showAuthPrompt }}>
      {children}
      <AnimatePresence>
        {visible && (
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 40 }}
            transition={{ duration: 0.22, ease: [0.36, 0.07, 0.19, 0.97] }}
            className="fixed inset-x-4 bottom-24 z-50 mx-auto max-w-lg"
            role="status"
          >
            <div className="flex items-center justify-between gap-3 rounded-full bg-bubblegum-plum px-4 py-3 text-bubblegum-cream shadow-[0_8px_24px_-8px_rgba(58,34,79,0.45)] dark:bg-bubblegum-butter dark:text-bubblegum-plum dark:shadow-glow-butter">
              <p className="flex-1 text-sm font-extrabold tracking-tight">{message}</p>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => {
                    dismiss()
                    navigate('/auth')
                  }}
                  className="touch-manipulation whitespace-nowrap rounded-full bg-bubblegum-butter px-3 py-1.5 text-xs font-black tracking-tight text-bubblegum-plum dark:bg-bubblegum-plum dark:text-bubblegum-cream"
                >
                  Take the stage
                </button>
                <button
                  type="button"
                  onClick={() => {
                    dismiss()
                    navigate('/auth?mode=signup')
                  }}
                  className="touch-manipulation whitespace-nowrap rounded-full border border-bubblegum-cream/30 px-3 py-1.5 text-xs font-extrabold text-bubblegum-cream dark:border-bubblegum-plum/30 dark:text-bubblegum-plum"
                >
                  Get a pass
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </AuthPromptContext.Provider>
  )
}

export function useAuthPrompt(): AuthPromptContextValue {
  const ctx = useContext(AuthPromptContext)
  if (!ctx) throw new Error('useAuthPrompt must be used within <AuthPromptProvider>')
  return ctx
}
