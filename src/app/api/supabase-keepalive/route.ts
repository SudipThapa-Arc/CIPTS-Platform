import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  const cronSecret = process.env.CRON_SECRET
  const authorization = request.headers.get('authorization')
  const providedSecret = authorization?.split(' ')[1]

  if (cronSecret && providedSecret !== cronSecret) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  if (!supabaseUrl || !supabaseAnonKey) {
    return NextResponse.json(
      { error: 'Supabase environment variables are not configured' },
      { status: 500 }
    )
  }

  const response = await fetch(`${supabaseUrl}/auth/v1/settings`, {
    method: 'GET',
    headers: {
      apikey: supabaseAnonKey,
    },
    cache: 'no-store',
  })

  if (!response.ok) {
    return NextResponse.json(
      { error: 'Supabase keepalive request failed', status: response.status },
      { status: 502 }
    )
  }

  return NextResponse.json({ ok: true, timestamp: new Date().toISOString() })
}
