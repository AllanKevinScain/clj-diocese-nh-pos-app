'use client';

import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { TbLoaderQuarter } from 'react-icons/tb';
import type { InferType } from 'yup';

import { useListRecords } from '@/hooks';
import type { poslSchema } from '@/yup';

import { ControlButtons, ListRecords, Newrecord } from './components';

export type InfertypePoslSchema = InferType<typeof poslSchema>;

interface CourseClientPageInterface {
  courseNumber: string;
}

export const CourseClientPage = ({ courseNumber }: CourseClientPageInterface) => {
  const { listRecordsByCourseNumber } = useListRecords();

  const { data, isLoading } = useQuery<InfertypePoslSchema[]>({
    queryKey: ['fichas', courseNumber],
    queryFn: () => listRecordsByCourseNumber(courseNumber),
  });

  const isEmptyRecords = data && data.length === 0 && !isLoading;

  if (isLoading) {
    return (
      <div className="flex h-[400px] items-center justify-center">
        <TbLoaderQuarter size={30} className="animate-spin text-gray-600" />
      </div>
    );
  }

  if (isEmptyRecords) {
    return (
      <div className="flex h-[400px] flex-col items-center justify-center gap-2 px-4 text-center">
        <h2 className="text-2xl font-semibold text-gray-800">Nenhum curso foi cadastrado!</h2>
        <Newrecord />
      </div>
    );
  }

  return (
    <div className="mx-auto flex w-full max-w-screen-xl flex-col gap-8 px-4">
      <ControlButtons courseId={data ? data[0].id! : ''} courseNumber={courseNumber} />
      <ListRecords records={data!} />
    </div>
  );
};
