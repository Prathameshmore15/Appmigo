'use client'

import { useState, useMemo } from 'react'
import { motion } from 'framer-motion'
import { Search, MessageCircleMore } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Accordion } from '@/components/ui/accordion'
import { faqs, faqCategories } from '@/data/faqs'
import Link from 'next/link'
import { AnimatedText } from '@/components/ui/animated-text'

export default function FAQPage() {
  const [query, setQuery] = useState('')
  const [category, setCategory] = useState('all')

  const filtered = useMemo(() => {
    const byCategory = category === 'all' ? faqs : faqs.filter(f => f.category.toLowerCase() === category.toLowerCase())
    if (!query) return byCategory
    const q = query.toLowerCase()
    return byCategory.filter(f =>
      f.question.toLowerCase().includes(q) || f.answer.toLowerCase().includes(q)
    )
  }, [query, category])

  return (
    <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}>
        <h1 className="font-heading text-4xl sm:text-5xl font-bold text-center tracking-tight">
          <AnimatedText text="Frequently Asked Questions" variant="typewriter" />
        </h1>
        <p className="mt-3 text-muted-foreground text-center max-w-lg mx-auto">Find answers to common questions about Appmigo games and services.</p>
      </motion.div>

      <div className="mt-10 relative max-w-md mx-auto">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
        <input
          value={query}
          onChange={e => setQuery(e.target.value)}
          placeholder="Search FAQs..."
          className="w-full h-12 pl-12 pr-4 rounded-xl border bg-card text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring transition-shadow duration-200"
        />
      </div>

      <div className="mt-8 flex items-center gap-2 overflow-x-auto pb-2">
        <Badge
          variant={category === 'all' ? 'primary' : 'default'}
          className="cursor-pointer select-none px-3 py-1.5 text-sm transition-all duration-200 hover:scale-105"
          onClick={() => setCategory('all')}
        >
          All
        </Badge>
        {faqCategories.map(cat => (
          <Badge
            key={cat}
            variant={category === cat.toLowerCase() ? 'primary' : 'default'}
            className="cursor-pointer select-none px-3 py-1.5 text-sm whitespace-nowrap transition-all duration-200 hover:scale-105"
            onClick={() => setCategory(cat.toLowerCase())}
          >
            {cat}
          </Badge>
        ))}
      </div>

      <div className="mt-10">
        {filtered.length > 0 ? (
          <Accordion
            items={filtered.map(faq => ({
              id: faq.id,
              title: faq.question,
              content: <div className="space-y-3"><p>{faq.answer}</p><Badge variant="primary" className="text-xs">{faq.category}</Badge></div>,
            }))}
          />
        ) : (
          <div className="text-center py-20">
            <div className="text-5xl mb-5 opacity-30 font-heading font-bold">?</div>
            <h2 className="font-heading text-xl font-semibold">No results found</h2>
            <p className="mt-1.5 text-sm text-muted-foreground">Try rephrasing your search or browse by category.</p>
            <Button variant="secondary" className="mt-6 cursor-pointer" onClick={() => { setQuery(''); setCategory('all') }}>
              Clear Filters
            </Button>
          </div>
        )}
      </div>

      <div className="mt-16 text-center p-10 rounded-2xl border bg-gradient-to-br from-primary/5 via-card to-accent/5">
        <div className="inline-flex items-center justify-center h-12 w-12 rounded-xl bg-primary/10 text-primary mb-4">
          <MessageCircleMore className="h-6 w-6" />
        </div>
        <h2 className="font-heading text-xl font-semibold">
          <AnimatedText text="Still need help?" variant="typewriter" />
        </h2>
        <p className="mt-2 text-sm text-muted-foreground max-w-sm mx-auto">Our support team is ready to assist you.</p>
        <div className="mt-6 flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link href="/support/ai">
            <Button className="cursor-pointer gap-2">
              <MessageCircleMore className="h-4 w-4" /> AI Chat
            </Button>
          </Link>
          <Link href="/support">
            <Button variant="secondary" className="cursor-pointer">Support Center</Button>
          </Link>
        </div>
      </div>
    </div>
  )
}
