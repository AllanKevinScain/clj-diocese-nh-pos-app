'use client';

import { Description, Field, Label, Textarea } from '@headlessui/react';
import type { FieldValues, Path, PathValue } from 'react-hook-form';
import { Controller } from 'react-hook-form';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';
import { twMerge } from 'tailwind-merge';

import type { FieldDefaultInterface } from './field-textarea.type';

export const FieldTextarea = <T extends FieldValues>(props: FieldDefaultInterface<T>) => {
  const { control, id, defaultValue, isLoading = false, label, className, ...restProps } = props;

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
      render={({ field, formState }) => {
        const { errors } = formState;

        return (
          <Field className="w-full">
            {!!label && (
              <Label className={twMerge('flex gap-[4px]', 'text-[16px] font-[500]')}>
                <span className="text-neutral-800">{label}</span>
              </Label>
            )}
            <Textarea
              {...restProps}
              {...field}
              ref={field.ref}
              placeholder={restProps.placeholder ?? 'Digite aqui'}
              className={twMerge(
                'resize-none',
                'border border-gray-300',
                `w-full rounded-md px-3 py-2 transition-all`,
                'focus:border-transparent focus:ring-2 focus:ring-blue-500 focus:outline-none',
                'disabled:cursor-not-allowed disabled:bg-gray-100',
                typeof className === 'string' && className,
              )}
              rows={3}
            />

            {!!errors[id]?.message && (
              <Description className="text-xs text-red-500">{`${errors[id]?.message}`}</Description>
            )}
          </Field>
        );
      }}
    />
  );
};
