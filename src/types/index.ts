// ─── Question & Content Types ────────────────────────────────────────────────

export type QuestionType = 'multiple-choice' | 'true-false' | 'staff-identify' | 'staff-select'

export interface NoteSpec {
  keys: string[]         // VexFlow format: e.g., ['c/4'], ['e/4', 'g/4', 'b/4'] for chord
  duration: string       // e.g., 'q' (quarter), 'h' (half), 'w' (whole)
  accidental?: string    // e.g., '#', 'b', 'n'
}

export interface StaffConfig {
  notes: NoteSpec[]
  clef: 'treble' | 'bass' | 'alto' | 'tenor'
  keySignature?: string
  timeSignature?: string
  width?: number
  height?: number
  showLabels?: boolean
}

export type DiagramType = 'chord' | 'interval' | 'scale' | 'key-signature' | 'notation'

export interface Question {
  id: string
  text: string
  type: QuestionType
  options: string[]
  correctAnswer: number
  explanation: string
  reference?: string
  topic: string
  staffConfig?: StaffConfig
  diagramType?: DiagramType
  difficulty?: number  // 1-5, used by placement test
}

export interface LessonSlide {
  id: string
  topic: string          // e.g. "Key Signatures"
  explanation: string    // teaching paragraph
  questionText?: string  // original question text — populated for true/false so keyFact has context
  keyFact?: string       // key takeaway — the correct answer reformulated as a rule
  reference?: string     // e.g. "AP Music Theory, Unit 3"
  staffConfig?: StaffConfig
  diagramType?: DiagramType
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
  placementResult?: PlacementResult
  badges: BadgeId[]
  dailyGoal: number            // quizzes per day (1, 3, or 5)
  dailyGoalProgress: number    // quizzes completed today
  dailyGoalDate: string | null // ISO date for today tracking
  level: number
}

export interface PlacementResult {
  completedAt: string
  score: number
  recommendedCourseIndex: number
  skillLevel: number // 1-5
}

export type BadgeId =
  | 'first-steps'
  | 'note-reader'
  | 'rhythm-keeper'
  | 'scale-master'
  | 'interval-pro'
  | 'chord-builder'
  | 'perfect-score'
  | 'week-warrior'
  | 'dedicated'
  | 'century'
  | 'scholar'

export interface Badge {
  id: BadgeId
  name: string
  description: string
  icon: string
  earnedAt?: string
}

// ─── UI Types ─────────────────────────────────────────────────────────────────

export type TabId = 'home' | 'learn' | 'practice' | 'review' | 'progress'

export interface QuizState {
  currentIndex: number
  answers: (number | null)[]
  showFeedback: boolean
  completed: boolean
  startTime: number
}

export type ThemeMode = 'light' | 'dark' | 'system'
