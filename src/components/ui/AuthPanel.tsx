'use client';

import { useCallback, useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';

import { useSession } from '@/context/SessionContext';
import { createClient } from '@/lib/supabase/client';

export function AuthPanel() {
  const router = useRouter();
  const { session } = useSession();
  const [isLoading, setIsLoading] = useState(false);

  const supabase = useMemo(() => createClient(), []);

  const handleSignIn = useCallback(async () => {
    setIsLoading(true);
    try {
      const origin = window.location.origin;
      await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: `${origin}/auth/callback`,
        },
      });
    } finally {
      setIsLoading(false);
    }
  }, [supabase]);

  const handleSignOut = useCallback(async () => {
    setIsLoading(true);
    try {
      await supabase.auth.signOut();
      router.refresh();
    } finally {
      setIsLoading(false);
    }
  }, [router, supabase]);

  if (!session) {
    return (
      <button
        type="button"
        className="button button--primary"
        onClick={handleSignIn}
        disabled={isLoading}
      >
        {isLoading ? 'Redirecting…' : 'Sign in with Google'}
      </button>
    );
  }

  return (
    <button
      type="button"
      className="button button--secondary"
      onClick={handleSignOut}
      disabled={isLoading}
    >
      {isLoading ? 'Signing out…' : 'Sign out'}
    </button>
  );
}
