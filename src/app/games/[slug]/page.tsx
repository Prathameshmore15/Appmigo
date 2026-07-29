import { notFound } from 'next/navigation'
import Link from 'next/link'
import { Metadata } from 'next'
import { Star, BugPlay, HelpCircle, MessageCircleMore, ArrowLeft, ExternalLink } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import { Timeline } from '@/components/timeline'
import { Accordion } from '@/components/ui/accordion'
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

  return (
    <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
      <Link href="/games" className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors mb-8">
        <ArrowLeft className="h-4 w-4" /> Back to Games
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          <div className="aspect-video rounded-xl bg-gradient-to-br from-primary/20 via-accent/10 to-primary/5 flex items-center justify-center border">
            <img src="/appmigo-icon.svg" alt="" className="h-24 w-24 opacity-20" />
          </div>

          <div>
            <h1 className="font-heading text-3xl sm:text-4xl font-bold">{game.title}</h1>
            <div className="flex flex-wrap items-center gap-3 mt-3">
              <Badge variant="primary">{game.genre}</Badge>
              <div className="flex items-center gap-1 text-sm">
                <Star className="h-4 w-4 fill-warning text-warning" />
                <span className="font-medium">{game.rating}</span>
              </div>
              <span className="text-sm text-muted-foreground">v{game.version}</span>
              <span className="text-sm text-muted-foreground">Released {game.releaseDate}</span>
            </div>
            <p className="mt-4 text-muted-foreground leading-relaxed">{game.longDescription}</p>
          </div>

          <div>
            <h2 className="font-heading text-xl font-semibold mb-4">Features</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {game.features.map((f, i) => (
                <div key={i} className="flex items-center gap-2 text-sm">
                  <div className="h-1.5 w-1.5 rounded-full bg-primary" />
                  {f}
                </div>
              ))}
            </div>
          </div>

          <div>
            <h2 className="font-heading text-xl font-semibold mb-4">Release Notes</h2>
            {gameReleases.length > 0 ? (
              <Timeline releases={gameReleases} />
            ) : (
              <p className="text-sm text-muted-foreground">No release notes yet.</p>
            )}
          </div>

          {gameFAQs.length > 0 && (
            <div>
              <h2 className="font-heading text-xl font-semibold mb-4">Related FAQs</h2>
              <Accordion
                items={gameFAQs.map(faq => ({
                  id: faq.id,
                  title: faq.question,
                  content: faq.answer,
                }))}
              />
            </div>
          )}
        </div>

        <div className="space-y-6">
          <Card>
            <CardContent className="p-6 space-y-4">
              <h3 className="font-heading font-semibold">Quick Actions</h3>
              <div className="space-y-2">
                <Link href={`/support/bug-report`}>
                  <Button variant="secondary" className="w-full justify-start cursor-pointer">
                    <BugPlay className="h-4 w-4" /> Report a Bug
                  </Button>
                </Link>
                <Link href="/faq">
                  <Button variant="secondary" className="w-full justify-start cursor-pointer">
                    <HelpCircle className="h-4 w-4" /> View FAQ
                  </Button>
                </Link>
                <Link href="/support/ai">
                  <Button variant="secondary" className="w-full justify-start cursor-pointer">
                    <MessageCircleMore className="h-4 w-4" /> Get AI Help
                  </Button>
                </Link>
                <a href={game.playStoreUrl} target="_blank" rel="noopener noreferrer">
                  <Button className="w-full cursor-pointer">
                    <ExternalLink className="h-4 w-4" /> View on Google Play
                  </Button>
                </a>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <h3 className="font-heading font-semibold mb-2">Details</h3>
              <dl className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <dt className="text-muted-foreground">Developer</dt>
                  <dd className="font-medium">{game.developer}</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-muted-foreground">Version</dt>
                  <dd className="font-medium">{game.version}</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-muted-foreground">Released</dt>
                  <dd className="font-medium">{game.releaseDate}</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-muted-foreground">Genre</dt>
                  <dd className="font-medium">{game.genre}</dd>
                </div>
              </dl>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
