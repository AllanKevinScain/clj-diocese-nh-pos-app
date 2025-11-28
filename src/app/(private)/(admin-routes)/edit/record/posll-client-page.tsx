'use client';

import { yupResolver } from '@hookform/resolvers/yup';
import { FormProvider, useForm } from 'react-hook-form';

import { EditRecordBottomBar } from '@/components';
import { PosllForm } from '@/components/forms';
import { useRecords } from '@/hooks';
import type { CompleteRecordInterface } from '@/types';
import type { PosllSchemaInfertype } from '@/yup';
import { posllSchema } from '@/yup';

interface EditRecordPosllClientPageInterface {
  record: CompleteRecordInterface;
}

export const EditRecordPosllClientPage = (props: EditRecordPosllClientPageInterface) => {
  const { record } = props;
  const { editRecord, isFetching } = useRecords();

  const methods = useForm<PosllSchemaInfertype>({
    resolver: yupResolver(posllSchema),
    defaultValues: record,
  });

  async function onSubmit(record: PosllSchemaInfertype) {
    await editRecord({ typeOfRecord: 'POSll', data: record });
  }

  return (
    <>
      <FormProvider {...methods}>
        <PosllForm onSubmit={onSubmit} isSending={isFetching} />
      </FormProvider>
      <EditRecordBottomBar id={record.id} />
    </>
  );
};
