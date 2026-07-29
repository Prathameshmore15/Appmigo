'use client'

import type { LucideIcon } from 'lucide-react'
import { cn } from '@/lib/utils'

interface FeatureCardProps {
  icon: LucideIcon
  title: string
  description: string
  className?: string
  span?: 'col' | 'row' | 'both'
}

export function FeatureCard({ icon: Icon, title, description, className, span }: FeatureCardProps) {
  return (
    <div
      className={cn(
        'rounded-xl border bg-card p-6 hover:shadow-md hover:-translate-y-0.5 transition-all duration-200',
        span === 'col' && 'sm:col-span-2',
        span === 'row' && 'sm:row-span-2',
        span === 'both' && 'sm:col-span-2 sm:row-span-2',
        className
      )}
    >
      <div className="flex flex-col items-start gap-3">
        <div className="rounded-lg bg-primary/10 p-2.5 text-primary">
          <Icon className="h-5 w-5" />
        </div>
        <h3 className="font-heading text-base font-semibold">{title}</h3>
        <p className="text-sm text-muted-foreground leading-relaxed">{description}</p>
      </div>
    </div>
  )
}
