'use client'

import { useMemo } from 'react'
import { cn } from '@/lib/utils'

type HeadingTag = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p' | 'span'

interface StaggeredTextProps {
  text: string
  className?: string
  as?: HeadingTag
}

export function StaggeredText({
  text,
  className,
  as: Tag = 'span',
}: StaggeredTextProps) {
  const words = useMemo(() => text.split(' '), [text])

  return (
    <Tag className={cn('inline flex-wrap', className)}>
      {words.map((word, i) => (
        <span
          key={`${word}-${i}`}
          className="stagger-word inline-block"
          style={{ animationDelay: `${i * 0.08}s` }}
        >
          {word}
          {i < words.length - 1 ? '\u00A0' : ''}
        </span>
      ))}
    </Tag>
  )
}

export default StaggeredText
