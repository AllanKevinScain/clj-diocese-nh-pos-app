'use client';

import type { InferType } from 'yup';

import { Container, Empty, Heading, ListItem, Loading } from '@/components';
import { useCourses, useCreateQuery } from '@/hooks';
import type { courseSchema } from '@/yup';

type CourseSchemaInferType = InferType<typeof courseSchema>;

export default function SetupBackgroundTablePage() {
  const { listCourses } = useCourses();

  const { data, isLoading } = useCreateQuery<CourseSchemaInferType[]>({
    queryKey: ['cursos'],
    queryFn: listCourses,
  });
  const noResults = data?.length === 0;

  if (isLoading) {
    return <Loading />;
  }

  return (
    <Container className="flex flex-col gap-[16px]">
      {!noResults && <Heading>Montagem</Heading>}
      {data?.map((course) => (
        <ListItem.course
          key={course.id}
          courseNumber={course.courseNumber}
          href={`/setup-background-table/montage/${course.courseNumber}`}
        />
      ))}

      {noResults && <Empty className="h-[50vh]" title="Nenhum curso cadastrado" />}
    </Container>
  );
}
