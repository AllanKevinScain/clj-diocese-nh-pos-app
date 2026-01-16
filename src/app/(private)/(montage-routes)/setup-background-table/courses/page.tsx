'use client';

import { useQuery } from '@tanstack/react-query';
import type { InferType } from 'yup';

import { Container, Empty, Heading, ListItem, Loading } from '@/components';
import { useCourses } from '@/hooks';
import type { courseSchema } from '@/yup';

type CourseSchemaInferType = InferType<typeof courseSchema>;

export default function SetupBackgroundTablePage() {
  const { listCourses } = useCourses();

  const { data, isLoading } = useQuery<CourseSchemaInferType[]>({
    queryKey: ['cursos'],
    queryFn: listCourses,
  });
  const noResults = data?.length === 0;

  if (isLoading) return <Loading />;

  return (
    <Container className="flex flex-col gap-[16px]">
      {!noResults && <Heading>Montagem</Heading>}

      {data?.map((course) => {
        const endDate = new Date(course.endDate);
        const now = new Date();
        const disabled = now > endDate;

        return (
          <ListItem.course
            key={course.id}
            courseNumber={course.courseNumber}
            href={`/setup-background-table/montage/${course.id}`}
            disabled={disabled}
            {...course}
          />
        );
      })}

      {noResults && <Empty className="h-[50vh]" title="Nenhum curso cadastrado" />}
    </Container>
  );
}
