import Link from 'next/link'
import { notFound } from 'next/navigation'
import { CreateThemeForm } from './CreateThemeForm'
import { ActivateThemeForm } from './ActivateThemeForm'
import { listThemes } from './actions'
import { getSessionProfile } from '@/lib/profile'

export const dynamic = 'force-dynamic'

function formatDate(value: string) {
  const date = new Date(value)
  if (Number.isNaN(date.getTime())) {
    return '—'
  }

  return new Intl.DateTimeFormat('fr-FR', {
    dateStyle: 'short',
    timeStyle: 'short',
  }).format(date)
}

export default async function ThemesDashboardPage() {
  const { profile } = await getSessionProfile()

  if (!profile || profile.role !== 'admin') {
    notFound()
  }

  const { themes, error } = await listThemes()

  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-sm uppercase tracking-widest text-primary">Administration</p>
          <h1 className="text-3xl font-semibold text-white">Gestion des thèmes</h1>
          <p className="text-sm text-slate-300">
            Gérez les palettes de couleurs appliquées à l&apos;expérience Respire.
          </p>
        </div>
        <Link href="/dashboard" className="text-sm text-slate-300 underline">
          Retour au dashboard
        </Link>
      </div>

      {error && (
        <p className="rounded-md border border-red-500/40 bg-red-500/10 p-3 text-sm text-red-200">
          {error}
        </p>
      )}

      <CreateThemeForm />

      <div className="card space-y-4">
        <div>
          <h2 className="text-lg font-semibold text-white">Thèmes existants</h2>
          <p className="text-sm text-slate-300">
            Activez le thème souhaité pour l&apos;appliquer immédiatement à l&apos;application.
          </p>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-slate-800 text-left text-sm">
            <thead>
              <tr className="text-slate-300">
                <th scope="col" className="px-3 py-2 font-medium">
                  Nom
                </th>
                <th scope="col" className="px-3 py-2 font-medium">
                  Statut
                </th>
                <th scope="col" className="px-3 py-2 font-medium">
                  Créé le
                </th>
                <th scope="col" className="px-3 py-2 font-medium text-right">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800">
              {themes.length === 0 ? (
                <tr>
                  <td colSpan={4} className="px-3 py-6 text-center text-slate-400">
                    Aucun thème configuré pour le moment.
                  </td>
                </tr>
              ) : (
                themes.map((theme) => (
                  <tr key={theme.id} className="text-slate-200">
                    <td className="px-3 py-3 font-medium">{theme.name}</td>
                    <td className="px-3 py-3">
                      {theme.is_active ? (
                        <span className="inline-flex items-center rounded-full bg-emerald-500/20 px-2 py-1 text-xs font-semibold text-emerald-300">
                          Actif
                        </span>
                      ) : (
                        <span className="inline-flex items-center rounded-full bg-slate-700/30 px-2 py-1 text-xs font-semibold text-slate-300">
                          Inactif
                        </span>
                      )}
                    </td>
                    <td className="px-3 py-3 text-slate-400">{formatDate(theme.created_at)}</td>
                    <td className="px-3 py-3 text-right">
                      <ActivateThemeForm themeId={theme.id} disabled={theme.is_active} />
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
