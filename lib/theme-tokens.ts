export const THEME_COLOR_TOKENS = [
  'background',
  'backgroundMuted',
  'card',
  'cardForeground',
  'foreground',
  'primary',
  'primaryDark',
  'primaryForeground',
  'muted',
  'mutedForeground',
  'accent',
  'accentForeground',
  'border',
  'input',
  'ring',
] as const;

export type ThemeColorToken = (typeof THEME_COLOR_TOKENS)[number];

export type ThemeTokenGroup = Record<ThemeColorToken, string> & {
  [key: string]: string | undefined;
};

export type ThemeTokenOverrides = Partial<Record<ThemeColorToken, string>> & {
  [key: string]: string | undefined;
};

export type ThemeTokensMetadata = {
  colorScheme: 'light' | 'dark';
};

export type ThemeTokens = {
  colors: ThemeTokenGroup;
  metadata: ThemeTokensMetadata;
};

export type ThemeTokensInput = {
  colors?: ThemeTokenOverrides | null;
  metadata?: Partial<ThemeTokensMetadata> | null;
};

const DEFAULT_COLOR_VALUES = {
  background: '#020617',
  backgroundMuted: '#0f172a',
  card: '#0f172a',
  cardForeground: '#e2e8f0',
  foreground: '#f8fafc',
  primary: '#3A8DFF',
  primaryDark: '#1B65D4',
  primaryForeground: '#ffffff',
  muted: '#1f2937',
  mutedForeground: '#94a3b8',
  accent: '#1f2937',
  accentForeground: '#f8fafc',
  border: '#1e293b',
  input: '#0f172a',
  ring: '#3a8dff',
} satisfies Record<ThemeColorToken, string>;

export const DEFAULT_THEME_TOKENS: ThemeTokens = {
  colors: DEFAULT_COLOR_VALUES as ThemeTokenGroup,
  metadata: {
    colorScheme: 'dark',
  },
};

export const COLOR_TOKEN_TAILWIND_PATHS = {
  background: ['background'],
  backgroundMuted: ['background-muted'],
  card: ['card', 'DEFAULT'],
  cardForeground: ['card', 'foreground'],
  foreground: ['foreground'],
  primary: ['primary', 'DEFAULT'],
  primaryDark: ['primary', 'dark'],
  primaryForeground: ['primary', 'foreground'],
  muted: ['muted', 'DEFAULT'],
  mutedForeground: ['muted', 'foreground'],
  accent: ['accent', 'DEFAULT'],
  accentForeground: ['accent', 'foreground'],
  border: ['border'],
  input: ['input'],
  ring: ['ring'],
} as const satisfies Record<ThemeColorToken, readonly string[]>;

function toKebabCase(value: string): string {
  return value
    .replace(/([a-z0-9])([A-Z])/g, '$1-$2')
    .replace(/[\s_]+/g, '-')
    .toLowerCase();
}

function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max);
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

  const parseChannel = (channel: string): number | null => {
    const trimmed = channel.trim();

    if (!trimmed) {
      return null;
    }

    const isPercentage = trimmed.endsWith('%');
    const numeric = Number.parseFloat(trimmed);

    if (Number.isNaN(numeric)) {
      return null;
    }

    if (isPercentage) {
      return Math.round(clamp(numeric, 0, 100) * 2.55);
    }

    return Math.round(clamp(numeric, 0, 255));
  };

  const red = parseChannel(redRaw);
  const green = parseChannel(greenRaw);
  const blue = parseChannel(blueRaw);

  if ([red, green, blue].some((channel) => channel === null)) {
    return null;
  }

  const channels = `${red ?? 0} ${green ?? 0} ${blue ?? 0}`;

  return channels;
}

function parseHue(value: string): number | null {
  const trimmed = value.trim();

  if (!trimmed) {
    return null;
  }

  const normalized = trimmed.toLowerCase();
  let numeric: number;

  if (normalized.endsWith('deg')) {
    numeric = Number.parseFloat(normalized.slice(0, -3));
  } else if (normalized.endsWith('rad')) {
    numeric = Number.parseFloat(normalized.slice(0, -3)) * (180 / Math.PI);
  } else if (normalized.endsWith('turn')) {
    numeric = Number.parseFloat(normalized.slice(0, -4)) * 360;
  } else {
    numeric = Number.parseFloat(normalized);
  }

  if (Number.isNaN(numeric)) {
    return null;
  }

  const wrapped = ((numeric % 360) + 360) % 360;

  return wrapped;
}

function parsePercentage(value: string): number | null {
  const trimmed = value.trim();

  if (!trimmed) {
    return null;
  }

  const normalized = trimmed.toLowerCase();
  const isPercentage = normalized.endsWith('%');
  const numeric = Number.parseFloat(normalized.replace('%', ''));

  if (Number.isNaN(numeric)) {
    return null;
  }

  if (isPercentage) {
    return clamp(numeric / 100, 0, 1);
  }

  if (numeric > 1) {
    return clamp(numeric / 100, 0, 1);
  }

  return clamp(numeric, 0, 1);
}

function hslToRgb(hue: number, saturation: number, lightness: number): [number, number, number] {
  const h = hue / 360;
  const s = clamp(saturation, 0, 1);
  const l = clamp(lightness, 0, 1);

  if (s === 0) {
    const value = Math.round(l * 255);
    return [value, value, value];
  }

  const hueToRgb = (p: number, q: number, t: number) => {
    let temp = t;

    if (temp < 0) temp += 1;
    if (temp > 1) temp -= 1;
    if (temp < 1 / 6) return p + (q - p) * 6 * temp;
    if (temp < 1 / 2) return q;
    if (temp < 2 / 3) return p + (q - p) * (2 / 3 - temp) * 6;
    return p;
  };

  const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
  const p = 2 * l - q;

  const red = hueToRgb(p, q, h + 1 / 3);
  const green = hueToRgb(p, q, h);
  const blue = hueToRgb(p, q, h - 1 / 3);

  return [Math.round(red * 255), Math.round(green * 255), Math.round(blue * 255)];
}

function parseHslFunction(value: string): string | null {
  const match = value.match(/^hsla?\(([^)]+)\)$/i);

  if (!match) {
    return null;
  }

  const [channelsPart] = match[1]
    .replace(/,/g, ' ')
    .split('/')
    .map((segment) => segment.trim());

  if (!channelsPart) {
    return null;
  }

  const [hRaw, sRaw, lRaw] = channelsPart
    .split(/\s+/)
    .map((segment) => segment.trim())
    .filter((segment) => segment.length > 0);

  if (!hRaw || !sRaw || !lRaw) {
    return null;
  }

  const hue = parseHue(hRaw);
  const saturation = parsePercentage(sRaw);
  const lightness = parsePercentage(lRaw);

  if (hue === null || saturation === null || lightness === null) {
    return null;
  }

  const [red, green, blue] = hslToRgb(hue, saturation, lightness);

  return `${red} ${green} ${blue}`;
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

  if (/^hsla?\(/i.test(trimmed)) {
    return parseHslFunction(trimmed) ?? trimmed;
  }

  if (/^\d+(\.\d+)?\s+\d+(\.\d+)?\s+\d+(\.\d+)?(\s*\/\s*.+)?$/.test(trimmed)) {
    const [channels] = trimmed.split('/');
    return channels.trim();
  }

  return trimmed;
}

function normalizeColorScheme(value?: string | null): ThemeTokensMetadata['colorScheme'] {
  return value === 'dark' ? 'dark' : 'light';
}

export function normalizeThemeTokens(tokens?: ThemeTokens | ThemeTokensInput | null): ThemeTokens {
  const normalizedColors: ThemeTokenGroup = { ...DEFAULT_THEME_TOKENS.colors } as ThemeTokenGroup;
  const mutableColors: Record<string, string | undefined> = normalizedColors;

  if (tokens?.colors) {
    Object.entries(tokens.colors).forEach(([token, value]) => {
      if (typeof value === 'string' && value.trim().length > 0) {
        mutableColors[token] = value;
      }
    });
  }

  const metadata = {
    colorScheme: normalizeColorScheme(tokens?.metadata?.colorScheme ?? DEFAULT_THEME_TOKENS.metadata.colorScheme),
  } satisfies ThemeTokensMetadata;

  return {
    colors: normalizedColors,
    metadata,
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

  variables['--color-scheme'] = normalizeColorScheme(tokens.metadata?.colorScheme);

  return variables;
}

type TailwindColorConfig = {
  [key: string]: string | TailwindColorConfig;
};

export function createTailwindColorConfig(): TailwindColorConfig {
  const colors: TailwindColorConfig = {};

  Object.entries(COLOR_TOKEN_TAILWIND_PATHS).forEach(([token, path]) => {
    const segments = [...path];
    const colorValue = `rgb(var(--color-${toKebabCase(token)}) / <alpha-value>)`;
    let cursor: TailwindColorConfig = colors;

    for (let index = 0; index < segments.length - 1; index += 1) {
      const segment = segments[index];
      if (!cursor[segment] || typeof cursor[segment] === 'string') {
        cursor[segment] = {};
      }

      cursor = cursor[segment] as TailwindColorConfig;
    }

    const lastSegment = segments[segments.length - 1];
    cursor[lastSegment] = colorValue;
  });

  return colors;
}
