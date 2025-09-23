import { redirect } from 'next/navigation';

import ThemeAdminPanel from './ThemeAdminPanel';
import { AdminShell } from '@/modules/admin';
import { createClient } from '@/lib/supabase-server';
import type { ThemeTokensInput } from '@/lib/theme-tokens';

export const dynamic = 'force-dynamic';

export default async function AdminThemesPage() {
  const supabase = createClient();
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session) {
    redirect('/login?redirect_to=/admin/themes');
  }

  const { data: isAdmin, error: adminError } = await supabase.rpc('is_admin');

  if (adminError || !isAdmin) {
    redirect('/');
  }

  const { data, error } = await supabase
    .from('themes')
    .select('id, name, is_active, tokens')
    .order('name', { ascending: true });

  const themes = (data ?? []).map((theme) => ({
    id: theme.id as string,
    name: (theme.name as string | null) ?? 'Thème sans titre',
    is_active: Boolean(theme.is_active),
    tokens: (theme.tokens as ThemeTokensInput | null) ?? null,
  }));

  return (
    <AdminShell
      title="Thèmes"
      description="Gérez la palette de couleurs appliquée à l’expérience."
    >
      <ThemeAdminPanel
        initialThemes={themes}
        initialError={error ? "Impossible de charger les thèmes depuis Supabase." : null}
      />
    </AdminShell>
  );
}
