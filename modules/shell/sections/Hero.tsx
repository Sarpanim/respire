import Link from 'next/link';
import Section from '../Section';
import { cn } from '@/lib/utils';
import type { HeroAction, HeroSection, SectionActionVariant, SectionLayout, SectionTone } from './types';

const SECTION_LAYOUT_CLASSNAMES: Record<SectionLayout, string> = {
  stack: 'mx-auto flex w-full max-w-3xl flex-col items-start',
  grid: 'mx-auto grid w-full max-w-5xl gap-8 md:grid-cols-2 md:items-center',
  prose: 'mx-auto w-full max-w-3xl space-y-6',
};

const ACTION_VARIANT_CLASSNAMES: Record<SectionActionVariant, string> = {
  primary: 'btn btn-primary',
  ghost:
    'btn btn-ghost border border-slate-300 px-6 py-3 text-sm font-semibold text-slate-900 transition hover:border-slate-400 hover:text-slate-900/80 dark:border-slate-700 dark:text-slate-200 dark:hover:border-slate-500 dark:hover:text-white',
  link: 'inline-flex items-center text-sm font-semibold text-primary underline-offset-4 transition hover:text-primary/80',
};

const HERO_TONE_CONTENT_CLASSNAMES: Record<SectionTone, string> = {
  default: 'card w-full space-y-6',
  muted:
    'w-full space-y-6 rounded-2xl border border-border bg-muted/60 p-8 text-muted-foreground dark:bg-slate-900/30 dark:text-slate-200',
  primary:
    'card w-full space-y-6 bg-gradient-to-br from-sky-100 via-white to-white text-slate-900 dark:from-slate-900/65 dark:via-slate-900/50 dark:to-slate-950/80 dark:text-white',
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
  layout = 'stack',
  eyebrow,
  title,
  titleTag = 'h1',
  description,
  descriptionClassName,
  tone = 'primary',
  contentClassName,
  actions,
  ...rest
}: HeroSection) {
  const TitleTag = titleTag;
  const sectionLayoutClass = SECTION_LAYOUT_CLASSNAMES[layout] ?? SECTION_LAYOUT_CLASSNAMES.stack;
  const toneClassName = HERO_TONE_CONTENT_CLASSNAMES[tone] ?? HERO_TONE_CONTENT_CLASSNAMES.primary;

  return (
    <Section
      {...rest}
      as={as ?? 'section'}
      className={cn(sectionLayoutClass, className)}
    >
      <div className={cn(toneClassName, contentClassName)}>
        {eyebrow ? (
          <span className="inline-flex rounded-full bg-slate-100 px-3 py-1 text-xs uppercase tracking-widest text-slate-600 dark:bg-slate-800/80 dark:text-slate-300">
            {eyebrow}
          </span>
        ) : null}
        <TitleTag className="text-3xl font-semibold text-foreground sm:text-4xl">{title}</TitleTag>
        {description ? (
          <p className={cn('text-base leading-relaxed text-muted-foreground', descriptionClassName)}>{description}</p>
        ) : null}
        {actions && actions.length ? (
          <div className="flex flex-wrap gap-3">{actions.map(renderAction)}</div>
        ) : null}
      </div>
    </Section>
  );
}
