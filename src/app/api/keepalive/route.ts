import { type NextRequest } from 'next/server'
import { createClient } from '@/lib/supabase/server'

const KEEPALIVE_TOKEN_HEADER = 'x-keepalive-token'

export const runtime = 'nodejs'

export async function GET(request: NextRequest) {
  const expectedToken = process.env.SUPABASE_KEEPALIVE_TOKEN
  const providedToken =
    request.headers.get(KEEPALIVE_TOKEN_HEADER) ?? request.nextUrl.searchParams.get('token')

  if (expectedToken && providedToken !== expectedToken) {
    return Response.json({ ok: false, error: 'Unauthorized' }, { status: 401 })
  }

  const supabase = await createClient()
  const { error } = await supabase.from('profiles').select('id').limit(1)

  if (error) {
    return Response.json({ ok: false, error: 'Supabase liveness check failed' }, { status: 503 })
  }

  return Response.json({ ok: true, timestamp: new Date().toISOString() })
}
