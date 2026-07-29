'use client'

import { useEffect, useRef, useState } from 'react'
import { Search, X, Gamepad2, HelpCircle } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { games } from '@/data/games'
import { faqs } from '@/data/faqs'

interface SearchOverlayProps {
  open: boolean
  onClose: () => void
}

export function SearchOverlay({ open, onClose }: SearchOverlayProps) {
  const [query, setQuery] = useState('')
  const inputRef = useRef<HTMLInputElement>(null)
  const router = useRouter()

  useEffect(() => {
    if (open) {
      setTimeout(() => inputRef.current?.focus(), 100)
    } else {
      setQuery('')
    }
  }, [open])

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault()
        onClose()
      }
    }
    if (open) document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [open, onClose])

  const filteredGames = games.filter(g =>
    g.title.toLowerCase().includes(query.toLowerCase()) ||
    g.description.toLowerCase().includes(query.toLowerCase())
  )

  const filteredFAQs = faqs.filter(f =>
    f.question.toLowerCase().includes(query.toLowerCase())
  )

  const handleSelect = (href: string) => {
    onClose()
    router.push(href)
  }

  if (!open) return null

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-[15vh]">
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />
      <div className="relative w-full max-w-xl mx-4 bg-card border border-border rounded-xl shadow-2xl overflow-hidden">
        <div className="flex items-center gap-3 px-4 border-b border-border">
          <Search className="h-5 w-5 shrink-0 text-muted-foreground" />
          <input
            ref={inputRef}
            value={query}
            onChange={e => setQuery(e.target.value)}
            placeholder="Search games, FAQs, guides..."
            className="flex-1 h-14 bg-transparent text-sm outline-none placeholder:text-muted-foreground"
          />
          <kbd className="hidden sm:inline-flex items-center gap-1 rounded border bg-muted px-1.5 py-0.5 text-xs text-muted-foreground">
            ESC
          </kbd>
          <button onClick={onClose} className="cursor-pointer text-muted-foreground hover:text-foreground">
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="max-h-80 overflow-y-auto p-2">
          {query && (
            <>
              {filteredGames.length > 0 && (
                <div className="mb-2">
                  <p className="px-3 py-1.5 text-xs font-medium text-muted-foreground uppercase tracking-wider">Games</p>
                  {filteredGames.map(g => (
                    <button
                      key={g.id}
                      onClick={() => handleSelect(`/games/${g.id}`)}
                      className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm hover:bg-muted transition-colors text-left cursor-pointer"
                    >
                      <Gamepad2 className="h-4 w-4 shrink-0 text-muted-foreground" />
                      <span>{g.title}</span>
                    </button>
                  ))}
                </div>
              )}
              {filteredFAQs.length > 0 && (
                <div>
                  <p className="px-3 py-1.5 text-xs font-medium text-muted-foreground uppercase tracking-wider">FAQs</p>
                  {filteredFAQs.map(f => (
                    <button
                      key={f.id}
                      onClick={() => handleSelect(`/faq?q=${encodeURIComponent(f.question)}`)}
                      className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm hover:bg-muted transition-colors text-left cursor-pointer"
                    >
                      <HelpCircle className="h-4 w-4 shrink-0 text-muted-foreground" />
                      <span>{f.question}</span>
                    </button>
                  ))}
                </div>
              )}
              {filteredGames.length === 0 && filteredFAQs.length === 0 && (
                <div className="px-3 py-8 text-center text-sm text-muted-foreground">
                  No results for "{query}". Try different keywords.
                </div>
              )}
            </>
          )}
          {!query && (
            <div className="px-3 py-8 text-center text-sm text-muted-foreground">
              Search games, FAQs, guides...
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
