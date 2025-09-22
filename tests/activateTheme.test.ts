const revalidatePathMock = vi.fn()

vi.mock('next/cache', () => ({
  revalidatePath: revalidatePathMock,
}))

vi.mock('@/lib/profile', () => ({
  getSessionProfile: vi.fn().mockResolvedValue({
    profile: { role: 'admin' },
    session: { user: { id: 'user-1' } },
  }),
}))

const eqDeactivate = vi.fn().mockResolvedValue({ error: null })
const eqActivate = vi.fn().mockResolvedValue({ error: null })
const updateMock = vi.fn()
const fromMock = vi.fn()

vi.mock('@/lib/supabase-server', () => ({
  createClient: () => ({
    from: fromMock,
  }),
}))

import { activateTheme } from '@/app/dashboard/themes/actions'

describe('activateTheme action', () => {
  beforeEach(() => {
    revalidatePathMock.mockClear()
    eqDeactivate.mockReset()
    eqActivate.mockReset()
    eqDeactivate.mockResolvedValue({ error: null })
    eqActivate.mockResolvedValue({ error: null })
    updateMock.mockReset()
    updateMock
      .mockReturnValueOnce({ eq: eqDeactivate })
      .mockReturnValueOnce({ eq: eqActivate })
    fromMock.mockReset()
    fromMock.mockReturnValue({ update: updateMock })
  })

  it('updates the active theme and revalidates the dashboard page', async () => {
    const formData = new FormData()
    formData.append('themeId', 'theme-123')

    const result = await activateTheme({}, formData)

    expect(fromMock).toHaveBeenCalledWith('themes')
    expect(updateMock).toHaveBeenNthCalledWith(1, { is_active: false })
    expect(eqDeactivate).toHaveBeenCalledWith('is_active', true)
    expect(updateMock).toHaveBeenNthCalledWith(2, { is_active: true })
    expect(eqActivate).toHaveBeenCalledWith('id', 'theme-123')
    expect(revalidatePathMock).toHaveBeenCalledWith('/dashboard/themes')
    expect(result.success).toBe('Thème activé.')
  })
})
