import type { Variants } from "framer-motion";

export const duration = {
  fast: 0.15,
  normal: 0.3,
  medium: 0.5,
  slow: 0.7,
  slower: 1.0,
} as const;

export const ease = {
  smooth: [0.25, 0.1, 0.25, 1] as const,
  emphasized: [0.16, 1, 0.3, 1] as const,
  snappy: [0.32, 0.72, 0, 1] as const,
} as const;

export const spring = {
  gentle: { type: "spring", stiffness: 120, damping: 18 },
  snappy: { type: "spring", stiffness: 260, damping: 22 },
  soft: { type: "spring", stiffness: 90, damping: 16 },
} as const;

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: (delay: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: duration.medium, ease: [...ease.smooth], delay },
  }),
};

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: (delay: number = 0) => ({
    opacity: 1,
    transition: { duration: duration.medium, ease: [...ease.smooth], delay },
  }),
};

export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.96 },
  visible: (delay: number = 0) => ({
    opacity: 1,
    scale: 1,
    transition: { duration: duration.medium, ease: [...ease.emphasized], delay },
  }),
};

export const staggerContainer: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.07, delayChildren: 0.05 },
  },
};

export const staggerItem: Variants = {
  hidden: { opacity: 0, y: 18 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: duration.medium, ease: [...ease.smooth] },
  },
};

export const hoverLift = {
  y: -6,
  transition: { duration: duration.fast, ease: [...ease.smooth] },
} as const;

export const pressScale = {
  scale: 0.97,
  transition: { duration: duration.fast },
} as const;

export const pageTransition = {
  initial: { opacity: 0, y: 12, scale: 0.995 },
  animate: { opacity: 1, y: 0, scale: 1 },
  exit: { opacity: 0, y: -8, scale: 0.997 },
  transition: { duration: 0.35, ease: [...ease.smooth] },
} as const;

export function prefersReducedMotion(): boolean {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}
