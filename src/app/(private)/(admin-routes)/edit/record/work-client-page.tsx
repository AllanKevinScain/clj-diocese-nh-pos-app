'use client';

import { yupResolver } from '@hookform/resolvers/yup';
import { FormProvider, useForm } from 'react-hook-form';

import { EditRecordBottomBar } from '@/components';
import { WorkForm } from '@/components/forms';
import { useRecords } from '@/hooks';
import type { CompleteRecordInterface } from '@/types';
import type { WorkSchemaInfertype } from '@/yup';
import { workSchema } from '@/yup';

interface EditRecordWorkClientPageInterface {
  record: CompleteRecordInterface;
}

export const EditRecordWorkClientPage = (props: EditRecordWorkClientPageInterface) => {
  const { record } = props;
  const { editRecord, isFetching } = useRecords();

  const methods = useForm<WorkSchemaInfertype>({
    resolver: yupResolver(workSchema),
    defaultValues: record,
  });

  async function onSubmit(record: WorkSchemaInfertype) {
    await editRecord({ data: record });
  }

  return (
    <>
      <FormProvider {...methods}>
        <WorkForm onSubmit={onSubmit} isSending={isFetching} />
      </FormProvider>
      <EditRecordBottomBar id={record.id} typeOfRecord={record.typeOfRecord} />
    </>
  );
};
