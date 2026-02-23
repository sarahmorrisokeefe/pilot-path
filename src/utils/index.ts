import type { Course, Module, UserProgress, WeakAreaEntry } from '../types'

// ─── Date Helpers ─────────────────────────────────────────────────────────────

export function getTodayDateString(): string {
  return new Date().toISOString().split('T')[0]
}

export function isToday(dateStr: string): boolean {
  return dateStr === getTodayDateString()
}

export function isYesterday(dateStr: string): boolean {
  const yesterday = new Date()
  yesterday.setDate(yesterday.getDate() - 1)
  return dateStr === yesterday.toISOString().split('T')[0]
}

// ─── Progress Calculations ────────────────────────────────────────────────────

export function getModuleCompletion(
  course: Course,
  moduleData: Module,
  progress: UserProgress
): number {
  const courseProgress = progress.courses[course.id]
  if (!courseProgress) return 0

  const modProgress = courseProgress.modules[moduleData.id]
  if (!modProgress) return 0

  const totalLessons = moduleData.lessons.length
  if (totalLessons === 0) return 0

  const completedCount = moduleData.lessons.filter(
    (l) => modProgress.lessonsProgress[l.id]?.completed
  ).length

  return Math.round((completedCount / totalLessons) * 100)
}

export function getCourseCompletion(
  course: Course,
  progress: UserProgress
): number {
  const totalModules = course.modules.length
  if (totalModules === 0) return 0

  const totalLessons = course.modules.reduce(
    (acc, m) => acc + m.lessons.length,
    0
  )
  if (totalLessons === 0) return 0

  const courseProgress = progress.courses[course.id]
  if (!courseProgress) return 0

  let completedLessons = 0
  for (const mod of course.modules) {
    const modProgress = courseProgress.modules[mod.id]
    if (!modProgress) continue
    for (const lesson of mod.lessons) {
      if (modProgress.lessonsProgress[lesson.id]?.completed) {
        completedLessons++
      }
    }
  }

  return Math.round((completedLessons / totalLessons) * 100)
}

export function isModuleLocked(
  course: Course,
  moduleIndex: number,
  progress: UserProgress
): boolean {
  if (moduleIndex === 0) return false

  const prevModule = course.modules[moduleIndex - 1]
  const completion = getModuleCompletion(course, prevModule, progress)
  return completion < 100
}

export function getCourseXP(courseId: string, progress: UserProgress): number {
  return progress.courses[courseId]?.xp ?? 0
}

// ─── Weak Areas ───────────────────────────────────────────────────────────────

export function getTopWeakAreas(
  progress: UserProgress,
  limit = 20
): WeakAreaEntry[] {
  return Object.values(progress.weakAreas)
    .sort((a, b) => b.incorrectCount - a.incorrectCount)
    .slice(0, limit)
}

// ─── String Helpers ───────────────────────────────────────────────────────────

export function formatTime(seconds: number): string {
  const h = Math.floor(seconds / 3600)
  const m = Math.floor((seconds % 3600) / 60)
  const s = seconds % 60
  if (h > 0) {
    return `${h}:${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`
  }
  return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`
}

export function formatMinutes(minutes: number): string {
  const h = Math.floor(minutes / 60)
  const m = minutes % 60
  if (h > 0) {
    return `${h}h ${m}m`
  }
  return `${m}m`
}

export function pluralize(count: number, word: string): string {
  return `${count} ${word}${count !== 1 ? 's' : ''}`
}

// ─── Question Helpers ─────────────────────────────────────────────────────────

export function shuffleArray<T>(arr: T[]): T[] {
  const copy = [...arr]
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[copy[i], copy[j]] = [copy[j], copy[i]]
  }
  return copy
}

export function generateId(): string {
  return Math.random().toString(36).substring(2, 10)
}

// ─── Score Helpers ────────────────────────────────────────────────────────────

export function scoreToGrade(score: number): string {
  if (score >= 90) return 'A'
  if (score >= 80) return 'B'
  if (score >= 70) return 'C'
  if (score >= 60) return 'D'
  return 'F'
}

export function scoreToColor(score: number): string {
  if (score >= 80) return 'text-green-500'
  if (score >= 70) return 'text-amber-500'
  return 'text-red-500'
}
