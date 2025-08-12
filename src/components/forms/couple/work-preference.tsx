'use client';

import { useFormContext, useWatch } from 'react-hook-form';

import { FieldSetRadio } from '@/components/field-set-radio';

import type { CoupleFormInterface, CoupleSchemaInfertype } from '.';

export const WorkPreferenceFields = (props: Pick<CoupleFormInterface, 'isDisabled'>) => {
  const { isDisabled } = props;

  const { control, setValue } = useFormContext<CoupleSchemaInfertype>();

  const workPreference = useWatch({
    control,
    name: 'recordCouple.workPreference',
  });

  return (
    <>
      <FieldSetRadio
        id="recordCouple.workPreference"
        disabled={isDisabled}
        control={control}
        label="Preferência de trabalho neste curso"
        options={[
          { label: 'Sala', value: 'sala' },
          { label: 'Cozinha', value: 'cozinha' },
          { label: 'Sem preferência', value: 'sem-preferencia' },
        ]}
        customOnChange={(e) => {
          if (e === 'sala') {
            setValue('recordCouple.externalCouple', null);
            setValue('recordCouple.cookCouple', null);
          }
        }}
      />
      {workPreference !== 'sala' && (
        <>
          <FieldSetRadio
            id="recordCouple.externalCouple"
            disabled={isDisabled}
            control={control}
            label="Aceitariam ser casal Externo/Cafeteiro?"
            options={[
              { label: 'Sim', value: true },
              { label: 'Não', value: false },
            ]}
          />
          <FieldSetRadio
            id="recordCouple.cookCouple"
            disabled={isDisabled}
            control={control}
            label="Aceitariam ser Casal Cozinheiro?"
            options={[
              { label: 'Sim', value: true },
              { label: 'Não', value: false },
            ]}
          />
        </>
      )}
    </>
  );
};
