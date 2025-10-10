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
    <div className="stack">
      <Link href={courseHref} className="back-link">
        ← Back to course
      </Link>

      <article className="surface-card lesson-detail">
        <header className="lesson-detail__header">
          <p className="lesson-card__duration">Lesson {resolvedLesson.position ?? '—'}</p>
          <h1>{resolvedLesson.title}</h1>
        </header>

        {resolvedLesson.summary ? <p className="card-description">{resolvedLesson.summary}</p> : null}

        {resolvedLesson.durationMinutes !== null ? (
          <p className="lesson-card__duration">Estimated duration: {resolvedLesson.durationMinutes} minutes</p>
        ) : null}

        {resolvedLesson.content ? (
          <div className="lesson-detail__content">
            {resolvedLesson.content.split('\n\n').map((paragraph, index) => (
              <p key={index}>
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
    </div>
  );
}
