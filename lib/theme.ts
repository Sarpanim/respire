export type Theme = 'light' | 'dark';

const DATA_ATTR = 'theme';

export function getTheme(): Theme {
  if (typeof document === 'undefined') {
    return 'light';
  }

  const value = document.documentElement.dataset[DATA_ATTR];
  return value === 'dark' ? 'dark' : 'light';
}

export function setTheme(theme: Theme) {
  if (typeof document === 'undefined') {
    return;
  }

  document.documentElement.dataset[DATA_ATTR] = theme;

  if (theme === 'dark') {
    document.documentElement.classList.add('dark');
  } else {
    document.documentElement.classList.remove('dark');
  }

  // TODO: Persist the chosen theme once a public switcher is introduced.
}
