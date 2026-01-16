'use client';

import { yupResolver } from '@hookform/resolvers/yup';
import { useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import type { Session } from 'next-auth';
import { FormProvider, useForm } from 'react-hook-form';
import toast from 'react-hot-toast';

import { EditRecordBottomBar } from '@/components';
import { PoslllForm } from '@/components/forms';
import { useRecords } from '@/hooks';
import type { CompleteRecordInterface, ReturnHandlerApiType } from '@/types';
import type { CandidatePoslllSchemaInfertype } from '@/yup';
import { candidatePoslllSchema } from '@/yup';

interface EditRecordPoslllClientPageInterface {
  record: CompleteRecordInterface;
  session: Session | null;
}

export const EditRecordPoslllClientPage = (props: EditRecordPoslllClientPageInterface) => {
  const { record, session } = props;

  const router = useRouter();
  const client = useQueryClient();
  const { editPoslllRecord } = useRecords();

  const methods = useForm<CandidatePoslllSchemaInfertype>({
    resolver: yupResolver(candidatePoslllSchema),
    defaultValues: record,
  });

  async function onSubmit(record: CandidatePoslllSchemaInfertype) {
    await editPoslllRecord.mutateAsync(record, {
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
    <>
      <FormProvider {...methods}>
        <PoslllForm onSubmit={onSubmit} isSending={editPoslllRecord.isPending} />
      </FormProvider>
      <EditRecordBottomBar id={record.id} />
    </>
  );
};
