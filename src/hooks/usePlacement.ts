import { useState, useCallback } from 'react'
import { useStorage } from './useStorage'
import { placementQuestions, type PlacementQuestion } from '../data/placementTest'
import type { PlacementResult } from '../types'

const PLACEMENT_KEY = 'cadence_placement_done'

export function usePlacement() {
  const [done, setDone] = useStorage<boolean>(PLACEMENT_KEY, false)
  const [currentDifficulty, setCurrentDifficulty] = useState(3)
  const [asked, setAsked] = useState<string[]>([])
  const [correctCount, setCorrectCount] = useState(0)
  const [totalAsked, setTotalAsked] = useState(0)

  const getNextQuestion = useCallback((): PlacementQuestion | null => {
    const available = placementQuestions.filter(
      (q) => !asked.includes(q.id) && Math.abs(q.difficulty - currentDifficulty) <= 1
    )
    if (available.length === 0) {
      // Fall back to any unanswered question
      const fallback = placementQuestions.filter((q) => !asked.includes(q.id))
      if (fallback.length === 0) return null
      return fallback[Math.floor(Math.random() * fallback.length)]
    }
    // Prefer questions at current difficulty
    const exact = available.filter((q) => q.difficulty === currentDifficulty)
    const pool = exact.length > 0 ? exact : available
    return pool[Math.floor(Math.random() * pool.length)]
  }, [currentDifficulty, asked])

  const answerQuestion = useCallback((questionId: string, correct: boolean) => {
    setAsked((prev) => [...prev, questionId])
    setTotalAsked((n) => n + 1)
    if (correct) {
      setCorrectCount((n) => n + 1)
      setCurrentDifficulty((d) => Math.min(5, d + 1))
    } else {
      setCurrentDifficulty((d) => Math.max(1, d - 1))
    }
  }, [])

  const isComplete = totalAsked >= 10

  const getResult = useCallback((): PlacementResult => {
    const score = totalAsked > 0 ? Math.round((correctCount / totalAsked) * 100) : 0
    const courseMap = [30, 50, 70, 85]
    let recommended = 0
    for (let i = 0; i < courseMap.length; i++) {
      if (score > courseMap[i]) recommended = i + 1
    }
    return {
      completedAt: new Date().toISOString(),
      score,
      recommendedCourseIndex: recommended,
      skillLevel: Math.max(1, Math.min(5, Math.round(currentDifficulty))),
    }
  }, [correctCount, totalAsked, currentDifficulty])

  const completePlacement = useCallback(() => setDone(true), [setDone])
  const skipPlacement = useCallback(() => setDone(true), [setDone])

  return {
    placementDone: done,
    currentQuestion: getNextQuestion(),
    questionNumber: totalAsked + 1,
    isComplete,
    answerQuestion,
    getResult,
    completePlacement,
    skipPlacement,
  }
}
