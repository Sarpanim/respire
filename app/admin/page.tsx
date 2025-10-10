import Link from 'next/link';
import { redirect } from 'next/navigation';
import { AdminShell } from '@/modules/admin';
import { createClient } from '@/lib/supabase-server';
import AdminThemeManager from '@/components/AdminThemeManager';

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
      <div className="grid gap-8">
        <div className="card space-y-4">
          <h2 className="text-xl font-semibold text-foreground">Administration – aperçu</h2>
          <p className="text-sm text-muted-foreground">
            Les fonctionnalités avancées d’administration seront disponibles prochainement. En attendant, vous pouvez
            personnaliser l’expérience visuelle pour l’ensemble de la plateforme.
          </p>
          <Link href="/" className="btn btn-primary w-fit">
            Retour à l’accueil
          </Link>
        </div>
        <div className="card p-0">
          <AdminThemeManager />
        </div>
      </div>
    </AdminShell>
  );
}
