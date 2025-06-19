'use client';

import { Description, Field, Label } from '@headlessui/react';
import type { Control, FieldValues, Path, PathValue } from 'react-hook-form';
import { Controller } from 'react-hook-form';
import { twMerge } from 'tailwind-merge';

export interface FieldSetRadioInterface<T extends FieldValues> {
  id: Path<T>;
  control: Control<T> | undefined;
  label: string;
  options: { id: string; label: string }[];
  defaultValue?: string | boolean | string[];
  customOnChange?: (event: string) => void;
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
      render={({ field, formState }) => {
        const { errors } = formState;
        const { value, onChange } = field;

        return (
          <Field className="w-full">
            {!!label && (
              <Label className={twMerge('flex gap-[4px]', 'text-[16px] font-[500]')}>
                <span className="text-neutral-800">{label}</span>
              </Label>
            )}

            <div
              className={twMerge(
                'flex flex-wrap items-center gap-4',
                'rounded-md bg-neutral-300 p-2',
              )}>
              {options.map((item) => {
                const { id, label } = item;
                return (
                  <div
                    key={id}
                    className="flex cursor-pointer items-center gap-4"
                    onClick={() => {
                      if (disabled) return;
                      onChange(id);
                      customOnChange?.(id);
                    }}>
                    <div
                      className={twMerge(
                        'rounded-full border',
                        'flex items-center justify-center',
                        'h-[14px] w-[14px] bg-white',
                        disabled && 'bg-neutral-200',
                      )}>
                      <div
                        className={twMerge(
                          'rounded-full',
                          'h-[10px] w-[10px]',
                          value === id && 'bg-black',
                          value === id && disabled && 'bg-neutral-500',
                        )}
                      />
                    </div>
                    <span>{label}</span>
                  </div>
                );
              })}
            </div>

            {!!errors[id]?.message && <Description>{`${errors[id]?.message}`}</Description>}
          </Field>
        );
      }}
    />
  );
};
