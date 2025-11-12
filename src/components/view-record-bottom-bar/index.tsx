'use client';

import { useSession } from 'next-auth/react';
import { useMemo } from 'react';
import { BiEdit } from 'react-icons/bi';
import { HiArrowUturnLeft } from 'react-icons/hi2';

import type { ActionButtonTypes } from '@/components';
import { ControlButtons } from '@/components';

interface ViewRecordBottomBarInterface {
  redirectEditUrl: string;
  redirectBackUrl: string;
}

export const ViewRecordBottomBar = (props: ViewRecordBottomBarInterface) => {
  const { redirectEditUrl, redirectBackUrl } = props;
  const { data: dataSession } = useSession();

  const actionButtons: ActionButtonTypes[] = useMemo(() => {
    const permissionsFuntions: ActionButtonTypes[] = [
      {
        label: 'Voltar',
        icon: <HiArrowUturnLeft size={40} />,
        url: redirectBackUrl,
      },
    ];

    if (dataSession?.user.loginType === 'admin') {
      return [
        {
          label: 'Editar',
          type: 'warning',
          icon: <BiEdit size={40} />,
          url: redirectEditUrl,
        },
        ...permissionsFuntions,
      ];
    }
    return permissionsFuntions;
  }, [dataSession?.user.loginType, redirectBackUrl, redirectEditUrl]);

  return <ControlButtons buttons={actionButtons} />;
};
