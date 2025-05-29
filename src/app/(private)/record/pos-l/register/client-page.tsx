'use client';

import { yupResolver } from '@hookform/resolvers/yup';
import { redirect } from 'next/navigation';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import type { InferType } from 'yup';

import { Pos1Form } from '@/components/forms';
import { useRecords } from '@/hooks';
import { poslSchema } from '@/yup';

type PoslSchemaInfertype = InferType<typeof poslSchema>;

const valoresPadrao = {
  recordNumber: '1',
  parishAcronym: 'C.SC',
  candidateName: 'Allan',
  nickname: 'Allazin',
  candidatePhone: '(51) 99536-8765',
  parishChapel: 'Capela Santa Cecília',
  document: '5118676948',
  birthDate: '2000-05-04',
  instagram: '@allan_scain',
  godfatherName: 'Luiz',
  godfatherPhone: '(51) 99981-6010',
  godfatherEmail: 'luis@gmail.com',
  affinityWithGodfather: '5 anos',
  godfatherResponsibility: 'Sim',
  candidateSpirit: 'extrovertido',
  candidateDisposition: 'facilComunicacao',
  candidateParticipation: 'totalParticipacao',
  livesWith: 'mae,pai,outro',
  otherWho: 'Vó',
  parentsReligion: 'outro',
  otherReligion: 'Ateus',
  parentsComment: 'Gente muito boa',
  spiritualLife: 'batismo,comumhao,crisma,confissaoFrequente,missaDominicalFrequente',
  observationsDed: 'Gente boa',
  disease: 'Doente de amor',
  medication: 'Decongex plus',
  allergy: 'Picles',
  dataConsent: true,
  priest: 'Ezequiel Persch',
  fatherSituation: 'separadoDivorciado',
  motherSituation: 'separadaDivorciada',
  attitudeCommunication: 'Sim',
  doctrineCommunication: 'Sim',
};

interface RegisterRecordPoslClientPageInterface {
  courseNumber: string;
}

export const RegisterRecordPoslClientPage = (props: RegisterRecordPoslClientPageInterface) => {
  const { courseNumber } = props;
  const { registerRecord } = useRecords();

  const {
    control,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<PoslSchemaInfertype>({
    resolver: yupResolver(poslSchema),
    defaultValues: { ...valoresPadrao, courseNumber: Number(courseNumber) },
  });

  async function onSubmit(record: PoslSchemaInfertype) {
    const res = await registerRecord({ typeOfRecord: 'POSl', data: record });

    if (!res?.ok) {
      toast.error(res.data.message);
    } else {
      toast.success(res.data.message);
      redirect(`/courses/${record.courseNumber}`);
    }
  }

  return (
    <Pos1Form
      control={control}
      errors={errors}
      onSubmit={onSubmit}
      watch={watch}
      setValue={setValue}
      handleSubmit={handleSubmit}
    />
  );
};
