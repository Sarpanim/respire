'use client';

import { createContext, useContext } from 'react';
import type { Session } from '@supabase/supabase-js';

type SessionContextType = { session: Session | null };

export const SessionContext = createContext<SessionContextType>({ session: null });

export const useSession = () => useContext(SessionContext);
