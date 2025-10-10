import Link from 'next/link';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import type { Route } from 'next';

import { getCourseBySlug } from '@/lib/db/courses';

export type CoursePageProps = {
  params: { slug: string };
};

export async function generateMetadata({ params }: CoursePageProps): Promise<Metadata> {
  const course = await getCourseBySlug(params.slug);

  if (!course) {
    return { title: 'Course not found' };
  }

  return {
    title: `${course.title} · Course`,
    description: course.description ?? undefined,
  };
}

export default async function CourseDetailPage({ params }: CoursePageProps) {
  const course = await getCourseBySlug(params.slug);

  if (!course) {
    notFound();
  }

  const resolvedCourse = course;
  const totalMinutes = resolvedCourse.totalDurationMinutes;
  const hasRating = resolvedCourse.ratingAverage !== null && resolvedCourse.ratingCount !== null;

  return (
    <div className="grid" style={{ gap: '1.5rem' }}>
      <section className="surface-card">
        <Link href={'/courses' as Route} className="card-description" style={{ display: 'inline-flex', gap: '0.35rem' }}>
          ← Back to courses
        </Link>

        <h1 style={{ marginTop: '1rem' }}>{resolvedCourse.title}</h1>
        {resolvedCourse.description ? <p className="card-description">{resolvedCourse.description}</p> : null}

        <dl style={{ display: 'grid', gap: '0.75rem', marginTop: '2rem' }}>
          {totalMinutes !== null ? (
            <div>
              <dt style={{ fontSize: '0.8rem', textTransform: 'uppercase', color: 'var(--muted)' }}>Total duration</dt>
              <dd style={{ margin: 0 }}>{totalMinutes} minutes</dd>
            </div>
          ) : null}

          {hasRating ? (
            <div>
              <dt style={{ fontSize: '0.8rem', textTransform: 'uppercase', color: 'var(--muted)' }}>Rating</dt>
              <dd style={{ margin: 0 }}>
                {resolvedCourse.ratingAverage?.toFixed(1)} / 5 · {resolvedCourse.ratingCount} reviews
              </dd>
            </div>
          ) : null}
        </dl>
      </section>

      <section className="surface-card">
        <h2 className="card-title">Lessons</h2>

        {!resolvedCourse.lessons.length ? (
          <p className="card-description">No lessons yet. Add a lesson to start building this course.</p>
        ) : (
          <ol style={{ display: 'grid', gap: '1rem', paddingLeft: '1rem' }}>
            {resolvedCourse.lessons.map((lesson) => {
              const href = `/courses/lessons/${lesson.id}` as Route;

              return (
                <li key={lesson.id} style={{ listStyle: 'decimal' }}>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
                    <Link href={href} className="card-title" style={{ fontSize: '1rem' }}>
                      {lesson.title}
                    </Link>
                    {lesson.summary ? <p className="card-description">{lesson.summary}</p> : null}
                    {lesson.durationMinutes !== null ? (
                      <span style={{ fontSize: '0.85rem', color: 'var(--muted)' }}>
                        {lesson.durationMinutes} minutes
                      </span>
                    ) : null}
                  </div>
                </li>
              );
            })}
          </ol>
        )}
      </section>
    </div>
  );
}
