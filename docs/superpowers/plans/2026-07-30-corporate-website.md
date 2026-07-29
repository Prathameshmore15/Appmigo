# Appmigo Corporate Website Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Transform the Appmigo support portal into a corporate website similar to Easybrain, showcasing games, company information, news, and contact details.

**Architecture:** Restructure the existing Next.js app with a new home page, About page, News/Blog page, and updated Contact page. Add a design system with new colors and fonts.

**Tech Stack:** Next.js 16, TypeScript, Tailwind CSS, Framer Motion, Lucide icons

## Global Constraints

- Next.js 16.2.12 (Turbopack)
- TypeScript 5.x
- Tailwind CSS 4
- Framer Motion for animations
- Existing components and utilities

---

## File Structure

```
src/
├── app/
│   ├── page.tsx                    # Home page (redesigned)
│   ├── about/
│   │   └── page.tsx                # About page (new)
│   ├── news/
│   │   ├── page.tsx                # News listing (new)
│   │   └── [id]/
│   │       └── page.tsx            # News article (new)
│   ├── contact/
│   │   └── page.tsx                # Contact page (updated)
│   └── games/
│       └── page.tsx                # Games page (updated)
├── components/
│   ├── layout/
│   │   ├── header.tsx              # Navigation (updated)
│   │   └── footer.tsx              # Footer (updated)
│   └── ui/
│       └── ...                     # Existing UI components
├── data/
│   ├── games.ts                    # Games data (existing)
│   ├── news.ts                     # News articles (new)
│   └── company.ts                  # Company info (new)
└── lib/
    └── utils.ts                    # Utilities (existing)
```

---

## Task 1: Create Design System

**Files:**
- Create: `src/lib/design-system.ts`
- Modify: `src/app/globals.css`

**Interfaces:**
- Consumes: None (first task)
- Produces: Design tokens, color palette, typography

- [ ] **Step 1: Create design system file**

```typescript
// src/lib/design-system.ts
export const designSystem = {
  colors: {
    primary: {
      DEFAULT: '#059669', // Emerald green (trust, gaming)
      light: '#10B981',
      dark: '#047857',
    },
    accent: {
      DEFAULT: '#F59E0B', // Amber (energy, creativity)
      light: '#FBBF24',
      dark: '#D97706',
    },
    background: {
      DEFAULT: '#FFFFFF',
      dark: '#0B0C10',
    },
    text: {
      DEFAULT: '#111827',
      muted: '#6B7280',
    },
  },
  fonts: {
    heading: 'Sora, sans-serif',
    body: 'Inter, sans-serif',
    mono: 'JetBrains Mono, monospace',
  },
  spacing: {
    section: 'py-24 sm:py-32',
    container: 'max-w-7xl mx-auto px-4 sm:px-6 lg:px-8',
  },
} as const
```

- [ ] **Step 2: Update globals.css with new theme**

Add the following to `src/app/globals.css`:

```css
@layer base {
  :root {
    --color-primary: 5 150 105; /* #059669 */
    --color-accent: 245 158 11; /* #F59E0B */
  }
  
  .dark {
    --color-primary: 16 185 129; /* #10B981 */
    --color-accent: 251 191 36; /* #FBBF24 */
  }
}
```

- [ ] **Step 3: Commit**

```bash
git add src/lib/design-system.ts src/app/globals.css
git commit -m "feat: add design system with corporate brand colors"
```

---

## Task 2: Create Company Data

**Files:**
- Create: `src/data/company.ts`
- Create: `src/data/news.ts`

**Interfaces:**
- Consumes: None
- Produces: Company info, news articles

- [ ] **Step 1: Create company data**

```typescript
// src/data/company.ts
export const company = {
  name: 'Appmigo',
  tagline: 'Simple Mobile Experiences',
  description: 'Appmigo is a mobile game developer focused on creating engaging puzzle and brain-training games that millions of players love.',
  founded: 2024,
  stats: [
    { value: '10M+', label: 'Downloads' },
    { value: '50+', label: 'Team Members' },
    { value: '12', label: 'Games Published' },
    { value: '4.5', label: 'Avg. Rating' },
  ],
  values: [
    {
      title: 'Player-First',
      description: 'Every decision starts with what\'s best for our players.',
      icon: 'Heart',
    },
    {
      title: 'Data-Driven',
      description: 'We measure everything to make informed decisions.',
      icon: 'BarChart3',
    },
    {
      title: 'Innovation',
      description: 'We push boundaries to create unique gaming experiences.',
      icon: 'Lightbulb',
    },
    {
      title: 'Quality',
      description: 'We never compromise on the quality of our games.',
      icon: 'Star',
    },
  ],
  offices: [
    {
      city: 'Mumbai',
      address: '123 Gaming Street, Andheri West',
      country: 'India',
    },
  ],
  social: {
    linkedin: '#',
    facebook: '#',
    instagram: '#',
    twitter: '#',
  },
} as const

export type Company = typeof company
```

- [ ] **Step 2: Create news data**

```typescript
// src/data/news.ts
export interface NewsArticle {
  id: string
  title: string
  excerpt: string
  content: string
  publishedAt: string
  category: 'announcement' | 'update' | 'milestone'
  imageUrl?: string
}

export const newsArticles: NewsArticle[] = [
  {
    id: 'welcome-to-appmigo',
    title: 'Welcome to Appmigo',
    excerpt: 'We\'re excited to launch our new corporate website and share our journey with you.',
    content: 'Appmigo was founded with a simple mission: create mobile games that bring joy and mental stimulation to millions of players worldwide. Today, we\'re taking a big step forward by launching our new corporate website.',
    publishedAt: '2024-01-15',
    category: 'announcement',
  },
  {
    id: 'pixel-quest-launch',
    title: 'Pixel Quest Now Available',
    excerpt: 'Our latest puzzle adventure game is now available on Google Play.',
    content: 'We\'re thrilled to announce the launch of Pixel Quest, our newest puzzle adventure game. With over 100 levels of challenging puzzles, Pixel Quest combines classic gameplay with modern visuals.',
    publishedAt: '2024-01-10',
    category: 'update',
  },
  {
    id: '10-million-downloads',
    title: '10 Million Downloads Milestone',
    excerpt: 'We\'ve reached 10 million downloads across all our games!',
    content: 'This is a tremendous milestone for our team. What started as a small indie studio has grown into a beloved game developer with millions of players worldwide.',
    publishedAt: '2024-01-05',
    category: 'milestone',
  },
]
```

- [ ] **Step 3: Commit**

```bash
git add src/data/company.ts src/data/news.ts
git commit -m "feat: add company and news data"
```

---

## Task 3: Update Navigation

**Files:**
- Modify: `src/components/layout/header.tsx:14-36`

**Interfaces:**
- Consumes: None
- Produces: Updated navigation structure

- [ ] **Step 1: Update navItems array**

Replace the existing `navItems` array in `header.tsx`:

```typescript
const navItems = [
  { label: 'Games', href: '/games' },
  { label: 'About', href: '/about' },
  { label: 'News', href: '/news' },
  { label: 'Contact', href: '/contact' },
  {
    label: 'Support',
    href: '/support',
    children: [
      { label: 'AI Chat', href: '/support/ai', icon: MessageCircle },
      { label: 'Bug Report', href: '/support/bug-report', icon: Bug },
      { label: 'FAQ', href: '/faq', icon: HelpCircle },
    ],
  },
  {
    label: 'Legal',
    children: [
      { label: 'Privacy Policy', href: '/privacy', icon: Shield },
      { label: 'Terms & Conditions', href: '/terms', icon: FileText },
      { label: 'Account Deletion', href: '/account-deletion', icon: Trash2 },
    ],
  },
]
```

- [ ] **Step 2: Commit**

```bash
git add src/components/layout/header.tsx
git commit -m "feat: update navigation for corporate site"
```

---

## Task 4: Create About Page

**Files:**
- Create: `src/app/about/page.tsx`

**Interfaces:**
- Consumes: `company` from `@/data/company`
- Produces: About page

- [ ] **Step 1: Create About page**

```tsx
// src/app/about/page.tsx
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
```

- [ ] **Step 2: Commit**

```bash
git add src/app/about/page.tsx
git commit -m "feat: add About page"
```

---

## Task 5: Create News Pages

**Files:**
- Create: `src/app/news/page.tsx`
- Create: `src/app/news/[id]/page.tsx`

**Interfaces:**
- Consumes: `newsArticles` from `@/data/news`
- Produces: News listing and article pages

- [ ] **Step 1: Create News listing page**

```tsx
// src/app/news/page.tsx
'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { Calendar, ArrowRight } from 'lucide-react'
import { newsArticles } from '@/data/news'
import { AnimatedText } from '@/components/ui/animated-text'
import { Badge } from '@/components/ui/badge'

const categoryColors = {
  announcement: 'primary',
  update: 'accent',
  milestone: 'default',
} as const

export default function NewsPage() {
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
              <AnimatedText text="News & Updates" variant="typewriter" />
            </h1>
            <p className="mt-5 text-lg text-muted-foreground/80 max-w-md leading-relaxed">
              <AnimatedText text="Stay up to date with the latest from Appmigo." variant="wave" delay={500} />
            </p>
          </motion.div>
        </div>
      </section>

      {/* News Grid */}
      <section className="py-24 sm:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {newsArticles.map((article, i) => (
              <motion.div
                key={article.id}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
              >
                <Link href={`/news/${article.id}`} className="group block">
                  <article className="rounded-xl border bg-card p-6 h-full transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:border-primary/20">
                    <div className="flex items-center gap-2 mb-4">
                      <Badge variant={categoryColors[article.category]} className="text-xs">
                        {article.category}
                      </Badge>
                      <span className="flex items-center gap-1 text-xs text-muted-foreground">
                        <Calendar className="h-3 w-3" />
                        {new Date(article.publishedAt).toLocaleDateString()}
                      </span>
                    </div>
                    <h2 className="font-heading text-lg font-semibold mb-2 group-hover:text-primary transition-colors">
                      {article.title}
                    </h2>
                    <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                      {article.excerpt}
                    </p>
                    <span className="inline-flex items-center gap-1 text-sm font-medium text-primary">
                      Read more <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-1 transition-transform" />
                    </span>
                  </article>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
```

- [ ] **Step 2: Create News article page**

```tsx
// src/app/news/[id]/page.tsx
'use client'

import Link from 'next/link'
import { useParams } from 'next/navigation'
import { motion } from 'framer-motion'
import { Calendar, ArrowLeft } from 'lucide-react'
import { newsArticles } from '@/data/news'
import { AnimatedText } from '@/components/ui/animated-text'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'

const categoryColors = {
  announcement: 'primary',
  update: 'accent',
  milestone: 'default',
} as const

export default function NewsArticlePage() {
  const params = useParams()
  const article = newsArticles.find(a => a.id === params.id)

  if (!article) {
    return (
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-24 text-center">
        <h1 className="font-heading text-2xl font-bold mb-4">Article not found</h1>
        <Link href="/news">
          <Button variant="secondary">Back to news</Button>
        </Link>
      </div>
    )
  }

  return (
    <div className="flex flex-col">
      {/* Hero */}
      <section className="relative overflow-hidden border-b">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/[0.03] via-transparent to-accent/[0.03]" />
        <div className="relative mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-24 sm:py-32">
          <motion.div
            initial={{ opacity: 0, y: 32 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <Link href="/news" className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground mb-6">
              <ArrowLeft className="h-4 w-4" />
              Back to news
            </Link>
            <div className="flex items-center gap-2 mb-4">
              <Badge variant={categoryColors[article.category]} className="text-xs">
                {article.category}
              </Badge>
              <span className="flex items-center gap-1 text-xs text-muted-foreground">
                <Calendar className="h-3 w-3" />
                {new Date(article.publishedAt).toLocaleDateString()}
              </span>
            </div>
            <h1 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tighter leading-[1.05]">
              <AnimatedText text={article.title} variant="typewriter" />
            </h1>
          </motion.div>
        </div>
      </section>

      {/* Content */}
      <section className="py-16 sm:py-20">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="prose prose-gray dark:prose-invert max-w-none"
          >
            <p className="text-lg text-muted-foreground leading-relaxed">
              {article.content}
            </p>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
```

- [ ] **Step 3: Commit**

```bash
git add src/app/news/
git commit -m "feat: add News pages"
```

---

## Task 6: Update Home Page

**Files:**
- Modify: `src/app/page.tsx`

**Interfaces:**
- Consumes: `games`, `company`, `newsArticles`
- Produces: Redesigned home page

- [ ] **Step 1: Rewrite home page**

Replace the entire content of `src/app/page.tsx` with a corporate-style home page similar to Easybrain:

```tsx
'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowRight, ChevronRight, Calendar } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { GameCard } from '@/components/cards/game-card'
import { AnimatedText } from '@/components/ui/animated-text'
import { games } from '@/data/games'
import { company } from '@/data/company'
import { newsArticles } from '@/data/news'

const latestGames = games.slice(0, 4)
const latestNews = newsArticles.slice(0, 2)

export default function Home() {
  return (
    <div className="flex flex-col">
      {/* ── Hero ── */}
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
              <AnimatedText text="Simple Mobile" variant="typewriter" as="span" />
              <br />
              <AnimatedText text="Experiences" variant="typewriter" as="span" color="primary" />
            </h1>
            <p className="mt-5 text-lg text-muted-foreground/80 max-w-md leading-relaxed">
              <AnimatedText
                text="Appmigo creates mobile games that bring joy and mental stimulation to millions of players worldwide."
                variant="wave"
                delay={500}
              />
            </p>
            <div className="mt-10 flex flex-wrap items-center gap-3">
              <Link href="/games">
                <Button size="lg" className="cursor-pointer gap-2">
                  View our games
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </Link>
              <Link href="/about">
                <Button variant="secondary" size="lg" className="cursor-pointer">
                  Learn more
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── Stats ── */}
      <section className="py-16 sm:py-20 bg-muted/50 border-y">
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

      {/* ── Games ── */}
      <section className="py-24 sm:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-end justify-between mb-12">
            <div>
              <p className="text-xs font-semibold text-primary tracking-widest uppercase mb-3">
                <AnimatedText text="Our games" variant="typewriter" />
              </p>
              <h2 className="font-heading text-3xl sm:text-4xl font-bold tracking-tight">
                <AnimatedText text="Featured titles" variant="typewriter" />
              </h2>
            </div>
            <Link href="/games" className="hidden sm:flex items-center gap-1 text-sm font-medium text-primary hover:gap-2 transition-all">
              View all <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {latestGames.map((game, i) => (
              <GameCard key={game.id} game={game} index={i} />
            ))}
          </div>
          <div className="mt-8 text-center sm:hidden">
            <Link href="/games">
              <Button variant="secondary" className="cursor-pointer">
                View all games <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* ── News ── */}
      <section className="py-24 sm:py-28 bg-muted/50 border-y">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-end justify-between mb-12">
            <div>
              <p className="text-xs font-semibold text-primary tracking-widest uppercase mb-3">
                <AnimatedText text="News" variant="typewriter" />
              </p>
              <h2 className="font-heading text-3xl sm:text-4xl font-bold tracking-tight">
                <AnimatedText text="Latest updates" variant="typewriter" />
              </h2>
            </div>
            <Link href="/news" className="hidden sm:flex items-center gap-1 text-sm font-medium text-primary hover:gap-2 transition-all">
              View all <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {latestNews.map((article, i) => (
              <motion.div
                key={article.id}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
              >
                <Link href={`/news/${article.id}`} className="group block">
                  <article className="rounded-xl border bg-card p-6 h-full transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:border-primary/20">
                    <div className="flex items-center gap-2 mb-4">
                      <span className="flex items-center gap-1 text-xs text-muted-foreground">
                        <Calendar className="h-3 w-3" />
                        {new Date(article.publishedAt).toLocaleDateString()}
                      </span>
                    </div>
                    <h3 className="font-heading text-lg font-semibold mb-2 group-hover:text-primary transition-colors">
                      {article.title}
                    </h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {article.excerpt}
                    </p>
                  </article>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-20 sm:py-24">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-heading text-3xl sm:text-4xl font-bold tracking-tight">
            <AnimatedText text="Ready to play?" variant="typewriter" />
          </h2>
          <p className="mt-4 text-muted-foreground/80 max-w-md mx-auto">
            <AnimatedText text="Download our games and join millions of players worldwide." variant="wave" />
          </p>
          <div className="mt-10">
            <Link href="/games">
              <Button size="lg" className="cursor-pointer gap-2">
                Browse games
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
```

- [ ] **Step 2: Commit**

```bash
git add src/app/page.tsx
git commit -m "feat: redesign home page for corporate site"
```

---

## Task 7: Update Footer

**Files:**
- Modify: `src/components/layout/footer.tsx`

**Interfaces:**
- Consumes: `company` from `@/data/company`
- Produces: Updated footer

- [ ] **Step 1: Update footer with company info**

Update the footer to include company information, social links, and navigation.

- [ ] **Step 2: Commit**

```bash
git add src/components/layout/footer.tsx
git commit -m "feat: update footer with company info"
```

---

## Task 8: Update Metadata

**Files:**
- Modify: `src/app/layout.tsx:30-69`

**Interfaces:**
- Consumes: None
- Produces: Updated metadata

- [ ] **Step 1: Update metadata**

Update the metadata in `layout.tsx` to reflect the corporate site:

```typescript
export const metadata: Metadata = {
  title: {
    default: "Appmigo — Simple Mobile Experiences",
    template: "%s | Appmigo",
  },
  description:
    "Appmigo creates mobile games that bring joy and mental stimulation to millions of players worldwide.",
  keywords: [
    "Appmigo",
    "mobile games",
    "puzzle games",
    "brain training",
    "Android games",
    "iOS games",
  ],
  openGraph: {
    title: "Appmigo — Simple Mobile Experiences",
    description:
      "Appmigo creates mobile games that bring joy and mental stimulation to millions of players worldwide.",
    siteName: "Appmigo",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Appmigo — Simple Mobile Experiences",
    description:
      "Appmigo creates mobile games that bring joy and mental stimulation to millions of players worldwide.",
  },
  icons: {
    icon: [
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/favicon.ico', sizes: 'any' },
    ],
    apple: '/appmigo-icon.svg',
  },
  robots: {
    index: true,
    follow: true,
  },
};
```

- [ ] **Step 2: Commit**

```bash
git add src/app/layout.tsx
git commit -m "feat: update metadata for corporate site"
```

---

## Summary

| Task | Description | Files |
|------|-------------|-------|
| 1 | Create Design System | design-system.ts, globals.css |
| 2 | Create Company Data | company.ts, news.ts |
| 3 | Update Navigation | header.tsx |
| 4 | Create About Page | about/page.tsx |
| 5 | Create News Pages | news/page.tsx, news/[id]/page.tsx |
| 6 | Update Home Page | page.tsx |
| 7 | Update Footer | footer.tsx |
| 8 | Update Metadata | layout.tsx |

**Total Files Created:** 5
**Total Files Modified:** 4
