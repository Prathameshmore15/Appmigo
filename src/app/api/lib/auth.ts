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
