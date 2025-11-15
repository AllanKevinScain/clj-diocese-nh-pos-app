'use client';

// import { useFormContext, useWatch } from 'react-hook-form';

// import { FieldSetRadio } from '@/components/field-set-radio';
// import { FieldTextarea } from '@/components/field-text-area';
// import type { CoupleSchemaInfertype } from '@/yup';

// import type { CoupleFormInterface } from '.';

export const CoursesOneDoneFields = (/* props: Pick<CoupleFormInterface, 'isDisabled'> */) => {
  /* const { isDisabled } = props;

  const { control, setValue } = useFormContext<CoupleSchemaInfertype>();

  const hasCourseOne = useWatch({
    control,
    name: 'recordCouple.hasCourseOne',
  });

  return (
    <>
      <FieldSetRadio
        id="recordCouple.hasCourseOne"
        disabled={isDisabled}
        control={control}
        label="Fez cursos CLJ I?"
        options={[
          { label: 'Sim', value: true },
          { label: 'Não', value: false },
        ]}
        customOnChange={(e) => {
          if (!e) setValue('recordCouple.coursesOneDone', null);
        }}
      />
      {hasCourseOne && (
        <FieldTextarea
          id="recordCouple.coursesOneDone"
          disabled={isDisabled}
          control={control}
          label="Quais cursos CLJ I?"
          maxLength={100}
        />
      )}
    </>
  ); */

  return <></>;
};
