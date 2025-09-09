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
import type { RecordType } from '@/types';

interface EditRecordBottomBarInterface {
  recordId: string;
  recordType: RecordType;
}

export const EditRecordBottomBar = (props: EditRecordBottomBarInterface) => {
  const { recordId, recordType } = props;
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
      permissionsFuntions.push({
        label: 'Excluir',
        icon: <BiTrash size={40} />,
        url: '',
        click: () => handle(),
      });
    }
    return permissionsFuntions;
  }, [dataSession?.user.loginType, handle, navigate]);

  const deleteRecord = useCallback(async () => {
    const response = await deleteRecordById(recordId, recordType);

    if (!response?.ok) {
      toast.error(response.data.message);
    } else {
      toast.success(response.data.message);
      navigate.push('/courses');
    }
  }, [deleteRecordById, navigate, recordId, recordType]);

  return (
    <>
      <AcceptModal isOpen={isOpen} handle={handle} accept={deleteRecord} />
      <ControlButtons buttons={actionButtons} />
    </>
  );
};
