'use client';

import { useContext } from 'react';
import { twMerge } from 'tailwind-merge';

import { Loading, SessionForm } from '@/components';
import { MontageContext } from '@/providers';
import type { TabComponentWorkTableInterface } from '@/types';

import { DynamicListSelect } from '../components';

export const Kitchen = (props: Pick<TabComponentWorkTableInterface, 'control'>) => {
  const { control } = props;

  const { isLoadingRecords, records } = useContext(MontageContext);

  if (isLoadingRecords) return <Loading />;

  return (
    <div className={twMerge('flex flex-col gap-[16px]', 'w-full pb-[10%]')}>
      <SessionForm title="Copa:">
        <DynamicListSelect
          control={control}
          id="copeWorkRecords"
          options={records?.filter((record) => record.isWork || record.isCoupleWork) || []}
        />
      </SessionForm>
      <SessionForm title="Limpeza:">
        <DynamicListSelect
          control={control}
          id="cleanWorkRecords"
          options={records?.filter((record) => record.isWork || record.isCoupleWork) || []}
        />
      </SessionForm>
      <SessionForm title="Cozinha:">
        <DynamicListSelect
          control={control}
          id="kitchenWorkRecords"
          options={records?.filter((record) => record.isWork || record.isCoupleWork) || []}
        />
      </SessionForm>
    </div>
  );
};
