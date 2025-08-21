'use client';

import type { InferType } from 'yup';

import { Container, Heading, ListItem, Loading } from '@/components';
import { useCourses, useCreateQuery } from '@/hooks';
import type { courseSchema } from '@/yup';

import { NewCourse } from './components';

type CourseSchemaInferType = InferType<typeof courseSchema>;

export default function CoursesPage() {
  const { listCourses } = useCourses();

  const { data, isLoading } = useCreateQuery<CourseSchemaInferType[]>({
    queryKey: ['cursos'],
    queryFn: listCourses,
  });

  const isEmptyCourse = data && data.length === 0 && !isLoading;

  if (isLoading) {
    return <Loading />;
  }

  if (isEmptyCourse) {
    return (
      <Container className="flex flex-col items-center justify-center gap-2">
        <Heading as="h2">Nenhum curso foi cadastrado!</Heading>
        <NewCourse />
      </Container>
    );
  }

  return (
    <Container className="flex flex-col gap-[16px]">
      <Heading>Cursos</Heading>

      {data?.map((course) => (
        <ListItem.course
          key={course.id}
          courseNumber={course.courseNumber}
          endDate={course.endDate}
          startDate={course.startDate}
          href={`/courses/${course.courseNumber}/${course.typeOfCourse.toLocaleLowerCase()}?courseId=${course.id}`}
        />
      ))}

      <NewCourse />
    </Container>
  );
}
