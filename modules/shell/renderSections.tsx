import Section, { type SectionProps } from './Section';
import Hero from './sections/Hero';
import FeatureGrid from './sections/FeatureGrid';
import Card from './sections/Card';
import type { SectionDefinition } from './sections/types';

export type LegacySectionDefinition = SectionProps & { key: string };
export type RenderableSection = SectionDefinition | LegacySectionDefinition;

export function renderSections(sections: RenderableSection[]) {
  return sections.map((section) => {
    if ('kind' in section) {
      switch (section.kind) {
        case 'hero': {
          const { key, ...props } = section;
          return <Hero key={key} {...props} />;
        }
        case 'featureGrid': {
          const { key, ...props } = section;
          return <FeatureGrid key={key} {...props} />;
        }
        case 'card': {
          const { key, ...props } = section;
          return <Card key={key} {...props} />;
        }
        default: {
          return null;
        }
      }
    }

    const { key, ...props } = section;
    return <Section key={key} {...props} />;
  });
}
