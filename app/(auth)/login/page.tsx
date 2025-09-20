import LoginForm from '@/components/LoginForm';

export default function LoginPage() {
  return (
    <section className="mx-auto flex max-w-md flex-col gap-6">
      <div className="card space-y-4 bg-slate-900/70">
        <h1 className="text-2xl font-semibold text-white">Connexion</h1>
        <p className="text-sm text-slate-300">
          Recevez un lien magique dans votre boîte mail pour accéder à votre tableau de bord. Aucun mot de passe à retenir.
        </p>
        <LoginForm />
      </div>
      <p className="text-xs text-slate-400">
        Assurez-vous d’avoir configuré les URLs de redirection dans Supabase : <code className="text-slate-200">/auth/callback</code>.
      </p>
    </section>
  );
}
