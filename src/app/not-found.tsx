'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { Search, Home, Gamepad2, HelpCircle, MessageCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { AnimatedText } from '@/components/ui/animated-text'

export default function NotFound() {
  return (
    <div className="mx-auto max-w-lg px-4 sm:px-6 lg:px-8 py-20 text-center">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
        className="space-y-8"
      >
        <div className="text-9xl font-heading font-bold text-primary/15 tracking-tighter">404</div>
        <h1 className="font-heading text-4xl font-bold tracking-tight">
          <AnimatedText text="Page Not Found" variant="typewriter" />
        </h1>
        <p className="text-muted-foreground max-w-sm mx-auto">
          This page doesn't exist or has been moved. Try searching or browse our popular pages.
        </p>

        <div className="relative max-w-sm mx-auto">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
          <input
            placeholder="Search..."
            className="w-full h-12 pl-12 pr-4 rounded-xl border bg-card text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            readOnly
            onFocus={e => {
              e.target.blur()
              window.location.href = '/faq'
            }}
          />
        </div>

        <div className="flex flex-wrap items-center justify-center gap-3 pt-4">
          <Link href="/">
            <Button className="cursor-pointer">
              <Home className="h-4 w-4" /> Home
            </Button>
          </Link>
          <Link href="/games">
            <Button variant="secondary" className="cursor-pointer">
              <Gamepad2 className="h-4 w-4" /> Games
            </Button>
          </Link>
          <Link href="/faq">
            <Button variant="secondary" className="cursor-pointer">
              <HelpCircle className="h-4 w-4" /> FAQ
            </Button>
          </Link>
          <Link href="/support">
            <Button variant="secondary" className="cursor-pointer">
              <MessageCircle className="h-4 w-4" /> Support
            </Button>
          </Link>
        </div>
      </motion.div>
    </div>
  )
}
