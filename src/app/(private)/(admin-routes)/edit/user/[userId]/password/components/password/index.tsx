'use client';

import { isEmpty } from 'lodash';
import type { Control, FieldErrors, FieldValues, Path } from 'react-hook-form';
import { useWatch } from 'react-hook-form';
import { twMerge } from 'tailwind-merge';

import { FieldDefault, Text } from '@/components';

interface PasswordInterface<T extends FieldValues> {
  control: Control<T>;
  id: Path<T>;
  errors: FieldErrors<T>;
  label: string;
  helpText?: string;
}

export const Password = <T extends FieldValues>(props: PasswordInterface<T>) => {
  const { id, control, errors, label, helpText } = props;

  const password = useWatch({
    control,
    name: id,
  });

  return (
    <div className="flex flex-col gap-2">
      <FieldDefault id={id} control={control} label={label} type="password" />
      {errors.password && (
        <div className="flex flex-col gap-[10px]">
          <Text>A senha precisa de alguns requisitos:</Text>
          <Text
            className={twMerge(
              /[0-9]/.test(password ?? '') && !isEmpty(password)
                ? 'text-green-500'
                : 'text-red-500',
            )}>
            Um número.
          </Text>
          <Text
            className={twMerge(
              /[a-z]/.test(password ?? '') && !isEmpty(password)
                ? 'text-green-500'
                : 'text-red-500',
            )}>
            Uma letra minúscula.
          </Text>
          <Text
            className={twMerge(
              /[!@#$%^&*()_\-+={}[\]|:;"'<>,.?/]/.test(password ?? '') && !isEmpty(password)
                ? 'text-green-500'
                : 'text-red-500',
            )}>
            Um caractere especial.
          </Text>
          <Text className={twMerge(password.length > 8 ? 'text-green-500' : 'text-red-500')}>
            No mínimo 8 caracteres.
          </Text>
        </div>
      )}
      {helpText && <Text className="text-xs">{helpText}</Text>}
    </div>
  );
};
