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

import { Text } from '../text';

export interface SelectDefaultInterface<T extends FieldValues> {
  id: Path<T>;
  control: Control<T> | undefined;
  defaultValue?: string | boolean | string[];
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
      defaultValue={(defaultValue || '') as PathValue<T, Path<T>>}
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

            <Combobox
              value={value}
              onChange={(value) => onChange(value)}
              onClose={() => setQuery('')}>
              <div className="relative">
                <input ref={ref} readOnly className="sr-only" />
                <ComboboxInput
                  className={twMerge(
                    'border border-neutral-700',
                    'mb-4 h-[50px] w-full rounded-[10px] bg-neutral-50 px-[10px]',
                    'focus:border-transparent focus:ring-2 focus:ring-neutral-500 focus:outline-none',
                    'disabled:cursor-not-allowed disabled:bg-neutral-200',
                    'placeholder:text-neutral-400',
                    'transition-all',
                    'disabled:cursor-not-allowed disabled:bg-gray-100',
                    'dark:bg-neutral-800 dark:text-neutral-200 dark:focus:ring-neutral-300',
                    hasError && 'border-red-500',
                  )}
                  displayValue={(value) => {
                    return (
                      filteredPeople.find((item) => item.value === value)?.label ?? 'Selecione'
                    );
                  }}
                  onChange={(event) => setQuery(event.target.value)}
                />
                <ComboboxButton className="group absolute top-[15px] right-0 px-2.5">
                  <Text as="span">
                    <BiChevronDown size={20} />
                  </Text>
                </ComboboxButton>
              </div>
              <ComboboxOptions
                anchor="bottom"
                transition
                className={twMerge(
                  'w-(--input-width) rounded-xl border bg-white p-1 [--anchor-gap:--spacing(1)] empty:invisible',
                  'transition duration-100 ease-in data-leave:data-closed:opacity-0',
                  'dark:bg-neutral-600',
                )}>
                {filteredPeople.map((item) => (
                  <ComboboxOption
                    key={item.value}
                    value={item.value}
                    className="group flex cursor-default items-center gap-2 rounded-lg px-3 py-1.5 select-none">
                    <Text as="span">
                      <BiCheck
                        className={twMerge('invisible size-4', 'group-data-selected:visible')}
                      />
                    </Text>
                    <Text>{item.label}</Text>
                  </ComboboxOption>
                ))}
              </ComboboxOptions>
            </Combobox>

            {hasError && (
              <Description className="text-xs text-red-500">{error?.message}</Description>
            )}
          </Field>
        );
      }}
    />
  );
};
