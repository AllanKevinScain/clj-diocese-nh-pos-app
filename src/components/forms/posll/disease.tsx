'use client';

import { isEmpty } from 'lodash';
import { useFormContext, useWatch } from 'react-hook-form';

import { FieldDefault } from '@/components/field-default';
import { FieldSetRadio } from '@/components/field-set-radio';

import type { PosllFormInterface, PosllSchemaInfertype } from '.';

export const DiseaseFields = (props: Pick<PosllFormInterface, 'isDisabled'>) => {
  const { isDisabled } = props;

  const { control, setValue } = useFormContext<PosllSchemaInfertype>();

  const hasDisease = useWatch({
    control,
    name: 'hasDisease',
  });
  const disease = useWatch({
    control,
    name: 'disease',
  });

  return (
    <>
      <FieldSetRadio
        disabled={isDisabled}
        control={control}
        id="hasDisease"
        defaultValue={!isEmpty(disease)}
        label="Possui alguma doença"
        options={[
          { label: 'Sim', value: true },
          { label: 'Não', value: false },
        ]}
        customOnChange={(e) => {
          if (!e) setValue('disease', null);
        }}
      />
      {hasDisease && (
        <FieldDefault disabled={isDisabled} id="disease" control={control} label="Doença" />
      )}
    </>
  );
};
