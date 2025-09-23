import Link from 'next/link';
import Badge from '@/components/Badge';
import { courseCategories, type Course } from '@/app/data/courses';

export default function CourseCard({ course }: { course: Course }) {
  const categoryLabel = courseCategories.find((item) => item.value === course.category)?.label ?? course.category;

  return (
    <Link
      href={`/courses/${course.slug}`}
      className="card flex h-full flex-col gap-4 transition hover:-translate-y-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background"
    >
      <div className="flex flex-wrap items-center gap-2 text-xs uppercase tracking-wide text-muted-foreground">
        <Badge>{categoryLabel}</Badge>
        <Badge variant="outline">{course.level}</Badge>
        <span className="rounded-full bg-accent px-2 py-1 text-xs text-muted-foreground">{course.duration} min</span>
      </div>
      <h3 className="text-lg font-semibold text-foreground">{course.title}</h3>
      <p className="text-sm text-muted-foreground">{course.summary}</p>
      <span className="mt-auto text-sm font-semibold text-primary">Découvrir →</span>
    </Link>
  );
}
