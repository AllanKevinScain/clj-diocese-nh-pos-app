'use client';

import { yupResolver } from '@hookform/resolvers/yup';
import { FormProvider, useForm } from 'react-hook-form';

import { EditRecordBottomBar } from '@/components';
import { PoslllForm } from '@/components/forms';
import { useRecords } from '@/hooks';
import type { CompleteRecordInterface } from '@/types';
import type { CandidatePoslllSchemaInfertype } from '@/yup';
import { candidatePoslllSchema } from '@/yup';

interface EditRecordPoslllClientPageInterface {
  record: CompleteRecordInterface;
}

export const EditRecordPoslllClientPage = (props: EditRecordPoslllClientPageInterface) => {
  const { record } = props;
  const { editRecord, isFetching } = useRecords();

  const methods = useForm<CandidatePoslllSchemaInfertype>({
    resolver: yupResolver(candidatePoslllSchema),
    defaultValues: record,
  });

  async function onSubmit(record: CandidatePoslllSchemaInfertype) {
    await editRecord({ typeOfRecord: 'POSlll', data: record });
  }

  return (
    <>
      <FormProvider {...methods}>
        <PoslllForm onSubmit={onSubmit} isSending={isFetching} />
      </FormProvider>
      <EditRecordBottomBar id={record.id} />
    </>
  );
};
