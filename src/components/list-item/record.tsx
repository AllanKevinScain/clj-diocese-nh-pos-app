'use client';

import dayjs from 'dayjs';
import { useCallback } from 'react';
import { FaPeopleArrows, FaRegHeart } from 'react-icons/fa';
import { GiKnifeFork } from 'react-icons/gi';
import { GrOverview } from 'react-icons/gr';
import { TbCircleNumber1Filled, TbCircleNumber2Filled } from 'react-icons/tb';
import { twMerge } from 'tailwind-merge';

import { Button, DefaultDialog, Text } from '@/components';
import { formatMobilePhone } from '@/helpers';
import type { PosDefaultInferType } from '@/yup';

type PickPosSchematype = Pick<
  PosDefaultInferType,
  | 'typeOfRecord'
  | 'candidateName'
  | 'nickname'
  | 'candidatePhone'
  | 'courseNumber'
  | 'updatedAt'
  | 'isWork'
  | 'isCoupleWork'
  | 'id'
>;

interface RecordListItemInterface extends PickPosSchematype {
  handleOpenSubMenu: (_: string) => void;
  selectedId: boolean;
  urlViewRecord: string;
  womanName?: string;
}

export const RecordListItem = (props: RecordListItemInterface) => {
  const {
    candidateName,
    candidatePhone,
    id = '',
    nickname,
    selectedId,
    handleOpenSubMenu,
    urlViewRecord,
    typeOfRecord,
    courseNumber,
    updatedAt,
    womanName,
    isCoupleWork,
    isWork,
  } = props;

  const iconsStyle = twMerge('text-neutral-500', 'dark:text-neutral-300');

  const title = useCallback(() => {
    if (isCoupleWork) {
      return `Detalhes da ficha de Tio ${candidateName} e Tia ${womanName}`;
    }
    return `Detalhes da ficha de ${candidateName}`;
  }, [candidateName, isCoupleWork, womanName]);

  return (
    <>
      <button
        className={twMerge(
          'relative',
          'cursor-pointer',
          'bg-neutral-300 p-4',
          'rounded-xl border border-neutral-700',
          'shadow-sm',
          'dark:bg-neutral-700',
          'dark:active:bg-neutral-500',
        )}
        onClick={() => handleOpenSubMenu(id)}>
        <div className="flex items-center justify-between gap-[12px]">
          {typeOfRecord === 'POSl' && <TbCircleNumber1Filled size={24} className={iconsStyle} />}
          {typeOfRecord === 'POSll' && <TbCircleNumber2Filled size={24} className={iconsStyle} />}
          {isWork && <GiKnifeFork size={24} className={iconsStyle} />}
          {isCoupleWork && (
            <>
              <FaRegHeart size={24} className={iconsStyle} />
              <FaPeopleArrows size={24} className={iconsStyle} />
            </>
          )}
          <div className="w-full">
            {!isCoupleWork && (
              <Text className="text-start">
                {candidateName} ({nickname})
              </Text>
            )}
            {isCoupleWork && (
              <Text className="text-start">
                Tio {candidateName} e Tia {womanName}
              </Text>
            )}
            <div className="flex w-full justify-between">
              <Text>{courseNumber ? courseNumber : dayjs(updatedAt)?.format('DD/MM/YYYY')}</Text>
              <Text>{formatMobilePhone(candidatePhone)}</Text>
            </div>
          </div>
        </div>
      </button>
      <DefaultDialog
        isOpen={selectedId}
        handleModal={() => handleOpenSubMenu(id)}
        title={title()}
        actionsButtons={
          <div className="flex w-full justify-end">
            <Button variant="outline" className="w-[80px]" onClick={() => handleOpenSubMenu(id)}>
              Não
            </Button>
          </div>
        }>
        <Button isLink className="w-full" href={urlViewRecord}>
          <GrOverview />
          Visualizar
        </Button>
      </DefaultDialog>
    </>
  );
};
