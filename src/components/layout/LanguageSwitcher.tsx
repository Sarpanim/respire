'use client';

import { useTransition } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import type { Route } from 'next';

import { locales, type Locale } from '@/types';
import { buildPathWithLocale } from '@/lib/navigation/localization';

type LanguageSwitcherProps = {
  currentLocale: Locale;
};

export function LanguageSwitcher({ currentLocale }: LanguageSwitcherProps) {
  const router = useRouter();
  const pathname = usePathname();
  const [isPending, startTransition] = useTransition();

  const handleSwitch = (locale: Locale) => {
    if (locale === currentLocale) {
      return;
    }

    const nextPath = buildPathWithLocale(pathname, locale) as Route;

    startTransition(() => {
      router.push(nextPath);
    });
  };

  return (
    <div className="language-switcher" aria-live="polite">
      {locales.map((locale) => (
        <button
          key={locale}
          type="button"
          onClick={() => handleSwitch(locale)}
          aria-pressed={locale === currentLocale}
          disabled={isPending && locale !== currentLocale}
        >
          {locale.toUpperCase()}
        </button>
      ))}
    </div>
  );
}
