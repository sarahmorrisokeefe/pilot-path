import { useState, useCallback, useRef } from 'react'
import type { Question } from '../types'

interface UseQuizOptions {
  questions: Question[]
  onComplete?: (results: QuizResults) => void
}

export interface QuizResults {
  answers: (number | null)[]
  correctCount: number
  totalCount: number
  score: number
  timeTaken: number // seconds
}

export function useQuiz({ questions, onComplete }: UseQuizOptions) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [answers, setAnswers] = useState<(number | null)[]>(
    Array(questions.length).fill(null)
  )
  const [showFeedback, setShowFeedback] = useState(false)
  const [completed, setCompleted] = useState(false)
  const startTimeRef = useRef(Date.now())

  const currentQuestion = questions[currentIndex]
  const selectedAnswer = answers[currentIndex]
  const isCorrect =
    selectedAnswer !== null &&
    selectedAnswer === currentQuestion?.correctAnswer

  const selectAnswer = useCallback(
    (answerIndex: number) => {
      if (showFeedback || completed) return
      setAnswers((prev) => {
        const next = [...prev]
        next[currentIndex] = answerIndex
        return next
      })
      setShowFeedback(true)
    },
    [currentIndex, showFeedback, completed]
  )

  const advance = useCallback(() => {
    if (!showFeedback) return

    if (currentIndex < questions.length - 1) {
      setCurrentIndex((i) => i + 1)
      setShowFeedback(false)
    } else {
      // Lesson complete
      const finalAnswers = answers.map((a, i) =>
        i === currentIndex ? answers[currentIndex] : a
      )
      const correctCount = finalAnswers.filter(
        (a, i) => a === questions[i].correctAnswer
      ).length
      const timeTaken = Math.round((Date.now() - startTimeRef.current) / 1000)
      const results: QuizResults = {
        answers: finalAnswers,
        correctCount,
        totalCount: questions.length,
        score: Math.round((correctCount / questions.length) * 100),
        timeTaken,
      }
      setCompleted(true)
      onComplete?.(results)
    }
  }, [currentIndex, questions, answers, showFeedback, onComplete])

  const reset = useCallback(() => {
    setCurrentIndex(0)
    setAnswers(Array(questions.length).fill(null))
    setShowFeedback(false)
    setCompleted(false)
    startTimeRef.current = Date.now()
  }, [questions.length])

  const progress = ((currentIndex + (showFeedback ? 1 : 0)) / questions.length) * 100

  return {
    currentIndex,
    currentQuestion,
    answers,
    selectedAnswer,
    showFeedback,
    completed,
    isCorrect,
    progress,
    selectAnswer,
    advance,
    reset,
  }
}

// ─── Practice Test Quiz Hook ──────────────────────────────────────────────────
// No immediate feedback — all questions answered, then review

interface UsePracticeTestOptions {
  questions: Question[]
  timeLimitSeconds: number
  onComplete?: (results: PracticeTestResults) => void
}

export interface PracticeTestResults {
  answers: (number | null)[]
  correctCount: number
  totalCount: number
  score: number
  timeTaken: number
  topicBreakdown: Record<string, { correct: number; total: number }>
}

export function usePracticeTest({
  questions,
  timeLimitSeconds,
  onComplete,
}: UsePracticeTestOptions) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [answers, setAnswers] = useState<(number | null)[]>(
    Array(questions.length).fill(null)
  )
  const [completed, setCompleted] = useState(false)
  const [timeLeft, setTimeLeft] = useState(timeLimitSeconds)
  const [results, setResults] = useState<PracticeTestResults | null>(null)
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null)
  const startTimeRef = useRef(Date.now())

  const startTimer = useCallback(() => {
    if (timerRef.current) return
    timerRef.current = setInterval(() => {
      setTimeLeft((t) => {
        if (t <= 1) {
          clearInterval(timerRef.current!)
          timerRef.current = null
          submitTest()
          return 0
        }
        return t - 1
      })
    }, 1000)
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  const stopTimer = useCallback(() => {
    if (timerRef.current) {
      clearInterval(timerRef.current)
      timerRef.current = null
    }
  }, [])

  const selectAnswer = useCallback(
    (answerIndex: number) => {
      if (completed) return
      setAnswers((prev) => {
        const next = [...prev]
        next[currentIndex] = answerIndex
        return next
      })
    },
    [currentIndex, completed]
  )

  const goTo = useCallback(
    (index: number) => {
      if (index >= 0 && index < questions.length) {
        setCurrentIndex(index)
      }
    },
    [questions.length]
  )

  const submitTest = useCallback(() => {
    stopTimer()
    setAnswers((finalAnswers) => {
      const correctCount = finalAnswers.filter(
        (a, i) => a === questions[i].correctAnswer
      ).length
      const timeTaken = Math.round((Date.now() - startTimeRef.current) / 1000)

      const topicBreakdown: Record<string, { correct: number; total: number }> = {}
      questions.forEach((q, i) => {
        const topic = q.topic
        if (!topicBreakdown[topic]) {
          topicBreakdown[topic] = { correct: 0, total: 0 }
        }
        topicBreakdown[topic].total++
        if (finalAnswers[i] === q.correctAnswer) {
          topicBreakdown[topic].correct++
        }
      })

      const r: PracticeTestResults = {
        answers: finalAnswers,
        correctCount,
        totalCount: questions.length,
        score: Math.round((correctCount / questions.length) * 100),
        timeTaken,
        topicBreakdown,
      }

      setResults(r)
      setCompleted(true)
      onComplete?.(r)
      return finalAnswers
    })
  }, [questions, stopTimer, onComplete])

  const currentQuestion = questions[currentIndex]
  const selectedAnswer = answers[currentIndex]
  const answeredCount = answers.filter((a) => a !== null).length

  return {
    currentIndex,
    currentQuestion,
    answers,
    selectedAnswer,
    completed,
    timeLeft,
    results,
    answeredCount,
    startTimer,
    stopTimer,
    selectAnswer,
    goTo,
    submitTest,
    setCurrentIndex,
  }
}
