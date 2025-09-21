export * from './corePages';
export { default as PageShell } from './PageShell';
export { default as Section } from './Section';
export { renderSections } from './renderSections';
export { SECTION_REGISTRY, composeSection } from './sectionRegistry';
export type { SectionRegistryKey } from './sectionRegistry';
export type { RenderableSection, LegacySectionDefinition } from './renderSections';
export type {
  SectionKind,
  SectionDefinition,
  SectionComponentProps,
  HeroSection,
  FeatureGridSection,
  CardSection,
  HeroAction,
  SectionActionVariant,
  SectionTone,
  SectionLayout,
  FeatureGridItem,
} from './sections/types';
