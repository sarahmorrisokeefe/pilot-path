import { motion } from 'framer-motion'
import { Layout } from '../components/layout/Layout'
import { ProgressBar } from '../components/ui/ProgressBar'
import { Badge } from '../components/ui/Badge'
import { COURSES } from '../data/courses'
import { useProgress } from '../hooks/useProgress'
import { getCourseCompletion, getCourseXP, formatTime, pluralize } from '../utils'

export function Progress() {
  const { progress, resetProgress } = useProgress()
  const streak = progress.streak

  const container = { hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.07 } } }
  const item = { hidden: { opacity: 0, y: 12 }, show: { opacity: 1, y: 0 } }

  return (
    <Layout title="Progress">
      <motion.div variants={container} initial="hidden" animate="show" className="space-y-5">

        {/* Streak Card */}
        <motion.div variants={item}>
          <div className="bg-gradient-to-r from-orange-400 to-amber-500 rounded-2xl p-5 text-white">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-orange-100 text-sm font-medium">Current Streak</p>
                <p className="text-5xl font-black mt-1">🔥 {streak.current}</p>
                <p className="text-orange-100 text-sm mt-1">{pluralize(streak.current, 'day')} in a row</p>
              </div>
              <div className="text-right">
                <p className="text-orange-100 text-sm font-medium">Longest</p>
                <p className="text-3xl font-black mt-1">{streak.longest} 🏅</p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* XP Summary */}
        <motion.div variants={item}>
          <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-100 dark:border-slate-700 p-4">
            <h3 className="font-bold text-slate-900 dark:text-white mb-3">XP Earned</h3>
            <p className="text-4xl font-black text-amber-500">⭐ {progress.totalXP}</p>
            <p className="text-slate-500 dark:text-slate-400 text-sm mt-1">total experience points</p>
            <div className="mt-4 space-y-2">
              {COURSES.map((c) => {
                const xp = getCourseXP(c.id, progress)
                if (!xp) return null
                return (
                  <div key={c.id} className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span>{c.icon}</span>
                      <span className="text-sm text-slate-700 dark:text-slate-300">{c.shortTitle}</span>
                    </div>
                    <Badge variant="amber">⭐ {xp}</Badge>
                  </div>
                )
              })}
            </div>
          </div>
        </motion.div>

        {/* Course completions */}
        <motion.div variants={item}>
          <h2 className="text-sm font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wide mb-2">Course Progress</h2>
          <div className="space-y-3">
            {COURSES.map((course) => {
              const pct = getCourseCompletion(course, progress)
              const totalLessons = course.modules.reduce((a, m) => a + m.lessons.length, 0)
              const completedLessons = course.modules.reduce((a, m) => {
                const modP = progress.courses[course.id]?.modules[m.id]
                if (!modP) return a
                return a + m.lessons.filter((l) => modP.lessonsProgress[l.id]?.completed).length
              }, 0)

              return (
                <div key={course.id} className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-100 dark:border-slate-700 p-4">
                  <div className="flex items-center gap-3 mb-3">
                    <div className={`w-10 h-10 ${course.bgGradient} rounded-xl flex items-center justify-center text-xl`}>
                      {course.icon}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <p className="font-bold text-slate-900 dark:text-white text-sm">{course.shortTitle}</p>
                        {pct === 100 && <Badge variant="green">Complete 🏆</Badge>}
                      </div>
                      <p className="text-xs text-slate-500">{completedLessons}/{totalLessons} lessons</p>
                    </div>
                    <span className="text-sm font-black text-slate-700 dark:text-slate-300">{pct}%</span>
                  </div>
                  <ProgressBar value={pct} color={course.color} height="h-2" />
                </div>
              )
            })}
          </div>
        </motion.div>

        {/* Test History */}
        {progress.testResults.length > 0 && (
          <motion.div variants={item}>
            <h2 className="text-sm font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wide mb-2">Test History</h2>
            <div className="space-y-3">
              {[...progress.testResults].reverse().slice(0, 10).map((result) => {
                const course = COURSES.find((c) => c.id === result.courseId)
                return (
                  <div key={result.id} className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-100 dark:border-slate-700 p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <span className="text-2xl">{result.passed ? '✅' : '❌'}</span>
                        <div>
                          <p className="font-bold text-slate-900 dark:text-white text-sm">{course?.shortTitle ?? result.courseId}</p>
                          <p className="text-xs text-slate-500">{new Date(result.date).toLocaleDateString()} · {formatTime(result.timeTaken)}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className={`text-xl font-black ${result.passed ? 'text-green-500' : 'text-red-500'}`}>{result.score}%</p>
                        <p className="text-xs text-slate-500">{result.passed ? 'PASS' : 'FAIL'}</p>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </motion.div>
        )}

        {/* Reset */}
        <motion.div variants={item}>
          <button
            onClick={() => {
              if (window.confirm('Reset all progress? This cannot be undone.')) {
                resetProgress()
              }
            }}
            className="w-full py-3 text-sm text-red-400 dark:text-red-500 font-semibold touch-manipulation"
          >
            Reset All Progress
          </button>
        </motion.div>

      </motion.div>
    </Layout>
  )
}
