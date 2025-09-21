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

export type HeroActionVariant = 'primary' | 'secondary';

export type HeroAction = {
  key: string;
  label: string;
  href: string;
  variant?: HeroActionVariant;
  className?: string;
  ariaLabel?: string;
};

export type HeroSection = AccessibleProps & {
  kind: 'hero';
  eyebrow?: string;
  title: string;
  titleTag?: 'h1' | 'h2' | 'h3' | 'h4';
  description?: string;
  descriptionClassName?: string;
  tone?: 'default' | 'surface' | 'plain';
  contentClassName?: string;
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
  tone?: 'default' | 'plain';
};

export type CardSection = AccessibleProps & {
  kind: 'card';
  eyebrow?: string;
  title?: string;
  titleTag?: 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
  description?: string;
  content?: ReactNode;
  footer?: ReactNode;
  tone?: 'default' | 'plain';
  actions?: HeroAction[];
};

export type SectionDefinition =
  | (HeroSection & { key: string })
  | (FeatureGridSection & { key: string })
  | (CardSection & { key: string });

export type SectionComponentProps = HeroSection | FeatureGridSection | CardSection;
