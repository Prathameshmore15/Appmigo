'use client'

import { useState } from 'react'
import { Copy, Check, Terminal } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'

const adsTxtContent = `google.com, pub-1234567890123456, DIRECT, f08c47fec0942fa0
applovin.com, 1234567890, DIRECT, c5423d9918222638
unity3d.com, 1234567, DIRECT, d09b2f1c1237456e
ironsrc.com, 1234567, DIRECT, 1de5b1a85fd746d7`

export default function AppAdsTxtPage() {
  const [copied, setCopied] = useState(false)

  const handleCopy = () => {
    navigator.clipboard.writeText(adsTxtContent)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
      <div className="flex items-center gap-3 mb-2">
        <div className="rounded-lg bg-primary/10 p-2.5 text-primary">
          <Terminal className="h-6 w-6" />
        </div>
        <h1 className="font-heading text-3xl sm:text-4xl font-bold">app-ads.txt</h1>
      </div>
      <p className="text-muted-foreground">
        This page lists authorized advertising sellers for Appmigo games, as required by the IAB app-ads.txt initiative.
      </p>

      <div className="mt-8 space-y-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-heading font-semibold">Authorized Digital Sellers</h2>
              <Button
                variant="secondary"
                size="sm"
                onClick={handleCopy}
                className="cursor-pointer"
              >
                {copied ? (
                  <><Check className="h-4 w-4" /> Copied</>
                ) : (
                  <><Copy className="h-4 w-4" /> Copy</>
                )}
              </Button>
            </div>
            <pre className="rounded-lg bg-muted p-4 text-sm font-mono overflow-x-auto">
              {adsTxtContent}
            </pre>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6 space-y-3">
            <h2 className="font-heading font-semibold">What is app-ads.txt?</h2>
            <p className="text-sm text-muted-foreground leading-relaxed">
              app-ads.txt is an IAB initiative that helps prevent unauthorized selling of ad inventory.
              By publishing this file, we declare which advertising partners are authorized to sell
              ad space in our apps. This increases transparency and reduces ad fraud.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6 space-y-3">
            <h2 className="font-heading font-semibold">Verification Instructions</h2>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Ad networks and verification services can access this file at:
            </p>
            <pre className="rounded-lg bg-muted px-4 py-2 text-sm font-mono">
              https://appmigo.com/app-ads.txt
            </pre>
            <p className="text-sm text-muted-foreground">
              This page is also available as{' '}
              <a href="/app-ads.txt" className="text-primary hover:underline">plain text</a>.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6 space-y-3">
            <h2 className="font-heading font-semibold">Supported Ad Networks</h2>
            <div className="grid grid-cols-2 gap-3 text-sm">
              {['Google AdMob', 'AppLovin MAX', 'Unity Ads', 'ironSource'].map(network => (
                <div key={network} className="flex items-center gap-2 rounded-lg border p-3">
                  <div className="h-2 w-2 rounded-full bg-accent" />
                  {network}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
