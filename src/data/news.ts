export interface NewsArticle {
  id: string
  title: string
  excerpt: string
  content: string
  publishedAt: string
  category: 'announcement' | 'update' | 'milestone'
  imageUrl?: string
}

export const newsArticles: NewsArticle[] = [
  {
    id: 'welcome-to-appmigo',
    title: 'Welcome to Appmigo',
    excerpt: 'We\'re excited to launch our new website and share our journey with you.',
    content: 'Appmigo was founded with a simple mission: create mobile games that bring joy and mental stimulation to players worldwide. Today, we\'re taking a big step forward by launching our new website.',
    publishedAt: '2026-01-15',
    category: 'announcement',
  },
  {
    id: 'pixel-quest-launch',
    title: 'Pixel Quest Now Available',
    excerpt: 'Our latest puzzle adventure game is now available on Google Play.',
    content: 'We\'re thrilled to announce the launch of Pixel Quest, our newest puzzle adventure game. With over 100 levels of challenging puzzles, Pixel Quest combines classic gameplay with modern visuals.',
    publishedAt: '2026-01-10',
    category: 'update',
  },
  {
    id: '10-million-downloads',
    title: 'Downloads Milestone',
    excerpt: 'We\'ve reached a milestone in downloads across our games!',
    content: 'This is a tremendous milestone for us as an indie studio. What started as a passion project has grown into something we\'re truly proud of.',
    publishedAt: '2026-01-05',
    category: 'milestone',
  },
]
