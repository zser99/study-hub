import { useState } from 'react'

const STORAGE_KEY = 'study-hub-quiz-scores'

function getInitial() {
  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    return stored ? JSON.parse(stored) : {}
  } catch {
    return {}
  }
}

export function useQuizScores() {
  const [scores, setScores] = useState(getInitial)

  const saveScore = (series, score, total) => {
    setScores((prev) => {
      const prevBest = prev[series]?.best ?? 0
      const next = {
        ...prev,
        [series]: {
          score,
          total,
          best: Math.max(prevBest, score),
          at: Date.now(),
        },
      }
      localStorage.setItem(STORAGE_KEY, JSON.stringify(next))
      return next
    })
  }

  return [scores, saveScore]
}
