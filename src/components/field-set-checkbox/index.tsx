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
}

export const FieldSetCheckbox = <T extends FieldValues>(props: FieldSetCheckboxInterface<T>) => {
  const { label, options = [], id, control, disabled = false, observation } = props;

  return (
    <Controller
      name={id}
      control={control}
      defaultValue={[] as PathValue<T, Path<T>>}
      render={({ field, formState }) => {
        const { errors } = formState;
        const { value, onChange } = field;

        return (
          <Field className={twMerge('flex flex-col gap-4', 'w-full')}>
            {!!label && (
              <span
                className={twMerge('flex gap-[4px]', 'text-[16px] font-[500] text-neutral-800')}>
                {label}
              </span>
            )}

            <div className="flex flex-wrap gap-4">
              {options.map((option) => (
                <label
                  key={option.id}
                  className="flex cursor-pointer items-center gap-2 text-sm text-neutral-800">
                  <input
                    type="checkbox"
                    disabled={disabled}
                    checked={value.includes(option.id)}
                    onChange={() => onChange(option.id)}
                    className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                  {option.label}
                </label>
              ))}
            </div>

            {!!errors[id]?.message && <Description>{`${errors[id]?.message}`}</Description>}

            {observation && <span className="text-xs">{observation}</span>}
          </Field>
        );
      }}
    />
  );
};
