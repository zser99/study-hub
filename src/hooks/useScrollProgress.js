import { useEffect, useState } from 'react'

export function useScrollProgress() {
  const [percent, setPercent] = useState(0)

  useEffect(() => {
    let frame = 0

    const measure = () => {
      frame = 0
      const scrollTop = window.scrollY
      const docHeight = document.documentElement.scrollHeight - window.innerHeight
      const next = docHeight > 0 ? Math.min(100, Math.max(0, (scrollTop / docHeight) * 100)) : 0
      setPercent((prev) => (prev === next ? prev : next))
    }

    // scroll 이벤트는 프레임당 여러 번 발생한다. rAF로 묶어 렌더를 프레임당 1회로 제한.
    const update = () => {
      if (frame) return
      frame = requestAnimationFrame(measure)
    }

    measure()
    window.addEventListener('scroll', update, { passive: true })
    window.addEventListener('resize', update)
    return () => {
      if (frame) cancelAnimationFrame(frame)
      window.removeEventListener('scroll', update)
      window.removeEventListener('resize', update)
    }
  }, [])

  return percent
}
