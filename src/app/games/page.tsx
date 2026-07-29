'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { GameCard } from '@/components/cards/game-card'
import { Button } from '@/components/ui/button'
import { games } from '@/data/games'
import { ArrowUpDown } from 'lucide-react'

export default function GamesPage() {
  const [sort, setSort] = useState<'newest' | 'popular' | 'alpha'>('popular')

  const sorted = [...games].sort((a, b) => {
    if (sort === 'popular') return b.rating - a.rating
    if (sort === 'alpha') return a.title.localeCompare(b.title)
    return 0
  })

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}>
        <h1 className="font-heading text-4xl sm:text-5xl font-bold tracking-tight">Our Games</h1>
        <p className="mt-3 text-muted-foreground max-w-xl">
          Explore our collection of Android games. Each title is crafted with care for the best mobile experience.
        </p>
      </motion.div>

      <div className="mt-10 flex items-center gap-2">
        <Button
          variant={sort === 'popular' ? 'primary' : 'secondary'}
          size="sm"
          onClick={() => setSort('popular')}
          className="cursor-pointer transition-all duration-200 hover:scale-105"
        >
          <ArrowUpDown className="h-4 w-4" />
          Popular
        </Button>
        <Button
          variant={sort === 'alpha' ? 'primary' : 'secondary'}
          size="sm"
          onClick={() => setSort('alpha')}
          className="cursor-pointer transition-all duration-200 hover:scale-105"
        >
          A-Z
        </Button>
      </div>

      {games.length === 0 ? (
        <div className="mt-16 text-center py-20">
          <div className="text-6xl mb-4 opacity-30 font-heading font-bold">🎮</div>
          <h2 className="font-heading text-xl font-semibold">No games published yet</h2>
          <p className="mt-1 text-muted-foreground">Check back soon for new releases!</p>
        </div>
      ) : (
        <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {sorted.map((game, i) => (
            <GameCard key={game.id} game={game} index={i} />
          ))}
        </div>
      )}
    </div>
  )
}
