'use client';

import { useCallback, useState } from 'react';
import { useRouter } from 'next/navigation';

import { useSession } from '@/context/SessionContext';
import { signInWithGoogle, signOut } from '@/lib/auth';

export function AuthPanel() {
  const router = useRouter();
  const { session } = useSession();
  const [isLoading, setIsLoading] = useState(false);

  const handleSignIn = useCallback(async () => {
    setIsLoading(true);
    try {
      const origin = window.location.origin;
      await signInWithGoogle(`${origin}/auth/callback`);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const handleSignOut = useCallback(async () => {
    setIsLoading(true);
    try {
      await signOut();
      router.refresh();
    } finally {
      setIsLoading(false);
    }
  }, [router]);

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
