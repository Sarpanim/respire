import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import AudioPlayer from '@/components/AudioPlayer';
import Badge from '@/components/Badge';
import ProgressBar from '@/components/ProgressBar';
import { courseCategories, getCourseBySlug } from '@/app/data/courses';
import { courseCategoryTokens } from '@/lib/course-style-tokens';
import { cn } from '@/lib/utils';

export default function CourseDetailPage({ params }: { params: { slug: string } }) {
  const course = getCourseBySlug(params.slug);

  if (!course) {
    notFound();
  }

  const categoryLabel = courseCategories.find((item) => item.value === course.category)?.label ?? course.category;

  const styles = courseCategoryTokens[course.category];
  const lessonCount = course.sections.reduce((total, section) => total + section.lessons.length, 0);

  return (
    <article className="mx-auto flex w-full max-w-5xl flex-col gap-8">
      <Link
        href="/courses"
        className="text-sm text-muted-foreground transition hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background"
      >
        ← Retour aux cours
      </Link>
      <div className="card group overflow-hidden">
        <span
          aria-hidden
          className={cn(
            'pointer-events-none absolute inset-0 -z-10 bg-gradient-to-br opacity-70 transition-opacity duration-500 group-hover:opacity-90',
            styles.glow
          )}
        />
        <div className="grid gap-8 lg:grid-cols-[1.15fr_0.85fr]">
          <div className="space-y-4">
            <div className="flex flex-wrap items-center gap-2 text-xs uppercase tracking-widest text-muted-foreground">
              <Badge className={styles.badge}>{categoryLabel}</Badge>
              <Badge variant="outline">
                {course.level}
              </Badge>
              <span className="rounded-full border border-border/70 bg-muted/60 px-2 py-1 text-[11px] font-semibold text-muted-foreground shadow-sm backdrop-blur-sm dark:border-white/15 dark:bg-white/10 dark:text-white">
                {course.duration} min cumulés
              </span>
            </div>
            <h1 className="text-3xl font-semibold text-foreground lg:text-4xl">{course.title}</h1>
            <p className="text-sm leading-relaxed text-muted-foreground">{course.summary}</p>
            <ProgressBar value={course.progress} label="Progression du cours" className="max-w-md" />
            <div className="flex flex-wrap gap-4 text-xs font-medium uppercase tracking-widest text-muted-foreground">
              <span>{course.sections.length} section{course.sections.length > 1 ? 's' : ''}</span>
              <span>{lessonCount} leçon{lessonCount > 1 ? 's' : ''}</span>
            </div>
          </div>
          <div
            className="relative h-56 overflow-hidden rounded-2xl shadow-inner lg:h-full"
            style={{
              background: 'linear-gradient(135deg, hsl(var(--card-tint) / 0.24), hsl(var(--accent-gradient-to) / 0.18))',
            }}
          >
            <Image
              src={course.coverImage}
              alt={`Illustration du cours ${course.title}`}
              fill
              sizes="(min-width: 1024px) 480px, 100vw"
              className="object-cover"
              priority={false}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/35 via-slate-950/8 to-transparent" aria-hidden />
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-6">
        {course.sections.map((section) => (
          <section key={section.id} className="card space-y-6">
            <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
              <div className="space-y-3">
                <h2 className="text-2xl font-semibold text-foreground">{section.title}</h2>
                <p className="text-sm text-muted-foreground">{section.description}</p>
              </div>
              <div className="flex w-full flex-col gap-3 lg:max-w-xs">
                <ProgressBar value={section.progress} label="Progression de la section" />
                <div
                  className="relative h-32 overflow-hidden rounded-xl"
                  style={{
                    background:
                      'linear-gradient(135deg, hsl(var(--card-tint) / 0.2), hsl(var(--accent-gradient-to) / 0.15))',
                  }}
                >
                  <Image
                    src={section.image}
                    alt={`Illustration de la section ${section.title}`}
                    fill
                    sizes="(min-width: 1024px) 260px, 100vw"
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/30 via-slate-950/8 to-transparent" aria-hidden />
                </div>
              </div>
            </div>
            <div className="grid gap-4 md:grid-cols-2">
              {section.lessons.map((lesson) => (
                <article
                  key={lesson.id}
                  className="group flex h-full flex-col gap-4 rounded-2xl border border-border/70 bg-card/80 p-4 shadow-sm transition hover:border-primary/40 hover:shadow-lg"
                >
                  <div className="flex items-start gap-4">
                    <div
                      className="relative h-16 w-20 flex-shrink-0 overflow-hidden rounded-xl"
                      style={{
                        background:
                          'linear-gradient(135deg, hsl(var(--card-tint) / 0.24), hsl(var(--accent-gradient-to) / 0.18))',
                      }}
                    >
                      <Image
                        src={lesson.image}
                        alt={`Illustration de la leçon ${lesson.title}`}
                        fill
                        sizes="(min-width: 768px) 160px, 40vw"
                        className="object-cover"
                      />
                    </div>
                    <div className="space-y-1">
                      <h3 className="text-base font-semibold text-foreground">{lesson.title}</h3>
                      <p className="text-xs uppercase tracking-widest text-muted-foreground">
                        {lesson.duration} min · {Math.round(lesson.progress * 100)}%
                      </p>
                    </div>
                  </div>
                  <p className="flex-1 text-sm text-muted-foreground">{lesson.summary}</p>
                  <ProgressBar value={lesson.progress} label="Progression de la leçon" />
                  <AudioPlayer
                    progressKey={`${course.slug}:${section.id}:${lesson.id}`}
                    src={lesson.audioUrl}
                    ariaLabel={`Lecteur audio pour la leçon ${lesson.title}`}
                  />
                </article>
              ))}
            </div>
          </section>
        ))}
      </div>
    </article>
  );
}
