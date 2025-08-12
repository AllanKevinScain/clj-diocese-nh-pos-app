'use client';

import { useFormContext, useWatch } from 'react-hook-form';

import { FieldDefault } from '@/components/field-default';
import { FieldSetCheckbox } from '@/components/field-set-checkbox';

import type { PoslFormInterface, PoslSchemaInfertype } from '.';

export const ParentsFields = (props: Pick<PoslFormInterface, 'isDisabled'>) => {
  const { isDisabled } = props;

  const { control, setValue } = useFormContext<PoslSchemaInfertype>();

  const livesWith = useWatch({
    control,
    name: 'recordPOSl.livesWith',
  });

  return (
    <>
      <FieldSetCheckbox
        disabled={isDisabled}
        control={control}
        id="recordPOSl.livesWith"
        label="Mora com"
        options={[
          { id: 'mae', label: 'Mãe' },
          { id: 'pai', label: 'Pai' },
          { id: 'outro', label: 'Outro' },
        ]}
        customOnChange={(e) => {
          if (e === 'outro') setValue('recordPOSl.otherWho', null);
        }}
      />
      {livesWith && livesWith.includes('outro') && (
        <FieldDefault
          disabled={isDisabled}
          id="recordPOSl.otherWho"
          control={control}
          label="Quem"
        />
      )}
    </>
  );
};
