'use client';

import { isEmpty } from 'lodash';
import { useFormContext, useWatch } from 'react-hook-form';

import { FieldDefault } from '@/components/field-default';
import { FieldSetRadio } from '@/components/field-set-radio';

import type { WorkFormInterface, WorkSchemaInfertype } from '.';

export const ConfirmationFields = (props: Pick<WorkFormInterface, 'isDisabled'>) => {
  const { isDisabled } = props;

  const { control, setValue } = useFormContext<WorkSchemaInfertype>();

  const hasConfirmation = useWatch({
    control,
    name: 'recordWork.hasConfirmation',
  });
  const doingConfirmation = useWatch({
    control,
    name: 'recordWork.doingConfirmation',
  });
  const notConfirmationBecause = useWatch({
    control,
    name: 'recordWork.notConfirmationBecause',
  });

  return (
    <div>
      <FieldSetRadio
        disabled={isDisabled}
        control={control}
        id="recordWork.hasConfirmation"
        defaultValue={!!doingConfirmation}
        label="É Crismado?"
        options={[
          { label: 'Sim', value: true },
          { label: 'Não', value: false },
        ]}
        customOnChange={(e) => {
          if (e) setValue('recordWork.doingConfirmation', null);
          if (e) setValue('recordWork.notConfirmationBecause', null);
        }}
      />
      {hasConfirmation === false && hasConfirmation !== null && (
        <FieldSetRadio
          disabled={isDisabled}
          control={control}
          id="recordWork.doingConfirmation"
          defaultValue={!isEmpty(notConfirmationBecause)}
          label="Esta fazendo a Crisma?"
          options={[
            { label: 'Sim', value: true },
            { label: 'Não', value: false },
          ]}
          customOnChange={(e) => {
            if (e) setValue('recordWork.notConfirmationBecause', null);
          }}
        />
      )}
      {doingConfirmation === false && doingConfirmation !== null && (
        <FieldDefault
          disabled={isDisabled}
          id="recordWork.notConfirmationBecause"
          control={control}
          label="Não, por quê?"
        />
      )}
    </div>
  );
};
