'use client';

import { yupResolver } from '@hookform/resolvers/yup';
import { FormProvider, useForm } from 'react-hook-form';
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
  const { editRecord, isFetching } = useRecords();

  const methods = useForm<CoupleSchemaInfertype>({
    resolver: yupResolver(coupleSchema),
    defaultValues: record,
  });

  async function onSubmit(record: CoupleSchemaInfertype) {
    await editRecord({ typeOfRecord: 'COUPLE_WORK', data: record });
  }

  return (
    <>
      <FormProvider {...methods}>
        <CoupleForm onSubmit={onSubmit} isSending={isFetching} />
      </FormProvider>
      <EditRecordBottomBar recordId={record.id} recordType="COUPLE_WORK" />
    </>
  );
};
