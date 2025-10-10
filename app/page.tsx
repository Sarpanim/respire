import Link from 'next/link';

export default function HomePage() {
  return (
    <section className="mx-auto flex w-full max-w-5xl flex-col gap-12">
      <div className="card relative w-full space-y-6 overflow-hidden bg-gradient-to-br from-slate-900/90 via-slate-900/80 to-slate-950">
        <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top,_rgba(56,189,248,0.35),_transparent_55%)]" aria-hidden />
        <span className="inline-flex rounded-full bg-slate-800/80 px-3 py-1 text-xs uppercase tracking-widest text-slate-300">
          Respire, ici et maintenant
        </span>
        <h1 className="text-3xl font-semibold text-white sm:text-5xl">
          Une application de méditation simple, moderne et pensée pour la concentration.
        </h1>
        <p className="text-lg leading-relaxed text-slate-300">
          Explorez un catalogue de séances guidées, reprenez votre écoute là où vous vous êtes arrêté et avancez à votre
          rythme. Respire offre une expérience mobile-first, sécurisée et connectée à Supabase pour une authentification sans
          friction.
        </p>
        <div className="flex flex-wrap gap-3">
          <Link href="/login" className="btn btn-primary">
            Se connecter
          </Link>
          <Link
            href="/courses"
            className="btn btn-ghost border border-slate-700/70 bg-transparent text-slate-100 hover:border-slate-500"
          >
            Parcourir les cours
          </Link>
        </div>
      </div>
      <div className="grid w-full gap-6 sm:grid-cols-2">
        {[
          {
            title: 'Connexion par lien magique',
            description:
              'Recevez un lien sécurisé dans votre boîte mail et accédez instantanément à votre tableau de bord, sans mot de passe.',
          },
          {
            title: 'Catalogue filtrable',
            description:
              'Choisissez vos séances par catégorie ou niveau pour créer des routines sur mesure, du débutant à l’avancé.',
          },
          {
            title: 'Lecteur audio intelligent',
            description:
              'Un lecteur HTML5 optimisé qui mémorise votre progression via localStorage pour chaque cours.',
          },
          {
            title: 'Déploiement continu',
            description:
              'Propulsé par Vercel et Supabase pour des mises à jour fluides et sécurisées du MVP à la production.',
          },
        ].map((feature) => (
          <article key={feature.title} className="card space-y-3 bg-slate-900/60">
            <h2 className="text-lg font-semibold text-white">{feature.title}</h2>
            <p className="text-sm text-slate-300">{feature.description}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
