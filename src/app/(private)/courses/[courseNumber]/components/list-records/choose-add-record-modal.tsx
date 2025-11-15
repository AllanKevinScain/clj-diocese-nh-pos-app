'use client';

import { usePathname } from 'next/navigation';
import { useMemo } from 'react';
import { BiHeart } from 'react-icons/bi';
import { GiKnifeFork } from 'react-icons/gi';
import { TbCircleNumber1Filled, TbCircleNumber2Filled } from 'react-icons/tb';

import { Button, DefaultDialog } from '@/components';
import type { CompleteRecordInterface } from '@/types';

type CutCompleteRecordType = Pick<CompleteRecordInterface, 'courseNumber'>;

interface AddRecordModalInterface extends CutCompleteRecordType {
  isOpen: boolean;
  handleModal: () => void;
}

export const AddRecordModal = (props: AddRecordModalInterface) => {
  const { courseNumber, isOpen, handleModal } = props;

  const path = usePathname();

  const typeOfRecord = useMemo(() => {
    if (path.includes('posll')) return 'POSll';
    return 'POSl';
  }, [path]);

  return (
    <DefaultDialog
      isOpen={isOpen}
      handleModal={handleModal}
      title="Adicionar nova ficha para:"
      actionsButtons={
        <div className="flex justify-end">
          <Button className="w-fit" onClick={handleModal}>
            Cancelar
          </Button>
        </div>
      }>
      <div className="flex flex-col gap-[12px]">
        {typeOfRecord === 'POSl' && (
          <Button isLink className="w-full" href={`/courses/${courseNumber}/posl/register`}>
            <TbCircleNumber1Filled />
            Candidato a CLJ l
          </Button>
        )}
        {typeOfRecord === 'POSll' && (
          <Button isLink className="w-full" href={`/courses/${courseNumber}/posll/register`}>
            <TbCircleNumber2Filled />
            Candidato a CLJ ll
          </Button>
        )}
        <Button
          isLink
          className="w-full"
          href={`/courses/${courseNumber}/${typeOfRecord?.toLowerCase()}/register?FT=WORK`}>
          <GiKnifeFork />
          Trabalho
        </Button>
        <Button
          isLink
          className="w-full"
          href={`/courses/${courseNumber}/${typeOfRecord?.toLowerCase()}/register?FT=COUPLE`}>
          <BiHeart />
          Casal
        </Button>
      </div>
    </DefaultDialog>
  );
};
