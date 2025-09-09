'use client';

import React from 'react';
import toast from 'react-hot-toast';

import { Container } from '@/components';
import { useCreateQuery, useListRecords } from '@/hooks';
import type { ListRecordsType } from '@/types/list-records.type';

import { ListRecords } from '../components';
import { CoursesBottomBar } from '../components/courses-bottom-bar';

interface CourseClientPageInterface {
  courseNumber: string;
  courseId?: string;
}

export const CourseClientPage = (props: CourseClientPageInterface) => {
  const { courseNumber, courseId } = props;
  const { listRecordsByCourseNumber } = useListRecords();

  const { data, isLoading, isFetching } = useCreateQuery<ListRecordsType[]>({
    queryKey: ['listRecordsPosl', courseNumber],
    queryFn: () => listRecordsByCourseNumber(courseNumber),
    onError: (error) => {
      toast.error(String(error.data?.message));
    },
  });

  return (
    <Container>
      <CoursesBottomBar courseId={courseId} />
      <ListRecords records={data} courseNumber={courseNumber} loading={isLoading || isFetching} />
    </Container>
  );
};
