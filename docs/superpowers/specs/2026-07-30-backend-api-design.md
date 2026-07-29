# Backend API Design — Appmigo Support Portal

## Overview

Next.js API routes for the Appmigo support portal, deployed on Vercel/Netlify as serverless functions.

## Architecture

### File Structure
```
src/app/api/
├── games/
│   └── route.ts           # GET, POST /api/games
├── games/[id]/
│   └── route.ts           # GET, PUT, DELETE /api/games/:id
├── faqs/
│   └── route.ts           # GET, POST /api/faqs
├── faqs/[id]/
│   └── route.ts           # GET, DELETE /api/faqs/:id
├── tickets/
│   └── route.ts           # GET, POST /api/tickets
├── tickets/[id]/
│   └── route.ts           # GET, PUT /api/tickets/:id
├── news/
│   └── route.ts           # GET, POST /api/news
├── news/[id]/
│   └── route.ts           # GET, DELETE /api/news/:id
├── feature-requests/
│   └── route.ts           # GET, POST /api/feature-requests
├── feature-requests/[id]/
│   └── route.ts           # GET, DELETE /api/feature-requests/:id
└── app-ads/
    └── route.ts           # GET, PUT /api/app-ads
```

### Data Storage
```
src/data/
├── games.json             # Games data (existing)
├── faqs.json              # FAQs data (existing)
├── tickets.json           # Tickets data (new)
├── news.json              # News articles (new)
├── feature-requests.json  # Feature requests (new)
└── app-ads.txt            # app-ads.txt content (new)
```

## Security

### Environment Variables
```env
ADMIN_SECRET=your-long-random-string
```

### Authentication
- GET endpoints: Public (no auth required)
- POST/PUT/DELETE endpoints: Require `Authorization: Bearer <ADMIN_SECRET>` header

### Rate Limiting
- Write endpoints: 5 requests per minute per IP
- Uses in-memory store (resets on cold start)

## API Endpoints

### Games API

| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| GET | /api/games | List all games | No |
| GET | /api/games/:id | Get game by ID | No |
| POST | /api/games | Create new game | Yes |
| PUT | /api/games/:id | Update game | Yes |
| DELETE | /api/games/:id | Delete game | Yes |

### FAQs API

| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| GET | /api/faqs | List all FAQs | No |
| GET | /api/faqs/:id | Get FAQ by ID | No |
| POST | /api/faqs | Create new FAQ | Yes |
| DELETE | /api/faqs/:id | Delete FAQ | Yes |

### Tickets API

| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| GET | /api/tickets | List all tickets | Yes |
| GET | /api/tickets/:id | Get ticket by ID | Yes |
| POST | /api/tickets | Create new ticket | No |
| PUT | /api/tickets/:id | Update ticket status | Yes |

### News API

| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| GET | /api/news | List all news | No |
| GET | /api/news/:id | Get news by ID | No |
| POST | /api/news | Create news article | Yes |
| DELETE | /api/news/:id | Delete news article | Yes |

### Feature Requests API

| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| GET | /api/feature-requests | List all requests | Yes |
| GET | /api/feature-requests/:id | Get request by ID | Yes |
| POST | /api/feature-requests | Create new request | No |
| DELETE | /api/feature-requests/:id | Delete request | Yes |

### app-ads.txt API

| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| GET | /api/app-ads | Get app-ads.txt content | No |
| PUT | /api/app-ads | Update app-ads.txt | Yes |

## Ticket Auto-Generation

### ID Format
```
PREFIX + RANDOM_STRING
BUG-8F3K2M
DEL-9H4J1N
REQ-7G5L8P
CON-6K2M4R
```

### Implementation
```typescript
function generateTicketId(type: 'bug' | 'deletion' | 'request' | 'contact'): string {
  const prefixes = { bug: 'BUG', deletion: 'DEL', request: 'REQ', contact: 'CON' }
  const random = Math.random().toString(36).substring(2, 8).toUpperCase()
  return `${prefixes[type]}-${random}`
}
```

### Ticket Schema
```typescript
interface Ticket {
  id: string           // Auto-generated
  type: 'bug' | 'deletion' | 'request' | 'contact'
  game: string         // Game ID
  email: string        // User email
  device?: string      // Device model (bug reports)
  os?: string          // OS version (bug reports)
  description: string  // Ticket description
  status: 'open' | 'in-progress' | 'resolved' | 'closed'
  createdAt: string    // ISO timestamp
  updatedAt: string    // ISO timestamp
}
```

## Error Response Format

```typescript
interface ApiResponse<T> {
  success: boolean
  data?: T
  error?: string
  code?: number
}
```

### Examples
```json
// Success
{
  "success": true,
  "data": { "id": "BUG-8F3K2M", "status": "open" }
}

// Error
{
  "success": false,
  "error": "Ticket not found",
  "code": 404
}
```

## Data Persistence

| Data Type | Storage | Notes |
|-----------|---------|-------|
| Games | JSON file | Read-heavy, rarely changes |
| FAQs | JSON file | Read-heavy, rarely changes |
| News | JSON file | Read-heavy, rarely changes |
| Tickets | JSON file | Write-once, read-many |
| Feature Requests | JSON file | Write-once, read-many |
| app-ads.txt | Text file | Read-heavy |

## Implementation Order

1. **API Routes** — All endpoints with file storage
2. **Connect Forms** — Bug report, account deletion, contact
3. **Feature Request Form** — New page with form
4. **Admin Dashboard** — Manage games, FAQs, news, tickets
5. **Toast Notifications** — Success/error feedback
6. **News Page** — Display news articles
7. **Game Card Stats** — Download counts, growth

## Dependencies

```json
{
  "dependencies": {
    "next": "16.2.12",
    "react": "19.2.4"
  }
}
```

No additional dependencies needed — uses built-in Next.js API routes and Node.js `fs` module.

## Deployment

### Vercel
- Automatic deployment on git push
- Serverless functions for API routes
- Environment variables in Vercel dashboard

### Netlify
- Requires `netlify.toml` configuration
- Functions in `netlify/functions/` or use `@netlify/plugin-nextjs`

## Testing

### Manual Testing
```bash
# Test games API
curl http://localhost:3000/api/games
curl -X POST http://localhost:3000/api/games -H "Authorization: Bearer <secret>" -d '{...}'

# Test tickets API
curl http://localhost:3000/api/tickets
curl -X POST http://localhost:3000/api/tickets -d '{...}'
```

### Integration Testing
- Connect forms to API endpoints
- Verify ticket ID generation
- Test admin dashboard CRUD operations
