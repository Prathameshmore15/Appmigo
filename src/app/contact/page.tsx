'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import {
  CheckCircle, Mail, Clock, MessageCircle, HelpCircle, Bug, Trash2,
  ArrowRight, User, PenLine, Lock, Copy, Check, Zap, MapPin,
  CalendarDays, BookOpen, Play, Puzzle, Ghost, Spade,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Select } from '@/components/ui/select'
import { Card, CardContent } from '@/components/ui/card'
import { ScrollReveal } from '@/components/motion/scroll-reveal'
import { company } from '@/data/company'
import Link from 'next/link'
import { cn } from '@/lib/utils'

const contactSchema = z.object({
  name: z.string().min(2, 'Enter your name'),
  email: z.string().email('Enter a valid email'),
  subject: z.string().min(1, 'Select a subject'),
  message: z.string().min(10, 'Enter your message'),
})

type ContactForm = z.infer<typeof contactSchema>

const MAX_MESSAGE = 1000

const subjects = [
  { value: 'general', label: 'General Inquiry' },
  { value: 'support', label: 'Technical Support' },
  { value: 'press', label: 'Press / Media' },
  { value: 'partnership', label: 'Partnership' },
  { value: 'other', label: 'Other' },
]

const fieldIcon = 'h-[18px] w-[18px]'

const helpLinks = [
  { href: '/faq', icon: HelpCircle, iconClass: 'bg-primary/10 text-primary', title: 'Check FAQ', text: 'Quick answers to common questions' },
  { href: '/support/ai', icon: MessageCircle, iconClass: 'bg-accent/10 text-accent', title: 'AI Chat', text: '24/7 instant help' },
  { href: '/support/bug-report', icon: Bug, iconClass: 'bg-destructive/10 text-destructive', title: 'Bug Report', text: 'Report issues or submit a problem' },
  { href: '/account-deletion', icon: Trash2, iconClass: 'bg-warning/10 text-warning', title: 'Account Deletion', text: 'Request data removal' },
]

const handwriting = "'Segoe Script','Bradley Hand','Comic Sans MS',cursive"

const tiles = [
  { icon: Puzzle, cls: 'left-[2%] top-[16%] h-14 w-14', rot: '-10deg', delay: '0s', hide: 'hidden md:flex' },
  { icon: Ghost, cls: 'left-[5%] top-[42%] h-12 w-12', rot: '8deg', delay: '-2s', hide: 'hidden md:flex' },
  { icon: Play, cls: 'left-[3%] bottom-[16%] h-24 w-24', rot: '-8deg', delay: '-4s', hide: 'hidden sm:flex' },
  { icon: Spade, cls: 'right-[4%] top-[20%] h-14 w-14', rot: '10deg', delay: '-1s', hide: 'hidden md:flex' },
  { icon: Puzzle, cls: 'right-[7%] top-[44%] h-10 w-10', rot: '-12deg', delay: '-3s', hide: 'hidden md:flex' },
  { icon: Ghost, cls: 'right-[3%] top-[58%] h-12 w-12', rot: '6deg', delay: '-5s', hide: 'hidden lg:flex' },
  { icon: Play, cls: 'right-[9%] bottom-[22%] h-16 w-16', rot: '12deg', delay: '-2.5s', hide: 'hidden lg:flex' },
  { icon: Spade, cls: 'right-[3%] bottom-[8%] h-12 w-12', rot: '-6deg', delay: '-4.5s', hide: 'hidden lg:flex' },
]

function ContactBackdrop() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
      <div className="hero-grid absolute inset-0 opacity-80" />
      <div className="hero-atmosphere absolute inset-0" />
      {/* planet glow */}
      <div className="absolute -left-48 bottom-[-40px] h-[480px] w-[480px] rounded-full bg-[radial-gradient(circle_at_40%_40%,rgba(5,150,105,0.22),transparent_65%)] blur-2xl dark:bg-[radial-gradient(circle_at_40%_40%,rgba(52,211,153,0.16),transparent_65%)]" />
      {/* floating glass tiles */}
      {tiles.map((t, i) => (
        <div
          key={i}
          className={cn(
            'float-slow absolute items-center justify-center rounded-2xl border border-primary/25 bg-primary/[0.06] text-primary/60 shadow-[0_0_28px_rgba(5,150,105,0.12)] backdrop-blur-[2px] dark:border-primary/20 dark:bg-primary/[0.05] dark:shadow-[0_0_32px_rgba(52,211,153,0.1)]',
            t.cls,
            t.hide
          )}
          style={{ ['--float-rot' as string]: t.rot, animationDelay: t.delay }}
        >
          <t.icon className="h-1/2 w-1/2 fill-primary/10" />
        </div>
      ))}
      {/* handwritten annotations */}
      <p
        className="absolute right-[6%] top-[9%] hidden rotate-6 text-right text-lg leading-snug text-muted-foreground/60 lg:block"
        style={{ fontFamily: handwriting }}
      >
        Simple
        <br />
        Mobile
        <br />
        Experiences.
      </p>
      <p
        className="absolute bottom-[30%] right-[4%] hidden rotate-[-4deg] text-right text-lg leading-snug text-muted-foreground/60 xl:block"
        style={{ fontFamily: handwriting }}
      >
        Games
        <br />
        Ideas
        <br />
        People
        <br />
        Everywhere
      </p>
    </div>
  )
}

function MumbaiSkyline() {
  return (
    <svg
      viewBox="0 0 400 110"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      className="h-24 w-full text-primary/50"
      role="img"
      aria-label="Mumbai skyline line art"
    >
      <line x1="0" y1="104" x2="400" y2="104" />
      <rect x="14" y="66" width="26" height="38" />
      <rect x="46" y="78" width="18" height="26" />
      <rect x="70" y="58" width="22" height="46" />
      <line x1="74" y1="58" x2="74" y2="48" />
      <line x1="88" y1="58" x2="88" y2="48" />
      {/* Gateway arch */}
      <path d="M120 104 V60 h44 V104 M128 104 V68 h28 V104" />
      <path d="M128 68 Q142 50 156 68" />
      <rect x="139" y="38" width="6" height="14" />
      <circle cx="142" cy="34" r="2.5" />
      <rect x="172" y="72" width="24" height="32" />
      <rect x="202" y="60" width="20" height="44" />
      <line x1="206" y1="60" x2="206" y2="50" />
      <line x1="218" y1="60" x2="218" y2="50" />
      <rect x="228" y="80" width="30" height="24" />
      <rect x="264" y="66" width="22" height="38" />
      <rect x="292" y="76" width="26" height="28" />
      <rect x="324" y="62" width="20" height="42" />
      <circle cx="364" cy="40" r="16" />
      <line x1="348" y1="104" x2="380" y2="104" />
    </svg>
  )
}

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false)
  const [copied, setCopied] = useState(false)
  const { register, handleSubmit, watch, formState: { errors, isSubmitting } } = useForm<ContactForm>({
    resolver: zodResolver(contactSchema),
  })
  const messageLength = (watch('message') ?? '').length

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText('support@appmigo.com')
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      setCopied(false)
    }
  }

  const onSubmit = async () => {
    await new Promise(r => setTimeout(r, 1000))
    setSubmitted(true)
  }

  if (submitted) {
    return (
      <div className="relative overflow-hidden">
        <ContactBackdrop />
        <div className="relative mx-auto max-w-lg px-4 sm:px-6 lg:px-8 py-20 text-center">
          <motion.div initial={{ scale: 0.94, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }} className="space-y-4">
            <div className="inline-flex items-center justify-center h-16 w-16 rounded-full bg-primary/10 text-primary">
              <CheckCircle className="h-8 w-8" />
            </div>
            <p className="font-mono text-[11px] font-medium uppercase tracking-[0.22em] text-primary">Sent</p>
            <h1 className="font-heading text-2xl font-bold">Message sent!</h1>
            <p className="text-muted-foreground">We&apos;ll get back to you within 24 hours. Check your email for a confirmation.</p>
            <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
              <Button onClick={() => window.location.href = '/'} className="cursor-pointer">Return Home</Button>
              <Button variant="secondary" onClick={() => setSubmitted(false)} className="cursor-pointer">Send another</Button>
            </div>
          </motion.div>
        </div>
      </div>
    )
  }

  return (
    <div className="relative overflow-hidden">
      <ContactBackdrop />

      <div className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-14 sm:py-20">
        {/* Hero */}
        <div className="grid grid-cols-1 items-end gap-6 lg:grid-cols-[1fr_auto]">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}>
            <p className="font-mono text-[11px] font-medium uppercase tracking-[0.22em] text-primary">Contact</p>
            <h1 className="mt-3 font-heading text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tighter leading-[1.05]">
              Let&apos;s build something
              <br />
              worth <span className="text-primary">playing.</span>
            </h1>
            <p className="mt-4 max-w-xl text-lg text-muted-foreground">We&apos;d love to hear from you. Get in touch with our team.</p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.12, ease: [0.25, 0.1, 0.25, 1] }}
            className="justify-self-start lg:justify-self-end"
          >
            <p className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/[0.08] px-3.5 py-1.5 font-mono text-[11px] font-medium uppercase tracking-[0.18em] text-primary">
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-primary" />
              Appmigo&nbsp;&nbsp;/&nbsp;&nbsp;Online
            </p>
            <p className="mt-2.5 flex items-center gap-1.5 text-sm text-muted-foreground">
              <Zap className="h-4 w-4 text-primary" />
              Usually responds within 24h
            </p>
          </motion.div>
        </div>

        {/* Main */}
        <div className="mt-10 grid grid-cols-1 gap-6 lg:grid-cols-5">
          {/* Form */}
          <ScrollReveal className="lg:col-span-3">
            <Card className="transition-[box-shadow,border-color] duration-300 hover:border-primary/20 hover:shadow-lg">
              <CardContent className="p-6 sm:p-8">
                <div className="mb-7 flex items-center gap-3.5">
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                    <Mail className="h-5 w-5" />
                  </span>
                  <div>
                    <h2 className="font-heading text-xl font-bold tracking-tight">Send us a message</h2>
                    <p className="text-sm text-muted-foreground">Have a question, suggestion or just want to say hi? We&apos;re all ears!</p>
                  </div>
                </div>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                  <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                    <Input label="Name *" placeholder="Your name" icon={<User className={fieldIcon} />} error={errors.name?.message} {...register('name')} />
                    <Input label="Email *" type="email" placeholder="your@email.com" icon={<Mail className={fieldIcon} />} error={errors.email?.message} {...register('email')} />
                  </div>
                  <Select label="Subject *" placeholder="Select a subject" options={subjects} icon={<MessageCircle className={fieldIcon} />} error={errors.subject?.message} {...register('subject')} />
                  <div>
                    <Textarea
                      label="Message *"
                      placeholder="How can we help you?"
                      rows={5}
                      maxLength={MAX_MESSAGE}
                      icon={<PenLine className={fieldIcon} />}
                      error={errors.message?.message}
                      {...register('message')}
                    />
                    <p className="mt-1 text-right font-mono text-[11px] tabular-nums text-muted-foreground" aria-live="polite">
                      {messageLength}/{MAX_MESSAGE}
                    </p>
                  </div>
                  <Button
                    type="submit"
                    loading={isSubmitting}
                    className="h-14 w-full cursor-pointer justify-between rounded-xl pl-6 pr-2.5 text-[15px]"
                  >
                    <span>{isSubmitting ? 'Sending...' : 'Send Message'}</span>
                    <span className="flex h-10 w-10 items-center justify-center rounded-full bg-black/25" aria-hidden="true">
                      <ArrowRight className="h-5 w-5" />
                    </span>
                  </Button>
                  <p className="flex items-start gap-2 text-xs leading-relaxed text-muted-foreground">
                    <Lock className="mt-0.5 h-3.5 w-3.5 shrink-0" />
                    Your information is safe with us. We only use it to respond to your message.
                  </p>
                </form>
              </CardContent>
            </Card>
          </ScrollReveal>

          {/* Sidebar */}
          <div className="space-y-6 lg:col-span-2">
            <ScrollReveal delay={0.06}>
              <Card className="transition-[box-shadow,border-color] duration-300 hover:border-primary/20 hover:shadow-md">
                <CardContent className="p-6">
                  <div className="mb-5 flex items-center gap-3">
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                      <MessageCircle className="h-5 w-5" />
                    </span>
                    <h2 className="font-heading text-lg font-bold tracking-tight">Talk to Appmigo</h2>
                  </div>
                  <div className="space-y-4 text-sm">
                    <div className="flex items-start gap-3">
                      <Mail className="mt-0.5 h-5 w-5 shrink-0 text-muted-foreground" />
                      <div className="min-w-0 flex-1">
                        <p className="font-medium">Email</p>
                        <p className="truncate text-muted-foreground">support@appmigo.com</p>
                      </div>
                      <button
                        type="button"
                        onClick={copyEmail}
                        aria-label={copied ? 'Email copied' : 'Copy email address'}
                        className="rounded-md p-1.5 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                      >
                        {copied ? <Check className="h-4 w-4 text-primary" /> : <Copy className="h-4 w-4" />}
                      </button>
                    </div>
                    <div className="flex items-start gap-3">
                      <Clock className="mt-0.5 h-5 w-5 shrink-0 text-muted-foreground" />
                      <div>
                        <p className="font-medium">Response Time</p>
                        <p className="text-muted-foreground">Usually within 24 hours</p>
                      </div>
                    </div>
                    <Link href="/support/ai" className="group flex items-start gap-3 rounded-lg transition-colors">
                      <MessageCircle className="mt-0.5 h-5 w-5 shrink-0 text-muted-foreground transition-colors group-hover:text-primary" />
                      <div className="flex-1">
                        <p className="font-medium transition-colors group-hover:text-primary">AI Support</p>
                        <p className="text-muted-foreground">24/7 instant answers</p>
                      </div>
                      <ArrowRight className="mt-1 h-4 w-4 shrink-0 text-muted-foreground transition-all group-hover:translate-x-0.5 group-hover:text-primary" />
                    </Link>
                  </div>
                </CardContent>
              </Card>
            </ScrollReveal>

            <ScrollReveal delay={0.12}>
              <Card className="transition-[box-shadow,border-color] duration-300 hover:border-primary/20 hover:shadow-md">
                <CardContent className="p-6">
                  <div className="mb-1.5 flex items-center gap-3">
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                      <BookOpen className="h-5 w-5" />
                    </span>
                    <h2 className="font-heading text-lg font-bold tracking-tight">Before You Contact</h2>
                  </div>
                  <p className="mb-4 text-xs text-muted-foreground">Get quick answers or use our self-service options.</p>
                  <div className="space-y-2.5">
                    {helpLinks.map(link => (
                      <Link
                        key={link.title}
                        href={link.href}
                        className="group flex items-center gap-3 rounded-xl border border-transparent bg-muted/50 p-3 transition-all duration-200 hover:-translate-y-px hover:border-primary/20 hover:bg-muted"
                      >
                        <span className={cn('flex h-10 w-10 shrink-0 items-center justify-center rounded-lg', link.iconClass)}>
                          <link.icon className="h-5 w-5" />
                        </span>
                        <span className="min-w-0 flex-1">
                          <span className="block text-sm font-medium">{link.title}</span>
                          <span className="block truncate text-xs text-muted-foreground">{link.text}</span>
                        </span>
                        <ArrowRight className="h-4 w-4 shrink-0 text-muted-foreground transition-all group-hover:translate-x-0.5 group-hover:text-primary" />
                      </Link>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </ScrollReveal>
          </div>
        </div>

        {/* Location strip */}
        <ScrollReveal className="mt-6">
          <Card>
            <CardContent className="flex flex-col gap-6 p-6 sm:p-7 md:flex-row md:items-center">
              <div className="flex items-start gap-4">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  <MapPin className="h-5 w-5" />
                </span>
                <div>
                  <p className="font-mono text-[11px] font-medium uppercase tracking-[0.22em] text-primary">Our location</p>
                  <p className="mt-1 font-heading text-lg font-bold tracking-tight">{company.offices[0].city}, {company.offices[0].country}</p>
                  <p className="mt-1 max-w-sm text-sm text-muted-foreground">A solo indie game studio creating simple mobile experiences for players worldwide.</p>
                </div>
              </div>
              <div className="hidden h-16 w-px shrink-0 bg-border md:block" aria-hidden="true" />
              <div className="flex items-start gap-4">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  <CalendarDays className="h-5 w-5" />
                </span>
                <div>
                  <p className="font-mono text-[11px] font-medium uppercase tracking-[0.22em] text-primary">Founded</p>
                  <p className="mt-1 font-heading text-lg font-bold tracking-tight">{company.founded}</p>
                  <p className="mt-1 max-w-[220px] text-sm text-muted-foreground">Indie game studio by {company.developer}.</p>
                </div>
              </div>
              <div className="min-w-0 flex-1 md:pl-4">
                <MumbaiSkyline />
              </div>
            </CardContent>
          </Card>
        </ScrollReveal>
      </div>
    </div>
  )
}
