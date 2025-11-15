'use client';

import { isEmpty } from 'lodash';
import { usePathname } from 'next/navigation';
import { useCallback, useMemo, useState } from 'react';
import { BiPlus } from 'react-icons/bi';
import { FaClipboardList } from 'react-icons/fa';
import { twMerge } from 'tailwind-merge';

import { Button, Empty, Heading, ListItem, Loading } from '@/components';
import { useToggleModal } from '@/hooks';
import type { ListRecordsInterface } from '@/types/list-records.type';

import { AddRecordModal } from './choose-add-record-modal';

export const ListRecords = (props: ListRecordsInterface) => {
  const { records, courseNumber, loading } = props;
  const path = usePathname();

  const { handle, isOpen } = useToggleModal();
  const [openMenuId, setOpenMenuId] = useState<string | null>(null);

  const typeOfRecord = useMemo(() => {
    if (path.includes('posll')) return 'Pós CLJ 2';
    return 'Pós CLJ 1';
  }, [path]);

  const toggleMenu = useCallback((id: string) => {
    setOpenMenuId((prev) => (prev === id ? null : id));
  }, []);

  if (loading) return <Loading />;

  return (
    <>
      <AddRecordModal isOpen={isOpen} handleModal={handle} courseNumber={courseNumber} />

      <div className={twMerge('flex flex-col gap-[12px]', 'w-full')}>
        <div className="flex items-center justify-between">
          <Heading className={twMerge('inline-flex items-center gap-[12px] text-[20px]')}>
            <FaClipboardList size={24} /> Fixas do curso {courseNumber} {typeOfRecord}
          </Heading>
          <Button variant="ghost" className="p-0 dark:text-neutral-100" onClick={handle}>
            <BiPlus size={45} />
          </Button>
        </div>

        {!isEmpty(records) && (
          <div className={twMerge('flex flex-col gap-[12px]', 'w-full')}>
            {records?.map((record) => {
              return (
                <ListItem.record
                  key={record.id}
                  {...record}
                  womanName={record.recordCouple?.womanName}
                  selectedId={openMenuId === record.id}
                  handleOpenSubMenu={(id) => toggleMenu(id)}
                  urlViewRecord={`/record/view?id=${record.id}`}
                />
              );
            })}
          </div>
        )}

        {isEmpty(records) && <Empty className="h-[50vh]" title="Nenhuma ficha cadastrada" />}
      </div>
    </>
  );
};
