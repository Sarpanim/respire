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

type FlexibleRecord<TKey extends string> = Record<TKey, string> & {
  [key: string]: string | undefined;
};

type FlexiblePartial<TKey extends string> = Partial<Record<TKey, string>> & {
  [key: string]: string | undefined;
};

export type ThemeTokenGroup = FlexibleRecord<ThemeColorToken>;

export type ThemeTokenOverrides = FlexiblePartial<ThemeColorToken>;

export const THEME_RADIUS_TOKENS = ['none', 'sm', 'md', 'lg', 'xl', 'pill', 'card'] as const;

export type ThemeRadiusToken = (typeof THEME_RADIUS_TOKENS)[number];

export type ThemeRadiusGroup = FlexibleRecord<ThemeRadiusToken>;

export type ThemeRadiusOverrides = FlexiblePartial<ThemeRadiusToken>;

export const THEME_SPACING_TOKENS = [
  'xs',
  'sm',
  'md',
  'lg',
  'xl',
  '2xl',
  'section-x',
  'section-y',
  'card',
  'control',
  'control-sm',
  'control-lg',
  'control-icon',
  'control-x',
  'control-y',
  'control-sm-x',
  'control-sm-y',
  'control-lg-x',
  'control-lg-y',
  'control-gap',
  'button-raise',
] as const;

export type ThemeSpacingToken = (typeof THEME_SPACING_TOKENS)[number];

export type ThemeSpacingGroup = FlexibleRecord<ThemeSpacingToken>;

export type ThemeSpacingOverrides = FlexiblePartial<ThemeSpacingToken>;

export const THEME_SHADOW_TOKENS = [
  'none',
  'sm',
  'md',
  'lg',
  'card',
  'button',
  'button-hover',
  'focus',
] as const;

export type ThemeShadowToken = (typeof THEME_SHADOW_TOKENS)[number];

export type ThemeShadowGroup = FlexibleRecord<ThemeShadowToken>;

export type ThemeShadowOverrides = FlexiblePartial<ThemeShadowToken>;

export const THEME_FONT_FAMILY_TOKENS = ['sans', 'heading', 'mono'] as const;
export const THEME_FONT_SIZE_TOKENS = ['xs', 'sm', 'base', 'lg', 'xl', '2xl', 'button'] as const;
export const THEME_LINE_HEIGHT_TOKENS = ['none', 'tight', 'snug', 'normal', 'relaxed', 'loose', 'button'] as const;
export const THEME_FONT_WEIGHT_TOKENS = ['light', 'normal', 'medium', 'semibold', 'bold'] as const;

export type ThemeFontFamilyToken = (typeof THEME_FONT_FAMILY_TOKENS)[number];
export type ThemeFontSizeToken = (typeof THEME_FONT_SIZE_TOKENS)[number];
export type ThemeLineHeightToken = (typeof THEME_LINE_HEIGHT_TOKENS)[number];
export type ThemeFontWeightToken = (typeof THEME_FONT_WEIGHT_TOKENS)[number];

export type ThemeFontFamilyGroup = FlexibleRecord<ThemeFontFamilyToken>;
export type ThemeFontSizeGroup = FlexibleRecord<ThemeFontSizeToken>;
export type ThemeLineHeightGroup = FlexibleRecord<ThemeLineHeightToken>;
export type ThemeFontWeightGroup = FlexibleRecord<ThemeFontWeightToken>;

export type ThemeTypographyGroup = {
  fontFamily: ThemeFontFamilyGroup;
  fontSize: ThemeFontSizeGroup;
  lineHeight: ThemeLineHeightGroup;
  fontWeight: ThemeFontWeightGroup;
};

export type ThemeTypographyOverrides = {
  fontFamily?: FlexiblePartial<ThemeFontFamilyToken> | null;
  fontSize?: FlexiblePartial<ThemeFontSizeToken> | null;
  lineHeight?: FlexiblePartial<ThemeLineHeightToken> | null;
  fontWeight?: FlexiblePartial<ThemeFontWeightToken> | null;
};

export type ThemeTokensMetadata = {
  colorScheme: 'light' | 'dark';
};

export type ThemeTokens = {
  colors: ThemeTokenGroup;
  radius: ThemeRadiusGroup;
  spacing: ThemeSpacingGroup;
  shadows: ThemeShadowGroup;
  typography: ThemeTypographyGroup;
  metadata: ThemeTokensMetadata;
};

export type ThemeTokensInput = {
  colors?: ThemeTokenOverrides | null;
  radius?: ThemeRadiusOverrides | null;
  spacing?: ThemeSpacingOverrides | null;
  shadows?: ThemeShadowOverrides | null;
  typography?: ThemeTypographyOverrides | null;
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

const DEFAULT_RADIUS_VALUES = {
  none: '0px',
  sm: '0.375rem',
  md: '0.5rem',
  lg: '0.75rem',
  xl: '1rem',
  pill: '9999px',
  card: '1rem',
} satisfies Record<ThemeRadiusToken, string>;

const DEFAULT_SPACING_VALUES = {
  xs: '0.5rem',
  sm: '0.75rem',
  md: '1rem',
  lg: '1.5rem',
  xl: '2rem',
  '2xl': '3rem',
  'section-x': '1.5rem',
  'section-y': '3rem',
  card: '1.75rem',
  control: '2.5rem',
  'control-sm': '2.25rem',
  'control-lg': '2.75rem',
  'control-icon': '2.5rem',
  'control-x': '1rem',
  'control-y': '0.5rem',
  'control-sm-x': '0.75rem',
  'control-sm-y': '0.375rem',
  'control-lg-x': '1.25rem',
  'control-lg-y': '0.75rem',
  'control-gap': '0.5rem',
  'button-raise': '0.125rem',
} satisfies Record<ThemeSpacingToken, string>;

const DEFAULT_SHADOW_VALUES = {
  none: '0 0 #0000',
  sm: '0 1px 2px 0 rgb(var(--color-foreground) / 0.08)',
  md: '0 4px 6px -1px rgb(var(--color-foreground) / 0.08), 0 2px 4px -2px rgb(var(--color-foreground) / 0.06)',
  lg: '0 12px 35px -15px rgb(var(--color-foreground) / 0.18)',
  card: '0 18px 50px -15px rgb(var(--color-background) / 0.55)',
  button: '0 5px 14px -6px rgb(var(--color-primary) / 0.55)',
  'button-hover': '0 22px 45px -20px rgb(var(--color-primary) / 0.6)',
  focus: '0 0 0 2px rgb(var(--color-primary-foreground) / 0.9), 0 0 0 4px rgb(var(--color-background) / 1)',
} satisfies Record<ThemeShadowToken, string>;

const DEFAULT_TYPOGRAPHY_VALUES = {
  fontFamily: {
    sans:
      "'Inter', 'SF Pro Display', -apple-system, BlinkMacSystemFont, 'Segoe UI', system-ui, sans-serif",
    heading:
      "'Cal Sans', 'Inter', 'SF Pro Display', -apple-system, BlinkMacSystemFont, 'Segoe UI', system-ui, sans-serif",
    mono:
      "'JetBrains Mono', 'Fira Code', 'SFMono-Regular', 'Menlo', 'Monaco', 'Consolas', 'Liberation Mono', 'Courier New', monospace",
  } satisfies Record<ThemeFontFamilyToken, string>,
  fontSize: {
    xs: '0.75rem',
    sm: '0.875rem',
    base: '1rem',
    lg: '1.125rem',
    xl: '1.25rem',
    '2xl': '1.5rem',
    button: '0.9375rem',
  } satisfies Record<ThemeFontSizeToken, string>,
  lineHeight: {
    none: '1',
    tight: '1.25',
    snug: '1.35',
    normal: '1.5',
    relaxed: '1.65',
    loose: '1.75',
    button: '1.35',
  } satisfies Record<ThemeLineHeightToken, string>,
  fontWeight: {
    light: '300',
    normal: '400',
    medium: '500',
    semibold: '600',
    bold: '700',
  } satisfies Record<ThemeFontWeightToken, string>,
};

export const DEFAULT_THEME_TOKENS: ThemeTokens = {
  colors: DEFAULT_COLOR_VALUES as ThemeTokenGroup,
  radius: DEFAULT_RADIUS_VALUES as ThemeRadiusGroup,
  spacing: DEFAULT_SPACING_VALUES as ThemeSpacingGroup,
  shadows: DEFAULT_SHADOW_VALUES as ThemeShadowGroup,
  typography: {
    fontFamily: DEFAULT_TYPOGRAPHY_VALUES.fontFamily as ThemeFontFamilyGroup,
    fontSize: DEFAULT_TYPOGRAPHY_VALUES.fontSize as ThemeFontSizeGroup,
    lineHeight: DEFAULT_TYPOGRAPHY_VALUES.lineHeight as ThemeLineHeightGroup,
    fontWeight: DEFAULT_TYPOGRAPHY_VALUES.fontWeight as ThemeFontWeightGroup,
  },
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

function normalizeScale<TKey extends string>(
  defaults: FlexibleRecord<TKey>,
  overrides?: FlexiblePartial<TKey> | FlexibleRecord<TKey> | null
): FlexibleRecord<TKey> {
  const normalized = { ...defaults } as FlexibleRecord<TKey>;
  const mutable: Record<string, string | undefined> = normalized;

  if (overrides) {
    Object.entries(overrides).forEach(([token, value]) => {
      if (typeof value === 'string' && value.trim().length > 0) {
        mutable[token] = value;
      }
    });
  }

  return normalized;
}

export function normalizeThemeTokens(tokens?: ThemeTokens | ThemeTokensInput | null): ThemeTokens {
  const normalizedColors = normalizeScale(DEFAULT_THEME_TOKENS.colors, tokens?.colors);
  const normalizedRadius = normalizeScale(DEFAULT_THEME_TOKENS.radius, tokens?.radius);
  const normalizedSpacing = normalizeScale(DEFAULT_THEME_TOKENS.spacing, tokens?.spacing);
  const normalizedShadows = normalizeScale(DEFAULT_THEME_TOKENS.shadows, tokens?.shadows);

  const normalizedTypography: ThemeTypographyGroup = {
    fontFamily: normalizeScale(DEFAULT_THEME_TOKENS.typography.fontFamily, tokens?.typography?.fontFamily),
    fontSize: normalizeScale(DEFAULT_THEME_TOKENS.typography.fontSize, tokens?.typography?.fontSize),
    lineHeight: normalizeScale(DEFAULT_THEME_TOKENS.typography.lineHeight, tokens?.typography?.lineHeight),
    fontWeight: normalizeScale(DEFAULT_THEME_TOKENS.typography.fontWeight, tokens?.typography?.fontWeight),
  };

  const metadata = {
    colorScheme: normalizeColorScheme(tokens?.metadata?.colorScheme ?? DEFAULT_THEME_TOKENS.metadata.colorScheme),
  } satisfies ThemeTokensMetadata;

  return {
    colors: normalizedColors,
    radius: normalizedRadius,
    spacing: normalizedSpacing,
    shadows: normalizedShadows,
    typography: normalizedTypography,
    metadata,
  };
}

export function mergeThemeTokens(base: ThemeTokens, override?: ThemeTokensInput | null): ThemeTokens {
  return normalizeThemeTokens({
    colors: {
      ...base.colors,
      ...(override?.colors ?? {}),
    },
    radius: {
      ...base.radius,
      ...(override?.radius ?? {}),
    },
    spacing: {
      ...base.spacing,
      ...(override?.spacing ?? {}),
    },
    shadows: {
      ...base.shadows,
      ...(override?.shadows ?? {}),
    },
    typography: {
      fontFamily: {
        ...base.typography.fontFamily,
        ...(override?.typography?.fontFamily ?? {}),
      },
      fontSize: {
        ...base.typography.fontSize,
        ...(override?.typography?.fontSize ?? {}),
      },
      lineHeight: {
        ...base.typography.lineHeight,
        ...(override?.typography?.lineHeight ?? {}),
      },
      fontWeight: {
        ...base.typography.fontWeight,
        ...(override?.typography?.fontWeight ?? {}),
      },
    },
    metadata: {
      ...base.metadata,
      ...(override?.metadata ?? {}),
    },
  });
}

function applyVariablesFromGroup(
  variables: Record<string, string>,
  group: Record<string, string | undefined>,
  prefix: string,
  formatter: (value: string) => string = (value) => value
) {
  Object.entries(group).forEach(([token, value]) => {
    if (typeof value !== 'string') {
      return;
    }

    const cssVariable = `${prefix}${toKebabCase(token)}`;
    variables[cssVariable] = formatter(value);
  });
}

export function themeTokensToCssVariables(tokens: ThemeTokens): Record<string, string> {
  const variables: Record<string, string> = {};

  applyVariablesFromGroup(variables, tokens.colors, '--color-', formatColorValue);
  applyVariablesFromGroup(variables, tokens.radius, '--radius-');
  applyVariablesFromGroup(variables, tokens.spacing, '--space-');
  applyVariablesFromGroup(variables, tokens.shadows, '--shadow-');
  applyVariablesFromGroup(variables, tokens.typography.fontFamily, '--font-');
  applyVariablesFromGroup(variables, tokens.typography.fontSize, '--text-');
  applyVariablesFromGroup(variables, tokens.typography.lineHeight, '--leading-');
  applyVariablesFromGroup(variables, tokens.typography.fontWeight, '--weight-');

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

function createTailwindVariableConfig(tokens: readonly string[], prefix: string): Record<string, string> {
  return tokens.reduce<Record<string, string>>((accumulator, token) => {
    accumulator[token] = `var(${prefix}${toKebabCase(token)})`;
    return accumulator;
  }, {});
}

export function createTailwindRadiusConfig(): Record<string, string> {
  const radius = createTailwindVariableConfig(THEME_RADIUS_TOKENS, '--radius-');

  if (radius.md) {
    radius.DEFAULT = radius.md;
  }

  if (radius.pill) {
    radius.full = radius.pill;
  }

  return radius;
}

export function createTailwindSpacingConfig(): Record<string, string> {
  return createTailwindVariableConfig(THEME_SPACING_TOKENS, '--space-');
}

export function createTailwindShadowConfig(): Record<string, string> {
  const shadows = createTailwindVariableConfig(THEME_SHADOW_TOKENS, '--shadow-');

  if (shadows.md) {
    shadows.DEFAULT = shadows.md;
  }

  return shadows;
}

export function createTailwindFontFamilyConfig(): Record<string, string[]> {
  const families: Record<string, string[]> = {};

  THEME_FONT_FAMILY_TOKENS.forEach((token) => {
    families[token] = [`var(--font-${toKebabCase(token)})`];
  });

  return families;
}

export function createTailwindFontSizeConfig(): Record<string, string> {
  return createTailwindVariableConfig(THEME_FONT_SIZE_TOKENS, '--text-');
}

export function createTailwindLineHeightConfig(): Record<string, string> {
  return createTailwindVariableConfig(THEME_LINE_HEIGHT_TOKENS, '--leading-');
}

export function createTailwindFontWeightConfig(): Record<string, string> {
  return createTailwindVariableConfig(THEME_FONT_WEIGHT_TOKENS, '--weight-');
}
