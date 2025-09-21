import type { SectionDefinition, SectionKind } from './sections/types';

type SectionByKind<K extends SectionKind> = Extract<SectionDefinition, { kind: K }>;
type SectionBlueprint<K extends SectionKind> = Partial<Omit<SectionByKind<K>, 'key'>> & { kind: K };

type BlueprintKind<T> = T extends { kind: infer K } ? (K extends SectionKind ? K : never) : never;

export const SECTION_REGISTRY = {
  'hero.main': {
    kind: 'hero',
    layout: 'stack',
    tone: 'primary',
  } satisfies SectionBlueprint<'hero'>,
  'grid.features': {
    kind: 'featureGrid',
    layout: 'grid',
    tone: 'default',
  } satisfies SectionBlueprint<'featureGrid'>,
  'card.surface': {
    kind: 'card',
    tone: 'default',
    layout: 'stack',
  } satisfies SectionBlueprint<'card'>,
} as const;

export type SectionRegistryKey = keyof typeof SECTION_REGISTRY;

export function composeSection<K extends SectionRegistryKey>(
  registryKey: K,
  overrides: Omit<SectionByKind<BlueprintKind<typeof SECTION_REGISTRY[K]>>, 'key' | 'kind'> & { key: string }
): SectionDefinition {
  const blueprint = SECTION_REGISTRY[registryKey];
  const { key, ...rest } = overrides;

  return {
    key,
    ...blueprint,
    ...rest,
    kind: blueprint.kind,
  } as SectionDefinition;
}
