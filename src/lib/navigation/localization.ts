import type { Locale } from '@/types';

const LOCALE_SEGMENT_INDEX = 1;

export const buildPathWithLocale = (pathname: string | null | undefined, targetLocale: Locale) => {
  if (!pathname) {
    return `/${targetLocale}`;
  }

  const segments = pathname.split('/');

  if (segments.length > LOCALE_SEGMENT_INDEX) {
    segments[LOCALE_SEGMENT_INDEX] = targetLocale;
  }

  const candidate = segments.join('/') || `/${targetLocale}`;

  return candidate.startsWith('/') ? candidate : `/${candidate}`;
};
