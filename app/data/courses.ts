export type CourseCategory = 'sommeil' | 'stress' | 'concentration' | 'compassion';
export type CourseLevel = 'Débutant' | 'Intermédiaire' | 'Avancé';

export type Lesson = {
  id: string;
  title: string;
  summary: string;
  duration: number;
  audioUrl: string;
  image: string;
  progress: number;
};

export type CourseSection = {
  id: string;
  title: string;
  description: string;
  image: string;
  progress: number;
  lessons: Lesson[];
};

export type Course = {
  slug: string;
  title: string;
  summary: string;
  category: CourseCategory;
  level: CourseLevel;
  duration: number;
  coverImage: string;
  progress: number;
  sections: CourseSection[];
};

export const courses: Course[] = [
  {
    slug: 'respiration-prof',
    title: 'Respiration profonde guidée',
    summary: 'Calmez votre système nerveux avec une respiration consciente et progressive.',
    category: 'stress',
    level: 'Débutant',
    duration: 28,
    coverImage:
      'https://images.unsplash.com/photo-1523978591478-c753949ff840?auto=format&fit=crop&w=1600&q=80',
    progress: 0.42,
    sections: [
      {
        id: 'fondations-respiratoires',
        title: 'Fondations respiratoires',
        description:
          'Découvrez les bases de la respiration consciente pour apaiser le mental et réoxygéner le corps.',
        image: 'https://images.unsplash.com/photo-1496307042754-b4aa456c4a2d?auto=format&fit=crop&w=1200&q=80',
        progress: 0.58,
        lessons: [
          {
            id: 'respiration-abdominale',
            title: 'Respiration abdominale',
            summary: 'Sentez le ventre se gonfler et se dégonfler pour rallonger naturellement votre souffle.',
            duration: 6,
            audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3',
            image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=900&q=80',
            progress: 0.9,
          },
          {
            id: 'coherence-cardiaque',
            title: 'Cohérence cardiaque guidée',
            summary: 'Un rythme 365 pour synchroniser respiration et battements cardiaques.',
            duration: 8,
            audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-10.mp3',
            image: 'https://images.unsplash.com/photo-1528715471579-d1bcf0ba5e83?auto=format&fit=crop&w=900&q=80',
            progress: 0.35,
          },
        ],
      },
      {
        id: 'ancrage-quotidien',
        title: 'Ancrage au quotidien',
        description:
          'Intégrez la respiration profonde dans vos routines matinales et vos pauses déstressantes.',
        image: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=1200&q=80',
        progress: 0.21,
        lessons: [
          {
            id: 'routine-matin',
            title: 'Routine matinale énergisante',
            summary: 'Un flow respiratoire et postural pour démarrer la journée en conscience.',
            duration: 14,
            audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-11.mp3',
            image: 'https://images.unsplash.com/photo-1523359346063-d879354c0ea5?auto=format&fit=crop&w=900&q=80',
            progress: 0.11,
          },
        ],
      },
    ],
  },
  {
    slug: 'body-scan-soir',
    title: 'Body scan apaisant du soir',
    summary: 'Relâchez chaque zone du corps pour préparer une nuit réparatrice.',
    category: 'sommeil',
    level: 'Débutant',
    duration: 34,
    coverImage:
      'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=1600&q=80',
    progress: 0.63,
    sections: [
      {
        id: 'detente-progressive',
        title: 'Détente progressive',
        description: 'Libérez les tensions musculaires en parcourant votre corps pas à pas.',
        image: 'https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?auto=format&fit=crop&w=1200&q=80',
        progress: 0.74,
        lessons: [
          {
            id: 'scan-pieds',
            title: 'Scan des pieds à la taille',
            summary: 'Un balayage lent pour relâcher jambes et bassin avant le sommeil.',
            duration: 12,
            audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3',
            image: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=900&q=80',
            progress: 0.82,
          },
          {
            id: 'scan-buste',
            title: 'Scan du buste et de la tête',
            summary: 'Une attention minutieuse sur le souffle, la gorge et les traits du visage.',
            duration: 10,
            audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-12.mp3',
            image: 'https://images.unsplash.com/photo-1499750310107-5fef28a66643?auto=format&fit=crop&w=900&q=80',
            progress: 0.68,
          },
        ],
      },
      {
        id: 'rituel-nuit',
        title: 'Rituel du coucher',
        description: 'Installez un environnement de sommeil réparateur avec une pratique guidée.',
        image: 'https://images.unsplash.com/photo-1519710164239-da123dc03ef4?auto=format&fit=crop&w=1200&q=80',
        progress: 0.46,
        lessons: [
          {
            id: 'visualisation-etoiles',
            title: 'Visualisation étoilée',
            summary: 'Imaginez un ciel nocturne pour apaiser le mental et ralentir le rythme.',
            duration: 12,
            audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3',
            image: 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=900&q=80',
            progress: 0.32,
          },
        ],
      },
    ],
  },
  {
    slug: 'focus-respire',
    title: 'Focus et respiration carrée',
    summary: 'Renforcez votre capacité de concentration grâce à un rythme respiratoire régulier.',
    category: 'concentration',
    level: 'Intermédiaire',
    duration: 30,
    coverImage:
      'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=1600&q=80',
    progress: 0.29,
    sections: [
      {
        id: 'structure-rythme',
        title: 'Structure du rythme',
        description: 'Apprenez la respiration carrée et ses variations pour muscler la concentration.',
        image: 'https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&w=1200&q=80',
        progress: 0.33,
        lessons: [
          {
            id: 'bases-carrees',
            title: 'Bases de la respiration carrée',
            summary: 'Inspirez, retenez, expirez, retenez avec la même durée pour stabiliser le mental.',
            duration: 9,
            audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3',
            image: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=900&q=80',
            progress: 0.4,
          },
          {
            id: 'variation-dynamique',
            title: 'Variations dynamiques',
            summary: 'Allongez progressivement chaque phase pour renforcer l’endurance mentale.',
            duration: 11,
            audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-13.mp3',
            image: 'https://images.unsplash.com/photo-1517430816045-df4b7de11d1d?auto=format&fit=crop&w=900&q=80',
            progress: 0.27,
          },
        ],
      },
      {
        id: 'mise-en-pratique',
        title: 'Mise en pratique focus',
        description: 'Appliquez la respiration carrée à des situations professionnelles exigeantes.',
        image: 'https://images.unsplash.com/photo-1529336953121-497c3d39c5b6?auto=format&fit=crop&w=1200&q=80',
        progress: 0.22,
        lessons: [
          {
            id: 'focus-projet',
            title: 'Focus sur un projet clé',
            summary: 'Une méditation guidée pour revenir à l’intention initiale d’une tâche prioritaire.',
            duration: 10,
            audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3',
            image: 'https://images.unsplash.com/photo-1454165205744-3b78555e5572?auto=format&fit=crop&w=900&q=80',
            progress: 0.2,
          },
        ],
      },
    ],
  },
  {
    slug: 'metta-douceur',
    title: 'Méditation de compassion (Metta)',
    summary: 'Cultivez la bienveillance envers vous-même et les autres avec des visualisations positives.',
    category: 'compassion',
    level: 'Intermédiaire',
    duration: 33,
    coverImage:
      'https://images.unsplash.com/photo-1478476868527-002ae3f3e159?auto=format&fit=crop&w=1600&q=80',
    progress: 0.51,
    sections: [
      {
        id: 'ouverture-coeur',
        title: 'Ouverture du cœur',
        description: 'Développez l’auto-compassion grâce à des phrases de bienveillance répétées consciemment.',
        image: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=crop&w=1200&q=80',
        progress: 0.6,
        lessons: [
          {
            id: 'bienveillance-soi',
            title: 'Bienveillance envers soi',
            summary: 'Soutenez votre voix intérieure avec une pratique de compassion douce.',
            duration: 12,
            audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-6.mp3',
            image: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=900&q=80',
            progress: 0.73,
          },
          {
            id: 'cercle-amis',
            title: 'Cercle d’amis',
            summary: 'Étendez la compassion aux proches et alliés qui vous soutiennent.',
            duration: 9,
            audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-14.mp3',
            image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=900&q=80',
            progress: 0.48,
          },
        ],
      },
      {
        id: 'compassion-universelle',
        title: 'Compassion universelle',
        description: 'Ouvrez votre pratique à des cercles de plus en plus larges, jusqu’au monde entier.',
        image: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&w=1200&q=80',
        progress: 0.39,
        lessons: [
          {
            id: 'metta-collectif',
            title: 'Metta collectif',
            summary: 'Envoyez des souhaits de paix et de sécurité à des inconnus et communautés.',
            duration: 12,
            audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-7.mp3',
            image: 'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=900&q=80',
            progress: 0.32,
          },
        ],
      },
    ],
  },
  {
    slug: 'marche-consciente',
    title: 'Marche consciente guidée',
    summary: 'Ancrez-vous dans le moment présent lors d’une marche lente et attentive.',
    category: 'stress',
    level: 'Intermédiaire',
    duration: 29,
    coverImage:
      'https://images.unsplash.com/photo-1524502397800-2eeaad7c3fe5?auto=format&fit=crop&w=1600&q=80',
    progress: 0.37,
    sections: [
      {
        id: 'preparation-marche',
        title: 'Préparation à la marche',
        description: 'Préparez le corps et l’esprit avant de sortir pour une promenade méditative.',
        image: 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1200&q=80',
        progress: 0.42,
        lessons: [
          {
            id: 'etirements-doux',
            title: 'Étirements doux',
            summary: 'Réchauffez les muscles et alignez la posture avec des mouvements conscients.',
            duration: 11,
            audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-15.mp3',
            image: 'https://images.unsplash.com/photo-1549576490-b0b4831ef60a?auto=format&fit=crop&w=900&q=80',
            progress: 0.44,
          },
          {
            id: 'ancrage-pieds',
            title: 'Ancrage des pieds',
            summary: 'Sentez chaque contact avec le sol pour ralentir le rythme interne.',
            duration: 8,
            audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-8.mp3',
            image: 'https://images.unsplash.com/photo-1526401485004-46910ecc8e51?auto=format&fit=crop&w=900&q=80',
            progress: 0.28,
          },
        ],
      },
      {
        id: 'exploration-exterieure',
        title: 'Exploration extérieure',
        description: 'Accueillez les sensations et les sons extérieurs pendant la marche.',
        image: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&w=1200&q=80',
        progress: 0.31,
        lessons: [
          {
            id: 'marche-cercle',
            title: 'Marche en cercle',
            summary: 'Réalisez des boucles lentes en synchronisant respiration et pas.',
            duration: 10,
            audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-16.mp3',
            image: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=900&q=80',
            progress: 0.2,
          },
        ],
      },
    ],
  },
  {
    slug: 'matin-energie',
    title: 'Routine matinale énergisante',
    summary: 'Démarrez la journée avec une séance courte et stimulante.',
    category: 'concentration',
    level: 'Débutant',
    duration: 24,
    coverImage:
      'https://images.unsplash.com/photo-1496307042754-b4aa456c4a2d?auto=format&fit=crop&w=1600&q=80',
    progress: 0.55,
    sections: [
      {
        id: 'reveil-douceur',
        title: 'Réveil en douceur',
        description: 'Éveillez le corps progressivement grâce à des respirations stimulantes.',
        image: 'https://images.unsplash.com/photo-1499750310107-5fef28a66643?auto=format&fit=crop&w=1200&q=80',
        progress: 0.62,
        lessons: [
          {
            id: 'respiration-energique',
            title: 'Respiration énergique',
            summary: 'Alternez inspiration rapide et expiration longue pour booster l’attention.',
            duration: 7,
            audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-9.mp3',
            image: 'https://images.unsplash.com/photo-1526401485004-46910ecc8e51?auto=format&fit=crop&w=900&q=80',
            progress: 0.75,
          },
          {
            id: 'mouvements-légers',
            title: 'Mouvements légers',
            summary: 'Associez mouvements et souffle pour réveiller la colonne vertébrale.',
            duration: 9,
            audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3',
            image: 'https://images.unsplash.com/photo-1528715471579-d1bcf0ba5e83?auto=format&fit=crop&w=900&q=80',
            progress: 0.48,
          },
        ],
      },
      {
        id: 'lancrage-journee',
        title: 'Ancrage de la journée',
        description: 'Fixez vos intentions et planifiez votre énergie pour les prochaines heures.',
        image: 'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=1200&q=80',
        progress: 0.44,
        lessons: [
          {
            id: 'intention-jour',
            title: 'Intention du jour',
            summary: 'Un scan mental et émotionnel pour clarifier vos priorités.',
            duration: 8,
            audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-10.mp3',
            image: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=900&q=80',
            progress: 0.36,
          },
        ],
      },
    ],
  },
  {
    slug: 'visualisation-mer',
    title: 'Visualisation bord de mer',
    summary: 'Laissez-vous porter par le son des vagues pour relâcher les tensions profondes.',
    category: 'sommeil',
    level: 'Avancé',
    duration: 35,
    coverImage:
      'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1600&q=80',
    progress: 0.24,
    sections: [
      {
        id: 'immersion-marine',
        title: 'Immersion marine',
        description: 'Plongez dans un paysage côtier pour calmer les pensées envahissantes.',
        image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80',
        progress: 0.3,
        lessons: [
          {
            id: 'visualisation-plage',
            title: 'Visualisation de plage',
            summary: 'Imaginez le sable et la mer pour ralentir progressivement le rythme.',
            duration: 13,
            audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3',
            image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=900&q=80',
            progress: 0.28,
          },
          {
            id: 'respiration-vagues',
            title: 'Respiration vagues',
            summary: 'Synchronisez respiration et flux de la marée pour une détente profonde.',
            duration: 12,
            audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-11.mp3',
            image: 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=900&q=80',
            progress: 0.19,
          },
        ],
      },
      {
        id: 'nuit-reparatrice',
        title: 'Vers une nuit réparatrice',
        description: 'Installez un calme durable avant l’endormissement.',
        image: 'https://images.unsplash.com/photo-1452570053594-1b985d6ea890?auto=format&fit=crop&w=1200&q=80',
        progress: 0.18,
        lessons: [
          {
            id: 'retour-au-corps',
            title: 'Retour au corps',
            summary: 'Fermez la séance avec un body scan lent, ancré dans les sensations.',
            duration: 10,
            audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-12.mp3',
            image: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=crop&w=900&q=80',
            progress: 0.15,
          },
        ],
      },
    ],
  },
  {
    slug: 'gratitude-courte',
    title: 'Pause gratitude express',
    summary: 'Reconnectez-vous à vos réussites et diffusez la gratitude dans votre quotidien.',
    category: 'compassion',
    level: 'Débutant',
    duration: 22,
    coverImage:
      'https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&w=1600&q=80',
    progress: 0.68,
    sections: [
      {
        id: 'gratitude-personnelle',
        title: 'Gratitude personnelle',
        description: 'Revenez sur vos accomplissements et vos qualités avec douceur.',
        image: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=1200&q=80',
        progress: 0.75,
        lessons: [
          {
            id: 'journal-gratitude',
            title: 'Journal de gratitude',
            summary: 'Un voyage guidé pour nommer trois victoires de la journée.',
            duration: 8,
            audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3',
            image: 'https://images.unsplash.com/photo-1472162072942-cd5147eb3902?auto=format&fit=crop&w=900&q=80',
            progress: 0.84,
          },
          {
            id: 'auto-affirmations',
            title: 'Auto-affirmations positives',
            summary: 'Affirmez vos forces et qualités pour renforcer la confiance.',
            duration: 7,
            audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-13.mp3',
            image: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=900&q=80',
            progress: 0.66,
          },
        ],
      },
      {
        id: 'gratitude-partagee',
        title: 'Gratitude partagée',
        description: 'Exprimez vos remerciements aux personnes qui vous entourent.',
        image: 'https://images.unsplash.com/photo-1455849318743-b2233052fcff?auto=format&fit=crop&w=1200&q=80',
        progress: 0.58,
        lessons: [
          {
            id: 'lettres-remerciement',
            title: 'Lettres de remerciement',
            summary: 'Visualisez l’envoi d’un message sincère à une personne clé.',
            duration: 7,
            audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-14.mp3',
            image: 'https://images.unsplash.com/photo-1529336953121-497c3d39c5b6?auto=format&fit=crop&w=900&q=80',
            progress: 0.51,
          },
        ],
      },
    ],
  },
  {
    slug: 'scan-avance',
    title: 'Body scan approfondi',
    summary: 'Explorez sensations et émotions avec une attention soutenue sur l’ensemble du corps.',
    category: 'compassion',
    level: 'Avancé',
    duration: 38,
    coverImage:
      'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=1600&q=80',
    progress: 0.17,
    sections: [
      {
        id: 'exploration-lente',
        title: 'Exploration lente',
        description: 'Une traversée consciente des zones du corps pour affiner la perception.',
        image: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=1200&q=80',
        progress: 0.2,
        lessons: [
          {
            id: 'scan-mains',
            title: 'Scan des mains et des bras',
            summary: 'Affinez votre perception des micro-sensations dans les extrémités.',
            duration: 14,
            audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-15.mp3',
            image: 'https://images.unsplash.com/photo-1522107177-7c0c4d6c1bbc?auto=format&fit=crop&w=900&q=80',
            progress: 0.18,
          },
          {
            id: 'scan-ventre',
            title: 'Scan du ventre et du dos',
            summary: 'Restez présent aux sensations internes et aux mouvements respiratoires.',
            duration: 12,
            audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-16.mp3',
            image: 'https://images.unsplash.com/photo-1528715471579-d1bcf0ba5e83?auto=format&fit=crop&w=900&q=80',
            progress: 0.14,
          },
        ],
      },
      {
        id: 'integration-profonde',
        title: 'Intégration profonde',
        description: 'Fusionnez les sensations pour ressentir le corps comme un ensemble harmonieux.',
        image: 'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=1200&q=80',
        progress: 0.13,
        lessons: [
          {
            id: 'scan-global',
            title: 'Scan global',
            summary: 'Reliez les sensations du corps entier en un seul mouvement conscient.',
            duration: 12,
            audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3',
            image: 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&w=900&q=80',
            progress: 0.09,
          },
        ],
      },
    ],
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
