export type ThemeTokens = {
  primary: string
  primaryDark: string
  primaryForeground: string
  bg: string
  surface: string
  surfaceMuted: string
  text: string
  textMuted: string
  ring: string
  accent1: string
  accent2: string
  accent3: string
  fontSans: string
  radiusSm: string
  radiusMd: string
  radiusLg: string
  radiusXl: string
  buttonRadius: string
  cardRadius: string
  shadowSm: string
  shadowMd: string
  shadowLg: string
}

export type ThemeRecord = {
  id: string
  name: string
  tokens: ThemeTokens
}
