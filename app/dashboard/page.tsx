import Link from 'next/link';
import { redirect } from 'next/navigation';
import { PageShell, composeSection } from '@/modules/shell';
import type { SectionDefinition } from '@/modules/shell';
import { createClient } from '@/lib/supabase-server';

export const dynamic = 'force-dynamic';

export default async function DashboardPage() {
  const supabase = createClient();
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session) {
    redirect('/login');
  }

  const userEmail = session.user.email ?? 'membre';

  const sections: SectionDefinition[] = [
    composeSection('card.surface', {
      key: 'dashboard-welcome',
      className: 'space-y-3',
      content: (
        <div className="space-y-3">
          <p className="text-sm font-medium uppercase tracking-widest text-primary">Bienvenue</p>
          <h1 className="text-3xl font-semibold text-white">Ravi de vous revoir, {userEmail}.</h1>
          <p className="text-sm text-slate-300">
            Continuez votre parcours de méditation : reprenez un cours, explorez de nouvelles thématiques ou ajustez vos
            préférences.
          </p>
        </div>
      ),
    }),
    composeSection('card.surface', {
      key: 'dashboard-actions',
      tone: 'muted',
      as: 'div',
      className: 'mt-8 grid gap-4 sm:grid-cols-2',
      content: (
        <>
          <Link href="/courses" className="card block bg-slate-900/70 transition hover:-translate-y-1">
            <h2 className="text-lg font-semibold text-white">Explorer les cours</h2>
            <p className="mt-2 text-sm text-slate-300">Filtrez par catégorie ou niveau pour trouver la séance idéale.</p>
          </Link>
          <article className="card bg-slate-900/70">
            <h2 className="text-lg font-semibold text-white">Reprise intelligente</h2>
            <p className="mt-2 text-sm text-slate-300">
              Nous mémorisons automatiquement votre progression audio afin que vous repreniez exactement où vous vous êtes arrêté.
            </p>
          </article>
        </>
      ),
    }),
  ];

  return <PageShell sections={sections} />;
}
