const sections = [
  {
    title: 'Objet',
    content:
      'Les présentes conditions générales d’utilisation encadrent l’accès et l’utilisation de la plateforme Respire. Elles définissent les droits et obligations des utilisateurs et de l’éditeur du service.',
  },
  {
    title: 'Inscription et compte',
    content:
      'La création d’un compte nécessite une adresse e-mail valide. L’utilisateur s’engage à maintenir ses informations à jour et à ne pas partager ses identifiants.',
  },
  {
    title: 'Abonnements',
    content:
      'Les offres d’abonnement sont sans engagement. Toute période entamée reste due. La résiliation est possible depuis la page tableau de bord.',
  },
  {
    title: 'Propriété intellectuelle',
    content:
      'Les contenus audio et visuels proposés au sein de Respire sont protégés par le droit d’auteur. Toute reproduction ou diffusion non autorisée est interdite.',
  },
];

export const metadata = {
  title: 'Conditions générales d’utilisation | Respire',
  description: 'Conditions d’utilisation de la plateforme Respire.',
};

export default function TermsPage() {
  return (
    <section className="space-y-8">
      <div className="space-y-3">
        <p className="text-sm font-medium uppercase tracking-widest text-primary">CGU</p>
        <h1 className="text-3xl font-semibold text-slate-900 dark:text-white">Conditions générales d&apos;utilisation</h1>
        <p className="max-w-2xl text-sm text-slate-600 dark:text-slate-300">
          En utilisant Respire, vous acceptez les conditions ci-dessous. Nous vous invitons à les consulter régulièrement.
        </p>
      </div>
      <div className="space-y-4">
        {sections.map((section) => (
          <article key={section.title} className="card space-y-2">
            <h2 className="text-xl font-semibold text-slate-900 dark:text-white">{section.title}</h2>
            <p className="text-sm text-slate-600 dark:text-slate-300">{section.content}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
