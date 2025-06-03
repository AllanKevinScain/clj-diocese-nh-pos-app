'use client';

import { Checkbox, Description, Field } from '@headlessui/react';
import type { Control, FieldValues, Path, PathValue } from 'react-hook-form';
import { Controller } from 'react-hook-form';
import { twMerge } from 'tailwind-merge';

export interface FieldSetCheckboxInterface<T extends FieldValues> {
  id: Path<T>;
  control: Control<T> | undefined;
  label: string;
  options: { id: string; label: string }[];
  disabled?: boolean;
}

export const FieldSetCheckbox = <T extends FieldValues>(props: FieldSetCheckboxInterface<T>) => {
  const { label, options = [], id, control, disabled = false } = props;

  return (
    <Controller
      name={id}
      control={control}
      defaultValue={[] as PathValue<T, Path<T>>}
      render={({ field, formState }) => {
        const { errors } = formState;
        const { value } = field;

        return (
          <Field className="w-full">
            {!!label && (
              <span
                className={twMerge('flex gap-[4px]', 'text-[16px] font-[500] text-neutral-800')}>
                {label}
              </span>
            )}

            {options.map(({ id: optionId, label: optLabel }) => (
              <div key={optionId} className="flex items-center gap-[18px]">
                <Checkbox
                  {...field}
                  disabled={disabled}
                  checked={value.includes(optionId)}
                  onChange={(e) => {
                    if (e) {
                      field.onChange([...value, optionId]);
                    } else {
                      field.onChange(value.filter((value: string) => value !== optionId));
                    }
                  }}
                />
                <span>{optLabel}</span>
              </div>
            ))}

            {!!errors[id]?.message && <Description>{`${errors[id]?.message}`}</Description>}
          </Field>
        );
      }}
    />
  );
};
