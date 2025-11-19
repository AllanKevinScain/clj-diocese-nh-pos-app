'use client';

import { yupResolver } from '@hookform/resolvers/yup';
import { FormProvider, useForm } from 'react-hook-form';

import { ViewRecordBottomBar } from '@/components';
import { PoslForm } from '@/components/forms';
import type { CompleteRecordInterface } from '@/types';
import type { CandidatePoslSchemaInfertype } from '@/yup';
import { candidatePoslSchema } from '@/yup';

interface ViewRecordPoslClientPageInterface {
  record: CompleteRecordInterface;
}

export const ViewRecordPoslClientPage = (props: ViewRecordPoslClientPageInterface) => {
  const { record } = props;

  const methods = useForm<CandidatePoslSchemaInfertype>({
    resolver: yupResolver(candidatePoslSchema),
    defaultValues: record,
  });

  return (
    <>
      <FormProvider {...methods}>
        <PoslForm onSubmit={() => null} isDisabled />
      </FormProvider>
      <ViewRecordBottomBar
        redirectEditUrl={`/edit/record?id=${record.id}`}
        redirectBackUrl={`/courses/${record.courseNumber}/${record.typeOfRecord?.toLowerCase()}`}
      />
    </>
  );
};
