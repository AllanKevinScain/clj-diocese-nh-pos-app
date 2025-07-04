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
  recordNumber: '1',
  parishAcronym: 'C.SC',
  candidateName: 'Allan',
  nickname: 'Allazin',
  candidatePhone: '(51) 99536-8765',
  parishChapel: 'Capela Santa Cecília',
  birthDate: '2000-05-04',
  instagram: '@allan_scain',
  spiritualLife: ['batismo', 'comumhao', 'crisma', 'confissaoFrequente', 'missaDominicalFrequente'],
  observationsDed: 'Gente boa',
  disease: null,
  medication: null,
  allergy: 'Picles',
  dataConsent: true,
  priest: 'Ezequiel Persch',
  hasDisease: false,
  observationsCoordinator: 'Gente boa',
  takesMedication: false,
  recordPOSl: {
    godfatherName: 'Luiz',
    godfatherPhone: '5199981-6010',
    godfatherEmail: 'luis@gmail.com',
    godfatherResponsibility: 'Sim',
    candidateSpirit: 'extrovertido',
    candidateDisposition: 'facilComunicacao',
    candidateParticipation: 'totalParticipacao',
    livesWith: ['mae', 'pai'],
    otherWho: null,
    parentsReligion: 'catolicos',
    otherReligion: null,
    parentsComment: 'Gente muito boa',
    fatherSituation: 'separadoDivorciado',
    motherSituation: 'separadaDivorciada',
    attitudeCommunication: 'Sim',
    doctrineCommunication: 'Sim',
    affinityWithGodfather: 'Sim',
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
    defaultValues: { ...valoresPadrao, courseNumber: Number(courseNumber) },
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
