import { render } from '@testing-library/react'
import RootLayout from '@/app/layout'
import type { ThemeTokens } from '@/types/theme'

const testTokens: ThemeTokens = {
  primary: '#123456',
  primaryDark: '#0f1e2d',
  primaryForeground: '#ffffff',
  bg: '#010203',
  surface: 'rgba(1,2,3,0.8)',
  surfaceMuted: 'rgba(1,2,3,0.6)',
  text: '#fafafa',
  textMuted: '#a1a1aa',
  ring: '#ffffff',
  accent1: '#ff8800',
  accent2: '#00ff88',
  accent3: '#8800ff',
  fontSans: 'Inter, sans-serif',
  radiusSm: '4px',
  radiusMd: '8px',
  radiusLg: '16px',
  radiusXl: '24px',
  buttonRadius: '9999px',
  cardRadius: '12px',
  shadowSm: '0 1px 1px rgba(0,0,0,0.1)',
  shadowMd: '0 2px 4px rgba(0,0,0,0.2)',
  shadowLg: '0 4px 8px rgba(0,0,0,0.3)',
}

vi.mock('@/lib/themes', async () => {
  const actual = await vi.importActual<typeof import('@/lib/themes')>('@/lib/themes')
  return {
    ...actual,
    fetchActiveTheme: vi.fn().mockResolvedValue({ id: 'test', name: 'Test', tokens: testTokens }),
  }
})

vi.mock('@/lib/supabase-server', () => ({
  createClient: () => ({
    auth: {
      getSession: async () => ({ data: { session: null } }),
    },
  }),
}))

describe('RootLayout', () => {
  it('applies CSS variables from the active theme', async () => {
    const element = await RootLayout({ children: <div>content</div> })
    const { container } = render(element as unknown as React.ReactElement)
    const html = container.querySelector('html')
    expect(html).not.toBeNull()
    expect(html?.style.getPropertyValue('--color-primary')).toBe(testTokens.primary)
    expect(html?.style.getPropertyValue('--color-primary-700')).toBe(testTokens.primaryDark)
    expect(html?.style.getPropertyValue('--bg')).toBe(testTokens.bg)
    expect(html?.style.getPropertyValue('--font-sans')).toBe(testTokens.fontSans)
  })
})
