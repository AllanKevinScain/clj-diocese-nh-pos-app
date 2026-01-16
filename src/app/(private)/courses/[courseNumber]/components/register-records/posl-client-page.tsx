'use client';

import { yupResolver } from '@hookform/resolvers/yup';
import { useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import type { Session } from 'next-auth';
import { FormProvider, useForm } from 'react-hook-form';
import toast from 'react-hot-toast';

import { PoslForm } from '@/components/forms';
import { useRecords } from '@/hooks';
import type { ReturnHandlerApiType } from '@/types';
import type { CandidatePoslSchemaInfertype } from '@/yup';
import { poslSchema } from '@/yup';

const defaultValues: CandidatePoslSchemaInfertype = {
  recordNumber: '',
  candidateName: '',
  nickname: '',
  candidatePhone: '',
  parishChapel: '',
  birthDate: '',
  dataConsent: null,
  isWork: false,
  isCoupleWork: false,
  recordPOSl: {
    godfatherName: '',
    godfatherPhone: '',
    candidateSpirit: '',
    candidateDisposition: '',
    candidateParticipation: '',
  },
};

interface RegisterRecordPoslClientPageInterface {
  courseNumber: string;
  session: Session | null;
}

export const RegisterRecordPoslClientPage = (props: RegisterRecordPoslClientPageInterface) => {
  const { courseNumber, session } = props;

  const router = useRouter();
  const client = useQueryClient();
  const { registerPoslRecord } = useRecords();

  const methods = useForm<CandidatePoslSchemaInfertype>({
    resolver: yupResolver(poslSchema),
    defaultValues: { ...defaultValues, courseNumber },
  });

  async function onSubmit(record: CandidatePoslSchemaInfertype) {
    await registerPoslRecord.mutateAsync(record, {
      onSuccess: (data: ReturnHandlerApiType<CandidatePoslSchemaInfertype>) => {
        toast.success(data.message);
        client.refetchQueries({ queryKey: ['listAllRecords'] });
        if (data.data && session?.user.loginType === 'manager') {
          router.push(`/courses/${data.data.courseNumber}/posl`);
        } else {
          router.push('/courses');
        }
      },
      onError: (e) => toast.error(e.message),
    });
  }

  return (
    <FormProvider {...methods}>
      <PoslForm
        onSubmit={onSubmit}
        isSending={registerPoslRecord.isPending}
        session={session ?? undefined}
      />
    </FormProvider>
  );
};
