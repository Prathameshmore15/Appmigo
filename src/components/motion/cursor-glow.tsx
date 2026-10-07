'use client'

import { useEffect } from 'react'

export function CursorGlow({ targetId = 'cursor-glow-root' }: { targetId?: string }) {
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    if (window.matchMedia('(pointer: coarse)').matches) return

    let raf = 0
    const onMove = (e: PointerEvent) => {
      cancelAnimationFrame(raf)
      raf = requestAnimationFrame(() => {
        const root = document.getElementById(targetId) ?? document.body
        root.style.setProperty('--mouse-x', `${e.clientX}px`)
        root.style.setProperty('--mouse-y', `${e.clientY}px`)
      })
    }
    window.addEventListener('pointermove', onMove, { passive: true })
    return () => {
      window.removeEventListener('pointermove', onMove)
      cancelAnimationFrame(raf)
    }
  }, [targetId])

  return null
}
