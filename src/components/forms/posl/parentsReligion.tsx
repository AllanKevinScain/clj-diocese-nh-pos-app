'use client';

// import { useFormContext, useWatch } from 'react-hook-form';

// import { FieldDefault } from '@/components/field-default';
// import { FieldSetRadio } from '@/components/field-set-radio';
// import type { PoslSchemaInfertype } from '@/yup';

// import type { PoslFormInterface } from '.';

export const ParentsReligionFields = (/* props: Pick<PoslFormInterface, 'isDisabled'> */) => {
  /* const { isDisabled } = props;

  const { control, setValue } = useFormContext<PoslSchemaInfertype>();

  const parentsReligion = useWatch({
    control,
    name: 'recordPOSl.parentsReligion',
  });

  return (
    <>
      <FieldSetRadio
        disabled={isDisabled}
        control={control}
        id="recordPOSl.parentsReligion"
        label="Religião dos Pais"
        options={[
          { value: 'catolicos', label: 'Católicos' },
          { value: 'outro', label: 'Outro' },
        ]}
        customOnChange={(e) => {
          if (e === 'outro') setValue('recordPOSl.otherReligion', null);
        }}
      />
      {parentsReligion && parentsReligion.includes('outro') && (
        <FieldDefault
          disabled={isDisabled}
          id="recordPOSl.otherReligion"
          control={control}
          label="Outra Religião Associada"
        />
      )}
    </>
  ); */
  return <></>;
};
