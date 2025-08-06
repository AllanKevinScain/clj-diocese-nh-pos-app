'use client';

import { Description, Field, Label } from '@headlessui/react';
import type { Control, FieldValues, Path, PathValue } from 'react-hook-form';
import { Controller } from 'react-hook-form';
import { twMerge } from 'tailwind-merge';

interface FieldSetCheckboxInterface<T extends FieldValues> {
  id: Path<T>;
  control: Control<T> | undefined;
  label?: string;
  disabled?: boolean;
  description: string;
}

export const FieldSetConsentCheckbox = <T extends FieldValues>(
  props: FieldSetCheckboxInterface<T>,
) => {
  const { label, id, control, disabled = false, description } = props;

  return (
    <Controller
      name={id}
      control={control}
      defaultValue={false as PathValue<T, Path<T>>}
      render={({ field, fieldState: { error } }) => {
        const hasError = !!error?.message;
        const { value, onChange, ref } = field;

        return (
          <Field className="w-full">
            {!!label && (
              <Label
                className={twMerge(
                  'flex gap-[4px]',
                  'text-[16px] font-[500]',
                  hasError && 'text-red-500',
                )}>
                <span className="text-neutral-800">{label}</span>
              </Label>
            )}

            <div className="flex gap-4">
              <label
                className={twMerge(
                  'flex cursor-pointer items-center gap-2 text-sm text-neutral-800',
                  hasError && 'text-red-500',
                )}>
                <input
                  ref={ref}
                  type="checkbox"
                  disabled={disabled}
                  checked={value || false}
                  onChange={() => onChange(!value || false)}
                  className={twMerge(
                    'h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500',
                    hasError && 'border-red-500',
                  )}
                />
                {description}
              </label>
            </div>

            {hasError && (
              <Description className="text-xs text-red-500">{error?.message}</Description>
            )}
          </Field>
        );
      }}
    />
  );
};
