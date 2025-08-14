'use client';

import { Input } from '@headlessui/react';
import { isEmpty } from 'lodash';
import type { JSX } from 'react';
import { memo, useState } from 'react';
import type { FieldValues } from 'react-hook-form';
import { RiEyeCloseFill, RiEyeFill } from 'react-icons/ri';
import { twMerge } from 'tailwind-merge';

import type { ComumDefaultInputInterface } from './field-input.type';

type CustomInputPadraoInterfaceWithDisplayInterface = {
  <T extends FieldValues>(_: ComumDefaultInputInterface<T>): JSX.Element;
  displayName: string;
};

export const CustomInputPadrao = memo(
  <T extends FieldValues>(props: ComumDefaultInputInterface<T>) => {
    const {
      field,
      disabled,
      placeholder,
      showEye,
      onChange: changeField,
      onChangeValue,
      hasError,
      ...restProps
    } = props;
    const { value, onChange, ref, ...restField } = field;

    const [showPassword, setShowPassword] = useState(false);
    const [type, setType] = useState(restProps.type ?? 'text');

    const handleToggle = () => {
      if (type === 'password') {
        setType('text');
      } else {
        setType('password');
      }
      setShowPassword((s) => !s);
    };

    return (
      <div className="relative flex">
        <Input
          {...restProps}
          {...restField}
          ref={ref}
          onChange={(e) => {
            let formated = e.target.value;
            if (changeField) formated = changeField(e.target.value);
            if (onChangeValue) onChangeValue(formated);
            onChange(formated);
          }}
          type={type}
          value={isEmpty(value) ? '' : value}
          disabled={disabled}
          placeholder={placeholder ?? 'Digite aqui'}
          className={twMerge(
            'border border-gray-300',
            'w-full rounded-md px-3 py-2 transition-all',
            'focus:border-transparent focus:ring-2 focus:ring-blue-500 focus:outline-none',
            'disabled:cursor-not-allowed disabled:bg-gray-100',
            restProps.className,
            hasError && 'border-red-500',
          )}
        />
        {showEye && (
          <span
            className={twMerge(
              'flex items-center justify-around',
              'absolute top-[10px] right-[10px]',
              'cursor-pointer',
            )}
            onClick={handleToggle}>
            {showPassword ? <RiEyeFill size={25} /> : <RiEyeCloseFill size={25} />}
          </span>
        )}
      </div>
    );
  },
) as CustomInputPadraoInterfaceWithDisplayInterface;

CustomInputPadrao.displayName = 'CustomInputPadrao';
