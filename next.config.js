/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: {
    typedRoutes: true,
  },
  i18n: {
    locales: ['en', 'fr'],
    defaultLocale: 'en',
  },
  eslint: {
    dirs: ['src'],
  },
};

module.exports = nextConfig;
