import Link from 'next/link';

import { Header } from '@/components/layout/Header';
import { SessionProvider } from '@/components/layout/SessionProvider';
import { createServerSupabase } from '@/lib/supabase/server';
import { defaultLocale, locales } from '@/types';

export default async function AuthPage() {
  const supabase = createServerSupabase();
  const {
    data: { session },
  } = await supabase.auth.getSession();

  return (
    <SessionProvider session={session}>
      <div className="layout">
        <Header locale={defaultLocale} />
        <main className="main">
          <section className="surface-card">
            <h1 style={{ marginTop: 0 }}>Authentication</h1>
            <p className="card-description">
              {session
                ? 'You are currently signed in via Supabase. Use the header button to sign out if needed.'
                : 'Sign in with Google from the header to create a Supabase session and unlock protected areas.'}
            </p>
            <p className="card-description">
              Ready to explore? Pick a locale to go back to the demo experience:
            </p>
            <div style={{ display: 'flex', gap: '0.75rem' }}>
              {locales.map((locale) => (
                <Link key={locale} className="button button--secondary" href={`/${locale}`}>
                  {locale === 'fr'
                    ? 'Accueil français'
                    : locale === 'es'
                      ? 'Inicio español'
                      : 'English home'}
                </Link>
              ))}
            </div>
          </section>
        </main>
      </div>
    </SessionProvider>
  );
}
