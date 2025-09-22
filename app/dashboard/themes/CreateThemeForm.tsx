'use client'

import { useFormState } from 'react-dom'
import { createTheme, type ThemeActionState } from './actions'

const initialState: ThemeActionState = {}

export function CreateThemeForm() {
  const [state, formAction] = useFormState(createTheme, initialState)

  return (
    <form action={formAction} className="card space-y-4">
      <div>
        <h2 className="text-lg font-semibold text-white">Créer un thème</h2>
        <p className="text-sm text-slate-300">Définissez un nom et les tokens JSON (clés/valeurs) du thème.</p>
      </div>
      <div className="space-y-2">
        <label htmlFor="theme-name" className="block text-sm font-medium text-slate-200">
          Nom du thème
        </label>
        <input
          id="theme-name"
          name="name"
          type="text"
          required
          className="w-full rounded-md border border-slate-700 bg-slate-900/60 px-3 py-2 text-sm text-white focus-visible:border-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
        />
      </div>
      <div className="space-y-2">
        <label htmlFor="theme-tokens" className="block text-sm font-medium text-slate-200">
          Tokens JSON
        </label>
        <textarea
          id="theme-tokens"
          name="tokens"
          required
          rows={6}
          placeholder='{"primary":"#3A8DFF","bg":"#020617"}'
          className="w-full rounded-md border border-slate-700 bg-slate-900/60 px-3 py-2 text-sm text-white focus-visible:border-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
        />
      </div>
      {state.error && <p className="text-sm text-red-400">{state.error}</p>}
      {state.success && <p className="text-sm text-emerald-400">{state.success}</p>}
      <div className="flex justify-end">
        <button type="submit" className="btn-primary">
          Enregistrer
        </button>
      </div>
    </form>
  )
}
