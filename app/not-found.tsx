import Link from 'next/link';

export default function NotFound() {
  return (
    <section className="mx-auto flex max-w-2xl flex-col items-start gap-4">
      <h1 className="text-3xl font-semibold text-white">Page introuvable</h1>
      <p className="text-sm text-slate-300">
        Cette ressource n’existe pas ou n’est plus disponible. Retournez à l’accueil pour poursuivre votre exploration.
      </p>
      <Link
        href="/"
        className="rounded-full border border-slate-700 px-5 py-2 text-sm font-semibold text-slate-200 transition hover:border-slate-500 hover:text-white"
      >
        Retour à l’accueil
      </Link>
    </section>
  );
}
