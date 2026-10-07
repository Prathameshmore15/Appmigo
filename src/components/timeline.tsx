'use client'

import { motion, useReducedMotion } from 'framer-motion'
import { Badge } from '@/components/ui/badge'
import type { Release } from '@/data/releases'

interface TimelineProps {
  releases: Release[]
}

const typeConfig = {
  new: { label: 'New', variant: 'accent' as const },
  fixed: { label: 'Fixed', variant: 'destructive' as const },
  improved: { label: 'Improved', variant: 'info' as const },
}

export function Timeline({ releases }: TimelineProps) {
  const reduce = useReducedMotion()
  if (releases.length === 0) {
    return (
      <div className="py-12 text-center text-muted-foreground">
        <p className="text-sm">No release notes yet.</p>
      </div>
    )
  }

  return (
    <div className="relative space-y-8">
      <div className="absolute bottom-4 left-[13px] top-4 w-px bg-border" aria-hidden="true" />
      {releases.map((release, i) => (
        <motion.div
          key={release.id}
          initial={reduce ? false : { opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.4, delay: Math.min(i * 0.05, 0.2), ease: [0.25, 0.1, 0.25, 1] }}
          className="relative pl-10"
        >
          <div className="absolute left-0 top-1.5 flex h-7 w-7 items-center justify-center rounded-full border-2 border-primary bg-background">
            <div className="h-2.5 w-2.5 rounded-full bg-primary" />
          </div>
          <div className="rounded-xl border bg-card p-4 transition-colors hover:border-primary/25">
            <div className="flex flex-wrap items-center gap-2.5">
              <span className="font-heading text-sm font-semibold">v{release.version}</span>
              <span className="font-mono text-xs text-muted-foreground">{release.date}</span>
              {release.gameTitle && (
                <Badge variant="primary" className="text-xs">{release.gameTitle}</Badge>
              )}
            </div>
            <ul className="mt-3 space-y-1.5">
              {release.changes.map((change, j) => {
                const config = typeConfig[change.type]
                return (
                  <li key={j} className="flex items-start gap-2 text-sm text-muted-foreground">
                    <Badge variant={config.variant} className="mt-0.5 shrink-0 px-1.5 py-0 text-[10px]">
                      {config.label}
                    </Badge>
                    <span>{change.description}</span>
                  </li>
                )
              })}
            </ul>
          </div>
        </motion.div>
      ))}
    </div>
  )
}

export function StudioJourney() {
  const steps = [
    { year: '2026', title: 'Appmigo founded', text: 'One developer in Mumbai. Simple mobile experiences.' },
    { year: '2026', title: 'Speed Memory launched', text: '5 modes, offline play, brain-training for all ages.' },
    { year: '2026', title: 'Tile Debt in development', text: 'Strategic puzzle where every move has a cost.' },
    { year: 'Future', title: 'More games', text: 'Thoughtful mechanics, polished craft.' },
  ]
  return (
    <div className="relative space-y-8">
      <div className="absolute bottom-4 left-[13px] top-4 w-px bg-border" aria-hidden="true" />
      {steps.map((s, i) => (
        <motion.div
          key={s.title}
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.4, delay: Math.min(i * 0.06, 0.25) }}
          className="relative pl-10"
        >
          <div className="absolute left-0 top-1.5 flex h-7 w-7 items-center justify-center rounded-full border-2 border-primary bg-background">
            <div className="h-2.5 w-2.5 rounded-full bg-primary" />
          </div>
          <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-primary">{s.year}</p>
          <h3 className="mt-1 font-heading text-base font-semibold">{s.title}</h3>
          <p className="mt-1 text-sm text-muted-foreground">{s.text}</p>
        </motion.div>
      ))}
    </div>
  )
}
