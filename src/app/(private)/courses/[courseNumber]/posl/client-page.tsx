'use client';

import React from 'react';
import toast from 'react-hot-toast';
import { TbLoaderQuarter } from 'react-icons/tb';
import { twMerge } from 'tailwind-merge';

import { useCreateQuery, useListRecords } from '@/hooks';
import type { ListRecordsType } from '@/types/list-records.type';

import { ListRecords } from '../components';
import { CoursesBottomBar } from '../components/courses-bottom-bar';

interface CourseClientPageInterface {
  courseNumber: string;
  courseId: string;
}

export const CourseClientPage = (props: CourseClientPageInterface) => {
  const { courseNumber, courseId } = props;
  const { listRecordsByCourseNumber } = useListRecords();

  const { data, isLoading } = useCreateQuery<ListRecordsType[]>({
    queryKey: ['listRecordsPosl', courseNumber],
    queryFn: () => listRecordsByCourseNumber(courseNumber),
    onError: (error) => {
      toast.error(String(error.data?.message));
    },
  });

  return (
    <div
      className={twMerge(
        'mx-auto flex w-full max-w-screen-xl flex-col gap-8 px-4',
        isLoading && 'h-[80vh] items-center justify-center',
      )}>
      <CoursesBottomBar courseId={courseId} />

      {isLoading && <TbLoaderQuarter size={30} className="animate-spin text-gray-600" />}
      {!isLoading && <ListRecords records={data} courseNumber={courseNumber} />}
    </div>
  );
};
