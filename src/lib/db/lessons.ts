import { createServerSupabase } from '@/lib/supabase/server';
import type { Lesson } from '@/types';

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

export type LessonInsert = {
  courseId: string;
  title: string;
  summary?: string | null;
  content?: string | null;
  durationMinutes?: number | null;
  videoUrl?: string | null;
  position?: number | null;
};

export type LessonUpdate = Partial<{
  title: string;
  summary: string | null;
  content: string | null;
  durationMinutes: number | null;
  videoUrl: string | null;
  position: number | null;
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

export async function listLessonsByCourse(courseId: string): Promise<Lesson[]> {
  const supabase = createServerSupabase();
  const { data, error } = await supabase
    .from('lessons')
    .select(LESSON_FIELDS)
    .eq('course_id', courseId)
    .order('position', { ascending: true });

  if (error) {
    throw new Error(`Failed to list lessons: ${error.message}`);
  }

  return (data ?? []).map((row) => mapLesson(row as LessonRow));
}

export async function getLessonById(id: string): Promise<Lesson | null> {
  const supabase = createServerSupabase();
  const { data, error } = await supabase
    .from('lessons')
    .select(LESSON_FIELDS)
    .eq('id', id)
    .maybeSingle();

  if (error) {
    throw new Error(`Failed to fetch lesson: ${error.message}`);
  }

  if (!data) {
    return null;
  }

  return mapLesson(data as LessonRow);
}

export async function createLesson(payload: LessonInsert): Promise<Lesson> {
  const supabase = createServerSupabase();
  const { data, error } = await supabase
    .from('lessons')
    .insert({
      course_id: payload.courseId,
      title: payload.title,
      summary: payload.summary ?? null,
      content: payload.content ?? null,
      duration_minutes: payload.durationMinutes ?? null,
      video_url: payload.videoUrl ?? null,
      position: payload.position ?? null,
    })
    .select(LESSON_FIELDS)
    .single();

  if (error) {
    throw new Error(`Failed to create lesson: ${error.message}`);
  }

  return mapLesson(data as LessonRow);
}

export async function updateLesson(id: string, updates: LessonUpdate): Promise<Lesson> {
  const supabase = createServerSupabase();
  const payload: Record<string, unknown> = {};

  if ('title' in updates) {
    payload.title = updates.title;
  }

  if ('summary' in updates) {
    payload.summary = updates.summary;
  }

  if ('content' in updates) {
    payload.content = updates.content;
  }

  if ('durationMinutes' in updates) {
    payload.duration_minutes = updates.durationMinutes;
  }

  if ('videoUrl' in updates) {
    payload.video_url = updates.videoUrl;
  }

  if ('position' in updates) {
    payload.position = updates.position;
  }

  const { data, error } = await supabase
    .from('lessons')
    .update(payload)
    .eq('id', id)
    .select(LESSON_FIELDS)
    .single();

  if (error) {
    throw new Error(`Failed to update lesson: ${error.message}`);
  }

  return mapLesson(data as LessonRow);
}

export async function deleteLesson(id: string): Promise<void> {
  const supabase = createServerSupabase();
  const { error } = await supabase.from('lessons').delete().eq('id', id);

  if (error) {
    throw new Error(`Failed to delete lesson: ${error.message}`);
  }
}

