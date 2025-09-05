'use client';
import type { FieldValues } from 'react-hook-form';

import { useCreateQuery } from '@/hooks';

import { SelectDefault, type SelectDefaultInterface } from '../select-default';

interface SelectWithQueryType<T extends FieldValues>
  extends Pick<SelectDefaultInterface<T>, 'control' | 'id' | 'label'> {
  call: () => Promise<unknown>;
  modelData: (_: unknown) => { value: string; label: string }[];
}

export const SelectWithQuery = <T extends FieldValues>(props: SelectWithQueryType<T>) => {
  const { control, id, label, call, modelData } = props;

  const { data, isLoading, isFetching } = useCreateQuery({
    queryKey: [`select-${id}`],
    queryFn: call,
    queryOptions: {
      select: modelData,
      enabled: !!call,
    },
  });

  return (
    <SelectDefault
      control={control}
      label={label}
      id={id}
      options={data as { value: string; label: string }[]}
      isLoading={isLoading || isFetching}
    />
  );
};
