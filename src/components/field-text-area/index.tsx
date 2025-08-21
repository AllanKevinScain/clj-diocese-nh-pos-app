'use client';

import { Description, Field, Label, Textarea } from '@headlessui/react';
import type { FieldValues, Path, PathValue } from 'react-hook-form';
import { Controller } from 'react-hook-form';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';
import { twMerge } from 'tailwind-merge';

import type { FieldDefaultInterface } from './field-textarea.type';

export const FieldTextarea = <T extends FieldValues>(props: FieldDefaultInterface<T>) => {
  const { control, id, defaultValue, isLoading = false, label, ...restProps } = props;

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
    <Controller
      name={id}
      control={control}
      defaultValue={defaultValue as PathValue<T, Path<T>>}
      render={({ field, fieldState: { error } }) => {
        const { value, ref, ...restField } = field;
        const hasError = !!error?.message;

        return (
          <Field className={twMerge('w-full', 'flex flex-col gap-[6px]')}>
            {!!label && (
              <Label
                className={twMerge(
                  'text-[16px] font-[500] text-neutral-500',
                  'dark:text-neutral-300',
                  hasError && 'text-red-500',
                )}>
                {label}
              </Label>
            )}

            <Textarea
              {...restProps}
              {...restField}
              ref={ref}
              value={value ?? ''}
              placeholder={restProps.placeholder ?? 'Digite aqui'}
              className={twMerge(
                'border border-neutral-700',
                'w-full rounded-[10px] bg-neutral-50 p-[10px]',
                'focus:border-transparent focus:ring-2 focus:ring-neutral-500 focus:outline-none',
                'disabled:cursor-not-allowed disabled:bg-neutral-200 disabled:opacity-50',
                'placeholder:text-neutral-400',
                'transition-all',
                // darkmode
                'dark:bg-neutral-800 dark:text-neutral-200 dark:focus:ring-neutral-300',
                'dark:disabled:bg-neutral-700',
                hasError && 'border-red-500',
              )}
              rows={3}
            />
            {value?.length > 0 && (
              <Description
                className={twMerge(
                  'text-[14px] font-[500] text-neutral-500',
                  'dark:text-neutral-300',
                  hasError && 'text-red-500',
                )}>
                {value?.length ?? 0} / {restProps.maxLength ?? 200}
              </Description>
            )}

            {hasError && (
              <Description className="text-xs text-red-500">{error?.message}</Description>
            )}
          </Field>
        );
      }}
    />
  );
};
