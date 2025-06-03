'use client';

import { Description, Field, Label, Radio, RadioGroup } from '@headlessui/react';
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
        const { value } = field;

        return (
          <Field className="w-full">
            {!!label && (
              <Label className={twMerge('flex gap-[4px]', 'text-[16px] font-[500]')}>
                <span className="text-neutral-800">{label}</span>
              </Label>
            )}

            <RadioGroup
              {...field}
              defaultValue=""
              value={value}
              onChange={(e) => {
                if (field.value === id) {
                  field.onChange('');
                } else {
                  field.onChange(e);
                }
                if (customOnChange) customOnChange(e);
              }}>
              {options.map(({ id: optionId, label: optLabel }) => {
                return (
                  <Radio disabled={disabled} value={optionId} key={optionId}>
                    <span>{optLabel}</span>
                  </Radio>
                );
              })}
            </RadioGroup>

            {!!errors[id]?.message && <Description>{`${errors[id]?.message}`}</Description>}
          </Field>
        );
      }}
    />
  );
};
