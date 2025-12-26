'use client';

import { useQuery } from '@tanstack/react-query';
import React from 'react';

import { Container } from '@/components';
import { useListRecords } from '@/hooks';
import type { CompleteRecordInterface, FilterRecordsType } from '@/types';

import { ListRecords } from '../components';
import { CoursesBottomBar } from '../components/courses-bottom-bar';

type CutCompleteRecordType = Pick<CompleteRecordInterface, 'courseNumber' | 'typeOfRecord'>;

interface CourseClientPageInterface extends CutCompleteRecordType {
  courseId?: string;
}

export const CoursePoslllClientPage = (props: CourseClientPageInterface) => {
  const { courseNumber, courseId, typeOfRecord } = props;
  const { listAllRecords } = useListRecords();

  const { data, isLoading, isFetching } = useQuery<FilterRecordsType>({
    queryKey: ['listAllRecords', courseNumber, typeOfRecord],
    queryFn: () =>
      listAllRecords({
        courseNumber,
        typeOfRecord,
      }),
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
