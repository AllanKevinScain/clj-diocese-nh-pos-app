'use client';

import { Input } from '@headlessui/react';
import { isEmpty } from 'lodash';
import type { JSX } from 'react';
import { memo } from 'react';
import { CurrencyInput } from 'react-currency-mask';
import type { FieldValues } from 'react-hook-form';
import { twMerge } from 'tailwind-merge';

import type { ComumDecimalInputInterface } from './field-input.type';

type CustomINputDecimalDisplayNameInterface = {
  <T extends FieldValues>(_: ComumDecimalInputInterface<T>): JSX.Element;
  displayName: string;
};

export const CustomInputDecimal = memo(
  <T extends FieldValues>(props: ComumDecimalInputInterface<T>) => {
    const {
      placeholder,
      disabled,
      onChangeValue,
      showCifrao = false,
      field,
      onChange: _,
      hasError,
      ...restProps
    } = props;
    const { value, onChange, ref, ...restField } = field;

    return (
      <div className="relative w-full">
        <CurrencyInput
          hideSymbol={!showCifrao}
          value={value}
          onChangeValue={(_maskedValue, floatValue) => {
            onChangeValue?.(floatValue);
            onChange(floatValue);
          }}
          currency="BRL"
          InputElement={
            <Input
              {...restProps}
              {...restField}
              ref={ref}
              value={isEmpty(value) ? '' : value}
              disabled={disabled}
              placeholder={placeholder ?? 'Digite aqui'}
              className={twMerge(
                'border border-gray-300',
                `w-full rounded-md px-3 py-2 transition-all`,
                'focus:border-transparent focus:ring-2 focus:ring-blue-500 focus:outline-none',
                'disabled:cursor-not-allowed disabled:bg-gray-100',
                hasError && 'border-red-500',
              )}
            />
          }
        />
      </div>
    );
  },
) as CustomINputDecimalDisplayNameInterface;

CustomInputDecimal.displayName = 'CustomInputDecimal';
