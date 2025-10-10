import Link from 'next/link';
import { redirect } from 'next/navigation';
import { AdminShell } from '@/modules/admin';
import { createClient } from '@/lib/supabase-server';

export const dynamic = 'force-dynamic';

export default async function AdminPage() {
  const supabase = createClient();
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session) {
    redirect('/login?redirect_to=/admin');
  }

  return (
    <AdminShell
      title="Administration"
      description="Gérez vos contenus et vos membres depuis un espace centralisé."
    >
      <div className="card space-y-4">
        <h2 className="text-xl font-semibold text-white">Admin – coming soon</h2>
        <p className="text-sm text-slate-300">
          Les fonctionnalités d’administration seront disponibles prochainement.
        </p>
        <Link href="/" className="btn btn-primary w-fit">
          Retour à l’accueil
        </Link>
      </div>
    </AdminShell>
  );
}
