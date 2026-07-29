import { NextRequest, NextResponse } from 'next/server'
import { readData, writeData } from '../lib/store'
import { authenticate } from '../lib/auth'
import { checkRateLimit } from '../lib/rate-limit'
import { ApiResponse, NewsArticle } from '../lib/types'

export async function GET() {
  const news = await readData<NewsArticle>('news.json')
  return NextResponse.json<ApiResponse<NewsArticle[]>>({ success: true, data: news })
}

export async function POST(request: NextRequest) {
  if (!authenticate(request)) {
    return NextResponse.json<ApiResponse>(
      { success: false, error: 'Unauthorized', code: 401 },
      { status: 401 }
    )
  }

  const ip = request.headers.get('x-forwarded-for') || 'unknown'
  if (!checkRateLimit(ip)) {
    return NextResponse.json<ApiResponse>(
      { success: false, error: 'Rate limit exceeded', code: 429 },
      { status: 429 }
    )
  }

  const body = await request.json()
  const news = await readData<NewsArticle>('news.json')
  
  const newArticle: NewsArticle = {
    id: body.id || body.title.toLowerCase().replace(/\s+/g, '-').slice(0, 50),
    title: body.title,
    content: body.content,
    gameId: body.gameId,
    publishedAt: new Date().toISOString(),
  }
  
  news.push(newArticle)
  await writeData('news.json', news)
  
  return NextResponse.json<ApiResponse<NewsArticle>>(
    { success: true, data: newArticle },
    { status: 201 }
  )
}
