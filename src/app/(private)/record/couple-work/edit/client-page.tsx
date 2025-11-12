'use client';

import { yupResolver } from '@hookform/resolvers/yup';
import { FormProvider, useForm } from 'react-hook-form';

import { EditRecordBottomBar } from '@/components';
import { CoupleForm } from '@/components/forms';
import { useRecords } from '@/hooks';
import type { RecordCoupleResponseInterface, RecordType } from '@/types';
import type { CoupleSchemaInfertype } from '@/yup';
import { coupleSchema } from '@/yup';

interface EditRecordCoupleClientPageInterface {
  record: RecordCoupleResponseInterface;
  typeOfRecord: RecordType;
}

export const EditRecordCoupleClientPage = (props: EditRecordCoupleClientPageInterface) => {
  const { record, typeOfRecord } = props;
  const { editRecord, isFetching } = useRecords();

  const methods = useForm<CoupleSchemaInfertype>({
    resolver: yupResolver(coupleSchema),
    defaultValues: record,
  });

  async function onSubmit(record: CoupleSchemaInfertype) {
    await editRecord({ typeOfRecord, data: record });
  }

  return (
    <>
      <FormProvider {...methods}>
        <CoupleForm onSubmit={onSubmit} isSending={isFetching} />
      </FormProvider>
      <EditRecordBottomBar recordId={record.id} typeOfRecord={typeOfRecord} />
    </>
  );
};
