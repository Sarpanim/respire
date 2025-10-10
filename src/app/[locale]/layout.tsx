import type { ReactNode } from 'react';
import { notFound } from 'next/navigation';

import { SessionProvider } from '@/components/layout/SessionProvider';
import { Header } from '@/components/layout/Header';
import { createServerSupabase } from '@/lib/supabase/server';
import { locales, type Locale } from '@/types';

type LocaleLayoutProps = {
  children: ReactNode;
  params: { locale: string };
};

export default async function LocaleLayout({ children, params }: LocaleLayoutProps) {
  const locale = params.locale as Locale;

  if (!locales.includes(locale)) {
    notFound();
  }

  const supabase = createServerSupabase();
  const {
    data: { session },
  } = await supabase.auth.getSession();

  return (
    <SessionProvider session={session}>
      <div className="layout">
        <Header locale={locale} />
        <main className="main">{children}</main>
      </div>
    </SessionProvider>
  );
}
