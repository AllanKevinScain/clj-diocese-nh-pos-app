'use client';

import React from 'react';
import toast from 'react-hot-toast';

import { Container } from '@/components';
import { useCreateQuery, useListRecords } from '@/hooks';
import type { CompleteRecordInterface, FilterRecordsType } from '@/types';

import { ListRecords } from '../components';
import { CoursesBottomBar } from '../components/courses-bottom-bar';

type CutCompleteRecordType = Pick<CompleteRecordInterface, 'courseNumber' | 'typeOfRecord'>;

interface CourseClientPageInterface extends CutCompleteRecordType {
  courseId?: string;
}

export const CoursePoslClientPage = (props: CourseClientPageInterface) => {
  const { courseNumber, courseId, typeOfRecord } = props;
  const { listAllRecords } = useListRecords();

  const { data, isLoading, isFetching } = useCreateQuery<FilterRecordsType>({
    queryKey: ['listAllRecords', courseNumber, typeOfRecord],
    queryFn: () =>
      listAllRecords({
        courseNumber,
        typeOfRecord,
      }),
    onError: (error) => {
      toast.error(String(error.data?.message));
    },
  });

  return (
    <Container>
      <ListRecords
        records={data?.data}
        courseNumber={courseNumber || undefined}
        loading={isLoading || isFetching}
      />
      <CoursesBottomBar courseId={courseId} />
    </Container>
  );
};
