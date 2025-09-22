import { createClient } from '@/lib/supabase/server'
import type { ThemeRecord, ThemeTokens } from '@/types/theme'

type SanitisedTokens = { ok: true; value: Record<string, string> } | { ok: false }

function sanitiseTokenRecord(raw: unknown): SanitisedTokens {
  if (!raw || typeof raw !== 'object') {
    return { ok: false }
  }

  const entries = Object.entries(raw as Record<string, unknown>)
  const result: Record<string, string> = {}

  for (const [key, value] of entries) {
    if (typeof value !== 'string') {
      return { ok: false }
    }
    result[key] = value.trim()
  }

  return { ok: true, value: result }
}

export const DEFAULT_THEME_TOKENS: ThemeTokens = {
  primary: '#3a8dff',
  primaryDark: '#1b65d4',
  primaryForeground: '#ffffff',
  bg: '#020617',
  surface: 'rgba(15, 23, 42, 0.7)',
  surfaceMuted: 'rgba(15, 23, 42, 0.5)',
  text: '#f8fafc',
  textMuted: '#94a3b8',
  ring: '#ffffff',
  accent1: '#38bdf8',
  accent2: '#f472b6',
  accent3: '#22c55e',
  fontSans:
    'ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Inter, "Helvetica Neue", Arial, "Noto Sans", "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", sans-serif',
  radiusSm: '0.375rem',
  radiusMd: '1rem',
  radiusLg: '9999px',
  radiusXl: '1.5rem',
  buttonRadius: '9999px',
  cardRadius: '1rem',
  shadowSm: '0 1px 2px 0 rgba(15, 23, 42, 0.05)',
  shadowMd: '0 4px 6px -1px rgba(15, 23, 42, 0.1), 0 2px 4px -2px rgba(15, 23, 42, 0.1)',
  shadowLg: '0 10px 15px -3px rgba(15, 23, 42, 0.1), 0 4px 6px -4px rgba(15, 23, 42, 0.1)',
}

export function parseThemeTokensInput(input: string) {
  try {
    const parsed = JSON.parse(input)
    if (!parsed || typeof parsed !== 'object') {
      return null
    }

    const tokens = sanitiseTokenRecord(parsed)
    return tokens.ok ? tokens.value : null
  } catch (error) {
    console.warn('Invalid theme tokens JSON provided', error)
    return null
  }
}

function normaliseTokens(rawTokens: unknown): ThemeTokens {
  if (!rawTokens) {
    return DEFAULT_THEME_TOKENS
  }

  let parsedValue: unknown = rawTokens

  if (typeof rawTokens === 'string') {
    try {
      parsedValue = JSON.parse(rawTokens)
    } catch (error) {
      console.warn('Unable to parse theme tokens JSON', error)
      return DEFAULT_THEME_TOKENS
    }
  }

  if (typeof parsedValue !== 'object' || parsedValue === null) {
    return DEFAULT_THEME_TOKENS
  }

  const tokens = sanitiseTokenRecord(parsedValue)

  if (!tokens.ok) {
    console.warn('Invalid theme tokens payload')
    return DEFAULT_THEME_TOKENS
  }

  return { ...DEFAULT_THEME_TOKENS, ...tokens.value }
}

function toThemeRecord(data: any): ThemeRecord | null {
  if (!data) return null

  const tokens = normaliseTokens(data.tokens)
  if (!data.id || !data.name) {
    return null
  }

  return {
    id: String(data.id),
    name: String(data.name),
    tokens,
  }
}

export async function fetchActiveTheme(): Promise<ThemeRecord> {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  if (!supabaseUrl || !supabaseAnonKey) {
    return { id: 'default', name: 'Default', tokens: DEFAULT_THEME_TOKENS }
  }

  try {
    const supabase = createClient({ serviceRole: true })
    const { data, error } = await supabase.rpc('get_active_theme')

    if (error) {
      console.error('Failed to load active theme', error)
      return { id: 'default', name: 'Default', tokens: DEFAULT_THEME_TOKENS }
    }

    const payload = Array.isArray(data) ? data[0] : data
    const theme = toThemeRecord(payload)

    if (!theme) {
      return { id: 'default', name: 'Default', tokens: DEFAULT_THEME_TOKENS }
    }

    return theme
  } catch (error) {
    console.error('Unexpected error while fetching theme', error)
    return { id: 'default', name: 'Default', tokens: DEFAULT_THEME_TOKENS }
  }
}

export function buildCssVariables(tokens: ThemeTokens): Record<string, string> {
  return {
    '--color-primary': tokens.primary,
    '--color-primary-600': tokens.primary,
    '--primary': tokens.primary,
    '--color-primary-700': tokens.primaryDark,
    '--color-primary-dark': tokens.primaryDark,
    '--color-primary-foreground': tokens.primaryForeground,
    '--primary-foreground': tokens.primaryForeground,
    '--color-bg': tokens.bg,
    '--bg': tokens.bg,
    '--color-surface': tokens.surface,
    '--surface': tokens.surface,
    '--color-surface-muted': tokens.surfaceMuted,
    '--surface-muted': tokens.surfaceMuted,
    '--color-text': tokens.text,
    '--text': tokens.text,
    '--color-secondaryText': tokens.textMuted,
    '--text-muted': tokens.textMuted,
    '--muted': tokens.textMuted,
    '--color-ring': tokens.ring,
    '--ring': tokens.ring,
    '--color-accent1': tokens.accent1,
    '--color-accent2': tokens.accent2,
    '--color-accent3': tokens.accent3,
    '--font-sans': tokens.fontSans,
    '--radius-sm': tokens.radiusSm,
    '--radius-md': tokens.radiusMd,
    '--radius-lg': tokens.radiusLg,
    '--radius-xl': tokens.radiusXl,
    '--button-radius': tokens.buttonRadius,
    '--card-radius': tokens.cardRadius,
    '--shadow-sm': tokens.shadowSm,
    '--shadow-md': tokens.shadowMd,
    '--shadow-lg': tokens.shadowLg,
  }
}
