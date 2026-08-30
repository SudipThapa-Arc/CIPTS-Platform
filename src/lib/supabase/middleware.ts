import { createServerClient, type CookieOptions } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'
import { Database } from '@/types/supabase'

export async function updateSession(request: NextRequest) {
  let supabaseResponse = NextResponse.next({
    request,
  })

  const pathname = request.nextUrl.pathname

  // Public routes that do not require authentication
  const isAuthRoute = pathname.startsWith('/auth')
  const isKeepAliveRoute = pathname.startsWith('/api/keepalive')
  const isPublicRoute =
    pathname === '/' ||
    pathname.startsWith('/privacy') ||
    pathname.startsWith('/terms') ||
    isAuthRoute ||
    isKeepAliveRoute

  // Fast-path cookie check: If there are no Supabase auth cookies, skip remote network calls
  const allCookies = request.cookies.getAll()
  const hasAuthCookie = allCookies.some(c => c.name.includes('sb-') && c.name.includes('-auth-token'))

  // 1. Unauthenticated user on protected route -> Fast redirect to login (0ms DB delay)
  if (!hasAuthCookie && !isPublicRoute) {
    const url = request.nextUrl.clone()
    url.pathname = '/auth/login'
    return NextResponse.redirect(url)
  }

  // 2. Unauthenticated user on public non-auth route -> Fast pass-through (0ms DB delay)
  if (!hasAuthCookie && isPublicRoute && !isAuthRoute) {
    return supabaseResponse
  }

  // 3. Unauthenticated user on /auth/login or /auth/register -> Fast pass-through (0ms DB delay)
  if (!hasAuthCookie && isAuthRoute) {
    return supabaseResponse
  }

  // User has session cookie: Initialize Supabase client and verify session
  const supabase = createServerClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return request.cookies.get(name)?.value
        },
        set(name: string, value: string, options: CookieOptions) {
          request.cookies.set({
            name,
            value,
            ...options,
          })
          supabaseResponse = NextResponse.next({
            request,
          })
          supabaseResponse.cookies.set({
            name,
            value,
            ...options,
          })
        },
        remove(name: string, options: CookieOptions) {
          request.cookies.set({
            name,
            value: '',
            ...options,
          })
          supabaseResponse = NextResponse.next({
            request,
          })
          supabaseResponse.cookies.set({
            name,
            value: '',
            ...options,
          })
        },
      },
    }
  )

  const {
    data: { user },
  } = await supabase.auth.getUser()

  // Redirect unauthenticated users on protected routes
  if (!user && !isPublicRoute) {
    const url = request.nextUrl.clone()
    url.pathname = '/auth/login'
    return NextResponse.redirect(url)
  }

  // Redirect authenticated users away from auth pages
  if (user && isAuthRoute) {
    const { data: profile } = await supabase
      .from('profiles')
      .select('role')
      .eq('id', user.id)
      .single()

    const url = request.nextUrl.clone()
    
    if (!profile) {
      return supabaseResponse
    }
    
    if (profile.role === 'STUDENT') {
      url.pathname = '/student/dashboard'
    } else if (profile.role === 'RECRUITER') {
      url.pathname = '/recruiter/dashboard'
    } else if (profile.role === 'OFFICER') {
      url.pathname = '/officer/dashboard'
    } else {
      url.pathname = '/student/dashboard'
    }
    
    return NextResponse.redirect(url)
  }

  // RBAC checks for authenticated portal routes
  if (user && !isPublicRoute) {
    const { data: profile } = await supabase
      .from('profiles')
      .select('role')
      .eq('id', user.id)
      .single()
      
    const safeRole = profile?.role?.toLowerCase() || 'auth/login';
    
    if (pathname.startsWith('/student') && profile?.role !== 'STUDENT') {
      const url = request.nextUrl.clone()
      url.pathname = `/${safeRole === 'auth/login' ? 'auth/login' : safeRole + '/dashboard'}`
      return NextResponse.redirect(url)
    }
    
    if (pathname.startsWith('/recruiter') && profile?.role !== 'RECRUITER') {
      const url = request.nextUrl.clone()
      url.pathname = `/${safeRole === 'auth/login' ? 'auth/login' : safeRole + '/dashboard'}`
      return NextResponse.redirect(url)
    }
    
    if (pathname.startsWith('/officer') && profile?.role !== 'OFFICER') {
      const url = request.nextUrl.clone()
      url.pathname = `/${safeRole === 'auth/login' ? 'auth/login' : safeRole + '/dashboard'}`
      return NextResponse.redirect(url)
    }
  }

  return supabaseResponse
}
