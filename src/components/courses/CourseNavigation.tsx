import type { Route } from 'next';
import Link from 'next/link';
import type { UrlObject } from 'url';

export type CourseNavigationItem = {
  label: string;
  href: Route | (UrlObject & { pathname: Route });
};

export type CourseNavigationProps = {
  items: CourseNavigationItem[];
  activeHref: Route;
};

function resolveHrefPathname(href: CourseNavigationItem['href']) {
  if (typeof href === 'string') {
    const [pathname] = href.split('?');
    return pathname;
  }

  return href.pathname;
}

export function CourseNavigation({ items, activeHref }: CourseNavigationProps) {
  return (
    <nav className="course-navigation" aria-label="Course navigation">
      <ul>
        {items.map((item) => {
          const isActive = resolveHrefPathname(item.href) === activeHref;
          const itemKey = typeof item.href === 'string' ? item.href : item.href.pathname;

          return (
            <li key={itemKey}>
              <Link
                href={item.href}
                className={isActive ? 'course-navigation__link course-navigation__link--active' : 'course-navigation__link'}
              >
                {item.label}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
