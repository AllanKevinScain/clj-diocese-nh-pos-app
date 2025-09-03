'use client';

import type { Control } from 'react-hook-form';
import { twMerge } from 'tailwind-merge';
import type { InferType } from 'yup';

import { Loading, Text } from '@/components';
import { useCreateQuery, useEspecificRecords } from '@/hooks';
import type { FilterRecordsType } from '@/types';
import type { backgroundTableSchema } from '@/yup';

import { CommunityListSelect } from './community-list-select';

type BackgroundTableSchemaInferType = InferType<typeof backgroundTableSchema>;

interface CommunitiesInterface {
  courseNumber: string;
  control: Control<BackgroundTableSchemaInferType>;
}

export const Communities = (props: CommunitiesInterface) => {
  const { courseNumber, control } = props;

  const { listCandidatesRecordsByNumberCourse } = useEspecificRecords();

  const { data, isLoading } = useCreateQuery<FilterRecordsType>({
    queryFn: () => listCandidatesRecordsByNumberCourse(courseNumber),
    queryKey: [`candidates-records-${courseNumber}`],
  });

  if (isLoading) return <Loading />;

  return (
    <div className={twMerge('flex w-full flex-col gap-[24px]', 'pb-[15%]')}>
      <div className="flex w-full flex-col">
        <Text>Quantidade de fichas: {data?.data.length}</Text>
        <Text>Você pode dividir em: </Text>
        <Text>
          {data?.data?.length ?? 0} / 8 =
          <Text as="b" className="pl-[8px] font-extrabold">
            {((data?.data?.length ?? 0) / 8).toFixed(2)}
          </Text>
        </Text>
        <Text>
          {data?.data?.length ?? 0} / 9 =
          <Text as="b" className="pl-[8px] font-extrabold">
            {((data?.data?.length ?? 0) / 9).toFixed(2)}
          </Text>
        </Text>
        <Text>
          {data?.data?.length ?? 0} / 10 =
          <Text as="b" className="pl-[8px] font-extrabold">
            {((data?.data?.length ?? 0) / 10).toFixed(2)}
          </Text>
        </Text>
        <Text>
          {data?.data?.length ?? 0} / 11 =
          <Text as="b" className="pl-[8px] font-extrabold">
            {((data?.data?.length ?? 0) / 11).toFixed(2)}
          </Text>
        </Text>
      </div>

      <CommunityListSelect
        control={control}
        isLoading={isLoading}
        options={
          data?.data.map((item) => ({
            label: item.candidateName,
            value: item.id ?? '',
          })) || []
        }
      />
    </div>
  );
};
