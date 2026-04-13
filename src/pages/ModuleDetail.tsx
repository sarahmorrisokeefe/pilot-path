import { useMemo, useState, useCallback } from 'react'
import { useParams, useNavigate, useLocation } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Layout } from '../components/layout/Layout'
import { Badge } from '../components/ui/Badge'
import { Toast } from '../components/ui/Toast'
import { getCourseById } from '../data/courses'
import { useProgress } from '../hooks/useProgress'
import { useAuth } from '../context/AuthContext'

export function ModuleDetail() {
  const { courseId, moduleId } = useParams<{ courseId: string; moduleId: string }>()
  const navigate = useNavigate()
  const location = useLocation()
  const { user } = useAuth()
  const { progress } = useProgress()
  const [showAuthToast, setShowAuthToast] = useState(
    !!(location.state as { authRequired?: boolean } | null)?.authRequired
  )
  const dismissToast = useCallback(() => setShowAuthToast(false), [])

  const course = getCourseById(courseId ?? '')
  const mod = course?.modules.find((m) => m.id === moduleId)

  // Compute mastery: average score across completed lessons
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
      <Layout title="Not Found" backPath={`/learn/${courseId}`}>
        <p className="text-center text-slate-500 mt-8">Module not found.</p>
      </Layout>
    )
  }

  return (
    <Layout title={mod.title} backPath={`/learn/${course.id}`}>
      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="space-y-4">
        {/* Module header */}
        <div className={`${course.bgGradient} rounded-2xl p-4 text-white flex items-center gap-3`}>
          <span className="text-4xl">{mod.icon}</span>
          <div>
            <p className="font-black text-lg">{mod.title}</p>
            <p className="text-white/80 text-sm">{mod.description}</p>
          </div>
        </div>

        {/* Mastery indicator */}
        <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-100 dark:border-slate-700 p-4">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm font-bold text-slate-900 dark:text-white">Module Mastery</p>
            {mastery.mastered ? (
              <Badge variant="green">Mastered</Badge>
            ) : (
              <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">
                Score 80%+ to master
              </span>
            )}
          </div>
          <div className="flex items-center gap-3">
            <div className="flex-1">
              <div className="h-2.5 bg-slate-100 dark:bg-slate-700 rounded-full overflow-hidden">
                <div
                  className={`h-full rounded-full transition-all duration-500 ${
                    mastery.mastered ? 'bg-green-500' : mastery.avg >= 80 ? 'bg-cadence-800' : mastery.avg >= 50 ? 'bg-amber-500' : 'bg-slate-300 dark:bg-slate-600'
                  }`}
                  style={{ width: `${mastery.avg}%` }}
                />
              </div>
            </div>
            <span className={`text-sm font-black tabular-nums ${mastery.mastered ? 'text-green-500' : 'text-slate-600 dark:text-slate-300'}`}>
              {mastery.avg}%
            </span>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1.5">
            {mastery.completed}/{mastery.total} lessons completed
          </p>
        </div>

        <h2 className="text-sm font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wide">Lessons</h2>

        <div className="space-y-3">
          {mod.lessons.map((lesson, idx) => {
            const lessonP = progress.courses[course.id]?.modules[mod.id]?.lessonsProgress[lesson.id]
            const completed = lessonP?.completed ?? false
            const score = lessonP?.score ?? 0

            return (
              <motion.div
                key={lesson.id}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.06 }}
              >
                <div
                  onClick={() => {
                    if (!user) { setShowAuthToast(true); return }
                    navigate(`/learn/${course.id}/modules/${mod.id}/lessons/${lesson.id}`)
                  }}
                  className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-100 dark:border-slate-700 p-4 cursor-pointer active:scale-[0.98] transition-transform touch-manipulation"
                >
                  <div className="flex items-center gap-3">
                    <div className={`
                      w-11 h-11 rounded-xl flex items-center justify-center text-xl font-black flex-shrink-0
                      ${completed ? 'bg-green-100 dark:bg-green-900/40 text-green-600' : course.bgGradient + ' text-white'}
                    `}>
                      {completed ? '✓' : idx + 1}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <p className="font-bold text-slate-900 dark:text-white text-sm">{lesson.title}</p>
                        {completed && (
                          <Badge variant={score === 100 ? 'green' : score >= 70 ? 'cadence' : 'amber'}>
                            {score}%
                          </Badge>
                        )}
                      </div>
                      <p className="text-xs text-slate-500 mt-0.5">
                        {lesson.questions.length} questions · {lesson.xpReward} XP
                        {completed && score === 100 && ' · Perfect!'}
                      </p>
                    </div>
                    <svg className="w-5 h-5 text-slate-400 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                    </svg>
                  </div>
                </div>
              </motion.div>
            )
          })}
        </div>
      </motion.div>

      <Toast
        message="Sign in to start lessons and track your progress"
        visible={showAuthToast}
        onDismiss={dismissToast}
        actionLabel="Sign In"
        actionPath="/auth"
      />
    </Layout>
  )
}
