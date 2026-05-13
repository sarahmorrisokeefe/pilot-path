import { useState, type ReactNode } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Capacitor } from '@capacitor/core'
import {
  BubblegumLayout,
  Doodle,
  Mono,
  Eyebrow,
  Pill,
} from '../components/bubblegum'
import { useAuth } from '../context/AuthContext'
import { useProgress } from '../hooks/useProgress'
import { useDarkMode } from '../hooks/useDarkMode'
import { getLiveStreak } from '../utils'

const LEVEL_THRESHOLDS = [0, 50, 150, 300, 500, 800, 1200, 1800, 2500, 3500]
function getLevel(totalXP: number): number {
  for (let i = LEVEL_THRESHOLDS.length - 1; i >= 0; i--) {
    if (totalXP >= LEVEL_THRESHOLDS[i]) return i + 1
  }
  return 1
}

function firstNameFromUser(email: string | undefined): string {
  if (!email) return 'You'
  const local = email.split('@')[0] ?? 'You'
  return local.charAt(0).toUpperCase() + local.slice(1)
}

export function Settings() {
  const { user, signOut, resetPassword } = useAuth()
  const { progress, resetProgress } = useProgress()
  const { isDark, toggle } = useDarkMode()
  const navigate = useNavigate()

  const [resetEmailSent, setResetEmailSent] = useState(false)
  const [signingOut, setSigningOut] = useState(false)

  // Local-only toggle stubs — preferences UI surface lands now,
  // wiring lands when the data layer adds these flags.
  const [confettiOn, setConfettiOn] = useState(true)
  const [audioOn, setAudioOn] = useState(true)
  const [bsidesOn, setBsidesOn] = useState(true)
  const [hardModeOn, setHardModeOn] = useState(false)

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

  const handleWipe = () => {
    if (
      window.confirm(
        'Wipe the setlist? This resets all XP, streaks, and records. No undo.'
      )
    ) {
      resetProgress()
    }
  }

  const displayName = firstNameFromUser(user?.email)
  const liveStreakCount = getLiveStreak(progress.streak)
  const trackLabel = String(getLevel(progress.totalXP)).padStart(2, '0')

  return (
    <BubblegumLayout
      back
      title="Backstage"
      onBack={() => navigate(-1)}
      hideTabBar={false}
      activeTab="home"
      headerRight={<div className="h-[38px] w-[38px]" />}
    >
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.2 }}
        className="flex flex-col gap-[18px] pt-1"
      >

        {/* Performer card */}
        <div className="relative overflow-hidden rounded-bubble bg-bubblegum-butter p-5 text-bubblegum-plum">
          <Doodle ch="♪" x={20} y={10} size={28} rot={-15} color="#ffaf95" />
          <Doodle ch="♬" x={290} y={120} size={42} rot={12} color="#ffaf95" opacity={0.5} />

          <Mono>performer card</Mono>

          <div className="mt-3 flex items-center gap-4">
            <div
              className="flex h-[72px] w-[72px] -rotate-[4deg] items-center justify-center rounded-full border-[5px] border-white bg-bubblegum-lavender text-3xl font-black text-bubblegum-plum"
              aria-hidden="true"
            >
              {displayName.charAt(0)}
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-[22px] font-black leading-[1.1] tracking-[-0.02em] text-bubblegum-plum">
                {displayName}
              </p>
              <p className="mt-0.5 truncate text-xs font-semibold text-bubblegum-plum-soft">
                {user?.email ?? 'No backstage pass yet'}
              </p>
              <div className="mt-1.5 flex flex-wrap gap-1.5">
                <Pill tone="white" size="sm">Track {trackLabel}</Pill>
                <Pill tone="peach" size="sm">
                  🔥 {liveStreakCount} night{liveStreakCount === 1 ? '' : 's'}
                </Pill>
              </div>
            </div>
          </div>
        </div>

        {/* The show */}
        <Section eyebrow="the show 🎤">
          <SettingRow
            icon="🎯"
            label="Set length"
            sub={`${progress.dailyGoal} song${progress.dailyGoal === 1 ? '' : 's'} per night`}
            accent="peach"
            right={<Chevron />}
          />
          <Divider />
          <SettingRow
            icon="🔁"
            label="B-sides"
            sub="Auto-resurface flubs after a few days"
            accent="mint"
            right={<Toggle on={bsidesOn} onClick={() => setBsidesOn((v) => !v)} />}
          />
          <Divider />
          <SettingRow
            icon="🌶"
            label="Hard mode"
            sub="Encore-difficulty everywhere"
            accent="cherry"
            right={<Toggle on={hardModeOn} onClick={() => setHardModeOn((v) => !v)} />}
          />
        </Section>

        {/* The venue */}
        <Section eyebrow="the venue 🎚">
          <SettingRow
            icon="🔊"
            label="Audio"
            sub="Note playback in study cards"
            accent="lavender"
            right={<Toggle on={audioOn} onClick={() => setAudioOn((v) => !v)} />}
          />
          <Divider />
          <SettingRow
            icon="🎉"
            label="Confetti"
            sub="Encore celebrations"
            accent="pink"
            right={<Toggle on={confettiOn} onClick={() => setConfettiOn((v) => !v)} />}
          />
          <Divider />
          <SettingRow
            icon="🌙"
            label="House lights"
            sub={isDark ? 'Lights down' : 'Lights up'}
            accent="plum"
            right={<Toggle on={isDark} onClick={toggle} />}
          />
        </Section>

        {/* Tip jar */}
        {!Capacitor.isNativePlatform() && (
          <a
            href="https://ko-fi.com/sarahmorrisokeefe"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 rounded-3xl bg-bubblegum-cherry/25 p-4 text-bubblegum-plum transition-transform active:scale-[0.99] touch-manipulation dark:bg-bubblegum-cherry/15 dark:text-night-fg dark:shadow-glow-cherry"
          >
            <span
              className="inline-block -rotate-[8deg] text-4xl leading-none"
              aria-hidden="true"
            >
              ☕
            </span>
            <div className="flex-1">
              <p className="text-sm font-black">Drop a tip in the jar</p>
              <p className="mt-0.5 text-xs font-semibold text-bubblegum-plum-soft dark:text-night-fg2">
                Cadence is made by one person. Buy them a coffee on Ko-fi.
              </p>
            </div>
            <span className="text-lg font-black text-bubblegum-cherry">›</span>
          </a>
        )}

        {/* The fine print */}
        <Section eyebrow="the fine print 📜">
          <SettingRow
            icon="🎼"
            label="musictheory.net"
            sub="The open-web reference we love"
            accent="sky"
            right={<Chevron />}
            onClick={() =>
              window.open('https://www.musictheory.net/', '_blank', 'noopener,noreferrer')
            }
          />
          <Divider />
          <SettingRow
            icon="📋"
            label="AP Music Theory"
            sub="College Board course"
            accent="pink"
            right={<Chevron />}
            onClick={() =>
              window.open(
                'https://apcentral.collegeboard.org/courses/ap-music-theory',
                '_blank',
                'noopener,noreferrer'
              )
            }
          />
          {user && (
            <>
              <Divider />
              <SettingRow
                icon="🔐"
                label={resetEmailSent ? '✅ Reset link sent' : 'Change password'}
                sub={user.email ?? '—'}
                accent="lavender"
                right={resetEmailSent ? null : <Chevron />}
                onClick={resetEmailSent ? undefined : handleChangePassword}
              />
            </>
          )}
        </Section>

        {/* Danger zone */}
        {user ? (
          <div className="overflow-hidden rounded-3xl border-2 border-dashed border-bubblegum-cherry/50 bg-white dark:bg-night-panel p-1.5">
            <SettingRow
              icon="🧨"
              label="Wipe the setlist"
              sub="Reset all XP, streaks, and records. No undo."
              accent="cherry"
              right={<Chevron tone="cherry" />}
              onClick={handleWipe}
            />
            <Divider />
            <SettingRow
              icon="🚪"
              label={signingOut ? 'Leaving the stage…' : 'Leave the stage'}
              sub="Sign out of this device"
              accent="cream"
              right={<Chevron />}
              onClick={signingOut ? undefined : handleSignOut}
            />
          </div>
        ) : (
          <button
            type="button"
            onClick={() => navigate('/auth')}
            className="w-full rounded-3xl bg-bubblegum-plum p-4 text-center text-bubblegum-cream"
          >
            <p className="text-sm font-black">Get a backstage pass</p>
            <p className="mt-1 text-xs font-semibold text-bubblegum-cream/80">
              Grab a backstage pass to sync your set across devices.
            </p>
          </button>
        )}

        {/* Footer credit */}
        <div className="mt-2 pb-2 text-center">
          <span
            className="inline-block -rotate-[10deg] font-serif text-2xl leading-none text-bubblegum-peach"
            aria-hidden="true"
          >
            ♩
          </span>
          <p className="mt-1.5 text-[11px] font-bold text-bubblegum-plum-dim">
            Cadence
          </p>
          <p className="mt-1 text-[11px] font-semibold text-bubblegum-plum-dim">
            Built with love by{' '}
            <a
              href="https://okeefesarah.com"
              target="_blank"
              rel="noopener noreferrer"
              className="font-black text-bubblegum-plum"
            >
              Sarah O'Keefe
            </a>
            .
          </p>
        </div>
      </motion.div>
    </BubblegumLayout>
  )
}

// ── Building blocks ─────────────────────────────────────────────────────────

function Section({ eyebrow, children }: { eyebrow: string; children: ReactNode }) {
  return (
    <div>
      <Eyebrow>{eyebrow}</Eyebrow>
      <div className="overflow-hidden rounded-3xl bg-white dark:bg-night-panel p-1.5">{children}</div>
    </div>
  )
}

function Divider() {
  return <div className="mx-3.5 h-px bg-bubblegum-cream-hi dark:bg-night-panel-hi" />
}

const ACCENT_BG = {
  peach:    'bg-bubblegum-peach',
  mint:     'bg-bubblegum-mint',
  cherry:   'bg-bubblegum-cherry/60',
  lavender: 'bg-bubblegum-lavender',
  pink:     'bg-bubblegum-pink',
  plum:     'bg-bubblegum-plum',
  sky:      'bg-bubblegum-sky',
  cream:    'bg-bubblegum-cream-hi',
  butter:   'bg-bubblegum-butter',
} as const

type AccentTone = keyof typeof ACCENT_BG

function SettingRow({
  icon,
  label,
  sub,
  accent,
  right,
  onClick,
}: {
  icon: string
  label: string
  sub?: string
  accent: AccentTone
  right?: ReactNode
  onClick?: () => void
}) {
  const Element = onClick ? 'button' : 'div'
  const interactive = onClick
    ? 'cursor-pointer hover:bg-bubblegum-cream-hi/40 active:bg-bubblegum-cream-hi transition-colors touch-manipulation'
    : ''
  return (
    <Element
      type={onClick ? 'button' : undefined}
      onClick={onClick}
      className={`flex w-full items-center gap-3 px-3.5 py-3.5 text-left ${interactive}`}
    >
      <div
        className={`flex h-[38px] w-[38px] flex-shrink-0 -rotate-[4deg] items-center justify-center rounded-xl text-xl ${ACCENT_BG[accent]} ${accent === 'plum' ? 'text-bubblegum-cream' : 'text-bubblegum-plum'}`}
        aria-hidden="true"
      >
        {icon}
      </div>
      <div className="min-w-0 flex-1">
        <p className="text-sm font-black leading-tight text-bubblegum-plum">{label}</p>
        {sub && (
          <p className="mt-0.5 text-[11px] font-semibold text-bubblegum-plum-soft">{sub}</p>
        )}
      </div>
      {right != null && <div className="flex-shrink-0">{right}</div>}
    </Element>
  )
}

function Toggle({ on, onClick }: { on: boolean; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={(e) => {
        e.stopPropagation()
        onClick()
      }}
      role="switch"
      aria-checked={on}
      className={`relative h-7 w-[46px] rounded-full transition-colors touch-manipulation ${
        on ? 'bg-bubblegum-plum dark:bg-bubblegum-butter' : 'bg-bubblegum-cream-hi dark:bg-night-panel-hi'
      }`}
    >
      <span
        className="absolute top-[3px] h-[22px] w-[22px] rounded-full bg-white shadow-[0_1px_3px_rgba(0,0,0,0.15)] transition-[left] duration-200"
        style={{ left: on ? '22px' : '3px' }}
      />
    </button>
  )
}

function Chevron({ tone = 'plum' }: { tone?: 'plum' | 'cherry' }) {
  return (
    <span
      className={`text-sm font-black ${tone === 'cherry' ? 'text-bubblegum-cherry' : 'text-bubblegum-plum'}`}
      aria-hidden="true"
    >
      ›
    </span>
  )
}
