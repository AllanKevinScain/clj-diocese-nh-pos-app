'use client';

import { yupResolver } from '@hookform/resolvers/yup';
import { useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import type { Session } from 'next-auth';
import { FormProvider, useForm } from 'react-hook-form';
import toast from 'react-hot-toast';

import { EditRecordBottomBar } from '@/components';
import { PoslForm } from '@/components/forms';
import { useRecords } from '@/hooks';
import type { CompleteRecordInterface, ReturnHandlerApiType } from '@/types';
import type { CandidatePoslSchemaInfertype } from '@/yup';
import { poslSchema } from '@/yup';

interface EditRecordPoslClientPageInterface {
  record: CompleteRecordInterface;
  session: Session | null;
}

export const EditRecordPoslClientPage = (props: EditRecordPoslClientPageInterface) => {
  const { record, session } = props;

  const router = useRouter();
  const client = useQueryClient();
  const { editPoslRecord } = useRecords();

  const methods = useForm<CandidatePoslSchemaInfertype>({
    resolver: yupResolver(poslSchema),
    defaultValues: record,
  });

  async function onSubmit(record: CandidatePoslSchemaInfertype) {
    await editPoslRecord.mutateAsync(record, {
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
    <>
      <FormProvider {...methods}>
        <PoslForm onSubmit={onSubmit} isSending={editPoslRecord.isPending} />
      </FormProvider>
      <EditRecordBottomBar id={record.id} />
    </>
  );
};
