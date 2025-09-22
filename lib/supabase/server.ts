import { createClient as createSupabaseClient, type SupabaseClient } from '@supabase/supabase-js'

type CreateClientOptions = {
  /**
   * When true, the Supabase service role key will be used if available.
   * Falls back to the anon key otherwise.
   */
  serviceRole?: boolean
}

type GenericSupabaseClient = SupabaseClient<any, any, any>

export function createClient(options: CreateClientOptions = {}): GenericSupabaseClient {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  if (!supabaseUrl || !anonKey) {
    throw new Error('Missing Supabase environment variables')
  }

  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE ?? process.env.SUPABASE_SERVICE_ROLE_KEY
  const useServiceRole = options.serviceRole && serviceRoleKey
  const supabaseKey = useServiceRole ? serviceRoleKey! : anonKey

  return createSupabaseClient(supabaseUrl, supabaseKey, {
    auth: {
      persistSession: false,
      detectSessionInUrl: false,
      autoRefreshToken: false,
    },
    global: {
      headers: {
        'X-Client-Info': 'respire-next-app',
      },
    },
  })
}
