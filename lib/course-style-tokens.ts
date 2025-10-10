import type { CourseCategory } from '@/app/data/courses';

export const courseCategoryTokens: Record<
  CourseCategory,
  {
    badge: string;
    glow: string;
  }
> = {
  sommeil: {
    badge:
      'bg-sky-500/15 text-sky-600 ring-1 ring-inset ring-sky-400/40 dark:bg-sky-500/15 dark:text-sky-200 dark:ring-sky-400/40',
    glow: 'from-sky-400/25 via-transparent to-transparent dark:from-sky-500/25',
  },
  stress: {
    badge:
      'bg-rose-500/15 text-rose-600 ring-1 ring-inset ring-rose-400/40 dark:bg-rose-500/15 dark:text-rose-200 dark:ring-rose-400/40',
    glow: 'from-rose-400/20 via-transparent to-transparent dark:from-rose-500/25',
  },
  concentration: {
    badge:
      'bg-amber-500/15 text-amber-600 ring-1 ring-inset ring-amber-400/40 dark:bg-amber-500/15 dark:text-amber-200 dark:ring-amber-400/40',
    glow: 'from-amber-300/20 via-transparent to-transparent dark:from-amber-400/25',
  },
  compassion: {
    badge:
      'bg-emerald-500/15 text-emerald-600 ring-1 ring-inset ring-emerald-400/40 dark:bg-emerald-500/15 dark:text-emerald-200 dark:ring-emerald-400/40',
    glow: 'from-emerald-300/20 via-transparent to-transparent dark:from-emerald-400/25',
  },
};
