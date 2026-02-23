import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Layout } from '../components/layout/Layout'
import { CourseCard } from '../components/dashboard/CourseCard'
import { Card } from '../components/ui/Card'
import { Badge } from '../components/ui/Badge'
import { COURSES } from '../data/courses'
import { useProgress } from '../hooks/useProgress'
import { getTopWeakAreas, getCourseCompletion } from '../utils'

export function Home() {
  const navigate = useNavigate()
  const { progress } = useProgress()
  const weakAreas = getTopWeakAreas(progress, 3)

  // Find next incomplete lesson across all courses
  const nextLesson = (() => {
    for (const course of COURSES) {
      for (const mod of course.modules) {
        for (const lesson of mod.lessons) {
          const completed = progress.courses[course.id]?.modules[mod.id]?.lessonsProgress[lesson.id]?.completed
          if (!completed) {
            return { course, mod, lesson }
          }
        }
      }
    }
    return null
  })()

  const streak = progress.streak
  const today = new Date().toISOString().split('T')[0]
  const studiedToday = streak.lastStudied === today

  const container = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.07 } },
  }
  const item = { hidden: { opacity: 0, y: 16 }, show: { opacity: 1, y: 0 } }

  return (
    <Layout>
      <motion.div variants={container} initial="hidden" animate="show" className="space-y-5">

        {/* XP + Streak Hero */}
        <motion.div variants={item}>
          <Card className="bg-gradient-to-br from-sky-500 to-blue-600 border-0 text-white" padding="lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sky-100 text-sm font-medium">Total XP</p>
                <p className="text-4xl font-black mt-0.5">⭐ {progress.totalXP}</p>
              </div>
              <div className="text-right">
                <p className="text-sky-100 text-sm font-medium">Study Streak</p>
                <p className="text-4xl font-black mt-0.5">
                  🔥 {streak.current}
                  <span className="text-lg font-normal text-sky-200 ml-1">days</span>
                </p>
              </div>
            </div>
            <div className="mt-3 pt-3 border-t border-white/20 flex items-center gap-2">
              <span className={`w-2.5 h-2.5 rounded-full ${studiedToday ? 'bg-green-400' : 'bg-sky-300'}`} />
              <p className="text-sky-100 text-xs">
                {studiedToday ? 'Studied today! Keep the streak going 💪' : 'Study today to keep your streak alive!'}
              </p>
            </div>
          </Card>
        </motion.div>

        {/* Continue Learning */}
        {nextLesson && (
          <motion.div variants={item}>
            <h2 className="text-sm font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wide mb-2">
              Continue Learning
            </h2>
            <Card
              onClick={() =>
                navigate(
                  `/courses/${nextLesson.course.id}/modules/${nextLesson.mod.id}/lessons/${nextLesson.lesson.id}`
                )
              }
              className="border-sky-200 dark:border-sky-800 bg-sky-50 dark:bg-sky-900/20"
            >
              <div className="flex items-center gap-3">
                <div className={`w-12 h-12 ${nextLesson.course.bgGradient} rounded-xl flex items-center justify-center text-2xl flex-shrink-0`}>
                  {nextLesson.course.icon}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">
                    {nextLesson.course.shortTitle} · {nextLesson.mod.title}
                  </p>
                  <p className="font-bold text-slate-900 dark:text-white text-sm mt-0.5 line-clamp-1">
                    {nextLesson.lesson.title}
                  </p>
                  <p className="text-xs text-slate-500 mt-0.5">
                    {nextLesson.lesson.questions.length} questions · ⭐ {nextLesson.lesson.xpReward} XP
                  </p>
                </div>
                <div className="text-sky-500 dark:text-sky-400 flex-shrink-0">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                  </svg>
                </div>
              </div>
            </Card>
          </motion.div>
        )}

        {/* Weak Areas Callout */}
        {weakAreas.length > 0 && (
          <motion.div variants={item}>
            <h2 className="text-sm font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wide mb-2">
              Needs Review
            </h2>
            <Card
              onClick={() => navigate('/weak-areas')}
              className="border-amber-200 dark:border-amber-800 bg-amber-50 dark:bg-amber-900/20"
            >
              <div className="flex items-center gap-3">
                <div className="text-3xl">🎯</div>
                <div className="flex-1">
                  <p className="font-bold text-slate-900 dark:text-white text-sm">
                    {weakAreas.length} topic{weakAreas.length !== 1 ? 's' : ''} to review
                  </p>
                  <div className="flex flex-wrap gap-1 mt-1.5">
                    {weakAreas.slice(0, 3).map((w) => (
                      <Badge key={w.questionId} variant="amber">{w.topic}</Badge>
                    ))}
                  </div>
                </div>
                <svg className="w-5 h-5 text-amber-500 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                </svg>
              </div>
            </Card>
          </motion.div>
        )}

        {/* Courses */}
        <motion.div variants={item}>
          <div className="flex items-center justify-between mb-2">
            <h2 className="text-sm font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wide">
              Your Courses
            </h2>
            <button
              onClick={() => navigate('/courses')}
              className="text-sky-500 text-xs font-semibold touch-manipulation"
            >
              See all →
            </button>
          </div>
          <div className="space-y-3">
            {COURSES.map((course) => (
              <CourseCard key={course.id} course={course} />
            ))}
          </div>
        </motion.div>

        {/* All done state */}
        {!nextLesson && (
          <motion.div variants={item}>
            <Card className="text-center" padding="lg">
              <p className="text-5xl mb-3">🎓</p>
              <p className="font-black text-xl text-slate-900 dark:text-white">All caught up!</p>
              <p className="text-slate-500 dark:text-slate-400 text-sm mt-1">
                You've completed every lesson. Try a practice test to check your knowledge.
              </p>
              <button
                onClick={() => navigate('/practice')}
                className="mt-4 bg-sky-500 text-white px-6 py-2.5 rounded-xl font-bold text-sm touch-manipulation"
              >
                Take a Practice Test
              </button>
            </Card>
          </motion.div>
        )}

      </motion.div>
    </Layout>
  )
}
