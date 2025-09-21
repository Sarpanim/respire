import Section from '../Section';
import Card from './Card';
import { cn } from '@/lib/utils';
import type { FeatureGridSection } from './types';

const DEFAULT_GRID_CLASS = 'mx-auto mt-12 grid w-full max-w-3xl gap-6 sm:grid-cols-2';

export default function FeatureGrid({
  kind: _kind,
  as,
  className,
  items,
  itemClassName,
  itemHeadingLevel = 'h2',
  tone = 'default',
  ...rest
}: FeatureGridSection) {
  return (
    <Section
      {...rest}
      as={as ?? 'div'}
      className={cn(DEFAULT_GRID_CLASS, className)}
    >
      {items.map((item) => (
        <Card
          key={item.key}
          kind="card"
          titleTag={itemHeadingLevel}
          tone={tone === 'plain' ? 'plain' : 'default'}
          className={itemClassName}
          title={item.title}
          description={item.description}
        />
      ))}
    </Section>
  );
}
