import Link from 'next/link';

export default function HomePage() {
  return (
    <section className="mx-auto flex max-w-3xl flex-col items-start gap-12">
      <div className="card w-full space-y-6 bg-gradient-to-br from-card/90 via-card/80 to-background">
        <span className="inline-flex rounded-full bg-accent/80 px-3 py-1 text-xs uppercase tracking-widest text-muted-foreground">
          Respire, ici et maintenant
        </span>
        <h1 className="text-3xl font-semibold text-foreground sm:text-4xl">
          Une application de méditation simple, moderne et pensée pour la concentration.
        </h1>
        <p className="text-base leading-relaxed text-muted-foreground">
          Explorez un catalogue de séances guidées, reprenez votre écoute là où vous vous êtes arrêté et avancez à votre
          rythme. Respire offre une expérience mobile-first, sécurisée et connectée à Supabase pour une authentification sans
          friction.
        </p>
        <div className="flex flex-wrap gap-3">
          <Link href="/login" className="btn-primary">
            Se connecter
          </Link>
          <Link
            href="/courses"
            className="rounded-full border border-border px-6 py-3 text-sm font-semibold text-foreground/80 transition hover:border-accent hover:text-foreground"
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
          <article key={feature.title} className="card bg-card/60">
            <h2 className="text-lg font-semibold text-foreground">{feature.title}</h2>
            <p className="mt-2 text-sm text-muted-foreground">{feature.description}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
