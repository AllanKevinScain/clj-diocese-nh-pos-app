'use client';

import { Input } from '@headlessui/react';
import { isEmpty } from 'lodash';
import type { JSX } from 'react';
import { memo } from 'react';
import type { FieldValues } from 'react-hook-form';
import { twMerge } from 'tailwind-merge';

import type { ComumDefaultInputInterface } from './field-input.type';

type CustomInputPadraoInterfaceWithDisplayInterface = {
  <T extends FieldValues>(_: ComumDefaultInputInterface<T>): JSX.Element;
  displayName: string;
};

export const CustomInputPadrao = memo(
  <T extends FieldValues>(props: ComumDefaultInputInterface<T>) => {
    const { field, disabled, placeholder } = props;
    const { value, ...restField } = field;

    return (
      <Input
        {...restField}
        value={isEmpty(value) ? '' : value}
        disabled={disabled}
        placeholder={placeholder ?? 'Digite aqui'}
        className={twMerge(
          'border border-gray-300',
          `w-full rounded-md px-3 py-2 transition-all`,
          'focus:border-transparent focus:ring-2 focus:ring-blue-500 focus:outline-none',
          'disabled:cursor-not-allowed disabled:bg-gray-100',
        )}
      />
    );
  },
) as CustomInputPadraoInterfaceWithDisplayInterface;

CustomInputPadrao.displayName = 'CustomInputPadrao';
