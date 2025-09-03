'use client';

import type { Control } from 'react-hook-form';
import { twMerge } from 'tailwind-merge';
import type { InferType } from 'yup';

import { DynamicListSelect, SessionForm } from '@/components';
import { useCreateQuery, useEspecificRecords } from '@/hooks';
import type { FilterRecordsType } from '@/types';
import type { backgroundTableSchema } from '@/yup';

type BackgroundTableSchemaInferType = InferType<typeof backgroundTableSchema>;

interface KitchenInterface {
  courseNumber: string;
  control: Control<BackgroundTableSchemaInferType>;
}

export const Kitchen = (props: KitchenInterface) => {
  const { courseNumber, control } = props;

  const { listWorkRecordsByNumberCourse } = useEspecificRecords();

  const { data } = useCreateQuery<FilterRecordsType>({
    queryFn: () => listWorkRecordsByNumberCourse(courseNumber),
    queryKey: [`work-records-${courseNumber}`],
  });

  return (
    <div className={twMerge('flex flex-col gap-[16px]', 'w-full pb-[10%]')}>
      <SessionForm title="Copa:">
        <DynamicListSelect
          control={control}
          id="copeWorkRecords"
          options={
            data?.data.map((item) => ({
              label: item.candidateName,
              value: item.id ?? '',
            })) || []
          }
        />
      </SessionForm>
      <SessionForm title="Limpeza:">
        <DynamicListSelect
          control={control}
          id="cleanWorkRecords"
          options={
            data?.data.map((item) => ({
              label: item.candidateName,
              value: item.id ?? '',
            })) || []
          }
        />
      </SessionForm>
      <SessionForm title="Cozinha:">
        <DynamicListSelect
          control={control}
          id="kitchenWorkRecords"
          options={
            data?.data.map((item) => ({
              label: item.candidateName,
              value: item.id ?? '',
            })) || []
          }
        />
      </SessionForm>
    </div>
  );
};
