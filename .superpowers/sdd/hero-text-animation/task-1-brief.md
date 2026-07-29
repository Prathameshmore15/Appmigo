# Task 1: Create AnimatedText Component

## Task Description

Create a new `AnimatedText` component in `src/components/ui/animated-text.tsx` with three animation variants:
- **wave** — word-level, pronounced motion (30px slide + blur), 100ms stagger, 600ms duration, elastic ease
- **typewriter** — character-level, instant pop, 30ms stagger, accent color, no cursor
- **word-typewriter** — word-level, subtle slide up (10px), 80ms stagger, 300ms duration

All animations:
- Trigger via `whileInView` with `viewport={{ once: true, margin: "-100px" }}`
- Respect `prefers-reduced-motion: reduce` → instant reveal
- GPU-accelerated (transform, opacity, filter only)
- No layout shift on SSR

## Files

- Create: `src/components/ui/animated-text.tsx`
- (No test file required — manual browser verification)

## Interface

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

## Color Mapping

- `primary` → `text-primary`
- `accent` → `text-accent`
- `muted` → `text-muted-foreground/80`
- `inherit` → ``

## Implementation Notes

- Use `motion.span` from Framer Motion for each word/character
- Split text by words (wave, word-typewriter) or characters (typewriter)
- Apply stagger delay via `transition.delay` in seconds
- Use `custom` prop to pass delay to variant
- Apply `will-change: transform, opacity, filter` on animated spans
- Non-breaking space (`\u00A0`) between words (not after last, not for typewriter)

## Verification

Run `npm run dev`, navigate to `http://localhost:3000` — component should compile without TypeScript errors.