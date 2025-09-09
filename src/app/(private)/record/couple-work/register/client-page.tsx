'use client';

import { yupResolver } from '@hookform/resolvers/yup';
import { FormProvider, useForm } from 'react-hook-form';
import type { InferType } from 'yup';

import { CoupleForm } from '@/components/forms';
import { useRecords } from '@/hooks';
import { coupleSchema } from '@/yup';

type CoupleSchemaInfertype = InferType<typeof coupleSchema>;

interface RegisterRecordCoupleClientPageInterface {
  courseNumber: string;
}

const defaultValues: CoupleSchemaInfertype = {
  dataConsent: null,
  courseNumber: '',
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
  },
};

export const RegisterRecordCoupleClientPage = (props: RegisterRecordCoupleClientPageInterface) => {
  const { courseNumber } = props;
  const { registerRecord, isFetching } = useRecords();

  const methods = useForm<CoupleSchemaInfertype>({
    resolver: yupResolver(coupleSchema),
    defaultValues: { ...defaultValues, courseNumber },
  });

  async function onSubmit(record: CoupleSchemaInfertype) {
    await registerRecord({ typeOfRecord: 'COUPLE_WORK', data: record });
  }

  return (
    <FormProvider {...methods}>
      <CoupleForm onSubmit={onSubmit} isSending={isFetching} />
    </FormProvider>
  );
};
