import { createServerSupabase } from '@/lib/supabase/server';
import type { Course, CourseWithLessons, Lesson } from '@/types';

const COURSE_FIELDS = `
  id,
  slug,
  title,
  description,
  cover_image_url,
  level,
  rating_average,
  rating_count,
  total_duration_minutes,
  created_at,
  updated_at
`;

const LESSON_FIELDS = `
  id,
  course_id,
  title,
  summary,
  content,
  duration_minutes,
  video_url,
  position,
  created_at,
  updated_at
`;

type CourseRow = {
  id: string;
  slug: string;
  title: string;
  description: string | null;
  cover_image_url: string | null;
  level: string | null;
  rating_average: number | null;
  rating_count: number | null;
  total_duration_minutes: number | null;
  created_at: string;
  updated_at: string | null;
  lessons?: LessonRow[] | null;
};

type LessonRow = {
  id: string;
  course_id: string;
  title: string;
  summary: string | null;
  content: string | null;
  duration_minutes: number | null;
  video_url: string | null;
  position: number | null;
  created_at: string;
  updated_at: string | null;
};

export type CourseInsert = {
  slug: string;
  title: string;
  description?: string | null;
  coverImageUrl?: string | null;
  level?: string | null;
  ratingAverage?: number | null;
  ratingCount?: number | null;
  totalDurationMinutes?: number | null;
};

export type CourseUpdate = Partial<{
  slug: string;
  title: string;
  description: string | null;
  coverImageUrl: string | null;
  level: string | null;
  ratingAverage: number | null;
  ratingCount: number | null;
  totalDurationMinutes: number | null;
}>;

const mapLesson = (row: LessonRow): Lesson => ({
  id: row.id,
  courseId: row.course_id,
  title: row.title,
  summary: row.summary,
  content: row.content,
  durationMinutes: row.duration_minutes,
  videoUrl: row.video_url,
  position: row.position,
  createdAt: row.created_at,
  updatedAt: row.updated_at,
});

const mapCourse = (row: CourseRow): Course => ({
  id: row.id,
  slug: row.slug,
  title: row.title,
  description: row.description,
  coverImageUrl: row.cover_image_url,
  level: row.level,
  ratingAverage: row.rating_average,
  ratingCount: row.rating_count,
  totalDurationMinutes: row.total_duration_minutes,
  createdAt: row.created_at,
  updatedAt: row.updated_at,
});

const mapCourseWithLessons = (row: CourseRow): CourseWithLessons => ({
  ...mapCourse(row),
  lessons: (row.lessons ?? []).map(mapLesson),
});

export async function listCourses(): Promise<Course[]> {
  const supabase = createServerSupabase();
  const { data, error } = await supabase
    .from('courses')
    .select(COURSE_FIELDS)
    .order('title', { ascending: true });

  if (error) {
    throw new Error(`Failed to list courses: ${error.message}`);
  }

  return (data ?? []).map((row) => mapCourse(row as CourseRow));
}

export async function getCourseBySlug(slug: string): Promise<CourseWithLessons | null> {
  const supabase = createServerSupabase();
  const { data, error } = await supabase
    .from('courses')
    .select(`${COURSE_FIELDS}, lessons (${LESSON_FIELDS})`)
    .eq('slug', slug)
    .maybeSingle();

  if (error) {
    throw new Error(`Failed to fetch course: ${error.message}`);
  }

  if (!data) {
    return null;
  }

  return mapCourseWithLessons(data as CourseRow);
}

export async function getCourseById(id: string): Promise<CourseWithLessons | null> {
  const supabase = createServerSupabase();
  const { data, error } = await supabase
    .from('courses')
    .select(`${COURSE_FIELDS}, lessons (${LESSON_FIELDS})`)
    .eq('id', id)
    .maybeSingle();

  if (error) {
    throw new Error(`Failed to fetch course: ${error.message}`);
  }

  if (!data) {
    return null;
  }

  return mapCourseWithLessons(data as CourseRow);
}

export async function createCourse(payload: CourseInsert): Promise<Course> {
  const supabase = createServerSupabase();
  const { data, error } = await supabase
    .from('courses')
    .insert({
      slug: payload.slug,
      title: payload.title,
      description: payload.description ?? null,
      cover_image_url: payload.coverImageUrl ?? null,
      level: payload.level ?? null,
      rating_average: payload.ratingAverage ?? null,
      rating_count: payload.ratingCount ?? null,
      total_duration_minutes: payload.totalDurationMinutes ?? null,
    })
    .select(COURSE_FIELDS)
    .single();

  if (error) {
    throw new Error(`Failed to create course: ${error.message}`);
  }

  return mapCourse(data as CourseRow);
}

export async function updateCourse(id: string, updates: CourseUpdate): Promise<Course> {
  const supabase = createServerSupabase();
  const payload: Record<string, unknown> = {};

  if ('slug' in updates) {
    payload.slug = updates.slug;
  }

  if ('title' in updates) {
    payload.title = updates.title;
  }

  if ('description' in updates) {
    payload.description = updates.description;
  }

  if ('coverImageUrl' in updates) {
    payload.cover_image_url = updates.coverImageUrl;
  }

  if ('level' in updates) {
    payload.level = updates.level;
  }

  if ('ratingAverage' in updates) {
    payload.rating_average = updates.ratingAverage;
  }

  if ('ratingCount' in updates) {
    payload.rating_count = updates.ratingCount;
  }

  if ('totalDurationMinutes' in updates) {
    payload.total_duration_minutes = updates.totalDurationMinutes;
  }

  const { data, error } = await supabase
    .from('courses')
    .update(payload)
    .eq('id', id)
    .select(COURSE_FIELDS)
    .single();

  if (error) {
    throw new Error(`Failed to update course: ${error.message}`);
  }

  return mapCourse(data as CourseRow);
}

export async function deleteCourse(id: string): Promise<void> {
  const supabase = createServerSupabase();
  const { error } = await supabase.from('courses').delete().eq('id', id);

  if (error) {
    throw new Error(`Failed to delete course: ${error.message}`);
  }
}

