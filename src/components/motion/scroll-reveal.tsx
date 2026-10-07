'use client'

import { motion, useReducedMotion } from 'framer-motion'
import type { ReactNode } from 'react'
import { duration, ease } from '@/lib/motion'

type Variant = 'fade-up' | 'fade-in' | 'scale' | 'slide' | 'clip'

const offsets: Record<Variant, Record<string, number | string>> = {
  'fade-up': { y: 20 },
  'fade-in': {},
  scale: { scale: 0.96 },
  slide: { x: -16 },
  clip: { y: 12 },
}

export function ScrollReveal({
  children,
  variant = 'fade-up',
  delay = 0,
  className,
  as: Tag = 'div',
}: {
  children: ReactNode
  variant?: Variant
  delay?: number
  className?: string
  as?: 'div' | 'section' | 'span'
}) {
  const reduce = useReducedMotion()
  const MotionTag = motion[Tag] as typeof motion.div

  if (reduce) {
    return <Tag className={className}>{children}</Tag>
  }

  return (
    <MotionTag
      className={className}
      initial={{ opacity: 0, ...offsets[variant] }}
      whileInView={{ opacity: 1, x: 0, y: 0, scale: 1 }}
      viewport={{ once: true, margin: '-64px' }}
      transition={{ duration: duration.medium, delay, ease: [...ease.smooth] }}
    >
      {children}
    </MotionTag>
  )
}

export function StaggerReveal({
  children,
  className,
  delay = 0,
}: {
  children: ReactNode
  className?: string
  delay?: number
}) {
  const reduce = useReducedMotion()
  if (reduce) return <div className={className}>{children}</div>
  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-64px' }}
      variants={{
        hidden: {},
        visible: { transition: { staggerChildren: 0.07, delayChildren: delay } },
      }}
    >
      {children}
    </motion.div>
  )
}

export function StaggerChild({
  children,
  className,
}: {
  children: ReactNode
  className?: string
}) {
  return (
    <motion.div
      className={className}
      variants={{
        hidden: { opacity: 0, y: 18 },
        visible: {
          opacity: 1,
          y: 0,
          transition: { duration: duration.medium, ease: [...ease.smooth] },
        },
      }}
    >
      {children}
    </motion.div>
  )
}
