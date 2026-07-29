import { NextRequest, NextResponse } from 'next/server'
import { readData, writeData } from '../../lib/store'
import { authenticate } from '../../lib/auth'
import { ApiResponse, Ticket } from '../../lib/types'

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
  const tickets = await readData<Ticket>('tickets.json')
  const ticket = tickets.find(t => t.id === id)
  
  if (!ticket) {
    return NextResponse.json<ApiResponse>(
      { success: false, error: 'Ticket not found', code: 404 },
      { status: 404 }
    )
  }
  
  return NextResponse.json<ApiResponse<Ticket>>({ success: true, data: ticket })
}

export async function PUT(
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
  const body = await request.json()
  const tickets = await readData<Ticket>('tickets.json')
  const index = tickets.findIndex(t => t.id === id)
  
  if (index === -1) {
    return NextResponse.json<ApiResponse>(
      { success: false, error: 'Ticket not found', code: 404 },
      { status: 404 }
    )
  }
  
  tickets[index] = {
    ...tickets[index],
    ...body,
    updatedAt: new Date().toISOString(),
  }
  await writeData('tickets.json', tickets)
  
  return NextResponse.json<ApiResponse<Ticket>>({ success: true, data: tickets[index] })
}
