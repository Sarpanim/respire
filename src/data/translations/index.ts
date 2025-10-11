import type { LocalizedString } from '@/types';

type CourseCategorySeed = {
  id: number;
  name: LocalizedString;
  image: string | null;
};

type CourseSeed = {
  id: string;
  categoryId: number | null;
  level: string | null;
  requiredPlan: string | null;
  status: string;
  tags: string[];
  mentor: {
    name: LocalizedString;
    title: LocalizedString;
  };
  title: LocalizedString;
  description: LocalizedString;
  image: {
    src: string;
    alt: LocalizedString;
  } | null;
};

type CourseSectionSeed = {
  id: string;
  courseId: string;
  position: number;
  title: LocalizedString;
};

type LessonSeed = {
  id: string;
  sectionId: string;
  position: number;
  title: LocalizedString;
  content: LocalizedString;
};

type FaqItemSeed = {
  id: string;
  category: LocalizedString;
  question: LocalizedString;
  answer: LocalizedString;
};

type SubscriptionPlanSeed = {
  id: string;
  name: LocalizedString;
  description: LocalizedString;
  annualSavingsText: LocalizedString | null;
};

type PrivacyPolicySeed = {
  id: number;
  content: LocalizedString;
};

type GeneralSettingsSeed = {
  id: number;
  settings: Record<string, LocalizedString | string | number | boolean>;
};

export const courseCategorySeeds: CourseCategorySeed[] = [
  {
    id: 1,
    name: {
      fr: 'Respiration',
      es: 'Respiración',
      en: 'Breathing',
    },
    image: null,
  },
  {
    id: 2,
    name: {
      fr: 'Relaxation',
      es: 'Relajación',
      en: 'Relaxation',
    },
    image: null,
  },
];

export const courseSeeds: CourseSeed[] = [
  {
    id: '00000000-0000-0000-0000-000000000001',
    categoryId: 1,
    level: 'Débutant',
    requiredPlan: null,
    status: 'published',
    tags: ['respiration', 'équilibre'],
    mentor: {
      name: {
        fr: 'Camille Durand',
        es: 'Camille Durand',
        en: 'Camille Durand',
      },
      title: {
        fr: 'Coach respiration',
        es: 'Entrenadora de respiración',
        en: 'Breathwork coach',
      },
    },
    title: {
      fr: 'Introduction au breathwork',
      es: 'Introducción al breathwork',
      en: 'Breathwork essentials',
    },
    description: {
      fr: 'Apprenez les fondamentaux pour retrouver un souffle régulier et apaisant.',
      es: 'Aprende los fundamentos para recuperar una respiración regular y calmante.',
      en: 'Learn the foundations to regain a calm, steady breath.',
    },
    image: {
      src: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773',
      alt: {
        fr: 'Personne pratiquant la respiration consciente',
        es: 'Persona practicando respiración consciente',
        en: 'Person practicing conscious breathing',
      },
    },
  },
];

export const courseSectionSeeds: CourseSectionSeed[] = [
  {
    id: '00000000-0000-0000-0000-000000000101',
    courseId: '00000000-0000-0000-0000-000000000001',
    position: 1,
    title: {
      fr: 'Préparer sa séance',
      es: 'Preparar la sesión',
      en: 'Preparing the session',
    },
  },
];

export const lessonSeeds: LessonSeed[] = [
  {
    id: '00000000-0000-0000-0000-000000001001',
    sectionId: '00000000-0000-0000-0000-000000000101',
    position: 1,
    title: {
      fr: 'Respiration abdominale',
      es: 'Respiración abdominal',
      en: 'Abdominal breathing',
    },
    content: {
      fr: 'Allongez-vous confortablement et suivez le rythme guidé pour relâcher les tensions abdominales.',
      es: 'Túmbate cómodamente y sigue el ritmo guiado para liberar tensiones abdominales.',
      en: 'Lie down comfortably and follow the guided rhythm to release abdominal tension.',
    },
  },
];

export const faqSeeds: FaqItemSeed[] = [
  {
    id: '00000000-0000-0000-0000-000000010001',
    category: {
      fr: 'Abonnement',
      es: 'Suscripción',
      en: 'Subscription',
    },
    question: {
      fr: 'Puis-je annuler à tout moment ?',
      es: '¿Puedo cancelar en cualquier momento?',
      en: 'Can I cancel anytime?',
    },
    answer: {
      fr: 'Oui, l’abonnement est sans engagement et annulable depuis votre tableau de bord.',
      es: 'Sí, la suscripción es sin compromiso y se puede cancelar desde tu panel.',
      en: 'Yes, memberships are commitment-free and can be cancelled from your dashboard.',
    },
  },
];

export const subscriptionPlanSeeds: SubscriptionPlanSeed[] = [
  {
    id: 'starter',
    name: {
      fr: 'Essentiel',
      es: 'Esencial',
      en: 'Essential',
    },
    description: {
      fr: 'Les bases du breathwork avec de nouvelles ambiances chaque mois.',
      es: 'Los fundamentos del breathwork con nuevas atmósferas cada mes.',
      en: 'Breathwork fundamentals with fresh ambiences every month.',
    },
    annualSavingsText: {
      fr: 'Économisez 10 % en annuel',
      es: 'Ahorra un 10 % anual',
      en: 'Save 10% annually',
    },
  },
];

export const privacyPolicySeed: PrivacyPolicySeed = {
  id: 1,
  content: {
    fr: 'Politique de confidentialité disponible prochainement.',
    es: 'Política de privacidad disponible próximamente.',
    en: 'Privacy policy coming soon.',
  },
};

export const generalSettingsSeed: GeneralSettingsSeed = {
  id: 1,
  settings: {
    brandTagline: {
      fr: 'Respirez, progressez, respire.',
      es: 'Respira, progresa, respira.',
      en: 'Breathe, progress, respire.',
    },
  },
};
