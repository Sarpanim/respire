'use client';

import { useEffect, useState } from 'react';
import { useTheme } from '@/lib/theme';

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true);
  }, []);

  if (!hasMounted) {
    return (
      <span className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-transparent" aria-hidden>
        <span className="h-4 w-4 animate-pulse rounded-full bg-slate-300 dark:bg-slate-700" />
      </span>
    );
  }

  const isDark = theme === 'dark';

  return (
    <button
      type="button"
      onClick={toggleTheme}
      className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-slate-300 bg-white text-slate-700 transition hover:border-slate-400 hover:bg-slate-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background dark:border-slate-600 dark:bg-slate-800 dark:text-slate-100 dark:hover:border-slate-400 dark:hover:bg-slate-700"
      aria-label={isDark ? 'Activer le mode clair' : 'Activer le mode sombre'}
      aria-pressed={isDark}
    >
      {isDark ? (
        <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden>
          <path
            fill="currentColor"
            d="M12 3.75a.75.75 0 0 1 .75.75v1.5a.75.75 0 0 1-1.5 0V4.5A.75.75 0 0 1 12 3.75Zm7.5 8.25a.75.75 0 0 1 .75-.75h1.5a.75.75 0 0 1 0 1.5H20.25a.75.75 0 0 1-.75-.75ZM12 18.75a.75.75 0 0 1 .75.75V21a.75.75 0 0 1-1.5 0v-1.5a.75.75 0 0 1 .75-.75ZM3.75 12a.75.75 0 0 1-.75.75H1.5a.75.75 0 0 1 0-1.5h1.5a.75.75 0 0 1 .75.75Zm14.72-6.47a.75.75 0 0 1 1.06 0l1.06 1.06a.75.75 0 0 1-1.06 1.06l-1.06-1.06a.75.75 0 0 1 0-1.06ZM5.41 18.59a.75.75 0 0 1 0 1.06l-1.06 1.06a.75.75 0 1 1-1.06-1.06l1.06-1.06a.75.75 0 0 1 1.06 0ZM18.59 18.59a.75.75 0 0 1 0 1.06l-1.06 1.06a.75.75 0 1 1-1.06-1.06l1.06-1.06a.75.75 0 0 1 1.06 0ZM6.47 5.41a.75.75 0 0 1 0-1.06L5.41 3.29A.75.75 0 0 1 6.47 2.23l1.06 1.06a.75.75 0 0 1-1.06 1.06ZM12 6.75a5.25 5.25 0 1 1 0 10.5a5.25 5.25 0 0 1 0-10.5Z"
          />
        </svg>
      ) : (
        <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden>
          <path
            fill="currentColor"
            d="M17.293 14.293a1 1 0 0 1 1.414 1.414a8.5 8.5 0 1 1-10.414-10.414a1 1 0 0 1 1.414 1.414a6.5 6.5 0 1 0 7.586 7.586Z"
          />
        </svg>
      )}
    </button>
  );
}
