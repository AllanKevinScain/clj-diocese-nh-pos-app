'use client';

import { yupResolver } from '@hookform/resolvers/yup';
import { FormProvider, useForm } from 'react-hook-form';

import { ViewRecordBottomBar } from '@/components';
import { WorkForm } from '@/components/forms';
import type { CompleteRecordInterface } from '@/types';
import type { WorkSchemaInfertype } from '@/yup';
import { workSchema } from '@/yup';

interface ViewRecordWorkClientPageInterface {
  record: CompleteRecordInterface;
}

export const ViewRecordWorkClientPage = (props: ViewRecordWorkClientPageInterface) => {
  const { record } = props;

  const methods = useForm<WorkSchemaInfertype>({
    resolver: yupResolver(workSchema),
    defaultValues: record,
  });

  return (
    <>
      <FormProvider {...methods}>
        <WorkForm onSubmit={() => null} isDisabled />
      </FormProvider>
      <ViewRecordBottomBar
        redirectEditUrl={`/edit/record?id=${record.id}`}
        redirectBackUrl={`/courses/${record.courseNumber}/${record.typeOfRecord?.toLowerCase()}`}
      />
    </>
  );
};
