import type { LocalizedString } from '@/types';

type CourseCategorySeed = {
  id: number;
  name: LocalizedString;
  image: string | null;
};

type CourseSeed = {
  id: string;
  slug: string;
  categoryId: number | null;
  level: string | null;
  requiredPlan: string | null;
  status: 'draft' | 'published';
  tags: string[];
  mentor: {
    name: LocalizedString;
    title: LocalizedString;
  } | null;
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
  summary: LocalizedString | null;
  content: LocalizedString;
  durationMinutes: number | null;
};

type FaqItemSeed = {
  id: string;
  category: LocalizedString;
  question: LocalizedString;
  answer: LocalizedString;
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
    slug: 'introduction-breathwork',
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
    summary: {
      fr: 'Un exercice guidé pour délier la ceinture abdominale et calmer le mental.',
      es: 'Un ejercicio guiado para soltar la cintura abdominal y calmar la mente.',
      en: 'A guided exercise to release abdominal tension and steady the mind.',
    },
    content: {
      fr: 'Allongez-vous confortablement et suivez le rythme guidé pour relâcher les tensions abdominales.',
      es: 'Túmbate cómodamente y sigue el ritmo guiado para liberar tensiones abdominales.',
      en: 'Lie down comfortably and follow the guided rhythm to release abdominal tension.',
    },
    durationMinutes: 8,
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

export type CoreSeedPayload = {
  courseCategories: CourseCategorySeed[];
  courses: CourseSeed[];
  courseSections: CourseSectionSeed[];
  lessons: LessonSeed[];
  faqItems: FaqItemSeed[];
};

export const coreSeedData: CoreSeedPayload = {
  courseCategories: courseCategorySeeds,
  courses: courseSeeds,
  courseSections: courseSectionSeeds,
  lessons: lessonSeeds,
  faqItems: faqSeeds,
};
