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
          <Field className={twMerge('w-full', 'flex flex-col gap-[6px]')}>
            {!!label && (
              <Label
                className={twMerge(
                  'flex gap-[4px]',
                  'text-[16px] font-[500] text-neutral-500',
                  'dark:text-neutral-300',
                  hasError && 'text-red-500',
                )}>
                {label}
              </Label>
            )}

            <div className={twMerge('flex gap-4', disabled && 'opacity-50')}>
              <label
                className={twMerge(
                  'flex cursor-pointer items-center gap-2 text-sm text-neutral-800',
                  'dark:text-neutral-300',
                  hasError && 'text-red-500',
                )}>
                <input
                  ref={ref}
                  type="checkbox"
                  disabled={disabled}
                  checked={value || false}
                  onChange={() => onChange(!value || false)}
                  className={twMerge(
                    'h-4 w-4 rounded',
                    'accent-blue-500',
                    'dark:accent-blue-200',
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
