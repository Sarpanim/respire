import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { createClient } from '@/lib/supabase-server'

export async function GET(request: NextRequest) {
  const requestUrl = new URL(request.url)
  const code = requestUrl.searchParams.get('code')
  const rawRedirect = requestUrl.searchParams.get('redirect_to') ?? '/dashboard'
  const redirectPath =
    rawRedirect.startsWith('/') && !rawRedirect.startsWith('//') ? rawRedirect : '/dashboard'

  if (!code) {
    return NextResponse.redirect(new URL('/login?error=missing_code', requestUrl.origin))
  }

  try {
    const supabase = createClient()
    await supabase.auth.exchangeCodeForSession(code)
  } catch (error) {
    console.error('Erreur lors de la récupération de session Supabase', error)
    return NextResponse.redirect(new URL('/login?error=auth', requestUrl.origin))
  }

  return NextResponse.redirect(new URL(redirectPath, requestUrl.origin))
}
