'use client'

import { useEffect, useRef, useState } from 'react'
import { useInView, useReducedMotion } from 'framer-motion'

export function AnimatedCounter({
  value,
  decimals = 0,
  suffix = '',
  durationMs = 1200,
  className,
}: {
  value: number
  decimals?: number
  suffix?: string
  durationMs?: number
  className?: string
}) {
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true, margin: '-40px' })
  const reduce = useReducedMotion()
  const [display, setDisplay] = useState(0)
  const done = useRef(false)

  useEffect(() => {
    if (!inView || done.current) return
    done.current = true
    // Duration 0 when reduced motion is preferred: first frame snaps to value.
    const total = reduce ? 0 : durationMs
    const start = performance.now()
    let raf = 0
    const tick = (now: number) => {
      const t = total === 0 ? 1 : Math.min(1, (now - start) / total)
      const eased = 1 - Math.pow(1 - t, 3)
      setDisplay(value * eased)
      if (t < 1) raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [inView, value, durationMs, reduce])

  return (
    <span ref={ref} className={className}>
      {display.toFixed(decimals)}
      {suffix}
    </span>
  )
}
