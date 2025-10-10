import Link from 'next/link';
import type { Session } from '@supabase/supabase-js';
import { signOut } from '@/lib/actions/auth';
import { cn } from '@/lib/utils';
import ThemeToggle from './ThemeToggle';

const navLinks = [
  { href: '/', label: 'Accueil' },
  { href: '/courses', label: 'Cours' },
  { href: '/dashboard', label: 'Dashboard' },
];

export default function Header({ session }: { session: Session | null }) {
  return (
    <header className="sticky top-0 z-40 border-b border-slate-200/60 bg-white/80 backdrop-blur transition dark:border-slate-800/60 dark:bg-slate-950/70">
      <div className="mx-auto flex max-w-5xl flex-wrap items-center justify-between gap-4 px-4 py-4 sm:flex-nowrap sm:py-5">
        <Link href="/" className="flex items-center gap-3 text-lg font-semibold text-slate-900 transition-colors dark:text-white">
          <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-primary text-base font-bold text-primary-foreground shadow-lg shadow-primary/30">
            R
          </span>
          <span className="leading-tight">
            Respire
            <span className="block text-xs font-normal text-slate-500 dark:text-slate-400">Respirer. Se recentrer.</span>
          </span>
        </Link>
        <nav className="flex flex-1 items-center justify-end gap-3 text-sm font-medium">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                'rounded-full px-4 py-2 text-slate-700 transition-colors hover:bg-slate-100 hover:text-slate-900',
                'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background',
                'dark:text-slate-200 dark:hover:bg-slate-800/80 dark:hover:text-white'
              )}
            >
              {link.label}
            </Link>
          ))}
          <ThemeToggle />
          {session ? (
            <form action={signOut}>
              <button
                type="submit"
                className="btn btn-ghost border border-slate-300 bg-transparent text-slate-900 hover:border-slate-400 dark:border-slate-700 dark:text-slate-100 dark:hover:border-slate-500"
              >
                Se déconnecter
              </button>
            </form>
          ) : (
            <Link href="/login" className="btn btn-primary">
              Se connecter
            </Link>
          )}
        </nav>
      </div>
    </header>
  );
}
