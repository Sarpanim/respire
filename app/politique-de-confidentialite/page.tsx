const policySections = [
  {
    title: 'Collecte des données',
    content:
      'Nous collectons uniquement les informations nécessaires à la création de votre compte et au suivi de votre progression. Ces données ne sont jamais revendues.',
  },
  {
    title: 'Utilisation',
    content:
      'Les données permettent de personnaliser vos recommandations, d’améliorer les contenus proposés et de vous envoyer des notifications pertinentes.',
  },
  {
    title: 'Conservation',
    content:
      'Vos informations sont stockées de manière sécurisée au sein de l’Union européenne et conservées tant que votre compte reste actif.',
  },
  {
    title: 'Vos droits',
    content:
      'Vous pouvez accéder, corriger ou supprimer vos données personnelles depuis votre tableau de bord ou en nous contactant directement.',
  },
];

export const metadata = {
  title: 'Politique de confidentialité | Respire',
  description: 'Découvrez comment Respire protège vos données personnelles.',
};

export default function PrivacyPolicyPage() {
  return (
    <section className="space-y-8">
      <div className="space-y-3">
        <p className="text-sm font-medium uppercase tracking-widest text-primary">Confidentialité</p>
        <h1 className="text-3xl font-semibold text-slate-900 dark:text-white">Politique de confidentialité</h1>
        <p className="max-w-2xl text-sm text-slate-600 dark:text-slate-300">
          Nous accordons une importance particulière à la protection de vos données. Découvrez comment nous collectons, stockons et utilisons vos informations personnelles.
        </p>
      </div>
      <div className="space-y-4">
        {policySections.map((section) => (
          <article key={section.title} className="card space-y-2">
            <h2 className="text-xl font-semibold text-slate-900 dark:text-white">{section.title}</h2>
            <p className="text-sm text-slate-600 dark:text-slate-300">{section.content}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
