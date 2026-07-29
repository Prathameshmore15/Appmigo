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
              className="flex w-full items-center justify-between px-6 py-4.5 text-left text-sm font-medium text-foreground hover:bg-muted/50 transition-colors duration-200 cursor-pointer"
              aria-expanded={isOpen}
            >
              <span className="pr-4">{item.title}</span>
              <ChevronDown
                className={cn(
                  'h-4 w-4 shrink-0 text-muted-foreground transition-transform duration-300',
                  isOpen && 'rotate-180'
                )}
              />
            </button>
            <div
              className={cn(
                'overflow-hidden transition-all duration-300 ease-out',
                isOpen ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'
              )}
            >
              <div className="px-6 pb-5 text-sm text-muted-foreground leading-relaxed">
                {item.content}
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}
