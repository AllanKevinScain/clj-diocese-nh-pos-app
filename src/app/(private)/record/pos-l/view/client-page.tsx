'use client';

import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import type { InferType } from 'yup';

import { Pos1Form } from '@/components/forms';
import { poslSchema } from '@/yup';

import type { RecordPoslResponseInterface } from './view.type';

type PoslSchemaInfertype = InferType<typeof poslSchema>;

interface ViewRecordPoslClientPageInterface {
  record: RecordPoslResponseInterface;
}

export const ViewRecordPoslClientPage = (props: ViewRecordPoslClientPageInterface) => {
  const { record } = props;
  const { recordPOSl, ...restRecord } = record;
  const { id: _, ...restRecordPOSl } = recordPOSl;

  const { control, ...restMethods } = useForm<PoslSchemaInfertype>({
    resolver: yupResolver(poslSchema),
    defaultValues: {
      ...restRecord,
      ...restRecordPOSl,
      recordNumber: String(restRecord.recordNumber),
    },
  });

  return <Pos1Form control={control} {...restMethods} onSubmit={() => null} isDisabled />;
};
