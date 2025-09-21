import Link from 'next/link';
import Section from '../Section';
import { cn } from '@/lib/utils';
import type { HeroAction, HeroActionVariant, HeroSection } from './types';

const DEFAULT_SECTION_CLASS = 'mx-auto flex w-full max-w-3xl flex-col items-start';

const ACTION_VARIANT_CLASSNAMES: Record<HeroActionVariant, string> = {
  primary: 'btn-primary',
  secondary:
    'inline-flex items-center justify-center rounded-full border border-slate-700 px-6 py-3 text-sm font-semibold text-slate-200 transition hover:border-slate-500 hover:text-white',
};

const TONE_CONTENT_CLASSNAMES: Record<NonNullable<HeroSection['tone']>, string> = {
  default: 'card w-full space-y-6 bg-gradient-to-br from-slate-900/90 via-slate-900/80 to-slate-950',
  surface: 'card w-full space-y-6',
  plain: 'w-full space-y-6',
};

function renderAction(action: HeroAction) {
  const variant = action.variant ?? 'primary';
  const baseClassName = ACTION_VARIANT_CLASSNAMES[variant];

  return (
    <Link
      key={action.key}
      href={action.href}
      aria-label={action.ariaLabel}
      className={cn(baseClassName, action.className)}
    >
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
  titleTag = 'h1',
  description,
  descriptionClassName,
  tone = 'default',
  contentClassName,
  actions,
  ...rest
}: HeroSection) {
  const TitleTag = titleTag;

  return (
    <Section
      {...rest}
      as={as ?? 'section'}
      className={cn(DEFAULT_SECTION_CLASS, className)}
    >
      <div className={cn(TONE_CONTENT_CLASSNAMES[tone], contentClassName)}>
        {eyebrow ? (
          <span className="inline-flex rounded-full bg-slate-800/80 px-3 py-1 text-xs uppercase tracking-widest text-slate-300">
            {eyebrow}
          </span>
        ) : null}
        <TitleTag className="text-3xl font-semibold text-white sm:text-4xl">{title}</TitleTag>
        {description ? (
          <p className={cn('text-base leading-relaxed text-slate-300', descriptionClassName)}>{description}</p>
        ) : null}
        {actions && actions.length ? (
          <div className="flex flex-wrap gap-3">{actions.map(renderAction)}</div>
        ) : null}
      </div>
    </Section>
  );
}
