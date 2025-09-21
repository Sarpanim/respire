import Section from '../Section';
import Card from './Card';
import { cn } from '@/lib/utils';
import type { FeatureGridSection, SectionLayout, SectionTone } from './types';

const GRID_LAYOUT_CLASSNAMES: Record<SectionLayout, string> = {
  stack: 'mx-auto mt-12 flex w-full max-w-3xl flex-col gap-6',
  grid: 'mx-auto mt-12 grid w-full max-w-3xl gap-6 sm:grid-cols-2',
  prose: 'mx-auto mt-12 w-full max-w-3xl space-y-6',
};

const ITEM_TONE_CLASSNAMES: Record<SectionTone, SectionTone> = {
  default: 'default',
  muted: 'muted',
  primary: 'primary',
};

export default function FeatureGrid({
  kind: _kind,
  as,
  className,
  layout = 'grid',
  items,
  itemClassName,
  itemHeadingLevel = 'h2',
  tone = 'default',
  ...rest
}: FeatureGridSection) {
  const layoutClassName = GRID_LAYOUT_CLASSNAMES[layout] ?? GRID_LAYOUT_CLASSNAMES.grid;
  const itemTone = ITEM_TONE_CLASSNAMES[tone] ?? 'default';

  return (
    <Section
      {...rest}
      as={as ?? 'div'}
      className={cn(layoutClassName, className)}
    >
      {items.map((item) => (
        <Card
          key={item.key}
          kind="card"
          titleTag={itemHeadingLevel}
          tone={itemTone}
          className={itemClassName}
          title={item.title}
          description={item.description}
        />
      ))}
    </Section>
  );
}
