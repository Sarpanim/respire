import type { Locale } from '@/types';

type HomeCard = {
  title: string;
  description: string;
};

type HomeCopy = Record<Locale, {
  heroTitle: string;
  heroSubtitle: string;
  cards: HomeCard[];
}>;

export const homePageCopy: HomeCopy = {
  fr: {
    heroTitle: 'Lancez-vous plus vite avec Supabase et Next.js',
    heroSubtitle:
      'Un socle pensé pour les équipes qui ont besoin d’authentification SSR, d’API typées et d’une UI modulaire.',
    cards: [
      {
        title: 'Sessions serveur prêtes',
        description: 'Récupérez les sessions Supabase dans les layouts et routes sans configuration supplémentaire.',
      },
      {
        title: 'Hydratation client alignée',
        description: 'Un SessionContext partagé maintient les hooks synchronisés entre navigation et streaming.',
      },
      {
        title: 'Connexion Google',
        description: 'Un flux OAuth préconfiguré avec redirection pour vous concentrer sur votre produit.',
      },
      {
        title: 'Base de localisation',
        description: 'Démarrez avec des routes en français, en espagnol puis en anglais pour suivre vos marchés.',
      },
    ],
  },
  es: {
    heroTitle: 'Lanza más rápido con Supabase y Next.js',
    heroSubtitle:
      'Una base pensada para equipos que necesitan autenticación SSR, APIs tipadas y una interfaz modular.',
    cards: [
      {
        title: 'Sesiones de servidor listas',
        description: 'Recupera las sesiones de Supabase en layouts y rutas sin configuración adicional.',
      },
      {
        title: 'Hidratación del cliente sincronizada',
        description: 'Un SessionContext compartido mantiene los hooks alineados entre navegación y streaming.',
      },
      {
        title: 'Inicio de sesión con Google',
        description: 'Flujo OAuth preconfigurado con redirección para que te concentres en tu producto.',
      },
      {
        title: 'Base de localización',
        description: 'Empieza con rutas en francés, español y después en inglés según tus mercados.',
      },
    ],
  },
  en: {
    heroTitle: 'Launch faster with Supabase and Next.js',
    heroSubtitle:
      'Bootstrapped for teams that need SSR-friendly authentication, typed APIs, and a modular UI toolkit.',
    cards: [
      {
        title: 'Server sessions ready',
        description: 'Read Supabase sessions in layouts and route handlers without extra wiring.',
      },
      {
        title: 'Client hydration in sync',
        description: 'A shared SessionContext keeps hooks aligned across navigation and streaming boundaries.',
      },
      {
        title: 'Google sign-in',
        description: 'Pre-built OAuth flow with redirect handling so you can focus on product logic.',
      },
      {
        title: 'Localization baseline',
        description: 'Start with French, Spanish, and English routes and expand to the markets you support.',
      },
    ],
  },
};
