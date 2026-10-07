'use client'

import Link from 'next/link'
import { motion, useReducedMotion } from 'framer-motion'
import { MessageCircleMore, HelpCircle, BugPlay, Mail, Clock, Newspaper, ArrowRight, Search } from 'lucide-react'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { SectionHeading } from '@/components/ui/section-heading'
import { StaggerReveal, StaggerChild } from '@/components/motion/scroll-reveal'

const supportOptions = [
  { icon: MessageCircleMore, title: 'AI Support', description: 'Instant answers 24/7 with our assistant.', href: '/support/ai', cta: 'Chat now' },
  { icon: HelpCircle, title: 'FAQ', description: 'Answers to common questions.', href: '/faq', cta: 'Browse FAQ' },
  { icon: BugPlay, title: 'Report a Bug', description: 'Detailed reports with device info.', href: '/support/bug-report', cta: 'Submit report' },
  { icon: Mail, title: 'Contact Us', description: 'We respond within 24 hours.', href: '/contact', cta: 'Contact form' },
  { icon: Clock, title: 'Account Help', description: 'Manage data and deletion.', href: '/account-deletion', cta: 'Account help' },
  { icon: Newspaper, title: 'Release Notes', description: 'Latest game updates.', href: '/release-notes', cta: 'View notes' },
]

export default function SupportPage() {
  const [q, setQ] = useState('')
  const router = useRouter()
  const reduce = useReducedMotion()

  return (
    <div className="mx-auto max-w-5xl px-4 py-14 sm:px-6 sm:py-20 lg:px-8">
      <motion.div
        initial={reduce ? false : { opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mx-auto mb-10 max-w-2xl text-center"
      >
        <SectionHeading
          align="center"
          eyebrow="Support center"
          title="How can we help?"
          description="Choose the option that fits. Self-serve in seconds, human help within 24 hours."
        />
        <form
          className="relative mx-auto mt-8 max-w-md"
          onSubmit={(e) => {
            e.preventDefault()
            router.push(q ? `/faq?q=${encodeURIComponent(q)}` : '/faq')
          }}
          role="search"
        >
          <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search help articles…"
            aria-label="Search help articles"
            className="h-12 w-full rounded-xl border bg-card pl-12 pr-4 text-sm shadow-sm transition-all placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-1"
          />
        </form>
      </motion.div>

      <StaggerReveal className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {supportOptions.map((opt) => (
          <StaggerChild key={opt.title}>
            <Link
              href={opt.href}
              className="group flex h-full flex-col rounded-xl border bg-card p-6 transition-all duration-300 hover:-translate-y-1 hover:border-primary/25 hover:shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              <span className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-primary transition-transform duration-300 group-hover:scale-105">
                <opt.icon className="h-5 w-5" />
              </span>
              <span className="font-heading text-base font-semibold">{opt.title}</span>
              <span className="mt-1.5 flex-1 text-sm leading-relaxed text-muted-foreground">{opt.description}</span>
              <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-primary">
                {opt.cta}
                <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1" />
              </span>
            </Link>
          </StaggerChild>
        ))}
      </StaggerReveal>

      <p className="mt-10 text-center font-mono text-xs text-muted-foreground">
        Prefer email? <a href="mailto:support@appmigo.com" className="text-primary hover:underline">support@appmigo.com</a>
      </p>
    </div>
  )
}
