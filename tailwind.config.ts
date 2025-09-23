import type { Config } from 'tailwindcss';

import {
  createTailwindColorConfig,
  createTailwindFontFamilyConfig,
  createTailwindFontSizeConfig,
  createTailwindFontWeightConfig,
  createTailwindLineHeightConfig,
  createTailwindRadiusConfig,
  createTailwindShadowConfig,
  createTailwindSpacingConfig,
} from './lib/theme-tokens';

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
      borderRadius: createTailwindRadiusConfig(),
      spacing: createTailwindSpacingConfig(),
      boxShadow: createTailwindShadowConfig(),
      fontFamily: createTailwindFontFamilyConfig(),
      fontSize: createTailwindFontSizeConfig(),
      lineHeight: createTailwindLineHeightConfig(),
      fontWeight: createTailwindFontWeightConfig(),
    },
  },
  plugins: [],
};

export default config;
