import { useParams, useNavigate, useSearchParams } from 'react-router-dom'
import { motion } from 'framer-motion'
import {
  BubblegumLayout,
  Doodle,
  Mono,
  Eyebrow,
  PrimaryButton,
} from '../components/bubblegum'
import { COURSES, getCourseById } from '../data/courses'
import { useProgress } from '../hooks/useProgress'
import { useRequireAuth } from '../hooks/useRequireAuth'
import { getCourseCompletion } from '../utils'
import { getAlbumTone, TONE_BG, trackLabel } from '../utils/bubblegum'
import type { Course, Module, Lesson } from '../types'

interface TrackEntry {
  moduleIdx: number
  lessonIdx: number
  module: Module
  lesson: Lesson
  label: string
  completed: boolean
}

export function CourseDetail() {
  const { courseId } = useParams<{ courseId: string }>()
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()
  const { progress } = useProgress()
  const { gate } = useRequireAuth()

  const course = getCourseById(courseId ?? '')
  const previewLocked = searchParams.get('preview') === 'locked'

  if (!course) {
    return (
      <BubblegumLayout activeTab="learn" back title="Not found">
        <div className="mt-12 rounded-3xl bg-white p-6 text-center">
          <p className="text-3xl">🎧</p>
          <p className="mt-2 text-base font-black text-bubblegum-plum">Album not found.</p>
          <p className="mt-1 text-sm text-bubblegum-plum-soft">
            Try the full setlist instead.
          </p>
          <div className="mt-4">
            <PrimaryButton onClick={() => navigate('/learn')}>Back to setlist →</PrimaryButton>
          </div>
        </div>
      </BubblegumLayout>
    )
  }

  const tone = getAlbumTone(course.id, 'lavender')
  const completion = getCourseCompletion(course, progress)

  if (previewLocked) {
    return <LockedAlbum course={course} tone={tone} />
  }

  const tracks: TrackEntry[] = course.modules.flatMap((mod, moduleIdx) =>
    mod.lessons.map((lesson, lessonIdx) => ({
      moduleIdx,
      lessonIdx,
      module: mod,
      lesson,
      label: trackLabel(moduleIdx, lessonIdx),
      completed:
        progress.courses[course.id]?.modules[mod.id]?.lessonsProgress[lesson.id]?.completed ?? false,
    }))
  )

  const nowPlaying = tracks.find((t) => !t.completed) ?? null
  const completedCount = tracks.filter((t) => t.completed).length
  const goLesson = (t: TrackEntry) =>
    gate(
      () => navigate(`/learn/${course.id}/modules/${t.module.id}/lessons/${t.lesson.id}`),
      'Sign in to start lessons'
    )

  return (
    <BubblegumLayout activeTab="learn" hideHeader>
      <div className="-mx-5">
        {/* Hero header — pastel album cover */}
        <div className={`relative overflow-hidden ${TONE_BG[tone]} px-5 pt-14 pb-6`}>
          <Doodle ch="♬" x={300} y={36} size={56} rot={12} color="#3a224f" opacity={0.15} />
          <Doodle ch="♪" x={32} y={84} size={36} rot={-12} color="#3a224f" opacity={0.2} />

          <button
            type="button"
            onClick={() => navigate(-1)}
            aria-label="Back"
            className="absolute left-4 top-4 z-10 flex h-[38px] w-[38px] items-center justify-center rounded-full bg-white text-lg font-black text-bubblegum-plum touch-manipulation"
          >
            ←
          </button>

          <div className="relative z-[1]">
            <Mono>album · {tracks.length} tracks</Mono>
            <p
              className="mt-1.5 text-[40px] font-black leading-[0.95] tracking-[-0.035em] text-bubblegum-plum"
            >
              {course.title}
            </p>
            <p className="mt-2 text-sm font-semibold text-bubblegum-plum/80">
              {course.description}
            </p>

            <div className="mt-4 flex items-center gap-3">
              <div className="h-2.5 flex-1 overflow-hidden rounded-full bg-white/80">
                <div
                  className="h-full rounded-full bg-bubblegum-plum transition-[width] duration-500"
                  style={{ width: `${completion}%` }}
                />
              </div>
              <span className="text-[13px] font-black text-bubblegum-plum">
                {completedCount} of {tracks.length} · {completion}%
              </span>
            </div>
          </div>
        </div>

        {/* Track list */}
        <div className="px-5 pt-5">
          <Eyebrow>track list</Eyebrow>

          <div className="overflow-hidden rounded-3xl bg-white p-1.5">
            {tracks.map((t, i) => {
              const isNow = nowPlaying?.label === t.label
              return (
                <motion.button
                  key={`${t.module.id}-${t.lesson.id}`}
                  type="button"
                  onClick={() => goLesson(t)}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.025 }}
                  className={`flex w-full items-center gap-3 rounded-[18px] p-3 text-left transition-transform touch-manipulation active:scale-[0.99] ${
                    isNow ? 'bg-bubblegum-butter' : 'bg-transparent'
                  }`}
                >
                  <div
                    className={`flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-full font-mono text-sm font-black tracking-[0.05em] ${
                      t.completed
                        ? 'bg-bubblegum-mint text-bubblegum-plum'
                        : isNow
                        ? 'bg-bubblegum-plum text-bubblegum-cream'
                        : 'bg-bubblegum-cream text-bubblegum-plum'
                    }`}
                    aria-hidden="true"
                  >
                    {t.completed ? '✓' : t.label}
                  </div>

                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-1.5">
                      <p className="text-sm font-black leading-tight text-bubblegum-plum">
                        {t.lesson.title}
                      </p>
                      {isNow && (
                        <span className="rounded-full bg-bubblegum-plum px-1.5 py-0.5 font-mono text-[9px] font-black uppercase tracking-[0.1em] text-bubblegum-cream">
                          Now
                        </span>
                      )}
                    </div>
                    <p className="mt-0.5 text-[11px] font-semibold text-bubblegum-plum-soft">
                      {t.module.title} · {t.lesson.questions.length} song
                      {t.lesson.questions.length === 1 ? '' : 's'}
                    </p>
                  </div>

                  <div className="flex-shrink-0 text-right">
                    <Mono
                      size="xs"
                      tone={t.completed ? 'plum' : isNow ? 'plum' : 'plum-dim'}
                    >
                      +{t.lesson.xpReward} XP
                    </Mono>
                    {isNow && (
                      <div className="mt-0.5 text-lg leading-none text-bubblegum-plum" aria-hidden="true">
                        ▶
                      </div>
                    )}
                  </div>
                </motion.button>
              )
            })}
          </div>

          {/* Encore — full practice test */}
          <button
            type="button"
            onClick={() => gate(() => navigate('/practice'), 'Sign in to take practice quizzes')}
            className="mt-4 flex w-full items-center gap-3 rounded-3xl bg-bubblegum-peach p-4 text-left text-bubblegum-plum transition-transform active:scale-[0.99] touch-manipulation"
          >
            <span className="rounded-full bg-bubblegum-plum px-2 py-1 font-mono text-[10px] font-black uppercase tracking-[0.1em] text-bubblegum-cream">
              Encore
            </span>
            <div className="flex-1">
              <p className="text-sm font-black">Practice the whole album</p>
              <p className="mt-0.5 text-[11px] font-semibold text-bubblegum-plum-soft">
                {course.testConfig.questionCount} questions · {course.testConfig.timeLimit} min · pass at {course.testConfig.passingScore}%
              </p>
            </div>
            <span className="text-xl font-black" aria-hidden="true">›</span>
          </button>

          {/* Keep-playing CTA */}
          {nowPlaying && (
            <div className="mt-5">
              <PrimaryButton onClick={() => goLesson(nowPlaying)}>
                Keep playing Track {nowPlaying.label} →
              </PrimaryButton>
            </div>
          )}
          {!nowPlaying && completedCount > 0 && (
            <div className="mt-5">
              <PrimaryButton
                onClick={() =>
                  gate(() => navigate('/practice'), 'Sign in to take practice quizzes')
                }
              >
                Album played — Take the encore →
              </PrimaryButton>
            </div>
          )}
        </div>
      </div>
    </BubblegumLayout>
  )
}

// ── Locked variant — BGLockedAlbum ──────────────────────────────────────────
// Activate via ?preview=locked on any /learn/:courseId URL. Real lock metadata
// on Course is a follow-up data-layer commit; this ships the design surface.

function LockedAlbum({
  course,
  tone,
}: {
  course: Course
  tone: ReturnType<typeof getAlbumTone>
}) {
  const navigate = useNavigate()
  const { progress } = useProgress()

  const albumStats = COURSES.map((c) => {
    const pct = getCourseCompletion(c, progress)
    return { course: c, pct, done: pct >= 100 }
  })
  const otherAlbums = albumStats.filter((a) => a.course.id !== course.id)
  const doneCount = otherAlbums.filter((a) => a.done).length

  const nextAlbum =
    otherAlbums.find((a) => a.pct > 0 && a.pct < 100)?.course ??
    otherAlbums.find((a) => a.pct < 100)?.course ??
    COURSES.find((c) => c.id !== course.id)

  const lockedTracks = course.modules
    .flatMap((m) => m.lessons.map((l) => ({ module: m, lesson: l })))
    .slice(0, 4)

  return (
    <BubblegumLayout activeTab="learn" hideHeader>
      <div className="-mx-5">
        {/* Gated hero */}
        <div className={`relative overflow-hidden ${TONE_BG[tone]} px-5 pt-14 pb-6`}>
          <Doodle ch="♬" x={300} y={36} size={56} rot={12} color="#3a224f" opacity={0.15} />
          <Doodle ch="♪" x={32} y={84} size={36} rot={-12} color="#3a224f" opacity={0.2} />

          <button
            type="button"
            onClick={() => navigate(-1)}
            aria-label="Back"
            className="absolute left-4 top-4 z-10 flex h-[38px] w-[38px] items-center justify-center rounded-full bg-white text-lg font-black text-bubblegum-plum touch-manipulation"
          >
            ←
          </button>

          <div className="relative z-[1]">
            <div className="flex flex-wrap items-center gap-2">
              <Mono>album · encore · {lockedTracks.length} tracks</Mono>
              <span className="rounded-full bg-bubblegum-plum px-2.5 py-0.5 font-mono text-[10px] font-black uppercase tracking-[0.1em] text-bubblegum-cream">
                Locked
              </span>
            </div>
            <p className="mt-1.5 text-[40px] font-black leading-[0.95] tracking-[-0.035em] text-bubblegum-plum">
              Encore: <br />
              <span className="inline-block -rotate-[2deg] text-bubblegum-cherry">
                {course.title}
              </span>
            </p>
            <p className="mt-2 text-sm font-semibold text-bubblegum-plum/80">
              {course.description}
            </p>
          </div>
        </div>

        <main className="px-5 pt-5">
          {/* Unlock instructions */}
          <div className="relative rounded-3xl bg-white p-5">
            <div className="mb-3.5 flex items-center gap-3">
              <div
                className="flex h-14 w-14 -rotate-[6deg] items-center justify-center rounded-full border-[4px] border-white bg-bubblegum-lavender text-3xl"
                aria-hidden="true"
              >
                🔒
              </div>
              <div className="min-w-0 flex-1">
                <Mono>how to unlock</Mono>
                <p className="mt-0.5 text-lg font-black leading-[1.15] text-bubblegum-plum">
                  Finish {Math.max(1, otherAlbums.length - 2)} more albums first
                </p>
              </div>
            </div>

            <div className="flex flex-col gap-2">
              {otherAlbums.map(({ course: c, pct, done }) => (
                <div key={c.id} className="flex items-center gap-2.5 py-1.5">
                  <div
                    className={`flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full text-sm font-black ${
                      done ? 'bg-bubblegum-green text-white' : 'bg-bubblegum-cream-hi text-bubblegum-plum-dim'
                    }`}
                    aria-hidden="true"
                  >
                    {done ? '✓' : ''}
                  </div>
                  <span
                    className={`text-xl leading-none ${done ? '' : 'grayscale'}`}
                    aria-hidden="true"
                  >
                    {c.icon}
                  </span>
                  <span
                    className={`flex-1 text-sm font-extrabold ${
                      done
                        ? 'text-bubblegum-plum line-through decoration-bubblegum-green decoration-2'
                        : 'text-bubblegum-plum-soft'
                    }`}
                  >
                    {c.shortTitle}
                  </span>
                  <Mono size="xs" tone={done ? 'plum' : 'plum-dim'}>
                    {pct}%
                  </Mono>
                </div>
              ))}
            </div>

            <p className="mt-3.5 text-center text-xs font-bold text-bubblegum-plum-soft">
              <strong className="text-bubblegum-plum">
                {doneCount} of {otherAlbums.length} done.
              </strong>{' '}
              Keep going — the encore's waiting.
            </p>
          </div>

          {/* Blurred locked-track preview */}
          <div className="mt-5">
            <Eyebrow>peek inside</Eyebrow>
            <div className="overflow-hidden rounded-3xl bg-white p-1.5">
              {lockedTracks.map((t) => (
                <div
                  key={t.lesson.id}
                  className="flex items-center gap-3 rounded-[18px] px-3 py-3 opacity-45"
                >
                  <div className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full bg-bubblegum-peach font-mono text-xs font-black text-bubblegum-plum">
                    ★
                  </div>
                  <span className="flex-1 text-sm font-extrabold text-bubblegum-plum blur-[2px]">
                    {t.lesson.title}
                  </span>
                  <span className="text-bubblegum-plum-dim" aria-hidden="true">
                    🔒
                  </span>
                </div>
              ))}
            </div>
          </div>

          {nextAlbum && (
            <div className="mt-5">
              <PrimaryButton onClick={() => navigate(`/learn/${nextAlbum.id}`)}>
                Keep playing {nextAlbum.shortTitle} →
              </PrimaryButton>
            </div>
          )}
        </main>
      </div>
    </BubblegumLayout>
  )
}
