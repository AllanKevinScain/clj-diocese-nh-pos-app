'use client';

import { isEmpty } from 'lodash';
import { useFormContext, useWatch } from 'react-hook-form';

import { FieldDefault } from '@/components/field-default';
import { FieldSetRadio } from '@/components/field-set-radio';

import type { PoslFormInterface, PoslSchemaInfertype } from '.';

export const MedicationFields = (props: Pick<PoslFormInterface, 'isDisabled'>) => {
  const { isDisabled } = props;

  const { control, setValue } = useFormContext<PoslSchemaInfertype>();

  const medication = useWatch({
    control,
    name: 'medication',
  });
  const takesMedication = useWatch({
    control,
    name: 'takesMedication',
  });

  return (
    <div>
      <FieldSetRadio
        disabled={isDisabled}
        control={control}
        id="takesMedication"
        label="Toma Medicação"
        defaultValue={!isEmpty(medication)}
        options={[
          { label: 'Sim', value: true },
          { label: 'Não', value: false },
        ]}
        customOnChange={(e) => {
          if (!e) setValue('medication', null);
        }}
      />
      {takesMedication && (
        <FieldDefault disabled={isDisabled} id="medication" control={control} label="Medicação" />
      )}
    </div>
  );
};
