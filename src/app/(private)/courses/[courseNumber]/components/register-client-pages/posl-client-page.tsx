'use client';

import { yupResolver } from '@hookform/resolvers/yup';
import type { Session } from 'next-auth';
import { FormProvider, useForm } from 'react-hook-form';

import { PoslForm } from '@/components/forms';
import { useRecords } from '@/hooks';
import type { PoslSchemaInfertype } from '@/yup';
import { poslSchema } from '@/yup';

const defaultValues: PoslSchemaInfertype = {
  recordNumber: '',
  // parishAcronym: '',
  candidateName: '',
  nickname: '',
  candidatePhone: '',
  parishChapel: '',
  birthDate: '',
  // instagram: '',
  // spiritualLife: [],
  // observationsDed: '',
  // disease: null,
  // medication: null,
  // allergy: '',
  dataConsent: null,
  isWork: false,
  isCoupleWork: false,
  // priest: '',
  // hasDisease: null,
  // observationsCoordinator: '',
  // takesMedication: null,
  recordPOSl: {
    godfatherName: '',
    godfatherPhone: '',
    // godfatherEmail: '',
    // godfatherResponsibility: '',
    candidateSpirit: '',
    candidateDisposition: '',
    candidateParticipation: '',
    // livesWith: [],
    // otherWho: null,
    // parentsReligion: '',
    // otherReligion: null,
    // parentsComment: '',
    // fatherSituation: '',
    // motherSituation: '',
    // attitudeCommunication: '',
    // doctrineCommunication: '',
    // affinityWithGodfather: '',
  },
};

interface RegisterRecordPoslClientPageInterface {
  courseNumber: string;
  session: Session | null;
}

export const RegisterRecordPoslClientPage = (props: RegisterRecordPoslClientPageInterface) => {
  const { courseNumber, session } = props;
  const { registerRecord, isFetching } = useRecords();

  const methods = useForm<PoslSchemaInfertype>({
    resolver: yupResolver(poslSchema),
    defaultValues: { ...defaultValues, courseNumber },
  });

  async function onSubmit(record: PoslSchemaInfertype) {
    await registerRecord({ typeOfRecord: 'POSl', data: record });
  }

  return (
    <FormProvider {...methods}>
      <PoslForm onSubmit={onSubmit} isSending={isFetching} session={session ?? undefined} />
    </FormProvider>
  );
};
