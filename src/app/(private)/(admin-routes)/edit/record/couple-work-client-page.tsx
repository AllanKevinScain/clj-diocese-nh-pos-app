'use client';

import { yupResolver } from '@hookform/resolvers/yup';
import { FormProvider, useForm } from 'react-hook-form';

import { EditRecordBottomBar } from '@/components';
import { CoupleForm } from '@/components/forms';
import { useRecords } from '@/hooks';
import type { CompleteRecordInterface } from '@/types';
import type { CoupleSchemaInfertype } from '@/yup';
import { coupleSchema } from '@/yup';

interface EditRecordCoupleClientPageInterface {
  record: CompleteRecordInterface;
}

export const EditRecordCoupleClientPage = (props: EditRecordCoupleClientPageInterface) => {
  const { record } = props;
  const { editRecord, isFetching } = useRecords();

  const methods = useForm<CoupleSchemaInfertype>({
    resolver: yupResolver(coupleSchema),
    defaultValues: record,
  });

  async function onSubmit(record: CoupleSchemaInfertype) {
    await editRecord({ data: record });
  }

  return (
    <>
      <FormProvider {...methods}>
        <CoupleForm onSubmit={onSubmit} isSending={isFetching} />
      </FormProvider>
      <EditRecordBottomBar id={record.id} />
    </>
  );
};
