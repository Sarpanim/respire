import Link from 'next/link';
import type { Route } from 'next';

import type { Lesson } from '@/types';

export type LessonCardProps = {
  lesson: Lesson;
  href: Route;
};

export function LessonCard({ lesson, href }: LessonCardProps) {
  return (
    <li className="lesson-card">
      <div className="lesson-card__body">
        <Link href={href} className="lesson-card__title">
          {lesson.title}
        </Link>
        {lesson.summary ? <p className="lesson-card__summary">{lesson.summary}</p> : null}
        {lesson.durationMinutes !== null ? (
          <span className="lesson-card__duration">{lesson.durationMinutes} minutes</span>
        ) : null}
      </div>
    </li>
  );
}
