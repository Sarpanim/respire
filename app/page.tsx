import { PageShell, composeSection } from '@/modules/shell';
import type { SectionDefinition } from '@/modules/shell';

const sections: SectionDefinition[] = [
  composeSection('hero.main', {
    key: 'home-hero',
    eyebrow: 'Respire, ici et maintenant',
    title: 'Une application de méditation simple, moderne et pensée pour la concentration.',
    description:
      'Explorez un catalogue de séances guidées, reprenez votre écoute là où vous vous êtes arrêté et avancez à votre rythme. Respire offre une expérience mobile-first, sécurisée et connectée à Supabase pour une authentification sans friction.',
    actions: [
      {
        key: 'login-action',
        label: 'Se connecter',
        href: '/login',
      },
      {
        key: 'courses-action',
        label: 'Parcourir les cours',
        href: '/courses',
        variant: 'ghost',
      },
    ],
  }),
  composeSection('grid.features', {
    key: 'home-feature-grid',
    items: [
      {
        key: 'magic-link',
        title: 'Connexion par lien magique',
        description:
          'Recevez un lien sécurisé dans votre boîte mail et accédez instantanément à votre tableau de bord, sans mot de passe.',
      },
      {
        key: 'catalogue',
        title: 'Catalogue filtrable',
        description:
          'Choisissez vos séances par catégorie ou niveau pour créer des routines sur mesure, du débutant à l’avancé.',
      },
      {
        key: 'audio-player',
        title: 'Lecteur audio intelligent',
        description:
          'Un lecteur HTML5 optimisé qui mémorise votre progression via localStorage pour chaque cours.',
      },
      {
        key: 'deployment',
        title: 'Déploiement continu',
        description:
          'Propulsé par Vercel et Supabase pour des mises à jour fluides et sécurisées du MVP à la production.',
      },
    ],
  }),
];

export default function HomePage() {
  return <PageShell sections={sections} />;
}
