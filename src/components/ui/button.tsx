import { forwardRef, type ButtonHTMLAttributes } from 'react'
import { cn } from '@/lib/utils'

const variants = {
  primary: 'bg-primary text-on-primary hover:bg-primary-hover active:bg-primary-active disabled:bg-primary-disabled disabled:opacity-50 shadow-sm hover:shadow-md hover:-translate-y-0.5',
  secondary: 'bg-secondary text-on-secondary hover:brightness-90 active:brightness-75',
  accent: 'bg-accent text-on-accent hover:bg-accent-hover active:brightness-90',
  ghost: 'bg-transparent text-foreground hover:bg-muted active:bg-border/50',
  destructive: 'bg-destructive text-destructive-foreground hover:brightness-90',
  link: 'text-primary underline-offset-4 hover:underline bg-transparent',
}

const sizes = {
  sm: 'h-9 px-3.5 text-xs gap-1.5',
  md: 'h-11 px-5 text-sm gap-2',
  lg: 'h-12 px-6 text-sm gap-2',
  xl: 'h-14 px-8 text-base gap-3',
  icon: 'h-11 w-11 p-0',
}

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: keyof typeof variants
  size?: keyof typeof sizes
  loading?: boolean
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', loading, disabled, children, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          'inline-flex items-center justify-center rounded-md font-medium transition-all duration-200 cursor-pointer disabled:cursor-not-allowed focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
          variants[variant],
          sizes[size],
          loading && 'opacity-80 cursor-wait',
          className
        )}
        disabled={disabled || loading}
        {...props}
      >
        {loading ? (
          <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
          </svg>
        ) : null}
        {children}
      </button>
    )
  }
)
Button.displayName = 'Button'
