'use client';

import { yupResolver } from '@hookform/resolvers/yup';
import { redirect } from 'next/navigation';
import { FormProvider, useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import type { InferType } from 'yup';

import { WorkForm } from '@/components/forms';
import { useRecords } from '@/hooks';
import { workSchema } from '@/yup';

type WorkSchemaInfertype = InferType<typeof workSchema>;

interface RegisterRecordWorkClientPageInterface {
  courseNumber: string;
}

const valoresPadrao: WorkSchemaInfertype = {
  dataConsent: true,
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
  recordWork: {
    courseOneDone: '181',
    courseTwoDone: '99',
    courseThreeDone: '24',
    workedInWhichCourses: '2,3,4,5,6,7',
    graceStateAwareness: 'Sim',
    notFalsifyData: true,
    showLifeTestimony: 'Sim',
    currentGroupFunction: 'Coordenador',
    parishActivities: 'Catequista',
    instrument: 'violão',
    reasonToWork: 'Por que sim',
    workPreference: 'sala',
    willingToOtherFunction: true,
    parishIndication: ['cozinha'],
    doingConfirmation: null,
    notConfirmationBecause: null,
    hasConfirmation: null,
  },
};

export const RegisterRecordWorkClientPage = (props: RegisterRecordWorkClientPageInterface) => {
  const { courseNumber } = props;
  const { registerRecord } = useRecords();

  const methods = useForm<WorkSchemaInfertype>({
    resolver: yupResolver(workSchema),
    defaultValues: { ...valoresPadrao, courseNumber: Number(courseNumber) },
  });

  async function onSubmit(record: WorkSchemaInfertype) {
    const res = await registerRecord({ typeOfRecord: 'WORK', data: record });

    if (!res?.ok) {
      toast.error(res.data.message);
    } else {
      toast.success(res.data.message);
      redirect(`/courses`);
    }
  }

  return (
    <FormProvider {...methods}>
      <WorkForm onSubmit={onSubmit} />
    </FormProvider>
  );
};
