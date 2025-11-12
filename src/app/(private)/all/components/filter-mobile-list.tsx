'use client';

import { useCallback, useState } from 'react';
import { twMerge } from 'tailwind-merge';

import { Empty, ListItem } from '@/components';
import type { FilterRecordsType } from '@/types';

interface FilterMobileListInterface {
  list?: FilterRecordsType;
  clearFilters: () => void;
}

export const FilterMobileList = (props: FilterMobileListInterface) => {
  const { list, clearFilters } = props;
  const [openMenuId, setOpenMenuId] = useState<string | null>(null);

  const toggleMenu = useCallback((id: string) => {
    setOpenMenuId((prev) => (prev === id ? null : id));
  }, []);

  if (!list?.ok) return;

  if (list.data.length === 0) {
    return (
      <Empty className="h-[50vh]" title="Nenhum resultado encontrado" handleClick={clearFilters} />
    );
  }

  return (
    <div className={twMerge('flex flex-col gap-[16px]', 'overflow-auto')}>
      {list.data.map((record) => {
        function url() {
          if (record.typeOfRecord === 'POSl' || record.typeOfRecord === 'POSll') {
            return `/record/${record.typeOfRecord?.toLocaleLowerCase()}/view?id=${record.id}`;
          } else if (record.isWork) {
            return `/record/work/view?id=${record.id}`;
          }
          return `/record/couple-work/view?id=${record.id}`;
        }

        return (
          <ListItem.record
            key={record.id}
            {...record}
            womanName={record.recordCouple?.womanName}
            selectedId={openMenuId === record.id}
            handleOpenSubMenu={(id) => toggleMenu(id)}
            urlViewRecord={url()}
          />
        );
      })}
    </div>
  );
};
