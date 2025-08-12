'use client';

import { useRouter } from 'next/navigation';
import { useMemo } from 'react';
import { BiEdit } from 'react-icons/bi';
import { HiArrowUturnLeft } from 'react-icons/hi2';

import type { ActionButtonTypes } from '@/components';
import { ControlButtons } from '@/components';

interface ViewRecordBottomBarInterface {
  redirectEditUrl: string;
}

export const ViewRecordBottomBar = (props: ViewRecordBottomBarInterface) => {
  const { redirectEditUrl } = props;
  const navigate = useRouter();

  const actionButtons: ActionButtonTypes[] = useMemo(
    () => [
      {
        label: 'Editar',
        type: 'warning',
        icon: <BiEdit size={40} />,
        url: redirectEditUrl,
        click: () => {},
      },
      {
        label: 'Voltar',
        icon: <HiArrowUturnLeft size={40} />,
        url: '',
        click: () => navigate.back(),
      },
    ],
    [navigate, redirectEditUrl],
  );

  return <ControlButtons buttons={actionButtons} />;
};
