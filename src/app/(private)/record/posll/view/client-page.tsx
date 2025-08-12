'use client';

import { yupResolver } from '@hookform/resolvers/yup';
import { FormProvider, useForm } from 'react-hook-form';
import type { InferType } from 'yup';

import { ViewRecordBottomBar } from '@/components';
import { PosllForm } from '@/components/forms';
import type { RecordPosllResponseInterface } from '@/types';
import { posllSchema } from '@/yup';

type PosllSchemaInfertype = InferType<typeof posllSchema>;

interface ViewRecordPosllClientPageInterface {
  record: RecordPosllResponseInterface;
}

export const ViewRecordPosllClientPage = (props: ViewRecordPosllClientPageInterface) => {
  const { record } = props;

  const methods = useForm<PosllSchemaInfertype>({
    resolver: yupResolver(posllSchema),
    defaultValues: record,
  });

  return (
    <>
      <FormProvider {...methods}>
        <PosllForm onSubmit={() => null} isDisabled />
      </FormProvider>
      <ViewRecordBottomBar
        redirectEditUrl={`/record/posll/edit?courseNumber=${record.courseNumber}&id=${record.id}`}
      />
    </>
  );
};
