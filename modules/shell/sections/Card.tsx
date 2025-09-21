import Link from 'next/link';
import Section from '../Section';
import { cn } from '@/lib/utils';
import type { CardSection, HeroAction, HeroActionVariant } from './types';

const DEFAULT_CARD_CLASS = 'card bg-slate-900/60';

const CARD_TONE_CLASSNAMES: Record<NonNullable<CardSection['tone']>, string> = {
  default: DEFAULT_CARD_CLASS,
  plain: '',
};

const ACTION_VARIANT_CLASSNAMES: Record<HeroActionVariant, string> = {
  primary: 'btn-primary',
  secondary:
    'inline-flex items-center justify-center rounded-full border border-slate-700 px-6 py-3 text-sm font-semibold text-slate-200 transition hover:border-slate-500 hover:text-white',
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
        return Tag === 'p' ? content : <p className="mt-2 text-sm text-slate-300">{content}</p>;
      }

      return content;
    }

    if (description) {
      return <p className="mt-2 text-sm text-slate-300">{description}</p>;
    }

    return null;
  })();

  return (
    <Section
      {...rest}
      as={Tag}
      className={cn(CARD_TONE_CLASSNAMES[tone], className)}
    >
      {eyebrow ? (
        <span className="inline-flex rounded-full bg-slate-800/80 px-3 py-1 text-xs uppercase tracking-widest text-slate-300">
          {eyebrow}
        </span>
      ) : null}
      {title ? <HeadingTag className="text-lg font-semibold text-white">{title}</HeadingTag> : null}
      {computedContent}
      {actions && actions.length ? (
        <div className="mt-4 flex flex-wrap gap-3">{actions.map(renderAction)}</div>
      ) : null}
      {footer ? <div className="mt-6 text-sm text-slate-300">{footer}</div> : null}
    </Section>
  );
}
