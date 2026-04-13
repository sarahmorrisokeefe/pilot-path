import { motion } from 'framer-motion'
import { Layout } from '../components/layout/Layout'
import { ProgressBar } from '../components/ui/ProgressBar'
import { Badge } from '../components/ui/Badge'
import { COURSES } from '../data/courses'
import { useProgress } from '../hooks/useProgress'
import { getCourseCompletion, getCourseXP, formatTime, pluralize, getTodayDateString, getLiveStreak } from '../utils'
import type { BadgeId } from '../types'

// ─── Badge Definitions ───────────────────────────────────────────────────────

const BADGES: { id: BadgeId; name: string; description: string; icon: string }[] = [
  { id: 'first-steps', name: 'First Steps', description: 'Complete your first lesson', icon: '\u{1F463}' },
  { id: 'note-reader', name: 'Note Reader', description: 'Complete Notation Basics', icon: '\u{1F3BC}' },
  { id: 'rhythm-keeper', name: 'Rhythm Keeper', description: 'Complete Rhythm & Meter', icon: '\u{1F941}' },
  { id: 'scale-master', name: 'Scale Master', description: 'Complete Scales & Keys', icon: '\u{1F3B9}' },
  { id: 'interval-pro', name: 'Interval Pro', description: 'Complete Intervals', icon: '\u{1F4CF}' },
  { id: 'chord-builder', name: 'Chord Builder', description: 'Complete Chords', icon: '\u{1F3B8}' },
  { id: 'perfect-score', name: 'Perfect Score', description: 'Get 100% on any quiz', icon: '\u{1F4AF}' },
  { id: 'week-warrior', name: 'Week Warrior', description: '7-day streak', icon: '\u{1F5D3}\uFE0F' },
  { id: 'dedicated', name: 'Dedicated', description: '30-day streak', icon: '\u{1F3C6}' },
  { id: 'century', name: 'Century', description: 'Earn 100 XP', icon: '\u{1FAB7}' },
  { id: 'scholar', name: 'Scholar', description: 'Earn 1,000 XP', icon: '\u{1F393}' },
]

// ─── Level Helpers ───────────────────────────────────────────────────────────

const LEVEL_THRESHOLDS = [0, 50, 150, 300, 500, 800, 1200, 1800, 2500, 3500]

function getLevelInfo(totalXP: number) {
  let level = 1
  for (let i = LEVEL_THRESHOLDS.length - 1; i >= 0; i--) {
    if (totalXP >= LEVEL_THRESHOLDS[i]) {
      level = i + 1
      break
    }
  }
  const currentThreshold = LEVEL_THRESHOLDS[level - 1] ?? 0
  const nextThreshold = LEVEL_THRESHOLDS[level] ?? LEVEL_THRESHOLDS[LEVEL_THRESHOLDS.length - 1]
  const isMaxLevel = level > LEVEL_THRESHOLDS.length - 1
  const xpIntoLevel = totalXP - currentThreshold
  const xpForNextLevel = nextThreshold - currentThreshold
  const pct = isMaxLevel ? 100 : Math.round((xpIntoLevel / xpForNextLevel) * 100)
  return { level, pct, xpIntoLevel, xpForNextLevel, isMaxLevel }
}

// ─── Component ───────────────────────────────────────────────────────────────

export function Progress() {
  const { progress, resetProgress } = useProgress()
  const streak = progress.streak
  const liveStreakCount = getLiveStreak(streak)
  const levelInfo = getLevelInfo(progress.totalXP)

  const today = getTodayDateString()
  const dailyDone = progress.dailyGoalDate === today ? progress.dailyGoalProgress : 0
  const dailyGoal = progress.dailyGoal
  const dailyPct = Math.min(100, Math.round((dailyDone / dailyGoal) * 100))

  const container = { hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.07 } } }
  const item = { hidden: { opacity: 0, y: 12 }, show: { opacity: 1, y: 0 } }

  return (
    <Layout title="Progress">
      <motion.div variants={container} initial="hidden" animate="show" className="space-y-5">

        {/* Level Card */}
        <motion.div variants={item}>
          <div className="bg-gradient-to-r from-cadence-800 to-cadence-600 rounded-2xl p-5 text-white">
            <div className="flex items-center justify-between mb-3">
              <div>
                <p className="text-cadence-100 text-sm font-medium">Level</p>
                <p className="text-5xl font-black mt-1">{levelInfo.level}</p>
              </div>
              <div className="text-right">
                <p className="text-cadence-100 text-sm font-medium">Total XP</p>
                <p className="text-3xl font-black mt-1">{progress.totalXP}</p>
              </div>
            </div>
            <div className="w-full h-2.5 bg-white/20 rounded-full overflow-hidden">
              <div
                className="h-2.5 bg-white rounded-full transition-all duration-500 ease-out"
                style={{ width: `${levelInfo.pct}%` }}
              />
            </div>
            <p className="text-cadence-200 text-xs mt-1.5">
              {levelInfo.isMaxLevel
                ? 'Max level reached!'
                : `${levelInfo.xpIntoLevel} / ${levelInfo.xpForNextLevel} XP to level ${levelInfo.level + 1}`}
            </p>
          </div>
        </motion.div>

        {/* Daily Goal */}
        <motion.div variants={item}>
          <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-100 dark:border-slate-700 p-4">
            <div className="flex items-center justify-between mb-2">
              <h3 className="font-bold text-slate-900 dark:text-white">Daily Goal</h3>
              <Badge variant={dailyDone >= dailyGoal ? 'green' : 'amber'}>
                {dailyDone >= dailyGoal ? 'Complete!' : `${dailyDone} of ${dailyGoal}`}
              </Badge>
            </div>
            <div className="w-full h-3 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
              <div
                className={`h-3 rounded-full transition-all duration-500 ease-out ${
                  dailyDone >= dailyGoal ? 'bg-green-500' : 'bg-cadence-600'
                }`}
                style={{ width: `${dailyPct}%` }}
              />
            </div>
            <p className="text-slate-500 dark:text-slate-400 text-xs mt-1.5">
              {dailyDone >= dailyGoal
                ? 'You hit your daily goal! Great work.'
                : `Complete ${dailyGoal - dailyDone} more ${pluralize(dailyGoal - dailyDone, 'quiz').replace(/^\d+ /, '')} to reach your goal`}
            </p>
          </div>
        </motion.div>

        {/* Streak Card */}
        <motion.div variants={item}>
          <div className="bg-gradient-to-r from-orange-400 to-amber-500 rounded-2xl p-5 text-white">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-orange-100 text-sm font-medium">Current Streak</p>
                <p className="text-5xl font-black mt-1">{liveStreakCount}</p>
                <p className="text-orange-100 text-sm mt-1">{pluralize(streak.current, 'day')} in a row</p>
              </div>
              <div className="text-right">
                <p className="text-orange-100 text-sm font-medium">Longest</p>
                <p className="text-3xl font-black mt-1">{streak.longest}</p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Badges */}
        <motion.div variants={item}>
          <h2 className="text-sm font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wide mb-2">Badges</h2>
          <div className="grid grid-cols-3 gap-3">
            {BADGES.map((badge) => {
              const earned = progress.badges.includes(badge.id)
              return (
                <div
                  key={badge.id}
                  className={`bg-white dark:bg-slate-800 rounded-2xl border p-3 text-center ${
                    earned
                      ? 'border-cadence-200 dark:border-cadence-800'
                      : 'border-slate-100 dark:border-slate-700 opacity-40'
                  }`}
                >
                  <div className="text-3xl mb-1">{badge.icon}</div>
                  <p className="font-bold text-xs text-slate-900 dark:text-white leading-tight">{badge.name}</p>
                  <p className="text-[10px] text-slate-500 dark:text-slate-400 mt-0.5 leading-tight">{badge.description}</p>
                </div>
              )
            })}
          </div>
        </motion.div>

        {/* XP Summary */}
        <motion.div variants={item}>
          <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-100 dark:border-slate-700 p-4">
            <h3 className="font-bold text-slate-900 dark:text-white mb-3">XP Breakdown</h3>
            <div className="space-y-2">
              {COURSES.map((c) => {
                const xp = getCourseXP(c.id, progress)
                if (!xp) return null
                return (
                  <div key={c.id} className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span>{c.icon}</span>
                      <span className="text-sm text-slate-700 dark:text-slate-300">{c.shortTitle}</span>
                    </div>
                    <Badge variant="amber">{xp} XP</Badge>
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
                        {pct === 100 && <Badge variant="green">Complete</Badge>}
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
                        <span className="text-2xl">{result.passed ? '\u2705' : '\u274C'}</span>
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
