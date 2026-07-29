'use client'

import { motion } from 'framer-motion'
import { Heart, BarChart3, Lightbulb, Star, MapPin } from 'lucide-react'
import { company } from '@/data/company'
import { AnimatedText } from '@/components/ui/animated-text'

const iconMap = {
  Heart,
  BarChart3,
  Lightbulb,
  Star,
}

export default function AboutPage() {
  return (
    <div className="flex flex-col">
      {/* Hero */}
      <section className="relative overflow-hidden border-b">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/[0.03] via-transparent to-accent/[0.03]" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-24 sm:py-32">
          <motion.div
            initial={{ opacity: 0, y: 32 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="max-w-2xl"
          >
            <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tighter leading-[1.05]">
              <AnimatedText text="About Appmigo" variant="typewriter" />
            </h1>
            <p className="mt-5 text-lg text-muted-foreground/80 max-w-md leading-relaxed">
              <AnimatedText text={company.description} variant="wave" delay={500} />
            </p>
          </motion.div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-24 sm:py-28 bg-muted/50 border-y">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-px rounded-xl overflow-hidden border bg-border">
            {company.stats.map((stat) => (
              <div key={stat.label} className="bg-card p-8 text-center">
                <div className="font-heading text-3xl font-bold tracking-tight text-primary">{stat.value}</div>
                <div className="text-sm text-muted-foreground mt-1">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-24 sm:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <p className="text-xs font-semibold text-primary tracking-widest uppercase mb-3">Our Values</p>
            <h2 className="font-heading text-3xl sm:text-4xl font-bold tracking-tight">What drives us</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {company.values.map((value, i) => {
              const Icon = iconMap[value.icon as keyof typeof iconMap]
              return (
                <motion.div
                  key={value.title}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  className="rounded-xl border bg-card p-6"
                >
                  <div className="rounded-lg w-10 h-10 flex items-center justify-center mb-4 bg-primary/10 text-primary">
                    <Icon className="h-5 w-5" />
                  </div>
                  <h3 className="font-heading text-base font-semibold mb-2">{value.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{value.description}</p>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Offices */}
      <section className="py-24 sm:py-28 bg-muted/50 border-y">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <p className="text-xs font-semibold text-primary tracking-widest uppercase mb-3">Locations</p>
            <h2 className="font-heading text-3xl sm:text-4xl font-bold tracking-tight">Our offices</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {company.offices.map((office) => (
              <div key={office.city} className="rounded-xl border bg-card p-6">
                <div className="flex items-center gap-3 mb-3">
                  <MapPin className="h-5 w-5 text-primary" />
                  <h3 className="font-heading text-lg font-semibold">{office.city}</h3>
                </div>
                <p className="text-sm text-muted-foreground">{office.address}</p>
                <p className="text-sm text-muted-foreground">{office.country}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
