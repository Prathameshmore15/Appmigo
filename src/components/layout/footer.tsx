import Link from 'next/link'
import { Mail, MapPin, Clock } from 'lucide-react'
import { company } from '@/data/company'
import { games } from '@/data/games'

const navigationLinks = [
  { label: 'Games', href: '/games' },
  { label: 'About', href: '/about' },
  { label: 'News', href: '/news' },
  { label: 'Contact', href: '/contact' },
]

const supportLinks = [
  { label: 'Support Center', href: '/support' },
  { label: 'FAQ', href: '/faq' },
  { label: 'Bug Report', href: '/support/bug-report' },
  { label: 'AI Chat', href: '/support/ai' },
]

const legalLinks = [
  { label: 'Privacy Policy', href: '/privacy-policy' },
  { label: 'Terms & Conditions', href: '/terms' },
  { label: 'Account Deletion', href: '/account-deletion' },
]

export function Footer() {
  return (
    <footer className="relative overflow-hidden border-t bg-muted/30">
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent"
        aria-hidden="true"
      />
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-5">
          <div className="col-span-2 md:col-span-1">
            <Link href="/" className="group mb-4 flex items-center gap-2.5" aria-label="Appmigo home">
              <img src="/appmigo-icon.svg" alt="Appmigo" loading="lazy" className="h-10 w-10 transition-transform duration-300 group-hover:scale-105 group-hover:rotate-3" />
              <span className="font-heading text-xl font-bold tracking-tight text-foreground transition-colors duration-300 group-hover:text-primary">
                appmigo
                <span className="diamond-pulse ml-0.5 inline-block h-1.5 w-1.5 rounded-sm bg-accent align-middle" />
              </span>
            </Link>
            <p className="max-w-xs text-sm leading-relaxed text-muted-foreground">
              {company.tagline}
            </p>
            <p className="mt-2 font-mono text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
              One developer · Serious craft
            </p>
            <div className="mt-4 space-y-2 text-sm">
              <a href="mailto:support@appmigo.com" className="flex items-center gap-2 text-muted-foreground transition-colors hover:text-foreground">
                <Mail className="h-4 w-4 shrink-0" />
                support@appmigo.com
              </a>
              <p className="flex items-center gap-2 text-muted-foreground">
                <MapPin className="h-4 w-4 shrink-0" />
                Mumbai, Maharashtra, India
              </p>
              <p className="flex items-center gap-2 text-muted-foreground">
                <Clock className="h-4 w-4 shrink-0" />
                Responds within 24 hours
              </p>
            </div>
          </div>
          <nav aria-label="Footer navigation">
            <h4 className="mb-3 font-heading text-sm font-semibold">Navigation</h4>
            <ul className="space-y-2">
              {navigationLinks.map(link => (
                <li key={link.label}>
                  <Link href={link.href} className="link-underline text-sm text-muted-foreground transition-colors hover:text-foreground">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          <nav aria-label="Footer support">
            <h4 className="mb-3 font-heading text-sm font-semibold">Support</h4>
            <ul className="space-y-2">
              {supportLinks.map(link => (
                <li key={link.label}>
                  <Link href={link.href} className="link-underline text-sm text-muted-foreground transition-colors hover:text-foreground">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          <nav aria-label="Footer legal">
            <h4 className="mb-3 font-heading text-sm font-semibold">Legal</h4>
            <ul className="space-y-2">
              {legalLinks.map(link => (
                <li key={link.label}>
                  <Link href={link.href} className="link-underline text-sm text-muted-foreground transition-colors hover:text-foreground">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          <div>
            <h4 className="mb-3 font-heading text-sm font-semibold">Our Games</h4>
            <ul className="space-y-3">
              {games.map(game => (
                <li key={game.id}>
                  {game.playStoreUrl && game.playStoreUrl !== '#' ? (
                    <a href={game.playStoreUrl} target="_blank" rel="noopener noreferrer" className="link-underline text-sm text-muted-foreground transition-colors hover:text-foreground">
                      {game.title} on Google Play
                    </a>
                  ) : (
                    <Link href={`/games/${game.id}`} className="link-underline text-sm text-muted-foreground transition-colors hover:text-foreground">
                      {game.title}
                    </Link>
                  )}
                  <p className="truncate font-mono text-xs text-muted-foreground/70">{game.packageName}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="mt-10 flex flex-col items-center justify-between gap-4 border-t border-border pt-8 sm:flex-row">
          <p className="text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} {company.name}. All rights reserved.
          </p>
          <p className="text-xs text-muted-foreground">
            Mumbai, India · <a href="mailto:support@appmigo.com" className="transition-colors hover:text-foreground">support@appmigo.com</a>
          </p>
        </div>
      </div>
    </footer>
  )
}
