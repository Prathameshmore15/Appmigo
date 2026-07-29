import { NextRequest, NextResponse } from 'next/server'
import { readData, writeData } from '../../lib/store'
import { authenticate } from '../../lib/auth'
import { ApiResponse } from '../../lib/types'

interface FAQ {
  id: string
  question: string
  answer: string
  category: string
  gameId?: string
}

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params
  const faqs = await readData<FAQ>('faqs.json')
  const faq = faqs.find(f => f.id === id)
  
  if (!faq) {
    return NextResponse.json<ApiResponse>(
      { success: false, error: 'FAQ not found', code: 404 },
      { status: 404 }
    )
  }
  
  return NextResponse.json<ApiResponse<FAQ>>({ success: true, data: faq })
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
  const faqs = await readData<FAQ>('faqs.json')
  const index = faqs.findIndex(f => f.id === id)
  
  if (index === -1) {
    return NextResponse.json<ApiResponse>(
      { success: false, error: 'FAQ not found', code: 404 },
      { status: 404 }
    )
  }
  
  faqs.splice(index, 1)
  await writeData('faqs.json', faqs)
  
  return NextResponse.json<ApiResponse>({ success: true })
}