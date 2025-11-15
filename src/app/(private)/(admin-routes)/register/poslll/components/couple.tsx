'use client';

import { useController, useFormContext, useWatch } from 'react-hook-form';
import { twMerge } from 'tailwind-merge';

import { FieldDefault } from '@/components/field-default';
import { FieldSetRadio } from '@/components/field-set-radio';
import type { PoslllSchemaInferType } from '@/yup';

export const CoupleField = () => {
  const { control, setValue } = useFormContext<PoslllSchemaInferType>();

  const isCouple = useWatch({
    control,
    name: 'isCouple',
  });

  const {
    formState: {
      errors: { instagramWoman },
    },
  } = useController({
    control,
    name: 'instagramWoman',
  });

  return (
    <>
      <FieldSetRadio
        control={control}
        id="isCouple"
        label="É casal?"
        options={[
          { label: 'Sim', value: true },
          { label: 'Não', value: false },
        ]}
        customOnChange={(e) => {
          if (e) setValue('instagramWoman', null);
        }}
      />
      <div
        className={twMerge(
          'h-0 overflow-hidden px-[4px] transition-all',
          isCouple && 'h-[84px]',
          isCouple && instagramWoman?.message && 'h-[100px]',
        )}>
        <FieldDefault id="instagramWoman" control={control} label="Instagram da tia" />
      </div>
    </>
  );
};
