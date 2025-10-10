export const locales = ['en', 'fr'] as const;
export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = 'en';

export type Course = {
  id: string;
  slug: string;
  title: string;
  description: string | null;
  coverImageUrl: string | null;
  level: string | null;
  ratingAverage: number | null;
  ratingCount: number | null;
  totalDurationMinutes: number | null;
  createdAt: string;
  updatedAt: string | null;
};

export type Lesson = {
  id: string;
  courseId: string;
  title: string;
  summary: string | null;
  content: string | null;
  durationMinutes: number | null;
  videoUrl: string | null;
  position: number | null;
  createdAt: string;
  updatedAt: string | null;
};

export type CourseWithLessons = Course & { lessons: Lesson[] };
