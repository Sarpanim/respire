import Link from 'next/link';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import type { Route } from 'next';

import { getCourseById } from '@/lib/db/courses';
import { getLessonById } from '@/lib/db/lessons';

export type LessonPageProps = {
  params: { id: string };
};

export async function generateMetadata({ params }: LessonPageProps): Promise<Metadata> {
  const lesson = await getLessonById(params.id);

  if (!lesson) {
    return { title: 'Lesson not found' };
  }

  return {
    title: `${lesson.title} · Lesson`,
    description: lesson.summary ?? undefined,
  };
}

export default async function LessonDetailPage({ params }: LessonPageProps) {
  const lesson = await getLessonById(params.id);

  if (!lesson) {
    notFound();
  }

  const resolvedLesson = lesson;
  const course = await getCourseById(resolvedLesson.courseId);
  const courseHref = (course ? `/courses/${course.slug}` : '/courses') as Route;

  return (
    <article className="surface-card" style={{ display: 'grid', gap: '1rem' }}>
      <Link href={courseHref} className="card-description" style={{ display: 'inline-flex', gap: '0.35rem' }}>
        ← Back to course
      </Link>

      <header>
        <p style={{ fontSize: '0.85rem', color: 'var(--muted)', marginBottom: '0.35rem' }}>
          Lesson {resolvedLesson.position ?? '—'}
        </p>
        <h1 style={{ margin: 0 }}>{resolvedLesson.title}</h1>
      </header>

      {resolvedLesson.summary ? <p className="card-description">{resolvedLesson.summary}</p> : null}

      {resolvedLesson.durationMinutes !== null ? (
        <p style={{ fontSize: '0.9rem', color: 'var(--muted)' }}>
          Estimated duration: {resolvedLesson.durationMinutes} minutes
        </p>
      ) : null}

      {resolvedLesson.content ? (
        <div style={{ display: 'grid', gap: '0.75rem', lineHeight: 1.7 }}>
          {resolvedLesson.content.split('\n\n').map((paragraph, index) => (
            <p key={index} style={{ margin: 0 }}>
              {paragraph}
            </p>
          ))}
        </div>
      ) : null}

      {resolvedLesson.videoUrl ? (
        <a className="button button--primary" href={resolvedLesson.videoUrl} target="_blank" rel="noreferrer">
          Open resource
        </a>
      ) : null}
    </article>
  );
}
