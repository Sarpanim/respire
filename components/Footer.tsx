import Link from 'next/link';

const footerLinks = [
  { href: '/faq', label: 'FAQ' },
  { href: '/cgu', label: 'CGU' },
  { href: '/politique-de-confidentialite', label: 'Politique de confidentialité' },
  { href: '/dashboard', label: 'Dashboard' },
];

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="mt-auto border-t border-slate-200/60 bg-white/80 backdrop-blur dark:border-slate-800/60 dark:bg-slate-950/70">
      <div className="mx-auto flex max-w-5xl flex-col gap-8 px-4 py-10 sm:flex-row sm:items-center sm:justify-between">
        <div className="space-y-2 text-sm text-slate-600 dark:text-slate-300">
          <p className="text-base font-semibold text-slate-900 dark:text-white">Respire</p>
          <p className="max-w-sm text-sm text-slate-500 dark:text-slate-400">
            Prenez un moment pour vous recentrer. Respire propose des séances guidées pour calmer l&apos;esprit et retrouver un
            équilibre durable.
          </p>
        </div>
        <nav className="flex flex-wrap items-center gap-x-6 gap-y-3 text-sm font-medium text-slate-600 dark:text-slate-300">
          {footerLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="transition hover:text-slate-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background dark:hover:text-white"
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </div>
      <div className="border-t border-slate-200/50 bg-white/70 py-4 text-center text-xs text-slate-500 dark:border-slate-800/50 dark:bg-slate-950/60 dark:text-slate-400">
        © {currentYear} Respire. Tous droits réservés.
      </div>
    </footer>
  );
}
