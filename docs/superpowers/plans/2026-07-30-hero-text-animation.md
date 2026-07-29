# Hero Text Animation Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace `StaggeredText` in the hero section with a new `AnimatedText` component that supports wave, typewriter, and word-typewriter animations triggered on scroll.

**Architecture:** Create a new `AnimatedText` component in `src/components/ui/animated-text.tsx` with Framer Motion variants for three animation types. Update `src/app/page.tsx` to use the new component for the hero headline and subtitle. Keep existing `StaggeredText` for other sections.

**Tech Stack:** Next.js 16, React 19, Framer Motion 12, Tailwind CSS 4, TypeScript

## Global Constraints

- Respect `prefers-reduced-motion: reduce` → instant reveal
- No layout shift on SSR (initial `opacity: 0` via `initial` prop)
- GPU-accelerated animations only (`transform`, `opacity`, `filter`)
- Use existing color tokens: `text-primary`, `text-accent`, `text-muted-foreground`
- Dark mode accent color: `#D4A017`
- Framer Motion `whileInView` with `viewport={{ once: true, margin: "-100px" }}`
- Stagger delays: wave=100ms/word, typewriter=30ms/char, word-typewriter=80ms/word

---

### Task 1: Create AnimatedText Component

**Files:**
- Create: `src/components/ui/animated-text.tsx`
- Test: `src/components/ui/__tests__/animated-text.test.tsx` (optional, manual verification in browser)

**Interfaces:**
- Produces: `AnimatedText` component with props:
  ```typescript
  interface AnimatedTextProps {
    text: string
    variant: 'wave' | 'typewriter' | 'word-typewriter'
    className?: string
    as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p' | 'span'
    color?: 'primary' | 'accent' | 'muted' | 'inherit'
    delay?: number // ms before animation starts
  }
  ```

- [ ] **Step 1: Write the component**

```tsx
'use client'

import { motion, HTMLMotionProps } from 'framer-motion'
import { useMemo } from 'react'
import { cn } from '@/lib/utils'

type HeadingTag = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p' | 'span'
type Variant = 'wave' | 'typewriter' | 'word-typewriter'
type Color = 'primary' | 'accent' | 'muted' | 'inherit'

interface AnimatedTextProps {
  text: string
  variant: Variant
  className?: string
  as?: HeadingTag
  color?: Color
  delay?: number
}

const colorClasses: Record<Color, string> = {
  primary: 'text-primary',
  accent: 'text-accent',
  muted: 'text-muted-foreground/80',
  inherit: '',
}

const variants = {
  wave: {
    initial: { opacity: 0, y: 30, filter: 'blur(8px)' },
    animate: { opacity: 1, y: 0, filter: 'blur(0px)' },
    transition: { duration: 0.6, ease: [0.25, 0.1, 0.25, 1] },
  },
  typewriter: {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    transition: { duration: 0.03 },
  },
  'word-typewriter': {
    initial: { opacity: 0, y: 10 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.3, ease: [0.25, 0.1, 0.25, 1] },
  },
} as const

function splitText(text: string, variant: Variant): string[] {
  if (variant === 'typewriter') {
    return text.split('') // character-level
  }
  return text.split(' ') // word-level for wave and word-typewriter
}

export function AnimatedText({
  text,
  variant,
  className,
  as: Tag = 'span',
  color = 'inherit',
  delay = 0,
}: AnimatedTextProps) {
  const words = useMemo(() => splitText(text, variant), [text, variant])
  const items = useMemo(() =>
    words.map((word, i) => ({
      content: word,
      isLast: i === words.length - 1,
      transitionDelay: delay + i * (variant === 'typewriter' ? 30 : variant === 'wave' ? 100 : 80),
    })),
    [words, variant, delay]
  )

  const motionProps: HTMLMotionProps<Tag> = {
    initial: variants[variant].initial,
    animate: variants[variant].animate,
    variants: variants[variant],
    viewport: { once: true, margin: '-100px' },
    style: { willChange: 'transform, opacity, filter' },
  } as HTMLMotionProps<Tag>

  return (
    <Tag className={cn('inline-flex flex-wrap', colorClasses[color], className)}>
      {items.map(({ content, isLast, transitionDelay }, i) => (
        <motion.span
          key={`${variant}-${i}`}
          custom={transitionDelay}
          variants={{
            wave: variants.wave,
            typewriter: variants.typewriter,
            'word-typewriter': variants['word-typewriter'],
          }}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true, margin: '-100px' }}
          transition={{
            ...variants[variant].transition,
            delay: transitionDelay / 1000, // convert ms to seconds
          }}
          className="inline-block"
          style={{ willChange: 'transform, opacity, filter' }}
        >
          {content}
          {!isLast && variant !== 'typewriter' && '\u00A0'}
        </motion.span>
      ))}
    </Tag>
  )
}

export default AnimatedText
```

- [ ] **Step 2: Verify in browser**

Run: `npm run dev`
Navigate to `http://localhost:3000`
Check: Component compiles, no TypeScript errors

- [ ] **Step 3: Commit**

```bash
git add src/components/ui/animated-text.tsx
git commit -m "feat: add AnimatedText component with wave/typewriter/word-typewriter variants"
```

---

### Task 2: Update Homepage Hero to Use AnimatedText

**Files:**
- Modify: `src/app/page.tsx`

**Interfaces:**
- Consumes: `AnimatedText` from `@/components/ui/animated-text`
- Produces: Updated hero section with animated headline and subtitle

- [ ] **Step 1: Update imports**

```tsx
// Replace:
// import { StaggeredText } from '@/components/ui/staggered-text'
// With:
import { AnimatedText } from '@/components/ui/animated-text'
```

- [ ] **Step 2: Update hero headline (lines 48-51)**

```tsx
// Replace:
<h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tighter leading-[1.05] flex flex-wrap justify-center gap-x-2">
  <StaggeredText text="Built for players." as="span" />
  <StaggeredText text="Built for trust." as="span" className="text-primary" />
</h1>

// With:
<h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tighter leading-[1.05] flex flex-wrap justify-center gap-x-2">
  <AnimatedText text="Built for players." variant="wave" as="span" />
  <AnimatedText text="Built for trust." variant="typewriter" as="span" color="accent" delay={200} />
</h1>
```

- [ ] **Step 3: Update subtitle (lines 52-54)**

```tsx
// Replace:
<p className="mt-5 text-lg text-muted-foreground/80 max-w-md mx-auto leading-relaxed">
  <StaggeredText text="The official support portal for Appmigo Android games. Find help, explore our games, and manage your account." />
</p>

// With:
<p className="mt-5 text-lg text-muted-foreground/80 max-w-md mx-auto leading-relaxed">
  <AnimatedText
    text="The official support portal for Appmigo Android games. Find help, explore our games, and manage your account."
    variant="word-typewriter"
    delay={300}
  />
</p>
```

- [ ] **Step 4: Verify in browser**

Run: `npm run dev`
Navigate to `http://localhost:3000`
Check:
- [ ] "Built for players." waves in (pronounced: 30px slide + blur)
- [ ] "Built for trust." types out character-by-character in accent color
- [ ] Typewriter starts ~200ms after wave begins
- [ ] Subtitle types word-by-word, starts ~300ms after headline
- [ ] No cursor during typewriter
- [ ] Animations trigger on scroll into view
- [ ] `prefers-reduced-motion` → instant reveal (test in DevTools)
- [ ] Dark mode: accent color is `#D4A017`
- [ ] Mobile: text wraps correctly, animations sync

- [ ] **Step 5: Commit**

```bash
git add src/app/page.tsx
git commit -m "feat: animate hero headline with wave + typewriter, subtitle with word-typewriter"
```

---

### Task 3: Verify Reduced Motion & Edge Cases

**Files:**
- Verify: `src/components/ui/animated-text.tsx`
- Verify: `src/app/page.tsx`

- [ ] **Step 1: Test `prefers-reduced-motion`**

Open DevTools → Rendering → Emulate CSS media feature `prefers-reduced-motion: reduce`
Refresh page
Verify: All text instantly visible, no animations

- [ ] **Step 2: Test SSR (no layout shift)**

Disable JS in DevTools → Refresh
Verify: Text renders (may be invisible due to `initial` opacity, but no layout shift)
Re-enable JS → Verify animations play

- [ ] **Step 3: Test dark mode**

Toggle theme → Verify accent color updates to `#D4A017`

- [ ] **Step 4: Test mobile viewport**

Resize to 375px → Verify text wraps, animations still trigger

- [ ] **Step 5: Commit any fixes**

```bash
git add -A
git commit -m "fix: reduced motion, dark mode, mobile adjustments for hero animation"
```

---

### Task 4: Lint & Typecheck

**Files:**
- All modified files

- [ ] **Step 1: Run lint**

```bash
npm run lint
```
Expected: PASS (no errors)

- [ ] **Step 2: Run typecheck**

```bash
npx tsc --noEmit
```
Expected: PASS (no errors)

- [ ] **Step 3: Commit if clean**

```bash
git add -A
git commit -m "chore: lint and typecheck pass for hero animation"
```

---

## Self-Review Checklist

- [ ] Spec coverage: Wave, typewriter, word-typewriter all implemented
- [ ] Reduced motion respected
- [ ] No layout shift on SSR
- [ ] Dark mode accent color works
- [ ] Stagger delays match spec (100ms/30ms/80ms)
- [ ] No cursor on typewriter
- [ ] Component reusable for other sections
- [ ] Existing `StaggeredText` preserved for other uses

---

## Execution Options

**Plan complete and saved to `docs/superpowers/plans/2026-07-30-hero-text-animation.md`. Two execution options:**

**1. Subagent-Driven (recommended)** - I dispatch a fresh subagent per task, review between tasks, fast iteration

**2. Inline Execution** - Execute tasks in this session using executing-plans, batch execution with checkpoints for review

**Which approach?**