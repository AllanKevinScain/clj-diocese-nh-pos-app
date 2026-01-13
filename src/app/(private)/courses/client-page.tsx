'use client';

import { useQuery } from '@tanstack/react-query';
import { isEmpty } from 'lodash';
import { useMemo } from 'react';
import { useForm, useWatch } from 'react-hook-form';
import { FaSearch } from 'react-icons/fa';

import { Button, Container, FieldDefault, Heading, ListItem, Loading, Text } from '@/components';
import { useCourses } from '@/hooks';
import type { LoginType } from '@/types';
import type { CourseInferType } from '@/yup';

import { NewCourse } from './components';

interface CoursesClientPageInterface {
  loginType: LoginType;
}

export function CoursesClientPage(props: CoursesClientPageInterface) {
  const { loginType } = props;
  const { listCourses } = useCourses();

  const { control } = useForm({
    defaultValues: {
      search: '',
    },
  });

  const search = useWatch({ control, name: 'search' });

  const { data, isLoading, refetch } = useQuery<CourseInferType[]>({
    queryKey: ['cursos'],
    queryFn: listCourses,
  });

  const filteredCourses = useMemo(() => {
    if (data && !isEmpty(search)) {
      return data.filter(
        (user) =>
          user.courseNumber?.toLowerCase().includes(search.toLowerCase()) ||
          user.typeOfCourse?.toLowerCase().includes(search.toLowerCase()),
      );
    }
    return data;
  }, [data, search]);
  const isEmptyCourse = filteredCourses?.length === 0 && !isLoading;

  if (isLoading) return <Loading />;

  return (
    <Container className="flex flex-col gap-[16px]">
      <div className="flex flex-col gap-[8px]">
        <div className="flex justify-between">
          <Heading>Cursos</Heading>
          <NewCourse />
        </div>
        <div className="flex w-full">
          <FieldDefault id="search" control={control} className="rounded-e-none" />
          <Button className="w-[40px] rounded-s-none" onClick={() => refetch()}>
            <FaSearch size={20} />
          </Button>
        </div>
      </div>

      {isEmptyCourse && <Text className="text-center">Nenhum curso foi cadastrado!</Text>}

      {!isEmptyCourse &&
        filteredCourses?.map((course) => {
          function url() {
            if (loginType === 'admin') {
              return `/courses/${course.courseNumber}/${course.typeOfCourse.toLocaleLowerCase()}?courseId=${course.id}`;
            }
            return `/courses/${course.courseNumber}/${course.typeOfCourse.toLocaleLowerCase()}`;
          }
          const endDate = new Date(course.endDate);
          const now = new Date();
          const disabled = now > endDate;

          return (
            <ListItem.course
              key={course.id}
              href={url()}
              disabled={loginType === 'builder-manager' || disabled}
              {...course}
            />
          );
        })}
    </Container>
  );
}
