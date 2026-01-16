'use client';

import { yupResolver } from '@hookform/resolvers/yup';
import { useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import type { Session } from 'next-auth';
import { FormProvider, useForm } from 'react-hook-form';
import toast from 'react-hot-toast';

import { EditRecordBottomBar } from '@/components';
import { WorkForm } from '@/components/forms';
import { useRecords } from '@/hooks';
import type { CompleteRecordInterface, ReturnHandlerApiType } from '@/types';
import type { WorkSchemaInfertype } from '@/yup';
import { workSchema } from '@/yup';

interface EditRecordWorkClientPageInterface {
  record: CompleteRecordInterface;
  session: Session | null;
}

export const EditRecordWorkClientPage = (props: EditRecordWorkClientPageInterface) => {
  const { record, session } = props;

  const router = useRouter();
  const client = useQueryClient();
  const { editPoslRecord, editPosllRecord, editPoslllRecord } = useRecords();

  const methods = useForm<WorkSchemaInfertype>({
    resolver: yupResolver(workSchema),
    defaultValues: record,
  });

  async function onSubmit(record: WorkSchemaInfertype) {
    let call = {} as ReturnHandlerApiType<CompleteRecordInterface>;
    if (record.typeOfRecord === 'POSl') {
      call = await editPoslRecord.mutateAsync(record);
    }
    if (record.typeOfRecord === 'POSll') {
      call = await editPosllRecord.mutateAsync(record);
    }
    if (record.typeOfRecord === 'POSlll') {
      await editPoslllRecord.mutateAsync(record);
    }

    if (call.ok) {
      toast.success(call.message);
      client.refetchQueries({ queryKey: ['listAllRecords'] });
      if (call.data && session?.user.loginType === 'manager') {
        return router.push(
          `/courses/${call.data.courseNumber}/${record.typeOfRecord?.toLowerCase()}`,
        );
      } else {
        return router.push('/courses');
      }
    }

    return toast.error(call.message);
  }

  return (
    <>
      <FormProvider {...methods}>
        <WorkForm
          onSubmit={onSubmit}
          isSending={
            editPoslRecord.isPending || editPosllRecord.isPending || editPoslllRecord.isPending
          }
        />
      </FormProvider>
      <EditRecordBottomBar id={record.id} />
    </>
  );
};
