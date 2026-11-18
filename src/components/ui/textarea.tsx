import { forwardRef, type TextareaHTMLAttributes, type ReactNode } from 'react'
import { cn } from '@/lib/utils'

export interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string
  error?: string
  icon?: ReactNode
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, label, error, icon, id, ...props }, ref) => {
    const textareaId = id || label?.toLowerCase().replace(/\s+/g, '-')
    return (
      <div className="space-y-1.5">
        {label && (
          <label htmlFor={textareaId} className="text-sm font-medium text-foreground">{label}</label>
        )}
        <div className="relative">
          {icon && (
            <span className="pointer-events-none absolute left-3.5 top-3.5 text-muted-foreground" aria-hidden="true">
              {icon}
            </span>
          )}
          <textarea
            ref={ref}
            id={textareaId}
            className={cn(
              'flex min-h-[120px] w-full rounded-lg border bg-background px-3.5 py-2.5 text-sm shadow-sm transition-all duration-200 placeholder:text-muted-foreground',
              'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-1 focus-visible:border-primary/50',
              'disabled:cursor-not-allowed disabled:opacity-50 resize-y',
              icon && 'pl-11',
              error ? 'border-destructive focus-visible:ring-destructive/40' : 'border-border hover:border-foreground/20',
              className
            )}
            aria-invalid={!!error}
            aria-describedby={error ? `${textareaId}-error` : undefined}
            {...props}
          />
        </div>
        {error && (
          <p id={`${textareaId}-error`} className="text-sm text-destructive" role="alert">{error}</p>
        )}
      </div>
    )
  }
)
Textarea.displayName = 'Textarea'
