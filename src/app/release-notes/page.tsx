'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Timeline } from '@/components/timeline'
import { Badge } from '@/components/ui/badge'
import { releases, getReleasesByGame } from '@/data/releases'
import { games } from '@/data/games'

export default function ReleaseNotesPage() {
  const [filter, setFilter] = useState('all')

  const filtered = filter === 'all' ? releases : getReleasesByGame(filter)

  return (
    <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}>
        <h1 className="font-heading text-4xl sm:text-5xl font-bold tracking-tight">Release Notes</h1>
        <p className="mt-3 text-muted-foreground">Stay up to date with the latest changes and improvements.</p>
      </motion.div>

      <div className="mt-10 flex items-center gap-2 overflow-x-auto pb-2">
        <Badge
          variant={filter === 'all' ? 'primary' : 'default'}
          className="cursor-pointer select-none px-3 py-1.5 text-sm"
          onClick={() => setFilter('all')}
        >
          All
        </Badge>
        {games.map(g => (
          <Badge
            key={g.id}
            variant={filter === g.id ? 'primary' : 'default'}
            className="cursor-pointer select-none px-3 py-1.5 text-sm whitespace-nowrap"
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
