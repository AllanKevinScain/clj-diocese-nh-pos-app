'use client';

import { yupResolver } from '@hookform/resolvers/yup';
import type { Session } from 'next-auth';
import { FormProvider, useForm } from 'react-hook-form';

import { PosllForm } from '@/components/forms';
import { useRecords } from '@/hooks';
import type { PosllSchemaInfertype } from '@/yup';
import { posllSchema } from '@/yup';

interface RegisterRecordPosllClientPageInterface {
  courseNumber: string;
  session: Session | null;
}

const defaultValues: PosllSchemaInfertype = {
  // takesMedication: null,
  // hasDisease: null,
  dataConsent: null,
  // allergy: '',
  // observationsDed: '',
  // observationsCoordinator: '',
  // spiritualLife: [],
  parishChapel: '',
  // priest: '',
  // instagram: '',
  candidatePhone: '',
  birthDate: '',
  nickname: '',
  candidateName: '',
  recordNumber: '',
  isWork: false,
  isCoupleWork: false,
  // parishAcronym: '',
  recordPOSll: {
    // doingConfirmation: null,
    // hasConfirmation: null,
    // parishChapelActivities: '',
    // currentGroupFunction: '',
    // hideImportantInfo: null,
    // perseveranceInCommunity: '',
    // commitmentToCLJ: '',
    // acceptsChurchDoctrine: '',
    // approachToChrist: '',
    // reasonForCLJII: '',
    // motivationToParticipate: '',
    // courseOneDone: '',
    // notConfirmationBecause: null,
  },
};

export const RegisterRecordPosllClientPage = (props: RegisterRecordPosllClientPageInterface) => {
  const { courseNumber, session } = props;
  const { registerRecord, isFetching } = useRecords();

  const methods = useForm<PosllSchemaInfertype>({
    resolver: yupResolver(posllSchema),
    defaultValues: { ...defaultValues, courseNumber },
  });

  async function onSubmit(record: PosllSchemaInfertype) {
    await registerRecord({ typeOfRecord: 'POSll', data: record });
  }

  return (
    <FormProvider {...methods}>
      <PosllForm onSubmit={onSubmit} isSending={isFetching} session={session ?? undefined} />
    </FormProvider>
  );
};
