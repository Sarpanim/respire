import LoginForm from '@/components/LoginForm';

export default function LoginPage() {
  return (
    <section className="mx-auto flex max-w-md flex-col gap-6">
      <div className="card space-y-4">
        <h1 className="text-2xl font-semibold text-foreground">Connexion</h1>
        <p className="text-sm text-muted-foreground">
          L’accès au tableau de bord est temporairement fermé. Nous mettons à jour notre système
          d’authentification.
        </p>
        <LoginForm />
      </div>
    </section>
  );
}
