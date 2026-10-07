'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { Menu, Search, ChevronDown, MessageCircle, Bug, HelpCircle, FileText, Shield, Trash2, X } from 'lucide-react'
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
  const [scrolled, setScrolled] = useState(false)
  const pathname = usePathname()
  const reduce = useReducedMotion()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault()
        setSearchOpen(true)
      }
      if (e.key === '/' && !(e.target instanceof HTMLInputElement) && !(e.target instanceof HTMLTextAreaElement)) {
        const tag = (e.target as HTMLElement)?.tagName
        if (tag !== 'INPUT' && tag !== 'TEXTAREA') {
          e.preventDefault()
          setSearchOpen(true)
        }
      }
      if (e.key === 'Escape') {
        setOpenDropdown(null)
        setMobileMenuOpen(false)
      }
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [])

  return (
    <>
      <div className="sticky top-0 z-30 w-full px-3 pt-3 sm:px-5 sm:pt-4">
        <motion.header
          animate={{ y: 0, opacity: 1 }}
          initial={reduce ? false : { y: -12, opacity: 0 }}
          transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
          className={cn(
            'mx-auto w-full max-w-6xl rounded-2xl border transition-all duration-300',
            scrolled
              ? 'border-border/80 bg-background/85 shadow-lg backdrop-blur-xl dark:bg-[#0B0C10]/85'
              : 'border-border/50 bg-background/60 backdrop-blur-xl dark:bg-[#0B0C10]/60'
          )}
        >
          <div className={cn(
            'mx-auto flex items-center justify-between px-4 transition-all duration-300 sm:px-5',
            scrolled ? 'h-14' : 'h-16'
          )}>
            <Link href="/" className="flex items-center gap-2.5 shrink-0 group" aria-label="Appmigo home">
              <img src="/appmigo-icon.svg" alt="Appmigo" className="h-9 w-9 transition-transform duration-300 group-hover:scale-105" />
              <span className="hidden sm:block">
                <FlipFadeText
                  words={["APPMIGO", "APPMIGO", "APPMIGO", "APPMIGO"]}
                  interval={4000}
                  className="min-h-0"
                  textClassName="!text-[15px] !font-heading !font-bold !tracking-[0.08em] !text-foreground"
                  letterDuration={0.35}
                  staggerDelay={0.05}
                  exitStaggerDelay={0.02}
                />
              </span>
            </Link>

            <nav className="hidden lg:flex items-center gap-0.5" aria-label="Main navigation">
              {navItems.map(item => {
                const active = item.href ? pathname === item.href || (item.href !== '/' && pathname.startsWith(item.href) && item.children) : false
                return (
                  <div
                    key={item.label}
                    className="relative"
                    onMouseEnter={() => setOpenDropdown(item.children ? item.label : null)}
                    onMouseLeave={() => setOpenDropdown(null)}
                  >
                    {item.href ? (
                      <Link
                        href={item.href}
                        aria-haspopup={item.children ? 'true' : undefined}
                        aria-expanded={item.children ? openDropdown === item.label : undefined}
                        onFocus={() => item.children && setOpenDropdown(item.label)}
                        className={cn(
                          'relative inline-flex items-center gap-1 rounded-lg px-3 py-2 text-[13.5px] font-medium transition-colors hover:bg-muted dark:hover:bg-white/[0.06]',
                          active || pathname === item.href ? 'text-primary' : 'text-foreground/80'
                        )}
                      >
                        {item.label}
                        {item.children && <ChevronDown className={cn('h-3.5 w-3.5 transition-transform duration-200', openDropdown === item.label && 'rotate-180')} />}
                        {(active || pathname === item.href) && (
                          <motion.span
                            layoutId="nav-active"
                            className="absolute inset-x-3 -bottom-px h-px bg-primary"
                            transition={{ duration: 0.25 }}
                          />
                        )}
                      </Link>
                    ) : (
                      <button
                        className="relative inline-flex cursor-pointer items-center gap-1 rounded-lg px-3 py-2 text-[13.5px] font-medium text-foreground/80 transition-colors hover:bg-muted dark:hover:bg-white/[0.06]"
                        onClick={() => setOpenDropdown(openDropdown === item.label ? null : item.label)}
                        aria-haspopup="true"
                        aria-expanded={openDropdown === item.label}
                      >
                        {item.label}
                        <ChevronDown className={cn('h-3.5 w-3.5 transition-transform duration-200', openDropdown === item.label && 'rotate-180')} />
                      </button>
                    )}
                    <AnimatePresence>
                      {item.children && openDropdown === item.label && (
                        <motion.div
                          initial={{ opacity: 0, y: -6, scale: 0.98 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: -6, scale: 0.98 }}
                          transition={{ duration: 0.16, ease: 'easeOut' }}
                          className="absolute top-full left-0 z-20 mt-2 w-60 rounded-xl border bg-card/95 py-2 shadow-xl backdrop-blur-xl dark:border-white/[0.06] dark:bg-[#14161C]/95"
                          role="menu"
                        >
                          {item.children.map((child, idx) => (
                            <div key={child.label}>
                              {idx > 0 && <div className="mx-3 my-1 h-px bg-border/50 dark:bg-white/[0.06]" />}
                              <Link
                                href={child.href!}
                                role="menuitem"
                                onClick={() => setOpenDropdown(null)}
                                className="mx-2 flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-foreground/80 transition-colors hover:bg-muted hover:text-foreground dark:hover:bg-white/[0.06]"
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
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                )
              })}
            </nav>

            <div className="flex items-center gap-1.5">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setSearchOpen(true)}
                aria-label="Search (Ctrl+K)"
                className="h-9 w-9 cursor-pointer"
              >
                <Search className="h-[18px] w-[18px]" />
              </Button>
              <kbd className="hidden select-none items-center gap-1 rounded-md border bg-muted px-1.5 py-0.5 font-mono text-[11px] text-muted-foreground lg:inline-flex">
                ⌘K
              </kbd>
              <ThemeToggle />
              <Button
                variant="ghost"
                size="icon"
                className="h-9 w-9 cursor-pointer lg:hidden"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                aria-label="Toggle menu"
                aria-expanded={mobileMenuOpen}
              >
                {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </Button>
            </div>
          </div>
        </motion.header>

        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.nav
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2 }}
              className="mx-auto mt-2 w-full max-w-6xl rounded-2xl border bg-card/95 p-3 shadow-xl backdrop-blur-xl lg:hidden dark:bg-[#0B0C10]/95"
              aria-label="Mobile navigation"
            >
              <div className="max-h-[60vh] space-y-0.5 overflow-y-auto">
                {navItems.map(item => (
                  <div key={item.label}>
                    {item.href ? (
                      <Link
                        href={item.href}
                        onClick={() => setMobileMenuOpen(false)}
                        className={cn(
                          'flex min-h-[44px] items-center rounded-lg px-3 py-2.5 text-sm font-medium transition-colors hover:bg-muted',
                          pathname === item.href && 'text-primary'
                        )}
                      >
                        {item.label}
                      </Link>
                    ) : (
                      <div className="px-3 py-2 font-mono text-[11px] font-medium uppercase tracking-[0.18em] text-muted-foreground">
                        {item.label}
                      </div>
                    )}
                    {item.children?.map(child => (
                      <Link
                        key={child.label}
                        href={child.href!}
                        onClick={() => setMobileMenuOpen(false)}
                        className="ml-2 flex min-h-[44px] items-center gap-2.5 rounded-lg px-3 py-2.5 text-sm text-muted-foreground transition-colors hover:bg-muted"
                      >
                        {child.icon && <child.icon className="h-4 w-4" />}
                        {child.label}
                      </Link>
                    ))}
                  </div>
                ))}
              </div>
            </motion.nav>
          )}
        </AnimatePresence>
      </div>

      <SearchOverlay open={searchOpen} onClose={() => setSearchOpen(false)} />
    </>
  )
}
