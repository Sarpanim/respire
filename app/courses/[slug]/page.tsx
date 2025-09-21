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
        className="text-sm text-slate-300 transition hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950"
      >
        ← Retour aux cours
      </Link>
      <div className="card space-y-4 bg-slate-900/70">
        <div className="flex flex-wrap items-center gap-2 text-xs uppercase tracking-widest text-slate-400">
          <Badge>{categoryLabel}</Badge>
          <Badge variant="outline">{course.level}</Badge>
          <span className="rounded-full bg-slate-800 px-2 py-1 text-xs text-slate-300">{course.duration} min</span>
        </div>
        <h1 className="text-3xl font-semibold text-white">{course.title}</h1>
        <p className="text-sm leading-relaxed text-slate-300">{course.summary}</p>
      </div>
      <div className="card bg-slate-900/70">
        <h2 className="text-lg font-semibold text-white">Séance audio</h2>
        <p className="mt-1 text-sm text-slate-300">
          Cette séance reprend automatiquement au bon endroit grâce à la sauvegarde locale de votre progression.
        </p>
        <div className="mt-4">
          <AudioPlayer slug={course.slug} src={course.audioUrl} />
        </div>
      </div>
    </article>
  );
}
