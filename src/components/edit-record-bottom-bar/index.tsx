'use client';

import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { useCallback, useMemo } from 'react';
import toast from 'react-hot-toast';
import { BiTrash } from 'react-icons/bi';
import { HiArrowUturnLeft } from 'react-icons/hi2';

import type { ActionButtonTypes } from '@/components';
import { AcceptModal, ControlButtons } from '@/components';
import { useRecords, useToggleModal } from '@/hooks';
import type { CompleteRecordInterface } from '@/types';

type EditRecordBottomBarInterface = Pick<CompleteRecordInterface, 'id'>;

export const EditRecordBottomBar = (props: EditRecordBottomBarInterface) => {
  const navigate = useRouter();
  const { data: dataSession } = useSession();
  const { deleteRecordById } = useRecords();
  const { isOpen, handle } = useToggleModal();

  const actionButtons: ActionButtonTypes[] = useMemo(() => {
    const permissionsFuntions = [
      {
        label: 'Voltar',
        icon: <HiArrowUturnLeft size={40} />,
        url: '',
        click: () => navigate.back(),
      },
    ];
    if (dataSession?.user.loginType === 'admin') {
      return [
        {
          label: 'Desativar',
          icon: <BiTrash size={40} />,
          url: '',
          click: () => handle(),
        },
        ...permissionsFuntions,
      ];
    }
    return permissionsFuntions;
  }, [dataSession?.user.loginType, handle, navigate]);

  const deleteRecord = useCallback(async () => {
    const response = await deleteRecordById(props);

    if (!response?.ok) {
      toast.error(response.data.message);
    } else {
      toast.success(response.data.message);
      navigate.push('/courses');
    }
  }, [deleteRecordById, navigate, props]);

  return (
    <>
      <AcceptModal isOpen={isOpen} handle={handle} accept={deleteRecord} />
      <ControlButtons buttons={actionButtons} />
    </>
  );
};
