'use client';

import { yupResolver } from '@hookform/resolvers/yup';
import type { Session } from 'next-auth';
import { FormProvider, useForm } from 'react-hook-form';

import { PoslForm } from '@/components/forms';
import { useRecords } from '@/hooks';
import type { PoslSchemaInfertype } from '@/yup';
import { poslSchema } from '@/yup';

const defaultValues: PoslSchemaInfertype = {
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

  const methods = useForm<PoslSchemaInfertype>({
    resolver: yupResolver(poslSchema),
    defaultValues: { ...defaultValues, courseNumber },
  });

  async function onSubmit(record: PoslSchemaInfertype) {
    await registerRecord({ typeOfRecord: 'POSl', data: record });
  }

  return (
    <FormProvider {...methods}>
      <PoslForm onSubmit={onSubmit} isSending={isFetching} session={session ?? undefined} />
    </FormProvider>
  );
};
