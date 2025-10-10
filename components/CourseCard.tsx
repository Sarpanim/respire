import Image from 'next/image';
import Link from 'next/link';
import Badge from '@/components/Badge';
import ProgressBar from '@/components/ProgressBar';
import { courseCategories, type Course } from '@/app/data/courses';
import { courseCategoryTokens } from '@/lib/course-style-tokens';
import { cn } from '@/lib/utils';

export default function CourseCard({ course }: { course: Course }) {
  const categoryLabel = courseCategories.find((item) => item.value === course.category)?.label ?? course.category;

  const styles = courseCategoryTokens[course.category];
  const lessonCount = course.sections.reduce((count, section) => count + section.lessons.length, 0);

  return (
    <Link
      href={`/courses/${course.slug}`}
      className="card group relative flex h-full flex-col gap-5 overflow-hidden transition-transform hover:-translate-y-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background"
    >
      <span
        aria-hidden
        className={cn(
          'pointer-events-none absolute inset-0 -z-10 bg-gradient-to-br opacity-60 transition-opacity duration-500 group-hover:opacity-90 group-focus-visible:opacity-90',
          styles.glow
        )}
      />
      <div className="relative aspect-video w-full overflow-hidden rounded-xl bg-slate-900/80">
        <Image
          src={course.coverImage}
          alt="Illustration du cours"
          fill
          sizes="(min-width: 1024px) 320px, (min-width: 640px) 45vw, 90vw"
          className="object-cover transition duration-500 group-hover:scale-105"
          priority={false}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/10 to-transparent" aria-hidden />
      </div>
      <div className="relative flex flex-wrap items-center gap-2 text-xs uppercase tracking-wide text-muted-foreground">
        <Badge className={styles.badge}>{categoryLabel}</Badge>
        <Badge variant="outline" className="border-slate-500/40 text-slate-600 dark:border-slate-400/40 dark:text-slate-200">
          {course.level}
        </Badge>
        <span className="rounded-full border border-slate-900/10 bg-slate-900/5 px-2 py-1 text-[11px] font-semibold text-slate-700 shadow-sm backdrop-blur-sm dark:border-white/10 dark:bg-white/5 dark:text-white">
          {course.duration} min
        </span>
      </div>
      <h3 className="text-lg font-semibold text-foreground">{course.title}</h3>
      <p className="text-sm text-muted-foreground">{course.summary}</p>
      <ProgressBar value={course.progress} label="Progression du cours" />
      <div className="flex items-center justify-between text-xs text-muted-foreground">
        <span>{course.duration} min</span>
        <span>{lessonCount} leçon{lessonCount > 1 ? 's' : ''}</span>
      </div>
      <span className="mt-auto text-sm font-semibold text-primary transition-colors group-hover:text-primary/80">
        Découvrir →
      </span>
    </Link>
  );
}
