'use client';

import { Description, Field, Label } from '@headlessui/react';
import type { Control, FieldValues, Path, PathValue } from 'react-hook-form';
import { Controller } from 'react-hook-form';
import { twMerge } from 'tailwind-merge';

export interface FieldSetRadioInterface<T extends FieldValues> {
  id: Path<T>;
  control: Control<T> | undefined;
  label: string;
  options: { value: PathValue<T, Path<T>>; label: string }[];
  defaultValue?: unknown;
  customOnChange?: (_: unknown) => void;
  disabled?: boolean;
}

export const FieldSetRadio = <T extends FieldValues>(props: FieldSetRadioInterface<T>) => {
  const {
    label,
    options = [],
    id,
    control,
    defaultValue,
    customOnChange,
    disabled = false,
  } = props;

  return (
    <Controller
      name={id}
      control={control}
      defaultValue={defaultValue as PathValue<T, Path<T>>}
      render={({ field, fieldState: { error } }) => {
        const hasError = !!error?.message;
        const { value: controllerValue, onChange, ref } = field;

        return (
          <Field className="w-full">
            {!!label && (
              <Label className={twMerge('flex gap-[4px]', 'text-[16px] font-[500]')}>
                <span className={twMerge('text-neutral-800', hasError && 'text-red-500')}>
                  {label}
                </span>
              </Label>
            )}

            <div
              className={twMerge(
                'flex flex-wrap items-center gap-4',
                'rounded-md bg-neutral-300 p-2',
                hasError && 'border border-red-500',
              )}>
              {options.map((item) => {
                const { value, label } = item;
                const isMarked = controllerValue === value;

                return (
                  <div
                    key={label}
                    className="flex cursor-pointer items-center gap-4"
                    onClick={() => {
                      if (disabled) return;
                      if (isMarked) {
                        onChange(null);
                        customOnChange?.(null);
                      } else {
                        onChange(value);
                        customOnChange?.(value);
                      }
                    }}>
                    <input ref={ref} readOnly className="sr-only" />
                    <div
                      className={twMerge(
                        'rounded-full border border-gray-800',
                        'flex items-center justify-center',
                        'h-[14px] w-[14px] bg-white',
                        disabled && 'bg-neutral-200',
                        hasError && 'border-red-500',
                      )}>
                      <div
                        className={twMerge(
                          'rounded-full',
                          'h-[10px] w-[10px]',
                          isMarked && 'bg-gray-800',
                          isMarked && disabled && 'bg-neutral-400',
                        )}
                      />
                    </div>
                    <span>{label}</span>
                  </div>
                );
              })}
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
