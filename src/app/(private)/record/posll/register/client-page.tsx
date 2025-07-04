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
  takesMedication: false,
  hasDisease: false,
  dataConsent: true,
  allergy: 'Tenho',
  observationsDed: 'Gente boa',
  observationsCoordinator: 'Gente boa',
  spiritualLife: ['missaDominicalSemanal'],
  parishChapel: 'Capela Santa Cecília',
  priest: 'Ezequiel Persch',
  instagram: '@allan_scain',
  candidatePhone: '(51) 99536-8765',
  birthDate: '2000-05-04',
  nickname: 'Allazin',
  candidateName: 'Allan',
  recordNumber: '1',
  parishAcronym: 'C.SC',
  recordPOSll: {
    doingConfirmation: null,
    hasConfirmation: false,
    parishChapelActivities: 'Catequista, acólito',
    currentGroupFunction: 'Nada',
    hideImportantInfo: false,
    perseveranceInCommunity: 'Sim',
    commitmentToCLJ: 'Sim',
    acceptsChurchDoctrine: 'Sim',
    approachToChrist: 'SIm',
    reasonForCLJII: 'Por que sinto minha chama se apagar',
    motivationToParticipate: 'Amar a Deus',
    courseOneDone: '181',
    notConfirmationBecause: null,
  },
};

export const RegisterRecordPosllClientPage = (props: RegisterRecordPosllClientPageInterface) => {
  const { courseNumber } = props;
  const { registerRecord } = useRecords();

  const methods = useForm<PosllSchemaInfertype>({
    resolver: yupResolver(posllSchema),
    defaultValues: { ...valoresPadrao, courseNumber: Number(courseNumber) },
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
