'use client';

import { yupResolver } from '@hookform/resolvers/yup';
import { redirect } from 'next/navigation';
import { FormProvider, useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import type { InferType } from 'yup';

import { WorkForm } from '@/components/forms';
import { useRecords } from '@/hooks';
import type { RecordWorkResponseInterface } from '@/types';
import { workSchema } from '@/yup';

import { EditRecordBottomBar } from './edit-record-bottom-bar';

type WorkSchemaInfertype = InferType<typeof workSchema>;

interface EditRecordWorkClientPageInterface {
  record: RecordWorkResponseInterface;
}

export const EditRecordWorkClientPage = (props: EditRecordWorkClientPageInterface) => {
  const { record } = props;
  const { editRecord } = useRecords();

  const methods = useForm<WorkSchemaInfertype>({
    resolver: yupResolver(workSchema),
    defaultValues: record,
  });

  async function onSubmit(record: WorkSchemaInfertype) {
    const res = await editRecord({ typeOfRecord: 'WORK', data: record });

    if (!res?.ok) {
      toast.error(res.data.message);
    } else {
      toast.success(res.data.message);
      redirect(`/courses`);
    }
  }

  return (
    <>
      <FormProvider {...methods}>
        <WorkForm onSubmit={onSubmit} />
      </FormProvider>
      <EditRecordBottomBar recordId={record.id} />
    </>
  );
};
