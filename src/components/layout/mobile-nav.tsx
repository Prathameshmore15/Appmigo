'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter, usePathname } from 'next/navigation'
import { Home, Gamepad2, HelpCircle, MessageCircle, MoreHorizontal, MessageCircleMore } from 'lucide-react'
import { cn } from '@/lib/utils'

const bottomNavItems = [
  { label: 'Home', href: '/', icon: Home },
  { label: 'Games', href: '/games', icon: Gamepad2 },
  { label: 'FAQ', href: '/faq', icon: HelpCircle },
  { label: 'Support', href: '/support', icon: MessageCircle },
  { label: 'More', href: '#more', icon: MoreHorizontal },
]

export function MobileNav() {
  const pathname = usePathname()
  const [visible, setVisible] = useState(true)
  const [lastScrollY, setLastScrollY] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      const current = window.scrollY
      setVisible(current < lastScrollY || current < 50)
      setLastScrollY(current)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [lastScrollY])

  const isActive = (href: string) => {
    if (href === '/') return pathname === '/'
    if (href === '#more') return false
    return pathname.startsWith(href)
  }

  return (
    <nav
      className={cn(
        'fixed bottom-0 left-0 right-0 z-20 border-t border-border/50 bg-background/80 backdrop-blur-xl lg:hidden transition-transform duration-300 dark:bg-[#0B0C10]/80',
        visible ? 'translate-y-0' : 'translate-y-full'
      )}
      aria-label="Mobile navigation"
    >
      <div className="flex items-center justify-around h-14 px-2">
        {bottomNavItems.map(item => {
          if (item.href === '#more') {
            return (
              <Link
                key={item.label}
                href="/contact"
                className="flex flex-col items-center justify-center gap-0.5 px-3 py-1 min-w-[56px]"
              >
                <MoreHorizontal className="h-5 w-5 text-muted-foreground" />
                <span className="text-[10px] text-muted-foreground font-medium">{item.label}</span>
              </Link>
            )
          }
          return (
            <Link
              key={item.label}
              href={item.href}
              className={cn(
                'flex flex-col items-center justify-center gap-0.5 px-3 py-1 min-w-[56px] transition-colors',
                isActive(item.href) ? 'text-primary' : 'text-muted-foreground'
              )}
            >
              <item.icon className="h-5 w-5" />
              <span className="text-[10px] font-medium">{item.label}</span>
            </Link>
          )
        })}
      </div>
    </nav>
  )
}

export function Fab() {
  const router = useRouter()
  
  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault()
    router.push('/support/ai')
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <Link
      href="/support/ai"
      onClick={handleClick}
      className="fixed bottom-20 right-4 z-20 lg:bottom-8 lg:right-8 h-14 w-14 rounded-full bg-primary text-on-primary shadow-lg hover:bg-primary-hover transition-all duration-300 flex items-center justify-center hover:scale-110 active:scale-95 shadow-[0_4px_20px_rgba(5,150,105,0.3)] dark:shadow-[0_4px_20px_rgba(52,211,153,0.25)]"
      aria-label="AI Chat Support"
    >
      <MessageCircleMore className="h-6 w-6" />
    </Link>
  )
}
