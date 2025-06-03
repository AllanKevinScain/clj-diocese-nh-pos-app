'use client';

import {
  Combobox,
  ComboboxInput,
  ComboboxOption,
  ComboboxOptions,
  Description,
  Field,
  Label,
} from '@headlessui/react';
import { useMemo, useState } from 'react';
import type { Control, FieldValues, Path, PathValue } from 'react-hook-form';
import { Controller } from 'react-hook-form';
import { twMerge } from 'tailwind-merge';

export interface SelectDefaultInterface<T extends FieldValues> {
  id: Path<T>;
  control: Control<T> | undefined;
  defaultValue: string | boolean | string[];
  options: { value: string; label: string }[];
  label?: string;
}

export const SelectDefault = <T extends FieldValues>(props: SelectDefaultInterface<T>) => {
  const { control, id, defaultValue, options, label } = props;
  const [query, setQuery] = useState('');

  const filteredPeople = useMemo(() => {
    if (query === '') return options;

    return options.filter((option) => {
      return option.value.toLowerCase().includes(query.toLowerCase());
    });
  }, [options, query]);

  return (
    <Controller
      name={id}
      control={control}
      defaultValue={defaultValue as PathValue<T, Path<T>>}
      render={({ field, formState }) => {
        const { errors } = formState;
        const { value, onChange } = field;

        return (
          <Field>
            {!!label && (
              <Label className={twMerge('flex gap-[4px]', 'text-[16px] font-[500]')}>
                <span className="text-neutral-800">{label}</span>
              </Label>
            )}
            <Combobox
              value={value}
              onChange={(value) => onChange(value)}
              onClose={() => setQuery('')}>
              <ComboboxInput
                displayValue={(item) => {
                  const auxItem = item as { value: string; label: string };

                  return auxItem.label;
                }}
                onChange={(event) => setQuery(event.target.value)}
              />
              <ComboboxOptions anchor="bottom" className="border empty:invisible">
                {filteredPeople.map((item) => (
                  <ComboboxOption key={item.value} value={item.value}>
                    {item.label}
                  </ComboboxOption>
                ))}
              </ComboboxOptions>
            </Combobox>

            {!!errors[id]?.message && <Description>{`${errors[id]?.message}`}</Description>}
          </Field>
        );
      }}
    />
  );
};
