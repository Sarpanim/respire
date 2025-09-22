import type { CSSProperties } from 'react';
import type { Metadata } from 'next';
import './globals.css';
import Header from '@/components/Header';
import { createClient } from '@/lib/supabase-server';
import { buildCssVariables, fetchActiveTheme } from '@/lib/themes';
import type { Session } from '@supabase/supabase-js';

export const metadata: Metadata = {
  title: 'Respire – Méditation guidée',
  description: 'Une application de méditation moderne pour respirer, ralentir et se recentrer.',
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const activeTheme = await fetchActiveTheme();
  const cssVarStyle = buildCssVariables(activeTheme.tokens) as CSSProperties;
  let session: Session | null = null;

  try {
    const supabase = createClient();
    const {
      data: { session: currentSession },
    } = await supabase.auth.getSession();
    session = currentSession;
  } catch (error) {
    session = null;
  }

  return (
    <html lang="fr" style={cssVarStyle}>
      <body className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-950 to-slate-900">
        <Header session={session} />
        <main className="mx-auto w-full max-w-5xl px-4 pb-20 pt-8 sm:pt-12">{children}</main>
      </body>
    </html>
  );
}
