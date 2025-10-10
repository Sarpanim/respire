import Link from 'next/link';
import type { Metadata } from 'next';
import type { Route } from 'next';

import { listCourses } from '@/lib/db/courses';

export const metadata: Metadata = {
  title: 'Courses',
  description: 'Browse the courses available in the Respire starter.',
};

export default async function CoursesPage() {
  const courses = await listCourses();

  if (!courses.length) {
    return (
      <section className="surface-card">
        <h1>Courses</h1>
        <p className="card-description">
          There are no courses yet. Use the Supabase dashboard or admin tools to create your first course.
        </p>
      </section>
    );
  }

  return (
    <section className="grid">
      {courses.map((course) => {
        const href = `/courses/${course.slug}` as Route;

        return (
          <article key={course.id} className="surface-card">
            <h2 className="card-title">{course.title}</h2>
            {course.description ? <p className="card-description">{course.description}</p> : null}

            <dl style={{ display: 'grid', gap: '0.35rem', margin: '1.25rem 0' }}>
              {course.totalDurationMinutes !== null ? (
                <div>
                  <dt style={{ fontSize: '0.8rem', textTransform: 'uppercase', color: 'var(--muted)' }}>
                    Total duration
                  </dt>
                  <dd style={{ margin: 0 }}>{course.totalDurationMinutes} min</dd>
                </div>
              ) : null}

              {course.ratingAverage !== null && course.ratingCount !== null ? (
                <div>
                  <dt style={{ fontSize: '0.8rem', textTransform: 'uppercase', color: 'var(--muted)' }}>
                    Rating
                  </dt>
                  <dd style={{ margin: 0 }}>
                    {course.ratingAverage.toFixed(1)} / 5 · {course.ratingCount} reviews
                  </dd>
                </div>
              ) : null}
            </dl>

            <Link className="button button--primary" href={href}>
              View course
            </Link>
          </article>
        );
      })}
    </section>
  );
}
