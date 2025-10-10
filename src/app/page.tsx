import { redirect } from 'next/navigation';

import { defaultLocale } from '@/types';

export default function RootRedirectPage() {
  redirect(`/${defaultLocale}`);
}
