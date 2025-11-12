'use client';

// import { useFormContext, useWatch } from 'react-hook-form';

// import { FieldSetRadio } from '@/components/field-set-radio';
// import { FieldTextarea } from '@/components/field-text-area';
// import type { CoupleSchemaInfertype } from '@/yup';

// import type { CoupleFormInterface } from '.';

export const CoursesTwoDoneFields = (/* props: Pick<CoupleFormInterface, 'isDisabled'> */) => {
  /* const { isDisabled } = props;

  const { control, setValue } = useFormContext<CoupleSchemaInfertype>();

  const hasCourseTwo = useWatch({
    control,
    name: 'recordCouple.hasCourseTwo',
  });

  return (
    <>
      <FieldSetRadio
        id="recordCouple.hasCourseTwo"
        disabled={isDisabled}
        control={control}
        label="Fez cursos CLJ II?"
        options={[
          { label: 'Sim', value: true },
          { label: 'Não', value: false },
        ]}
        customOnChange={(e) => {
          if (!e) setValue('recordCouple.coursesTwoDone', null);
        }}
      />
      {hasCourseTwo && (
        <FieldTextarea
          id="recordCouple.coursesTwoDone"
          disabled={isDisabled}
          control={control}
          label="Quais cursos CLJ II?"
          maxLength={100}
        />
      )}
    </>
  ); */

  return <></>;
};
