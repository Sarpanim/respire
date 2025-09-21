import CourseCard from '@/components/CourseCard';
import CourseFilters from '@/components/CourseFilters';
import { PageShell } from '@/modules/shell';
import type { SectionDefinition } from '@/modules/shell';
import { courseCategories, courseLevels, courses } from '@/app/data/courses';

export default function CoursesPage({
  searchParams,
}: {
  searchParams?: { [key: string]: string | string[] | undefined };
}) {
  const rawCategory = typeof searchParams?.category === 'string' ? searchParams?.category : undefined;
  const rawLevel = typeof searchParams?.level === 'string' ? searchParams?.level : undefined;

  const category = courseCategories.some((item) => item.value === rawCategory) ? rawCategory : undefined;
  const level = courseLevels.includes(rawLevel as (typeof courseLevels)[number]) ? rawLevel : undefined;

  const filteredCourses = courses.filter((course) => {
    const matchesCategory = category ? course.category === category : true;
    const matchesLevel = level ? course.level === level : true;
    return matchesCategory && matchesLevel;
  });

  const sections: SectionDefinition[] = [
    {
      key: 'courses-hero',
      kind: 'hero',
      tone: 'plain',
      contentClassName: 'space-y-2',
      title: 'Catalogue de méditations',
      description:
        'Filtrez par catégorie et par niveau pour trouver la séance adaptée à votre état du moment.',
      descriptionClassName: 'text-sm leading-tight text-slate-300',
    },
    {
      key: 'courses-filters',
      kind: 'card',
      tone: 'plain',
      className: 'mt-8',
      content: <CourseFilters currentCategory={category} currentLevel={level} />,
    },
  ];

  if (filteredCourses.length > 0) {
    sections.push({
      key: 'courses-grid',
      kind: 'card',
      tone: 'plain',
      as: 'div',
      className: 'mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3',
      content: filteredCourses.map((course) => <CourseCard key={course.slug} course={course} />),
    });
  } else {
    sections.push({
      key: 'courses-empty',
      kind: 'card',
      tone: 'plain',
      as: 'p',
      className:
        'mt-8 rounded-xl border border-dashed border-slate-700 bg-slate-900/70 p-6 text-sm text-slate-300',
      content: 'Aucun cours ne correspond à votre recherche pour le moment. Essayez d’autres filtres.',
    });
  }

  return <PageShell sections={sections} />;
}
