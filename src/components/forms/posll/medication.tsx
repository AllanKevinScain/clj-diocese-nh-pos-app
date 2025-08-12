'use client';

import { isEmpty } from 'lodash';
import { useFormContext, useWatch } from 'react-hook-form';

import { FieldDefault } from '@/components/field-default';
import { FieldSetRadio } from '@/components/field-set-radio';

import type { PosllFormInterface, PosllSchemaInfertype } from '.';

export const MedicationFields = (props: Pick<PosllFormInterface, 'isDisabled'>) => {
  const { isDisabled } = props;

  const { control, setValue } = useFormContext<PosllSchemaInfertype>();

  const medication = useWatch({
    control,
    name: 'medication',
  });
  const takesMedication = useWatch({
    control,
    name: 'takesMedication',
  });

  return (
    <>
      <FieldSetRadio
        disabled={isDisabled}
        control={control}
        id="takesMedication"
        label="Precisa tomar alguma medicação"
        defaultValue={!isEmpty(medication)}
        options={[
          { label: 'Sim', value: true },
          { label: 'Não', value: false },
        ]}
        customOnChange={(e) => {
          if (!e) setValue('disease', null);
        }}
      />
      {takesMedication && (
        <FieldDefault
          disabled={isDisabled}
          id="medication"
          control={control}
          label="Medicação"
          maxLength={100}
        />
      )}
    </>
  );
};
