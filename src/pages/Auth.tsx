import { useState, useEffect, type FormEvent } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import {
  BubblegumLayout,
  Doodle,
  Mono,
  Pill,
  PrimaryButton,
  GhostButton,
} from '../components/bubblegum'
import { useAuth } from '../context/AuthContext'

type Mode = 'signin' | 'signup' | 'forgot'

const INPUT_CLASS = `
  w-full rounded-2xl border-[2px] border-bubblegum-cream-hi bg-white
  px-4 py-3 text-base font-bold text-bubblegum-plum
  placeholder-bubblegum-plum-dim
  focus:border-bubblegum-plum focus:outline-none focus:ring-2 focus:ring-bubblegum-peach
  transition-colors
  dark:bg-night-panel dark:border-night-panel-hi dark:text-night-fg
  dark:placeholder-night-fg-dim dark:focus:border-bubblegum-butter
`

export function Auth() {
  const { user, signIn, signUp, resetPassword } = useAuth()
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()

  const initialMode: Mode = searchParams.get('mode') === 'signup' ? 'signup' : 'signin'
  const [mode, setMode] = useState<Mode>(initialMode)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (user) navigate('/', { replace: true })
  }, [user, navigate])

  const switchMode = (m: Mode) => {
    setMode(m)
    setError(null)
    setSuccess(null)
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setError(null)
    setSuccess(null)
    setLoading(true)

    if (mode === 'signin') {
      const { error: err } = await signIn(email, password)
      if (err) setError(err.message)
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
      const { error: err } = await signUp(email, password)
      if (err) {
        setError(err.message)
      } else {
        setSuccess('Pass on the way — check your email to confirm.')
        setMode('signin')
      }
    } else {
      const { error: err } = await resetPassword(email)
      if (err) setError(err.message)
      else setSuccess('Reset link sent — check your email.')
    }

    setLoading(false)
  }

  const heading =
    mode === 'forgot'
      ? 'Lost your set list?'
      : mode === 'signup'
      ? 'Get your backstage pass.'
      : 'Welcome back to the stage.'

  const subhead =
    mode === 'forgot'
      ? "We'll mail a reset link."
      : mode === 'signup'
      ? 'Save your set, earn records, keep your streak alive.'
      : 'Pick up where you left off.'

  const ctaLabel = loading
    ? 'One sec…'
    : mode === 'signin'
    ? 'Take the stage →'
    : mode === 'signup'
    ? 'Create my pass →'
    : 'Send reset link →'

  return (
    <BubblegumLayout hideHeader hideTabBar>
      <div className="relative -mx-5 flex min-h-[calc(100vh-2rem)] flex-col px-5 pt-2">
        <Doodle ch="♪" x={32} y={70}  size={36} rot={-15} color="#ffaf95" opacity={0.7} />
        <Doodle ch="♬" x={330} y={120} size={52} rot={12}  color="#cfb6ff" opacity={0.6} />
        <Doodle ch="♫" x={48} y={300}  size={28} rot={-8}  color="#a8e6b8" opacity={0.7} />
        <Doodle ch="♩" x={350} y={420} size={42} rot={18}  color="#a8d8ff" opacity={0.7} />
        <Doodle ch="♪" x={28} y={520}  size={32} rot={-20} color="#ffd66b" opacity={0.8} />

        {/* Brand mark */}
        <div className="relative z-[1] mt-4 flex items-baseline gap-2">
          <span
            className="inline-block font-serif leading-none text-bubblegum-peach"
            style={{ fontSize: '72px', transform: 'rotate(-10deg)' }}
            aria-hidden="true"
          >
            ♩
          </span>
          <span className="text-2xl font-black tracking-[-0.03em] text-bubblegum-plum">
            cadence
          </span>
        </div>

        <div className="relative z-[1] mt-6">
          <p className="text-[34px] font-black leading-[1.05] tracking-[-0.03em] text-bubblegum-plum">
            {heading.split(' ').map((word, i, arr) => {
              // Highlight last word with butter pill for visual hook
              if (i === arr.length - 1) {
                return (
                  <span key={i}>
                    <span
                      className="inline-block rounded-lg bg-bubblegum-butter px-2"
                      style={{ transform: 'rotate(-1deg)' }}
                    >
                      {word.replace(/[.?!]$/, '')}
                    </span>
                    {word.match(/[.?!]$/)?.[0] ?? ''}
                  </span>
                )
              }
              return (
                <span key={i}>
                  {word}
                  {i < arr.length - 1 ? ' ' : ''}
                </span>
              )
            })}
          </p>
          <p className="mt-3 max-w-[32ch] text-sm font-semibold text-bubblegum-plum-soft">
            {subhead}
          </p>
        </div>

        {/* Sign-in / Sign-up tab strip */}
        {mode !== 'forgot' && (
          <div className="relative z-[1] mt-6 flex rounded-full bg-white p-1">
            {(['signin', 'signup'] as const).map((m) => (
              <button
                key={m}
                type="button"
                onClick={() => switchMode(m)}
                className={`flex-1 rounded-full py-2 text-xs font-extrabold tracking-tight transition-colors touch-manipulation ${
                  mode === m
                    ? 'bg-bubblegum-plum text-bubblegum-cream'
                    : 'text-bubblegum-plum-soft'
                }`}
              >
                {m === 'signin' ? 'Sign in' : 'Sign up'}
              </button>
            ))}
          </div>
        )}

        <AnimatePresence mode="wait">
          <motion.form
            key={mode}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.18 }}
            onSubmit={handleSubmit}
            className="relative z-[1] mt-5 flex flex-col gap-3.5"
          >
            <div>
              <Mono size="xs">email</Mono>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                required
                autoComplete="email"
                className={`mt-1 ${INPUT_CLASS}`}
              />
            </div>

            {mode !== 'forgot' && (
              <div>
                <Mono size="xs">password</Mono>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder={mode === 'signup' ? 'Min. 6 characters' : '••••••••'}
                  required
                  autoComplete={mode === 'signup' ? 'new-password' : 'current-password'}
                  className={`mt-1 ${INPUT_CLASS}`}
                />
              </div>
            )}

            {mode === 'signup' && (
              <div>
                <Mono size="xs">confirm password</Mono>
                <input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Re-enter password"
                  required
                  autoComplete="new-password"
                  className={`mt-1 ${INPUT_CLASS}`}
                />
              </div>
            )}

            {error && (
              <div className="rounded-2xl border-2 border-bubblegum-cherry bg-bubblegum-cherry/20 px-4 py-3">
                <p className="text-sm font-bold text-bubblegum-plum">{error}</p>
              </div>
            )}

            {success && (
              <div className="rounded-2xl bg-bubblegum-mint px-4 py-3">
                <p className="text-sm font-bold text-bubblegum-plum">{success}</p>
              </div>
            )}

            <div className="mt-1">
              <PrimaryButton type="submit" disabled={loading}>
                {ctaLabel}
              </PrimaryButton>
            </div>

            {mode === 'signin' && (
              <GhostButton type="button" onClick={() => switchMode('forgot')}>
                Forgot your password?
              </GhostButton>
            )}
            {mode === 'forgot' && (
              <GhostButton type="button" onClick={() => switchMode('signin')}>
                ← Back to sign in
              </GhostButton>
            )}
          </motion.form>
        </AnimatePresence>

        {/* Feature chips */}
        {mode === 'signup' && (
          <div className="relative z-[1] mt-5 flex flex-wrap gap-1.5">
            <Pill tone="mint" size="sm">🎼 Notation</Pill>
            <Pill tone="sky" size="sm">🥁 Rhythm</Pill>
            <Pill tone="lavender" size="sm">🎹 Scales</Pill>
            <Pill tone="peach" size="sm">📏 Intervals</Pill>
            <Pill tone="pink" size="sm">🎸 Chords</Pill>
          </div>
        )}

        {/* Skip */}
        <div className="relative z-[1] mt-auto pb-4 pt-6 text-center">
          <button
            type="button"
            onClick={() => navigate('/')}
            className="text-xs font-bold text-bubblegum-plum-dim touch-manipulation"
          >
            Skip for now — browse without a backstage pass.
          </button>
        </div>
      </div>
    </BubblegumLayout>
  )
}
