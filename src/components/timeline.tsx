'use client'

import { motion } from 'framer-motion'
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
  if (releases.length === 0) {
    return (
      <div className="text-center py-12 text-muted-foreground">
        <p className="text-sm">No release notes yet.</p>
      </div>
    )
  }

  return (
    <div className="space-y-10">
      {releases.map((release, i) => (
        <motion.div
          key={release.id}
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: i * 0.06, ease: [0.25, 0.1, 0.25, 1] }}
          className="relative pl-10 before:absolute before:left-[13px] before:top-4 before:h-full before:w-px before:bg-border last:before:hidden"
        >
          <div className="absolute left-0 top-2 h-7 w-7 rounded-full border-2 border-primary bg-background flex items-center justify-center">
            <div className="h-2.5 w-2.5 rounded-full bg-primary" />
          </div>
          <div className="space-y-2">
            <div className="flex items-center gap-3 flex-wrap">
              <span className="font-heading font-semibold text-sm">{release.version}</span>
              <span className="text-xs text-muted-foreground">{release.date}</span>
              {release.gameTitle && (
                <Badge variant="primary" className="text-xs">{release.gameTitle}</Badge>
              )}
            </div>
            <ul className="space-y-1.5">
              {release.changes.map((change, j) => {
                const config = typeConfig[change.type]
                return (
                  <li key={j} className="flex items-start gap-2 text-sm text-muted-foreground">
                    <Badge variant={config.variant} className="shrink-0 mt-0.5 text-[10px] px-1.5 py-0">
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
