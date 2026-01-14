'use client';

import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import toast from 'react-hot-toast';

import { deleteRecordById, editRecord, registerRecord } from './crud';
import { listAllRecords, listRecordByCourseId } from './listners';

export function useRecords() {
  const router = useRouter();
  const { data: dataSession } = useSession();

  const mutationRegisterRecord = useMutation({
    mutationKey: ['registerRecord'],
    mutationFn: registerRecord,
    onSuccess: (e) => {
      if (!e?.ok) {
        toast.error(e.data.message);
      } else {
        toast.success(e.data.message);
        if (e.data.data && dataSession?.user.loginType === 'manager') {
          router.push(
            `/courses/${e.data.data.courseNumber}/${e.data.data.typeOfRecord?.toLowerCase()}`,
          );
        } else {
          router.push('/courses');
        }
      }
    },
    onError: (e) => {
      console.log('🚀 ~ useRecords ~ e:', e);
      toast.error(JSON.stringify(e));
    },
  });

  const mutationEditRecord = useMutation({
    mutationKey: ['editRecord'],
    mutationFn: editRecord,
    onSuccess: (e) => {
      if (!e?.ok) {
        toast.error(e.data.message);
      } else {
        toast.success(e.data.message);
        if (e.data.data && dataSession?.user.loginType === 'manager') {
          router.push(
            `/courses/${e.data.data.courseNumber}/${e.data.data.typeOfRecord?.toLowerCase()}`,
          );
        } else {
          router.push('/courses');
        }
      }
    },
    onError: (e) => {
      toast.error(JSON.stringify(e));
    },
  });

  const mutationdeleteRecord = useMutation({
    mutationKey: ['deleteRecordById'],
    mutationFn: deleteRecordById,
  });

  return {
    listAllRecords,
    listRecordByCourseId,
    registerRecord: mutationRegisterRecord.mutateAsync,
    editRecord: mutationEditRecord.mutateAsync,
    deleteRecordById: mutationdeleteRecord,
    isFetching: mutationRegisterRecord.isPending || mutationEditRecord.isPending || false,
  };
}
