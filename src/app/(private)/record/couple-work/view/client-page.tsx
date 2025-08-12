'use client';

import { yupResolver } from '@hookform/resolvers/yup';
import { FormProvider, useForm } from 'react-hook-form';
import type { InferType } from 'yup';

import { ViewRecordBottomBar } from '@/components';
import { CoupleForm } from '@/components/forms';
import type { RecordCoupleResponseInterface } from '@/types';
import { coupleSchema } from '@/yup';

type CoupleSchemaInfertype = InferType<typeof coupleSchema>;

interface ViewRecordCoupleClientPageInterface {
  record: RecordCoupleResponseInterface;
}

export const ViewRecordCoupleClientPage = (props: ViewRecordCoupleClientPageInterface) => {
  const { record } = props;

  const methods = useForm<CoupleSchemaInfertype>({
    resolver: yupResolver(coupleSchema),
    defaultValues: record,
  });

  return (
    <>
      <FormProvider {...methods}>
        <CoupleForm onSubmit={() => null} isDisabled />
      </FormProvider>
      <ViewRecordBottomBar
        redirectEditUrl={`/record/couple-work/edit?courseNumber=${record.courseNumber}&id=${record.id}`}
      />
    </>
  );
};
