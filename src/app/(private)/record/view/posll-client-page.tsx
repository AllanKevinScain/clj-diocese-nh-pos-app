'use client';

import { yupResolver } from '@hookform/resolvers/yup';
import { FormProvider, useForm } from 'react-hook-form';

import { ViewRecordBottomBar } from '@/components';
import { PosllForm } from '@/components/forms';
import type { CompleteRecordInterface } from '@/types';
import type { CandidatePosllSchemaInfertype } from '@/yup';
import { candidatePosllSchema } from '@/yup';

interface ViewRecordPosllClientPageInterface {
  record: CompleteRecordInterface;
}

export const ViewRecordPosllClientPage = (props: ViewRecordPosllClientPageInterface) => {
  const { record } = props;

  const methods = useForm<CandidatePosllSchemaInfertype>({
    resolver: yupResolver(candidatePosllSchema),
    defaultValues: record,
  });

  return (
    <>
      <FormProvider {...methods}>
        <PosllForm onSubmit={() => null} isDisabled />
      </FormProvider>
      <ViewRecordBottomBar
        redirectEditUrl={`/edit/record?id=${record.id}`}
        redirectBackUrl={`/courses/${record.courseNumber}/${record.typeOfRecord?.toLowerCase()}`}
      />
    </>
  );
};
