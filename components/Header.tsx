import Link from 'next/link';
import type { Session } from '@supabase/supabase-js';
import { signOut } from '@/lib/actions/auth';
import { cn } from '@/lib/utils';

const navLinks = [
  { href: '/', label: 'Accueil' },
  { href: '/courses', label: 'Cours' },
  { href: '/dashboard', label: 'Dashboard' },
];

export default function Header({ session }: { session: Session | null }) {
  return (
    <header className="sticky top-0 z-40 border-b border-slate-800/60 bg-slate-950/70 backdrop-blur">
      <div className="mx-auto flex max-w-5xl flex-wrap items-center justify-between gap-4 px-4 py-4 sm:flex-nowrap sm:py-5">
        <Link href="/" className="flex items-center gap-3 text-lg font-semibold text-white">
          <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-primary text-base font-bold text-white shadow-lg">
            R
          </span>
          <span className="leading-tight">
            Respire
            <span className="block text-xs font-normal text-slate-400">Respirer. Se recentrer.</span>
          </span>
        </Link>
        <nav className="flex flex-1 items-center justify-end gap-4 text-sm font-medium">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                'rounded-full px-4 py-2 text-slate-200 transition-colors hover:bg-slate-800/80 hover:text-white',
                'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950'
              )}
            >
              {link.label}
            </Link>
          ))}
          {session ? (
            <form action={signOut}>
              <button
                type="submit"
                className="rounded-full border border-slate-700 px-4 py-2 text-sm font-semibold text-slate-200 transition hover:border-slate-500 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950"
              >
                Se déconnecter
              </button>
            </form>
          ) : (
            <Link href="/login" className="btn-primary">
              Se connecter
            </Link>
          )}
        </nav>
      </div>
    </header>
  );
}
