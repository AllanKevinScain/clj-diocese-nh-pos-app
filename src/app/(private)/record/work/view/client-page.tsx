'use client';

import { yupResolver } from '@hookform/resolvers/yup';
import { FormProvider, useForm } from 'react-hook-form';
import type { InferType } from 'yup';

import { WorkForm } from '@/components/forms';
import type { RecordWorkResponseInterface } from '@/types';
import { workSchema } from '@/yup';

import { ViewRecordBottomBar } from './view-record-bottom-bar';

type WorkSchemaInfertype = InferType<typeof workSchema>;

interface ViewRecordWorkClientPageInterface {
  record: RecordWorkResponseInterface;
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
      <ViewRecordBottomBar courseNumber={record.recordNumber} recordId={record.id} />
    </>
  );
};
