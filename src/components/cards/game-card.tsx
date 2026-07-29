'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { Star, ArrowRight } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import type { Game } from '@/data/games'

export function GameCard({ game, index = 0 }: { game: Game; index?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.07, ease: [0.25, 0.1, 0.25, 1] }}
    >
      <Link href={`/games/${game.id}`} className="group block">
        <Card className="overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1.5 hover:border-primary/20">
          <div className="aspect-video bg-gradient-to-br from-primary/20 via-accent/5 to-primary/5 dark:from-primary/30 dark:via-accent/10 dark:to-primary/10 flex items-center justify-center relative overflow-hidden">
            <img src="/appmigo-icon.svg" alt="" className="h-16 w-16 opacity-30 group-hover:scale-125 group-hover:opacity-50 transition-all duration-500 ease-out" />
          </div>
          <CardContent className="space-y-3.5 p-5">
            <div className="flex items-start justify-between gap-2">
              <h3 className="font-heading text-base font-semibold leading-tight group-hover:text-primary transition-colors duration-200">
                {game.title}
              </h3>
              {game.status === 'upcoming' ? (
                <Badge variant="accent" className="text-[10px] px-1.5 py-0">Coming Soon</Badge>
              ) : (
                <Badge variant="primary" className="text-[10px] px-1.5 py-0">{game.genre}</Badge>
              )}
            </div>
            <p className="text-sm text-muted-foreground/80 line-clamp-2 leading-relaxed">{game.description}</p>
            <div className="flex items-center justify-between pt-1">
              {game.status === 'upcoming' ? (
                <span className="text-xs text-muted-foreground">Coming Soon</span>
              ) : (
                <div className="flex items-center gap-1 text-sm">
                  <Star className="h-3.5 w-3.5 fill-warning text-warning" />
                  <span className="font-medium text-xs">{game.rating}</span>
                </div>
              )}
              <span className="text-xs font-medium text-primary opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center gap-0.5 group-hover:gap-1.5">
                View details <ArrowRight className="h-3 w-3" />
              </span>
            </div>
          </CardContent>
        </Card>
      </Link>
    </motion.div>
  )
}
