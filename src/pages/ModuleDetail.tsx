import { useParams, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Layout } from '../components/layout/Layout'
import { Badge } from '../components/ui/Badge'
import { getCourseById } from '../data/courses'
import { useProgress } from '../hooks/useProgress'

export function ModuleDetail() {
  const { courseId, moduleId } = useParams<{ courseId: string; moduleId: string }>()
  const navigate = useNavigate()
  const { progress } = useProgress()

  const course = getCourseById(courseId ?? '')
  const mod = course?.modules.find((m) => m.id === moduleId)

  if (!course || !mod) {
    return (
      <Layout title="Not Found" backPath={`/courses/${courseId}`}>
        <p className="text-center text-slate-500 mt-8">Module not found.</p>
      </Layout>
    )
  }

  return (
    <Layout title={mod.title} backPath={`/courses/${course.id}`}>
      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="space-y-4">
        {/* Module header */}
        <div className={`${course.bgGradient} rounded-2xl p-4 text-white flex items-center gap-3`}>
          <span className="text-4xl">{mod.icon}</span>
          <div>
            <p className="font-black text-lg">{mod.title}</p>
            <p className="text-white/80 text-sm">{mod.description}</p>
          </div>
        </div>

        <h2 className="text-sm font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wide">Lessons</h2>

        <div className="space-y-3">
          {mod.lessons.map((lesson, idx) => {
            const lessonP = progress.courses[course.id]?.modules[mod.id]?.lessonsProgress[lesson.id]
            const completed = lessonP?.completed ?? false
            const score = lessonP?.score ?? 0
            // Lock lesson if previous isn't done (except first)
            const prevComplete = idx === 0 || progress.courses[course.id]?.modules[mod.id]?.lessonsProgress[mod.lessons[idx - 1].id]?.completed

            return (
              <motion.div
                key={lesson.id}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.06 }}
              >
                <div
                  onClick={() => prevComplete && navigate(`/courses/${course.id}/modules/${mod.id}/lessons/${lesson.id}`)}
                  className={`
                    bg-white dark:bg-slate-800 rounded-2xl border border-slate-100 dark:border-slate-700 p-4
                    ${prevComplete ? 'cursor-pointer active:scale-[0.98] transition-transform touch-manipulation' : 'opacity-50'}
                  `}
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
                          <Badge variant={score === 100 ? 'green' : score >= 70 ? 'sky' : 'amber'}>
                            {score}%
                          </Badge>
                        )}
                      </div>
                      <p className="text-xs text-slate-500 mt-0.5">
                        {lesson.questions.length} questions · ⭐ {lesson.xpReward} XP
                        {completed && score === 100 && ' · 🌟 Perfect!'}
                      </p>
                    </div>
                    {!prevComplete ? (
                      <span className="text-slate-400">🔒</span>
                    ) : (
                      <svg className="w-5 h-5 text-slate-400 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                      </svg>
                    )}
                  </div>
                </div>
              </motion.div>
            )
          })}
        </div>
      </motion.div>
    </Layout>
  )
}
