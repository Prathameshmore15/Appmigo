'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { Home, Gamepad2, HelpCircle, MessageCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'

export default function NotFound() {
  return (
    <div className="mx-auto max-w-lg px-4 sm:px-6 lg:px-8 py-20 text-center">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
        className="space-y-8"
      >
        <div className="font-heading text-9xl font-bold tracking-tighter text-primary/15">404</div>
        <div>
          <p className="font-mono text-[11px] font-medium uppercase tracking-[0.22em] text-primary">Lost</p>
          <h1 className="mt-2 font-heading text-4xl font-bold tracking-tight">
            Page not found
          </h1>
        </div>
        <p className="text-muted-foreground max-w-sm mx-auto">
          This page doesn&apos;t exist or has been moved. Try searching or browse our popular pages.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
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
