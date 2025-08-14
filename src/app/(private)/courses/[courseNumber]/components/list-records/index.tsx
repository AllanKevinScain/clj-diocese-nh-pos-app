'use client';

import dayjs from 'dayjs';
import { isEmpty } from 'lodash';
import { useRouter } from 'next/navigation';
import { useCallback, useState } from 'react';
import { BiPlus } from 'react-icons/bi';
import { FaClipboardList } from 'react-icons/fa';
import { twMerge } from 'tailwind-merge';

import { Button, ListItem } from '@/components';
import { useToggleModal } from '@/hooks';
import type { ListRecordsInterface } from '@/types/list-records.type';

import { AddRecordModal } from './choose-add-record-modal';

export const ListRecords = (props: ListRecordsInterface) => {
  const { records, courseNumber } = props;
  const router = useRouter();
  const { handle, isOpen } = useToggleModal();
  const [openMenuId, setOpenMenuId] = useState<string | null>(null);

  const orderRecordsForDate = records?.sort((a, b) => {
    const upA = dayjs(a.updatedAt);
    const upB = dayjs(b.updatedAt);
    if (upA.isAfter(upB)) return 0;
    return 1;
  });

  const toggleMenu = useCallback((id: string) => {
    setOpenMenuId((prev) => (prev === id ? null : id));
  }, []);

  return (
    <>
      <AddRecordModal isOpen={isOpen} handleModal={handle} courseNumber={courseNumber} />
      <div className={twMerge('flex flex-col gap-[12px]', 'w-full')}>
        <div className="flex items-center justify-between">
          <h1 className={twMerge('text-2xl font-bold', 'inline-flex items-center gap-[12px]')}>
            <FaClipboardList size={24} className="text-gray-500" /> Fixas de curso {courseNumber}
          </h1>
          <Button variant="ghost" className="w-[45px] p-0" onClick={handle}>
            <BiPlus size={45} />
          </Button>
        </div>

        {!isEmpty(orderRecordsForDate) && (
          <div className={twMerge('flex flex-col gap-[12px]', 'w-full')}>
            {orderRecordsForDate?.map((record) => {
              return (
                <ListItem
                  key={record.id}
                  candidateName={record.candidateName}
                  candidatePhone={record.candidatePhone}
                  id={record.id}
                  nickname={record.nickname}
                  typeOfRecord={record.typeOfRecord}
                  updatedAt={dayjs(record.updatedAt)}
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
              );
            })}
          </div>
        )}
      </div>
    </>
  );
};
