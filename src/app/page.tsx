'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowRight, ChevronRight, Calendar } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { GameCard } from '@/components/cards/game-card'
import { AnimatedText } from '@/components/ui/animated-text'
import { games } from '@/data/games'
import { company } from '@/data/company'
import { newsArticles } from '@/data/news'

const latestGames = games.slice(0, 4)
const latestNews = newsArticles.slice(0, 2)

export default function Home() {
  return (
    <div className="flex flex-col">
      {/* ── Hero ── */}
      <section className="relative overflow-hidden border-b">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/[0.03] via-transparent to-accent/[0.03]" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-24 sm:py-32">
          <motion.div
            initial={{ opacity: 0, y: 32 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="max-w-2xl"
          >
            <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tighter leading-[1.05]">
              <AnimatedText text="Simple Mobile" variant="typewriter" as="span" />
              <br />
              <AnimatedText text="Experiences" variant="typewriter" as="span" color="primary" />
            </h1>
            <p className="mt-5 text-lg text-muted-foreground/80 max-w-md leading-relaxed">
              <AnimatedText
                text="Appmigo creates mobile games that bring joy and mental stimulation to players worldwide."
                variant="wave"
                delay={500}
              />
            </p>
            <div className="mt-10 flex flex-wrap items-center gap-3">
              <Link href="/games">
                <Button size="lg" className="cursor-pointer gap-2">
                  View my games
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </Link>
              <Link href="/about">
                <Button variant="secondary" size="lg" className="cursor-pointer">
                  Learn more
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── Stats ── */}
      <section className="py-16 sm:py-20 bg-muted/50 border-y">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-px rounded-xl overflow-hidden border bg-border">
            {company.stats.map((stat) => (
              <div key={stat.label} className="bg-card p-8 text-center">
                <div className="font-heading text-3xl font-bold tracking-tight text-primary">{stat.value}</div>
                <div className="text-sm text-muted-foreground mt-1">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Games ── */}
      <section className="py-24 sm:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-end justify-between mb-12">
            <div>
              <p className="text-xs font-semibold text-primary tracking-widest uppercase mb-3">
                <AnimatedText text="My games" variant="typewriter" />
              </p>
              <h2 className="font-heading text-3xl sm:text-4xl font-bold tracking-tight">
                <AnimatedText text="Featured titles" variant="typewriter" />
              </h2>
            </div>
            <Link href="/games" className="hidden sm:flex items-center gap-1 text-sm font-medium text-primary hover:gap-2 transition-all">
              View all <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {latestGames.map((game, i) => (
              <GameCard key={game.id} game={game} index={i} />
            ))}
          </div>
          <div className="mt-8 text-center sm:hidden">
            <Link href="/games">
              <Button variant="secondary" className="cursor-pointer">
                View all games <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* ── News ── */}
      <section className="py-24 sm:py-28 bg-muted/50 border-y">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-end justify-between mb-12">
            <div>
              <p className="text-xs font-semibold text-primary tracking-widest uppercase mb-3">
                <AnimatedText text="News" variant="typewriter" />
              </p>
              <h2 className="font-heading text-3xl sm:text-4xl font-bold tracking-tight">
                <AnimatedText text="Latest updates" variant="typewriter" />
              </h2>
            </div>
            <Link href="/news" className="hidden sm:flex items-center gap-1 text-sm font-medium text-primary hover:gap-2 transition-all">
              View all <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {latestNews.map((article, i) => (
              <motion.div
                key={article.id}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
              >
                <Link href={`/news/${article.id}`} className="group block">
                  <article className="rounded-xl border bg-card p-6 h-full transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:border-primary/20">
                    <div className="flex items-center gap-2 mb-4">
                      <span className="flex items-center gap-1 text-xs text-muted-foreground">
                        <Calendar className="h-3 w-3" />
                        {new Date(article.publishedAt).toLocaleDateString()}
                      </span>
                    </div>
                    <h3 className="font-heading text-lg font-semibold mb-2 group-hover:text-primary transition-colors">
                      {article.title}
                    </h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {article.excerpt}
                    </p>
                  </article>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-20 sm:py-24">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-heading text-3xl sm:text-4xl font-bold tracking-tight">
            <AnimatedText text="Ready to play?" variant="typewriter" />
          </h2>
          <p className="mt-4 text-muted-foreground/80 max-w-md mx-auto">
            <AnimatedText text="Download my games and join players worldwide." variant="wave" />
          </p>
          <div className="mt-10">
            <Link href="/games">
              <Button size="lg" className="cursor-pointer gap-2">
                Browse games
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
