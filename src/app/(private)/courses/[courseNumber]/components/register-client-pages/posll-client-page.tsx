'use client';

import { yupResolver } from '@hookform/resolvers/yup';
import type { Session } from 'next-auth';
import { FormProvider, useForm } from 'react-hook-form';

import { PosllForm } from '@/components/forms';
import { useRecords } from '@/hooks';
import type { CandidatePosllSchemaInfertype } from '@/yup';
import { candidatePosllSchema } from '@/yup';

interface RegisterRecordPosllClientPageInterface {
  courseNumber: string;
  session: Session | null;
}

const defaultValues: CandidatePosllSchemaInfertype = {
  dataConsent: null,
  parishChapel: '',
  candidatePhone: '',
  birthDate: '',
  nickname: '',
  candidateName: '',
  recordNumber: '',
  isWork: false,
  isCoupleWork: false,
  recordPOSll: {},
};

export const RegisterRecordPosllClientPage = (props: RegisterRecordPosllClientPageInterface) => {
  const { courseNumber, session } = props;
  const { registerRecord, isFetching } = useRecords();

  const methods = useForm<CandidatePosllSchemaInfertype>({
    resolver: yupResolver(candidatePosllSchema),
    defaultValues: { ...defaultValues, courseNumber },
  });

  async function onSubmit(record: CandidatePosllSchemaInfertype) {
    await registerRecord({ typeOfRecord: 'POSll', data: record });
  }

  return (
    <FormProvider {...methods}>
      <PosllForm onSubmit={onSubmit} isSending={isFetching} session={session ?? undefined} />
    </FormProvider>
  );
};
