import { createContext, useCallback, useContext, useState, type ReactNode } from 'react'
import { Toast } from '../components/ui/Toast'

interface AuthPromptContextValue {
  /** Show the auth prompt toast with a context-specific message. */
  showAuthPrompt: (message?: string) => void
}

const AuthPromptContext = createContext<AuthPromptContextValue | null>(null)

const DEFAULT_MESSAGE = 'Sign in to keep your progress'

export function AuthPromptProvider({ children }: { children: ReactNode }) {
  const [visible, setVisible] = useState(false)
  const [message, setMessage] = useState(DEFAULT_MESSAGE)

  const showAuthPrompt = useCallback((msg?: string) => {
    setMessage(msg ?? DEFAULT_MESSAGE)
    setVisible(true)
  }, [])

  const dismiss = useCallback(() => setVisible(false), [])

  return (
    <AuthPromptContext.Provider value={{ showAuthPrompt }}>
      {children}
      <Toast
        message={message}
        visible={visible}
        onDismiss={dismiss}
        actions={[
          { label: 'Sign In', path: '/auth' },
          { label: 'Sign Up', path: '/auth?mode=signup' },
        ]}
      />
    </AuthPromptContext.Provider>
  )
}

export function useAuthPrompt(): AuthPromptContextValue {
  const ctx = useContext(AuthPromptContext)
  if (!ctx) throw new Error('useAuthPrompt must be used within <AuthPromptProvider>')
  return ctx
}
