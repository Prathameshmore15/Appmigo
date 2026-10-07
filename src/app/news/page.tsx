'use client'

import Link from 'next/link'
import { motion, useReducedMotion } from 'framer-motion'
import { Calendar, ArrowRight } from 'lucide-react'
import { newsArticles } from '@/data/news'
import { SectionHeading } from '@/components/ui/section-heading'
import { StaggerReveal, StaggerChild } from '@/components/motion/scroll-reveal'
import { Badge } from '@/components/ui/badge'
import { formatDate } from '@/lib/utils'

const categoryColors = {
  announcement: 'primary',
  update: 'accent',
  milestone: 'default',
} as const

export default function NewsPage() {
  const reduce = useReducedMotion()
  return (
    <div className="flex flex-col">
      {/* Hero */}
      <section className="relative overflow-hidden border-b">
        <div className="hero-grid hero-fade-mask absolute inset-0" aria-hidden="true" />
        <div className="hero-atmosphere absolute inset-0" aria-hidden="true" />
        <div className="relative mx-auto max-w-7xl px-4 py-20 sm:px-6 sm:py-28 lg:px-8">
          <motion.div
            initial={reduce ? false : { opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-2xl"
          >
            <SectionHeading
              eyebrow="Newsroom"
              title="News & updates"
              description="Stay up to date with the latest from Appmigo."
            />
          </motion.div>
        </div>
      </section>

      {/* News Grid */}
      <section className="py-20 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <StaggerReveal className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {newsArticles.map((article) => (
              <StaggerChild key={article.id}>
                <Link href={`/news/${article.id}`} className="group block h-full">
                  <article className="h-full rounded-xl border bg-card p-6 transition-all duration-300 hover:-translate-y-1 hover:border-primary/20 hover:shadow-lg">
                    <div className="mb-4 flex items-center gap-2">
                      <Badge variant={categoryColors[article.category]} className="text-xs">
                        {article.category}
                      </Badge>
                      <span className="flex items-center gap-1 font-mono text-xs text-muted-foreground">
                        <Calendar className="h-3 w-3" />
                        {formatDate(article.publishedAt)}
                      </span>
                    </div>
                    <h2 className="font-heading text-lg font-semibold transition-colors group-hover:text-primary">
                      {article.title}
                    </h2>
                    <p className="mb-4 mt-2 text-sm leading-relaxed text-muted-foreground">
                      {article.excerpt}
                    </p>
                    <span className="inline-flex items-center gap-1 text-sm font-medium text-primary">
                      Read more <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                    </span>
                  </article>
                </Link>
              </StaggerChild>
            ))}
          </StaggerReveal>
        </div>
      </section>
    </div>
  )
}
