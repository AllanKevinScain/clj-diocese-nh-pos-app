'use client';

import { useRouter } from 'next/navigation';
import { Fragment, useCallback, useState } from 'react';
import { FaSadCry } from 'react-icons/fa';
import { GrOverview } from 'react-icons/gr';
import { twMerge } from 'tailwind-merge';

import { Button, DefaultDialog, ListItem } from '@/components';
import type { FilterRecordsType, RecordFilterType } from '@/types';

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

  const navigateToViewRecord = useCallback(
    (item: RecordFilterType) => {
      if (item.typeOfRecord === 'POSl' || item.typeOfRecord === 'POSll') {
        router.push(`/record/${item.typeOfRecord?.toLocaleLowerCase()}/view?id=${item.id}`);
      } else if (item.typeOfRecord === 'WORK') {
        router.push(`/record/work/view?id=${item.id}`);
      } else {
        router.push(`/record/couple-work/view?id=${item.id}`);
      }
    },
    [router],
  );

  const title = useCallback((item: RecordFilterType) => {
    if (item.typeOfRecord === 'COUPLE_WORK') {
      return `Detalhes da ficha de Tio ${item.candidateName} e Tia ${item.recordCouple?.womanName}`;
    }
    return `Detalhes da ficha de ${item.candidateName}`;
  }, []);

  if (!list?.ok) return;

  if (list.data.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center gap-[16px]">
        <FaSadCry size={45} />
        <h3 className="text-neutral-600">Nenhum resultado encontrado</h3>
        <Button onClick={clearFilters} className="w-fit">
          Limpar filtros
        </Button>
      </div>
    );
  }

  return (
    <div className={twMerge('flex flex-col gap-[16px]', 'overflow-auto')}>
      {list.data.map((record) => (
        <Fragment key={record.id}>
          <ListItem
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
          <DefaultDialog
            isOpen={openMenuId === record.id}
            handleModal={() => toggleMenu(record.id)}
            title={title(record)}
            actionsButtons={
              <div className="flex justify-end">
                <Button className="w-fit" onClick={() => toggleMenu(record.id)}>
                  Cancelar
                </Button>
              </div>
            }>
            <div className="flex flex-col">
              <Button onClick={() => navigateToViewRecord(record)}>
                <GrOverview />
                Visualizar
              </Button>
            </div>
          </DefaultDialog>
        </Fragment>
      ))}
    </div>
  );
};
