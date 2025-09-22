import { NextRequest, NextResponse } from 'next/server'
import { createServerClient, type CookieOptions } from '@supabase/ssr'

export async function middleware(request: NextRequest) {
  if (request.nextUrl.pathname.startsWith('/auth/callback')) {
    return NextResponse.next()
  }

  const response = NextResponse.next({
    request: { headers: new Headers(request.headers) },
  })

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

  const supabase = createServerClient(supabaseUrl, supabaseAnonKey, {
    cookies: {
      get(name: string) {
        return request.cookies.get(name)?.value
      },
      set(name: string, value: string, options: CookieOptions) {
        response.cookies.set({ name, value, ...options })
      },
      remove(name: string, options: CookieOptions) {
        response.cookies.set({ name, value: '', ...options, maxAge: 0 })
      },
    },
  })

  const {
    data: { session },
  } = await supabase.auth.getSession()

  const url = request.nextUrl
  const isLogin = url.pathname === '/login'
  const isDashboard = url.pathname.startsWith('/dashboard')
  const isAdmin = url.pathname.startsWith('/admin')

  if (session && isLogin) {
    const dest = new URL('/dashboard', url.origin)
    return NextResponse.redirect(dest)
  }

  if (!session && (isDashboard || isAdmin)) {
    const dest = new URL('/login', url.origin)
    dest.searchParams.set('redirect_to', url.pathname + url.search)
    return NextResponse.redirect(dest)
  }

  return response
}

export const config = {
  matcher: ['/dashboard/:path*', '/admin/:path*', '/login', '/auth/callback'],
}
