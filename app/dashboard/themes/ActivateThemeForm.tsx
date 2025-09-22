'use client'

import { useFormState } from 'react-dom'
import { activateTheme, type ThemeActionState } from './actions'

type ActivateThemeFormProps = {
  themeId: string
  disabled?: boolean
}

const initialState: ThemeActionState = {}

export function ActivateThemeForm({ themeId, disabled }: ActivateThemeFormProps) {
  const [state, formAction] = useFormState(activateTheme, initialState)

  return (
    <form action={formAction} className="space-y-2">
      <input type="hidden" name="themeId" value={themeId} />
      <button type="submit" className="btn-primary" disabled={disabled}>
        {disabled ? 'Actif' : 'Activer'}
      </button>
      {state.error && <p className="text-xs text-red-400">{state.error}</p>}
      {state.success && <p className="text-xs text-emerald-400">{state.success}</p>}
    </form>
  )
}
