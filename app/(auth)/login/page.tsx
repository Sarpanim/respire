import LoginForm from '@/components/LoginForm';
import { PageShell, composeSection } from '@/modules/shell';
import type { SectionDefinition } from '@/modules/shell';

const sections: SectionDefinition[] = [
  composeSection('card.surface', {
    key: 'login-card',
    className: 'mx-auto max-w-md',
    content: (
      <div className="space-y-4">
        <h1 className="text-2xl font-semibold text-white">Connexion</h1>
        <p className="text-sm text-slate-300">
          Recevez un lien magique dans votre boîte mail pour accéder à votre tableau de bord. Aucun mot de passe à retenir.
        </p>
        <LoginForm />
      </div>
    ),
  }),
  composeSection('card.surface', {
    key: 'login-hint',
    tone: 'muted',
    as: 'p',
    className: 'mx-auto mt-6 max-w-md text-xs text-slate-400',
    content: (
      <>
        Assurez-vous d’avoir configuré les URLs de redirection dans Supabase :{' '}
        <code className="text-slate-200">/auth/callback</code>.
      </>
    ),
  }),
];

export default function LoginPage() {
  return <PageShell sections={sections} />;
}
