// lib/supabase-server.ts
import { cookies, headers } from 'next/headers'
import { createServerClient, type CookieOptions } from '@supabase/ssr'

export function createClient() {
  const cookieStore = cookies()
  const headerStore = headers()

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return cookieStore.get(name)?.value
        },
        set(name: string, value: string, options: CookieOptions) {
          cookieStore.set({ name, value, ...options })
        },
        remove(name: string, options: CookieOptions) {
          cookieStore.set({ name, value: '', ...options, maxAge: 0 })
        },
      },
      headers: {
        // propager les set-cookie via la response header store de Next
        'x-forwarded-host': headerStore.get('x-forwarded-host') ?? '',
        'x-forwarded-proto': headerStore.get('x-forwarded-proto') ?? '',
      },
    } as any
  )

  return supabase
}
