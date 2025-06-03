'use client';

import { yupResolver } from '@hookform/resolvers/yup';
import { redirect } from 'next/navigation';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import type { InferType } from 'yup';

import { Pos1Form } from '@/components/forms';
import { formatMobilePhone } from '@/helpers';
import { useRecords } from '@/hooks';
import { poslSchema } from '@/yup';

import type { RecordPoslResponseInterface } from './edit.type';

type PoslSchemaInfertype = InferType<typeof poslSchema>;

interface EditRecordPoslClientPageInterface {
  record: RecordPoslResponseInterface;
}

export const EditRecordPoslClientPage = (props: EditRecordPoslClientPageInterface) => {
  const { record } = props;
  const { recordPOSl, ...restRecord } = record;
  const { id: _, ...restRecordPOSl } = recordPOSl;
  const { editRecord } = useRecords();

  const { control, handleSubmit, watch, setValue } = useForm<PoslSchemaInfertype>({
    resolver: yupResolver(poslSchema),
    defaultValues: {
      ...restRecord,
      ...restRecordPOSl,
      recordNumber: String(restRecord.recordNumber),
      candidatePhone: formatMobilePhone(record.candidatePhone),
      godfatherPhone: formatMobilePhone(restRecordPOSl.godfatherPhone),
    },
  });

  async function onSubmit(record: PoslSchemaInfertype) {
    const res = await editRecord({ typeOfRecord: 'POSl', data: record });

    if (!res?.ok) {
      toast.error(res.data.message);
    } else {
      toast.success(res.data.message);
      redirect(`/courses/${record.courseNumber}`);
    }
  }

  return (
    <Pos1Form
      control={control}
      onSubmit={onSubmit}
      watch={watch}
      setValue={setValue}
      handleSubmit={handleSubmit}
    />
  );
};
