'use client';

import { useQueries } from '@tanstack/react-query';
import { useParams } from 'next/navigation';
import type { FieldValues } from 'react-hook-form';

import { SelectDefault, type SelectDefaultInterface } from '@/components';
import { useListRecords, usePoslll } from '@/hooks';
import type { CompleteRecordInterface, FunctionType } from '@/types';
import type { PoslllSchemaInferType } from '@/yup';

interface SelectRequiredFunctionsType<T extends FieldValues>
  extends Pick<SelectDefaultInterface<T>, 'control' | 'id' | 'label'> {
  typeRecord?: FunctionType;
  disabled?: boolean;
}

export const SelectRequiredFunctions = <T extends FieldValues>(
  props: SelectRequiredFunctionsType<T>,
) => {
  const { control, id, label, typeRecord = 'WORK', disabled = false } = props;
  const { courseId } = useParams<{ courseId: string }>();

  const { listPoslll } = usePoslll();
  const { listRecordByCourseId } = useListRecords();

  const options = useQueries({
    queries: [
      {
        queryKey: ['list-record-by-course-id', courseId],
        queryFn: () => listRecordByCourseId(courseId),
      },
      {
        queryKey: [`select-poslll`],
        queryFn: listPoslll,
      },
    ],
    combine: (results) => {
      const [workEquip, poslll] = results;

      const typedDataWorkEquip = workEquip.data as CompleteRecordInterface[] | undefined;
      let dataA =
        typedDataWorkEquip
          ?.filter((item) => item.isWork)
          .map((item) => ({
            label: item.candidateName,
            value: item.id ?? '',
          })) ?? [];

      if (typeRecord === 'COUPLE') {
        dataA =
          typedDataWorkEquip
            ?.filter((item) => item.isCoupleWork)
            .map((item) => ({
              label: `Tios ${item.candidateName} e ${item.recordCouple?.womanName}`,
              value: item.id ?? '',
            })) ?? [];
      }

      const typedDataPoslll = poslll.data as PoslllSchemaInferType[] | undefined;
      let dataB =
        typedDataPoslll
          ?.filter((item) => !item.isCouple)
          .map((item) => ({
            label: item.candidateName,
            value: item.id ?? '',
          })) ?? [];

      if (typeRecord === 'COUPLE') {
        dataB =
          typedDataPoslll
            ?.filter((item) => item.isCouple)
            .map((item) => ({
              label: item.candidateName,
              value: item.id ?? '',
            })) ?? [];
      }

      const merged = [...dataA, ...dataB];
      const unique = Array.from(new Map(merged.map((item) => [item.value, item])).values());

      return {
        data: unique,
        isLoading: workEquip.isLoading || poslll.isLoading,
        isFetching: workEquip.isFetching || poslll.isFetching,
      };
    },
  });

  return (
    <SelectDefault
      control={control}
      label={label}
      id={id}
      options={options.data as { value: string; label: string }[]}
      isLoading={options.isLoading || options.isFetching}
      disabled={disabled}
    />
  );
};
