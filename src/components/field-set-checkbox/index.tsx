'use client';

import { Description, Field, Label } from '@headlessui/react';
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
              <Label
                className={twMerge(
                  'text-[16px] font-[500] text-neutral-500',
                  'dark:text-neutral-300',
                  hasError && 'text-red-500',
                )}>
                {label}
              </Label>
            )}

            <div className={twMerge('flex flex-wrap gap-4', disabled && 'opacity-50')}>
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
                    className={twMerge(
                      'h-4 w-4 rounded',
                      'accent-blue-500',
                      'dark:accent-blue-200',
                      hasError && 'border-red-500',
                    )}
                  />
                  <span
                    className={twMerge(
                      'text-[16px] font-[500] text-neutral-500',
                      'dark:text-neutral-300',
                      hasError && 'text-red-500',
                    )}>
                    {option.label}
                  </span>
                </label>
              ))}
            </div>

            {hasError && (
              <Description className="text-xs text-red-500">{error?.message}</Description>
            )}

            {observation && (
              <span
                className={twMerge(
                  'text-[12px] font-[500] text-neutral-500',
                  'dark:text-neutral-300',
                )}>
                {observation}
              </span>
            )}
          </Field>
        );
      }}
    />
  );
};
