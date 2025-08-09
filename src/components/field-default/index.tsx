'use client';

import { Description, Field, Label } from '@headlessui/react';
import type { JSX } from 'react';
import { memo } from 'react';
import type { FieldValues, Path, PathValue } from 'react-hook-form';
import { Controller } from 'react-hook-form';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';
import { twMerge } from 'tailwind-merge';

import type { FieldDefaultInterface } from './field-input.type';
import { CustomInputPadrao } from './padrao';

type CustomInputInterfaceWithDisplayInterface = {
  <T extends FieldValues>(_: FieldDefaultInterface<T>): JSX.Element;
  displayName: string;
};

const WithCustomLabel = ({
  customLabel,
  children,
}: {
  customLabel: React.ReactNode;
  children: React.ReactNode;
}) => {
  if (customLabel?.toString()) {
    return (
      <div className="flex flex-col">
        {customLabel}
        {children}
      </div>
    );
  }

  return children;
};

export const FieldDefault = memo(<T extends FieldValues>(props: FieldDefaultInterface<T>) => {
  const {
    customLabel,
    control,
    id,
    defaultValue,
    isLoading = false,
    placeholder,
    disabled,
    onChangeValue,
    label,
    ...restProps
  } = props;

  if (isLoading) {
    return (
      <div
        className={twMerge(
          'min-h-[56px] bg-neutral-100',
          'rounded-[8px] border-[2px] border-solid border-neutral-400',
          'flex items-center justify-center',
        )}>
        <AiOutlineLoading3Quarters className="h-5 w-5 animate-spin" />
      </div>
    );
  }

  return (
    <WithCustomLabel customLabel={customLabel}>
      <Controller
        name={id}
        control={control}
        defaultValue={defaultValue as PathValue<T, Path<T>>}
        render={({ field, fieldState: { error } }) => {
          const hasError = !!error?.message;

          return (
            <Field className="w-full">
              {!!label && (
                <Label className={twMerge('flex gap-[4px]', 'text-[16px] font-[500]')}>
                  <span className={twMerge('text-neutral-800', hasError && 'text-red-500')}>
                    {label}
                  </span>
                </Label>
              )}

              <CustomInputPadrao
                {...restProps}
                onChangeValue={onChangeValue}
                id={id}
                field={field}
                placeholder={placeholder}
                disabled={disabled}
                hasError={hasError}
              />
              {hasError && (
                <Description className="text-xs text-red-500">{error?.message}</Description>
              )}
            </Field>
          );
        }}
      />
    </WithCustomLabel>
  );
}) as CustomInputInterfaceWithDisplayInterface;

FieldDefault.displayName = 'FieldDefault';
