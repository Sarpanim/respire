import type { Metadata } from 'next';
import './globals.css';
import Header from '@/components/Header';
import { createClient } from '@/lib/supabase-server';
import type { Session } from '@supabase/supabase-js';
import { ThemeProvider } from '@/lib/theme';

export const metadata: Metadata = {
  title: 'Respire – Méditation guidée',
  description: 'Une application de méditation moderne pour respirer, ralentir et se recentrer.',
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
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
    <html lang="fr" suppressHydrationWarning>
      <body className="min-h-screen bg-background font-sans antialiased">
        <ThemeProvider>
          <Header session={session} />
          <main className="mx-auto w-full max-w-5xl px-4 pb-20 pt-8 sm:pt-12">{children}</main>
        </ThemeProvider>
      </body>
    </html>
  );
}
