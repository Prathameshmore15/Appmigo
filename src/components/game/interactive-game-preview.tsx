'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { Zap } from 'lucide-react'
import { cn } from '@/lib/utils'

const SEQUENCE = [5, 1, 10, 6, 14, 3]
const GRID = 16

type Phase = 'idle' | 'show' | 'hide' | 'done'

export function InteractiveGamePreview({ compact = false }: { compact?: boolean }) {
  const reduce = useReducedMotion()
  const [phase, setPhase] = useState<Phase>(reduce ? 'done' : 'idle')
  const [step, setStep] = useState(0)
  const [combo, setCombo] = useState(reduce ? 3 : 0)
  const timers = useRef<number[]>([])

  const clear = useCallback(() => {
    timers.current.forEach((t) => window.clearTimeout(t))
    timers.current = []
  }, [])

  const play = useCallback(() => {
    clear()
    setPhase('show')
    setStep(0)
    setCombo(0)
    SEQUENCE.forEach((_, i) => {
      timers.current.push(
        window.setTimeout(() => setStep(i + 1), 500 + i * 450)
      )
    })
    timers.current.push(
      window.setTimeout(() => {
        setPhase('hide')
        setStep(0)
        setCombo(3)
        timers.current.push(window.setTimeout(() => setPhase('done'), 900))
      }, 500 + SEQUENCE.length * 450 + 300)
    )
  }, [clear])

  useEffect(() => {
    if (reduce) return
    // Autoplay on mount. State updates happen inside the timer callback,
    // keeping the effect body free of synchronous setState.
    const t = window.setTimeout(() => play(), 400)
    return () => {
      window.clearTimeout(t)
      clear()
    }
  }, [play, clear, reduce])

  const activeTile = phase === 'show' && step > 0 ? SEQUENCE[step - 1] : -1

  return (
    <div
      className={cn(
        'relative overflow-hidden rounded-xl border bg-card',
        compact ? 'p-4' : 'p-5 sm:p-6'
      )}
    >
      <div className="flex items-center justify-between">
        <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
          Live preview · 4×4
        </p>
        <span className="inline-flex items-center gap-1.5 rounded-full bg-primary/10 px-2.5 py-1 font-mono text-[11px] font-medium text-primary">
          <Zap className="h-3 w-3" />
          {phase === 'done' || phase === 'hide' ? `COMBO ×${combo || 3}` : 'WATCH'}
        </span>
      </div>

      <div
        className="mt-4 grid grid-cols-4 gap-2"
        role="img"
        aria-label="Simulated Speed Memory Challenge board"
      >
        {Array.from({ length: GRID }).map((_, i) => {
          const lit = i === activeTile
          const inSeq = phase !== 'idle' && SEQUENCE.slice(0, step).includes(i)
          return (
            <motion.div
              key={i}
              animate={
                lit
                  ? { scale: 1.06, opacity: 1 }
                  : { scale: 1, opacity: inSeq || phase === 'done' ? 0.95 : 0.55 }
              }
              transition={{ duration: 0.22 }}
              className={cn(
                'aspect-square rounded-lg border transition-colors',
                lit
                  ? 'border-primary bg-primary text-on-primary shadow-[0_0_18px_rgba(5,150,105,0.35)]'
                  : inSeq
                    ? 'border-primary/40 bg-primary/15'
                    : 'border-border bg-muted/60'
              )}
            />
          )
        })}
      </div>

      <div className="mt-4 flex items-center justify-between gap-3">
        <p className="text-sm font-medium" aria-live="polite">
          {phase === 'show' && 'Memorize the pattern…'}
          {phase === 'hide' && 'Your turn — pattern hidden'}
          {phase === 'done' && (
            <span className="text-primary">PERFECT! Memory streak +1</span>
          )}
          {phase === 'idle' && 'Tap replay to watch'}
        </p>
        <button
          onClick={play}
          className="shrink-0 rounded-md border px-3 py-1.5 font-mono text-xs text-muted-foreground transition-colors hover:border-primary/40 hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        >
          REPLAY
        </button>
      </div>
    </div>
  )
}
