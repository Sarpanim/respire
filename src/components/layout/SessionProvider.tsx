'use client';

import { useMemo, type ReactNode } from 'react';
import type { Session } from '@supabase/supabase-js';

import { SessionContext } from '@/context/SessionContext';

type SessionProviderProps = {
  session: Session | null;
  children: ReactNode;
};

export function SessionProvider({ session, children }: SessionProviderProps) {
  const value = useMemo(() => ({ session }), [session]);

  return <SessionContext.Provider value={value}>{children}</SessionContext.Provider>;
}
