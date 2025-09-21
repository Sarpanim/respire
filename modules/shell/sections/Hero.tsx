import Link from 'next/link';
import Section from '../Section';
import { cn } from '@/lib/utils';
import type { HeroAction, HeroSection } from './types';

const DEFAULT_SECTION_CLASS = 'mx-auto flex w-full max-w-3xl flex-col items-start';

function renderAction(action: HeroAction) {
  return (
    <Link key={action.key} href={action.href} aria-label={action.ariaLabel} className={action.className}>
      {action.label}
    </Link>
  );
}

export default function Hero({
  kind: _kind,
  as,
  className,
  eyebrow,
  title,
  description,
  actions,
  ...rest
}: HeroSection) {
  return (
    <Section
      {...rest}
      as={as ?? 'section'}
      className={cn(DEFAULT_SECTION_CLASS, className)}
    >
      <div className="card w-full space-y-6 bg-gradient-to-br from-slate-900/90 via-slate-900/80 to-slate-950">
        {eyebrow ? (
          <span className="inline-flex rounded-full bg-slate-800/80 px-3 py-1 text-xs uppercase tracking-widest text-slate-300">
            {eyebrow}
          </span>
        ) : null}
        <h1 className="text-3xl font-semibold text-white sm:text-4xl">{title}</h1>
        {description ? (
          <p className="text-base leading-relaxed text-slate-300">{description}</p>
        ) : null}
        {actions && actions.length ? (
          <div className="flex flex-wrap gap-3">{actions.map(renderAction)}</div>
        ) : null}
      </div>
    </Section>
  );
}
