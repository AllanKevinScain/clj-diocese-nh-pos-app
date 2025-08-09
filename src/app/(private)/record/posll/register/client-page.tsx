'use client';

import { yupResolver } from '@hookform/resolvers/yup';
import { redirect } from 'next/navigation';
import { FormProvider, useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import type { InferType } from 'yup';

import { PosllForm } from '@/components/forms';
import { useRecords } from '@/hooks';
import { posllSchema } from '@/yup';

type PosllSchemaInfertype = InferType<typeof posllSchema>;

interface RegisterRecordPosllClientPageInterface {
  courseNumber: string;
}

const valoresPadrao: PosllSchemaInfertype = {
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
  const { registerRecord } = useRecords();

  const methods = useForm<PosllSchemaInfertype>({
    resolver: yupResolver(posllSchema),
    defaultValues: { ...valoresPadrao, courseNumber },
  });

  async function onSubmit(record: PosllSchemaInfertype) {
    const res = await registerRecord({ typeOfRecord: 'POSll', data: record });

    if (!res?.ok) {
      toast.error(res.data.message);
    } else {
      toast.success(res.data.message);
      redirect(`/courses`);
    }
  }

  return (
    <FormProvider {...methods}>
      <PosllForm onSubmit={onSubmit} />
    </FormProvider>
  );
};
