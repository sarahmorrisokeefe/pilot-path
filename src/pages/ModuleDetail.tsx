import { useMemo } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import {
  BubblegumLayout,
  Doodle,
  Mono,
  Eyebrow,
  PrimaryButton,
} from '../components/bubblegum'
import { getCourseById } from '../data/courses'
import { useProgress } from '../hooks/useProgress'
import { useRequireAuth } from '../hooks/useRequireAuth'
import { getAlbumTone, TONE_BG } from '../utils/bubblegum'

export function ModuleDetail() {
  const { courseId, moduleId } = useParams<{ courseId: string; moduleId: string }>()
  const navigate = useNavigate()
  const { progress } = useProgress()
  const { gate } = useRequireAuth()

  const course = getCourseById(courseId ?? '')
  const mod = course?.modules.find((m) => m.id === moduleId)

  const mastery = useMemo(() => {
    if (!course || !mod) return { avg: 0, completed: 0, total: 0, mastered: false }
    const modP = progress.courses[course.id]?.modules[mod.id]
    if (!modP) return { avg: 0, completed: 0, total: mod.lessons.length, mastered: false }

    let totalScore = 0
    let completedCount = 0
    for (const lesson of mod.lessons) {
      const lp = modP.lessonsProgress[lesson.id]
      if (lp?.completed) {
        totalScore += lp.score
        completedCount++
      }
    }
    const avg = completedCount > 0 ? Math.round(totalScore / completedCount) : 0
    return {
      avg,
      completed: completedCount,
      total: mod.lessons.length,
      mastered: completedCount === mod.lessons.length && avg >= 80,
    }
  }, [course, mod, progress])

  if (!course || !mod) {
    return (
      <BubblegumLayout activeTab="learn" back title="Not found">
        <div className="mt-12 rounded-3xl bg-white p-6 text-center dark:bg-night-panel">
          <p className="text-3xl">🎧</p>
          <p className="mt-2 text-base font-black text-bubblegum-plum">Side not found.</p>
          <div className="mt-4">
            <PrimaryButton onClick={() => navigate(`/learn/${courseId ?? ''}`)}>
              Back to the album →
            </PrimaryButton>
          </div>
        </div>
      </BubblegumLayout>
    )
  }

  const tone = getAlbumTone(course.id, 'lavender')
  const nextIncomplete = mod.lessons.find(
    (l) => !progress.courses[course.id]?.modules[mod.id]?.lessonsProgress[l.id]?.completed
  )

  return (
    <BubblegumLayout
      activeTab="learn"
      back
      title={mod.title}
      onBack={() => navigate(`/learn/${course.id}`)}
    >
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col gap-[18px] pt-1"
      >
        {/* Module hero — pastel matching the parent album */}
        <div
          className={`relative overflow-hidden rounded-bubble ${TONE_BG[tone]} p-[22px] text-bubblegum-plum`}
        >
          <Doodle ch="♬" x={300} y={20} size={48} rot={12} color="#3a224f" opacity={0.15} />
          <Doodle ch="♪" x={20} y={70} size={36} rot={-12} color="#3a224f" opacity={0.2} />

          <Mono>side · {course.shortTitle}</Mono>
          <p className="mt-1.5 text-[26px] font-black leading-[1.05] tracking-[-0.025em]">
            {mod.title}
          </p>
          <p className="mt-2 text-sm font-semibold text-bubblegum-plum-soft">
            {mod.description}
          </p>

          {/* Mastery bar */}
          <div className="mt-4 flex items-center gap-3">
            <div className="h-2 flex-1 overflow-hidden rounded-full bg-white/70">
              <div
                className="h-full rounded-full bg-bubblegum-plum transition-[width] duration-500"
                style={{ width: `${mastery.avg}%` }}
              />
            </div>
            <span className="text-xs font-black tabular-nums">
              {mastery.completed}/{mastery.total} · {mastery.avg}%
            </span>
          </div>
          {mastery.mastered && (
            <div className="mt-3 inline-flex items-center gap-1 rounded-full bg-bubblegum-mint px-3 py-1 text-[11px] font-black text-bubblegum-plum">
              ✓ Mastered
            </div>
          )}
        </div>

        {/* Lessons list */}
        <div>
          <Eyebrow>tracks on this side</Eyebrow>
          <div className="overflow-hidden rounded-3xl bg-white p-1.5 dark:bg-night-panel">
            {mod.lessons.map((lesson, idx) => {
              const lp = progress.courses[course.id]?.modules[mod.id]?.lessonsProgress[lesson.id]
              const completed = lp?.completed ?? false
              const score = lp?.score ?? 0
              const isNext = lesson.id === nextIncomplete?.id
              return (
                <motion.button
                  key={lesson.id}
                  type="button"
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.03 }}
                  onClick={() =>
                    gate(
                      () =>
                        navigate(`/learn/${course.id}/modules/${mod.id}/lessons/${lesson.id}`),
                      'Grab a backstage pass to play tracks'
                    )
                  }
                  className={`flex w-full items-center gap-3 rounded-[18px] p-3 text-left transition-transform touch-manipulation active:scale-[0.99] ${
                    isNext ? 'bg-bubblegum-butter' : 'bg-transparent'
                  }`}
                >
                  <div
                    className={`flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-full font-mono text-sm font-black ${
                      completed
                        ? 'bg-bubblegum-mint text-bubblegum-plum'
                        : isNext
                        ? 'bg-bubblegum-plum text-bubblegum-cream'
                        : 'bg-bubblegum-cream text-bubblegum-plum'
                    }`}
                    aria-hidden="true"
                  >
                    {completed ? '✓' : idx + 1}
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-black leading-tight text-bubblegum-plum">
                      {lesson.title}
                    </p>
                    <p className="mt-0.5 text-[11px] font-semibold text-bubblegum-plum-soft">
                      {lesson.questions.length} song
                      {lesson.questions.length === 1 ? '' : 's'} · +{lesson.xpReward} XP
                      {completed && score === 100 && ' · Perfect!'}
                    </p>
                  </div>
                  {completed && score < 100 && (
                    <Mono size="xs" tone="plum">{score}%</Mono>
                  )}
                  {isNext && !completed && (
                    <span className="text-lg leading-none text-bubblegum-plum" aria-hidden="true">
                      ▶
                    </span>
                  )}
                </motion.button>
              )
            })}
          </div>
        </div>

        {nextIncomplete && (
          <PrimaryButton
            onClick={() =>
              gate(
                () =>
                  navigate(
                    `/learn/${course.id}/modules/${mod.id}/lessons/${nextIncomplete.id}`
                  ),
                'Grab a backstage pass to play tracks'
              )
            }
          >
            Play {nextIncomplete.title} →
          </PrimaryButton>
        )}
      </motion.div>
    </BubblegumLayout>
  )
}
