'use client'

import { motion, useReducedMotion } from 'framer-motion'
import { Heart, BarChart3, Lightbulb, Star, MapPin, Mail, Clock, Compass } from 'lucide-react'
import { company } from '@/data/company'
import { ScrollReveal, StaggerReveal, StaggerChild } from '@/components/motion/scroll-reveal'
import { SectionHeading } from '@/components/ui/section-heading'
import { GeometricBackdrop } from '@/components/motion/geometric-backdrop'
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

      {/* Location */}
      <section className="relative overflow-hidden border-t bg-muted/50 py-20 sm:py-24">
        <GeometricBackdrop className="inset-x-0 top-0 bottom-auto h-[560px]" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <SectionHeading
              align="center"
              eyebrow="Where we are"
              title="Our location"
              description="A solo studio based in Mumbai, building for players everywhere."
            />
          </ScrollReveal>
          <div className="mx-auto mt-12 grid max-w-5xl grid-cols-1 gap-6 lg:grid-cols-5">
            {company.offices.map((office) => (
              <ScrollReveal key={office.city} className="lg:col-span-3">
                <div className="flex h-full flex-col overflow-hidden rounded-xl border bg-card transition-[box-shadow,border-color] duration-300 hover:border-primary/25 hover:shadow-lg sm:flex-row">
                  <div className="relative flex min-h-52 items-center justify-center overflow-hidden bg-gradient-to-br from-primary/[0.12] via-card to-accent/[0.07] p-8 sm:w-60 sm:shrink-0">
                    <div aria-hidden="true" className="absolute h-44 w-44 rounded-full border border-primary/20" />
                    <div aria-hidden="true" className="absolute h-32 w-32 rounded-full border border-primary/25" />
                    <div aria-hidden="true" className="absolute h-20 w-20 rounded-full border border-primary/30" />
                    <span className="relative flex items-center justify-center rounded-2xl bg-primary text-on-primary shadow-lg" style={{ width: '3.25rem', height: '3.25rem' }}>
                      <MapPin className="h-6 w-6" />
                    </span>
                    <span className="absolute h-2 w-2 animate-pulse rounded-full bg-primary" aria-hidden="true" />
                  </div>
                  <div className="flex-1 p-6 sm:p-8">
                    <p className="font-mono text-[11px] font-medium uppercase tracking-[0.22em] text-primary">
                      Headquarters
                    </p>
                    <h3 className="mt-2 font-heading text-2xl font-bold tracking-tight">{office.city}</h3>
                    <p className="mt-1 text-sm text-muted-foreground">{office.address}, {office.country}</p>
                    <dl className="mt-6 space-y-3.5 text-sm">
                      <div className="flex items-center gap-3">
                        <Compass className="h-4 w-4 shrink-0 text-muted-foreground" />
                        <dt className="sr-only">Coordinates</dt>
                        <dd className="font-mono text-xs tabular-nums text-muted-foreground">19.0760&deg; N, 72.8777&deg; E</dd>
                      </div>
                      <div className="flex items-center gap-3">
                        <Clock className="h-4 w-4 shrink-0 text-muted-foreground" />
                        <dt className="sr-only">Timezone</dt>
                        <dd className="text-muted-foreground">IST (UTC+5:30)</dd>
                      </div>
                      <div className="flex items-center gap-3">
                        <Mail className="h-4 w-4 shrink-0 text-muted-foreground" />
                        <dt className="sr-only">Email</dt>
                        <dd>
                          <a href="mailto:support@appmigo.com" className="link-underline text-foreground transition-colors hover:text-primary">
                            support@appmigo.com
                          </a>
                        </dd>
                      </div>
                    </dl>
                  </div>
                </div>
              </ScrollReveal>
            ))}
            <ScrollReveal delay={0.1} className="lg:col-span-2">
              <div className="flex h-full flex-col justify-center gap-1 rounded-xl border bg-card p-6 transition-[box-shadow,border-color] duration-300 hover:border-primary/25 hover:shadow-lg sm:p-7">
                {[
                  { label: 'Founded', value: String(company.founded) },
                  { label: 'Studio', value: `Solo · ${company.developer}` },
                  { label: 'Availability', value: 'Responds within 24 hours' },
                ].map((fact, i) => (
                  <div key={fact.label} className={i > 0 ? 'border-t border-border/60 pt-4 mt-4' : ''}>
                    <p className="font-mono text-[11px] font-medium uppercase tracking-[0.22em] text-primary">{fact.label}</p>
                    <p className="mt-1.5 font-heading text-lg font-semibold tracking-tight">{fact.value}</p>
                  </div>
                ))}
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>
    </div>
  )
}
