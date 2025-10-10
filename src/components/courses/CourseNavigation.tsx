import Link from 'next/link';

export type CourseNavigationItem = {
  label: string;
  href: string;
};

export type CourseNavigationProps = {
  items: CourseNavigationItem[];
  activeHref: string;
};

export function CourseNavigation({ items, activeHref }: CourseNavigationProps) {
  return (
    <nav className="course-navigation" aria-label="Course navigation">
      <ul>
        {items.map((item) => {
          const isActive = item.href === activeHref;

          return (
            <li key={item.href}>
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
