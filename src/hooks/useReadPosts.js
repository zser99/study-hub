import { useState } from 'react'

const STORAGE_KEY = 'study-hub-read-posts'

function getInitial() {
  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    return stored ? new Set(JSON.parse(stored)) : new Set()
  } catch {
    return new Set()
  }
}

export function useReadPosts() {
  const [readIds, setReadIds] = useState(getInitial)

  const markRead = (id) => {
    setReadIds((prev) => {
      if (prev.has(id)) return prev
      const next = new Set(prev)
      next.add(id)
      localStorage.setItem(STORAGE_KEY, JSON.stringify([...next]))
      return next
    })
  }

  return [readIds, markRead]
}
