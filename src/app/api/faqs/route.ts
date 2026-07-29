import { NextRequest, NextResponse } from 'next/server'
import { readData, writeData } from '../lib/store'
import { authenticate } from '../lib/auth'
import { checkRateLimit } from '../lib/rate-limit'
import { ApiResponse } from '../lib/types'

interface FAQ {
  id: string
  question: string
  answer: string
  category: string
  gameId?: string
}

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const category = searchParams.get('category')
  const gameId = searchParams.get('gameId')
  
  let faqs = await readData<FAQ>('faqs.json')
  
  if (category && category !== 'all') {
    faqs = faqs.filter(f => f.category.toLowerCase() === category.toLowerCase())
  }
  
  if (gameId) {
    faqs = faqs.filter(f => f.gameId === gameId)
  }
  
  return NextResponse.json<ApiResponse<FAQ[]>>({ success: true, data: faqs })
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
  const faqs = await readData<FAQ>('faqs.json')
  
  const newFAQ: FAQ = {
    id: body.id || body.question.toLowerCase().replace(/\s+/g, '-').slice(0, 50),
    question: body.question,
    answer: body.answer,
    category: body.category,
    gameId: body.gameId,
  }
  
  faqs.push(newFAQ)
  await writeData('faqs.json', faqs)
  
  return NextResponse.json<ApiResponse<FAQ>>(
    { success: true, data: newFAQ },
    { status: 201 }
  )
}