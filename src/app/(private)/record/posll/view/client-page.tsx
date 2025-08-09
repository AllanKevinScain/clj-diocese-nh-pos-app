'use client';

import { yupResolver } from '@hookform/resolvers/yup';
import { FormProvider, useForm } from 'react-hook-form';
import type { InferType } from 'yup';

import { PosllForm } from '@/components/forms';
import type { RecordPosllResponseInterface } from '@/types';
import { posllSchema } from '@/yup';

import { ViewRecordBottomBar } from './view-record-bottom-bar';

type PosllSchemaInfertype = InferType<typeof posllSchema>;

interface ViewRecordPosllClientPageInterface {
  record: RecordPosllResponseInterface;
}

export const ViewRecordPosllClientPage = (props: ViewRecordPosllClientPageInterface) => {
  const { record } = props;

  const methods = useForm<PosllSchemaInfertype>({
    resolver: yupResolver(posllSchema),
    defaultValues: record,
  });

  return (
    <>
      <FormProvider {...methods}>
        <PosllForm onSubmit={() => null} isDisabled />
      </FormProvider>
      <ViewRecordBottomBar courseNumber={record.recordNumber} recordId={record.id} />
    </>
  );
};
