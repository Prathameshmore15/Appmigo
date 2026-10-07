'use client'

import { useState } from 'react'
import { GameShowcaseCard } from '@/components/game/game-showcase-card'
import { Button } from '@/components/ui/button'
import { SectionHeading } from '@/components/ui/section-heading'
import { StaggerReveal, StaggerChild, ScrollReveal } from '@/components/motion/scroll-reveal'
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
    <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 sm:py-20 lg:px-8">
      <ScrollReveal>
        <SectionHeading
          eyebrow="Catalog"
          title="Our games"
          description="Explore our collection of Android games. Each title is crafted with care for the best mobile experience."
        />
      </ScrollReveal>

      <div className="mt-8 flex items-center gap-2">
        <Button
          variant={sort === 'popular' ? 'primary' : 'secondary'}
          size="sm"
          onClick={() => setSort('popular')}
          aria-pressed={sort === 'popular'}
          className="cursor-pointer transition-all duration-200 hover:scale-[1.03]"
        >
          <ArrowUpDown className="h-4 w-4" />
          Popular
        </Button>
        <Button
          variant={sort === 'alpha' ? 'primary' : 'secondary'}
          size="sm"
          onClick={() => setSort('alpha')}
          aria-pressed={sort === 'alpha'}
          className="cursor-pointer transition-all duration-200 hover:scale-[1.03]"
        >
          A-Z
        </Button>
      </div>

      {games.length === 0 ? (
        <div className="mt-16 py-20 text-center">
          <div className="mb-4 font-heading text-6xl font-bold opacity-30">🎮</div>
          <h2 className="font-heading text-xl font-semibold">No games published yet</h2>
          <p className="mt-1 text-muted-foreground">Check back soon for new releases!</p>
        </div>
      ) : (
        <StaggerReveal key={sort} className="mx-auto mt-10 grid max-w-6xl grid-cols-1 gap-6 lg:grid-cols-2">
          {sorted.map((game, i) => (
            <StaggerChild key={game.id}>
              <GameShowcaseCard game={game} index={i} />
            </StaggerChild>
          ))}
        </StaggerReveal>
      )}
    </div>
  )
}
