export type CourseCategory = 'sommeil' | 'stress' | 'concentration' | 'compassion';
export type CourseLevel = 'Débutant' | 'Intermédiaire' | 'Avancé';

export type Course = {
  slug: string;
  title: string;
  summary: string;
  category: CourseCategory;
  level: CourseLevel;
  duration: number;
  audioUrl: string;
};

export const courses: Course[] = [
  {
    slug: 'respiration-prof',
    title: 'Respiration profonde guidée',
    summary: 'Calmez votre système nerveux avec une respiration consciente et progressive.',
    category: 'stress',
    level: 'Débutant',
    duration: 10,
    audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3',
  },
  {
    slug: 'body-scan-soir',
    title: 'Body scan apaisant du soir',
    summary: 'Relâchez chaque zone du corps pour préparer une nuit réparatrice.',
    category: 'sommeil',
    level: 'Débutant',
    duration: 15,
    audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3',
  },
  {
    slug: 'focus-respire',
    title: 'Focus et respiration carrée',
    summary: 'Renforcez votre capacité de concentration grâce à un rythme respiratoire régulier.',
    category: 'concentration',
    level: 'Intermédiaire',
    duration: 12,
    audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3',
  },
  {
    slug: 'metta-douceur',
    title: 'Méditation de compassion (Metta)',
    summary: 'Cultivez la bienveillance envers vous-même et les autres avec des visualisations positives.',
    category: 'compassion',
    level: 'Intermédiaire',
    duration: 18,
    audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3',
  },
  {
    slug: 'marche-consciente',
    title: 'Marche consciente guidée',
    summary: 'Ancrez-vous dans le moment présent lors d’une marche lente et attentive.',
    category: 'stress',
    level: 'Intermédiaire',
    duration: 14,
    audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3',
  },
  {
    slug: 'matin-energie',
    title: 'Routine matinale énergisante',
    summary: 'Démarrez la journée avec une séance courte et stimulante.',
    category: 'concentration',
    level: 'Débutant',
    duration: 8,
    audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-6.mp3',
  },
  {
    slug: 'visualisation-mer',
    title: 'Visualisation bord de mer',
    summary: 'Laissez-vous porter par le son des vagues pour relâcher les tensions profondes.',
    category: 'sommeil',
    level: 'Avancé',
    duration: 20,
    audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-7.mp3',
  },
  {
    slug: 'gratitude-courte',
    title: 'Pause gratitude express',
    summary: 'Reconnectez-vous à vos réussites et diffusez la gratitude dans votre quotidien.',
    category: 'compassion',
    level: 'Débutant',
    duration: 6,
    audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-8.mp3',
  },
  {
    slug: 'scan-avance',
    title: 'Body scan approfondi',
    summary: 'Explorez sensations et émotions avec une attention soutenue sur l’ensemble du corps.',
    category: 'compassion',
    level: 'Avancé',
    duration: 25,
    audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-9.mp3',
  },
];

export function getCourseBySlug(slug: string) {
  return courses.find((course) => course.slug === slug) ?? null;
}

export const courseCategories: Array<{ label: string; value: CourseCategory }> = [
  { label: 'Sommeil', value: 'sommeil' },
  { label: 'Stress', value: 'stress' },
  { label: 'Concentration', value: 'concentration' },
  { label: 'Compassion', value: 'compassion' },
];

export const courseLevels: Array<CourseLevel> = ['Débutant', 'Intermédiaire', 'Avancé'];
