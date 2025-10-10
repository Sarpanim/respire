'use client';

import { createContext, useContext, useEffect, useState, useMemo } from 'react';
import { COLOR_THEME_IDS, type ColorTheme } from './theme-options';

export type Theme = 'light' | 'dark';

const COLOR_THEME_CLASSNAMES = COLOR_THEME_IDS.map((id) => `theme-${id}`);
const DEFAULT_COLOR_THEME: ColorTheme = 'azure';

type ThemeContextType = {
  theme: Theme;
  colorTheme: ColorTheme;
  setTheme: (theme: Theme) => void;
  setColorTheme: (theme: ColorTheme) => void;
  toggleTheme: () => void;
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setThemeState] = useState<Theme>('dark');
  const [colorTheme, setColorThemeState] = useState<ColorTheme>(DEFAULT_COLOR_THEME);
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    setIsHydrated(true);
  }, []);

  useEffect(() => {
    if (!isHydrated) return;

    const storedTheme = localStorage.getItem('theme') as Theme | null;
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const initialTheme = storedTheme ?? (prefersDark ? 'dark' : 'light');
    setThemeState(initialTheme);

    const storedColorTheme = localStorage.getItem('color-theme');
    if (storedColorTheme && COLOR_THEME_IDS.includes(storedColorTheme as ColorTheme)) {
      setColorThemeState(storedColorTheme as ColorTheme);
    } else {
      setColorThemeState(DEFAULT_COLOR_THEME);
    }
  }, [isHydrated]);

  useEffect(() => {
    if (!isHydrated) return;

    const root = document.documentElement;
    root.classList.remove('light', 'dark');
    root.classList.add(theme);
    localStorage.setItem('theme', theme);
  }, [theme, isHydrated]);

  useEffect(() => {
    if (!isHydrated) return;

    const root = document.documentElement;
    root.classList.remove(...COLOR_THEME_CLASSNAMES);
    root.classList.add(`theme-${colorTheme}`);
    localStorage.setItem('color-theme', colorTheme);
  }, [colorTheme, isHydrated]);

  const setTheme = (newTheme: Theme) => {
    setThemeState(newTheme);
  };

  const setColorTheme = (newTheme: ColorTheme) => {
    setColorThemeState(newTheme);
  };

  const toggleTheme = () => {
    setThemeState((current) => (current === 'dark' ? 'light' : 'dark'));
  };

  const value = useMemo(
    () => ({
      theme,
      colorTheme,
      setTheme,
      setColorTheme,
      toggleTheme,
    }),
    [theme, colorTheme]
  );

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}
