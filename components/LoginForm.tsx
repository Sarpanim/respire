'use client';

import Link from 'next/link';

export default function LoginForm() {
  return (
    <div className="space-y-6">
      <div className="space-y-2 text-sm text-muted-foreground">
        <p>
          Profitez librement du tableau de bord pendant la mise à jour du système de connexion. Revenez prochainement
          pour activer votre compte sécurisé.
        </p>
        <p>Vous pourrez lier votre adresse e-mail dès que l’authentification sera prête.</p>
      </div>
      <Link
        href="/dashboard"
        className="inline-flex w-full items-center justify-center rounded-xl bg-primary px-4 py-3 text-sm font-semibold text-primary-foreground transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background hover:opacity-90"
      >
        Accéder au tableau de bord
      </Link>
    </div>
  );
}
