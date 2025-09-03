'use client';

import { useState } from 'react';
import { BiChevronDown } from 'react-icons/bi';
import { FaSpinner } from 'react-icons/fa';
import { twMerge } from 'tailwind-merge';

import { Text } from '@/components';

type Option = { value: string; label: string };

interface DynamicListSelectInterface {
  options: Option[];
  isLoading?: boolean;
  val: string;
  onChange: (value: string) => void;
}

export const Select = (props: DynamicListSelectInterface) => {
  const { options, isLoading = false, val, onChange } = props;
  const [open, setOpen] = useState(false);

  return (
    <div
      className={twMerge(
        'relative',
        'transition-all',
        'rounded-[10px] border border-neutral-700',
        'flex flex-col',
        'w-full bg-neutral-50',
        'focus:border-transparent focus:ring-2 focus:ring-neutral-500 focus:outline-none',
        'disabled:cursor-not-allowed disabled:bg-neutral-200',
        'placeholder:text-neutral-400',
        'disabled:cursor-not-allowed disabled:bg-gray-100',
        'dark:bg-neutral-800 dark:text-neutral-200 dark:focus:ring-neutral-300',
      )}
      onClick={() => setOpen((s) => !s)}>
      <div className="flex min-h-[50px] items-center px-[10px]">
        <Text>{options.find((item) => item.value === val)?.label ?? 'Selecione'}</Text>

        <div className="absolute top-[15px] right-0 px-2.5">
          <Text as="span">
            <BiChevronDown size={20} className={twMerge('transition-all', open && 'rotate-180')} />
          </Text>
        </div>
      </div>

      {open && (
        <div className={twMerge('bg-neutral-200', 'rounded-b-[10px]', 'dark:bg-neutral-600')}>
          {!isLoading &&
            options.map((item) => (
              <div
                key={item.value}
                onClick={() => onChange(item.value)}
                className={twMerge('flex items-center gap-2', 'px-[10px] py-1.5')}>
                <Text>{item.label}</Text>
              </div>
            ))}
          {isLoading && (
            <div className={twMerge('flex items-center gap-2', 'px-[10px] py-1.5')}>
              <FaSpinner className={twMerge('animate-spin')} />
            </div>
          )}
          {options.length === 0 && (
            <div className={twMerge('flex items-center gap-2', 'px-[10px] py-1.5')}>
              <Text>Nenhum dado cadastrado</Text>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
