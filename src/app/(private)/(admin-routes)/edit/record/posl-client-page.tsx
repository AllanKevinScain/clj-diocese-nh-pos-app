'use client';

import { yupResolver } from '@hookform/resolvers/yup';
import { FormProvider, useForm } from 'react-hook-form';

import { EditRecordBottomBar } from '@/components';
import { PoslForm } from '@/components/forms';
import { useRecords } from '@/hooks';
import type { CompleteRecordInterface } from '@/types';
import type { CandidatePoslSchemaInfertype } from '@/yup';
import { candidatePoslSchema } from '@/yup';

interface EditRecordPoslClientPageInterface {
  record: CompleteRecordInterface;
}

export const EditRecordPoslClientPage = (props: EditRecordPoslClientPageInterface) => {
  const { record } = props;
  const { editRecord, isFetching } = useRecords();

  const methods = useForm<CandidatePoslSchemaInfertype>({
    resolver: yupResolver(candidatePoslSchema),
    defaultValues: record,
  });

  async function onSubmit(record: CandidatePoslSchemaInfertype) {
    await editRecord({ typeOfRecord: 'POSl', data: record });
  }

  return (
    <>
      <FormProvider {...methods}>
        <PoslForm onSubmit={onSubmit} isSending={isFetching} />
      </FormProvider>
      <EditRecordBottomBar id={record.id} typeOfRecord="POSl" />
    </>
  );
};
