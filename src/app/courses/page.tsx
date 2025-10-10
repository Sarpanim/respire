import type { Metadata } from 'next';
import type { Route } from 'next';

import { CourseCard } from '@/components/courses/CourseCard';
import { CourseNavigation } from '@/components/courses/CourseNavigation';
import { listCourses } from '@/lib/db/courses';

export const metadata: Metadata = {
  title: 'Courses',
  description: 'Browse the courses available in the Respire starter.',
};

const navigationItems = [
  { label: 'All courses', href: '/courses' },
  { label: 'My learning', href: '/courses?view=my-learning' },
  { label: 'Saved', href: '/courses?view=saved' },
];

export default async function CoursesPage() {
  const courses = await listCourses();

  return (
    <div className="stack">
      <CourseNavigation items={navigationItems} activeHref="/courses" />

      {!courses.length ? (
        <section className="surface-card">
          <h1>Courses</h1>
          <p className="card-description">
            There are no courses yet. Use the Supabase dashboard or admin tools to create your first course.
          </p>
        </section>
      ) : (
        <section className="course-grid">
          {courses.map((course) => {
            const href = `/courses/${course.slug}` as Route;
            return <CourseCard key={course.id} course={course} href={href} />;
          })}
        </section>
      )}
    </div>
  );
}
