'use client';

import { yupResolver } from '@hookform/resolvers/yup';
import { FormProvider, useForm } from 'react-hook-form';

import { ViewRecordBottomBar } from '@/components';
import { PoslllForm } from '@/components/forms';
import type { CompleteRecordInterface } from '@/types';
import type { CandidatePoslllSchemaInfertype } from '@/yup';
import { candidatePoslllSchema } from '@/yup';

interface ViewRecordPoslllClientPageInterface {
  record: CompleteRecordInterface;
}

export const ViewRecordPoslllClientPage = (props: ViewRecordPoslllClientPageInterface) => {
  const { record } = props;

  const methods = useForm<CandidatePoslllSchemaInfertype>({
    resolver: yupResolver(candidatePoslllSchema),
    defaultValues: record,
  });

  return (
    <>
      <FormProvider {...methods}>
        <PoslllForm onSubmit={() => null} isDisabled />
      </FormProvider>
      <ViewRecordBottomBar
        redirectEditUrl={`/edit/record?id=${record.id}`}
        redirectBackUrl={`/courses/${record.courseNumber}/${record.typeOfRecord?.toLowerCase()}`}
      />
    </>
  );
};
