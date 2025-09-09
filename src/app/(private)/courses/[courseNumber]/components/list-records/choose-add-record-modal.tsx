'use client';

import { usePathname } from 'next/navigation';
import { BiHeart } from 'react-icons/bi';
import { GiKnifeFork } from 'react-icons/gi';
import { TbCircleNumber1Filled, TbCircleNumber2Filled } from 'react-icons/tb';

import { Button, DefaultDialog } from '@/components';

interface AddRecordModalInterface {
  isOpen: boolean;
  handleModal: () => void;
  courseNumber: string;
}

export const AddRecordModal = (props: AddRecordModalInterface) => {
  const { courseNumber, isOpen, handleModal } = props;
  const path = usePathname();
  const isPosll = path.includes('posll');

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
        {!isPosll && (
          <Button
            isLink
            className="w-full"
            href={`/record/posl/register?courseNumber=${courseNumber}`}>
            <TbCircleNumber1Filled />
            Candidato a CLJ l
          </Button>
        )}
        {isPosll && (
          <Button
            isLink
            className="w-full"
            href={`/record/posll/register?courseNumber=${courseNumber}`}>
            <TbCircleNumber2Filled />
            Candidato a CLJ ll
          </Button>
        )}
        <Button
          isLink
          className="w-full"
          href={`/record/work/register?courseNumber=${courseNumber}`}>
          <GiKnifeFork />
          Trabalho
        </Button>
        <Button
          isLink
          className="w-full"
          href={`/record/couple-work/register?courseNumber=${courseNumber}`}>
          <BiHeart />
          Casal
        </Button>
      </div>
    </DefaultDialog>
  );
};
