'use client';

import { useRouter } from 'next/navigation';
import { BiEdit } from 'react-icons/bi';
import { HiArrowUturnLeft } from 'react-icons/hi2';

import type { ActionButtonTypes } from '@/components';
import { ControlButtons } from '@/components';

interface ViewRecordBottomBarInterface {
  recordId: string;
  courseNumber: string;
}

export const ViewRecordBottomBar = (props: ViewRecordBottomBarInterface) => {
  const { courseNumber, recordId } = props;
  const navigate = useRouter();

  const actionButtons: ActionButtonTypes[] = [
    {
      label: 'Editar',
      type: 'warning',
      icon: <BiEdit size={40} />,
      url: `/record/pos-l/edit?courseNumber=${courseNumber}&id=${recordId}`,
      click: () => {},
    },
    {
      label: 'Voltar',
      icon: <HiArrowUturnLeft size={40} />,
      url: '',
      click: () => navigate.back(),
    },
  ];

  return <ControlButtons buttons={actionButtons} />;
};
