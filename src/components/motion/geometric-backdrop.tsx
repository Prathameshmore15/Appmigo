import { cn } from '@/lib/utils'

/**
 * Faint interlocking-circles line pattern in the Appmigo primary (emerald).
 * Purely decorative: static SVG, radial fade mask, no animation.
 */
export function GeometricBackdrop({ className }: { className?: string }) {
  return (
    <div
      aria-hidden="true"
      className={cn('pointer-events-none absolute inset-0 overflow-hidden', className)}
    >
      <svg
        className="geo-fade-mask absolute left-1/2 top-1/2 h-[640px] w-[640px] -translate-x-1/2 -translate-y-1/2 text-primary opacity-[0.07] sm:h-[880px] sm:w-[880px] dark:opacity-[0.1]"
        viewBox="0 0 800 800"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
      >
        <circle cx="400" cy="400" r="170" />
        <circle cx="570" cy="400" r="170" />
        <circle cx="485" cy="547" r="170" />
        <circle cx="315" cy="547" r="170" />
        <circle cx="230" cy="400" r="170" />
        <circle cx="315" cy="253" r="170" />
        <circle cx="485" cy="253" r="170" />
        <circle cx="400" cy="400" r="300" />
      </svg>
    </div>
  )
}
