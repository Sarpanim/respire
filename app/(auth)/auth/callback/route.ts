// app/(auth)/auth/callback/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase-server'

const SAFE_PATHS = new Set(['/dashboard', '/']) // cibles de redirect autorisées

export async function GET(req: NextRequest) {
  const url = new URL(req.url)
  const code = url.searchParams.get('code')
  const redirectTo = url.searchParams.get('redirect_to') ?? '/dashboard'
  const target = SAFE_PATHS.has(redirectTo) ? redirectTo : '/dashboard'

  if (!code) {
    return NextResponse.redirect(new URL('/login?error=missing_code', url.origin), {
      headers: { 'cache-control': 'no-store' }
    })
  }

  const supabase = createClient()
  const { error } = await supabase.auth.exchangeCodeForSession(code)

  if (error) {
    return NextResponse.redirect(new URL('/login?error=auth', url.origin), {
      headers: { 'cache-control': 'no-store' }
    })
  }

  // important: pas de cache et on renvoie avec cookies déjà écrits par @supabase/ssr
  return NextResponse.redirect(new URL(target, url.origin), {
    headers: { 'cache-control': 'no-store' }
  })
}
