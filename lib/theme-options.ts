export type ColorTheme =
  | 'azure'
  | 'blush'
  | 'sage'
  | 'sunset'
  | 'aurora'
  | 'ocean';

export const COLOR_THEME_IDS: readonly ColorTheme[] = [
  'azure',
  'blush',
  'sage',
  'sunset',
  'aurora',
  'ocean',
] as const;

export type ColorThemeOption = {
  id: ColorTheme;
  label: string;
  description: string;
  tone: 'solid' | 'gradient';
  swatch: string[];
};

export const colorThemeOptions: ColorThemeOption[] = [
  {
    id: 'azure',
    label: 'Azur profond',
    description: 'Un bleu moderne et apaisant pour une interface lumineuse.',
    tone: 'solid',
    swatch: ['#3b82f6'],
  },
  {
    id: 'blush',
    label: 'Pétale',
    description: 'Des notes rosées et chaleureuses pour une ambiance enveloppante.',
    tone: 'solid',
    swatch: ['#f472b6'],
  },
  {
    id: 'sage',
    label: 'Sauge douce',
    description: 'Un vert tendre et équilibré qui inspire la sérénité.',
    tone: 'solid',
    swatch: ['#22c55e'],
  },
  {
    id: 'sunset',
    label: 'Crépuscule',
    description: 'Un dégradé pêche et framboise qui évoque la chaleur du soir.',
    tone: 'gradient',
    swatch: ['#fb923c', '#ec4899'],
  },
  {
    id: 'aurora',
    label: 'Aurore boréale',
    description: 'Un mélange de turquoise et de violet inspiré des lumières du nord.',
    tone: 'gradient',
    swatch: ['#34d399', '#6366f1'],
  },
  {
    id: 'ocean',
    label: 'Océan nocturne',
    description: 'Un dégradé bleu profond et sarcelle pour une énergie marine.',
    tone: 'gradient',
    swatch: ['#0ea5e9', '#3b82f6'],
  },
];
