import { NextRequest, NextResponse } from 'next/server'
import { readData, writeData } from '../../lib/store'
import { authenticate } from '../../lib/auth'
import { ApiResponse, FeatureRequest } from '../../lib/types'

export async function GET(
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
  const requests = await readData<FeatureRequest>('feature-requests.json')
  const req = requests.find(r => r.id === id)
  
  if (!req) {
    return NextResponse.json<ApiResponse>(
      { success: false, error: 'Request not found', code: 404 },
      { status: 404 }
    )
  }
  
  return NextResponse.json<ApiResponse<FeatureRequest>>({ success: true, data: req })
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
  const requests = await readData<FeatureRequest>('feature-requests.json')
  const index = requests.findIndex(r => r.id === id)
  
  if (index === -1) {
    return NextResponse.json<ApiResponse>(
      { success: false, error: 'Request not found', code: 404 },
      { status: 404 }
    )
  }
  
  requests.splice(index, 1)
  await writeData('feature-requests.json', requests)
  
  return NextResponse.json<ApiResponse>({ success: true })
}