'use client';

import { FaPeopleArrows } from 'react-icons/fa';
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

  return (
    <DefaultDialog
      isOpen={isOpen}
      handleModal={handleModal}
      title="Adicionar nova ficha de:"
      actionsButtons={
        <div className="flex justify-end">
          <Button className="w-fit" onClick={handleModal}>
            Cancelar
          </Button>
        </div>
      }>
      <div className="flex flex-col gap-[12px]">
        <Button isLink href={`/record/posl/register?courseNumber=${courseNumber}`}>
          <TbCircleNumber1Filled />
          Jovem CLJ l
        </Button>
        <Button isLink href={`/record/posll/register?courseNumber=${courseNumber}`}>
          <TbCircleNumber2Filled />
          Jovem CLJ ll
        </Button>
        <Button isLink href={`/record/work/register?courseNumber=${courseNumber}`}>
          <GiKnifeFork />
          Trabalho
        </Button>
        <Button isLink href={`/record/couple-work/register?courseNumber=${courseNumber}`}>
          <FaPeopleArrows />
          Casal
        </Button>
      </div>
    </DefaultDialog>
  );
};
