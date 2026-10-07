'use client'

import { useEffect, useMemo, useRef, useState } from 'react'
import { Search, X, Gamepad2, HelpCircle, Compass, LifeBuoy, MessageCircle, Bug, Mail, Newspaper } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { AnimatePresence, motion } from 'framer-motion'
import { games } from '@/data/games'
import { faqs } from '@/data/faqs'
import { cn } from '@/lib/utils'

interface SearchOverlayProps {
  open: boolean
  onClose: () => void
}

interface Item {
  id: string
  label: string
  hint?: string
  href: string
  icon: typeof Gamepad2
  group: 'Games' | 'Support' | 'Navigation'
}

const NAV_ITEMS: Item[] = [
  { id: 'nav-games', label: 'Browse all games', href: '/games', icon: Gamepad2, group: 'Navigation' },
  { id: 'nav-about', label: 'About Appmigo', href: '/about', icon: Compass, group: 'Navigation' },
  { id: 'nav-news', label: 'News & updates', href: '/news', icon: Newspaper, group: 'Navigation' },
  { id: 'nav-support', label: 'Support center', href: '/support', icon: LifeBuoy, group: 'Navigation' },
  { id: 'nav-ai', label: 'AI support chat', hint: '24/7 instant answers', href: '/support/ai', icon: MessageCircle, group: 'Support' },
  { id: 'nav-bug', label: 'Submit a bug report', href: '/support/bug-report', icon: Bug, group: 'Support' },
  { id: 'nav-contact', label: 'Contact us', hint: 'responds in 24h', href: '/contact', icon: Mail, group: 'Support' },
  { id: 'nav-faq', label: 'Browse FAQ', href: '/faq', icon: HelpCircle, group: 'Support' },
]

function highlight(label: string, query: string) {
  if (!query) return label
  const i = label.toLowerCase().indexOf(query.toLowerCase())
  if (i === -1) return label
  return (
    <>
      {label.slice(0, i)}
      <mark className="bg-primary/20 text-inherit">{label.slice(i, i + query.length)}</mark>
      {label.slice(i + query.length)}
    </>
  )
}

export function SearchOverlay({ open, onClose }: SearchOverlayProps) {
  const [query, setQuery] = useState('')
  const [active, setActive] = useState(0)
  const [wasOpen, setWasOpen] = useState(open)
  const inputRef = useRef<HTMLInputElement>(null)
  const router = useRouter()

  // Reset search state when the overlay opens. Done during render (the
  // React-endorsed alternative to syncing state inside an effect).
  if (open !== wasOpen) {
    setWasOpen(open)
    if (open) {
      setQuery('')
      setActive(0)
    }
  }

  const items: Item[] = useMemo(() => {
    const q = query.trim().toLowerCase()
    const gameItems: Item[] = games
      .filter((g) => !q || g.title.toLowerCase().includes(q) || g.description.toLowerCase().includes(q))
      .slice(0, 4)
      .map((g) => ({ id: `game-${g.id}`, label: g.title, hint: g.genre, href: `/games/${g.id}`, icon: Gamepad2, group: 'Games' as const }))
    const faqItems: Item[] = q
      ? faqs
          .filter((f) => f.question.toLowerCase().includes(q) || f.answer.toLowerCase().includes(q))
          .slice(0, 4)
          .map((f) => ({ id: `faq-${f.id}`, label: f.question, hint: f.category, href: `/faq?q=${encodeURIComponent(f.question)}`, icon: HelpCircle, group: 'Support' as const }))
      : []
    const nav = NAV_ITEMS.filter((n) => !q || n.label.toLowerCase().includes(q))
    return [...gameItems, ...faqItems, ...nav].slice(0, 12)
  }, [query])

  useEffect(() => {
    if (!open) return
    // DOM focus sync only — no state updates here.
    const t = setTimeout(() => inputRef.current?.focus(), 60)
    return () => clearTimeout(t)
  }, [open])

  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
      if (e.key === 'ArrowDown') {
        e.preventDefault()
        setActive((a) => Math.min(a + 1, items.length - 1))
      }
      if (e.key === 'ArrowUp') {
        e.preventDefault()
        setActive((a) => Math.max(a - 1, 0))
      }
      if (e.key === 'Enter' && items[active]) {
        onClose()
        router.push(items[active].href)
      }
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [open, items, active, onClose, router])

  const groups: Array<'Games' | 'Support' | 'Navigation'> = ['Games', 'Support', 'Navigation']

  return (
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-50 flex items-start justify-center px-4 pt-[12vh]">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.18 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm"
            onClick={onClose}
          />
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.98 }}
            transition={{ duration: 0.2, ease: [0.25, 0.1, 0.25, 1] }}
            className="relative w-full max-w-xl overflow-hidden rounded-2xl border bg-card shadow-2xl"
            role="dialog"
            aria-label="Search"
            aria-modal="true"
          >
            <div className="flex items-center gap-3 border-b border-border px-4">
              <Search className="h-5 w-5 shrink-0 text-muted-foreground" />
              <input
                ref={inputRef}
                value={query}
                onChange={(e) => {
                  setQuery(e.target.value)
                  setActive(0)
                }}
                placeholder="Search games, FAQs, support…"
                className="h-14 flex-1 bg-transparent text-sm outline-none placeholder:text-muted-foreground"
                role="combobox"
                aria-expanded="true"
                aria-controls="search-results"
                aria-activedescendant={items[active]?.id}
              />
              <kbd className="hidden select-none rounded border bg-muted px-1.5 py-0.5 font-mono text-[11px] text-muted-foreground sm:inline-flex">
                ESC
              </kbd>
              <button onClick={onClose} className="cursor-pointer text-muted-foreground hover:text-foreground" aria-label="Close search">
                <X className="h-5 w-5" />
              </button>
            </div>

            <div id="search-results" role="listbox" className="max-h-80 overflow-y-auto p-2">
              {items.length === 0 && (
                <div className="px-3 py-8 text-center text-sm text-muted-foreground">
                  No results for &ldquo;{query}&rdquo;. Try different keywords.
                </div>
              )}
              {groups.map((g) => {
                const list = items.filter((i) => i.group === g)
                if (list.length === 0) return null
                return (
                  <div key={g} className="mb-1">
                    <p className="px-3 py-1.5 font-mono text-[11px] font-medium uppercase tracking-[0.18em] text-muted-foreground">
                      {g}
                    </p>
                    {list.map((item) => {
                      const globalIdx = items.indexOf(item)
                      const isActive = globalIdx === active
                      return (
                        <button
                          key={item.id}
                          id={item.id}
                          role="option"
                          aria-selected={isActive}
                          onMouseEnter={() => setActive(globalIdx)}
                          onClick={() => {
                            onClose()
                            router.push(item.href)
                          }}
                          className={cn(
                            'flex w-full cursor-pointer items-center gap-3 rounded-lg px-3 py-2.5 text-left text-sm transition-colors',
                            isActive ? 'bg-muted' : 'hover:bg-muted/60'
                          )}
                        >
                          <item.icon className="h-4 w-4 shrink-0 text-muted-foreground" />
                          <span className="min-w-0 flex-1 truncate">{highlight(item.label, query.trim())}</span>
                          {item.hint && (
                            <span className="shrink-0 font-mono text-[11px] text-muted-foreground">{item.hint}</span>
                          )}
                        </button>
                      )
                    })}
                  </div>
                )
              })}
              {items.length > 0 && (
                <p className="flex items-center justify-center gap-3 border-t border-border px-3 py-2.5 font-mono text-[11px] text-muted-foreground">
                  <span>↑↓ navigate</span>
                  <span>↵ open</span>
                  <span>esc close</span>
                </p>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}
