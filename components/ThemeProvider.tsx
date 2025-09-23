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
import {
  DEFAULT_THEME_TOKENS,
  ThemeTokens,
  ThemeTokensInput,
  mergeThemeTokens,
  normalizeThemeTokens,
  themeTokensToCssVariables,
} from '@/lib/theme-tokens';

function applyTokensToDocument(tokens: ThemeTokens) {
  if (typeof document === 'undefined') {
    return;
  }

  const root = document.documentElement;
  const variables = themeTokensToCssVariables(tokens);

  for (const [variable, value] of Object.entries(variables)) {
    root.style.setProperty(variable, value);
  }

  const colorScheme = tokens.metadata?.colorScheme ?? DEFAULT_THEME_TOKENS.metadata.colorScheme;
  root.dataset.theme = colorScheme;
  root.classList.toggle('dark', colorScheme === 'dark');
}

type ThemeContextValue = {
  tokens: ThemeTokens;
  setThemeTokens: (tokens: ThemeTokens) => void;
  updateThemeTokens: (tokens: ThemeTokensInput) => void;
};

const ThemeContext = createContext<ThemeContextValue | undefined>(undefined);

export default function ThemeProvider({
  initialTokens = DEFAULT_THEME_TOKENS,
  children,
}: {
  initialTokens?: ThemeTokens;
  children: ReactNode;
}) {
  const [tokens, setTokens] = useState<ThemeTokens>(() => normalizeThemeTokens(initialTokens));

  useEffect(() => {
    applyTokensToDocument(tokens);
  }, [tokens]);

  const setThemeTokens = useCallback((nextTokens: ThemeTokens) => {
    setTokens(normalizeThemeTokens(nextTokens));
  }, []);

  const updateThemeTokens = useCallback((nextTokens: ThemeTokensInput) => {
    setTokens((previous) => mergeThemeTokens(previous, nextTokens));
  }, []);

  const value = useMemo<ThemeContextValue>(
    () => ({
      tokens,
      setThemeTokens,
      updateThemeTokens,
    }),
    [tokens, setThemeTokens, updateThemeTokens]
  );

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useThemeTokens() {
  const context = useContext(ThemeContext);

  if (!context) {
    throw new Error('useThemeTokens must be used within a ThemeProvider.');
  }

  return context;
}
