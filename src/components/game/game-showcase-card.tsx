'use client'

import { useRef, useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import Link from 'next/link'
import { Star } from 'lucide-react'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { TileDebtTeaser } from '@/components/game/tile-debt-teaser'
import type { Game } from '@/data/games'

function monogram(title: string): string {
  const words = title.split(' ').filter(Boolean)
  if (words.length >= 2) return (words[0][0] + words[1][0]).toUpperCase()
  return title.slice(0, 2).toUpperCase()
}

function GameVisual({ game }: { game: Game }) {
  const upcoming = game.status === 'upcoming'

  if (game.screenshots?.[0] && !upcoming) {
    return (
      <div className="relative aspect-video overflow-hidden">
        <img
          src={game.screenshots[0]}
          alt={`${game.title} screenshot`}
          loading="lazy"
          className="h-full w-full object-cover object-top transition-transform duration-500 ease-out group-hover:scale-[1.03]"
        />
        <div
          className="pointer-events-none absolute inset-0"
          style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.28), transparent 45%)' }}
          aria-hidden="true"
        />
      </div>
    )
  }

  if (upcoming) {
    return (
      <div className="bg-gradient-to-br from-accent/[0.08] via-card to-primary/[0.06] p-5 sm:p-6 dark:from-accent/[0.1] dark:to-primary/[0.08]">
        <TileDebtTeaser showHeader={false} />
      </div>
    )
  }

  return (
    <div className="relative flex aspect-video items-center justify-center overflow-hidden bg-gradient-to-br from-primary/20 via-accent/5 to-primary/5 dark:from-primary/30 dark:via-accent/10 dark:to-primary/10">
      <div
        className="absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{ background: 'radial-gradient(420px circle at 50% 0%, rgba(5,150,105,0.18), transparent 70%)' }}
        aria-hidden="true"
      />
      <img
        src={game.imageUrl}
        alt=""
        loading="lazy"
        className="h-20 w-auto opacity-90 transition-transform duration-500 ease-out group-hover:scale-105"
      />
    </div>
  )
}

export function GameShowcaseCard({ game, index = 0 }: { game: Game; index?: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const reduce = useReducedMotion()
  const [tilt, setTilt] = useState({ rx: 0, ry: 0 })
  const [hover, setHover] = useState(false)
  const upcoming = game.status === 'upcoming'

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
      transition={{ duration: 0.5, delay: Math.min(index * 0.08, 0.3), ease: [0.25, 0.1, 0.25, 1] }}
      onPointerMove={onMove}
      onPointerEnter={() => setHover(true)}
      onPointerLeave={() => {
        setHover(false)
        setTilt({ rx: 0, ry: 0 })
      }}
      style={{ perspective: 1000 }}
      className="h-full"
    >
      <motion.div
        animate={reduce ? {} : { rotateX: tilt.rx, rotateY: tilt.ry, y: hover ? -6 : 0 }}
        transition={{ duration: 0.25, ease: [0.25, 0.1, 0.25, 1] }}
        style={{ transformStyle: 'preserve-3d' }}
        className="h-full"
      >
        <Card className="group flex h-full flex-col overflow-hidden transition-[box-shadow,border-color] duration-300 hover:border-primary/30 hover:shadow-xl">
          <Link
            href={`/games/${game.id}`}
            aria-label={`View ${game.title} details`}
            className="block border-b border-border/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-ring"
          >
            <GameVisual game={game} />
          </Link>

          <div className="flex flex-1 flex-col p-6 sm:p-7">
            <div className="flex items-center gap-3.5">
              <span
                className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl font-heading text-sm font-bold"
                style={
                  upcoming
                    ? { background: 'rgba(184,134,11,0.12)', color: 'var(--color-accent)' }
                    : { background: 'rgba(5,150,105,0.1)', color: 'var(--color-primary)' }
                }
                aria-hidden="true"
              >
                {monogram(game.title)}
              </span>
              <div className="min-w-0">
                <Link
                  href={`/games/${game.id}`}
                  className="font-heading text-xl font-bold tracking-tight transition-colors hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                >
                  {game.title}
                </Link>
                <p className="truncate text-sm text-muted-foreground">{game.tagline}</p>
              </div>
            </div>

            <p className="mt-4 text-sm leading-relaxed text-muted-foreground">{game.description}</p>

            <ul className="mb-6 mt-5 space-y-2.5">
              {game.features.slice(0, 5).map((f) => (
                <li key={f} className="flex items-start gap-2.5 text-sm text-muted-foreground">
                  <span className="mt-[7px] h-1.5 w-1.5 shrink-0 rotate-45 bg-accent" aria-hidden="true" />
                  {f}
                </li>
              ))}
            </ul>

            <div className="mt-auto flex items-center justify-between gap-4 border-t border-border/60 pt-5">
              <div>
                {upcoming ? (
                  <>
                    <Badge variant="accent" className="text-xs">Coming Soon</Badge>
                    <p className="mt-1.5 font-mono text-[11px] uppercase tracking-[0.14em] text-muted-foreground">
                      In development
                    </p>
                  </>
                ) : (
                  <>
                    <span className="inline-flex items-center gap-1.5 text-sm">
                      <Star className="h-4 w-4 fill-warning text-warning" />
                      <span className="font-semibold">{game.rating}</span>
                      <span className="font-mono text-xs text-muted-foreground">· v{game.version}</span>
                    </span>
                    <p className="mt-1 font-mono text-[11px] uppercase tracking-[0.14em] text-muted-foreground">
                      {game.genre}
                    </p>
                  </>
                )}
              </div>
              {!upcoming && game.playStoreUrl && game.playStoreUrl !== '#' && (
                <a
                  href={game.playStoreUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Get ${game.title} on Google Play`}
                  className="shrink-0 transition-all duration-300 hover:-translate-y-px hover:brightness-110 hover:drop-shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                >
                  <img
                    src="/images/badges/google-play-badge.png"
                    alt="Get it on Google Play"
                    loading="lazy"
                    className="h-10 w-auto sm:h-11"
                  />
                </a>
              )}
            </div>
          </div>
        </Card>
      </motion.div>
    </motion.div>
  )
}
