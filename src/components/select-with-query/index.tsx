'use client';
import { useQuery } from '@tanstack/react-query';
import type { FieldValues } from 'react-hook-form';

import type { RouteType } from '@/types';

import { SelectDefault, type SelectDefaultInterface } from '../select-default';

interface SelectWithQueryType<T extends FieldValues>
  extends Pick<SelectDefaultInterface<T>, 'control' | 'id' | 'label'> {
  call: () => Promise<unknown>;
  modelData: (_: unknown) => { value: string; label: string }[];
  route?: RouteType;
}

export const SelectWithQuery = <T extends FieldValues>(props: SelectWithQueryType<T>) => {
  const { control, id, label, call, modelData, route } = props;

  const { data, isLoading, isFetching } = useQuery({
    queryKey: [`select-${route ? route : id}`],
    queryFn: call,
    select: modelData,
    enabled: !!call,
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
