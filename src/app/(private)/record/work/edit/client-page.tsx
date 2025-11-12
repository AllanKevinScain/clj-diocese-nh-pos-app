'use client';

import { yupResolver } from '@hookform/resolvers/yup';
import { FormProvider, useForm } from 'react-hook-form';
import type { InferType } from 'yup';

import { EditRecordBottomBar } from '@/components';
import { WorkForm } from '@/components/forms';
import { useRecords } from '@/hooks';
import type { RecordType, RecordWorkResponseInterface } from '@/types';
import { workSchema } from '@/yup';

type WorkSchemaInfertype = InferType<typeof workSchema>;

interface EditRecordWorkClientPageInterface {
  record: RecordWorkResponseInterface;
  typeOfRecord: RecordType;
}

export const EditRecordWorkClientPage = (props: EditRecordWorkClientPageInterface) => {
  const { record, typeOfRecord } = props;
  const { editRecord, isFetching } = useRecords();

  const methods = useForm<WorkSchemaInfertype>({
    resolver: yupResolver(workSchema),
    defaultValues: record,
  });

  async function onSubmit(record: WorkSchemaInfertype) {
    await editRecord({ typeOfRecord, data: record });
  }

  return (
    <>
      <FormProvider {...methods}>
        <WorkForm onSubmit={onSubmit} isSending={isFetching} />
      </FormProvider>
      <EditRecordBottomBar recordId={record.id} typeOfRecord={typeOfRecord} />
    </>
  );
};
