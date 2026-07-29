import { NextRequest, NextResponse } from 'next/server'
import { readData, writeData } from '../lib/store'
import { authenticate } from '../lib/auth'
import { checkRateLimit } from '../lib/rate-limit'
import { ApiResponse, FeatureRequest } from '../lib/types'

export async function GET(request: NextRequest) {
  if (!authenticate(request)) {
    return NextResponse.json<ApiResponse>(
      { success: false, error: 'Unauthorized', code: 401 },
      { status: 401 }
    )
  }

  const requests = await readData<FeatureRequest>('feature-requests.json')
  return NextResponse.json<ApiResponse<FeatureRequest[]>>({ success: true, data: requests })
}

export async function POST(request: NextRequest) {
  const ip = request.headers.get('x-forwarded-for') || 'unknown'
  if (!checkRateLimit(ip)) {
    return NextResponse.json<ApiResponse>(
      { success: false, error: 'Rate limit exceeded', code: 429 },
      { status: 429 }
    )
  }

  const body = await request.json()
  const requests = await readData<FeatureRequest>('feature-requests.json')
  
  const newRequest: FeatureRequest = {
    id: Date.now().toString(36).toUpperCase(),
    game: body.game,
    email: body.email,
    title: body.title,
    description: body.description,
    status: 'pending',
    createdAt: new Date().toISOString(),
  }
  
  requests.push(newRequest)
  await writeData('feature-requests.json', requests)
  
  return NextResponse.json<ApiResponse<FeatureRequest>>(
    { success: true, data: newRequest },
    { status: 201 }
  )
}