'use client';

import { useRouter } from 'next/navigation';
import { useCallback, useState } from 'react';
import { FaSadCry } from 'react-icons/fa';
import { twMerge } from 'tailwind-merge';

import { Button, Heading, ListItem } from '@/components';
import type { FilterRecordsType } from '@/types';

interface FilterMobileListInterface {
  list?: FilterRecordsType;
  clearFilters: () => void;
}

export const FilterMobileList = (props: FilterMobileListInterface) => {
  const { list, clearFilters } = props;
  const router = useRouter();
  const [openMenuId, setOpenMenuId] = useState<string | null>(null);

  const toggleMenu = useCallback((id: string) => {
    setOpenMenuId((prev) => (prev === id ? null : id));
  }, []);

  if (!list?.ok) return;

  if (list.data.length === 0) {
    return (
      <div className={twMerge('flex flex-col items-center justify-center', 'h-[50vh] w-full')}>
        <FaSadCry size={45} />
        <Heading as="h3">Nenhum resultado encontrado</Heading>
        <Button onClick={clearFilters}>Limpar filtros</Button>
      </div>
    );
  }

  return (
    <div className={twMerge('flex flex-col gap-[16px]', 'overflow-auto')}>
      {list.data.map((record) => (
        <ListItem.record
          key={record.id}
          candidateName={record.candidateName}
          candidatePhone={record.candidatePhone}
          id={record.id}
          nickname={record.nickname}
          typeOfRecord={record.typeOfRecord}
          courseNumber={record.courseNumber}
          womanName={record.recordCouple?.womanName}
          selectedId={openMenuId === record.id}
          handleOpenSubMenu={(id) => toggleMenu(id)}
          handleViewRecord={() => {
            if (record.typeOfRecord === 'POSl' || record.typeOfRecord === 'POSll') {
              router.push(
                `/record/${record.typeOfRecord?.toLocaleLowerCase()}/view?id=${record.id}`,
              );
            } else if (record.typeOfRecord === 'WORK') {
              router.push(`/record/work/view?id=${record.id}`);
            } else {
              router.push(`/record/couple-work/view?id=${record.id}`);
            }
          }}
        />
      ))}
    </div>
  );
};
