import type { ReactNode } from 'react';

type IntrinsicElement = keyof JSX.IntrinsicElements;

type AccessibleProps = {
  id?: string;
  as?: IntrinsicElement;
  className?: string;
  role?: string;
  ariaLabel?: string;
};

export type SectionKind = 'hero' | 'featureGrid' | 'card';

export type HeroAction = {
  key: string;
  label: string;
  href: string;
  className?: string;
  ariaLabel?: string;
};

export type HeroSection = AccessibleProps & {
  kind: 'hero';
  eyebrow?: string;
  title: string;
  description?: string;
  actions?: HeroAction[];
};

export type FeatureGridItem = {
  key: string;
  title: string;
  description: string;
};

export type FeatureGridSection = AccessibleProps & {
  kind: 'featureGrid';
  items: FeatureGridItem[];
  itemClassName?: string;
  itemHeadingLevel?: 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
};

export type CardSection = AccessibleProps & {
  kind: 'card';
  eyebrow?: string;
  title?: string;
  description?: string;
  body?: ReactNode;
  headingLevel?: 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
  actions?: HeroAction[];
};

export type SectionDefinition =
  | (HeroSection & { key: string })
  | (FeatureGridSection & { key: string })
  | (CardSection & { key: string });

export type SectionComponentProps = HeroSection | FeatureGridSection | CardSection;
