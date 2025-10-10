import type { Metadata } from 'next';
import './globals.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
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
    <html lang="fr" className="dark theme-azure" suppressHydrationWarning>
      <body className="min-h-screen bg-background font-sans text-foreground antialiased transition-colors">
        <ThemeProvider>
          <div className="flex min-h-screen flex-col">
            <Header session={session} />
            <main className="mx-auto w-full max-w-6xl flex-1 px-4 pb-24 pt-12 sm:pt-16">{children}</main>
            <Footer />
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
