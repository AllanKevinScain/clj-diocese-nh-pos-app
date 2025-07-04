'use client';

import { isEmpty } from 'lodash';
import { useWatch } from 'react-hook-form';

import { FieldDefault } from '@/components/field-default';
import { FieldSetRadio } from '@/components/field-set-radio';

import type { PosllFormInterface } from '.';

export const MedicationFields = (props: Pick<PosllFormInterface, 'control' | 'isDisabled'>) => {
  const { control, isDisabled } = props;

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
      />
      {takesMedication && (
        <FieldDefault disabled={isDisabled} id="medication" control={control} label="Medicação" />
      )}
    </div>
  );
};
