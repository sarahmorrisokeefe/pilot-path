import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Layout } from '../components/layout/Layout'
import { useAuth } from '../context/AuthContext'
import { useProgress } from '../hooks/useProgress'
import { useDarkMode } from '../hooks/useDarkMode'

// ─── Reusable settings row ──────────────────────────────────────────────────

function SettingsRow({
  label,
  value,
  onClick,
  destructive = false,
  disabled = false,
}: {
  label: string
  value?: string
  onClick?: () => void
  destructive?: boolean
  disabled?: boolean
}) {
  return (
    <div
      role={onClick ? 'button' : undefined}
      tabIndex={onClick ? 0 : undefined}
      onClick={disabled ? undefined : onClick}
      onKeyDown={onClick && !disabled ? (e) => e.key === 'Enter' && onClick() : undefined}
      className={`flex items-center justify-between px-4 py-3.5 border-b last:border-b-0 border-slate-100 dark:border-slate-700 ${
        onClick && !disabled
          ? 'cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-700/50 active:bg-slate-100 dark:active:bg-slate-700 transition-colors touch-manipulation'
          : ''
      }`}
    >
      <span
        className={`text-sm font-medium ${
          destructive
            ? 'text-red-500 dark:text-red-400'
            : disabled
            ? 'text-slate-400 dark:text-slate-500'
            : 'text-slate-700 dark:text-slate-200'
        }`}
      >
        {label}
      </span>
      {value && (
        <span className="text-sm text-slate-400 dark:text-slate-500 truncate max-w-[180px]">
          {value}
        </span>
      )}
      {onClick && !value && (
        <svg
          className="w-4 h-4 text-slate-300 dark:text-slate-600 flex-shrink-0"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
        </svg>
      )}
    </div>
  )
}

function SectionLabel({ children }: { children: string }) {
  return (
    <p className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wide px-1 mb-2 mt-6 first:mt-0">
      {children}
    </p>
  )
}

function SettingsCard({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-100 dark:border-slate-700 shadow-sm overflow-hidden">
      {children}
    </div>
  )
}

// ─── Main page ──────────────────────────────────────────────────────────────

export function Settings() {
  const { user, signOut, resetPassword } = useAuth()
  const { resetProgress } = useProgress()
  const { preference, setMode } = useDarkMode()
  const navigate = useNavigate()

  const [resetEmailSent, setResetEmailSent] = useState(false)
  const [signingOut, setSigningOut] = useState(false)

  const handleSignOut = async () => {
    setSigningOut(true)
    await signOut()
    navigate('/')
  }

  const handleChangePassword = async () => {
    if (!user?.email) return
    const { error } = await resetPassword(user.email)
    if (!error) setResetEmailSent(true)
  }

  const handleResetProgress = () => {
    if (window.confirm('Reset all progress? This cannot be undone.')) {
      resetProgress()
    }
  }

  const darkModeLabel =
    preference === 'light' ? '☀️ Light' : preference === 'dark' ? '🌙 Dark' : '⚙️ System'

  const cycleDarkMode = () => {
    const next = preference === 'system' ? 'light' : preference === 'light' ? 'dark' : 'system'
    setMode(next)
  }

  return (
    <Layout title="Settings">
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.2 }}
        className="space-y-1 pb-4"
      >
        {/* ── Account section ─────────────────────────────────────────── */}
        <SectionLabel>Account</SectionLabel>

        {user ? (
          <SettingsCard>
            <SettingsRow label="Signed in as" value={user.email ?? '—'} />
            <SettingsRow
              label={resetEmailSent ? '✅ Reset link sent!' : 'Change Password'}
              onClick={resetEmailSent ? undefined : handleChangePassword}
              disabled={resetEmailSent}
            />
            <SettingsRow
              label={signingOut ? 'Signing out…' : 'Sign Out'}
              onClick={signingOut ? undefined : handleSignOut}
              destructive
              disabled={signingOut}
            />
          </SettingsCard>
        ) : (
          <SettingsCard>
            <div className="p-5 text-center space-y-3">
              <div className="text-3xl">☁️</div>
              <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                Sign in to sync your progress across your phone, tablet, and computer.
              </p>
              <button
                onClick={() => navigate('/auth')}
                className="w-full py-3 rounded-xl bg-sky-500 hover:bg-sky-600 text-white font-bold text-sm transition-colors touch-manipulation"
              >
                Sign In or Create Account
              </button>
            </div>
          </SettingsCard>
        )}

        {/* ── App section ──────────────────────────────────────────────── */}
        <SectionLabel>App</SectionLabel>

        <SettingsCard>
          <SettingsRow
            label="Appearance"
            value={darkModeLabel}
            onClick={cycleDarkMode}
          />
          <SettingsRow
            label="Reset All Progress"
            onClick={handleResetProgress}
            destructive
          />
        </SettingsCard>

        {/* ── About section ────────────────────────────────────────────── */}
        <SectionLabel>About</SectionLabel>

        <SettingsCard>
          <SettingsRow label="App Version" value="0.1.0" />
          <SettingsRow
            label="FAA Website"
            value="faa.gov ↗"
            onClick={() => window.open('https://www.faa.gov', '_blank', 'noopener,noreferrer')}
          />
          <SettingsRow
            label="FAA Handbooks & Manuals"
            value="faa.gov ↗"
            onClick={() =>
              window.open(
                'https://www.faa.gov/regulations_policies/handbooks_manuals/aviation',
                '_blank',
                'noopener,noreferrer'
              )
            }
          />
        </SettingsCard>
      </motion.div>
    </Layout>
  )
}
