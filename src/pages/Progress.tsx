import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import {
  BubblegumLayout,
  Doodle,
  Mono,
  Eyebrow,
  PrimaryButton,
  type BubblegumTone,
} from '../components/bubblegum'
import { COURSES } from '../data/courses'
import { useProgress } from '../hooks/useProgress'
import { useRequireAuth } from '../hooks/useRequireAuth'
import { formatTime, getLiveStreak } from '../utils'
import { TONE_BG } from '../utils/bubblegum'
import type { BadgeId } from '../types'

const LEVEL_THRESHOLDS = [0, 50, 150, 300, 500, 800, 1200, 1800, 2500, 3500]

function getLevel(totalXP: number): number {
  for (let i = LEVEL_THRESHOLDS.length - 1; i >= 0; i--) {
    if (totalXP >= LEVEL_THRESHOLDS[i]) return i + 1
  }
  return 1
}

interface RecordDef {
  id: BadgeId
  name: string
  description: string
  icon: string
  tone: BubblegumTone
  progress?: (p: ReturnType<typeof useProgress>['progress']) => number
}

const RECORDS: RecordDef[] = [
  { id: 'first-steps',   name: 'First Song',      description: 'Finish your first track', icon: '🎼', tone: 'lavender' },
  { id: 'note-reader',   name: 'Note Reader',     description: 'Finish the Notation album', icon: '🎼', tone: 'lavender' },
  { id: 'rhythm-keeper', name: 'Rhythm Rookie',   description: 'Finish the Rhythm album', icon: '🥁', tone: 'peach' },
  { id: 'scale-master',  name: 'Scale Climber',   description: 'Finish the Scales album', icon: '🎹', tone: 'pink' },
  { id: 'interval-pro',  name: 'Interval Pro',    description: 'Finish the Intervals album', icon: '📏', tone: 'sky' },
  { id: 'chord-builder', name: 'Chord Wizard',    description: 'Finish the Chords album', icon: '🎸', tone: 'mint' },
  { id: 'perfect-score', name: 'Perfect Set',     description: '100% on any quiz', icon: '💯', tone: 'mint' },
  { id: 'week-warrior',  name: 'Week Warrior',    description: '7 nights in a row', icon: '🔥', tone: 'peach' },
  { id: 'dedicated',     name: 'Headliner',       description: '30 nights in a row', icon: '🎤', tone: 'butter' },
  { id: 'century',       name: 'Century',         description: 'Earn 100 XP', icon: '🪕', tone: 'butter' },
  { id: 'scholar',       name: 'Gold Record',     description: 'Earn 1,000 XP', icon: '🏆', tone: 'butter' },
]

const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.06 } },
}
const item = { hidden: { opacity: 0, y: 12 }, show: { opacity: 1, y: 0 } }

export function Progress() {
  const { progress } = useProgress()
  const liveStreakCount = getLiveStreak(progress.streak)
  const level = getLevel(progress.totalXP)
  const trackLabel = String(level).padStart(2, '0')

  if (progress.totalXP === 0 && progress.badges.length === 0) {
    return <EmptyRecords />
  }

  return (
    <BubblegumLayout activeTab="progress">
      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="flex flex-col gap-[18px] pt-1"
      >
        <motion.div variants={item} className="px-1">
          <p className="text-[28px] font-black leading-tight tracking-[-0.025em] text-bubblegum-plum dark:text-night-fg">
            Your{' '}
            <span
              className="inline-block rounded-lg bg-bubblegum-butter px-2"
              style={{ transform: 'rotate(-1deg)' }}
            >
              records
            </span>
          </p>
        </motion.div>

        {/* Stats hero */}
        <motion.div variants={item} className="grid grid-cols-3 gap-2.5">
          <StatTile label="total XP"  value={progress.totalXP.toString()} tone="peach" />
          <StatTile label="track"     value={trackLabel}                  tone="lavender" />
          <StatTile label="nights"    value={liveStreakCount.toString()}  tone="mint" />
        </motion.div>

        {/* Longest streak callout */}
        {progress.streak.longest > liveStreakCount && (
          <motion.div
            variants={item}
            className="flex items-center justify-between rounded-3xl bg-white dark:bg-night-panel p-4 text-bubblegum-plum"
          >
            <div className="flex items-center gap-3">
              <span
                className="inline-block text-3xl leading-none"
                style={{ transform: 'rotate(-6deg)' }}
                aria-hidden="true"
              >
                🔥
              </span>
              <div>
                <Mono>longest run</Mono>
                <p className="mt-0.5 text-base font-black leading-tight">
                  {progress.streak.longest} nights
                </p>
              </div>
            </div>
            <p className="text-[11px] font-bold text-bubblegum-plum-soft">
              Beat it from {liveStreakCount}
            </p>
          </motion.div>
        )}

        {/* Records grid */}
        <motion.div variants={item}>
          <Eyebrow>your records 🏆</Eyebrow>
          <div className="grid grid-cols-2 gap-3">
            {RECORDS.map((r) => {
              const earned = progress.badges.includes(r.id)
              const locked = !earned && r.id === 'dedicated' && liveStreakCount < 7
              return <RecordCard key={r.id} record={r} earned={earned} locked={locked} />
            })}
          </div>
        </motion.div>

        {/* Test history */}
        {progress.testResults.length > 0 && (
          <motion.div variants={item}>
            <Eyebrow>last few tests 📻</Eyebrow>
            <div className="overflow-hidden rounded-3xl bg-white dark:bg-night-panel p-1.5">
              {[...progress.testResults]
                .reverse()
                .slice(0, 5)
                .map((r, i, arr) => {
                  const course = COURSES.find((c) => c.id === r.courseId)
                  const scoreTone =
                    r.score >= 90 ? 'bg-bubblegum-mint'
                    : r.score >= 70 ? 'bg-bubblegum-butter'
                    : 'bg-bubblegum-cherry/30'
                  return (
                    <div
                      key={r.id}
                      className={`flex items-center gap-3 rounded-[18px] px-3 py-3 ${i < arr.length - 1 ? 'mb-0.5' : ''}`}
                    >
                      <div
                        className={`flex h-[42px] w-[42px] flex-shrink-0 items-center justify-center rounded-full text-sm font-black tabular-nums text-bubblegum-plum ${scoreTone}`}
                        style={{ transform: 'rotate(-3deg)' }}
                      >
                        {r.score}
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="truncate text-sm font-black text-bubblegum-plum">
                          {course?.shortTitle ?? r.courseId}
                        </p>
                        <Mono size="xs">
                          {new Date(r.date).toLocaleDateString()} · {formatTime(r.timeTaken)}
                        </Mono>
                      </div>
                      <Mono size="xs" tone={r.passed ? 'plum' : 'cherry'}>
                        {r.passed ? 'pass' : 'fail'}
                      </Mono>
                    </div>
                  )
                })}
            </div>
          </motion.div>
        )}

        <motion.p
          variants={item}
          className="mt-1 mb-4 text-center text-xs font-bold text-bubblegum-plum-soft"
        >
          Wipe-the-setlist lives in{' '}
          <span className="font-black text-bubblegum-plum">Backstage</span>.
        </motion.p>
      </motion.div>
    </BubblegumLayout>
  )
}

function StatTile({
  label,
  value,
  tone,
}: {
  label: string
  value: string
  tone: BubblegumTone
}) {
  const dimmed = value === '0' || value === '00'
  return (
    <div className={`rounded-[20px] ${TONE_BG[tone]} p-3 text-center`}>
      <Mono size="xs">{label}</Mono>
      <p
        className={`mt-1 inline-block text-[32px] font-black leading-[0.9] tabular-nums text-bubblegum-plum ${
          dimmed ? 'opacity-40' : ''
        }`}
        style={{ letterSpacing: '-0.03em', transform: 'rotate(-2deg)' }}
      >
        {value}
      </p>
    </div>
  )
}

function RecordCard({
  record,
  earned,
  locked,
}: {
  record: RecordDef
  earned: boolean
  locked: boolean
}) {
  const dimmed = !earned
  return (
    <div
      className={`relative rounded-[22px] ${TONE_BG[record.tone]} p-4 text-center text-bubblegum-plum ${
        dimmed ? 'opacity-55' : ''
      }`}
    >
      <div
        className="mx-auto flex h-[70px] w-[70px] items-center justify-center rounded-full border-[4px] border-white bg-white text-4xl"
        style={{ transform: 'rotate(-6deg)' }}
        aria-hidden="true"
      >
        <span className={dimmed ? 'grayscale' : ''}>{record.icon}</span>
        {earned && (
          <span
            className="absolute -bottom-1 -right-1 flex h-6 w-6 items-center justify-center rounded-full border-[3px] border-white bg-bubblegum-green text-sm font-black text-white"
            aria-hidden="true"
          >
            ✓
          </span>
        )}
        {locked && (
          <span
            className="absolute -bottom-1 -right-1 flex h-6 w-6 items-center justify-center rounded-full border-[3px] border-white bg-bubblegum-plum-dim text-xs text-white"
            aria-hidden="true"
          >
            🔒
          </span>
        )}
      </div>
      <p className="mt-2.5 text-[13px] font-black leading-tight">{record.name}</p>
      <p className="mt-0.5 text-[11px] font-semibold text-bubblegum-plum-soft">
        {record.description}
      </p>
    </div>
  )
}

// ── Empty variant — BGEmptyRecords ──────────────────────────────────────────

const RECORDS_TO_CHASE: { name: string; description: string; icon: string; tone: BubblegumTone }[] = [
  { name: 'First Song',    description: 'Finish track A1',     icon: '🎼', tone: 'lavender' },
  { name: 'Week Warrior',  description: '7 nights in a row',  icon: '🔥', tone: 'peach' },
  { name: 'Perfect Set',   description: '100% on any quiz',   icon: '💯', tone: 'mint' },
  { name: 'Gold Record',   description: '90% on an album',    icon: '🏆', tone: 'butter' },
]

function EmptyRecords() {
  const navigate = useNavigate()
  const { gate } = useRequireAuth()

  const firstCourse = COURSES[0]
  const firstModule = firstCourse?.modules[0]
  const firstLesson = firstModule?.lessons[0]

  const openFirstTrack = () => {
    if (!firstCourse || !firstModule || !firstLesson) return
    gate(
      () =>
        navigate(
          `/learn/${firstCourse.id}/modules/${firstModule.id}/lessons/${firstLesson.id}`
        ),
      'Grab a backstage pass to play tracks'
    )
  }

  return (
    <BubblegumLayout activeTab="progress">
      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="flex flex-col gap-[18px] pt-1"
      >
        <motion.div variants={item} className="px-1">
          <p className="text-[28px] font-black leading-tight tracking-[-0.025em] text-bubblegum-plum dark:text-night-fg">
            Your{' '}
            <span className="inline-block -rotate-[1deg] rounded-lg bg-bubblegum-butter px-2">
              records
            </span>
          </p>
        </motion.div>

        {/* Faded stats hero — all zeros */}
        <motion.div variants={item} className="grid grid-cols-3 gap-2.5">
          <StatTile label="total XP" value="0"  tone="peach" />
          <StatTile label="track"    value="01" tone="lavender" />
          <StatTile label="nights"   value="0"  tone="mint" />
        </motion.div>

        {/* Big empty-state card */}
        <motion.div
          variants={item}
          className="relative overflow-hidden rounded-[28px] bg-white dark:bg-night-panel px-6 py-8 text-center"
        >
          <Doodle ch="✦" x={30} y={20}  size={18} color="#ffaf95" opacity={0.6} />
          <Doodle ch="✦" x={300} y={28} size={22} color="#cfb6ff" opacity={0.6} />
          <Doodle ch="♪" x={50} y={200} size={26} rot={-15} color="#a8e6b8" opacity={0.5} />
          <Doodle ch="♬" x={300} y={210} size={30} rot={12} color="#a8d8ff" opacity={0.5} />

          {/* Trophy silhouettes */}
          <div className="mb-4 flex justify-center gap-3.5">
            {(['peach', 'butter', 'lavender'] as const).map((tone, i) => (
              <div
                key={tone}
                className={`flex h-16 w-16 items-center justify-center rounded-full border-[4px] border-white text-[32px] grayscale ${
                  TONE_BG[tone]
                } ${i === 1 ? 'opacity-100 -rotate-[8deg]' : 'opacity-55'}`}
                aria-hidden="true"
              >
                {['🥉', '🏆', '🥈'][i]}
              </div>
            ))}
          </div>

          <p className="text-[24px] font-black leading-[1.1] tracking-[-0.025em] text-bubblegum-plum">
            No records yet —
            <br />
            <span className="text-bubblegum-cherry">but tonight's the night.</span>
          </p>
          <p className="mx-auto mt-3 mb-[18px] max-w-[30ch] text-[13px] font-semibold leading-relaxed text-bubblegum-plum-soft">
            Finish your first track to earn the "First Song" record. Records pile up as you play —
            gold for 90%, perfect for 100%, week warrior for 7 nights in a row.
          </p>
          {firstLesson && firstCourse && (
            <PrimaryButton tone="plum" onClick={openFirstTrack}>
              Play your first track →
            </PrimaryButton>
          )}
        </motion.div>

        {/* Records to chase */}
        <motion.div variants={item}>
          <Eyebrow>records you'll chase</Eyebrow>
          <div className="grid grid-cols-2 gap-3">
            {RECORDS_TO_CHASE.map((r) => (
              <RecordPreview key={r.name} record={r} />
            ))}
          </div>
        </motion.div>
      </motion.div>
    </BubblegumLayout>
  )
}

function RecordPreview({
  record,
}: {
  record: (typeof RECORDS_TO_CHASE)[number]
}) {
  return (
    <div
      className={`relative rounded-[22px] p-4 text-center text-bubblegum-plum opacity-60 ${TONE_BG[record.tone]}`}
    >
      <div
        className="mx-auto flex h-[60px] w-[60px] -rotate-[6deg] items-center justify-center rounded-full border-[4px] border-white bg-white text-3xl grayscale"
        aria-hidden="true"
      >
        {record.icon}
      </div>
      <p className="mt-2 text-[13px] font-black leading-tight">{record.name}</p>
      <p className="mt-0.5 text-[11px] font-semibold text-bubblegum-plum-soft">
        {record.description}
      </p>
    </div>
  )
}
