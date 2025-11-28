'use client';

import { yupResolver } from '@hookform/resolvers/yup';
import type { Session } from 'next-auth';
import { FormProvider, useForm } from 'react-hook-form';

import { PoslllForm } from '@/components/forms';
import { useRecords } from '@/hooks';
import type { CandidatePoslllSchemaInfertype } from '@/yup';
import { candidatePoslllSchema } from '@/yup';

interface RegisterRecordPoslllClientPageInterface {
  courseNumber: string;
  session: Session | null;
}

const defaultValues: CandidatePoslllSchemaInfertype = {
  dataConsent: null,
  parishChapel: '',
  candidatePhone: '',
  birthDate: '',
  nickname: '',
  candidateName: '',
  recordNumber: '',
  isWork: false,
  isCoupleWork: false,
  recordPOSlll: {},
};

export const RegisterRecordPoslllClientPage = (props: RegisterRecordPoslllClientPageInterface) => {
  const { courseNumber, session } = props;
  const { registerRecord, isFetching } = useRecords();

  const methods = useForm<CandidatePoslllSchemaInfertype>({
    resolver: yupResolver(candidatePoslllSchema),
    defaultValues: { ...defaultValues, courseNumber },
  });

  async function onSubmit(record: CandidatePoslllSchemaInfertype) {
    await registerRecord({ typeOfRecord: 'POSlll', data: record });
  }

  return (
    <FormProvider {...methods}>
      <PoslllForm onSubmit={onSubmit} isSending={isFetching} session={session ?? undefined} />
    </FormProvider>
  );
};
