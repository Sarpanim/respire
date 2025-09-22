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

export type SectionTone = 'default' | 'muted' | 'primary';
export type SectionLayout = 'stack' | 'grid' | 'prose';

export type SectionActionVariant = 'primary' | 'ghost' | 'link';

export type HeroAction = {
  key: string;
  label: string;
  href: string;
  variant?: SectionActionVariant;
  className?: string;
  ariaLabel?: string;
};

type WithToneAndLayout<T extends AccessibleProps = AccessibleProps> = T & {
  tone?: SectionTone;
  layout?: SectionLayout;
};

export type HeroSection = WithToneAndLayout & {
  kind: 'hero';
  eyebrow?: string;
  title: string;
  titleTag?: 'h1' | 'h2' | 'h3' | 'h4';
  description?: string;
  descriptionClassName?: string;
  contentClassName?: string;
  actions?: HeroAction[];
};

export type FeatureGridItem = {
  key: string;
  title: string;
  description: string;
};

export type FeatureGridSection = WithToneAndLayout & {
  kind: 'featureGrid';
  items: FeatureGridItem[];
  itemClassName?: string;
  itemHeadingLevel?: 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
};

export type CardSection = WithToneAndLayout & {
  kind: 'card';
  eyebrow?: string;
  title?: string;
  titleTag?: 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
  description?: string;
  content?: ReactNode;
  footer?: ReactNode;
  actions?: HeroAction[];
};

export type SectionDefinition =
  | (HeroSection & { key: string })
  | (FeatureGridSection & { key: string })
  | (CardSection & { key: string });

export type SectionComponentProps = HeroSection | FeatureGridSection | CardSection;
