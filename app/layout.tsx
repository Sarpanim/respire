import type { CSSProperties, ReactNode } from 'react';
import type { Metadata } from 'next';
import './globals.css';
import Header from '@/components/Header';
import ThemeProvider from '@/components/ThemeProvider';
import { fetchActiveThemeTokens } from '@/lib/supabase-theme';
import { themeTokensToCssVariables } from '@/lib/theme-tokens';
import { createClient } from '@/lib/supabase-server';
import type { Session } from '@supabase/supabase-js';

export const metadata: Metadata = {
  title: 'Respire – Méditation guidée',
  description: 'Une application de méditation moderne pour respirer, ralentir et se recentrer.',
};

export default async function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  let session: Session | null = null;
  const themeTokens = await fetchActiveThemeTokens();
  const htmlStyle = themeTokensToCssVariables(themeTokens) as CSSProperties;

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
    <html lang="fr" style={htmlStyle}>
      <body className="min-h-screen bg-gradient-to-b from-background via-background to-background-muted">
        <ThemeProvider initialTokens={themeTokens}>
          <Header session={session} />
          <main className="mx-auto w-full max-w-5xl px-4 pb-20 pt-8 sm:pt-12">{children}</main>
        </ThemeProvider>
      </body>
    </html>
  );
}
