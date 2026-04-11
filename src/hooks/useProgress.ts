import { useCallback } from 'react'
import { useStorage } from './useStorage'
import type { UserProgress, Question, TestResult } from '../types'
import { getTodayDateString, isToday, isYesterday } from '../utils'
import { supabase, supabaseEnabled } from '../lib/supabase'

// ─── Supabase sync helpers (standalone, no hook deps) ────────────────────────

/** Fire-and-forget upsert of the full progress object to Supabase. */
export async function pushProgressToSupabase(
  userId: string,
  progress: UserProgress
): Promise<void> {
  if (!supabaseEnabled) return
  try {
    await supabase
      .from('user_progress')
      .upsert(
        { id: userId, progress, updated_at: new Date().toISOString() },
        { onConflict: 'id' }
      )
  } catch {
    // Network failure — silently ignore; local data is always the source of truth
  }
}

/** Fetch remote progress for a user. Returns null on error or if no row exists. */
export async function fetchProgressFromSupabase(
  userId: string
): Promise<UserProgress | null> {
  if (!supabaseEnabled) return null
  try {
    const { data, error } = await supabase
      .from('user_progress')
      .select('progress')
      .eq('id', userId)
      .single()
    if (error || !data) return null
    return data.progress as UserProgress
  } catch {
    return null
  }
}

const PROGRESS_KEY = 'cadence_progress'

const defaultProgress: UserProgress = {
  courses: {},
  weakAreas: {},
  testResults: [],
  totalXP: 0,
  streak: {
    current: 0,
    longest: 0,
    lastStudied: null,
  },
  lastActivity: null,
  badges: [],
  dailyGoal: 3,
  dailyGoalProgress: 0,
  dailyGoalDate: null,
  level: 1,
}

function calculateLevel(totalXP: number): number {
  const thresholds = [0, 50, 150, 300, 500, 800, 1200, 1800, 2500, 3500]
  for (let i = thresholds.length - 1; i >= 0; i--) {
    if (totalXP >= thresholds[i]) return i + 1
  }
  return 1
}

export function useProgress() {
  const [rawProgress, setProgress] = useStorage<UserProgress>(
    PROGRESS_KEY,
    defaultProgress
  )

  // Merge with defaults to ensure new fields exist on old stored data
  const progress: UserProgress = {
    ...defaultProgress,
    ...rawProgress,
    streak: { ...defaultProgress.streak, ...rawProgress.streak },
  }

  // ─── Streak Management ──────────────────────────────────────────────────────

  const updateStreak = useCallback(() => {
    setProgress((prev) => {
      const today = getTodayDateString()
      const { streak } = prev

      if (streak.lastStudied === today) {
        // Already studied today — no change
        return prev
      }

      let newCurrent: number
      if (streak.lastStudied === null || !isYesterday(streak.lastStudied)) {
        // First time or gap — reset to 1
        newCurrent = 1
      } else {
        // Consecutive day
        newCurrent = streak.current + 1
      }

      return {
        ...prev,
        streak: {
          current: newCurrent,
          longest: Math.max(newCurrent, streak.longest),
          lastStudied: today,
        },
        lastActivity: new Date().toISOString(),
      }
    })
  }, [setProgress])

  // ─── Lesson Completion ──────────────────────────────────────────────────────

  const completeLesson = useCallback(
    (params: {
      courseId: string
      moduleId: string
      lessonId: string
      correctCount: number
      totalCount: number
      questions: Question[]
      answers: (number | null)[]
    }) => {
      const { courseId, moduleId, lessonId, correctCount, totalCount, questions, answers } = params
      const score = Math.round((correctCount / totalCount) * 100)
      const isPerfect = score === 100
      const baseXP = 10
      const bonusXP = isPerfect ? 10 : 0
      const xpEarned = baseXP + bonusXP

      setProgress((prev) => {
        const today = getTodayDateString()

        // Build updated weak areas
        const weakAreas = { ...prev.weakAreas }
        questions.forEach((q, i) => {
          const isCorrect = answers[i] === q.correctAnswer
          if (!isCorrect) {
            const existing = weakAreas[q.id]
            weakAreas[q.id] = {
              questionId: q.id,
              questionText: q.text,
              topic: q.topic,
              courseId,
              moduleId,
              lessonId,
              incorrectCount: (existing?.incorrectCount ?? 0) + 1,
              lastAttempted: new Date().toISOString(),
            }
          } else if (weakAreas[q.id]) {
            // Correct answer — decrement weak count (floor 0)
            const entry = weakAreas[q.id]
            if (entry.incorrectCount <= 1) {
              delete weakAreas[q.id]
            } else {
              weakAreas[q.id] = {
                ...entry,
                incorrectCount: entry.incorrectCount - 1,
              }
            }
          }
        })

        // Update course progress
        const courseProgress = prev.courses[courseId] ?? { xp: 0, modules: {} }
        const moduleProgress = courseProgress.modules[moduleId] ?? {
          lessonsProgress: {},
        }

        const alreadyCompleted =
          moduleProgress.lessonsProgress[lessonId]?.completed ?? false

        const updatedLesson = {
          completed: true,
          score,
          xpEarned,
          completedAt: new Date().toISOString(),
        }

        const updatedModule = {
          ...moduleProgress,
          lessonsProgress: {
            ...moduleProgress.lessonsProgress,
            [lessonId]: updatedLesson,
          },
        }

        const updatedCourse = {
          ...courseProgress,
          xp: courseProgress.xp + (alreadyCompleted ? 0 : xpEarned),
          modules: {
            ...courseProgress.modules,
            [moduleId]: updatedModule,
          },
        }

        // Streak update
        const { streak } = prev
        let newCurrent = streak.current
        if (streak.lastStudied !== today) {
          if (streak.lastStudied === null || !isYesterday(streak.lastStudied)) {
            newCurrent = 1
          } else {
            newCurrent = streak.current + 1
          }
        }

        const newTotalXP = prev.totalXP + (alreadyCompleted ? 0 : xpEarned)

        return {
          ...prev,
          courses: { ...prev.courses, [courseId]: updatedCourse },
          weakAreas,
          totalXP: newTotalXP,
          streak: {
            current: newCurrent,
            longest: Math.max(newCurrent, streak.longest),
            lastStudied: today,
          },
          lastActivity: new Date().toISOString(),
          dailyGoalProgress: prev.dailyGoalDate === today ? prev.dailyGoalProgress + 1 : 1,
          dailyGoalDate: today,
          level: calculateLevel(newTotalXP),
        }
      })

      return xpEarned
    },
    [setProgress]
  )

  // ─── Test Completion ────────────────────────────────────────────────────────

  const completeTest = useCallback(
    (result: TestResult) => {
      setProgress((prev) => {
        const today = getTodayDateString()
        const testXP = result.passed ? 50 : 20
        const courseProgress = prev.courses[result.courseId] ?? {
          xp: 0,
          modules: {},
        }

        const { streak } = prev
        let newCurrent = streak.current
        if (streak.lastStudied !== today) {
          if (streak.lastStudied === null || !isYesterday(streak.lastStudied)) {
            newCurrent = 1
          } else {
            newCurrent = streak.current + 1
          }
        }

        return {
          ...prev,
          courses: {
            ...prev.courses,
            [result.courseId]: {
              ...courseProgress,
              xp: courseProgress.xp + testXP,
            },
          },
          testResults: [...prev.testResults, result],
          totalXP: prev.totalXP + testXP,
          streak: {
            current: newCurrent,
            longest: Math.max(newCurrent, streak.longest),
            lastStudied: today,
          },
          lastActivity: new Date().toISOString(),
        }
      })
    },
    [setProgress]
  )

  // ─── Helpers ────────────────────────────────────────────────────────────────

  const isLessonComplete = useCallback(
    (courseId: string, moduleId: string, lessonId: string): boolean => {
      return (
        progress.courses[courseId]?.modules[moduleId]?.lessonsProgress[lessonId]
          ?.completed ?? false
      )
    },
    [progress]
  )

  const getLessonScore = useCallback(
    (courseId: string, moduleId: string, lessonId: string): number => {
      return (
        progress.courses[courseId]?.modules[moduleId]?.lessonsProgress[lessonId]
          ?.score ?? 0
      )
    },
    [progress]
  )

  const resetProgress = useCallback(() => {
    setProgress(defaultProgress)
  }, [setProgress])

  const isStudiedToday = isToday(progress.streak.lastStudied ?? '')

  /** Load remote progress and overwrite local if the remote has more total XP. */
  const loadFromSupabase = useCallback(async (userId: string) => {
    const remote = await fetchProgressFromSupabase(userId)
    if (!remote) return
    setProgress((local) => (remote.totalXP >= local.totalXP ? remote : local))
  }, [setProgress])

  return {
    progress,
    completeLesson,
    completeTest,
    updateStreak,
    isLessonComplete,
    getLessonScore,
    resetProgress,
    isStudiedToday,
    loadFromSupabase,
  }
}
