import Link from 'next/link';
import { courseCategories, courseLevels } from '@/app/data/courses';
import { cn } from '@/lib/utils';

type FilterHref = {
  pathname: string;
  query?: Record<string, string | undefined>;
};

export default function CourseFilters({
  currentCategory,
  currentLevel,
}: {
  currentCategory?: string;
  currentLevel?: string;
}) {
  return (
    <div className="card flex flex-col gap-6 bg-card/60">
      <div>
        <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">Catégorie</p>
        <div className="mt-3 flex flex-wrap gap-2">
          <FilterPill
            label="Toutes"
            href={{ pathname: '/courses', query: currentLevel ? { level: currentLevel } : {} }}
            active={!currentCategory}
          />
          {courseCategories.map((category) => (
            <FilterPill
              key={category.value}
              label={category.label}
              href={{
                pathname: '/courses',
                query: {
                  category: category.value,
                  ...(currentLevel ? { level: currentLevel } : {}),
                },
              }}
              active={currentCategory === category.value}
            />
          ))}
        </div>
      </div>
      <div>
        <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">Niveau</p>
        <div className="mt-3 flex flex-wrap gap-2">
          <FilterPill
            label="Tous"
            href={{ pathname: '/courses', query: currentCategory ? { category: currentCategory } : {} }}
            active={!currentLevel}
          />
          {courseLevels.map((level) => (
            <FilterPill
              key={level}
              label={level}
              href={{
                pathname: '/courses',
                query: {
                  ...(currentCategory ? { category: currentCategory } : {}),
                  level,
                },
              }}
              active={currentLevel === level}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

function FilterPill({ label, href, active }: { label: string; href: FilterHref; active: boolean }) {
  return (
    <Link
      href={href}
      scroll
      className={cn(
        'rounded-full border px-4 py-2 text-sm font-medium transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background',
        active
          ? 'border-primary bg-primary/20 text-primary'
          : 'border-border text-foreground/80 hover:border-accent hover:text-foreground'
      )}
    >
      {label}
    </Link>
  );
}
