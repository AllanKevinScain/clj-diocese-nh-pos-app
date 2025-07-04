'use client';

import { yupResolver } from '@hookform/resolvers/yup';
import { redirect } from 'next/navigation';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import type { InferType } from 'yup';

import { PosllForm } from '@/components/forms';
import { formatMobilePhone } from '@/helpers';
import { useRecords } from '@/hooks';
import { posllSchema } from '@/yup';

import type { RecordPosllResponseInterface } from '../posll-server-call.type';
import { EditRecordBottomBar } from './edit-record-bottom-bar';

type PosllSchemaInfertype = InferType<typeof posllSchema>;

interface EditRecordPosllClientPageInterface {
  record: RecordPosllResponseInterface;
}

export const EditRecordPosllClientPage = (props: EditRecordPosllClientPageInterface) => {
  const { record } = props;
  const { recordPOSll, ...restRecord } = record;
  const { id: _, ...restRecordPOSll } = recordPOSll;
  const { editRecord } = useRecords();

  const { control, handleSubmit } = useForm<PosllSchemaInfertype>({
    resolver: yupResolver(posllSchema),
    defaultValues: {
      ...restRecord,
      ...restRecordPOSll,
      recordNumber: String(restRecord.recordNumber),
      candidatePhone: formatMobilePhone(record.candidatePhone),
    },
  });

  async function onSubmit(record: PosllSchemaInfertype) {
    const res = await editRecord({ typeOfRecord: 'POSll', data: record });

    if (!res?.ok) {
      console.log(res);
      toast.error(JSON.stringify(res.data.message));
    } else {
      toast.success(res.data.message);
      redirect(`/courses/${record.courseNumber}`);
    }
  }

  return (
    <>
      <PosllForm control={control} onSubmit={onSubmit} handleSubmit={handleSubmit} />
      <EditRecordBottomBar recordId={record.id} />
    </>
  );
};
