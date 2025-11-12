'use client';

import { yupResolver } from '@hookform/resolvers/yup';
import type { Session } from 'next-auth';
import { FormProvider, useForm } from 'react-hook-form';

import { CoupleForm } from '@/components/forms';
import { useRecords } from '@/hooks';
import type { RecordType } from '@/types';
import type { CoupleSchemaInfertype } from '@/yup';
import { coupleSchema } from '@/yup';

interface RegisterRecordCoupleClientPageInterface {
  courseNumber: string;
  session: Session | null;
  typeOfRecord: RecordType;
}

const defaultValues: CoupleSchemaInfertype = {
  dataConsent: null,
  courseNumber: '',
  // observationsDed: '',
  // observationsCoordinator: '',
  // spiritualLife: [],
  // instagram: '',
  candidatePhone: '',
  birthDate: '',
  nickname: '',
  candidateName: '',
  recordNumber: '',
  // parishAcronym: '',
  parishChapel: '',
  isWork: false,
  isCoupleWork: true,
  // priest: '',
  recordCouple: {
    // mulher
    // womanSpiritualLife: [],
    womanBirthDate: '',
    // womanInstagram: '',
    womanName: '',
    womanNickname: '',
    womanPhone: '',

    // casal
    // coursesOneDone: '',
    // coursesTwoDone: '',
    // coursesThreeDone: '',
    // currentGroupFunction: '',
    // workPreference: null,
    // coursesDone: '',
    // familyLife: null,
    // motivationToParticipate: '',
    // participatedOtherGroups: '',
    // religiousWeddingDate: '',
    // cookCouple: null,
    // externalCouple: null,
    // hasCourseOne: null,
    // hasCourseThree: null,
    // hasCourseTwo: null,
    // participatedInRetreat: null,
    // parishIndication: [],
  },
};

export const RegisterRecordCoupleClientPage = (props: RegisterRecordCoupleClientPageInterface) => {
  const { courseNumber, session, typeOfRecord } = props;
  const { registerRecord, isFetching } = useRecords();

  const methods = useForm<CoupleSchemaInfertype>({
    resolver: yupResolver(coupleSchema),
    defaultValues: { ...defaultValues, courseNumber },
  });

  async function onSubmit(record: CoupleSchemaInfertype) {
    await registerRecord({ typeOfRecord, data: record });
  }

  return (
    <FormProvider {...methods}>
      <CoupleForm onSubmit={onSubmit} isSending={isFetching} session={session ?? undefined} />
    </FormProvider>
  );
};
