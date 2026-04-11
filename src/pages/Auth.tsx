import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Layout } from '../components/layout/Layout'
import { Button } from '../components/ui/Button'
import { useAuth } from '../context/AuthContext'

type Mode = 'signin' | 'signup' | 'forgot'

export function Auth() {
  const { user, signIn, signUp, resetPassword } = useAuth()
  const navigate = useNavigate()

  const [mode, setMode] = useState<Mode>('signin')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  // Redirect if already signed in
  useEffect(() => {
    if (user) navigate('/', { replace: true })
  }, [user, navigate])

  const switchMode = (m: Mode) => {
    setMode(m)
    setError(null)
    setSuccess(null)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setSuccess(null)
    setLoading(true)

    if (mode === 'signin') {
      const { error } = await signIn(email, password)
      if (error) setError(error.message)
      else navigate('/')

    } else if (mode === 'signup') {
      if (password.length < 6) {
        setError('Password must be at least 6 characters.')
        setLoading(false)
        return
      }
      if (password !== confirmPassword) {
        setError('Passwords do not match.')
        setLoading(false)
        return
      }
      const { error } = await signUp(email, password)
      if (error) {
        setError(error.message)
      } else {
        // Supabase may require email confirmation depending on project settings.
        // If session is established immediately, the useEffect above handles redirect.
        setSuccess('Account created! Check your email to confirm, then sign in.')
        setMode('signin')
      }

    } else {
      // forgot password
      const { error } = await resetPassword(email)
      if (error) setError(error.message)
      else setSuccess('Password reset link sent — check your email.')
    }

    setLoading(false)
  }

  const inputClass = `
    w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-600
    bg-white dark:bg-slate-800 text-slate-900 dark:text-white text-base
    placeholder-slate-400 dark:placeholder-slate-500
    focus:outline-none focus:ring-2 focus:ring-cadence-400 focus:border-transparent
    transition-colors
  `

  return (
    <Layout title="Account" hideNav>
      <div className="max-w-sm mx-auto pt-4">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="text-5xl mb-3 text-copper-500">♩</div>
          <h1 className="font-black text-2xl text-slate-900 dark:text-white">Cadence</h1>
          <p className="text-slate-500 dark:text-slate-400 text-sm mt-1">
            {mode === 'forgot' ? 'Reset your password' : 'Sign in to start learning'}
          </p>
        </div>

        {/* Tab strip (not shown for forgot mode) */}
        {mode !== 'forgot' && (
          <div className="flex bg-slate-100 dark:bg-slate-800 rounded-xl p-1 mb-6">
            {(['signin', 'signup'] as const).map((m) => (
              <button
                key={m}
                onClick={() => switchMode(m)}
                className={`flex-1 py-2 rounded-lg text-sm font-semibold transition-colors touch-manipulation ${
                  mode === m
                    ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-sm'
                    : 'text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-300'
                }`}
              >
                {m === 'signin' ? 'Sign In' : 'Sign Up'}
              </button>
            ))}
          </div>
        )}

        {/* Form */}
        <AnimatePresence mode="wait">
          <motion.form
            key={mode}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.18 }}
            onSubmit={handleSubmit}
            className="space-y-4"
          >
            <div>
              <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                required
                autoComplete="email"
                className={inputClass}
              />
            </div>

            {mode !== 'forgot' && (
              <div>
                <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                  Password
                </label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder={mode === 'signup' ? 'Min. 6 characters' : '••••••••'}
                  required
                  autoComplete={mode === 'signup' ? 'new-password' : 'current-password'}
                  className={inputClass}
                />
              </div>
            )}

            {mode === 'signup' && (
              <div>
                <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                  Confirm Password
                </label>
                <input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Re-enter password"
                  required
                  autoComplete="new-password"
                  className={inputClass}
                />
              </div>
            )}

            {/* Error */}
            {error && (
              <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-700 rounded-xl px-4 py-3">
                <p className="text-sm text-red-700 dark:text-red-300">{error}</p>
              </div>
            )}

            {/* Success */}
            {success && (
              <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-700 rounded-xl px-4 py-3">
                <p className="text-sm text-green-700 dark:text-green-300">{success}</p>
              </div>
            )}

            <Button
              type="submit"
              variant="primary"
              fullWidth
              size="lg"
              disabled={loading}
            >
              {loading
                ? 'Please wait…'
                : mode === 'signin'
                ? 'Sign In'
                : mode === 'signup'
                ? 'Create Account'
                : 'Send Reset Link'}
            </Button>

            {/* Footer links */}
            <div className="flex justify-between text-sm pt-1">
              {mode === 'signin' && (
                <button
                  type="button"
                  onClick={() => switchMode('forgot')}
                  className="text-cadence-800 dark:text-cadence-300 hover:underline"
                >
                  Forgot password?
                </button>
              )}
              {mode === 'forgot' && (
                <button
                  type="button"
                  onClick={() => switchMode('signin')}
                  className="text-cadence-800 dark:text-cadence-300 hover:underline"
                >
                  ← Back to sign in
                </button>
              )}
            </div>
          </motion.form>
        </AnimatePresence>
      </div>
    </Layout>
  )
}
