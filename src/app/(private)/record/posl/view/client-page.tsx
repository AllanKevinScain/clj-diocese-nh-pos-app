'use client';

import { yupResolver } from '@hookform/resolvers/yup';
import { FormProvider, useForm } from 'react-hook-form';
import type { InferType } from 'yup';

import { PoslForm } from '@/components/forms';
import type { RecordPoslResponseInterface } from '@/types';
import { poslSchema } from '@/yup';

import { ViewRecordBottomBar } from './view-record-bottom-bar';

type PoslSchemaInfertype = InferType<typeof poslSchema>;

interface ViewRecordPoslClientPageInterface {
  record: RecordPoslResponseInterface;
}

export const ViewRecordPoslClientPage = (props: ViewRecordPoslClientPageInterface) => {
  const { record } = props;

  const methods = useForm<PoslSchemaInfertype>({
    resolver: yupResolver(poslSchema),
    defaultValues: record,
  });

  return (
    <>
      <FormProvider {...methods}>
        <PoslForm onSubmit={() => null} isDisabled />
      </FormProvider>
      <ViewRecordBottomBar courseNumber={record.recordNumber} recordId={record.id} />
    </>
  );
};
