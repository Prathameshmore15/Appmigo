# Hero Text Animation Design Spec

**Date:** 2026-07-30  
**Project:** Appmigo Support Portal  
**Component:** Homepage Hero Section

---

## Overview

Animate the hero headline ("Built for players. Built for trust.") and subtitle with a two-phase sequence:
1. **Wave** — "Built for players." flows in with pronounced motion
2. **Typewriter** — "Built for trust." types out character-by-character in accent color
3. **Word-by-word typewriter** — subtitle appears at natural reading pace

All animations respect `prefers-reduced-motion` and trigger on scroll into view.

---

## Animation Specifications

### 1. "Built for players." — Wave Animation

| Property | Value |
|----------|-------|
| **Granularity** | Word-level |
| **Initial state** | `opacity: 0`, `y: 30px`, `filter: blur(8px)` |
| **Animated state** | `opacity: 1`, `y: 0`, `filter: blur(0)` |
| **Stagger** | 100ms per word |
| **Duration** | 600ms per word |
| **Easing** | `[0.25, 0.1, 0.25, 1]` (ease-out elastic feel) |
| **Total time** | ~1.2s for 4 words |
| **Color** | Inherits `text-primary` (green) |

**Words:** `["Built", "for", "players."]`

---

### 2. "Built for trust." — Typewriter Animation

| Property | Value |
|----------|-------|
| **Granularity** | Character-level |
| **Initial state** | `opacity: 0` |
| **Animated state** | `opacity: 1` |
| **Stagger** | 30ms per character |
| **Duration** | 30ms per character (no easing, instant pop) |
| **Total time** | ~1.5s for 15 characters |
| **Color** | `text-accent` (`#B8860B` / `#D4A017` dark) |
| **Cursor** | None (clean typewriter) |
| **Start delay** | 200ms after wave begins (overlap) |

**Characters:** `"Built for trust."` (15 chars including spaces)

---

### 3. Subtitle — Word-by-Word Typewriter

| Property | Value |
|----------|-------|
| **Text** | "The official support portal for Appmigo Android games. Find help, explore our games, and manage your account." |
| **Granularity** | Word-level |
| **Stagger** | 80ms per word |
| **Duration** | 300ms per word (ease-out) |
| **Initial state** | `opacity: 0`, `y: 10px` |
| **Animated state** | `opacity: 1`, `y: 0` |
| **Color** | `text-muted-foreground/80` |
| **Start delay** | 300ms after headline starts |

---

## Trigger & Accessibility

| Aspect | Implementation |
|--------|----------------|
| **Trigger** | `whileInView` with `viewport={{ once: true, margin: "-100px" }}` |
| **Reduced motion** | `prefers-reduced-motion: reduce` → instant `opacity: 1`, no transform |
| **SSR** | Initial `opacity: 0` via `initial` prop; no layout shift |
| **Performance** | `transform` + `opacity` only (GPU-accelerated); `will-change` on animated spans |

---

## Component Architecture

### New Component: `AnimatedText.tsx`

```typescript
type AnimationVariant = 'wave' | 'typewriter' | 'word-typewriter'
type Granularity = 'character' | 'word'

interface AnimatedTextProps {
  text: string
  variant: AnimationVariant
  granularity?: Granularity
  className?: string
  as?: HeadingTag
  color?: 'primary' | 'accent' | 'muted' | 'inherit'
  delay?: number // ms before starting
}
```

### Usage in `page.tsx`

```tsx
<h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tighter leading-[1.05] flex flex-wrap justify-center gap-x-2">
  <AnimatedText 
    text="Built for players." 
    variant="wave" 
    as="span" 
  />
  <AnimatedText 
    text="Built for trust." 
    variant="typewriter" 
    as="span" 
    color="accent"
    delay={200}
  />
</h1>

<p className="mt-5 text-lg text-muted-foreground/80 max-w-md mx-auto leading-relaxed">
  <AnimatedText 
    text="The official support portal for Appmigo Android games. Find help, explore our games, and manage your account."
    variant="word-typewriter"
    delay={300}
  />
</p>
```

---

## Framer Motion Variants

```typescript
const variants = {
  wave: {
    initial: { opacity: 0, y: 30, filter: 'blur(8px)' },
    animate: { opacity: 1, y: 0, filter: 'blur(0px)' },
    transition: { duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }
  },
  typewriter: {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    transition: { duration: 0.03 } // per character
  },
  'word-typewriter': {
    initial: { opacity: 0, y: 10 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }
  }
}
```

---

## File Changes

| File | Change |
|------|--------|
| `src/components/ui/animated-text.tsx` | **New** — AnimatedText component with variants |
| `src/app/page.tsx` | Update hero to use `<AnimatedText>` instead of `<StaggeredText>` |
| `src/components/ui/staggered-text.tsx` | Keep for other uses (no changes) |

---

## Testing Checklist

- [ ] Wave animation plays on scroll into view
- [ ] Typewriter starts 200ms after wave begins
- [ ] Subtitle starts 300ms after headline
- [ ] Accent color applied to "Built for trust."
- [ ] No cursor during typewriter
- [ ] `prefers-reduced-motion` → instant reveal
- [ ] No layout shift on load (SSR opacity: 0)
- [ ] Works in dark mode (accent color adjusts)
- [ ] Mobile: text wraps correctly, animations sync

---

## Out of Scope

- Background grid/shimmer animations (already exist)
- CTA button animations (already use Framer Motion)
- Other page sections