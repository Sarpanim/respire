import { cookies, headers } from 'next/headers'
import { createServerClient, type CookieOptions } from '@supabase/ssr'

export function createClient() {
  const cookieStore = cookies()
  const headerStore = headers()
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

  const supabase = createServerClient(supabaseUrl, supabaseAnonKey, {
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
    global: {
      headers: {
        'x-forwarded-host': headerStore.get('x-forwarded-host') ?? '',
        'x-forwarded-proto': headerStore.get('x-forwarded-proto') ?? '',
      },
    },
  })

  return supabase
}
