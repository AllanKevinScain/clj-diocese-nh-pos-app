'use client';

import { yupResolver } from '@hookform/resolvers/yup';
import { FormProvider, useForm } from 'react-hook-form';

import { EditRecordBottomBar } from '@/components';
import { PosllForm } from '@/components/forms';
import { useRecords } from '@/hooks';
import type { CompleteRecordInterface } from '@/types';
import type { CandidatePosllSchemaInfertype } from '@/yup';
import { candidatePosllSchema } from '@/yup';

interface EditRecordPosllClientPageInterface {
  record: CompleteRecordInterface;
}

export const EditRecordPosllClientPage = (props: EditRecordPosllClientPageInterface) => {
  const { record } = props;
  const { editRecord, isFetching } = useRecords();

  const methods = useForm<CandidatePosllSchemaInfertype>({
    resolver: yupResolver(candidatePosllSchema),
    defaultValues: record,
  });

  async function onSubmit(record: CandidatePosllSchemaInfertype) {
    await editRecord({ typeOfRecord: 'POSll', data: record });
  }

  return (
    <>
      <FormProvider {...methods}>
        <PosllForm onSubmit={onSubmit} isSending={isFetching} />
      </FormProvider>
      <EditRecordBottomBar id={record.id} typeOfRecord="POSll" />
    </>
  );
};
