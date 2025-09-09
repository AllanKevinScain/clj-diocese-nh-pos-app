'use client';

import { yupResolver } from '@hookform/resolvers/yup';
import { FormProvider, useForm } from 'react-hook-form';
import type { InferType } from 'yup';

import { PoslForm } from '@/components/forms';
import { useRecords } from '@/hooks';
import { poslSchema } from '@/yup';

type PoslSchemaInfertype = InferType<typeof poslSchema>;

const defaultValues: PoslSchemaInfertype = {
  recordNumber: '',
  parishAcronym: '',
  candidateName: '',
  nickname: '',
  candidatePhone: '',
  parishChapel: '',
  birthDate: '',
  instagram: '',
  spiritualLife: [],
  observationsDed: '',
  disease: null,
  medication: null,
  allergy: '',
  dataConsent: null,
  priest: '',
  hasDisease: null,
  observationsCoordinator: '',
  takesMedication: null,
  recordPOSl: {
    godfatherName: '',
    godfatherPhone: '',
    godfatherEmail: '',
    godfatherResponsibility: '',
    candidateSpirit: '',
    candidateDisposition: '',
    candidateParticipation: '',
    livesWith: [],
    otherWho: null,
    parentsReligion: '',
    otherReligion: null,
    parentsComment: '',
    fatherSituation: '',
    motherSituation: '',
    attitudeCommunication: '',
    doctrineCommunication: '',
    affinityWithGodfather: '',
  },
};

interface RegisterRecordPoslClientPageInterface {
  courseNumber: string;
}

export const RegisterRecordPoslClientPage = (props: RegisterRecordPoslClientPageInterface) => {
  const { courseNumber } = props;
  const { registerRecord } = useRecords();

  const methods = useForm<PoslSchemaInfertype>({
    resolver: yupResolver(poslSchema),
    defaultValues: { ...defaultValues, courseNumber },
  });

  async function onSubmit(record: PoslSchemaInfertype) {
    await registerRecord({ typeOfRecord: 'POSl', data: record });
  }

  return (
    <FormProvider {...methods}>
      <PoslForm onSubmit={onSubmit} />
    </FormProvider>
  );
};
