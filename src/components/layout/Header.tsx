'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import type { Route } from 'next';

import type { Locale, LocalizedString } from '@/types';

import { LanguageSwitcher } from './LanguageSwitcher';
import { AuthPanel } from '@/components/ui/AuthPanel';

const NAV_LINKS: { href: string; scope: 'locale' | 'global'; label: LocalizedString }[] = [
  {
    href: '/',
    scope: 'locale',
    label: {
      fr: 'Accueil',
      es: 'Inicio',
      en: 'Home',
    },
  },
  {
    href: '/courses',
    scope: 'global',
    label: {
      fr: 'Cours',
      es: 'Cursos',
      en: 'Courses',
    },
  },
  {
    href: '/auth',
    scope: 'global',
    label: {
      fr: 'Connexion',
      es: 'Autenticación',
      en: 'Auth',
    },
  },
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
            const href = getHref(locale, link.href, link.scope) as Route;
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
