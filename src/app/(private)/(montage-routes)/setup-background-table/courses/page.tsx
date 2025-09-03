'use client';

import type { InferType } from 'yup';

import { Container, Heading, ListItem, Loading } from '@/components';
import { useCourses, useCreateQuery } from '@/hooks';
import type { courseSchema } from '@/yup';

type CourseSchemaInferType = InferType<typeof courseSchema>;

export default function SetupBackgroundTablePage() {
  const { listCourses } = useCourses();

  const { data, isLoading } = useCreateQuery<CourseSchemaInferType[]>({
    queryKey: ['cursos'],
    queryFn: listCourses,
  });

  if (isLoading) {
    return <Loading />;
  }

  return (
    <Container className="flex flex-col gap-[16px]">
      <Heading>Montagem</Heading>
      {data?.map((course) => (
        <ListItem.course
          key={course.id}
          courseNumber={course.courseNumber}
          href={`/setup-background-table/montage/${course.courseNumber}`}
        />
      ))}
    </Container>
  );
}
