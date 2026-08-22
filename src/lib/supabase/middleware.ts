import { createServerClient, type CookieOptions } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'
import { Database } from '@/types/supabase'

export async function updateSession(request: NextRequest) {
  let supabaseResponse = NextResponse.next({
    request,
  })

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

  const pathname = request.nextUrl.pathname

  // Public routes that do not require authentication
  const isAuthRoute = pathname.startsWith('/auth')
  const isPublicRoute = pathname === '/' || pathname.startsWith('/privacy') || pathname.startsWith('/terms') || isAuthRoute

  // Redirect unauthenticated users
  if (!user && !isPublicRoute) {
    const url = request.nextUrl.clone()
    url.pathname = '/auth/login'
    return NextResponse.redirect(url)
  }

  // Redirect authenticated users away from auth pages
  if (user && isAuthRoute) {
    // We should figure out their role to redirect them properly
    // Let's query the profiles table for their role
    const { data: profile } = await supabase
      .from('profiles')
      .select('role')
      .eq('id', user.id)
      .single()

    const url = request.nextUrl.clone()
    
    if (!profile) {
      // If they have an auth session but no profile, let them stay on auth pages
      // so they can log out or re-register properly.
      return supabaseResponse
    }
    
    if (profile.role === 'STUDENT') {
      url.pathname = '/student/dashboard'
    } else if (profile.role === 'RECRUITER') {
      url.pathname = '/recruiter/dashboard'
    } else if (profile.role === 'OFFICER') {
      url.pathname = '/officer/dashboard'
    } else {
      url.pathname = '/student/dashboard' // fallback
    }
    
    return NextResponse.redirect(url)
  }

  // RBAC checks for authenticated routes
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
