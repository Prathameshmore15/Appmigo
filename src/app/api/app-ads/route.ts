import { NextRequest, NextResponse } from 'next/server'
import { readText, writeText } from '../lib/store'
import { authenticate } from '../lib/auth'
import { checkRateLimit } from '../lib/rate-limit'
import { ApiResponse } from '../lib/types'

export async function GET() {
  const content = await readText('app-ads.txt')
  return NextResponse.json<ApiResponse<{ content: string }>>({
    success: true,
    data: { content },
  })
}

export async function PUT(request: NextRequest) {
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
  await writeText('app-ads.txt', body.content)
  
  return NextResponse.json<ApiResponse<{ success: boolean }>>({
    success: true,
    data: { success: true },
  })
}