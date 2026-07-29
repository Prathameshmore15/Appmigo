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
    excerpt: 'I\'m excited to launch my new website and share my journey with you.',
    content: 'Appmigo was founded with a simple mission: create mobile games that bring joy and mental stimulation to players worldwide. Today, I\'m taking a big step forward by launching my new website.',
    publishedAt: '2024-01-15',
    category: 'announcement',
  },
  {
    id: 'pixel-quest-launch',
    title: 'Pixel Quest Now Available',
    excerpt: 'My latest puzzle adventure game is now available on Google Play.',
    content: 'I\'m thrilled to announce the launch of Pixel Quest, my newest puzzle adventure game. With over 100 levels of challenging puzzles, Pixel Quest combines classic gameplay with modern visuals.',
    publishedAt: '2024-01-10',
    category: 'update',
  },
  {
    id: '10-million-downloads',
    title: 'Downloads Milestone',
    excerpt: 'I\'ve reached a milestone in downloads across my games!',
    content: 'This is a tremendous milestone for me as an indie developer. What started as a passion project has grown into something I\'m truly proud of.',
    publishedAt: '2024-01-05',
    category: 'milestone',
  },
]
