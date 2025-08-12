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

const defaultValues: WorkSchemaInfertype = {
  dataConsent: null,
  observationsDed: '',
  observationsCoordinator: '',
  spiritualLife: [],
  parishChapel: '',
  priest: '',
  instagram: '',
  candidatePhone: '',
  birthDate: '',
  nickname: '',
  candidateName: '',
  recordNumber: '',
  parishAcronym: '',
  recordWork: {
    courseOneDone: '',
    courseTwoDone: '',
    courseThreeDone: '',
    workedInWhichCourses: '',
    graceStateAwareness: '',
    notFalsifyData: null,
    showLifeTestimony: '',
    currentGroupFunction: '',
    parishActivities: '',
    instrument: '',
    reasonToWork: '',
    workPreference: '',
    willingToOtherFunction: null,
    parishIndication: [],
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
    defaultValues: { ...defaultValues, courseNumber },
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
