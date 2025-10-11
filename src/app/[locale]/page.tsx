import { createServerSupabase } from '@/lib/supabase/server';
import { locales, type Locale } from '@/types';
import { homePageCopy } from '@/data/locales/homepage';

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

  const { heroTitle, heroSubtitle, cards } = homePageCopy[params.locale];

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
