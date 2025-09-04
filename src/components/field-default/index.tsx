'use client';

import { Description, Field, Input, Label } from '@headlessui/react';
import { isEmpty } from 'lodash';
import type { JSX } from 'react';
import { memo, useState } from 'react';
import type { FieldValues, Path, PathValue } from 'react-hook-form';
import { Controller } from 'react-hook-form';
import { RiEyeCloseFill, RiEyeFill } from 'react-icons/ri';
import { twMerge } from 'tailwind-merge';
import colors from 'tailwindcss/colors';

import type { FieldDefaultInterface } from './field-input.type';

type CustomInputInterfaceWithDisplayInterface = {
  <T extends FieldValues>(_: FieldDefaultInterface<T>): JSX.Element;
  displayName: string;
};

export const FieldDefault = memo(<T extends FieldValues>(props: FieldDefaultInterface<T>) => {
  const { control, id, defaultValue, placeholder, disabled, onChangeValue, label, ...restProps } =
    props;
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
    <Controller
      name={id}
      control={control}
      defaultValue={defaultValue as PathValue<T, Path<T>>}
      render={({ field, fieldState: { error } }) => {
        const hasError = !!error?.message;
        const { value, onChange, ref, ...restField } = field;

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

            <div className="relative flex">
              <Input
                {...restProps}
                {...restField}
                ref={ref}
                onChange={(e) => {
                  let formated = e.target.value;
                  if (restProps.onChange) formated = restProps.onChange(e.target.value);
                  if (onChangeValue) onChangeValue(formated);
                  onChange(formated);
                }}
                type={type}
                value={isEmpty(value) ? '' : value}
                disabled={disabled}
                placeholder={placeholder ?? 'Digite aqui'}
                className={twMerge(
                  'border border-neutral-700',
                  'h-[50px] w-full rounded-[10px] bg-neutral-50 px-[10px]',
                  'focus:border-transparent focus:ring-2 focus:ring-neutral-500 focus:outline-none',
                  'disabled:c disabled:cursor-not-allowed disabled:opacity-50',
                  'placeholder:text-neutral-400',
                  'transition-all',
                  /* darkmode */
                  'dark:bg-neutral-800 dark:text-neutral-200 dark:focus:ring-neutral-300',
                  'dark:disabled:bg-neutral-700',
                  restProps.className,
                  hasError && 'border-red-500',
                )}
              />
              {restProps.type === 'password' && (
                <span className="absolute top-[14px] right-[10px]" onClick={handleToggle}>
                  {showPassword ? (
                    <RiEyeFill size={25} color={colors.neutral[400]} />
                  ) : (
                    <RiEyeCloseFill size={25} color={colors.neutral[400]} />
                  )}
                </span>
              )}
            </div>
            {hasError && (
              <Description className="text-xs text-red-500">{error?.message}</Description>
            )}
          </Field>
        );
      }}
    />
  );
}) as CustomInputInterfaceWithDisplayInterface;

FieldDefault.displayName = 'FieldDefault';
