export const CORE_PAGES = [
  { path: '/', name: 'home' },
  { path: '/courses', name: 'courses' },
  { path: '/dashboard', name: 'dashboard' },
  { path: '/login', name: 'login' },
] as const;

export type CorePageName = (typeof CORE_PAGES)[number]['name'];
