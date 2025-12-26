'use client';

import { useContext } from 'react';
import { twMerge } from 'tailwind-merge';

import { Loading, Text } from '@/components';
import { MontageContext } from '@/providers';
import type { TabComponentWorkTableInterface } from '@/types';

import { CommunityListSelect } from './community-list-select';

export const Communities = (props: Pick<TabComponentWorkTableInterface, 'control'>) => {
  const { control } = props;

  const { isLoadingRecords, records } = useContext(MontageContext);

  if (isLoadingRecords) return <Loading />;

  return (
    <div className={twMerge('flex w-full flex-col gap-[24px]', 'pb-[15%]')}>
      <div className="flex w-full flex-col">
        <Text>Quantidade de fichas: {records?.length}</Text>
        <Text>Você pode dividir em: </Text>
        <Text>
          {records?.length ?? 0} / 8 =
          <Text as="b" className="pl-[8px] font-extrabold">
            {((records?.length ?? 0) / 8).toFixed(2)}
          </Text>
        </Text>
        <Text>
          {records?.length ?? 0} / 9 =
          <Text as="b" className="pl-[8px] font-extrabold">
            {((records?.length ?? 0) / 9).toFixed(2)}
          </Text>
        </Text>
        <Text>
          {records?.length ?? 0} / 10 =
          <Text as="b" className="pl-[8px] font-extrabold">
            {((records?.length ?? 0) / 10).toFixed(2)}
          </Text>
        </Text>
        <Text>
          {records?.length ?? 0} / 11 =
          <Text as="b" className="pl-[8px] font-extrabold">
            {((records?.length ?? 0) / 11).toFixed(2)}
          </Text>
        </Text>
      </div>

      <CommunityListSelect control={control} isLoading={isLoadingRecords} options={records || []} />
    </div>
  );
};
