import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Layout } from '../components/layout/Layout'
import { Card } from '../components/ui/Card'
import { Badge } from '../components/ui/Badge'
import { ProgressBar } from '../components/ui/ProgressBar'
import { COURSES } from '../data/courses'
import { useProgress } from '../hooks/useProgress'
import { getTopWeakAreas, getCourseCompletion, getTodayDateString, getLiveStreak } from '../utils'

const LEVEL_THRESHOLDS = [0, 50, 150, 300, 500, 800, 1200, 1800, 2500, 3500]

function getLevel(totalXP: number) {
  for (let i = LEVEL_THRESHOLDS.length - 1; i >= 0; i--) {
    if (totalXP >= LEVEL_THRESHOLDS[i]) return i + 1
  }
  return 1
}

export function Home() {
  const navigate = useNavigate()
  const { progress } = useProgress()
  const weakAreas = getTopWeakAreas(progress, 3)

  const today = getTodayDateString()
  const dailyDone = progress.dailyGoalDate === today ? (progress.dailyGoalProgress ?? 0) : 0
  const dailyGoal = progress.dailyGoal ?? 3
  const dailyPct = Math.min(100, Math.round((dailyDone / dailyGoal) * 100))

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
  const liveStreakCount = getLiveStreak(streak)
  const studiedToday = streak.lastStudied === today
  const level = getLevel(progress.totalXP)

  const container = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.07 } },
  }
  const item = { hidden: { opacity: 0, y: 16 }, show: { opacity: 1, y: 0 } }

  return (
    <Layout>
      <motion.div variants={container} initial="hidden" animate="show" className="space-y-5">

        {/* Hero Card */}
        <motion.div variants={item}>
          <Card className="bg-gradient-to-br from-cadence-800 to-cadence-600 border-0 text-white" padding="lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-cadence-100 text-sm font-medium">Total XP</p>
                <p className="text-4xl font-black mt-0.5">{progress.totalXP}</p>
              </div>
              <div className="text-center">
                <p className="text-cadence-100 text-sm font-medium">Level</p>
                <p className="text-4xl font-black mt-0.5">{level}</p>
              </div>
              <div className="text-right">
                <p className="text-cadence-100 text-sm font-medium">Streak</p>
                <p className="text-4xl font-black mt-0.5">
                  {liveStreakCount}
                  <span className="text-lg font-normal text-cadence-200 ml-1">{liveStreakCount === 1 ? 'day' : 'days'}</span>
                </p>
              </div>
            </div>
            {/* Daily Goal Bar */}
            <div className="mt-3 pt-3 border-t border-white/20">
              <div className="flex items-center justify-between mb-1">
                <p className="text-cadence-100 text-xs font-medium">
                  Daily goal: {dailyDone} of {dailyGoal} quizzes
                </p>
                {dailyDone >= dailyGoal && (
                  <span className="text-xs font-bold text-green-300">Done!</span>
                )}
              </div>
              <div className="w-full h-2 bg-white/20 rounded-full overflow-hidden">
                <div
                  className={`h-2 rounded-full transition-all duration-500 ease-out ${
                    dailyDone >= dailyGoal ? 'bg-green-400' : 'bg-white'
                  }`}
                  style={{ width: `${dailyPct}%` }}
                />
              </div>
            </div>
            <div className="mt-2 flex items-center gap-2">
              <span className={`w-2.5 h-2.5 rounded-full ${studiedToday ? 'bg-green-400' : 'bg-cadence-300'}`} />
              <p className="text-cadence-100 text-xs">
                {studiedToday ? 'Studied today! Keep the streak going.' : 'Study today to keep your streak alive!'}
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
                  `/learn/${nextLesson.course.id}/modules/${nextLesson.mod.id}/lessons/${nextLesson.lesson.id}`
                )
              }
              className="border-cadence-200 dark:border-cadence-900 bg-cadence-50 dark:bg-cadence-900/20"
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
                    {nextLesson.lesson.questions.length} questions · {nextLesson.lesson.xpReward} XP
                  </p>
                </div>
                <div className="text-cadence-800 dark:text-cadence-300 flex-shrink-0">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                  </svg>
                </div>
              </div>
            </Card>
          </motion.div>
        )}

        {/* Topic Map */}
        <motion.div variants={item}>
          <div className="flex items-center justify-between mb-2">
            <h2 className="text-sm font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wide">
              Topics
            </h2>
            <button
              onClick={() => navigate('/learn')}
              className="text-cadence-800 dark:text-cadence-300 text-xs font-semibold touch-manipulation"
            >
              Browse all →
            </button>
          </div>
          <div className="grid grid-cols-2 gap-3">
            {COURSES.map((course) => {
              const pct = getCourseCompletion(course, progress)
              const started = pct > 0
              const complete = pct === 100
              return (
                <div
                  key={course.id}
                  onClick={() => navigate(`/learn/${course.id}`)}
                  className={`bg-white dark:bg-slate-800 rounded-2xl border p-4 cursor-pointer touch-manipulation transition-shadow hover:shadow-md active:scale-[0.98] ${
                    started
                      ? 'border-cadence-200 dark:border-cadence-800'
                      : 'border-slate-100 dark:border-slate-700 opacity-80'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className={`w-10 h-10 ${course.bgGradient} rounded-xl flex items-center justify-center text-xl`}>
                      {course.icon}
                    </div>
                    {complete && (
                      <span className="text-green-500 text-lg">{'\u2705'}</span>
                    )}
                  </div>
                  <p className="font-bold text-slate-900 dark:text-white text-sm leading-tight">
                    {course.shortTitle}
                  </p>
                  {started && !complete && (
                    <div className="mt-2">
                      <ProgressBar value={pct} color={course.color} height="h-1.5" />
                      <p className="text-[10px] text-slate-500 mt-1">{pct}%</p>
                    </div>
                  )}
                  {!started && (
                    <p className="text-[10px] text-slate-400 dark:text-slate-500 mt-1">Not started</p>
                  )}
                </div>
              )
            })}
          </div>
        </motion.div>

        {/* Needs Review */}
        {weakAreas.length > 0 && (
          <motion.div variants={item}>
            <h2 className="text-sm font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wide mb-2">
              Needs Review
            </h2>
            <Card
              onClick={() => navigate('/review')}
              className="border-amber-200 dark:border-amber-800 bg-amber-50 dark:bg-amber-900/20"
            >
              <div className="flex items-center gap-3">
                <div className="text-3xl">{'\u{1F3AF}'}</div>
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

        {/* All done state */}
        {!nextLesson && (
          <motion.div variants={item}>
            <Card className="text-center" padding="lg">
              <p className="text-5xl mb-3">{'\u{1F393}'}</p>
              <p className="font-black text-xl text-slate-900 dark:text-white">All topics complete!</p>
              <p className="text-slate-500 dark:text-slate-400 text-sm mt-1">
                You've finished every lesson. Take a practice quiz to sharpen your skills or review weak areas.
              </p>
              <button
                onClick={() => navigate('/practice')}
                className="mt-4 bg-cadence-800 text-white px-6 py-2.5 rounded-xl font-bold text-sm touch-manipulation"
              >
                Practice Quiz
              </button>
            </Card>
          </motion.div>
        )}

      </motion.div>
    </Layout>
  )
}
