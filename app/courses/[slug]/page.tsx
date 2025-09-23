import Link from 'next/link';
import { notFound } from 'next/navigation';
import AudioPlayer from '@/components/AudioPlayer';
import Badge from '@/components/Badge';
import { courseCategories, getCourseBySlug } from '@/app/data/courses';

export default function CourseDetailPage({ params }: { params: { slug: string } }) {
  const course = getCourseBySlug(params.slug);

  if (!course) {
    notFound();
  }

  const categoryLabel = courseCategories.find((item) => item.value === course.category)?.label ?? course.category;

  return (
    <article className="mx-auto flex max-w-3xl flex-col gap-6">
      <Link
        href="/courses"
        className="text-sm text-muted-foreground transition hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background"
      >
        ← Retour aux cours
      </Link>
      <div className="card space-y-4">
        <div className="flex flex-wrap items-center gap-2 text-xs uppercase tracking-widest text-muted-foreground">
          <Badge>{categoryLabel}</Badge>
          <Badge variant="outline">{course.level}</Badge>
          <span className="rounded-full bg-accent px-2 py-1 text-xs text-muted-foreground">{course.duration} min</span>
        </div>
        <h1 className="text-3xl font-semibold text-foreground">{course.title}</h1>
        <p className="text-sm leading-relaxed text-muted-foreground">{course.summary}</p>
      </div>
      <div className="card">
        <h2 className="text-lg font-semibold text-foreground">Séance audio</h2>
        <p className="mt-1 text-sm text-muted-foreground">
          Cette séance reprend automatiquement au bon endroit grâce à la sauvegarde locale de votre progression.
        </p>
        <div className="mt-4">
          <AudioPlayer slug={course.slug} src={course.audioUrl} />
        </div>
      </div>
    </article>
  );
}
