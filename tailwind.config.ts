import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: 'var(--color-primary)',
          dark: 'var(--color-primary-dark)',
          foreground: 'var(--color-primaryText)',
        },
        background: 'var(--color-bg)',
        surface: 'var(--color-surface)',
        'secondary-text': 'var(--color-secondaryText)',
        accent1: 'var(--color-accent1)',
        accent2: 'var(--color-accent2)',
        accent3: 'var(--color-accent3)',
      },
      fontFamily: {
        sans: [
          'var(--font-sans)',
          'ui-sans-serif',
          'system-ui',
          'sans-serif',
        ],
      },
      borderRadius: {
        button: 'var(--button-radius)',
        card: 'var(--card-radius)',
      },
    },
  },
  plugins: [],
};

export default config;
