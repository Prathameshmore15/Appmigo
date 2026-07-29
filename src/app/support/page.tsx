'use client'

import { motion } from 'framer-motion'
import { MessageCircleMore, HelpCircle, BugPlay, Mail, Clock, Newspaper } from 'lucide-react'
import { SupportCard } from '@/components/cards/support-card'
import { AnimatedText } from '@/components/ui/animated-text'

const supportOptions = [
  { icon: MessageCircleMore, title: 'AI Chat', description: 'Get instant answers 24/7 with our AI-powered support assistant.', href: '/support/ai', cta: 'Chat Now' },
  { icon: HelpCircle, title: 'FAQ', description: 'Browse frequently asked questions and find answers quickly.', href: '/faq', cta: 'Browse FAQ' },
  { icon: BugPlay, title: 'Bug Report', description: 'Submit a detailed bug report with screenshots and device info.', href: '/support/bug-report', cta: 'Submit Report' },
  { icon: Mail, title: 'Contact Us', description: 'Send us a message and we\'ll respond within 24 hours.', href: '/contact', cta: 'Contact Form' },
  { icon: Clock, title: 'Account Help', description: 'Manage your account and request data deletion.', href: '/account-deletion', cta: 'Account Help' },
  { icon: Newspaper, title: 'Release Notes', description: 'Stay up to date with the latest game updates.', href: '/release-notes', cta: 'View Notes' },
]

export default function SupportPage() {
  return (
    <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }} className="text-center mb-14">
        <h1 className="font-heading text-4xl sm:text-5xl font-bold tracking-tight">
          <AnimatedText text="How can we help you?" variant="typewriter" />
        </h1>
        <p className="mt-3 text-muted-foreground max-w-lg mx-auto">
          Choose the support option that best fits your needs. We're here to help.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {supportOptions.map((opt, i) => (
          <motion.div
            key={opt.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: i * 0.06, ease: [0.25, 0.1, 0.25, 1] }}
          >
            <SupportCard {...opt} />
          </motion.div>
        ))}
      </div>
    </div>
  )
}
