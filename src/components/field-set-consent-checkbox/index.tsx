'use client';

import { Checkbox, Description, Field, Label } from '@headlessui/react';
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
        const { value } = field;

        return (
          <Field className="w-full">
            {!!label && (
              <Label className={twMerge('flex gap-[4px]', 'text-[16px] font-[500]')}>
                <span className="text-neutral-800">{label}</span>
              </Label>
            )}

            <div className="flex items-center gap-[18px]">
              <Checkbox {...field} disabled={disabled} checked={value} />
              <span>{description}</span>
            </div>

            {!!errors[id]?.message && <Description>{`${errors[id]?.message}`}</Description>}
          </Field>
        );
      }}
    />
  );
};
