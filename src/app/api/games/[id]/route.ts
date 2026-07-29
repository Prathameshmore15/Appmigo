import { NextRequest, NextResponse } from 'next/server'
import { readData, writeData } from '../../lib/store'
import { authenticate } from '../../lib/auth'
import { ApiResponse } from '../../lib/types'

interface Game {
  id: string
  title: string
  description: string
  longDescription: string
  genre: string
  rating: number
  version: string
  releaseDate: string
  developer: string
  features: string[]
  imageUrl: string
  playStoreUrl: string
}

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params
  const games = await readData<Game>('games.json')
  const game = games.find(g => g.id === id)
  
  if (!game) {
    return NextResponse.json<ApiResponse>(
      { success: false, error: 'Game not found', code: 404 },
      { status: 404 }
    )
  }
  
  return NextResponse.json<ApiResponse<Game>>({ success: true, data: game })
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
  const games = await readData<Game>('games.json')
  const index = games.findIndex(g => g.id === id)
  
  if (index === -1) {
    return NextResponse.json<ApiResponse>(
      { success: false, error: 'Game not found', code: 404 },
      { status: 404 }
    )
  }
  
  games[index] = { ...games[index], ...body }
  await writeData('games.json', games)
  
  return NextResponse.json<ApiResponse<Game>>({ success: true, data: games[index] })
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
  const games = await readData<Game>('games.json')
  const index = games.findIndex(g => g.id === id)
  
  if (index === -1) {
    return NextResponse.json<ApiResponse>(
      { success: false, error: 'Game not found', code: 404 },
      { status: 404 }
    )
  }
  
  games.splice(index, 1)
  await writeData('games.json', games)
  
  return NextResponse.json<ApiResponse>({ success: true })
}
