import Link from 'next/link'
import { company } from '@/data/company'

const navigationLinks = [
  { label: 'Games', href: '/games' },
  { label: 'About', href: '/about' },
  { label: 'News', href: '/news' },
  { label: 'Contact', href: '/contact' },
]

const supportLinks = [
  { label: 'FAQ', href: '/faq' },
  { label: 'Bug Report', href: '/support' },
  { label: 'AI Chat', href: '/support' },
]

const legalLinks = [
  { label: 'Privacy Policy', href: '/privacy' },
  { label: 'Terms & Conditions', href: '/terms' },
  { label: 'Account Deletion', href: '/account-deletion' },
]

export function Footer() {
  return (
    <footer className="border-t bg-muted/30">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          <div className="col-span-2 md:col-span-1">
            <Link href="/" className="flex items-center gap-2.5 mb-4 group">
              <img src="/appmigo-icon.svg" alt="Appmigo" className="h-10 w-10 transition-all duration-300 group-hover:scale-110 group-hover:drop-shadow-[0_0_8px_rgba(5,150,105,0.3)]" />
              <span className="font-heading text-xl font-bold tracking-tight text-foreground transition-all duration-300 group-hover:text-primary">
                appmigo
                <span className="inline-block w-1.5 h-1.5 rounded-sm bg-accent ml-0.5 align-middle transition-all duration-700 group-hover:scale-125 group-hover:opacity-60 rotate-45 diamond-pulse" />
              </span>
            </Link>
            <p className="text-sm text-muted-foreground leading-relaxed max-w-xs">
              {company.tagline}
            </p>
          </div>
          <div>
            <h4 className="font-heading text-sm font-semibold mb-3">Navigation</h4>
            <ul className="space-y-2">
              {navigationLinks.map(link => (
                <li key={link.label}>
                  <Link href={link.href} className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="font-heading text-sm font-semibold mb-3">Support</h4>
            <ul className="space-y-2">
              {supportLinks.map(link => (
                <li key={link.label}>
                  <Link href={link.href} className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="font-heading text-sm font-semibold mb-3">Legal</h4>
            <ul className="space-y-2">
              {legalLinks.map(link => (
                <li key={link.label}>
                  <Link href={link.href} className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="mt-10 pt-8 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} {company.name}. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
