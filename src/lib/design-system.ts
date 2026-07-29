export const designSystem = {
  colors: {
    primary: {
      DEFAULT: '#059669', // Emerald green (trust, gaming)
      light: '#10B981',
      dark: '#047857',
    },
    accent: {
      DEFAULT: '#F59E0B', // Amber (energy, creativity)
      light: '#FBBF24',
      dark: '#D97706',
    },
    background: {
      DEFAULT: '#FFFFFF',
      dark: '#0B0C10',
    },
    text: {
      DEFAULT: '#111827',
      muted: '#6B7280',
    },
  },
  fonts: {
    heading: 'Sora, sans-serif',
    body: 'Inter, sans-serif',
    mono: 'JetBrains Mono, monospace',
  },
  spacing: {
    section: 'py-24 sm:py-32',
    container: 'max-w-7xl mx-auto px-4 sm:px-6 lg:px-8',
  },
} as const