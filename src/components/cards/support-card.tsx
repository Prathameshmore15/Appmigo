'use client'

import Link from 'next/link'
import type { LucideIcon } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { ArrowRight } from 'lucide-react'

interface SupportCardProps {
  icon: LucideIcon
  title: string
  description: string
  href: string
  cta: string
}

export function SupportCard({ icon: Icon, title, description, href, cta }: SupportCardProps) {
  return (
    <Link href={href} className="group block">
      <Card className="h-full transition-all duration-300 hover:shadow-lg hover:-translate-y-1 hover:border-primary/20">
        <CardContent className="p-6">
          <div className="flex items-start gap-4">
            <div className="rounded-xl bg-primary/10 p-3 text-primary group-hover:bg-primary group-hover:text-on-primary transition-all duration-300 shrink-0">
              <Icon className="h-5 w-5" />
            </div>
            <div className="min-w-0 flex-1">
              <h3 className="font-heading text-base font-semibold mb-1">{title}</h3>
              <p className="text-sm text-muted-foreground/80 leading-relaxed">{description}</p>
              <span className="inline-flex items-center gap-1 text-xs font-medium text-primary mt-2.5 opacity-0 group-hover:opacity-100 transition-all duration-300 group-hover:gap-1.5">
                {cta} <ArrowRight className="h-3 w-3" />
              </span>
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  )
}
