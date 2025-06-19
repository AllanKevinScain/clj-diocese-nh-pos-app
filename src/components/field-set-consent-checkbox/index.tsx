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

            <div className="flex gap-4">
              <label className="flex cursor-pointer items-center gap-2 text-sm text-neutral-800">
                <input
                  type="checkbox"
                  disabled={disabled}
                  checked={value}
                  onChange={() => onChange(!value)}
                  className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
                {description}
              </label>
            </div>

            {!!errors[id]?.message && <Description>{`${errors[id]?.message}`}</Description>}
          </Field>
        );
      }}
    />
  );
};
