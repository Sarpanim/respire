import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase-server'

export type Profile = {
  user_id: string
  email: string | null
  display_name: string | null
  role: 'user' | 'admin'
}

export async function getSessionProfile() {
  const supabase = createClient()
  const {
    data: { session },
  } = await supabase.auth.getSession()

  if (!session) {
    redirect('/login')
  }

  const { data: profile, error } = await supabase
    .from('profiles')
    .select('user_id, email, display_name, role')
    .eq('user_id', session.user.id)
    .maybeSingle<Profile>()

  if (error || !profile) {
    redirect('/dashboard')
  }

  if (profile.role !== 'admin') {
    redirect('/dashboard')
  }

  return { profile, session }
}
