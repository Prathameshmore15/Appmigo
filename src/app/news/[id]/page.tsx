'use client'

import Link from 'next/link'
import { useParams } from 'next/navigation'
import { motion } from 'framer-motion'
import { Calendar, ArrowLeft } from 'lucide-react'
import { newsArticles } from '@/data/news'
import { AnimatedText } from '@/components/ui/animated-text'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { formatDate } from '@/lib/utils'

const categoryColors = {
  announcement: 'primary',
  update: 'accent',
  milestone: 'default',
} as const

export default function NewsArticlePage() {
  const params = useParams()
  const article = newsArticles.find(a => a.id === params.id)

  if (!article) {
    return (
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-24 text-center">
        <h1 className="font-heading text-2xl font-bold mb-4">Article not found</h1>
        <Link href="/news">
          <Button variant="secondary">Back to news</Button>
        </Link>
      </div>
    )
  }

  return (
    <div className="flex flex-col">
      {/* Hero */}
      <section className="relative overflow-hidden border-b">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/[0.03] via-transparent to-accent/[0.03]" />
        <div className="relative mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-24 sm:py-32">
          <motion.div
            initial={{ opacity: 0, y: 32 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <Link href="/news" className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground mb-6">
              <ArrowLeft className="h-4 w-4" />
              Back to news
            </Link>
            <div className="flex items-center gap-2 mb-4">
              <Badge variant={categoryColors[article.category]} className="text-xs">
                {article.category}
              </Badge>
              <span className="flex items-center gap-1 text-xs text-muted-foreground">
                <Calendar className="h-3 w-3" />
                {formatDate(article.publishedAt)}
              </span>
            </div>
            <h1 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tighter leading-[1.05]">
              <AnimatedText text={article.title} variant="typewriter" />
            </h1>
          </motion.div>
        </div>
      </section>

      {/* Content */}
      <section className="py-16 sm:py-20">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="prose prose-gray dark:prose-invert max-w-none"
          >
            <p className="text-lg text-muted-foreground leading-relaxed">
              {article.content}
            </p>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
