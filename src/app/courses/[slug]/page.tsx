import Link from 'next/link';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import type { Route } from 'next';

import { CoursePlayer } from '@/components/courses/CoursePlayer';
import { LessonCard } from '@/components/courses/LessonCard';
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
  const firstLesson = resolvedCourse.lessons[0] ?? null;
  const actionHref = firstLesson ? (`/courses/lessons/${firstLesson.id}` as Route) : null;

  return (
    <div className="stack">
      <Link href={'/courses' as Route} className="back-link">
        ← Back to courses
      </Link>

      <CoursePlayer
        course={resolvedCourse}
        actions={
          actionHref ? (
            <Link className="button button--primary" href={actionHref}>
              Start first lesson
            </Link>
          ) : undefined
        }
      >
        <section className="course-lessons">
          <header>
            <h2 className="card-title">Lessons</h2>
            <p className="card-description">
              Explore each lesson to dive deeper into the course material.
            </p>
          </header>

          {!resolvedCourse.lessons.length ? (
            <p className="card-description">No lessons yet. Add a lesson to start building this course.</p>
          ) : (
            <ol>
              {resolvedCourse.lessons.map((lesson) => {
                const href = `/courses/lessons/${lesson.id}` as Route;
                return <LessonCard key={lesson.id} lesson={lesson} href={href} />;
              })}
            </ol>
          )}
        </section>
      </CoursePlayer>
    </div>
  );
}
