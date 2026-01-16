'use client';

import { yupResolver } from '@hookform/resolvers/yup';
import { useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import type { Session } from 'next-auth';
import { FormProvider, useForm } from 'react-hook-form';
import toast from 'react-hot-toast';

import { PosllForm } from '@/components/forms';
import { useRecords } from '@/hooks';
import type { ReturnHandlerApiType } from '@/types';
import type { CandidatePosllSchemaInfertype } from '@/yup';
import { posllSchema } from '@/yup';

interface RegisterRecordPosllClientPageInterface {
  courseNumber: string;
  session: Session | null;
}

const defaultValues: CandidatePosllSchemaInfertype = {
  dataConsent: null,
  parishChapel: '',
  candidatePhone: '',
  birthDate: '',
  nickname: '',
  candidateName: '',
  recordNumber: '',
  isWork: false,
  isCoupleWork: false,
  recordPOSll: {},
};

export const RegisterRecordPosllClientPage = (props: RegisterRecordPosllClientPageInterface) => {
  const { courseNumber, session } = props;

  const router = useRouter();
  const client = useQueryClient();
  const { registerPosllRecord } = useRecords();

  const methods = useForm<CandidatePosllSchemaInfertype>({
    resolver: yupResolver(posllSchema),
    defaultValues: { ...defaultValues, courseNumber },
  });

  async function onSubmit(record: CandidatePosllSchemaInfertype) {
    await registerPosllRecord.mutateAsync(record, {
      onSuccess: (data: ReturnHandlerApiType<CandidatePosllSchemaInfertype>) => {
        toast.success(data.message);
        client.refetchQueries({ queryKey: ['listAllRecords'] });
        if (data.data && session?.user.loginType === 'manager') {
          router.push(`/courses/${data.data.courseNumber}/posll`);
        } else {
          router.push('/courses');
        }
      },
      onError: (e) => toast.error(e.message),
    });
  }

  return (
    <FormProvider {...methods}>
      <PosllForm
        onSubmit={onSubmit}
        isSending={registerPosllRecord.isPending}
        session={session ?? undefined}
      />
    </FormProvider>
  );
};
