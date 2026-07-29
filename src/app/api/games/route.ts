import { NextRequest, NextResponse } from 'next/server'
import { readData, writeData } from '../lib/store'
import { authenticate } from '../lib/auth'
import { checkRateLimit } from '../lib/rate-limit'
import { ApiResponse } from '../lib/types'

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

export async function GET() {
  const games = await readData<Game>('games.json')
  return NextResponse.json<ApiResponse<Game[]>>({ success: true, data: games })
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
  const games = await readData<Game>('games.json')
  
  const newGame: Game = {
    id: body.id || body.title.toLowerCase().replace(/\s+/g, '-'),
    title: body.title,
    description: body.description,
    longDescription: body.longDescription || '',
    genre: body.genre,
    rating: body.rating || 0,
    version: body.version || '1.0.0',
    releaseDate: body.releaseDate || new Date().toISOString(),
    developer: body.developer || 'Appmigo Studios',
    features: body.features || [],
    imageUrl: body.imageUrl || '/images/game-default.svg',
    playStoreUrl: body.playStoreUrl || '#',
  }
  
  games.push(newGame)
  await writeData('games.json', games)
  
  return NextResponse.json<ApiResponse<Game>>(
    { success: true, data: newGame },
    { status: 201 }
  )
}
