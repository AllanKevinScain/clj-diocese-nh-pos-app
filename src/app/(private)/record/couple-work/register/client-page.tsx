'use client';

import { yupResolver } from '@hookform/resolvers/yup';
import { redirect } from 'next/navigation';
import { FormProvider, useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import type { InferType } from 'yup';

import { CoupleForm } from '@/components/forms';
import { useRecords } from '@/hooks';
import { coupleSchema } from '@/yup';

type CoupleSchemaInfertype = InferType<typeof coupleSchema>;

interface RegisterRecordCoupleClientPageInterface {
  courseNumber: string;
}

const defaultValues: CoupleSchemaInfertype = {
  /* dataConsent: null,
  observationsDed: '',
  observationsCoordinator: '',
  spiritualLife: [],
  instagram: '',
  candidatePhone: '',
  birthDate: '',
  nickname: '',
  candidateName: '',
  recordNumber: '',
  parishAcronym: '',
  parishChapel: '',
  priest: '',
  recordCouple: {
    // mulher
    womanSpiritualLife: [],
    womanBirthDate: '',
    womanInstagram: '',
    womanName: '',
    womanNickname: '',
    womanPhone: '',

    // casal
    coursesOneDone: '',
    coursesTwoDone: '',
    coursesThreeDone: '',
    currentGroupFunction: '',
    workPreference: null,
    coursesDone: '',
    familyLife: null,
    motivationToParticipate: '',
    participatedOtherGroups: '',
    religiousWeddingDate: '',
    cookCouple: null,
    externalCouple: null,
    hasCourseOne: null,
    hasCourseThree: null,
    hasCourseTwo: null,
    participatedInRetreat: null,
    parishIndication: [],
  }, */
  dataConsent: true,
  observationsDed: 'Realmente bons',
  observationsCoordinator: 'São muito top',
  spiritualLife: ['missaDominicalSemanal', 'oracaoDiaria', 'visitaAoSacrario'],
  instagram: 'Sem',
  candidatePhone: '(51) 99763-0090',
  birthDate: '1973-06-04',
  nickname: 'Etio',
  candidateName: 'Laercio',
  recordNumber: '1',
  parishAcronym: 'C.SC',
  parishChapel: 'Capela Santa Cecília',
  priest: 'Ezeuiel Persch',
  recordCouple: {
    womanSpiritualLife: ['oracaoDiaria', 'missaDominicalSemanal', 'visitaAoSacrario'],
    womanBirthDate: '1974-08-15',
    womanInstagram: 'Sem',
    womanName: 'Odete',
    womanNickname: 'Dete',
    womanPhone: '(51) 99981-6010',
    coursesOneDone: '181,200,207',
    coursesTwoDone: '99,112,110',
    coursesThreeDone: '24,25',
    currentGroupFunction: 'Tio auxiliar',
    workPreference: 'cozinha',
    coursesDone: 'Tios bem estar',
    familyLife: 'regular',
    motivationToParticipate: 'Meu filho',
    participatedOtherGroups: 'Ecc',
    religiousWeddingDate: '1993-04-22',
    cookCouple: true,
    externalCouple: false,
    hasCourseOne: true,
    hasCourseThree: true,
    hasCourseTwo: true,
    participatedInRetreat: true,
    parishIndication: ['assistente', 'bem-estar', 'cozinha'],
  },
  courseNumber: '207',
};

export const RegisterRecordCoupleClientPage = (props: RegisterRecordCoupleClientPageInterface) => {
  const { courseNumber } = props;
  const { registerRecord } = useRecords();

  const methods = useForm<CoupleSchemaInfertype>({
    resolver: yupResolver(coupleSchema),
    defaultValues: { ...defaultValues, courseNumber },
  });

  async function onSubmit(record: CoupleSchemaInfertype) {
    const res = await registerRecord({ typeOfRecord: 'COUPLE_WORK', data: record });

    if (!res?.ok) {
      toast.error(res.data.message);
    } else {
      toast.success(res.data.message);
      redirect(`/courses`);
    }
  }

  return (
    <FormProvider {...methods}>
      <CoupleForm onSubmit={onSubmit} />
    </FormProvider>
  );
};
