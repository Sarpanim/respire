'use client';

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react';

export type Theme = 'light' | 'dark';

const DATA_ATTR = 'theme';

export function getTheme(): Theme {
  if (typeof document === 'undefined') {
    return 'light';
  }

  const value = document.documentElement.dataset[DATA_ATTR];
  return value === 'dark' ? 'dark' : 'light';
}

export function setTheme(theme: Theme) {
  if (typeof document === 'undefined') {
    return;
  }

  document.documentElement.dataset[DATA_ATTR] = theme;

  if (theme === 'dark') {
    document.documentElement.classList.add('dark');
  } else {
    document.documentElement.classList.remove('dark');
  }

  // TODO: Persist the chosen theme once a public switcher is introduced.
}

type ThemeContextValue = {
  theme: Theme;
  setTheme: (theme: Theme) => void;
};

const ThemeContext = createContext<ThemeContextValue | undefined>(undefined);

export function ThemeProvider({
  children,
  defaultTheme,
}: {
  children: ReactNode;
  defaultTheme?: Theme;
}) {
  const [theme, setThemeState] = useState<Theme>(() => defaultTheme ?? getTheme());

  useEffect(() => {
    setTheme(theme);
  }, [theme]);

  const handleSetTheme = useCallback((nextTheme: Theme) => {
    setThemeState(nextTheme);
  }, []);

  const value = useMemo<ThemeContextValue>(
    () => ({
      theme,
      setTheme: handleSetTheme,
    }),
    [theme, handleSetTheme]
  );

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useTheme(): ThemeContextValue {
  const context = useContext(ThemeContext);

  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider.');
  }

  return context;
}
