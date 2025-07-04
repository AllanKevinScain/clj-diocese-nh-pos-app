'use client';

import {
  Combobox,
  ComboboxButton,
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
import { BiCheck, BiChevronDown } from 'react-icons/bi';
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
        const { value, onChange, ref } = field;

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
              <div className="relative">
                <input ref={ref} readOnly className="sr-only" />
                <ComboboxInput
                  className={twMerge(
                    'border border-gray-300',
                    `mb-4 w-full rounded-md px-3 py-2 transition-all`,
                    'focus:border-transparent focus:ring-2 focus:ring-blue-500 focus:outline-none',
                    'disabled:cursor-not-allowed disabled:bg-gray-100',
                  )}
                  displayValue={(value) => {
                    return (
                      filteredPeople.find((item) => item.value === value)?.label ?? 'Selecione'
                    );
                  }}
                  onChange={(event) => setQuery(event.target.value)}
                />
                <ComboboxButton className="group absolute top-3 right-0 px-2.5">
                  <BiChevronDown size={20} />
                </ComboboxButton>
              </div>
              <ComboboxOptions
                anchor="bottom"
                transition
                className={twMerge(
                  'w-(--input-width) rounded-xl border bg-white p-1 [--anchor-gap:--spacing(1)] empty:invisible',
                  'transition duration-100 ease-in data-leave:data-closed:opacity-0',
                )}>
                {filteredPeople.map((item) => (
                  <ComboboxOption
                    key={item.value}
                    value={item.value}
                    className="group flex cursor-default items-center gap-2 rounded-lg px-3 py-1.5 select-none">
                    <BiCheck className="invisible size-4 group-data-selected:visible" />
                    <div className="text-sm/6 text-black">{item.label}</div>
                  </ComboboxOption>
                ))}
              </ComboboxOptions>
            </Combobox>

            {!!errors[id]?.message && (
              <Description className="text-xs text-red-500">{`${errors[id]?.message}`}</Description>
            )}
          </Field>
        );
      }}
    />
  );
};
