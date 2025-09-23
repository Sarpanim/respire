import Link from 'next/link';
import Section from '../Section';
import { cn } from '@/lib/utils';
import type { CardSection, HeroAction, SectionActionVariant, SectionLayout, SectionTone } from './types';

const CARD_TONE_CLASSNAMES: Record<SectionTone, string> = {
  default: 'card bg-card/60',
  muted: '',
  primary:
    'card bg-gradient-to-br from-primary/40 via-primary/20 to-transparent ring-1 ring-primary/40 backdrop-blur',
};

const CARD_LAYOUT_CLASSNAMES: Record<SectionLayout, string> = {
  stack: '',
  grid: 'grid gap-6',
  prose: 'space-y-4',
};

const ACTION_VARIANT_CLASSNAMES: Record<SectionActionVariant, string> = {
  primary: 'btn-primary',
  ghost:
    'inline-flex items-center justify-center rounded-full border border-border px-6 py-3 text-sm font-semibold text-foreground/80 transition hover:border-accent hover:text-foreground',
  link: 'inline-flex items-center text-sm font-semibold text-primary underline-offset-4 transition hover:text-primary-dark',
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

export default function Card({
  kind: _kind,
  as,
  className,
  layout = 'stack',
  eyebrow,
  title,
  titleTag = 'h2',
  description,
  content,
  footer,
  tone = 'default',
  actions,
  ...rest
}: CardSection) {
  const HeadingTag = titleTag;
  const Tag = as ?? 'article';

  const computedContent = (() => {
    if (content !== undefined && content !== null) {
      if (typeof content === 'string') {
        return Tag === 'p' ? content : <p className="mt-2 text-sm text-muted-foreground">{content}</p>;
      }

      return content;
    }

    if (description) {
      return <p className="mt-2 text-sm text-muted-foreground">{description}</p>;
    }

    return null;
  })();

  return (
    <Section
      {...rest}
      as={Tag}
      className={cn(CARD_TONE_CLASSNAMES[tone], CARD_LAYOUT_CLASSNAMES[layout] ?? CARD_LAYOUT_CLASSNAMES.stack, className)}
    >
      {eyebrow ? (
        <span className="inline-flex rounded-full bg-accent/80 px-3 py-1 text-xs uppercase tracking-widest text-muted-foreground">
          {eyebrow}
        </span>
      ) : null}
      {title ? <HeadingTag className="text-lg font-semibold text-foreground">{title}</HeadingTag> : null}
      {computedContent}
      {actions && actions.length ? (
        <div className="mt-4 flex flex-wrap gap-3">{actions.map(renderAction)}</div>
      ) : null}
      {footer ? <div className="mt-6 text-sm text-muted-foreground">{footer}</div> : null}
    </Section>
  );
}
