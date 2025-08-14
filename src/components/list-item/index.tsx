'use client';

import type { Dayjs } from 'dayjs';
import { FaEllipsisV, FaPeopleArrows, FaRegHeart } from 'react-icons/fa';
import { GiKnifeFork } from 'react-icons/gi';
import { TbCircleNumber1Filled, TbCircleNumber2Filled } from 'react-icons/tb';
import { twMerge } from 'tailwind-merge';

import { Button, DefaultDialog } from '@/components';
import { formatMobilePhone } from '@/helpers';
import type { RecordType } from '@/types';

interface ListItemInterface {
  id: string;
  typeOfRecord: RecordType;
  candidateName: string;
  nickname: string;
  candidatePhone: string;
  handleOpenSubMenu: (_: string) => void;
  selectedId: boolean;
  handleViewRecord: () => void;
  courseNumber?: string;
  updatedAt?: Dayjs;
  womanName?: string;
}

export const ListItem = (props: ListItemInterface) => {
  const {
    candidateName,
    candidatePhone,
    id,
    nickname,
    selectedId,
    handleOpenSubMenu,
    handleViewRecord,
    typeOfRecord,
    courseNumber,
    updatedAt,
    womanName,
  } = props;

  return (
    <div
      className={twMerge(
        'relative',
        'bg-white p-4',
        'rounded-xl border border-gray-200',
        'shadow-sm',
      )}>
      <div className="flex items-center justify-between gap-[12px]">
        {typeOfRecord === 'POSl' && <TbCircleNumber1Filled size={24} className="text-gray-500" />}
        {typeOfRecord === 'POSll' && <TbCircleNumber2Filled size={24} className="text-gray-500" />}
        {typeOfRecord === 'WORK' && <GiKnifeFork size={24} className="text-gray-500" />}
        {typeOfRecord === 'COUPLE_WORK' && (
          <>
            <FaRegHeart size={24} className="text-gray-500" />
            <FaPeopleArrows size={24} className="text-gray-500" />
          </>
        )}
        <div className="w-full">
          {typeOfRecord !== 'COUPLE_WORK' && (
            <p className="font-semibold text-gray-800">
              {candidateName} ({nickname})
            </p>
          )}
          {typeOfRecord === 'COUPLE_WORK' && (
            <p className="font-semibold text-gray-800">
              Tio {candidateName} e Tia {womanName}
            </p>
          )}
          <div className="flex w-full justify-between">
            <p className="text-sm text-gray-500">
              {courseNumber ? courseNumber : updatedAt?.format('DD/MM/YYYY')}
            </p>
            <p className="text-sm text-gray-500">{formatMobilePhone(candidatePhone)}</p>
          </div>
        </div>
        <Button variant="ghost" onClick={() => handleOpenSubMenu(id)} className="h-[45px] w-fit">
          <FaEllipsisV size={16} />
        </Button>
      </div>

      <DefaultDialog
        isOpen={selectedId}
        handleModal={() => handleOpenSubMenu(id)}
        title={'Ver detalhes'}
        actionsButtons={
          <div className="flex w-full justify-end">
            <Button
              variant="outline"
              className="flex max-w-[80px] justify-center"
              onClick={() => handleOpenSubMenu(id)}>
              Não
            </Button>
          </div>
        }>
        <div className="flex flex-col">
          <Button
            variant="outline"
            className="flex max-w-[80px] justify-center"
            onClick={handleViewRecord}>
            Visualizar
          </Button>
        </div>
      </DefaultDialog>
    </div>
  );
};
