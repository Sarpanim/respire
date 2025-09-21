import Section, { type SectionProps } from './Section';
import Hero from './sections/Hero';
import FeatureGrid from './sections/FeatureGrid';
import Card from './sections/Card';
import type { SectionDefinition, SectionKind } from './sections/types';

export type LegacySectionDefinition = SectionProps & { key: string };
export type RenderableSection = SectionDefinition | LegacySectionDefinition;

function isTypedSection(section: RenderableSection): section is SectionDefinition {
  return Boolean((section as SectionDefinition).kind);
}

function renderTypedSection(section: SectionDefinition) {
  const { key, kind, ...props } = section as SectionDefinition & { key: string; kind: SectionKind };

  switch (kind) {
    case 'hero':
      return (
        <Hero
          key={key}
          {...(props as Omit<Extract<SectionDefinition, { kind: 'hero' }>, 'key' | 'kind'>)}
          kind={kind}
        />
      );
    case 'featureGrid':
      return (
        <FeatureGrid
          key={key}
          {...(props as Omit<Extract<SectionDefinition, { kind: 'featureGrid' }>, 'key' | 'kind'>)}
          kind={kind}
        />
      );
    case 'card':
      return (
        <Card
          key={key}
          {...(props as Omit<Extract<SectionDefinition, { kind: 'card' }>, 'key' | 'kind'>)}
          kind={kind}
        />
      );
    default:
      return null;
  }
}

export function renderSections(sections: RenderableSection[]) {
  return sections.map((section) => {
    if (isTypedSection(section)) {
      return renderTypedSection(section);
    }

    const { key, ...props } = section;
    return <Section key={key} {...props} />;
  });
}
