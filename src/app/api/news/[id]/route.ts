import { NextRequest, NextResponse } from 'next/server'
import { readData, writeData } from '../../lib/store'
import { authenticate } from '../../lib/auth'
import { ApiResponse, NewsArticle } from '../../lib/types'

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params
  const news = await readData<NewsArticle>('news.json')
  const article = news.find(n => n.id === id)
  
  if (!article) {
    return NextResponse.json<ApiResponse>(
      { success: false, error: 'Article not found', code: 404 },
      { status: 404 }
    )
  }
  
  return NextResponse.json<ApiResponse<NewsArticle>>({ success: true, data: article })
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  if (!authenticate(request)) {
    return NextResponse.json<ApiResponse>(
      { success: false, error: 'Unauthorized', code: 401 },
      { status: 401 }
    )
  }

  const { id } = await params
  const news = await readData<NewsArticle>('news.json')
  const index = news.findIndex(n => n.id === id)
  
  if (index === -1) {
    return NextResponse.json<ApiResponse>(
      { success: false, error: 'Article not found', code: 404 },
      { status: 404 }
    )
  }
  
  news.splice(index, 1)
  await writeData('news.json', news)
  
  return NextResponse.json<ApiResponse>({ success: true })
}
