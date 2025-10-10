import Image from 'next/image';
import type { ReactNode } from 'react';

import type { Course } from '@/types';

export type CoursePlayerProps = {
  course: Course;
  actions?: ReactNode;
  children?: ReactNode;
};

export function CoursePlayer({ course, actions, children }: CoursePlayerProps) {
  return (
    <section className="surface-card course-player">
      <div className="course-player__header">
        <div className="course-player__cover">
          {course.coverImageUrl ? (
            <Image
              src={course.coverImageUrl}
              alt={course.title}
              fill
              sizes="(min-width: 768px) 320px, 100vw"
              unoptimized
            />
          ) : (
            <div className="course-player__placeholder" aria-hidden />
          )}
        </div>
        <div className="course-player__info">
          <h1>{course.title}</h1>
          {course.description ? <p className="card-description">{course.description}</p> : null}

          <dl className="course-player__meta">
            {course.totalDurationMinutes !== null ? (
              <div>
                <dt>Total duration</dt>
                <dd>{course.totalDurationMinutes} minutes</dd>
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

          {actions ? <div className="course-player__actions">{actions}</div> : null}
        </div>
      </div>

      {children ? <div className="course-player__content">{children}</div> : null}
    </section>
  );
}
