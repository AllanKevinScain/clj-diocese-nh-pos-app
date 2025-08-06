'use client';

import { Description, Field } from '@headlessui/react';
import type { Control, FieldValues, Path, PathValue } from 'react-hook-form';
import { Controller } from 'react-hook-form';
import { twMerge } from 'tailwind-merge';

export interface FieldSetCheckboxInterface<T extends FieldValues> {
  id: Path<T>;
  control: Control<T> | undefined;
  label: string;
  options: { id: string; label: string }[];
  disabled?: boolean;
  observation?: string;
  customOnChange?: (_: unknown) => void;
}

export const FieldSetCheckbox = <T extends FieldValues>(props: FieldSetCheckboxInterface<T>) => {
  const { label, options = [], id, control, disabled = false, observation, customOnChange } = props;

  return (
    <Controller
      name={id}
      control={control}
      defaultValue={[] as PathValue<T, Path<T>>}
      render={({ field, fieldState: { error } }) => {
        const hasError = !!error?.message;
        const { value, onChange, ref } = field;

        return (
          <Field className={twMerge('flex flex-col gap-4', 'w-full')}>
            {!!label && (
              <span
                className={twMerge(
                  'flex gap-[4px]',
                  'text-[16px] font-[500] text-neutral-800',
                  hasError && 'text-red-500',
                )}>
                {label}
              </span>
            )}

            <div className="flex flex-wrap gap-4">
              {options.map((option) => (
                <label
                  key={option.id}
                  className={twMerge(
                    'flex cursor-pointer items-center gap-2 text-sm text-neutral-800',
                    hasError && 'text-red-500',
                  )}>
                  <input
                    ref={ref}
                    type="checkbox"
                    disabled={disabled}
                    checked={value.includes(option.id)}
                    onChange={() => {
                      if (customOnChange) customOnChange(option.id);
                      const finded = value.includes(option.id);
                      if (finded) {
                        const removes = value.filter((item: string) => item !== option.id);
                        return onChange(removes);
                      }
                      return onChange([...value, option.id]);
                    }}
                  />
                  {option.label}
                </label>
              ))}
            </div>

            {hasError && (
              <Description className="text-xs text-red-500">{error?.message}</Description>
            )}

            {observation && <span className="text-xs">{observation}</span>}
          </Field>
        );
      }}
    />
  );
};
