'use client';

import { yupResolver } from '@hookform/resolvers/yup';
import { FormProvider, useForm } from 'react-hook-form';
import type { InferType } from 'yup';

import { EditRecordBottomBar } from '@/components';
import { PoslForm } from '@/components/forms';
import { useRecords } from '@/hooks';
import type { RecordPoslResponseInterface } from '@/types';
import { poslSchema } from '@/yup';

type PoslSchemaInfertype = InferType<typeof poslSchema>;

interface EditRecordPoslClientPageInterface {
  record: RecordPoslResponseInterface;
}

export const EditRecordPoslClientPage = (props: EditRecordPoslClientPageInterface) => {
  const { record } = props;
  const { editRecord, isFetching } = useRecords();

  const methods = useForm<PoslSchemaInfertype>({
    resolver: yupResolver(poslSchema),
    defaultValues: record,
  });

  async function onSubmit(record: PoslSchemaInfertype) {
    await editRecord({ typeOfRecord: 'POSl', data: record });
  }

  return (
    <>
      <FormProvider {...methods}>
        <PoslForm onSubmit={onSubmit} isSending={isFetching} />
      </FormProvider>
      <EditRecordBottomBar recordId={record.id} recordType="POSl" />
    </>
  );
};
