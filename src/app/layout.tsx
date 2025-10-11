import type { Metadata } from 'next';
import type { ReactNode } from 'react';

import './globals.css';
import { defaultLocale } from '@/types';

export const metadata: Metadata = {
  title: 'Respire Supabase Starter',
  description: 'A modular Next.js starter wired to Supabase with SSR session support.',
};

type RootLayoutProps = {
  children: ReactNode;
};

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang={defaultLocale}>
      <body>{children}</body>
    </html>
  );
}
