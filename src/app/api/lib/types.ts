export interface ApiResponse<T = unknown> {
  success: boolean
  data?: T
  error?: string
  code?: number
}

export interface Ticket {
  id: string
  type: 'bug' | 'deletion' | 'request' | 'contact'
  game: string
  email: string
  device?: string
  os?: string
  version?: string
  description: string
  status: 'open' | 'in-progress' | 'resolved' | 'closed'
  createdAt: string
  updatedAt: string
}

export interface NewsArticle {
  id: string
  title: string
  content: string
  gameId?: string
  publishedAt: string
}

export interface FeatureRequest {
  id: string
  game: string
  email: string
  title: string
  description: string
  status: 'pending' | 'under-review' | 'planned' | 'implemented'
  createdAt: string
}
