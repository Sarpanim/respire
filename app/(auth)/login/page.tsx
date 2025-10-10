import LoginForm from '@/components/LoginForm';

export default function LoginPage() {
  return (
    <section className="mx-auto flex max-w-md flex-col gap-6">
      <div className="card space-y-4">
        <h1 className="text-2xl font-semibold text-foreground">Connexion</h1>
        <p className="text-sm text-muted-foreground">
          Recevez un lien magique dans votre boîte mail pour accéder à votre tableau de bord. Aucun mot de passe à retenir.
        </p>
        <LoginForm />
      </div>
      <p className="text-xs text-muted-foreground">
        Assurez-vous d’avoir configuré les URLs de redirection dans Supabase : <code className="text-foreground">/auth/callback</code>.
      </p>
    </section>
  );
}
