'use client'

import { useEffect, useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { cn } from '@/lib/utils'

const TILES = [0, 1, 2, 3, 4, 5, 6, 7, 8]

function DebtBox({ debt }: { debt: number }) {
  return (
    <div className="rounded-lg border bg-background px-3 py-2 text-right">
      <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
        Debt
      </p>
      <p
        className="font-mono text-2xl font-medium tabular-nums text-foreground"
        aria-live="polite"
      >
        {String(debt).padStart(3, '0')}
      </p>
    </div>
  )
}

export function TileDebtTeaser({ showHeader = true }: { showHeader?: boolean }) {
  const reduce = useReducedMotion()
  const [debt, setDebt] = useState(reduce ? 3 : 0)
  const [cleared, setCleared] = useState<number[]>(reduce ? [1, 4, 6] : [])

  useEffect(() => {
    if (reduce) return
    let d = 0
    const order = [4, 1, 6, 0, 7, 3]
    const id = window.setInterval(() => {
      if (d >= 6) {
        window.clearInterval(id)
        window.setTimeout(() => {
          setDebt(0)
          setCleared([])
        }, 2400)
        return
      }
      const next = order[d]
      setCleared((prev) => [...prev, next])
      d += 1
      setDebt(d)
    }, 900)
    return () => window.clearInterval(id)
  }, [reduce])

  return (
    <div className="relative overflow-hidden rounded-xl border bg-card p-5 sm:p-6">
      {showHeader ? (
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
              Currently building
            </p>
            <p className="mt-2 font-heading text-xl font-bold tracking-tight">
              Every move has a cost.
            </p>
            <p className="mt-1 text-sm text-muted-foreground">
              The board remembers.
            </p>
          </div>
          <DebtBox debt={debt} />
        </div>
      ) : (
        <div className="flex items-center justify-between gap-4">
          <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
            Live concept · debt counter
          </p>
          <DebtBox debt={debt} />
        </div>
      )}

      <div
        className="mt-5 grid grid-cols-3 gap-2"
        role="img"
        aria-label="Tile Debt teaser board animation"
      >
        {TILES.map((t) => {
          const gone = cleared.includes(t)
          return (
            <motion.div
              key={t}
              animate={{ opacity: gone ? 0.18 : 1, scale: gone ? 0.94 : 1 }}
              transition={{ duration: 0.4 }}
              className={cn(
                'flex aspect-[16/10] items-center justify-center rounded-lg border font-mono text-xs',
                gone
                  ? 'border-border bg-muted/40 text-muted-foreground line-through'
                  : 'border-primary/25 bg-primary/[0.07] text-foreground'
              )}
            >
              {gone ? 'PAID' : `T-${t}`}
            </motion.div>
          )
        })}
      </div>

      {showHeader && (
        <p className="mt-4 inline-flex items-center gap-2 rounded-full bg-accent/10 px-3 py-1 font-mono text-[11px] font-medium uppercase tracking-[0.14em] text-accent">
          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-accent" />
          Coming soon
        </p>
      )}
    </div>
  )
}
