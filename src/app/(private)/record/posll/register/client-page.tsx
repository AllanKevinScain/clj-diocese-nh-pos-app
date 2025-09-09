'use client';

import { yupResolver } from '@hookform/resolvers/yup';
import { FormProvider, useForm } from 'react-hook-form';
import type { InferType } from 'yup';

import { PosllForm } from '@/components/forms';
import { useRecords } from '@/hooks';
import { posllSchema } from '@/yup';

type PosllSchemaInfertype = InferType<typeof posllSchema>;

interface RegisterRecordPosllClientPageInterface {
  courseNumber: string;
}

const defaultValues: PosllSchemaInfertype = {
  takesMedication: null,
  hasDisease: null,
  dataConsent: null,
  allergy: '',
  observationsDed: '',
  observationsCoordinator: '',
  spiritualLife: [],
  parishChapel: '',
  priest: '',
  instagram: '',
  candidatePhone: '',
  birthDate: '',
  nickname: '',
  candidateName: '',
  recordNumber: '',
  parishAcronym: '',
  recordPOSll: {
    doingConfirmation: null,
    hasConfirmation: null,
    parishChapelActivities: '',
    currentGroupFunction: '',
    hideImportantInfo: null,
    perseveranceInCommunity: '',
    commitmentToCLJ: '',
    acceptsChurchDoctrine: '',
    approachToChrist: '',
    reasonForCLJII: '',
    motivationToParticipate: '',
    courseOneDone: '',
    notConfirmationBecause: null,
  },
};

export const RegisterRecordPosllClientPage = (props: RegisterRecordPosllClientPageInterface) => {
  const { courseNumber } = props;
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
      <PosllForm onSubmit={onSubmit} isSending={isFetching} />
    </FormProvider>
  );
};
