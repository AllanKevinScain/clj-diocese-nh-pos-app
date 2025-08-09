'use client';

import { yupResolver } from '@hookform/resolvers/yup';
import { redirect } from 'next/navigation';
import { FormProvider, useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import type { InferType } from 'yup';

import { PoslForm } from '@/components/forms';
import { useRecords } from '@/hooks';
import { poslSchema } from '@/yup';

type PoslSchemaInfertype = InferType<typeof poslSchema>;

const valoresPadrao: PoslSchemaInfertype = {
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
    defaultValues: { ...valoresPadrao, courseNumber },
  });

  async function onSubmit(record: PoslSchemaInfertype) {
    const res = await registerRecord({ typeOfRecord: 'POSl', data: record });

    if (!res?.ok) {
      toast.error(res.data.message);
    } else {
      toast.success(res.data.message);
      redirect(`/courses`);
    }
  }

  return (
    <FormProvider {...methods}>
      <PoslForm onSubmit={onSubmit} />
    </FormProvider>
  );
};
