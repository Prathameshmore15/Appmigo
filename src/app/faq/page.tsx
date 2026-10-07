'use client'

import { useState, useMemo, Suspense } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Search, MessageCircleMore, X } from 'lucide-react'
import { useSearchParams } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Accordion } from '@/components/ui/accordion'
import { faqs, faqCategories } from '@/data/faqs'
import Link from 'next/link'

function FAQContent() {
  const searchParams = useSearchParams()
  const paramQ = searchParams.get('q') ?? ''
  const [query, setQuery] = useState(paramQ)
  const [category, setCategory] = useState('all')
  const [prevParamQ, setPrevParamQ] = useState(paramQ)

  // Sync with the ?q= param (e.g. arriving from command search) during
  // render — the React-endorsed alternative to an effect.
  if (paramQ !== prevParamQ) {
    setPrevParamQ(paramQ)
    setQuery(paramQ)
  }

  const filtered = useMemo(() => {
    const byCategory = category === 'all' ? faqs : faqs.filter(f => f.category.toLowerCase() === category.toLowerCase())
    if (!query) return byCategory
    const q = query.toLowerCase()
    return byCategory.filter(f =>
      f.question.toLowerCase().includes(q) || f.answer.toLowerCase().includes(q)
    )
  }, [query, category])

  return (
    <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 py-14 sm:py-20">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}>
        <p className="text-center font-mono text-[11px] font-medium uppercase tracking-[0.22em] text-primary">Help center</p>
        <h1 className="mt-3 font-heading text-4xl sm:text-5xl font-bold text-center tracking-tight">
          Frequently Asked Questions
        </h1>
        <p className="mt-3 text-muted-foreground text-center max-w-lg mx-auto">Find answers to common questions about Appmigo games and services.</p>
      </motion.div>

      <div className="mt-10 relative max-w-md mx-auto">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
        <label htmlFor="faq-search" className="sr-only">Search FAQs</label>
        <input
          id="faq-search"
          value={query}
          onChange={e => setQuery(e.target.value)}
          placeholder="Search FAQs…"
          className="w-full h-12 pl-12 pr-10 rounded-xl border bg-card text-sm shadow-sm transition-all placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:border-primary/50"
        />
        {query && (
          <button
            onClick={() => setQuery('')}
            aria-label="Clear search"
            className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer rounded p-1 text-muted-foreground hover:text-foreground"
          >
            <X className="h-4 w-4" />
          </button>
        )}
      </div>

      <div className="mt-6 flex items-center gap-2 overflow-x-auto pb-2" role="tablist" aria-label="Filter by category">
        <Badge
          variant={category === 'all' ? 'primary' : 'default'}
          className="cursor-pointer select-none px-3 py-1.5 text-sm transition-all duration-200 hover:scale-[1.03]"
          onClick={() => setCategory('all')}
        >
          All
        </Badge>
        {faqCategories.map(cat => (
          <Badge
            key={cat}
            variant={category === cat.toLowerCase() ? 'primary' : 'default'}
            className="cursor-pointer select-none px-3 py-1.5 text-sm whitespace-nowrap transition-all duration-200 hover:scale-[1.03]"
            onClick={() => setCategory(cat.toLowerCase())}
          >
            {cat}
          </Badge>
        ))}
      </div>

      <div className="mt-8">
        <p className="mb-4 font-mono text-xs text-muted-foreground" aria-live="polite">
          {filtered.length} result{filtered.length === 1 ? '' : 's'}
          {query && <> for &ldquo;{query}&rdquo;</>}
        </p>
        <AnimatePresence mode="wait">
          {filtered.length > 0 ? (
            <motion.div
              key={`${category}-${query}`}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.25 }}
            >
              <Accordion
                items={filtered.map(faq => ({
                  id: faq.id,
                  title: faq.question,
                  content: <div className="space-y-3"><p>{faq.answer}</p><Badge variant="primary" className="text-xs">{faq.category}</Badge></div>,
                }))}
              />
            </motion.div>
          ) : (
            <motion.div
              key="empty"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="text-center py-20"
            >
              <div className="text-5xl mb-5 opacity-30 font-heading font-bold">?</div>
              <h2 className="font-heading text-xl font-semibold">No results found</h2>
              <p className="mt-1.5 text-sm text-muted-foreground">Try rephrasing your search or browse by category.</p>
              <Button variant="secondary" className="mt-6 cursor-pointer" onClick={() => { setQuery(''); setCategory('all') }}>
                Clear Filters
              </Button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div className="mt-16 text-center p-8 sm:p-10 rounded-2xl border bg-gradient-to-br from-primary/5 via-card to-accent/5">
        <div className="inline-flex items-center justify-center h-12 w-12 rounded-xl bg-primary/10 text-primary mb-4">
          <MessageCircleMore className="h-6 w-6" />
        </div>
        <h2 className="font-heading text-xl font-semibold">
          Still need help?
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

export default function FAQPage() {
  return (
    <Suspense fallback={<div className="mx-auto max-w-3xl px-4 py-20 text-center text-sm text-muted-foreground">Loading FAQs…</div>}>
      <FAQContent />
    </Suspense>
  )
}
