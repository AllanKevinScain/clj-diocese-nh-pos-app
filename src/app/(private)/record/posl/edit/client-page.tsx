'use client';

import { yupResolver } from '@hookform/resolvers/yup';
import { redirect } from 'next/navigation';
import { FormProvider, useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import type { InferType } from 'yup';

import { PoslForm } from '@/components/forms';
import { useRecords } from '@/hooks';
import { poslSchema } from '@/yup';

import type { RecordPoslResponseInterface } from '../posl-server-call.type';
import { EditRecordBottomBar } from './edit-record-bottom-bar';

type PoslSchemaInfertype = InferType<typeof poslSchema>;

interface EditRecordPoslClientPageInterface {
  record: RecordPoslResponseInterface;
}

export const EditRecordPoslClientPage = (props: EditRecordPoslClientPageInterface) => {
  const { record } = props;
  const { editRecord } = useRecords();

  const methods = useForm<PoslSchemaInfertype>({
    resolver: yupResolver(poslSchema),
    defaultValues: record,
  });

  async function onSubmit(record: PoslSchemaInfertype) {
    const res = await editRecord({ typeOfRecord: 'POSl', data: record });

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
        <PoslForm onSubmit={onSubmit} />
      </FormProvider>
      <EditRecordBottomBar recordId={record.id} />
    </>
  );
};
