'use client';

import { createClient } from '@/lib/supabase/client';

const supabase = createClient();

export const signInWithGoogle = async (redirectTo: string) => {
  await supabase.auth.signInWithOAuth({
    provider: 'google',
    options: { redirectTo },
  });
};

export const signOut = async () => {
  await supabase.auth.signOut();
};
