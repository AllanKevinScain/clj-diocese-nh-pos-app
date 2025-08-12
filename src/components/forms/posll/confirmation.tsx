'use client';

import { isEmpty } from 'lodash';
import { useFormContext, useWatch } from 'react-hook-form';

import { FieldDefault } from '@/components/field-default';
import { FieldSetRadio } from '@/components/field-set-radio';

import type { PosllFormInterface, PosllSchemaInfertype } from '.';

export const ConfirmationFields = (props: Pick<PosllFormInterface, 'isDisabled'>) => {
  const { isDisabled } = props;

  const { control, setValue } = useFormContext<PosllSchemaInfertype>();

  const hasConfirmation = useWatch({
    control,
    name: 'recordPOSll.hasConfirmation',
  });
  const doingConfirmation = useWatch({
    control,
    name: 'recordPOSll.doingConfirmation',
  });
  const notConfirmationBecause = useWatch({
    control,
    name: 'recordPOSll.notConfirmationBecause',
  });

  return (
    <>
      <FieldSetRadio
        disabled={isDisabled}
        control={control}
        id="recordPOSll.hasConfirmation"
        defaultValue={!!doingConfirmation}
        label="É Crismado?"
        options={[
          { label: 'Sim', value: true },
          { label: 'Não', value: false },
        ]}
        customOnChange={(e) => {
          if (e) setValue('recordPOSll.doingConfirmation', null);
          if (e) setValue('recordPOSll.notConfirmationBecause', null);
        }}
      />
      {hasConfirmation === false && (
        <FieldSetRadio
          disabled={isDisabled}
          control={control}
          id="recordPOSll.doingConfirmation"
          defaultValue={!isEmpty(notConfirmationBecause)}
          label="Esta fazendo a Crisma?"
          options={[
            { label: 'Sim', value: true },
            { label: 'Não', value: false },
          ]}
          customOnChange={(e) => {
            if (e) setValue('recordPOSll.notConfirmationBecause', null);
          }}
        />
      )}
      {doingConfirmation === false && (
        <FieldDefault
          disabled={isDisabled}
          id="recordPOSll.notConfirmationBecause"
          control={control}
          label="Não, por quê?"
        />
      )}
    </>
  );
};
