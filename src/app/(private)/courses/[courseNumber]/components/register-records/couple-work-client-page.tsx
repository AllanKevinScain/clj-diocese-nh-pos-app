'use client';

import { yupResolver } from '@hookform/resolvers/yup';
import { useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import type { Session } from 'next-auth';
import { FormProvider, useForm } from 'react-hook-form';
import toast from 'react-hot-toast';

import { CoupleForm } from '@/components/forms';
import { useRecords } from '@/hooks';
import type { CompleteRecordInterface, ReturnHandlerApiType } from '@/types';
import type { CoupleSchemaInfertype } from '@/yup';
import { coupleSchema } from '@/yup';

type CutCompleteRecordType = Pick<CompleteRecordInterface, 'courseNumber' | 'typeOfRecord'>;

interface RegisterRecordCoupleClientPageInterface extends CutCompleteRecordType {
  session: Session | null;
}

const defaultValues: CoupleSchemaInfertype = {
  dataConsent: null,
  courseNumber: '',
  candidatePhone: '',
  birthDate: '',
  nickname: '',
  candidateName: '',
  recordNumber: '',
  parishChapel: '',
  isWork: false,
  isCoupleWork: true,
  recordCouple: {
    womanBirthDate: '',
    womanName: '',
    womanNickname: '',
    womanPhone: '',
  },
};

export const RegisterRecordCoupleClientPage = (props: RegisterRecordCoupleClientPageInterface) => {
  const { courseNumber, session, typeOfRecord } = props;

  const router = useRouter();
  const client = useQueryClient();
  const { registerPoslRecord, registerPosllRecord, registerPoslllRecord } = useRecords();

  const methods = useForm<CoupleSchemaInfertype>({
    resolver: yupResolver(coupleSchema),
    defaultValues: { ...defaultValues, courseNumber },
  });

  async function onSubmit(record: CoupleSchemaInfertype) {
    let call = {} as ReturnHandlerApiType<CompleteRecordInterface>;
    if (typeOfRecord === 'POSl') {
      call = await registerPoslRecord.mutateAsync(record);
    }
    if (typeOfRecord === 'POSll') {
      call = await registerPosllRecord.mutateAsync(record);
    }
    if (typeOfRecord === 'POSlll') {
      await registerPoslllRecord.mutateAsync(record);
    }

    if (call.ok) {
      toast.success(call.message);
      client.refetchQueries({ queryKey: ['listAllRecords'] });
      if (call.data && session?.user.loginType === 'manager') {
        return router.push(`/courses/${call.data.courseNumber}/${typeOfRecord?.toLowerCase()}`);
      } else {
        return router.push('/courses');
      }
    }

    return toast.error(call.message);
  }

  return (
    <FormProvider {...methods}>
      <CoupleForm
        onSubmit={onSubmit}
        isSending={
          registerPoslRecord.isPending ||
          registerPosllRecord.isPending ||
          registerPoslllRecord.isPending
        }
        session={session ?? undefined}
      />
    </FormProvider>
  );
};
