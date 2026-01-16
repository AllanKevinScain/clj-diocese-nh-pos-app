'use client';

import { yupResolver } from '@hookform/resolvers/yup';
import { useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import type { Session } from 'next-auth';
import { FormProvider, useForm } from 'react-hook-form';
import toast from 'react-hot-toast';

import { EditRecordBottomBar } from '@/components';
import { PosllForm } from '@/components/forms';
import { useRecords } from '@/hooks';
import type { CompleteRecordInterface, ReturnHandlerApiType } from '@/types';
import type { CandidatePosllSchemaInfertype } from '@/yup';
import { posllSchema } from '@/yup';

interface EditRecordPosllClientPageInterface {
  record: CompleteRecordInterface;
  session: Session | null;
}

export const EditRecordPosllClientPage = (props: EditRecordPosllClientPageInterface) => {
  const { record, session } = props;

  const router = useRouter();
  const client = useQueryClient();
  const { editPosllRecord } = useRecords();

  const methods = useForm<CandidatePosllSchemaInfertype>({
    resolver: yupResolver(posllSchema),
    defaultValues: record,
  });

  async function onSubmit(record: CandidatePosllSchemaInfertype) {
    await editPosllRecord.mutateAsync(record, {
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
    <>
      <FormProvider {...methods}>
        <PosllForm onSubmit={onSubmit} isSending={editPosllRecord.isPending} />
      </FormProvider>
      <EditRecordBottomBar id={record.id} />
    </>
  );
};
