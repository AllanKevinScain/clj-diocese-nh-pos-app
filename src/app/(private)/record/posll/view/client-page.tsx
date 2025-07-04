'use client';

import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import type { InferType } from 'yup';

import { PosllForm } from '@/components/forms';
import { posllSchema } from '@/yup';

import type { RecordPosllResponseInterface } from '../posll-server-call.type';
import { ViewRecordBottomBar } from './view-record-bottom-bar';

type PosllSchemaInfertype = InferType<typeof posllSchema>;

interface ViewRecordPosllClientPageInterface {
  record: RecordPosllResponseInterface;
}

export const ViewRecordPosllClientPage = (props: ViewRecordPosllClientPageInterface) => {
  const { record } = props;
  console.log('🚀 ~ ViewRecordPosllClientPage ~ record:', record);
  const { recordPOSll, ...restRecord } = record;
  const { id: _, ...restRecordPOSll } = recordPOSll;

  const { control, ...restMethods } = useForm<PosllSchemaInfertype>({
    resolver: yupResolver(posllSchema),
    defaultValues: {
      ...restRecord,
      ...restRecordPOSll,
      recordNumber: String(restRecord.recordNumber),
    },
  });

  return (
    <>
      <PosllForm control={control} {...restMethods} onSubmit={() => null} isDisabled />
      <ViewRecordBottomBar
        courseNumber={String(restRecord.recordNumber)}
        recordId={restRecord.id}
      />
    </>
  );
};
