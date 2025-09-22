'use server'

import { revalidatePath } from 'next/cache'
import { createClient } from '@/lib/supabase-server'
import { getSessionProfile } from '@/lib/profile'
import { DEFAULT_THEME_TOKENS, parseThemeTokensInput } from '@/lib/themes'

export type ThemeRow = {
  id: string
  name: string
  tokens: Record<string, unknown>
  is_active: boolean
  created_at: string
}

export type ThemeActionState = {
  error?: string
  success?: string
}

function getErrorStatus(error: unknown): number | undefined {
  if (typeof error !== 'object' || error === null) {
    return undefined
  }

  const maybeStatus = (error as { status?: unknown }).status
  return typeof maybeStatus === 'number' ? maybeStatus : undefined
}

export async function listThemes(): Promise<{ themes: ThemeRow[]; error?: string }> {
  const supabase = createClient()
  const { data, error } = await supabase
    .from('themes')
    .select('id, name, tokens, is_active, created_at')
    .order('created_at', { ascending: false })

  if (error) {
    const status = getErrorStatus(error)
    const message =
      status && [401, 403].includes(status)
        ? "Vous n'avez pas les droits pour consulter les thèmes."
        : 'Impossible de charger les thèmes.'
    return { themes: [], error: message }
  }

  return { themes: data ?? [] }
}

export async function createTheme(
  _state: ThemeActionState,
  formData: FormData,
): Promise<ThemeActionState> {
  await getSessionProfile()
  const supabase = createClient()

  const name = formData.get('name')
  const tokensInput = formData.get('tokens')

  if (typeof name !== 'string' || name.trim().length === 0) {
    return { error: 'Veuillez fournir un nom et des tokens valides.' }
  }

  if (typeof tokensInput !== 'string' || tokensInput.trim().length < 2) {
    return { error: 'Veuillez fournir un nom et des tokens valides.' }
  }

  const tokens = parseThemeTokensInput(tokensInput.trim())

  if (!tokens) {
    return { error: 'Le JSON des tokens est invalide.' }
  }

  const payload = {
    name: name.trim(),
    tokens: { ...DEFAULT_THEME_TOKENS, ...tokens },
    is_active: false,
  }

  const { error } = await supabase.from('themes').insert(payload)

  if (error) {
    const status = getErrorStatus(error)
    if (status && [401, 403].includes(status)) {
      return { error: 'Action non autorisée.' }
    }
    console.error('Failed to create theme', error)
    return { error: 'Impossible de créer le thème.' }
  }

  revalidatePath('/dashboard/themes')
  return { success: 'Thème créé avec succès.' }
}

export async function activateTheme(
  _state: ThemeActionState,
  formData: FormData,
): Promise<ThemeActionState> {
  await getSessionProfile()
  const supabase = createClient()

  const themeId = formData.get('themeId')

  if (typeof themeId !== 'string' || themeId.trim().length === 0) {
    return { error: 'Identifiant du thème invalide.' }
  }

  const trimmedThemeId = themeId.trim()

  const deactivate = await supabase.from('themes').update({ is_active: false }).eq('is_active', true)

  if (deactivate.error) {
    const status = getErrorStatus(deactivate.error)
    if (status && [401, 403].includes(status)) {
      return { error: 'Action non autorisée.' }
    }
    console.error('Failed to deactivate themes', deactivate.error)
    return { error: "Impossible de désactiver les anciens thèmes." }
  }

  const activate = await supabase.from('themes').update({ is_active: true }).eq('id', trimmedThemeId)

  if (activate.error) {
    const status = getErrorStatus(activate.error)
    if (status && [401, 403].includes(status)) {
      return { error: 'Action non autorisée.' }
    }
    console.error('Failed to activate theme', activate.error)
    return { error: "Impossible d'activer le thème." }
  }

  revalidatePath('/dashboard/themes')
  return { success: 'Thème activé.' }
}
