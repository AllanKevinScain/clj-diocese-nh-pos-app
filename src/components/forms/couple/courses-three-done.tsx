'use client';

import { useFormContext, useWatch } from 'react-hook-form';

import { FieldSetRadio } from '@/components/field-set-radio';
import { FieldTextarea } from '@/components/field-text-area';

import type { CoupleFormInterface, CoupleSchemaInfertype } from '.';

export const CoursesThreeDoneFields = (props: Pick<CoupleFormInterface, 'isDisabled'>) => {
  const { isDisabled } = props;

  const { control, setValue } = useFormContext<CoupleSchemaInfertype>();

  const hasCourseThree = useWatch({
    control,
    name: 'recordCouple.hasCourseThree',
  });

  return (
    <>
      <FieldSetRadio
        id="recordCouple.hasCourseThree"
        disabled={isDisabled}
        control={control}
        label="Fez cursos CLJ III?"
        options={[
          { label: 'Sim', value: true },
          { label: 'Não', value: false },
        ]}
        customOnChange={(e) => {
          if (!e) setValue('recordCouple.coursesThreeDone', null);
        }}
      />
      {hasCourseThree && (
        <FieldTextarea
          id="recordCouple.coursesThreeDone"
          disabled={isDisabled}
          control={control}
          label="Quais cursos CLJ III?"
          maxLength={100}
        />
      )}
    </>
  );
};
