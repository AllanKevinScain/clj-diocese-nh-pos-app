'use client';

import { isEmpty } from 'lodash';
import { useWatch } from 'react-hook-form';

import { FieldDefault } from '@/components/field-default';
import { FieldSetRadio } from '@/components/field-set-radio';

import type { PosllFormInterface } from '.';

export const DiseaseFields = (props: Pick<PosllFormInterface, 'control' | 'isDisabled'>) => {
  const { control, isDisabled } = props;

  const hasDisease = useWatch({
    control,
    name: 'hasDisease',
  });
  const disease = useWatch({
    control,
    name: 'disease',
  });

  return (
    <div>
      <FieldSetRadio
        disabled={isDisabled}
        control={control}
        id="hasDisease"
        defaultValue={!isEmpty(disease)}
        label="Tem Doença"
        options={[
          { label: 'Sim', value: true },
          { label: 'Não', value: false },
        ]}
      />
      {hasDisease && (
        <FieldDefault disabled={isDisabled} id="disease" control={control} label="Doença" />
      )}
    </div>
  );
};
