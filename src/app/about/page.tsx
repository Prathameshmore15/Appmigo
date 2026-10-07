'use client'

import { motion, useReducedMotion } from 'framer-motion'
import { Heart, BarChart3, Lightbulb, Star, MapPin } from 'lucide-react'
import { company } from '@/data/company'
import { ScrollReveal, StaggerReveal, StaggerChild } from '@/components/motion/scroll-reveal'
import { SectionHeading } from '@/components/ui/section-heading'
import { AnimatedCounter } from '@/components/motion/animated-counter'

const iconMap = {
  Heart,
  BarChart3,
  Lightbulb,
  Star,
}

const statValues: Record<string, { n: number; decimals?: number; suffix?: string }> = {
  Downloads: { n: 100, suffix: '+' },
  Developer: { n: 1 },
  'Games Published': { n: 2 },
  'Avg. Rating': { n: 4.5, decimals: 1 },
}

export default function AboutPage() {
  const reduce = useReducedMotion()
  return (
    <div className="flex flex-col">
      {/* Hero */}
      <section className="relative overflow-hidden border-b">
        <div className="hero-grid hero-fade-mask absolute inset-0" aria-hidden="true" />
        <div className="hero-atmosphere absolute inset-0" aria-hidden="true" />
        <div className="relative mx-auto max-w-7xl px-4 py-20 sm:px-6 sm:py-28 lg:px-8">
          <motion.div
            initial={reduce ? false : { opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mx-auto max-w-3xl text-center"
          >
            <p className="font-mono text-[11px] font-medium uppercase tracking-[0.22em] text-primary">
              About Appmigo
            </p>
            <h1 className="mt-3 font-heading text-4xl font-bold tracking-tighter sm:text-5xl lg:text-6xl">
              Simple mobile experiences, seriously crafted
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-muted-foreground">
              {company.description}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Stats */}
      <section className="border-b bg-muted/50 py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <SectionHeading align="center" eyebrow="Our impact" title="By the numbers" />
          </ScrollReveal>
          <div className="mx-auto mt-10 grid max-w-4xl grid-cols-2 gap-px overflow-hidden rounded-xl border bg-border lg:grid-cols-4">
            {company.stats.map((stat) => {
              const v = statValues[stat.label] ?? { n: Number(stat.value) || 0 }
              return (
                <div key={stat.label} className="bg-card p-8 text-center">
                  <div className="font-heading text-3xl font-bold tracking-tight text-primary">
                    <AnimatedCounter value={v.n} decimals={v.decimals ?? 0} suffix={v.suffix ?? ''} />
                  </div>
                  <div className="mt-1 text-sm text-muted-foreground">{stat.label}</div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <SectionHeading align="center" eyebrow="What we stand for" title="Our core values" />
          </ScrollReveal>
          <StaggerReveal className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {company.values.map((value) => {
              const Icon = iconMap[value.icon as keyof typeof iconMap]
              return (
                <StaggerChild key={value.title}>
                  <div className="h-full rounded-xl border bg-card p-6 transition-all duration-300 hover:-translate-y-1 hover:border-primary/25 hover:shadow-lg">
                    <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                      <Icon className="h-5 w-5" />
                    </div>
                    <h3 className="font-heading text-base font-semibold">{value.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{value.description}</p>
                  </div>
                </StaggerChild>
              )
            })}
          </StaggerReveal>
        </div>
      </section>

      {/* Offices */}
      <section className="border-t bg-muted/50 py-20 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <SectionHeading align="center" eyebrow="Where we are" title="Our location" />
          </ScrollReveal>
          <div className="mx-auto mt-10 grid max-w-3xl grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {company.offices.map((office) => (
              <ScrollReveal key={office.city}>
                <div className="rounded-xl border bg-card p-6">
                  <div className="mb-3 flex items-center gap-3">
                    <MapPin className="h-5 w-5 text-primary" />
                    <h3 className="font-heading text-lg font-semibold">{office.city}</h3>
                  </div>
                  <p className="text-sm text-muted-foreground">{office.address}</p>
                  <p className="text-sm text-muted-foreground">{office.country}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
