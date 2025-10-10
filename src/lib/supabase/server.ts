import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';

export const createServerSupabase = () => {
  const cookieStore = cookies();

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get: (name) => cookieStore.get(name)?.value,
        set: (name, value, options) => {
          if ('set' in cookieStore) {
            (cookieStore as typeof cookieStore & { set: typeof cookieStore.set }).set(
              name,
              value,
              options
            );
          }
        },
        remove: (name, options) => {
          if ('delete' in cookieStore) {
            (cookieStore as typeof cookieStore & { delete: typeof cookieStore.delete }).delete(
              name,
              options
            );
          }
        },
      },
    }
  );
};
