'use client';

import { yupResolver } from '@hookform/resolvers/yup';
import { redirect } from 'next/navigation';
import { FormProvider, useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import type { InferType } from 'yup';

import { EditRecordBottomBar } from '@/components';
import { CoupleForm } from '@/components/forms';
import { useRecords } from '@/hooks';
import type { RecordCoupleResponseInterface } from '@/types';
import { coupleSchema } from '@/yup';

type CoupleSchemaInfertype = InferType<typeof coupleSchema>;

interface EditRecordCoupleClientPageInterface {
  record: RecordCoupleResponseInterface;
}

export const EditRecordCoupleClientPage = (props: EditRecordCoupleClientPageInterface) => {
  const { record } = props;
  const { editRecord } = useRecords();

  const methods = useForm<CoupleSchemaInfertype>({
    resolver: yupResolver(coupleSchema),
    defaultValues: record,
  });

  async function onSubmit(record: CoupleSchemaInfertype) {
    const res = await editRecord({ typeOfRecord: 'COUPLE_WORK', data: record });

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
        <CoupleForm onSubmit={onSubmit} />
      </FormProvider>
      <EditRecordBottomBar recordId={record.id} recordType="COUPLE_WORK" />
    </>
  );
};
