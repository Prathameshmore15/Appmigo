import { NextRequest, NextResponse } from 'next/server'
import { readData, writeData } from '../lib/store'
import { authenticate } from '../lib/auth'
import { checkRateLimit } from '../lib/rate-limit'
import { ApiResponse, Ticket } from '../lib/types'

function generateTicketId(type: Ticket['type']): string {
  const prefixes = { bug: 'BUG', deletion: 'DEL', request: 'REQ', contact: 'CON' }
  const random = Math.random().toString(36).substring(2, 8).toUpperCase()
  return `${prefixes[type]}-${random}`
}

export async function GET(request: NextRequest) {
  if (!authenticate(request)) {
    return NextResponse.json<ApiResponse>(
      { success: false, error: 'Unauthorized', code: 401 },
      { status: 401 }
    )
  }

  const { searchParams } = new URL(request.url)
  const type = searchParams.get('type')
  const status = searchParams.get('status')
  
  let tickets = await readData<Ticket>('tickets.json')
  
  if (type) {
    tickets = tickets.filter(t => t.type === type)
  }
  
  if (status) {
    tickets = tickets.filter(t => t.status === status)
  }
  
  return NextResponse.json<ApiResponse<Ticket[]>>({ success: true, data: tickets })
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
  const tickets = await readData<Ticket>('tickets.json')
  
  const newTicket: Ticket = {
    id: generateTicketId(body.type),
    type: body.type,
    game: body.game,
    email: body.email,
    device: body.device,
    os: body.os,
    version: body.version,
    description: body.description,
    status: 'open',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  }
  
  tickets.push(newTicket)
  await writeData('tickets.json', tickets)
  
  return NextResponse.json<ApiResponse<Ticket>>(
    { success: true, data: newTicket },
    { status: 201 }
  )
}
