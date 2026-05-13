import { useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { BubblegumLayout, Mono } from '../components/bubblegum'
import { COURSES } from '../data/courses'
import { useProgress } from '../hooks/useProgress'
import { getCourseCompletion } from '../utils'
import { getAlbumTone, TONE_BG } from '../utils/bubblegum'
import type { Course } from '../types'

type FilterId = 'all' | 'on-tour' | 'almost' | 'opening'

const FILTERS: { id: FilterId; label: string }[] = [
  { id: 'all',      label: 'All' },
  { id: 'on-tour',  label: 'On tour' },
  { id: 'almost',   label: 'Almost done' },
  { id: 'opening',  label: 'Opening' },
]

function statusFor(pct: number): FilterId {
  if (pct === 0) return 'opening'
  if (pct >= 80) return 'almost'
  return 'on-tour'
}

export function Courses() {
  const navigate = useNavigate()
  const { progress } = useProgress()
  const [filter, setFilter] = useState<FilterId>('all')

  const courseStats = useMemo(
    () =>
      COURSES.map((course) => {
        const pct = getCourseCompletion(course, progress)
        const tracks = course.modules.reduce((n, m) => n + m.lessons.length, 0)
        const done = course.modules.reduce(
          (n, m) =>
            n +
            m.lessons.filter(
              (l) =>
                progress.courses[course.id]?.modules[m.id]?.lessonsProgress[l.id]?.completed
            ).length,
          0
        )
        return { course, pct, tracks, done, status: statusFor(pct) }
      }),
    [progress]
  )

  const filtered = useMemo(
    () => (filter === 'all' ? courseStats : courseStats.filter((s) => s.status === filter)),
    [courseStats, filter]
  )

  return (
    <BubblegumLayout activeTab="learn">
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col gap-[18px] pt-1"
      >
        <div className="px-1">
          <p className="text-[28px] font-black leading-tight tracking-[-0.025em] text-bubblegum-plum dark:text-night-fg">
            Your{' '}
            <span className="inline-block -rotate-1 rounded-lg bg-bubblegum-peach px-2">
              lessons
            </span>
          </p>
          <p className="mt-1.5 text-[13px] font-semibold text-bubblegum-plum-soft">
            {COURSES.length} albums. Pick a track to play tonight.
          </p>
        </div>

        {/* Filter chips */}
        <div className="-mx-5 overflow-x-auto px-5 pb-1">
          <div className="flex gap-2">
            {FILTERS.map((f) => {
              const active = f.id === filter
              return (
                <button
                  key={f.id}
                  type="button"
                  onClick={() => setFilter(f.id)}
                  className={`flex-shrink-0 rounded-full px-3.5 py-2 text-xs font-extrabold whitespace-nowrap touch-manipulation transition-colors ${
                    active
                      ? 'bg-bubblegum-plum text-bubblegum-cream'
                      : 'bg-white text-bubblegum-plum'
                  }`}
                >
                  {f.label}
                </button>
              )
            })}
          </div>
        </div>

        {/* Album cards */}
        {filtered.length > 0 ? (
          <div className="flex flex-col gap-3.5">
            {filtered.map(({ course, pct, tracks, done }, idx) => (
              <motion.div
                key={course.id}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.04 }}
              >
                <AlbumCard
                  course={course}
                  pct={pct}
                  tracks={tracks}
                  done={done}
                  onClick={() => navigate(`/learn/${course.id}`)}
                />
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="rounded-3xl bg-white dark:bg-night-panel p-6 text-center">
            <p className="text-3xl">🎧</p>
            <p className="mt-2 text-base font-black text-bubblegum-plum">
              Nothing here yet.
            </p>
            <p className="mt-1 text-sm font-semibold text-bubblegum-plum-soft">
              Try a different filter — or tap an album to start its first track.
            </p>
          </div>
        )}
      </motion.div>
    </BubblegumLayout>
  )
}

interface AlbumCardProps {
  course: Course
  pct: number
  tracks: number
  done: number
  onClick: () => void
}

function AlbumCard({ course, pct, tracks, done, onClick }: AlbumCardProps) {
  const tone = getAlbumTone(course.id, 'lavender')
  const tagline = course.description.split('.')[0] ?? course.description
  return (
    <button
      type="button"
      onClick={onClick}
      className={`relative w-full overflow-hidden rounded-[24px] ${TONE_BG[tone]} p-4 text-left text-bubblegum-plum transition-transform active:scale-[0.99] touch-manipulation`}
    >
      <div className="flex items-center gap-3.5">
        <div
          className="flex h-[60px] w-[60px] flex-shrink-0 -rotate-[4deg] items-center justify-center rounded-[18px] bg-white text-[32px]"
          aria-hidden="true"
        >
          {course.icon}
        </div>
        <div className="min-w-0 flex-1">
          <Mono>album · {tracks} tracks</Mono>
          <p className="mt-0.5 text-lg font-black leading-[1.1]">{course.shortTitle}</p>
          <p className="mt-0.5 text-xs font-semibold text-bubblegum-plum-soft">{tagline}</p>
        </div>
        <span className="text-2xl font-black" aria-hidden="true">›</span>
      </div>

      <div className="mt-3.5 flex items-center gap-2.5">
        <div className="h-2 flex-1 overflow-hidden rounded-full bg-white/70">
          <div
            className="h-full rounded-full bg-bubblegum-plum"
            style={{ width: `${Math.max(pct, 2)}%` }}
          />
        </div>
        <span className="min-w-[64px] text-right text-[11px] font-black">
          {done}/{tracks} · {pct}%
        </span>
      </div>
    </button>
  )
}
