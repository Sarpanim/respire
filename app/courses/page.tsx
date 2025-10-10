import CourseCard from '@/components/CourseCard';
import CourseFilters from '@/components/CourseFilters';
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

  return (
    <section className="space-y-8">
      <div className="space-y-2">
        <h1 className="text-3xl font-semibold text-foreground">Catalogue de méditations</h1>
        <p className="text-sm text-muted-foreground">
          Filtrez par catégorie et par niveau pour trouver la séance adaptée à votre état du moment.
        </p>
      </div>
      <CourseFilters currentCategory={category} currentLevel={level} />
      {filteredCourses.length > 0 ? (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filteredCourses.map((course) => (
            <CourseCard key={course.slug} course={course} />
          ))}
        </div>
      ) : (
        <p className="rounded-xl border border-dashed border-border bg-card/70 p-6 text-sm text-muted-foreground">
          Aucun cours ne correspond à votre recherche pour le moment. Essayez d’autres filtres.
        </p>
      )}
    </section>
  );
}
