'use client';

import { yupResolver } from '@hookform/resolvers/yup';
import type { Session } from 'next-auth';
import { FormProvider, useForm } from 'react-hook-form';

import { PoslForm } from '@/components/forms';
import { useRecords } from '@/hooks';
import type { CandidatePoslSchemaInfertype } from '@/yup';
import { candidatePoslSchema } from '@/yup';

const defaultValues: CandidatePoslSchemaInfertype = {
  recordNumber: '',
  candidateName: '',
  nickname: '',
  candidatePhone: '',
  parishChapel: '',
  birthDate: '',
  dataConsent: null,
  isWork: false,
  isCoupleWork: false,
  recordPOSl: {
    godfatherName: '',
    godfatherPhone: '',
    candidateSpirit: '',
    candidateDisposition: '',
    candidateParticipation: '',
  },
};

interface RegisterRecordPoslClientPageInterface {
  courseNumber: string;
  session: Session | null;
}

export const RegisterRecordPoslClientPage = (props: RegisterRecordPoslClientPageInterface) => {
  const { courseNumber, session } = props;
  const { registerRecord, isFetching } = useRecords();

  const methods = useForm<CandidatePoslSchemaInfertype>({
    resolver: yupResolver(candidatePoslSchema),
    defaultValues: { ...defaultValues, courseNumber },
  });

  async function onSubmit(record: CandidatePoslSchemaInfertype) {
    await registerRecord({ typeOfRecord: 'POSl', data: record });
  }

  return (
    <FormProvider {...methods}>
      <PoslForm onSubmit={onSubmit} isSending={isFetching} session={session ?? undefined} />
    </FormProvider>
  );
};
