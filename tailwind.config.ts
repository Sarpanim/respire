import type { Config } from 'tailwindcss';

import { createTailwindColorConfig } from './lib/theme-tokens';

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './modules/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: createTailwindColorConfig(),
    },
  },
  plugins: [],
};

export default config;
