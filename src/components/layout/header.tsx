'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { AnimatePresence, motion } from 'framer-motion'
import { Menu, Search, ChevronDown, MessageCircle, Bug, HelpCircle, FileText, Shield, Trash2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { ThemeToggle } from '@/components/theme-toggle'
import { SearchOverlay } from '@/components/search-overlay'
import { FlipFadeText } from '@/components/flip-fade-text'
import { cn } from '@/lib/utils'

const navItems = [
  { label: 'Games', href: '/games' },
  { label: 'About', href: '/about' },
  { label: 'News', href: '/news' },
  { label: 'Contact', href: '/contact' },
  {
    label: 'Support',
    href: '/support',
    children: [
      { label: 'AI Chat', href: '/support/ai', icon: MessageCircle },
      { label: 'Bug Report', href: '/support/bug-report', icon: Bug },
      { label: 'FAQ', href: '/faq', icon: HelpCircle },
    ],
  },
  {
    label: 'Legal',
    children: [
      { label: 'Privacy Policy', href: '/privacy-policy', icon: Shield },
      { label: 'Terms & Conditions', href: '/terms', icon: FileText },
      { label: 'Account Deletion', href: '/account-deletion', icon: Trash2 },
    ],
  },
]

export function Header() {
  const [searchOpen, setSearchOpen] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [openDropdown, setOpenDropdown] = useState<string | null>(null)
  const pathname = usePathname()

  return (
    <>
      <header className="sticky top-0 z-20 w-full border-b border-border/50 bg-background/70 backdrop-blur-xl supports-[backdrop-filter]:bg-background/70 dark:bg-[#0B0C10]/80 dark:shadow-[0_1px_30px_rgba(0,0,0,0.6)]">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, x: -12 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
          >
            <Link href="/" className="flex items-center gap-2.5 shrink-0 group">
              <img src="/appmigo-icon.svg" alt="Appmigo" className="h-10 w-10 transition-all duration-300 group-hover:scale-110 group-hover:drop-shadow-[0_0_8px_rgba(5,150,105,0.3)]" />
              <div className="hidden sm:block">
                <FlipFadeText
                  words={["APPMIGO", "APPMIGO", "APPMIGO", "APPMIGO"]}
                  interval={3000}
                  className="min-h-0"
                  textClassName="!text-lg !md:text-lg !font-heading !font-bold !tracking-tight !text-foreground !normal-case"
                  letterDuration={0.4}
                  staggerDelay={0.06}
                  exitStaggerDelay={0.03}
                />
              </div>
            </Link>
          </motion.div>

          <nav className="hidden lg:flex items-center gap-1" aria-label="Main navigation">
            {navItems.map(item => (
              <div
                key={item.label}
                className="relative"
                onMouseEnter={() => setOpenDropdown(item.label)}
                onMouseLeave={() => setOpenDropdown(null)}
              >
                {item.href ? (
                  <Link
                    href={item.href}
                    className={cn(
                      'inline-flex items-center gap-1 rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-muted dark:hover:bg-white/[0.06]',
                      pathname === item.href && 'text-primary'
                    )}
                  >
                    {item.label}
                    {item.children && <ChevronDown className={cn('h-3.5 w-3.5 transition-transform duration-200', openDropdown === item.label && 'rotate-180')} />}
                  </Link>
                ) : (
                  <button
                    className="inline-flex items-center gap-1 rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-muted dark:hover:bg-white/[0.06] cursor-pointer"
                    onClick={() => setOpenDropdown(openDropdown === item.label ? null : item.label)}
                  >
                    {item.label}
                    {item.children && <ChevronDown className={cn('h-3.5 w-3.5 transition-transform duration-200', openDropdown === item.label && 'rotate-180')} />}
                  </button>
                )}
                  <AnimatePresence>
                  {item.children && openDropdown === item.label && (
                    <motion.div
                      initial={{ opacity: 0, y: -4, scale: 0.97 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -4, scale: 0.97 }}
                      transition={{ duration: 0.15, ease: 'easeOut' }}
                      className="absolute top-full left-0 mt-2 w-56 rounded-xl border bg-card/95 backdrop-blur-xl shadow-xl py-2 z-20 dark:border-white/[0.06] dark:bg-[#14161C]/95"
                    >
                      <div className="absolute -top-1.5 left-4 h-3 w-3 rotate-45 border-l border-t bg-card/95 dark:border-white/[0.06] dark:bg-[#14161C]/95" />
                      <div className="py-1">
                        {item.children.map((child, idx) => (
                          <div key={child.label}>
                            {idx > 0 && <div className="mx-3 my-1 h-px bg-border/50 dark:bg-white/[0.06]" />}
                            <Link
                              href={child.href!}
                              className="flex items-center gap-3 rounded-lg mx-2 px-3 py-2.5 text-sm font-medium text-foreground/80 hover:text-foreground hover:bg-muted dark:hover:bg-white/[0.06] transition-colors"
                            >
                              {child.icon && (
                                <span className="flex h-7 w-7 items-center justify-center rounded-md bg-primary/10 text-primary">
                                  <child.icon className="h-4 w-4" />
                                </span>
                              )}
                              {child.label}
                            </Link>
                          </div>
                        ))}
                      </div>
                    </motion.div>
                  )}
                  </AnimatePresence>
              </div>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setSearchOpen(true)}
              aria-label="Search"
              className="cursor-pointer"
            >
              <Search className="h-5 w-5" />
            </Button>
            <kbd className="hidden lg:inline-flex items-center gap-1 rounded border bg-muted px-1.5 py-0.5 text-xs text-muted-foreground">
              ⌘K
            </kbd>
            <ThemeToggle />
            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden cursor-pointer"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle menu"
            >
              <Menu className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </header>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-30 lg:hidden">
          <div className="fixed inset-0 bg-black/50" onClick={() => setMobileMenuOpen(false)} />
          <nav className="fixed right-0 top-16 h-[calc(100vh-4rem)] w-72 border-l bg-card/95 backdrop-blur-xl p-4 overflow-y-auto dark:border-white/[0.06] dark:bg-[#0B0C10]/95" aria-label="Mobile navigation">
            <div className="space-y-1">
              {navItems.map(item => (
                <div key={item.label}>
                  {item.href ? (
                    <Link
                      href={item.href}
                      onClick={() => setMobileMenuOpen(false)}
                      className={cn(
                        'flex items-center rounded-md px-3 py-2.5 text-sm font-medium transition-colors hover:bg-muted dark:hover:bg-white/[0.06]',
                        pathname === item.href && 'text-primary'
                      )}
                    >
                      {item.label}
                    </Link>
                  ) : (
                    <div className="px-3 py-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                      {item.label}
                    </div>
                  )}
                  {item.children?.map(child => (
                    <Link
                      key={child.label}
                      href={child.href!}
                      onClick={() => setMobileMenuOpen(false)}
                      className="flex items-center gap-2.5 rounded-md px-3 py-2.5 text-sm text-muted-foreground hover:bg-muted dark:hover:bg-white/[0.06] transition-colors ml-2"
                    >
                      {child.icon && <child.icon className="h-4 w-4" />}
                      {child.label}
                    </Link>
                  ))}
                </div>
              ))}
            </div>
          </nav>
        </div>
      )}

      <SearchOverlay open={searchOpen} onClose={() => setSearchOpen(false)} />
    </>
  )
}
