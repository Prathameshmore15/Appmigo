'use client'

import { useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { Timeline } from '@/components/timeline'
import { Badge } from '@/components/ui/badge'
import { SectionHeading } from '@/components/ui/section-heading'
import { releases, getReleasesByGame } from '@/data/releases'
import { games } from '@/data/games'

export default function ReleaseNotesPage() {
  const [filter, setFilter] = useState('all')
  const reduce = useReducedMotion()

  const filtered = filter === 'all' ? releases : getReleasesByGame(filter)

  return (
    <div className="mx-auto max-w-3xl px-4 py-14 sm:px-6 sm:py-20 lg:px-8">
      <motion.div
        initial={reduce ? false : { opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
      >
        <SectionHeading
          eyebrow="Changelog"
          title="Release notes"
          description="Stay up to date with the latest changes and improvements."
        />
      </motion.div>

      <div className="mt-8 flex items-center gap-2 overflow-x-auto pb-2" role="tablist" aria-label="Filter by game">
        <Badge
          variant={filter === 'all' ? 'primary' : 'default'}
          className="cursor-pointer select-none px-3 py-1.5 text-sm transition-transform hover:scale-[1.03]"
          onClick={() => setFilter('all')}
        >
          All
        </Badge>
        {games.map(g => (
          <Badge
            key={g.id}
            variant={filter === g.id ? 'primary' : 'default'}
            className="cursor-pointer select-none whitespace-nowrap px-3 py-1.5 text-sm transition-transform hover:scale-[1.03]"
            onClick={() => setFilter(g.id)}
          >
            {g.title}
          </Badge>
        ))}
      </div>

      <div className="mt-8">
        <Timeline releases={filtered} />
      </div>
    </div>
  )
}
