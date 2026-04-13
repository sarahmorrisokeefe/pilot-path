import { useParams, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Layout } from '../components/layout/Layout'
import { ProgressBar } from '../components/ui/ProgressBar'
import { Badge } from '../components/ui/Badge'
import { COURSES, getCourseById } from '../data/courses'
import { useProgress } from '../hooks/useProgress'
import { getCourseCompletion, getModuleCompletion } from '../utils'

export function CourseDetail() {
  const { courseId } = useParams<{ courseId: string }>()
  const navigate = useNavigate()
  const { progress } = useProgress()

  const course = getCourseById(courseId ?? '')
  if (!course) {
    return (
      <Layout title="Not Found" backPath="/learn">
        <p className="text-center text-slate-500 mt-8">Course not found.</p>
      </Layout>
    )
  }

  const completion = getCourseCompletion(course, progress)

  return (
    <Layout title={course.shortTitle} backPath="/learn">
      {/* Course Hero */}
      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="space-y-4">
        <div className={`${course.bgGradient} rounded-2xl p-5 text-white`}>
          <div className="flex items-start gap-3">
            <span className="text-5xl">{course.icon}</span>
            <div className="flex-1">
              <h1 className="font-black text-xl leading-tight">{course.title}</h1>
              <p className="text-white/80 text-sm mt-1">{course.description}</p>
            </div>
          </div>
          <div className="mt-4">
            <div className="flex justify-between text-xs text-white/80 mb-1.5">
              <span>{completion}% complete</span>
              <span>{course.modules.length} modules</span>
            </div>
            <div className="h-2 bg-white/30 rounded-full overflow-hidden">
              <div
                className="h-2 bg-white rounded-full transition-all duration-500"
                style={{ width: `${completion}%` }}
              />
            </div>
          </div>
        </div>

        {/* Practice Test CTA */}
        <button
          onClick={() => navigate('/practice')}
          className="w-full bg-white dark:bg-slate-800 border-2 border-dashed border-slate-300 dark:border-slate-600 rounded-2xl p-4 flex items-center gap-3 touch-manipulation active:scale-[0.98] transition-transform"
        >
          <span className="text-3xl">📝</span>
          <div className="text-left">
            <p className="font-bold text-slate-900 dark:text-white text-sm">Full Practice Test</p>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              {course.testConfig.questionCount} questions · {course.testConfig.timeLimit} min · Pass at {course.testConfig.passingScore}%
            </p>
          </div>
          <svg className="w-5 h-5 text-slate-400 ml-auto flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
          </svg>
        </button>

        {/* Modules List */}
        <h2 className="text-sm font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wide">Modules</h2>
        <div className="space-y-3">
          {course.modules.map((mod, idx) => {
            const modCompletion = getModuleCompletion(course, mod, progress)
            const completedLessons = mod.lessons.filter(
              (l) => progress.courses[course.id]?.modules[mod.id]?.lessonsProgress[l.id]?.completed
            ).length

            return (
              <motion.div
                key={mod.id}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.04 }}
              >
                <div
                  onClick={() => navigate(`/learn/${course.id}/modules/${mod.id}`)}
                  className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-100 dark:border-slate-700 p-4 cursor-pointer active:scale-[0.98] transition-transform touch-manipulation"
                >
                  <div className="flex items-start gap-3">
                    <div className={`w-11 h-11 rounded-xl flex items-center justify-center text-2xl flex-shrink-0 ${course.bgGradient}`}>
                      {mod.icon}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <p className="font-bold text-slate-900 dark:text-white text-sm">{mod.title}</p>
                        {modCompletion === 100 && <Badge variant="green">✓ Done</Badge>}
                      </div>
                      <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5 line-clamp-1">{mod.description}</p>
                      <div className="flex items-center gap-2 mt-2">
                        <p className="text-xs text-slate-500">
                          {completedLessons}/{mod.lessons.length} lessons
                        </p>
                        <div className="flex-1">
                          <ProgressBar value={modCompletion} color={course.color} height="h-1.5" />
                        </div>
                      </div>
                    </div>
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
