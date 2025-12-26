'use client';

import type { Control, FieldValues, Path, PathValue } from 'react-hook-form';
import { Controller } from 'react-hook-form';

import type { SelectInputOptionType } from '@/types';

import { SelectDefaultComponent } from './select';

export interface SelectDefaultInterface<T extends FieldValues> {
  id: Path<T>;
  control: Control<T>;
  options: SelectInputOptionType[];
  label?: string;
  className?: string;
  isLoading?: boolean;
  disabled?: boolean;
}

export const SelectDefault = <T extends FieldValues>(props: SelectDefaultInterface<T>) => {
  const { id, control, ...restProps } = props;

  return (
    <Controller
      name={id}
      control={control}
      defaultValue={'' as PathValue<T, Path<T>>}
      render={({ field, fieldState: { error } }) => {
        return <SelectDefaultComponent error={error?.message} {...field} {...restProps} />;
      }}
    />
  );
};
