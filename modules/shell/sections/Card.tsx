import Link from 'next/link';
import Section from '../Section';
import { cn } from '@/lib/utils';
import type { CardSection, HeroAction } from './types';

const DEFAULT_CARD_CLASS = 'card bg-slate-900/60';

function renderAction(action: HeroAction) {
  return (
    <Link key={action.key} href={action.href} aria-label={action.ariaLabel} className={action.className}>
      {action.label}
    </Link>
  );
}

export default function Card({
  kind: _kind,
  as,
  className,
  eyebrow,
  title,
  description,
  body,
  headingLevel = 'h2',
  actions,
  ...rest
}: CardSection) {
  const HeadingTag = headingLevel;

  return (
    <Section
      {...rest}
      as={as ?? 'article'}
      className={cn(DEFAULT_CARD_CLASS, className)}
    >
      {eyebrow ? (
        <span className="inline-flex rounded-full bg-slate-800/80 px-3 py-1 text-xs uppercase tracking-widest text-slate-300">
          {eyebrow}
        </span>
      ) : null}
      {title ? <HeadingTag className="text-lg font-semibold text-white">{title}</HeadingTag> : null}
      {description ? <p className="mt-2 text-sm text-slate-300">{description}</p> : null}
      {body}
      {actions && actions.length ? (
        <div className="mt-4 flex flex-wrap gap-3">{actions.map(renderAction)}</div>
      ) : null}
    </Section>
  );
}
