'use client';

import { useQuery } from '@tanstack/react-query';
import { createContext } from 'react';

import { useListRecords } from '@/hooks';
import type { CompleteRecordInterface, SelectInputOptionType } from '@/types';

type RecordsType = SelectInputOptionType &
  Pick<CompleteRecordInterface, 'isWork' | 'isCoupleWork' | 'typeOfRecord'>;

export interface MontageContextInterface {
  isLoadingRecords: boolean;
  records?: RecordsType[];
}

export const MontageContext = createContext<MontageContextInterface>({
  isLoadingRecords: true,
  records: undefined,
});

interface MontageProviderInterface {
  courseId: string;
  children: React.ReactNode;
}

export const MontageProvider = ({ courseId, children }: MontageProviderInterface) => {
  const { listRecordByCourseId } = useListRecords();

  const { data, isLoading, isFetching } = useQuery({
    queryFn: () => listRecordByCourseId(courseId),
    queryKey: ['list-record-by-course-id', courseId],
    select: (data) => {
      const typedData = data as CompleteRecordInterface[] | undefined;

      const transformData = typedData?.map((item) => {
        if (item.isCoupleWork) {
          return {
            label: `Tios ${item.candidateName} e ${item.recordCouple?.womanName}`,
            value: item.id ?? '',
            isWork: item.isWork,
            isCoupleWork: item.isCoupleWork,
          };
        }
        return {
          label: item.candidateName,
          value: item.id ?? '',
          isWork: item.isWork,
          isCoupleWork: item.isCoupleWork,
        };
      });
      return {
        data: transformData,
        isLoading: data.isLoading,
      };
    },
  });

  return (
    <MontageContext.Provider
      value={{
        isLoadingRecords: isLoading || isFetching,
        records: data?.data,
      }}>
      {children}
    </MontageContext.Provider>
  );
};
