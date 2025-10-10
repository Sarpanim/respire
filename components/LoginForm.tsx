'use client';

export default function LoginForm() {
  return (
    <div className="space-y-4">
      <p className="text-sm text-muted-foreground">
        La connexion par e-mail est momentanément désactivée. Nous travaillons à une nouvelle
        expérience d’authentification.
      </p>
      <button
        type="button"
        className="w-full rounded-xl bg-muted py-3 text-sm font-semibold text-muted-foreground"
        disabled
      >
        Connexion indisponible
      </button>
    </div>
  );
}
