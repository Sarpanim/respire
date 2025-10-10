'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import type { Locale } from '@/types';

import { LanguageSwitcher } from './LanguageSwitcher';
import { AuthPanel } from '@/components/ui/AuthPanel';

const NAV_LINKS = [
  { href: '/', scope: 'locale' as const, label: { en: 'Home', fr: 'Accueil' } },
  { href: '/auth', scope: 'global' as const, label: { en: 'Auth', fr: 'Connexion' } },
];

type HeaderProps = {
  locale: Locale;
};

const getHref = (locale: Locale, href: string, scope: 'locale' | 'global') => {
  if (scope === 'global') {
    return href;
  }

  if (href === '/') {
    return `/${locale}`;
  }

  if (href.startsWith('/')) {
    return `/${locale}${href}`;
  }

  return href;
};

export function Header({ locale }: HeaderProps) {
  const pathname = usePathname();

  return (
    <header className="site-header">
      <div className="site-header__inner">
        <Link className="site-brand" href={`/${locale}`}>
          Respire
        </Link>

        <nav className="site-nav" aria-label="Main navigation">
          {NAV_LINKS.map((link) => {
            const translatedLabel = link.label[locale];
            const href = getHref(locale, link.href, link.scope);
            const isActive = pathname === href;

            return (
              <Link
                key={href}
                className="site-nav__link"
                href={href}
                aria-current={isActive ? 'page' : undefined}
              >
                {translatedLabel}
              </Link>
            );
          })}
        </nav>

        <div className="header-actions">
          <LanguageSwitcher currentLocale={locale} />
          <AuthPanel />
        </div>
      </div>
    </header>
  );
}
