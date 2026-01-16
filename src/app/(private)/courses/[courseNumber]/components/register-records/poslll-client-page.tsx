'use client';

import { yupResolver } from '@hookform/resolvers/yup';
import { useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import type { Session } from 'next-auth';
import { FormProvider, useForm } from 'react-hook-form';
import toast from 'react-hot-toast';

import { PoslllForm } from '@/components/forms';
import { useRecords } from '@/hooks';
import type { ReturnHandlerApiType } from '@/types';
import type { CandidatePoslllSchemaInfertype } from '@/yup';
import { candidatePoslllSchema } from '@/yup';

interface RegisterRecordPoslllClientPageInterface {
  courseNumber: string;
  session: Session | null;
}

const defaultValues: CandidatePoslllSchemaInfertype = {
  dataConsent: null,
  parishChapel: '',
  candidatePhone: '',
  birthDate: '',
  nickname: '',
  candidateName: '',
  recordNumber: '',
  isWork: false,
  isCoupleWork: false,
  recordPOSlll: {},
};

export const RegisterRecordPoslllClientPage = (props: RegisterRecordPoslllClientPageInterface) => {
  const { courseNumber, session } = props;

  const router = useRouter();
  const client = useQueryClient();
  const { registerPoslllRecord } = useRecords();

  const methods = useForm<CandidatePoslllSchemaInfertype>({
    resolver: yupResolver(candidatePoslllSchema),
    defaultValues: { ...defaultValues, courseNumber },
  });

  async function onSubmit(record: CandidatePoslllSchemaInfertype) {
    await registerPoslllRecord.mutateAsync(record, {
      onSuccess: (data: ReturnHandlerApiType<CandidatePoslllSchemaInfertype>) => {
        toast.success(data.message);
        client.refetchQueries({ queryKey: ['listAllRecords'] });
        if (data.data && session?.user.loginType === 'manager') {
          router.push(`/courses/${data.data.courseNumber}/poslll`);
        } else {
          router.push('/courses');
        }
      },
      onError: (e) => toast.error(e.message),
    });
  }

  return (
    <FormProvider {...methods}>
      <PoslllForm
        onSubmit={onSubmit}
        isSending={registerPoslllRecord.isPending}
        session={session ?? undefined}
      />
    </FormProvider>
  );
};
