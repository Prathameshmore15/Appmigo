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
    excerpt: 'We\'re excited to launch our new corporate website and share our journey with you.',
    content: 'Appmigo was founded with a simple mission: create mobile games that bring joy and mental stimulation to millions of players worldwide. Today, we\'re taking a big step forward by launching our new corporate website.',
    publishedAt: '2024-01-15',
    category: 'announcement',
  },
  {
    id: 'pixel-quest-launch',
    title: 'Pixel Quest Now Available',
    excerpt: 'Our latest puzzle adventure game is now available on Google Play.',
    content: 'We\'re thrilled to announce the launch of Pixel Quest, our newest puzzle adventure game. With over 100 levels of challenging puzzles, Pixel Quest combines classic gameplay with modern visuals.',
    publishedAt: '2024-01-10',
    category: 'update',
  },
  {
    id: '10-million-downloads',
    title: '10 Million Downloads Milestone',
    excerpt: 'We\'ve reached 10 million downloads across all our games!',
    content: 'This is a tremendous milestone for our team. What started as a small indie studio has grown into a beloved game developer with millions of players worldwide.',
    publishedAt: '2024-01-05',
    category: 'milestone',
  },
]
