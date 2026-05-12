import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import {
  BubblegumLayout,
  Doodle,
  Pill,
  Mono,
  Eyebrow,
  PrimaryButton,
  CategoryChip,
} from '../components/bubblegum'
import { COURSES } from '../data/courses'
import { useProgress } from '../hooks/useProgress'
import { useRequireAuth } from '../hooks/useRequireAuth'
import {
  getTopWeakAreas,
  getCourseCompletion,
  getTodayDateString,
  getLiveStreak,
} from '../utils'
import { getAlbumTone, TONE_BG } from '../utils/bubblegum'
import type { Course } from '../types'

const LEVEL_THRESHOLDS = [0, 50, 150, 300, 500, 800, 1200, 1800, 2500, 3500]

function getLevel(totalXP: number) {
  for (let i = LEVEL_THRESHOLDS.length - 1; i >= 0; i--) {
    if (totalXP >= LEVEL_THRESHOLDS[i]) return i + 1
  }
  return 1
}

function firstNameFromUser(email: string | undefined): string {
  if (!email) return 'there'
  const local = email.split('@')[0] ?? 'there'
  return local.charAt(0).toUpperCase() + local.slice(1)
}

const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.07 } },
}
const item = { hidden: { opacity: 0, y: 16 }, show: { opacity: 1, y: 0 } }

export function Home() {
  const { user } = useRequireAuth()
  const { progress } = useProgress()

  if (!user) return <SignedOutHome />
  if (progress.totalXP === 0) return <FirstNightHome />
  return <SignedInHome />
}

// ── Signed-out variant — BGSignedOutHome ─────────────────────────────────────

function SignedOutHome() {
  const navigate = useNavigate()

  const headerRight = (
    <button
      type="button"
      onClick={() => navigate('/auth')}
      className="rounded-full bg-bubblegum-plum px-3.5 py-2 text-xs font-extrabold text-bubblegum-cream touch-manipulation"
    >
      Sign in
    </button>
  )

  return (
    <BubblegumLayout activeTab="home" headerRight={headerRight}>
      <motion.div variants={container} initial="hidden" animate="show" className="flex flex-col gap-[18px] pt-1">

        {/* Anonymous greeting */}
        <motion.div variants={item} className="px-1">
          <p className="text-[22px] font-black tracking-[-0.02em] text-bubblegum-plum">
            Hey there{' '}
            <span className="inline-block" style={{ transform: 'rotate(-10deg)' }}>
              👋
            </span>
          </p>
          <p className="mt-1 text-[13px] font-semibold text-bubblegum-plum-soft">
            Wander the venue — grab a pass when you're ready.
          </p>
        </motion.div>

        {/* Hero — sign-in prompt */}
        <motion.div
          variants={item}
          className="relative overflow-hidden rounded-bubble bg-bubblegum-butter p-[22px]"
        >
          <Doodle ch="♪" x={20} y={10} size={28} rot={-15} color="#ffaf95" />
          <Doodle ch="♬" x={290} y={8} size={42} rot={12} color="#ffaf95" opacity={0.5} />
          <Doodle ch="✦" x={300} y={130} size={22} color="#ff7faf" opacity={0.6} />

          <p className="text-[26px] font-black leading-[1.05] tracking-[-0.025em] text-bubblegum-plum">
            Get a{' '}
            <span
              className="inline-block rounded-lg bg-bubblegum-peach px-2"
              style={{ transform: 'rotate(-1deg)' }}
            >
              backstage pass
            </span>
            <br />
            to save your set.
          </p>
          <p className="mt-2.5 text-[13px] font-semibold text-bubblegum-plum-soft">
            Sign in to track tracks, build streaks, and earn records.
          </p>

          <div className="mt-4">
            <PrimaryButton onClick={() => navigate('/auth')}>Take the stage →</PrimaryButton>
          </div>
        </motion.div>

        {/* Walk the venue — locked but visible setlist */}
        <motion.div variants={item}>
          <Eyebrow>walk the venue 🎵</Eyebrow>
          <p className="-mt-1.5 mb-3 px-1 text-xs font-semibold text-bubblegum-plum-soft">
            Tap any album to preview — saving progress needs a pass.
          </p>
          <div className="grid grid-cols-2 gap-3">
            {COURSES.slice(0, 4).map((course) => (
              <AlbumPreviewCard
                key={course.id}
                course={course}
                onClick={() => navigate(`/learn/${course.id}`)}
              />
            ))}
          </div>
        </motion.div>

        {/* What's in the pass */}
        <motion.div
          variants={item}
          className="rounded-3xl bg-bubblegum-mint p-4"
        >
          <Eyebrow>what's in the pass</Eyebrow>
          <div className="mt-1 flex flex-col gap-2">
            {[
              ['⭐', 'XP after every quiz'],
              ['🔥', 'Daily streak that survives time-zones'],
              ['🏆', 'Records and gold-album unlocks'],
              ['🔄', 'B-sides — auto-resurfaces what you flubbed'],
            ].map(([icon, label]) => (
              <div key={label} className="flex items-center gap-3">
                <span
                  className="inline-block text-[22px] leading-none"
                  style={{ transform: 'rotate(-6deg)' }}
                  aria-hidden="true"
                >
                  {icon}
                </span>
                <span className="text-[13px] font-bold text-bubblegum-plum">{label}</span>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.p
          variants={item}
          className="mt-1 text-center text-xs font-semibold text-bubblegum-plum-dim"
        >
          Or keep wandering — no pass needed to peek.
        </motion.p>

      </motion.div>
    </BubblegumLayout>
  )
}

function AlbumPreviewCard({ course, onClick }: { course: Course; onClick: () => void }) {
  const tone = getAlbumTone(course.id)
  return (
    <button
      type="button"
      onClick={onClick}
      className={`${TONE_BG[tone]} touch-manipulation rounded-[22px] p-3.5 text-left text-bubblegum-plum transition-transform active:scale-[0.98]`}
    >
      <div
        className="mb-1 inline-block text-[38px] leading-none"
        style={{ transform: 'rotate(-4deg)' }}
        aria-hidden="true"
      >
        {course.icon}
      </div>
      <p className="text-[15px] font-black">{course.shortTitle}</p>
      <div className="mt-1">
        <Mono size="xs" tone="plum-soft">
          {course.modules.reduce((n, m) => n + m.lessons.length, 0)} tracks
        </Mono>
      </div>
    </button>
  )
}

// ── First-night variant — BGFirstNightHome (Day 1, 0 XP) ─────────────────────

function FirstNightHome() {
  const navigate = useNavigate()
  const { user, gate } = useRequireAuth()
  const firstName = firstNameFromUser(user?.email)

  // The very first lesson — A1 of the first course.
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
      'Sign in to start lessons'
    )
  }

  return (
    <BubblegumLayout activeTab="home">
      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="flex flex-col gap-[18px] pt-1"
      >
        <motion.div variants={item} className="px-1">
          <p className="text-[22px] font-black tracking-[-0.02em] text-bubblegum-plum">
            Welcome, {firstName}{' '}
            <span className="inline-block -rotate-[10deg]" aria-hidden="true">
              🎤
            </span>
          </p>
          <p className="mt-1 text-[13px] font-semibold text-bubblegum-plum-soft">
            The stage is yours. Let's play your first song.
          </p>
        </motion.div>

        {/* Hero — opening night */}
        <motion.div
          variants={item}
          className="relative overflow-hidden rounded-bubble bg-bubblegum-butter p-[22px] text-bubblegum-plum"
        >
          <Doodle ch="♪" x={20} y={10} size={28} rot={-15} color="#ffaf95" />
          <Doodle ch="♬" x={290} y={8} size={42} rot={12} color="#ffaf95" opacity={0.5} />

          <Mono>opening night · track 01</Mono>
          <div className="mt-1.5 flex items-baseline gap-2">
            <span
              className="inline-block font-black leading-[0.9] tabular-nums opacity-40"
              style={{
                fontSize: '78px',
                letterSpacing: '-0.05em',
                transform: 'rotate(-3deg)',
              }}
            >
              0
            </span>
            <span className="text-lg font-black">XP ⭐</span>
          </div>

          <div className="mt-3.5 flex flex-wrap gap-2">
            <Pill tone="white">🎤 First night</Pill>
            <Pill tone="peach">0 tracks played</Pill>
          </div>
        </motion.div>

        {/* Big start-here CTA */}
        {firstLesson && firstCourse && firstModule && (
          <motion.button
            variants={item}
            type="button"
            onClick={openFirstTrack}
            className="relative overflow-hidden rounded-3xl bg-bubblegum-sky p-[18px] text-left text-bubblegum-plum transition-transform active:scale-[0.99] touch-manipulation"
          >
            <Doodle ch="♩" x={290} y={70} size={56} rot={10} color="#cfb6ff" opacity={0.4} />

            <Mono>start here</Mono>
            <p className="mt-1 text-[22px] font-black leading-[1.05] tracking-[-0.02em]">
              Play your first track:
              <br />
              <span
                className="mt-1 inline-block -rotate-[1deg] rounded-lg bg-bubblegum-butter px-2"
              >
                {firstLesson.title}
              </span>
            </p>
            <p className="mt-2.5 mb-3.5 text-xs font-semibold text-bubblegum-plum-soft">
              {firstLesson.questions.length} short song
              {firstLesson.questions.length === 1 ? '' : 's'} · about 3 minutes · +
              {firstLesson.xpReward} XP
            </p>
            <PrimaryButton tone="plum">
              Open {firstCourse.shortTitle} · A1 →
            </PrimaryButton>
          </motion.button>
        )}

        {/* What's on the marquee */}
        <motion.div variants={item}>
          <Eyebrow>what's on the marquee 🎟</Eyebrow>
          <div className="grid grid-cols-3 gap-2.5">
            {COURSES.map((course) => (
              <MarqueeTile key={course.id} course={course} />
            ))}
          </div>
        </motion.div>

        {/* Streak tease */}
        <motion.div
          variants={item}
          className="flex items-center gap-3 rounded-3xl bg-bubblegum-peach/40 p-3.5"
        >
          <span
            className="inline-block -rotate-[8deg] text-3xl leading-none"
            aria-hidden="true"
          >
            🔥
          </span>
          <div className="flex-1">
            <p className="text-sm font-black text-bubblegum-plum">
              Start your first night
            </p>
            <p className="mt-0.5 text-xs font-semibold text-bubblegum-plum-soft">
              Finish a track today and your streak begins.
            </p>
          </div>
        </motion.div>

      </motion.div>
    </BubblegumLayout>
  )
}

function MarqueeTile({ course }: { course: Course }) {
  const tone = getAlbumTone(course.id, 'cream')
  return (
    <div className={`${TONE_BG[tone]} rounded-[18px] p-2.5 text-center text-bubblegum-plum`}>
      <div
        className="inline-block -rotate-[4deg] text-[28px] leading-none"
        aria-hidden="true"
      >
        {course.icon}
      </div>
      <p className="mt-1 text-[11px] font-black tracking-tight">{course.shortTitle}</p>
    </div>
  )
}

// ── Signed-in variant — BGHome ───────────────────────────────────────────────

function SignedInHome() {
  const navigate = useNavigate()
  const { progress } = useProgress()
  const { user, gate } = useRequireAuth()
  const weakAreas = getTopWeakAreas(progress, 3)

  const today = getTodayDateString()
  const dailyDone = progress.dailyGoalDate === today ? (progress.dailyGoalProgress ?? 0) : 0
  const dailyGoal = progress.dailyGoal ?? 3

  const nextLesson = (() => {
    for (const course of COURSES) {
      for (const mod of course.modules) {
        for (const lesson of mod.lessons) {
          const completed =
            progress.courses[course.id]?.modules[mod.id]?.lessonsProgress[lesson.id]?.completed
          if (!completed) return { course, mod, lesson }
        }
      }
    }
    return null
  })()

  const liveStreakCount = getLiveStreak(progress.streak)
  const level = getLevel(progress.totalXP)
  const trackLabel = String(level).padStart(2, '0')
  const firstName = firstNameFromUser(user?.email)

  return (
    <BubblegumLayout activeTab="home">
      <motion.div variants={container} initial="hidden" animate="show" className="flex flex-col gap-[18px] pt-1">

        {/* Greeting */}
        <motion.div variants={item} className="px-1">
          <p className="text-[22px] font-black tracking-[-0.02em] text-bubblegum-plum">
            Hi, {firstName}{' '}
            <span className="inline-block" style={{ transform: 'rotate(-10deg)' }} aria-hidden="true">
              👋
            </span>
          </p>
          <p className="mt-1 text-[13px] font-semibold text-bubblegum-plum-soft">
            The crowd's warming up. Let's play.
          </p>
        </motion.div>

        {/* HERO — tonight's set */}
        <motion.div
          variants={item}
          className="relative overflow-hidden rounded-bubble bg-bubblegum-butter p-[22px] text-bubblegum-plum"
        >
          <Doodle ch="♪" x={20} y={10} size={28} rot={-15} color="#ffaf95" />
          <Doodle ch="♬" x={290} y={8} size={42} rot={12} color="#ffaf95" opacity={0.5} />
          <Doodle ch="♫" x={260} y={140} size={30} rot={-8} color="#ffb3d9" opacity={0.7} />

          <Mono>tonight's set · track {trackLabel}</Mono>
          <div className="mt-1.5 flex items-baseline gap-2">
            <span
              className="inline-block font-black leading-[0.9] tabular-nums"
              style={{
                fontSize: '78px',
                letterSpacing: '-0.05em',
                transform: 'rotate(-3deg)',
              }}
            >
              {progress.totalXP}
            </span>
            <span className="text-lg font-black">XP ⭐</span>
          </div>

          <div className="mt-3.5 flex flex-wrap gap-2">
            <Pill tone="peach">🔥 {liveStreakCount} night{liveStreakCount === 1 ? '' : 's'}</Pill>
            <Pill tone="white">🎤 {dailyDone} of {dailyGoal} tonight</Pill>
          </div>
        </motion.div>

        {/* Daily goal — mint progress */}
        <motion.div
          variants={item}
          className="flex items-center gap-3.5 rounded-3xl bg-bubblegum-mint p-4"
        >
          <DailyGoalDonut done={dailyDone} goal={dailyGoal} />
          <div className="flex-1">
            <Mono>tonight's set</Mono>
            <p className="mt-0.5 text-base font-black leading-tight text-bubblegum-plum">
              {dailyGoalCopy(dailyDone, dailyGoal)}
            </p>
          </div>
        </motion.div>

        {/* Up next — sky card with next-lesson */}
        {nextLesson && (
          <motion.div variants={item}>
            <Eyebrow>up next ✨</Eyebrow>
            <button
              type="button"
              onClick={() =>
                gate(
                  () =>
                    navigate(
                      `/learn/${nextLesson.course.id}/modules/${nextLesson.mod.id}/lessons/${nextLesson.lesson.id}`
                    ),
                  'Sign in to start lessons'
                )
              }
              className="relative flex w-full items-center gap-3.5 overflow-hidden rounded-3xl bg-bubblegum-sky p-4 text-left text-bubblegum-plum transition-transform active:scale-[0.99] touch-manipulation"
            >
              <Doodle ch="♩" x={280} y={48} size={36} rot={10} color="#cfb6ff" opacity={0.6} />

              <div
                className="flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-[18px] bg-white text-3xl"
                style={{ transform: 'rotate(-4deg)' }}
                aria-hidden="true"
              >
                {nextLesson.course.icon}
              </div>
              <div className="min-w-0 flex-1">
                <Mono>
                  track {nextLesson.lesson.id.slice(0, 2).toUpperCase()} · {nextLesson.course.shortTitle}
                </Mono>
                <p className="mt-0.5 truncate text-[15px] font-black leading-tight">
                  {nextLesson.lesson.title}
                </p>
                <p className="mt-0.5 text-[11px] font-bold text-bubblegum-plum-soft">
                  {nextLesson.lesson.questions.length} songs · +{nextLesson.lesson.xpReward} XP
                </p>
              </div>
              <span
                className="flex h-[46px] w-[46px] flex-shrink-0 items-center justify-center rounded-full bg-bubblegum-plum text-base font-black text-bubblegum-cream"
                aria-hidden="true"
              >
                <span className="pl-1">▶</span>
              </span>
            </button>
          </motion.div>
        )}

        {/* All-done banner — replaces Up Next if no next lesson */}
        {!nextLesson && (
          <motion.div
            variants={item}
            className="rounded-3xl bg-bubblegum-mint p-5 text-center"
          >
            <p className="text-5xl">🎓</p>
            <p className="mt-2 text-xl font-black text-bubblegum-plum">
              You played every track!
            </p>
            <p className="mt-1 text-sm font-semibold text-bubblegum-plum-soft">
              Hit Soundcheck for a fresh mix, or rehearse your B-sides.
            </p>
            <div className="mt-4">
              <PrimaryButton
                tone="plum"
                onClick={() =>
                  gate(() => navigate('/practice'), 'Sign in to take practice quizzes')
                }
              >
                Open Soundcheck →
              </PrimaryButton>
            </div>
          </motion.div>
        )}

        {/* Your setlist — album grid */}
        <motion.div variants={item}>
          <Eyebrow>your setlist 🎵</Eyebrow>
          <div className="grid grid-cols-2 gap-3">
            {COURSES.slice(0, 4).map((course) => (
              <AlbumProgressCard
                key={course.id}
                course={course}
                pct={getCourseCompletion(course, progress)}
                onClick={() => navigate(`/learn/${course.id}`)}
              />
            ))}
          </div>
        </motion.div>

        {/* B-Sides preview — cherry-tinted */}
        {weakAreas.length > 0 && (
          <motion.div variants={item}>
            <Eyebrow>b-sides to brush up 🔁</Eyebrow>
            <button
              type="button"
              onClick={() => gate(() => navigate('/review'), 'Sign in to review weak areas')}
              className="flex w-full items-center gap-3 rounded-3xl bg-bubblegum-cherry/20 p-3.5 text-left transition-transform active:scale-[0.99] touch-manipulation"
            >
              <span
                className="inline-block text-3xl leading-none"
                style={{ transform: 'rotate(-6deg)' }}
                aria-hidden="true"
              >
                🎯
              </span>
              <div className="flex-1">
                <p className="text-sm font-black text-bubblegum-plum">
                  {weakAreas.length} track{weakAreas.length !== 1 ? 's' : ''} to rehearse
                </p>
                <div className="mt-1.5 flex flex-wrap gap-1">
                  {weakAreas.slice(0, 3).map((w) => (
                    <CategoryChip key={w.questionId} tone="white">
                      {w.topic}
                    </CategoryChip>
                  ))}
                </div>
              </div>
              <span className="text-[22px] font-black text-bubblegum-cherry">›</span>
            </button>
          </motion.div>
        )}

      </motion.div>
    </BubblegumLayout>
  )
}

function dailyGoalCopy(done: number, goal: number): string {
  if (done >= goal) return 'Encore unlocked — tonight is yours!'
  const remaining = goal - done
  if (done === 0) return `${goal} song${goal === 1 ? '' : 's'} to a full set tonight.`
  if (remaining === 1) return 'One more song for an encore!'
  return `${remaining} more songs for tonight's set.`
}

function DailyGoalDonut({ done, goal }: { done: number; goal: number }) {
  const ratio = goal > 0 ? Math.min(1, done / goal) : 0
  const circumference = 2 * Math.PI * 16 // r=16 → ~100.53
  const dash = ratio * circumference
  return (
    <div className="relative h-[54px] w-[54px]">
      <svg viewBox="0 0 40 40" width="54" height="54">
        <circle cx="20" cy="20" r="16" fill="none" stroke="#ffffff" strokeWidth="6" />
        <circle
          cx="20"
          cy="20"
          r="16"
          fill="none"
          stroke="#3a224f"
          strokeWidth="6"
          strokeDasharray={`${dash} ${circumference}`}
          transform="rotate(-90 20 20)"
          strokeLinecap="round"
        />
      </svg>
      <span className="absolute inset-0 flex items-center justify-center text-[13px] font-black text-bubblegum-plum">
        {done}/{goal}
      </span>
    </div>
  )
}

function AlbumProgressCard({
  course,
  pct,
  onClick,
}: {
  course: Course
  pct: number
  onClick: () => void
}) {
  const tone = getAlbumTone(course.id)
  const isNew = pct === 0
  return (
    <button
      type="button"
      onClick={onClick}
      className={`${TONE_BG[tone]} touch-manipulation rounded-[22px] p-3.5 text-left text-bubblegum-plum transition-transform active:scale-[0.98]`}
    >
      <div
        className={`mb-1 inline-block text-[38px] leading-none ${
          isNew ? 'opacity-60 grayscale' : ''
        }`}
        style={{ transform: 'rotate(-4deg)' }}
        aria-hidden="true"
      >
        {course.icon}
      </div>
      <p className="text-[15px] font-black">{course.shortTitle}</p>
      <div className="mt-1.5 flex items-center gap-1.5">
        <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-white/70">
          <div
            className="h-full rounded-full bg-bubblegum-plum"
            style={{ width: `${Math.max(pct, 0)}%` }}
          />
        </div>
        <span className="text-[11px] font-black">{isNew ? 'new!' : `${pct}%`}</span>
      </div>
    </button>
  )
}
