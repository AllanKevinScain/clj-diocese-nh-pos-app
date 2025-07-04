'use client';

import { isEmpty } from 'lodash';
import { useWatch } from 'react-hook-form';

import { FieldDefault } from '@/components/field-default';
import { FieldSetRadio } from '@/components/field-set-radio';

import type { PosllFormInterface } from '.';

export const ConfirmationFields = (props: Pick<PosllFormInterface, 'control' | 'isDisabled'>) => {
  const { control, isDisabled } = props;

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
    <div>
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
    </div>
  );
};
