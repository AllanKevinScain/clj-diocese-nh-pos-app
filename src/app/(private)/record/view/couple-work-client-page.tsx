'use client';

import { yupResolver } from '@hookform/resolvers/yup';
import { FormProvider, useForm } from 'react-hook-form';

import { ViewRecordBottomBar } from '@/components';
import { CoupleForm } from '@/components/forms';
import type { CompleteRecordInterface } from '@/types';
import type { CoupleSchemaInfertype } from '@/yup';
import { coupleSchema } from '@/yup';

interface ViewRecordCoupleClientPageInterface {
  record: CompleteRecordInterface;
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
        redirectEditUrl={`/edit/record?id=${record.id}`}
        redirectBackUrl={`/courses/${record.courseNumber}/${record.typeOfRecord?.toLowerCase()}`}
      />
    </>
  );
};
