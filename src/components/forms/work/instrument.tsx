'use client';

// import { useFormContext, useWatch } from 'react-hook-form';

// import { FieldDefault } from '@/components/field-default';
// import { FieldSetRadio } from '@/components/field-set-radio';
// import type { WorkSchemaInfertype } from '@/yup';

// import type { WorkFormInterface } from '.';

export const InstrumentFields = (/* props: Pick<WorkFormInterface, 'isDisabled'> */) => {
  /* const { isDisabled } = props;

  const { control, setValue } = useFormContext<WorkSchemaInfertype>();

  const playInstrument = useWatch({
    control,
    name: 'recordWork.playInstrument',
  });

  return (
    <>
      <FieldSetRadio
        id="recordWork.playInstrument"
        disabled={isDisabled}
        control={control}
        label="Toca algum instrumento?"
        options={[
          { label: 'Sim', value: true },
          { label: 'Não', value: false },
        ]}
        customOnChange={(e) => {
          if (!e) setValue('recordWork.instrument', null);
        }}
      />
      {playInstrument && (
        <FieldDefault
          id="recordWork.instrument"
          disabled={isDisabled}
          control={control}
          label="Qual?"
          maxLength={200}
        />
      )}
    </>
  ); */

  return <></>;
};
