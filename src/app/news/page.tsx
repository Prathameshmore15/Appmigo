'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { Calendar, ArrowRight } from 'lucide-react'
import { newsArticles } from '@/data/news'
import { AnimatedText } from '@/components/ui/animated-text'
import { Badge } from '@/components/ui/badge'
import { formatDate } from '@/lib/utils'

const categoryColors = {
  announcement: 'primary',
  update: 'accent',
  milestone: 'default',
} as const

export default function NewsPage() {
  return (
    <div className="flex flex-col">
      {/* Hero */}
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
              <AnimatedText text="News & Updates" variant="typewriter" />
            </h1>
            <p className="mt-5 text-lg text-muted-foreground/80 max-w-md leading-relaxed">
              <AnimatedText text="Stay up to date with the latest from Appmigo." variant="wave" delay={500} />
            </p>
          </motion.div>
        </div>
      </section>

      {/* News Grid */}
      <section className="py-24 sm:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {newsArticles.map((article, i) => (
              <motion.div
                key={article.id}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
              >
                <Link href={`/news/${article.id}`} className="group block">
                  <article className="rounded-xl border bg-card p-6 h-full transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:border-primary/20">
                    <div className="flex items-center gap-2 mb-4">
                      <Badge variant={categoryColors[article.category]} className="text-xs">
                        {article.category}
                      </Badge>
                      <span className="flex items-center gap-1 text-xs text-muted-foreground">
                        <Calendar className="h-3 w-3" />
                        {formatDate(article.publishedAt)}
                      </span>
                    </div>
                    <h2 className="font-heading text-lg font-semibold mb-2 group-hover:text-primary transition-colors">
                      {article.title}
                    </h2>
                    <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                      {article.excerpt}
                    </p>
                    <span className="inline-flex items-center gap-1 text-sm font-medium text-primary">
                      Read more <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-1 transition-transform" />
                    </span>
                  </article>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
