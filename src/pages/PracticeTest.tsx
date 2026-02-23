import { useEffect, useRef, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import confetti from 'canvas-confetti'
import { Layout } from '../components/layout/Layout'
import { Button } from '../components/ui/Button'
import { Badge } from '../components/ui/Badge'
import { COURSES, getCourseById } from '../data/courses'
import { useProgress } from '../hooks/useProgress'
import { usePracticeTest } from '../hooks/useQuiz'
import type { PracticeTestResults } from '../hooks/useQuiz'
import type { TestResult } from '../types'
import { formatTime, shuffleArray, generateId, scoreToColor } from '../utils'

// Gather questions from all modules in a course
function buildTestQuestions(courseId: string, count: number) {
  const course = getCourseById(courseId)
  if (!course) return []
  const allQ = course.modules.flatMap((m) => m.lessons.flatMap((l) => l.questions))
  return shuffleArray(allQ).slice(0, Math.min(count, allQ.length))
}

export function PracticeTest() {
  const { courseId } = useParams<{ courseId: string }>()
  const navigate = useNavigate()
  const { completeTest } = useProgress()
  const [started, setStarted] = useState(false)
  const [reviewMode, setReviewMode] = useState(false)
  const resultRef = useRef<PracticeTestResults | null>(null)

  const course = getCourseById(courseId ?? '')

  // If no courseId, show course picker
  if (!courseId || !course) {
    return (
      <Layout title="Practice Tests">
        <div className="space-y-4">
          <p className="text-slate-500 dark:text-slate-400 text-sm">
            Choose a course to take a full timed practice exam that mirrors the real FAA written test.
          </p>
          {COURSES.map((c) => (
            <div
              key={c.id}
              onClick={() => navigate(`/practice/${c.id}`)}
              className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-100 dark:border-slate-700 p-4 cursor-pointer active:scale-[0.98] transition-transform touch-manipulation"
            >
              <div className="flex items-center gap-3">
                <div className={`w-12 h-12 ${c.bgGradient} rounded-xl flex items-center justify-center text-2xl flex-shrink-0`}>
                  {c.icon}
                </div>
                <div className="flex-1">
                  <p className="font-bold text-slate-900 dark:text-white">{c.title}</p>
                  <p className="text-xs text-slate-500 mt-0.5">
                    {c.testConfig.questionCount} questions · {c.testConfig.timeLimit} min · Pass at {c.testConfig.passingScore}%
                  </p>
                </div>
                <svg className="w-5 h-5 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                </svg>
              </div>
            </div>
          ))}
        </div>
      </Layout>
    )
  }

  const questions = buildTestQuestions(course.id, course.testConfig.questionCount)
  const timeLimitSeconds = course.testConfig.timeLimit * 60

  const handleComplete = (results: PracticeTestResults) => {
    resultRef.current = results
    const passed = results.score >= course.testConfig.passingScore
    const testResult: TestResult = {
      id: generateId(),
      courseId: course.id,
      date: new Date().toISOString(),
      score: results.score,
      totalQuestions: results.totalCount,
      timeTaken: results.timeTaken,
      passed,
      topicBreakdown: results.topicBreakdown,
      answers: Object.fromEntries(
        questions.map((q, i) => [q.id, { selected: results.answers[i] ?? -1, correct: results.answers[i] === q.correctAnswer }])
      ),
    }
    completeTest(testResult)
    if (passed) {
      confetti({ particleCount: 150, spread: 90, origin: { y: 0.6 }, colors: ['#0ea5e9', '#22c55e', '#f59e0b'] })
    }
  }

  const test = usePracticeTest({ questions, timeLimitSeconds, onComplete: handleComplete })

  // Start screen
  if (!started) {
    return (
      <Layout title={`${course.shortTitle} Practice Test`} backPath="/practice">
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="text-center py-8 space-y-6">
          <div className={`w-24 h-24 ${course.bgGradient} rounded-3xl flex items-center justify-center text-5xl mx-auto shadow-lg`}>
            {course.icon}
          </div>
          <div>
            <h1 className="font-black text-2xl text-slate-900 dark:text-white">{course.title}</h1>
            <p className="text-slate-500 dark:text-slate-400 text-sm mt-1">Full FAA-Style Practice Test</p>
          </div>
          <div className="grid grid-cols-3 gap-3">
            {[
              { label: 'Questions', value: questions.length, icon: '📝' },
              { label: 'Time Limit', value: `${course.testConfig.timeLimit}m`, icon: '⏱️' },
              { label: 'Pass Score', value: `${course.testConfig.passingScore}%`, icon: '🎯' },
            ].map((stat) => (
              <div key={stat.label} className="bg-white dark:bg-slate-800 rounded-xl p-3 border border-slate-100 dark:border-slate-700">
                <p className="text-2xl">{stat.icon}</p>
                <p className="font-black text-lg text-slate-900 dark:text-white mt-1">{stat.value}</p>
                <p className="text-xs text-slate-500">{stat.label}</p>
              </div>
            ))}
          </div>
          <div className="bg-amber-50 dark:bg-amber-900/20 rounded-xl p-3 border border-amber-200 dark:border-amber-700 text-left">
            <p className="text-amber-800 dark:text-amber-200 text-xs font-medium">
              💡 No immediate feedback during the test. Review all answers at the end.
            </p>
          </div>
          <Button
            onClick={() => { setStarted(true); test.startTimer() }}
            variant="primary" fullWidth size="lg"
          >
            Start Test ✈️
          </Button>
        </motion.div>
      </Layout>
    )
  }

  // Results screen
  if (test.completed && resultRef.current) {
    const r = resultRef.current
    const passed = r.score >= course.testConfig.passingScore

    if (!reviewMode) {
      return (
        <Layout title="Test Results" hideNav>
          <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="space-y-5 py-4">
            <div className="text-center">
              <div className="text-6xl mb-3">{passed ? '🎉' : '📖'}</div>
              <h2 className="font-black text-3xl text-slate-900 dark:text-white">
                {passed ? 'You Passed!' : 'Keep Studying'}
              </h2>
              <p className="text-slate-500 mt-1">{course.shortTitle} Practice Test</p>
            </div>

            <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-100 dark:border-slate-700 p-5 text-center">
              <p className={`text-6xl font-black ${passed ? 'text-green-500' : 'text-red-500'}`}>{r.score}%</p>
              <p className="text-slate-500 text-sm mt-1">{r.correctCount} of {r.totalCount} correct</p>
              <div className={`inline-flex items-center gap-1.5 mt-2 px-3 py-1 rounded-full text-sm font-bold ${passed ? 'bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-300' : 'bg-red-100 text-red-700 dark:bg-red-900/40 dark:text-red-300'}`}>
                {passed ? '✓ PASS' : '✗ FAIL'} · Time: {formatTime(r.timeTaken)}
              </div>
            </div>

            {/* Topic breakdown */}
            <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-100 dark:border-slate-700 p-4">
              <h3 className="font-bold text-slate-900 dark:text-white text-sm mb-3">Score by Topic</h3>
              <div className="space-y-2.5">
                {Object.entries(r.topicBreakdown).sort((a, b) => (a[1].correct / a[1].total) - (b[1].correct / b[1].total)).map(([topic, { correct, total }]) => {
                  const pct = Math.round((correct / total) * 100)
                  return (
                    <div key={topic}>
                      <div className="flex justify-between text-xs mb-1">
                        <span className="text-slate-600 dark:text-slate-300 font-medium">{topic}</span>
                        <span className={`font-bold ${scoreToColor(pct)}`}>{correct}/{total}</span>
                      </div>
                      <div className="h-1.5 bg-slate-100 dark:bg-slate-700 rounded-full overflow-hidden">
                        <div className={`h-full rounded-full ${pct >= 80 ? 'bg-green-500' : pct >= 70 ? 'bg-amber-500' : 'bg-red-500'}`} style={{ width: `${pct}%` }} />
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>

            <div className="space-y-2">
              <Button onClick={() => setReviewMode(true)} variant="secondary" fullWidth>
                Review All Questions
              </Button>
              <Button onClick={() => navigate(`/courses/${course.id}`)} variant="primary" fullWidth>
                Back to Course
              </Button>
            </div>
          </motion.div>
        </Layout>
      )
    }

    // Review mode
    return (
      <Layout title="Review Answers" backPath="#" hideNav>
        <button onClick={() => setReviewMode(false)} className="mb-4 text-sky-500 text-sm font-semibold touch-manipulation">
          ← Back to Results
        </button>
        <div className="space-y-4">
          {questions.map((q, i) => {
            const selected = r.answers[i]
            const isCorrect = selected === q.correctAnswer
            return (
              <div key={q.id} className={`rounded-2xl border-2 p-4 ${isCorrect ? 'border-green-400 bg-green-50 dark:bg-green-900/10' : 'border-red-400 bg-red-50 dark:bg-red-900/10'}`}>
                <p className="text-xs font-medium text-slate-500 mb-1">Q{i + 1} · {q.topic}</p>
                <p className="font-semibold text-slate-900 dark:text-white text-sm mb-2">{q.text}</p>
                {q.options.map((opt, oi) => (
                  <p key={oi} className={`text-xs py-1 px-2 rounded-lg mb-1 ${oi === q.correctAnswer ? 'bg-green-200 dark:bg-green-800 text-green-800 dark:text-green-200 font-semibold' : selected === oi && !isCorrect ? 'bg-red-200 dark:bg-red-800 text-red-800 dark:text-red-200' : 'text-slate-600 dark:text-slate-400'}`}>
                    {oi === q.correctAnswer ? '✓ ' : selected === oi ? '✗ ' : '  '}{opt}
                  </p>
                ))}
                <p className="text-xs text-slate-600 dark:text-slate-400 mt-2 italic">{q.explanation}</p>
              </div>
            )
          })}
        </div>
      </Layout>
    )
  }

  // Test in progress
  const q = test.currentQuestion
  const selected = test.selectedAnswer

  return (
    <Layout title={`Q${test.currentIndex + 1}/${questions.length}`} hideNav>
      {/* Timer + progress */}
      <div className="flex items-center gap-3 mb-4">
        <div className="flex-1">
          <div className="h-2 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
            <div className={`h-2 rounded-full transition-all ${course.color}`} style={{ width: `${((test.currentIndex + 1) / questions.length) * 100}%` }} />
          </div>
        </div>
        <div className={`text-sm font-black tabular-nums ${test.timeLeft < 300 ? 'text-red-500' : 'text-slate-700 dark:text-slate-300'}`}>
          ⏱ {formatTime(test.timeLeft)}
        </div>
      </div>

      {/* Question answered counter */}
      <p className="text-xs text-slate-500 mb-3">{test.answeredCount} of {questions.length} answered</p>

      {/* Question */}
      <div className="bg-white dark:bg-slate-800 rounded-2xl p-4 mb-4 border border-slate-100 dark:border-slate-700">
        <p className="text-xs font-medium text-slate-500 mb-2">Question {test.currentIndex + 1} · {q.topic}</p>
        <p className="font-semibold text-slate-900 dark:text-white text-sm leading-snug">{q.text}</p>
      </div>

      {/* Options */}
      <div className="space-y-2.5 mb-4">
        {q.options.map((opt, i) => (
          <button
            key={i}
            onClick={() => test.selectAnswer(i)}
            className={`
              w-full text-left flex items-center gap-3 p-3.5 rounded-xl border-2 min-h-[52px]
              font-medium text-sm transition-all duration-150 touch-manipulation
              ${selected === i
                ? 'border-sky-500 bg-sky-50 dark:bg-sky-900/30 text-sky-700 dark:text-sky-300'
                : 'border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-800 hover:border-sky-300 active:scale-[0.98]'}
            `}
          >
            <span className={`flex-shrink-0 w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold ${selected === i ? 'bg-sky-500 text-white' : 'bg-slate-100 dark:bg-slate-700 text-slate-500'}`}>
              {['A','B','C','D'][i]}
            </span>
            <span className="leading-snug">{opt}</span>
          </button>
        ))}
      </div>

      {/* Navigation */}
      <div className="flex gap-2">
        <Button onClick={() => test.goTo(test.currentIndex - 1)} variant="secondary" size="sm" disabled={test.currentIndex === 0} className="flex-1">
          ←
        </Button>
        {test.currentIndex < questions.length - 1 ? (
          <Button onClick={() => test.goTo(test.currentIndex + 1)} variant="primary" size="sm" className="flex-1">
            Next →
          </Button>
        ) : (
          <Button onClick={test.submitTest} variant="success" size="sm" className="flex-1">
            Submit ✓
          </Button>
        )}
      </div>
    </Layout>
  )
}
