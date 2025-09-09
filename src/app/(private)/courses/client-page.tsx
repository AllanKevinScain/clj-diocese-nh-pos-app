'use client';

import type { InferType } from 'yup';

import { Container, Heading, ListItem, Loading } from '@/components';
import { useCourses, useCreateQuery } from '@/hooks';
import type { LoginType } from '@/types';
import type { courseSchema } from '@/yup';

import { NewCourse } from './components';

type CourseSchemaInferType = InferType<typeof courseSchema>;

interface CoursesClientPageInterface {
  loginType: LoginType;
}

export function CoursesClientPage(props: CoursesClientPageInterface) {
  const { loginType } = props;
  const { listCourses } = useCourses();

  const { data, isLoading } = useCreateQuery<CourseSchemaInferType[]>({
    queryKey: ['cursos'],
    queryFn: listCourses,
  });

  const isEmptyCourse = data && data.length === 0 && !isLoading;

  if (isLoading) return <Loading />;

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

      {data?.map((course) => {
        function url() {
          if (loginType === 'admin') {
            return `/courses/${course.courseNumber}/${course.typeOfCourse.toLocaleLowerCase()}?courseId=${course.id}`;
          }
          return `/courses/${course.courseNumber}/${course.typeOfCourse.toLocaleLowerCase()}`;
        }

        return (
          <ListItem.course
            key={course.id}
            courseNumber={course.courseNumber}
            endDate={course.endDate}
            startDate={course.startDate}
            href={url()}
            disabled={loginType === 'builder-manager'}
          />
        );
      })}

      <NewCourse />
    </Container>
  );
}
