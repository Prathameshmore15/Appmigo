'use client'

import { motion } from 'framer-motion'
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
    return text.split('')
  }
  return text.split(' ')
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

  const motionProps = {
    initial: variants[variant].initial,
    animate: variants[variant].animate,
    variants: variants[variant],
    viewport: { once: true, margin: '-100px' },
    style: { willChange: 'transform, opacity, filter' },
  }

  return (
    <Tag className={cn('inline', colorClasses[color], className)}>
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
          animate="animate"
          transition={{
            ...variants[variant].transition,
            delay: transitionDelay / 1000,
          }}
          style={{ display: 'inline-block', willChange: 'transform, opacity, filter' }}
        >
          {content === ' ' ? '\u00A0' : content}
          {!isLast && variant !== 'typewriter' && '\u00A0'}
        </motion.span>
      ))}
    </Tag>
  )
}

export default AnimatedText