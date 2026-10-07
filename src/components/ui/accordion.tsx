'use client'

import { useState, type ReactNode } from 'react'
import { ChevronDown } from 'lucide-react'
import { cn } from '@/lib/utils'

interface AccordionItem {
  id: string
  title: string
  content: ReactNode
}

interface AccordionProps {
  items: AccordionItem[]
  className?: string
}

export function Accordion({ items, className }: AccordionProps) {
  const [openId, setOpenId] = useState<string | null>(null)

  return (
    <div className={cn('divide-y divide-border rounded-xl border bg-card', className)}>
      {items.map(item => {
        const isOpen = openId === item.id
        return (
          <div key={item.id}>
            <button
              onClick={() => setOpenId(isOpen ? null : item.id)}
              onKeyDown={e => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault()
                  setOpenId(isOpen ? null : item.id)
                }
              }}
              className="flex w-full cursor-pointer items-center justify-between px-6 py-4 text-left text-sm font-medium text-foreground transition-colors duration-200 hover:bg-muted/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-ring"
              aria-expanded={isOpen}
              aria-controls={`accordion-${item.id}`}
              id={`accordion-btn-${item.id}`}
            >
              <span className="pr-4">{item.title}</span>
              <ChevronDown
                className={cn(
                  'h-4 w-4 shrink-0 text-muted-foreground transition-transform duration-300',
                  isOpen && 'rotate-180 text-primary'
                )}
              />
            </button>
            <div
              id={`accordion-${item.id}`}
              role="region"
              aria-labelledby={`accordion-btn-${item.id}`}
              className={cn(
                'grid transition-all duration-300 ease-out',
                isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
              )}
            >
              <div className="overflow-hidden">
                <div className="px-6 pb-5 text-sm leading-relaxed text-muted-foreground">
                  {item.content}
                </div>
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}
