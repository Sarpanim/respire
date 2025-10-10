import { createServerSupabase } from '@/lib/supabase/server';
import { locales, type Locale } from '@/types';

const copy: Record<Locale, { heroTitle: string; heroSubtitle: string; cards: { title: string; description: string }[] }> = {
  en: {
    heroTitle: 'Launch faster with Supabase and Next.js',
    heroSubtitle:
      'Bootstrapped for teams that need SSR-friendly authentication, typed APIs, and a modular UI toolkit.',
    cards: [
      {
        title: 'Server sessions ready',
        description: 'Read Supabase sessions in layouts and route handlers without extra wiring.',
      },
      {
        title: 'Client hydration in sync',
        description: 'A shared SessionContext keeps hooks aligned across navigation and streaming boundaries.',
      },
      {
        title: 'Google sign-in',
        description: 'Pre-built OAuth flow with redirect handling so you can focus on product logic.',
      },
      {
        title: 'Localization baseline',
        description: 'Start with English and French routes and extend to any markets you support.',
      },
    ],
  },
  fr: {
    heroTitle: 'Lancez-vous plus vite avec Supabase et Next.js',
    heroSubtitle:
      'Un socle pensé pour les équipes qui ont besoin d’authentification SSR, d’API typées et d’une UI modulaire.',
    cards: [
      {
        title: 'Sessions serveur prêtes',
        description: 'Récupérez les sessions Supabase dans les layouts et routes sans configuration supplémentaire.',
      },
      {
        title: 'Hydratation client alignée',
        description: 'Un SessionContext partagé maintient les hooks synchronisés entre navigation et streaming.',
      },
      {
        title: 'Connexion Google',
        description: 'Un flux OAuth préconfiguré avec redirection pour vous concentrer sur votre produit.',
      },
      {
        title: 'Base de localisation',
        description: 'Démarrez avec des routes en anglais et en français et étendez selon vos marchés.',
      },
    ],
  },
};

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

type PageProps = {
  params: { locale: Locale };
};

export default async function LocaleHomePage({ params }: PageProps) {
  const supabase = createServerSupabase();
  const {
    data: { session },
  } = await supabase.auth.getSession();

  const { heroTitle, heroSubtitle, cards } = copy[params.locale];

  return (
    <>
      <section className="hero">
        <h1>{heroTitle}</h1>
        <p>{heroSubtitle}</p>
      </section>

      <section className="surface-card">
        <h2 style={{ marginTop: 0 }}>Session</h2>
        <p className="card-description">
          {session
            ? `Active session for ${session.user.email ?? 'Google user'}.`
            : 'No active Supabase session detected. Use the Google login to start one.'}
        </p>
      </section>

      <section className="grid">
        {cards.map((item) => (
          <article key={item.title} className="surface-card">
            <h3 className="card-title">{item.title}</h3>
            <p className="card-description">{item.description}</p>
          </article>
        ))}
      </section>
    </>
  );
}
