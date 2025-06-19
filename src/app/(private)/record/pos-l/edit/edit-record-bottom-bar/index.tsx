'use client';

import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import { BiTrash } from 'react-icons/bi';
import { HiArrowUturnLeft } from 'react-icons/hi2';

import type { ActionButtonTypes } from '@/components';
import { AcceptModal, ControlButtons } from '@/components';
import { useRecords, useToggleModal } from '@/hooks';

interface EditRecordBottomBarInterface {
  recordId: string;
}

export const EditRecordBottomBar = (props: EditRecordBottomBarInterface) => {
  const { recordId } = props;
  const navigate = useRouter();
  const { deleteRecordById } = useRecords();
  const { isOpen, handle } = useToggleModal();

  const actionButtons: ActionButtonTypes[] = [
    {
      label: 'Excluir',
      type: 'error',
      icon: <BiTrash size={40} />,
      url: '',
      click: () => handle(),
    },
    {
      label: 'Voltar',
      icon: <HiArrowUturnLeft size={40} />,
      url: '',
      click: () => navigate.back(),
    },
  ];

  async function deleteCourseById() {
    const response = await deleteRecordById(recordId);

    if (!response?.ok) {
      toast.error(response.data.message);
    } else {
      toast.success(response.data.message);
      navigate.push('/courses');
    }
  }

  return (
    <>
      <AcceptModal isOpen={isOpen} handle={handle} accept={deleteCourseById} />
      <ControlButtons buttons={actionButtons} />
    </>
  );
};
