'use client';

import { yupResolver } from '@hookform/resolvers/yup';
import type { Session } from 'next-auth';
import { FormProvider, useForm } from 'react-hook-form';

import { WorkForm } from '@/components/forms';
import { useRecords } from '@/hooks';
import type { CompleteRecordInterface } from '@/types';
import type { WorkSchemaInfertype } from '@/yup';
import { workSchema } from '@/yup';

type CutCompleteRecordType = Pick<CompleteRecordInterface, 'courseNumber' | 'typeOfRecord'>;

interface RegisterRecordWorkClientPageInterface extends CutCompleteRecordType {
  session: Session | null;
}

const defaultValues: WorkSchemaInfertype = {
  dataConsent: null,
  parishChapel: '',
  candidatePhone: '',
  birthDate: '',
  nickname: '',
  candidateName: '',
  recordNumber: '',
  isWork: true,
  isCoupleWork: false,
  recordWork: {},
};

export const RegisterRecordWorkClientPage = (props: RegisterRecordWorkClientPageInterface) => {
  const { courseNumber, session, typeOfRecord } = props;
  const { registerRecord, isFetching } = useRecords();

  const methods = useForm<WorkSchemaInfertype>({
    resolver: yupResolver(workSchema),
    defaultValues: { ...defaultValues, courseNumber },
  });

  async function onSubmit(record: WorkSchemaInfertype) {
    await registerRecord({ typeOfRecord, data: record });
  }

  return (
    <FormProvider {...methods}>
      <WorkForm onSubmit={onSubmit} isSending={isFetching} session={session ?? undefined} />
    </FormProvider>
  );
};
