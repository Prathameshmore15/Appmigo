import { notFound } from 'next/navigation'
import Link from 'next/link'
import { Metadata } from 'next'
import { Star, BugPlay, HelpCircle, MessageCircleMore, ArrowLeft, ExternalLink } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import { Timeline } from '@/components/timeline'
import { Accordion } from '@/components/ui/accordion'
import { ScrollReveal } from '@/components/motion/scroll-reveal'
import { SectionHeading } from '@/components/ui/section-heading'
import { InteractiveGamePreview } from '@/components/game/interactive-game-preview'
import { TileDebtTeaser } from '@/components/game/tile-debt-teaser'
import { games, getGameBySlug } from '@/data/games'
import { getReleasesByGame } from '@/data/releases'
import { getFAQsByGame } from '@/data/faqs'

interface PageProps {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  return games.map(g => ({ slug: g.id }))
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  const game = getGameBySlug(slug)
  if (!game) return { title: 'Game Not Found' }
  return {
    title: game.title,
    description: game.description,
    openGraph: { title: game.title, description: game.description },
  }
}

export default async function GameDetailPage({ params }: PageProps) {
  const { slug } = await params
  const game = getGameBySlug(slug)

  if (!game) notFound()

  const gameReleases = getReleasesByGame(game.id)
  const gameFAQs = getFAQsByGame(game.id)
  const isUpcoming = game.status === 'upcoming'

  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden border-b">
        <div className="hero-grid hero-fade-mask absolute inset-0" aria-hidden="true" />
        <div className="hero-atmosphere absolute inset-0" aria-hidden="true" />
        <div className="relative mx-auto max-w-5xl px-4 py-14 sm:px-6 sm:py-20 lg:px-8">
          <Link href="/games" className="link-underline inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground">
            <ArrowLeft className="h-4 w-4" /> Back to Games
          </Link>
          <div className="mt-6 grid grid-cols-1 items-start gap-8 lg:grid-cols-5">
            <div className="lg:col-span-3">
              <p className="font-mono text-[11px] font-medium uppercase tracking-[0.22em] text-primary">
                {isUpcoming ? 'Coming soon' : game.genre}
              </p>
              <h1 className="mt-3 font-heading text-4xl font-bold tracking-tight sm:text-5xl">{game.title}</h1>
              <p className="mt-4 max-w-xl leading-relaxed text-muted-foreground">{game.description}</p>
              <div className="mt-5 flex flex-wrap items-center gap-2.5">
                <Badge variant="primary">{game.genre}</Badge>
                {isUpcoming ? (
                  <Badge variant="accent">Coming Soon</Badge>
                ) : (
                  <>
                    <span className="inline-flex items-center gap-1 text-sm">
                      <Star className="h-4 w-4 fill-warning text-warning" />
                      <span className="font-medium">{game.rating}</span>
                    </span>
                    <span className="font-mono text-xs text-muted-foreground">v{game.version}</span>
                    <span className="font-mono text-xs text-muted-foreground">· {game.releaseDate}</span>
                  </>
                )}
              </div>
              <div className="mt-7 flex flex-wrap gap-3">
                {isUpcoming ? (
                  <Link href="/release-notes">
                    <Button variant="secondary" className="cursor-pointer">Follow development</Button>
                  </Link>
                ) : (
                  <a href={game.playStoreUrl} target="_blank" rel="noopener noreferrer">
                    <Button size="lg" className="cursor-pointer gap-2">
                      <ExternalLink className="h-4 w-4" /> View on Google Play
                    </Button>
                  </a>
                )}
                <Link href="/support/bug-report">
                  <Button variant="secondary" size="lg" className="cursor-pointer gap-2">
                    <BugPlay className="h-4 w-4" /> Report a Bug
                  </Button>
                </Link>
              </div>
            </div>
            <div className="lg:col-span-2">
              {game.id === 'speed-memory' ? (
                <InteractiveGamePreview compact />
              ) : game.id === 'tile-debt' ? (
                <TileDebtTeaser />
              ) : game.screenshots?.[0] ? (
                <div className="aspect-video overflow-hidden rounded-xl border">
                  <img src={game.screenshots[0]} alt={`${game.title} screenshot`} loading="lazy" className="h-full w-full object-cover" />
                </div>
              ) : (
                <div className="flex aspect-video items-center justify-center rounded-xl border bg-gradient-to-br from-primary/20 via-accent/10 to-primary/5">
                  <img src="/appmigo-icon.svg" alt="" loading="lazy" className="h-24 w-24 opacity-20" />
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-5xl px-4 py-14 sm:px-6 sm:py-16 lg:px-8">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-3">
          <div className="space-y-12 lg:col-span-2">
            {game.screenshots && game.screenshots.length > 0 && game.id !== 'speed-memory' && game.id !== 'tile-debt' && (
              <ScrollReveal>
                <div className="aspect-video overflow-hidden rounded-xl border">
                  <img src={game.screenshots[0]} alt={`${game.title} screenshot`} loading="lazy" className="h-full w-full object-cover" />
                </div>
              </ScrollReveal>
            )}

            <ScrollReveal>
              <SectionHeading eyebrow="Gameplay" title="About this game" />
              <p className="mt-4 whitespace-pre-line leading-relaxed text-muted-foreground">{game.longDescription}</p>
            </ScrollReveal>

            <ScrollReveal>
              <h2 className="font-heading text-xl font-semibold">Features</h2>
              <div className="mt-4 grid grid-cols-1 gap-2.5 sm:grid-cols-2">
                {game.features.map((f) => (
                  <div key={f} className="flex items-center gap-2.5 rounded-lg border bg-card px-3.5 py-2.5 text-sm">
                    <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                    {f}
                  </div>
                ))}
              </div>
            </ScrollReveal>

            <ScrollReveal>
              <h2 className="font-heading text-xl font-semibold">Release timeline</h2>
              <div className="mt-5">
                {gameReleases.length > 0 ? (
                  <Timeline releases={gameReleases} />
                ) : (
                  <p className="text-sm text-muted-foreground">No release notes yet.</p>
                )}
              </div>
            </ScrollReveal>

            {gameFAQs.length > 0 && (
              <ScrollReveal>
                <h2 className="font-heading text-xl font-semibold">Related FAQs</h2>
                <Accordion
                  items={gameFAQs.map(faq => ({
                    id: faq.id,
                    title: faq.question,
                    content: faq.answer,
                  }))}
                />
              </ScrollReveal>
            )}
          </div>

          <div className="space-y-6 lg:sticky lg:top-24 lg:self-start">
            <Card>
              <CardContent className="space-y-2 p-6">
                <h3 className="font-heading font-semibold">Quick actions</h3>
                {isUpcoming ? (
                  <div className="py-4 text-center">
                    <Badge variant="accent" className="text-sm">Coming Soon</Badge>
                    <p className="mt-2 text-sm text-muted-foreground">This game is under development</p>
                  </div>
                ) : (
                  <>
                    <Link href="/support/bug-report" className="block">
                      <Button variant="secondary" className="w-full cursor-pointer justify-start">
                        <BugPlay className="h-4 w-4" /> Report a Bug
                      </Button>
                    </Link>
                    <Link href="/faq" className="block">
                      <Button variant="secondary" className="w-full cursor-pointer justify-start">
                        <HelpCircle className="h-4 w-4" /> View FAQ
                      </Button>
                    </Link>
                    <Link href="/support/ai" className="block">
                      <Button variant="secondary" className="w-full cursor-pointer justify-start">
                        <MessageCircleMore className="h-4 w-4" /> Get AI Help
                      </Button>
                    </Link>
                  </>
                )}
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <h3 className="mb-2 font-heading font-semibold">Details</h3>
                <dl className="space-y-2 text-sm">
                  <div className="flex justify-between gap-4">
                    <dt className="text-muted-foreground">Developer</dt>
                    <dd className="font-medium">{game.developer}</dd>
                  </div>
                  <div className="flex justify-between gap-4">
                    <dt className="text-muted-foreground">Version</dt>
                    <dd className="font-mono text-xs">{game.version}</dd>
                  </div>
                  <div className="flex justify-between gap-4">
                    <dt className="text-muted-foreground">Released</dt>
                    <dd className="font-medium">{game.releaseDate}</dd>
                  </div>
                  <div className="flex justify-between gap-4">
                    <dt className="text-muted-foreground">Genre</dt>
                    <dd className="font-medium">{game.genre}</dd>
                  </div>
                  <div className="flex justify-between gap-4">
                    <dt className="text-muted-foreground">Package</dt>
                    <dd className="max-w-[60%] truncate font-mono text-xs">{game.packageName}</dd>
                  </div>
                </dl>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
