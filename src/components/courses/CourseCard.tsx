import Image from 'next/image';
import Link from 'next/link';
import type { Route } from 'next';

import type { Course } from '@/types';

export type CourseCardProps = {
  course: Course;
  href: Route;
};

export function CourseCard({ course, href }: CourseCardProps) {
  return (
    <article className="surface-card course-card">
      {course.coverImageUrl ? (
        <div className="course-card__media">
          <Image
            src={course.coverImageUrl}
            alt={course.title}
            fill
            sizes="(min-width: 768px) 50vw, 100vw"
            unoptimized
          />
        </div>
      ) : null}

      <div className="course-card__body">
        <div className="course-card__header">
          <h2 className="card-title">{course.title}</h2>
          {course.level ? <span className="course-card__level">{course.level}</span> : null}
        </div>

        {course.description ? <p className="card-description">{course.description}</p> : null}

        <dl className="course-card__meta">
          {course.totalDurationMinutes !== null ? (
            <div>
              <dt>Total duration</dt>
              <dd>{course.totalDurationMinutes} min</dd>
            </div>
          ) : null}

          {course.ratingAverage !== null && course.ratingCount !== null ? (
            <div>
              <dt>Rating</dt>
              <dd>
                {course.ratingAverage.toFixed(1)} / 5 · {course.ratingCount} reviews
              </dd>
            </div>
          ) : null}
        </dl>
      </div>

      <footer className="course-card__footer">
        <Link className="button button--primary" href={href}>
          View course
        </Link>
      </footer>
    </article>
  );
}
