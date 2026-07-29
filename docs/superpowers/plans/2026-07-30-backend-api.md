# Backend API Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build Next.js API routes for games, FAQs, tickets, news, feature requests, and app-ads.txt with JSON file storage and admin authentication.

**Architecture:** Next.js API routes as serverless functions, JSON file storage in `src/data/`, environment variable for admin secret, rate limiting on write endpoints.

**Tech Stack:** Next.js 16, TypeScript, Node.js fs module, React Hook Form + Zod (existing)

## Global Constraints

- Next.js 16.2.12 (Turbopack)
- TypeScript 5.x
- JSON file storage (no database)
- Admin secret in environment variable `ADMIN_SECRET`
- Rate limiting: 5 requests per minute per IP on write endpoints
- Ticket IDs: PREFIX + RANDOM_STRING (BUG-xxxxx, DEL-xxxxx, REQ-xxxxx, CON-xxxxx)

---

## File Structure

```
src/app/api/
├── games/
│   └── route.ts
├── games/[id]/
│   └── route.ts
├── faqs/
│   └── route.ts
├── faqs/[id]/
│   └── route.ts
├── tickets/
│   └── route.ts
├── tickets/[id]/
│   └── route.ts
├── news/
│   └── route.ts
├── news/[id]/
│   └── route.ts
├── feature-requests/
│   └── route.ts
├── feature-requests/[id]/
│   └── route.ts
├── app-ads/
│   └── route.ts
└── lib/
    ├── auth.ts
    ├── rate-limit.ts
    ├── store.ts
    └── types.ts

src/data/
├── games.json (existing)
├── faqs.json (existing)
├── tickets.json (new)
├── news.json (new)
├── feature-requests.json (new)
└── app-ads.txt (new)
```

---

## Task 1: Create Shared Utilities

**Files:**
- Create: `src/app/api/lib/types.ts`
- Create: `src/app/api/lib/auth.ts`
- Create: `src/app/api/lib/rate-limit.ts`
- Create: `src/app/api/lib/store.ts`

**Interfaces:**
- Consumes: None (first task)
- Produces: `ApiResponse<T>`, `Ticket`, `NewsArticle`, `FeatureRequest`, `authenticate()`, `checkRateLimit()`, `readData()`, `writeData()`

- [ ] **Step 1: Create types.ts**

```typescript
// src/app/api/lib/types.ts
export interface ApiResponse<T = unknown> {
  success: boolean
  data?: T
  error?: string
  code?: number
}

export interface Ticket {
  id: string
  type: 'bug' | 'deletion' | 'request' | 'contact'
  game: string
  email: string
  device?: string
  os?: string
  version?: string
  description: string
  status: 'open' | 'in-progress' | 'resolved' | 'closed'
  createdAt: string
  updatedAt: string
}

export interface NewsArticle {
  id: string
  title: string
  content: string
  gameId?: string
  publishedAt: string
}

export interface FeatureRequest {
  id: string
  game: string
  email: string
  title: string
  description: string
  status: 'pending' | 'under-review' | 'planned' | 'implemented'
  createdAt: string
}
```

- [ ] **Step 2: Create auth.ts**

```typescript
// src/app/api/lib/auth.ts
import { NextRequest } from 'next/server'

export function authenticate(request: NextRequest): boolean {
  const authHeader = request.headers.get('authorization')
  const secret = process.env.ADMIN_SECRET
  
  if (!secret) {
    console.warn('ADMIN_SECRET not set')
    return false
  }
  
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return false
  }
  
  const token = authHeader.slice(7)
  return token === secret
}
```

- [ ] **Step 3: Create rate-limit.ts**

```typescript
// src/app/api/lib/rate-limit.ts
const requestCounts = new Map<string, { count: number; resetTime: number }>()

export function checkRateLimit(ip: string): boolean {
  const now = Date.now()
  const windowMs = 60 * 1000 // 1 minute
  const maxRequests = 5
  
  const record = requestCounts.get(ip)
  
  if (!record || now > record.resetTime) {
    requestCounts.set(ip, { count: 1, resetTime: now + windowMs })
    return true
  }
  
  if (record.count >= maxRequests) {
    return false
  }
  
  record.count++
  return true
}
```

- [ ] **Step 4: Create store.ts**

```typescript
// src/app/api/lib/store.ts
import { readFile, writeFile, access } from 'fs/promises'
import { join } from 'path'

const DATA_DIR = join(process.cwd(), 'src/data')

export async function readData<T>(filename: string): Promise<T[]> {
  const filePath = join(DATA_DIR, filename)
  try {
    await access(filePath)
    const content = await readFile(filePath, 'utf-8')
    return JSON.parse(content)
  } catch {
    return []
  }
}

export async function writeData<T>(filename: string, data: T[]): Promise<void> {
  const filePath = join(DATA_DIR, filename)
  await writeFile(filePath, JSON.stringify(data, null, 2), 'utf-8')
}

export async function readText(filename: string): Promise<string> {
  const filePath = join(DATA_DIR, filename)
  try {
    await access(filePath)
    return await readFile(filePath, 'utf-8')
  } catch {
    return ''
  }
}

export async function writeText(filename: string, content: string): Promise<void> {
  const filePath = join(DATA_DIR, filename)
  await writeFile(filePath, content, 'utf-8')
}
```

- [ ] **Step 5: Create data files**

```json
// src/data/tickets.json
[]
```

```json
// src/data/news.json
[]
```

```json
// src/data/feature-requests.json
[]
```

```txt
// src/data/app-ads.txt
# app-ads.txt - https://iabtechlab.com/app-ads-txt/
```

- [ ] **Step 6: Commit**

```bash
git add src/app/api/lib/ src/data/tickets.json src/data/news.json src/data/feature-requests.json src/data/app-ads.txt
git commit -m "feat: add shared API utilities (types, auth, rate-limit, store)"
```

---

## Task 2: Games API Routes

**Files:**
- Create: `src/app/api/games/route.ts`
- Create: `src/app/api/games/[id]/route.ts`

**Interfaces:**
- Consumes: `ApiResponse`, `readData`, `writeData`, `authenticate`, `checkRateLimit`
- Produces: GET/POST `/api/games`, GET/PUT/DELETE `/api/games/:id`

- [ ] **Step 1: Create GET/POST /api/games**

```typescript
// src/app/api/games/route.ts
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
```

- [ ] **Step 2: Create GET/PUT/DELETE /api/games/:id**

```typescript
// src/app/api/games/[id]/route.ts
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
```

- [ ] **Step 3: Test the API**

```bash
# Test GET
curl http://localhost:3000/api/games

# Test POST (requires ADMIN_SECRET)
curl -X POST http://localhost:3000/api/games \
  -H "Authorization: Bearer your-secret" \
  -H "Content-Type: application/json" \
  -d '{"title": "Test Game", "description": "A test game", "genre": "Action"}'
```

- [ ] **Step 4: Commit**

```bash
git add src/app/api/games/
git commit -m "feat: add games API routes (GET, POST, PUT, DELETE)"
```

---

## Task 3: FAQs API Routes

**Files:**
- Create: `src/app/api/faqs/route.ts`
- Create: `src/app/api/faqs/[id]/route.ts`

**Interfaces:**
- Consumes: Shared utilities from Task 1
- Produces: GET/POST `/api/faqs`, GET/DELETE `/api/faqs/:id`

- [ ] **Step 1: Create GET/POST /api/faqs**

```typescript
// src/app/api/faqs/route.ts
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
```

- [ ] **Step 2: Create GET/DELETE /api/faqs/:id**

```typescript
// src/app/api/faqs/[id]/route.ts
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
```

- [ ] **Step 3: Commit**

```bash
git add src/app/api/faqs/
git commit -m "feat: add FAQs API routes (GET, POST, DELETE)"
```

---

## Task 4: Tickets API Routes

**Files:**
- Create: `src/app/api/tickets/route.ts`
- Create: `src/app/api/tickets/[id]/route.ts`

**Interfaces:**
- Consumes: Shared utilities from Task 1
- Produces: GET/POST `/api/tickets`, GET/PUT `/api/tickets/:id`

- [ ] **Step 1: Create GET/POST /api/tickets**

```typescript
// src/app/api/tickets/route.ts
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
```

- [ ] **Step 2: Create GET/PUT /api/tickets/:id**

```typescript
// src/app/api/tickets/[id]/route.ts
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
```

- [ ] **Step 3: Commit**

```bash
git add src/app/api/tickets/
git commit -m "feat: add tickets API routes with auto-ID generation"
```

---

## Task 5: News API Routes

**Files:**
- Create: `src/app/api/news/route.ts`
- Create: `src/app/api/news/[id]/route.ts`

**Interfaces:**
- Consumes: Shared utilities from Task 1
- Produces: GET/POST `/api/news`, GET/DELETE `/api/news/:id`

- [ ] **Step 1: Create GET/POST /api/news**

```typescript
// src/app/api/news/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { readData, writeData } from '../lib/store'
import { authenticate } from '../lib/auth'
import { checkRateLimit } from '../lib/rate-limit'
import { ApiResponse, NewsArticle } from '../lib/types'

export async function GET() {
  const news = await readData<NewsArticle>('news.json')
  return NextResponse.json<ApiResponse<NewsArticle[]>>({ success: true, data: news })
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
  const news = await readData<NewsArticle>('news.json')
  
  const newArticle: NewsArticle = {
    id: body.id || body.title.toLowerCase().replace(/\s+/g, '-').slice(0, 50),
    title: body.title,
    content: body.content,
    gameId: body.gameId,
    publishedAt: new Date().toISOString(),
  }
  
  news.push(newArticle)
  await writeData('news.json', news)
  
  return NextResponse.json<ApiResponse<NewsArticle>>(
    { success: true, data: newArticle },
    { status: 201 }
  )
}
```

- [ ] **Step 2: Create GET/DELETE /api/news/:id**

```typescript
// src/app/api/news/[id]/route.ts
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
```

- [ ] **Step 3: Commit**

```bash
git add src/app/api/news/
git commit -m "feat: add news API routes (GET, POST, DELETE)"
```

---

## Task 6: Feature Requests API Routes

**Files:**
- Create: `src/app/api/feature-requests/route.ts`
- Create: `src/app/api/feature-requests/[id]/route.ts`

**Interfaces:**
- Consumes: Shared utilities from Task 1
- Produces: GET/POST `/api/feature-requests`, GET/DELETE `/api/feature-requests/:id`

- [ ] **Step 1: Create GET/POST /api/feature-requests**

```typescript
// src/app/api/feature-requests/route.ts
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
```

- [ ] **Step 2: Create GET/DELETE /api/feature-requests/:id**

```typescript
// src/app/api/feature-requests/[id]/route.ts
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
```

- [ ] **Step 3: Commit**

```bash
git add src/app/api/feature-requests/
git commit -m "feat: add feature requests API routes"
```

---

## Task 7: app-ads.txt API Routes

**Files:**
- Create: `src/app/api/app-ads/route.ts`

**Interfaces:**
- Consumes: Shared utilities from Task 1
- Produces: GET/PUT `/api/app-ads`

- [ ] **Step 1: Create GET/PUT /api/app-ads**

```typescript
// src/app/api/app-ads/route.ts
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
```

- [ ] **Step 2: Commit**

```bash
git add src/app/api/app-ads/
git commit -m "feat: add app-ads.txt API routes"
```

---

## Task 8: Final Integration Test

**Files:**
- None (testing only)

**Interfaces:**
- Consumes: All API routes from Tasks 2-7
- Produces: Verified working API

- [ ] **Step 1: Test all endpoints**

```bash
# Games
curl http://localhost:3000/api/games
curl -X POST http://localhost:3000/api/games -H "Authorization: Bearer $ADMIN_SECRET" -H "Content-Type: application/json" -d '{"title":"Test","description":"Test game","genre":"Action"}'

# FAQs
curl http://localhost:3000/api/faqs
curl http://localhost:3000/api/faqs?category=General

# Tickets
curl -X POST http://localhost:3000/api/tickets -H "Content-Type: application/json" -d '{"type":"bug","game":"pixel-quest","email":"test@test.com","description":"Test bug"}'

# News
curl http://localhost:3000/api/news
curl -X POST http://localhost:3000/api/news -H "Authorization: Bearer $ADMIN_SECRET" -H "Content-Type: application/json" -d '{"title":"Update","content":"New feature released"}'

# Feature Requests
curl -X POST http://localhost:3000/api/feature-requests -H "Content-Type: application/json" -d '{"game":"pixel-quest","email":"test@test.com","title":"New feature","description":"Please add this"}'

# app-ads.txt
curl http://localhost:3000/api/app-ads
curl -X PUT http://localhost:3000/api/app-ads -H "Authorization: Bearer $ADMIN_SECRET" -H "Content-Type: application/json" -d '{"content":"# Updated app-ads.txt"}'
```

- [ ] **Step 2: Verify data persistence**

```bash
cat src/data/tickets.json
cat src/data/news.json
cat src/data/feature-requests.json
cat src/data/app-ads.txt
```

- [ ] **Step 3: Commit**

```bash
git add -A
git commit -m "feat: complete backend API implementation"
```

---

## Summary

| Task | Description | Endpoints |
|------|-------------|-----------|
| 1 | Shared Utilities | Types, Auth, Rate-limit, Store |
| 2 | Games API | GET, POST, PUT, DELETE /api/games |
| 3 | FAQs API | GET, POST, DELETE /api/faqs |
| 4 | Tickets API | GET, POST, PUT /api/tickets |
| 5 | News API | GET, POST, DELETE /api/news |
| 6 | Feature Requests API | GET, POST, DELETE /api/feature-requests |
| 7 | app-ads.txt API | GET, PUT /api/app-ads |
| 8 | Integration Test | Verify all endpoints |

**Total Files Created:** 14
**Total Endpoints:** 18
