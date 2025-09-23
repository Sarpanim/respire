export type ThemeTokenGroup = Record<string, string>;

export type ThemeTokensMetadata = {
  colorScheme: 'light' | 'dark';
};

export type ThemeTokens = {
  colors: ThemeTokenGroup;
  metadata: ThemeTokensMetadata;
};

export type ThemeTokensInput = {
  colors?: ThemeTokenGroup;
  metadata?: Partial<ThemeTokensMetadata>;
};

export const DEFAULT_THEME_TOKENS: ThemeTokens = {
  colors: {
    background: '#020617',
    backgroundMuted: '#0f172a',
    card: '#0f172a',
    cardForeground: '#e2e8f0',
    muted: '#1f2937',
    mutedForeground: '#94a3b8',
    accent: '#1f2937',
    accentForeground: '#f8fafc',
    border: '#1e293b',
    input: '#0f172a',
    ring: '#3a8dff',
    foreground: '#f8fafc',
    primary: '#3A8DFF',
    primaryDark: '#1B65D4',
    primaryForeground: '#ffffff',
  },
  metadata: {
    colorScheme: 'dark',
  },
};

function toKebabCase(value: string): string {
  return value
    .replace(/([a-z0-9])([A-Z])/g, '$1-$2')
    .replace(/[\s_]+/g, '-')
    .toLowerCase();
}

function hexToRgbChannels(value: string): string | null {
  const hex = value.replace('#', '');

  if (![3, 4, 6, 8].includes(hex.length)) {
    return null;
  }

  const expand = (input: string) => (input.length === 1 ? input.repeat(2) : input);

  const red = parseInt(expand(hex.slice(0, hex.length === 3 || hex.length === 4 ? 1 : 2)), 16);
  const green = parseInt(
    expand(
      hex.slice(
        hex.length === 3 || hex.length === 4 ? 1 : 2,
        hex.length === 3 || hex.length === 4 ? 2 : 4
      )
    ),
    16
  );
  const blue = parseInt(
    expand(
      hex.slice(
        hex.length === 3 || hex.length === 4 ? 2 : 4,
        hex.length === 3 || hex.length === 4 ? 3 : 6
      )
    ),
    16
  );

  if ([red, green, blue].some((channel) => Number.isNaN(channel))) {
    return null;
  }

  return `${red} ${green} ${blue}`;
}

function parseRgbFunction(value: string): string | null {
  const match = value.match(/^rgba?\(([^)]+)\)$/i);

  if (!match) {
    return null;
  }

  const [channelsPart] = match[1]
    .replace(/,/g, ' ')
    .split('/')
    .map((segment) => segment.trim());

  const [redRaw, greenRaw, blueRaw] = (channelsPart ?? '')
    .split(/\s+/)
    .map((segment) => segment.trim())
    .filter((segment) => segment.length > 0);

  if (redRaw === undefined || greenRaw === undefined || blueRaw === undefined) {
    return null;
  }

  const numericChannel = (channel: string) => parseFloat(channel);
  const red = numericChannel(redRaw);
  const green = numericChannel(greenRaw);
  const blue = numericChannel(blueRaw);

  if ([red, green, blue].some((channel) => Number.isNaN(channel))) {
    return null;
  }

  const channels = `${Math.round(red)} ${Math.round(green)} ${Math.round(blue)}`;

  return channels;
}

function formatColorValue(value: string): string {
  const trimmed = value.trim();

  if (!trimmed) {
    return trimmed;
  }

  if (trimmed.startsWith('var(')) {
    return trimmed;
  }

  if (trimmed.startsWith('#')) {
    return hexToRgbChannels(trimmed) ?? trimmed;
  }

  if (/^rgba?\(/i.test(trimmed)) {
    return parseRgbFunction(trimmed) ?? trimmed;
  }

  if (/^\d+(\.\d+)?\s+\d+(\.\d+)?\s+\d+(\.\d+)?(\s*\/\s*.+)?$/.test(trimmed)) {
    const [channels] = trimmed.split('/');
    return channels.trim();
  }

  return trimmed;
}

export function normalizeThemeTokens(tokens?: ThemeTokens | ThemeTokensInput | null): ThemeTokens {
  return {
    colors: {
      ...DEFAULT_THEME_TOKENS.colors,
      ...(tokens?.colors ?? {}),
    },
    metadata: {
      ...DEFAULT_THEME_TOKENS.metadata,
      ...(tokens?.metadata ?? {}),
    },
  };
}

export function mergeThemeTokens(base: ThemeTokens, override?: ThemeTokensInput | null): ThemeTokens {
  return normalizeThemeTokens({
    colors: {
      ...base.colors,
      ...(override?.colors ?? {}),
    },
    metadata: {
      ...base.metadata,
      ...(override?.metadata ?? {}),
    },
  });
}

export function themeTokensToCssVariables(tokens: ThemeTokens): Record<string, string> {
  const variables: Record<string, string> = {};

  Object.entries(tokens.colors).forEach(([token, value]) => {
    if (typeof value !== 'string') {
      return;
    }

    variables[`--color-${toKebabCase(token)}`] = formatColorValue(value);
  });

  if (tokens.metadata?.colorScheme) {
    variables['--color-scheme'] = tokens.metadata.colorScheme;
  }

  return variables;
}
