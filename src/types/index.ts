// ─── Question & Content Types ────────────────────────────────────────────────

export type QuestionType = 'multiple-choice' | 'true-false'

export interface Question {
  id: string
  text: string
  type: QuestionType
  options: string[]
  correctAnswer: number
  explanation: string
  reference?: string
  topic: string
}

export interface LessonSlide {
  id: string
  topic: string          // e.g. "Class B Airspace"
  explanation: string    // teaching paragraph
  questionText?: string  // original question text — populated for true/false so keyFact has context
  keyFact?: string       // key takeaway — the correct answer reformulated as a rule
  reference?: string     // e.g. "14 CFR 91.131"
}

export interface Lesson {
  id: string
  title: string
  questions: Question[]
  xpReward: number
  slides?: LessonSlide[] // optional custom slides; if absent, derived from questions
}

export interface Module {
  id: string
  courseId: string
  title: string
  description: string
  icon: string
  lessons: Lesson[]
  order: number
}

export interface Course {
  id: string
  title: string
  shortTitle: string
  description: string
  icon: string
  color: string
  bgGradient: string
  modules: Module[]
  testConfig: {
    questionCount: number
    timeLimit: number // minutes
    passingScore: number // percent
  }
}

// ─── Progress Types ────────────────────────────────────────────────────────────

export interface LessonProgress {
  completed: boolean
  score: number // 0-100, percent correct
  xpEarned: number
  completedAt: string | null
}

export interface ModuleProgress {
  lessonsProgress: Record<string, LessonProgress>
}

export interface CourseProgress {
  xp: number
  modules: Record<string, ModuleProgress>
}

export interface WeakAreaEntry {
  questionId: string
  questionText: string
  topic: string
  courseId: string
  moduleId: string
  lessonId: string
  incorrectCount: number
  lastAttempted: string
}

export interface TestResult {
  id: string
  courseId: string
  date: string
  score: number // percent
  totalQuestions: number
  timeTaken: number // seconds
  passed: boolean
  topicBreakdown: Record<string, { correct: number; total: number }>
  answers: Record<string, { selected: number; correct: boolean }>
}

export interface StreakData {
  current: number
  longest: number
  lastStudied: string | null // ISO date string YYYY-MM-DD
}

export interface UserProgress {
  courses: Record<string, CourseProgress>
  weakAreas: Record<string, WeakAreaEntry>
  testResults: TestResult[]
  totalXP: number
  streak: StreakData
  lastActivity: string | null
}

// ─── UI Types ─────────────────────────────────────────────────────────────────

export type TabId = 'home' | 'courses' | 'test' | 'weak-areas' | 'progress'

export interface QuizState {
  currentIndex: number
  answers: (number | null)[]
  showFeedback: boolean
  completed: boolean
  startTime: number
}

export type ThemeMode = 'light' | 'dark' | 'system'
