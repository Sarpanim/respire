export type ThemeTokenGroup = Record<string, string>;

export type ThemeTokens = {
  colors: ThemeTokenGroup;
};

export type ThemeTokensInput = Partial<ThemeTokens>;

export const DEFAULT_THEME_TOKENS: ThemeTokens = {
  colors: {
    background: '#020617',
    foreground: '#f8fafc',
    primary: '#3A8DFF',
    primaryDark: '#1B65D4',
    primaryForeground: '#ffffff',
  },
};

function toKebabCase(value: string): string {
  return value
    .replace(/([a-z0-9])([A-Z])/g, '$1-$2')
    .replace(/[\s_]+/g, '-')
    .toLowerCase();
}

export function normalizeThemeTokens(tokens?: ThemeTokens | ThemeTokensInput | null): ThemeTokens {
  return {
    colors: {
      ...DEFAULT_THEME_TOKENS.colors,
      ...(tokens?.colors ?? {}),
    },
  };
}

export function mergeThemeTokens(base: ThemeTokens, override?: ThemeTokensInput | null): ThemeTokens {
  return normalizeThemeTokens({
    colors: {
      ...base.colors,
      ...(override?.colors ?? {}),
    },
  });
}

export function themeTokensToCssVariables(tokens: ThemeTokens): Record<string, string> {
  const variables: Record<string, string> = {};

  Object.entries(tokens.colors).forEach(([token, value]) => {
    if (typeof value !== 'string') {
      return;
    }

    variables[`--color-${toKebabCase(token)}`] = value;
  });

  return variables;
}
