import CourseCard from '@/components/CourseCard';
import CourseFilters from '@/components/CourseFilters';
import { PageShell } from '@/modules/shell';
import type { RenderableSection } from '@/modules/shell';
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

  const sections: RenderableSection[] = [
    {
      key: 'courses-heading',
      as: 'section',
      className: 'space-y-2',
      children: (
        <>
          <h1 className="text-3xl font-semibold text-white">Catalogue de méditations</h1>
          <p className="text-sm text-slate-300">
            Filtrez par catégorie et par niveau pour trouver la séance adaptée à votre état du moment.
          </p>
        </>
      ),
    },
    {
      key: 'courses-filters',
      as: 'div',
      className: 'mt-8',
      children: <CourseFilters currentCategory={category} currentLevel={level} />,
    },
  ];

  if (filteredCourses.length > 0) {
    sections.push({
      key: 'courses-grid',
      as: 'div',
      className: 'mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3',
      children: filteredCourses.map((course) => <CourseCard key={course.slug} course={course} />),
    });
  } else {
    sections.push({
      key: 'courses-empty',
      as: 'p',
      className:
        'mt-8 rounded-xl border border-dashed border-slate-700 bg-slate-900/70 p-6 text-sm text-slate-300',
      children: 'Aucun cours ne correspond à votre recherche pour le moment. Essayez d’autres filtres.',
    });
  }

  return <PageShell sections={sections} />;
}
