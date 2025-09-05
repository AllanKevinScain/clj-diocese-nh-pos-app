'use client';

import { Description, Field, Label } from '@headlessui/react';
import { isEmpty } from 'lodash';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { BiCheck, BiChevronUp } from 'react-icons/bi';
import { VscLoading } from 'react-icons/vsc';
import { twMerge } from 'tailwind-merge';

import { Text } from '../text';

type Option = { label: string; value: string };

export interface SelectDefaultComponenttInterface {
  value: string;
  onChange: (_?: string) => void;
  options: Option[];
  label?: string;
  className?: string;
  isLoading?: boolean;
  error?: string;
  ref?: React.Ref<HTMLInputElement>;
}

export const SelectDefaultComponent = (props: SelectDefaultComponenttInterface) => {
  const { options, label, className, isLoading = false, error, ref, onChange, value } = props;
  const [open, setOpen] = useState(false);
  const divReference = useRef<HTMLDivElement>(null);

  const hasError = !!error;

  const selected = useMemo(() => {
    if (isEmpty(options)) return undefined;
    return options.find((opt) => opt.value === value);
  }, [options, value]);

  const handleToggle = useCallback(() => {
    setOpen((s) => !s);
  }, []);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (divReference.current && !divReference.current.contains(event.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <Field className={twMerge('w-full', 'flex flex-col gap-[6px]', 'cursor-pointer')}>
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

      <input ref={ref} readOnly className="sr-only" />

      <div ref={divReference} className={twMerge('relative', className)}>
        {/* Botão */}
        <div
          onClick={handleToggle}
          className={twMerge(
            'flex items-center justify-between',
            'border border-neutral-700',
            'h-[50px] w-full rounded-[10px] bg-neutral-50 px-[10px]',
            'focus:border-transparent focus:ring-2 focus:ring-neutral-500 focus:outline-none',
            'disabled:cursor-not-allowed disabled:opacity-50',
            'placeholder:text-neutral-400',
            'transition-all',
            'dark:bg-neutral-800 dark:text-neutral-200 dark:focus:ring-neutral-300',
            'dark:disabled:bg-neutral-700',
            hasError && 'border-red-500',
          )}>
          <Text className={twMerge('text-neutral-400 opacity-70', selected && 'text-neutral-900')}>
            {selected ? selected.label : 'Selecione'}
          </Text>
          <BiChevronUp
            className={twMerge(
              'h-5 w-5 text-neutral-500',
              'transition-all duration-200',
              open && 'rotate-180',
            )}
          />
        </div>

        {/* Dropdown */}
        {open && (
          <ul
            className={twMerge(
              'absolute z-10',
              'max-h-60 overflow-auto',
              'mt-2 w-full bg-white shadow-lg',
              'rounded-xl border border-neutral-700',
              'dark:border-neutral-200 dark:bg-neutral-700',
            )}>
            {isLoading && (
              <li className="flex items-center justify-center px-4 py-2">
                <VscLoading className="h-4 w-4 animate-spin text-neutral-400" />
              </li>
            )}

            {options.length === 0 && !isLoading && (
              <li className="flex items-center justify-between px-4 py-2">
                <Text>Nenhuma opção</Text>
              </li>
            )}

            {!isEmpty(options) &&
              !isLoading &&
              options.map((opt) => (
                <li
                  key={opt.value}
                  onClick={() => {
                    if (value === opt.value) {
                      onChange(undefined);
                    } else {
                      onChange(opt.value);
                    }
                    setOpen(false);
                  }}
                  className={twMerge(
                    'flex cursor-pointer items-center justify-between px-4 py-2',
                    value === opt.value &&
                      'bg-neutral-300 text-neutral-700 dark:bg-neutral-500 dark:text-neutral-400',
                  )}>
                  <Text>{opt.label}</Text>
                  {value === opt.value && (
                    <BiCheck className="h-4 w-4 text-neutral-700 dark:text-neutral-400" />
                  )}
                </li>
              ))}
          </ul>
        )}
      </div>

      {hasError && <Description className="text-xs text-red-500">{error}</Description>}
    </Field>
  );
};
