'use client';

import { useQueryClient } from '@tanstack/react-query';
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
  const router = useRouter();
  const client = useQueryClient();

  const { data: dataSession } = useSession();
  const { deleteRecordById } = useRecords();
  const { isOpen, handle } = useToggleModal();

  const actionButtons: ActionButtonTypes[] = useMemo(() => {
    const permissionsFuntions = [
      {
        label: 'Voltar',
        icon: <HiArrowUturnLeft size={40} />,
        url: '',
        click: () => router.back(),
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
  }, [dataSession?.user.loginType, handle, router]);

  const deleteRecord = useCallback(async () => {
    await deleteRecordById.mutateAsync(props, {
      onSuccess: (data) => {
        toast.success(data.message);
        client.refetchQueries({ queryKey: ['users'] });
        router.push('/view/users');
      },
      onError: (e) => toast.error(JSON.stringify(e)),
    });
  }, [client, deleteRecordById, props, router]);

  return (
    <>
      <AcceptModal
        isOpen={isOpen}
        handle={handle}
        accept={deleteRecord}
        isLoading={deleteRecordById.isPending}
      />
      <ControlButtons buttons={actionButtons} />
    </>
  );
};
