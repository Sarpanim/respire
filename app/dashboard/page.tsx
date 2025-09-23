import Link from 'next/link';
import { redirect } from 'next/navigation';
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

  return (
    <section className="space-y-8">
      <div className="card space-y-3 bg-card/60">
        <p className="text-sm font-medium uppercase tracking-widest text-primary">Bienvenue</p>
        <h1 className="text-3xl font-semibold text-foreground">Ravi de vous revoir, {userEmail}.</h1>
        <p className="text-sm text-muted-foreground">
          Continuez votre parcours de méditation : reprenez un cours, explorez de nouvelles thématiques ou ajustez vos
          préférences.
        </p>
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <Link href="/courses" className="card block transition hover:-translate-y-1">
          <h2 className="text-lg font-semibold text-foreground">Explorer les cours</h2>
          <p className="mt-2 text-sm text-muted-foreground">Filtrez par catégorie ou niveau pour trouver la séance idéale.</p>
        </Link>
        <article className="card">
          <h2 className="text-lg font-semibold text-foreground">Reprise intelligente</h2>
          <p className="mt-2 text-sm text-muted-foreground">
            Nous mémorisons automatiquement votre progression audio afin que vous repreniez exactement où vous vous êtes arrêté.
          </p>
        </article>
      </div>
    </section>
  );
}
