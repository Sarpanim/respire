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

  const { data: isAdmin, error: adminError } = await supabase.rpc('is_admin');

  if (adminError || !isAdmin) {
    redirect('/');
  }

  return (
    <AdminShell
      title="Administration"
      description="Gérez vos contenus et vos membres depuis un espace centralisé."
    >
      <div className="grid gap-6 md:grid-cols-2">
        <div className="card space-y-4">
          <div className="space-y-1">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
              Apparence
            </p>
            <h2 className="text-xl font-semibold text-foreground">Gestion des thèmes</h2>
          </div>
          <p className="text-sm text-muted-foreground">
            Activez un thème, prévisualisez sa palette et ajustez les tokens en JSON pour synchroniser l’interface avec vos
            couleurs de marque.
          </p>
          <Link href="/admin/themes" className="btn-primary w-fit">
            Ouvrir le panneau des thèmes
          </Link>
        </div>
        <div className="card space-y-4">
          <h2 className="text-xl font-semibold text-foreground">Fonctionnalités complémentaires</h2>
          <p className="text-sm text-muted-foreground">
            Les autres outils d’administration seront disponibles prochainement. Revenez bientôt pour découvrir de nouvelles
            fonctionnalités.
          </p>
        </div>
      </div>
    </AdminShell>
  );
}
