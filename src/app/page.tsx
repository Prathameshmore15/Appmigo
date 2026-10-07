'use client'

import Link from 'next/link'
import { motion, useReducedMotion } from 'framer-motion'
import { ArrowRight, ChevronRight, Calendar, Star, ExternalLink, LifeBuoy, MessageCircleMore, HelpCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { GameCard } from '@/components/cards/game-card'
import { ScrollReveal, StaggerReveal, StaggerChild } from '@/components/motion/scroll-reveal'
import { AnimatedCounter } from '@/components/motion/animated-counter'
import { SectionHeading } from '@/components/ui/section-heading'
import { InteractiveGamePreview } from '@/components/game/interactive-game-preview'
import { TileDebtTeaser } from '@/components/game/tile-debt-teaser'
import { StudioJourney } from '@/components/timeline'
import { games, getGameBySlug } from '@/data/games'
import { company } from '@/data/company'
import { newsArticles } from '@/data/news'
import { formatDate } from '@/lib/utils'

const featured = getGameBySlug('speed-memory') ?? games[0]
const upcoming = getGameBySlug('tile-debt')

const statValues: Record<string, { n: number; decimals?: number; suffix?: string }> = {
  Downloads: { n: 100, suffix: '+' },
  Developer: { n: 1 },
  'Games Published': { n: 2 },
  'Avg. Rating': { n: 4.5, decimals: 1 },
}

function HeroBackdrop() {
  const reduce = useReducedMotion()
  if (reduce) {
    return (
      <div className="absolute inset-0" aria-hidden="true">
        <div className="hero-grid absolute inset-0 opacity-70" />
      </div>
    )
  }
  return (
    <div className="absolute inset-0" aria-hidden="true">
      <div className="hero-grid hero-fade-mask absolute inset-0" />
      <div className="hero-atmosphere absolute inset-0" />
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.2 }}
        className="absolute inset-0"
      >
        <div className="float-slow absolute left-[8%] top-[22%] hidden h-10 w-10 rounded-lg border border-primary/25 bg-primary/[0.07] sm:block" style={{ ['--float-rot' as string]: '-8deg' }} />
        <div className="float-slow absolute right-[12%] top-[18%] hidden h-14 w-14 rounded-xl border border-border bg-card/60 sm:block" style={{ ['--float-rot' as string]: '6deg', animationDelay: '-2s' }} />
        <div className="float-slow absolute bottom-[24%] left-[14%] hidden h-6 w-6 rotate-45 border border-accent/30 bg-accent/[0.08] lg:block" style={{ animationDelay: '-4s' }} />
        <div className="float-slow absolute bottom-[30%] right-[20%] hidden h-8 w-8 rounded-md border border-primary/20 bg-muted/50 lg:block" style={{ ['--float-rot' as string]: '12deg', animationDelay: '-1s' }} />
        <div className="absolute left-[22%] top-[64%] hidden h-1.5 w-1.5 rotate-45 bg-primary/40 md:block" />
        <div className="absolute right-[28%] top-[58%] hidden h-1.5 w-1.5 rotate-45 bg-accent/50 md:block" />
      </motion.div>
    </div>
  )
}

export default function Home() {
  return (
    <div className="flex flex-col">
      {/* ── 1. Hero ── */}
      <section className="relative overflow-hidden border-b">
        <HeroBackdrop />
        <div className="relative mx-auto max-w-7xl px-4 py-20 sm:px-6 sm:py-28 lg:px-8">
          <div className="max-w-2xl">
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <p className="inline-flex items-center gap-2 rounded-full border bg-card/70 px-3 py-1 font-mono text-[11px] font-medium uppercase tracking-[0.2em] text-muted-foreground backdrop-blur">
                <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-primary" />
                Appmigo · Indie Android studio
              </p>
            </motion.div>
            <h1 className="mt-6 font-heading text-[2.75rem] font-bold leading-[1.02] tracking-tighter sm:text-6xl lg:text-[4.25rem]">
              <motion.span
                className="block"
                initial={{ opacity: 0, y: 26 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              >
                Simple Mobile
              </motion.span>
              <motion.span
                className="block text-primary"
                initial={{ opacity: 0, y: 26 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.22, ease: [0.16, 1, 0.3, 1] }}
              >
                Experiences.
              </motion.span>
            </h1>
            <motion.p
              className="mt-5 max-w-md text-lg leading-relaxed text-muted-foreground"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.36 }}
            >
              Games designed to challenge your mind and keep you coming back.
            </motion.p>
            <motion.div
              className="mt-9 flex flex-wrap items-center gap-3"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.48 }}
            >
              <Link href="/games">
                <Button size="lg" className="cursor-pointer gap-2">
                  Explore games
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </Link>
              <Link href="/about">
                <Button variant="secondary" size="lg" className="cursor-pointer">
                  About Appmigo
                </Button>
              </Link>
            </motion.div>
            <motion.div
              className="mt-8 flex flex-wrap items-center gap-x-5 gap-y-2 font-mono text-xs text-muted-foreground"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.62 }}
            >
              <span className="inline-flex items-center gap-1.5">
                <Star className="h-3.5 w-3.5 fill-warning text-warning" /> 4.5 rated
              </span>
              <span>Offline play</span>
              <span>Mumbai · India</span>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── Stats ── */}
      <section className="border-b bg-muted/50">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 gap-px overflow-hidden rounded-xl border bg-border lg:grid-cols-4">
            {company.stats.map((stat) => {
              const v = statValues[stat.label] ?? { n: Number(stat.value) || 0 }
              return (
                <div key={stat.label} className="bg-card p-6 text-center sm:p-8">
                  <div className="font-heading text-3xl font-bold tracking-tight text-primary">
                    <AnimatedCounter value={v.n} decimals={v.decimals ?? 0} suffix={v.suffix ?? ''} />
                  </div>
                  <div className="mt-1 text-sm text-muted-foreground">{stat.label}</div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* ── 2. Featured game ── */}
      <section className="py-20 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <SectionHeading
              eyebrow="Featured game"
              title={featured.title}
              description={featured.description}
            />
          </ScrollReveal>
          <div className="mt-10 grid grid-cols-1 items-start gap-8 lg:grid-cols-2">
            <ScrollReveal delay={0.05}>
              <InteractiveGamePreview />
            </ScrollReveal>
            <ScrollReveal delay={0.12}>
              <div className="rounded-xl border bg-card p-6 sm:p-8">
                <div className="flex flex-wrap items-center gap-2">
                  <Badge variant="primary">{featured.genre}</Badge>
                  <span className="inline-flex items-center gap-1 text-sm">
                    <Star className="h-4 w-4 fill-warning text-warning" />
                    <span className="font-medium">{featured.rating}</span>
                  </span>
                  <span className="font-mono text-xs text-muted-foreground">v{featured.version}</span>
                  <span className="font-mono text-xs text-muted-foreground">· {featured.releaseDate}</span>
                </div>
                <div className="mt-5 flex flex-wrap gap-2">
                  {featured.features.slice(0, 6).map((f) => (
                    <span key={f} className="rounded-full border bg-muted/60 px-3 py-1 text-xs text-muted-foreground">
                      {f}
                    </span>
                  ))}
                </div>
                <div className="mt-7 flex flex-wrap gap-3">
                  <a href={featured.playStoreUrl} target="_blank" rel="noopener noreferrer">
                    <Button size="lg" className="cursor-pointer gap-2">
                      <ExternalLink className="h-4 w-4" /> Play on Google Play
                    </Button>
                  </a>
                  <Link href={`/games/${featured.id}`}>
                    <Button variant="secondary" size="lg" className="cursor-pointer">
                      Game details
                    </Button>
                  </Link>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* ── 3. Games worth playing ── */}
      <section className="border-y bg-muted/50 py-20 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-10 flex items-end justify-between gap-4">
            <SectionHeading
              eyebrow="Catalog"
              title="Games worth playing"
              description="Small catalog. Each title crafted for the best mobile experience."
            />
            <Link href="/games" className="link-underline hidden shrink-0 items-center gap-1 text-sm font-medium text-primary sm:inline-flex">
              View all <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>
          <StaggerReveal className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {games.slice(0, 4).map((game, i) => (
              <StaggerChild key={game.id}>
                <GameCard game={game} index={i} />
              </StaggerChild>
            ))}
          </StaggerReveal>
        </div>
      </section>

      {/* ── 4. Currently building ── */}
      {upcoming && (
        <section className="py-20 sm:py-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-2">
              <ScrollReveal>
                <SectionHeading
                  eyebrow="Currently building"
                  title={upcoming.title}
                  description="Strategic casual puzzle where you clear tiles to pay off liabilities before the board fills up."
                />
                <div className="mt-6 flex flex-wrap gap-3">
                  <Link href={`/games/${upcoming.id}`}>
                    <Button variant="secondary" className="cursor-pointer gap-2">
                      Follow development <ArrowRight className="h-4 w-4" />
                    </Button>
                  </Link>
                  <Link href="/release-notes">
                    <Button variant="ghost" className="cursor-pointer">
                      Release notes
                    </Button>
                  </Link>
                </div>
              </ScrollReveal>
              <ScrollReveal delay={0.1}>
                <TileDebtTeaser />
              </ScrollReveal>
            </div>
          </div>
        </section>
      )}

      {/* ── 5. Why Appmigo ── */}
      <section className="border-y bg-muted/50 py-20 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <SectionHeading
              align="center"
              eyebrow="Why Appmigo"
              title="Player-first, quality-obsessed"
              description="Thoughtful game design with seamless mechanics — built to challenge the mind and delight players."
            />
          </ScrollReveal>
          <StaggerReveal className="mx-auto mt-12 grid max-w-5xl grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {company.values.map((v) => (
              <StaggerChild key={v.title}>
                <div className="h-full rounded-xl border bg-card p-6 transition-all duration-300 hover:-translate-y-1 hover:border-primary/25 hover:shadow-lg">
                  <h3 className="font-heading text-base font-semibold">{v.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{v.description}</p>
                </div>
              </StaggerChild>
            ))}
          </StaggerReveal>
        </div>
      </section>

      {/* ── 6. Studio journey ── */}
      <section className="py-20 sm:py-24">
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-10 px-4 sm:px-6 lg:grid-cols-2 lg:px-8">
          <ScrollReveal>
            <SectionHeading
              eyebrow="Studio journey"
              title="One developer, serious craftsmanship"
              description="Founded in 2026 in Mumbai. Small scope, high polish — every release earns its place."
            />
            <Link href="/about" className="link-underline mt-6 inline-flex items-center gap-1 text-sm font-medium text-primary">
              More about Appmigo <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </ScrollReveal>
          <ScrollReveal delay={0.1}>
            <StudioJourney />
          </ScrollReveal>
        </div>
      </section>

      {/* ── News ── */}
      <section className="border-y bg-muted/50 py-20 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-10 flex items-end justify-between gap-4">
            <SectionHeading eyebrow="News" title="Latest updates" />
            <Link href="/news" className="link-underline hidden shrink-0 items-center gap-1 text-sm font-medium text-primary sm:inline-flex">
              View all <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {newsArticles.slice(0, 2).map((article) => (
              <ScrollReveal key={article.id}>
                <Link href={`/news/${article.id}`} className="group block h-full">
                  <article className="h-full rounded-xl border bg-card p-6 transition-all duration-300 hover:-translate-y-1 hover:border-primary/20 hover:shadow-lg">
                    <div className="mb-4 flex items-center gap-2">
                      <span className="flex items-center gap-1 font-mono text-xs text-muted-foreground">
                        <Calendar className="h-3 w-3" />
                        {formatDate(article.publishedAt)}
                      </span>
                    </div>
                    <h3 className="font-heading text-lg font-semibold transition-colors group-hover:text-primary">
                      {article.title}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                      {article.excerpt}
                    </p>
                  </article>
                </Link>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── 7. Support preview ── */}
      <section className="py-20 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <SectionHeading
              align="center"
              eyebrow="Support"
              title="How can we help?"
              description="Instant answers, bug reports, and human help within 24 hours."
            />
          </ScrollReveal>
          <StaggerReveal className="mx-auto mt-10 grid max-w-4xl grid-cols-1 gap-4 sm:grid-cols-3">
            {[
              { icon: MessageCircleMore, title: 'AI support', text: 'Instant answers 24/7', href: '/support/ai' },
              { icon: HelpCircle, title: 'FAQ', text: 'Common questions', href: '/faq' },
              { icon: LifeBuoy, title: 'Support center', text: 'Bugs, contact, notes', href: '/support' },
            ].map((c) => (
              <StaggerChild key={c.title}>
                <Link href={c.href} className="group flex h-full items-center gap-4 rounded-xl border bg-card p-5 transition-all duration-300 hover:-translate-y-1 hover:border-primary/25 hover:shadow-lg">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                    <c.icon className="h-5 w-5" />
                  </span>
                  <span>
                    <span className="block font-heading text-sm font-semibold">{c.title}</span>
                    <span className="block text-sm text-muted-foreground">{c.text}</span>
                  </span>
                  <ArrowRight className="ml-auto h-4 w-4 shrink-0 text-muted-foreground transition-all group-hover:translate-x-1 group-hover:text-primary" />
                </Link>
              </StaggerChild>
            ))}
          </StaggerReveal>

          <ScrollReveal className="mx-auto mt-14 max-w-3xl text-center">
            <h2 className="font-heading text-3xl font-bold tracking-tight sm:text-4xl">
              Ready to play?
            </h2>
            <p className="mx-auto mt-3 max-w-md text-muted-foreground">
              Download and join players training their brains worldwide.
            </p>
            <div className="mt-8">
              <Link href="/games">
                <Button size="lg" className="cursor-pointer gap-2">
                  Browse games
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </div>
  )
}
