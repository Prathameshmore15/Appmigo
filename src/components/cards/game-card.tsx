'use client'

import { useRef, useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import Link from 'next/link'
import { Star, ArrowRight } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import type { Game } from '@/data/games'

export function GameCard({ game, index = 0 }: { game: Game; index?: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const reduce = useReducedMotion()
  const [tilt, setTilt] = useState({ rx: 0, ry: 0 })
  const [hover, setHover] = useState(false)

  const onMove = (e: React.PointerEvent) => {
    if (reduce || e.pointerType === 'touch') return
    const el = ref.current
    if (!el) return
    const r = el.getBoundingClientRect()
    const px = (e.clientX - r.left) / r.width - 0.5
    const py = (e.clientY - r.top) / r.height - 0.5
    setTilt({ rx: Math.max(-4, Math.min(4, -py * 6)), ry: Math.max(-5, Math.min(5, px * 8)) })
  }

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.5, delay: Math.min(index * 0.07, 0.3), ease: [0.25, 0.1, 0.25, 1] }}
      onPointerMove={onMove}
      onPointerEnter={() => setHover(true)}
      onPointerLeave={() => {
        setHover(false)
        setTilt({ rx: 0, ry: 0 })
      }}
      style={{ perspective: 900 }}
    >
      <Link href={`/games/${game.id}`} className="group block" aria-label={`View ${game.title}`}>
        <motion.div
          animate={reduce ? {} : { rotateX: tilt.rx, rotateY: tilt.ry, y: hover ? -6 : 0 }}
          transition={{ duration: 0.25, ease: [0.25, 0.1, 0.25, 1] }}
          style={{ transformStyle: 'preserve-3d' }}
        >
          <Card className="overflow-hidden transition-[box-shadow,border-color] duration-300 group-hover:border-primary/30 group-hover:shadow-xl">
            <div className="relative flex aspect-video items-center justify-center overflow-hidden bg-gradient-to-br from-primary/20 via-accent/5 to-primary/5 dark:from-primary/30 dark:via-accent/10 dark:to-primary/10">
              <div
                className="absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                style={{
                  background: 'radial-gradient(320px circle at 50% 0%, rgba(5,150,105,0.16), transparent 70%)',
                }}
              />
              <img
                src="/appmigo-icon.svg"
                alt=""
                loading="lazy"
                className="h-16 w-16 opacity-30 transition-all duration-500 ease-out group-hover:scale-110 group-hover:opacity-50"
              />
              {game.status === 'upcoming' && (
                <span className="absolute right-3 top-3 rounded-full bg-accent/15 px-2 py-0.5 font-mono text-[10px] font-medium uppercase tracking-wider text-accent">
                  Soon
                </span>
              )}
            </div>
            <CardContent className="space-y-3.5 p-5">
              <div className="flex items-start justify-between gap-2">
                <h3 className="font-heading text-base font-semibold leading-tight transition-colors duration-200 group-hover:text-primary">
                  {game.title}
                </h3>
                {game.status === 'upcoming' ? (
                  <Badge variant="accent" className="px-1.5 py-0 text-[10px]">Coming Soon</Badge>
                ) : (
                  <Badge variant="primary" className="px-1.5 py-0 text-[10px]">{game.genre}</Badge>
                )}
              </div>
              <p className="line-clamp-2 text-sm leading-relaxed text-muted-foreground/80">{game.description}</p>
              <div className="flex items-center justify-between pt-1">
                {game.status === 'upcoming' ? (
                  <span className="font-mono text-xs text-muted-foreground">IN DEVELOPMENT</span>
                ) : (
                  <div className="flex items-center gap-1 text-sm">
                    <Star className="h-3.5 w-3.5 fill-warning text-warning" />
                    <span className="text-xs font-medium">{game.rating}</span>
                    <span className="font-mono text-[11px] text-muted-foreground">· v{game.version}</span>
                  </div>
                )}
                <span className="flex items-center gap-1 text-xs font-medium text-primary transition-all duration-300 group-hover:gap-2">
                  View details <ArrowRight className="h-3 w-3 transition-transform duration-300 group-hover:translate-x-0.5" />
                </span>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </Link>
    </motion.div>
  )
}
