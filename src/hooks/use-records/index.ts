'use client';

import { useMutation } from '@tanstack/react-query';

import {
  deleteRecordById,
  editPoslllRecord,
  editPosllRecord,
  editPoslRecord,
  registerPoslllRecord,
  registerPosllRecord,
  registerPoslRecord,
} from './crud';
import { listAllRecords, listRecordByCourseId } from './listners';

export function useRecords() {
  const mutationRegisterPoslRecord = useMutation({
    mutationKey: ['registerPoslRecord'],
    mutationFn: registerPoslRecord,
  });
  const mutationRegisterPosllRecord = useMutation({
    mutationKey: ['registerPosllRecord'],
    mutationFn: registerPosllRecord,
  });
  const mutationRegisterPoslllRecord = useMutation({
    mutationKey: ['registerPoslllRecord'],
    mutationFn: registerPoslllRecord,
  });

  const mutationEditPoslRecord = useMutation({
    mutationKey: ['editPoslRecord'],
    mutationFn: editPoslRecord,
  });
  const mutationEditPosllRecord = useMutation({
    mutationKey: ['editPosllRecord'],
    mutationFn: editPosllRecord,
  });
  const mutationEditPoslllRecord = useMutation({
    mutationKey: ['editPoslllRecord'],
    mutationFn: editPoslllRecord,
  });

  const mutationdeleteRecord = useMutation({
    mutationKey: ['deleteRecordById'],
    mutationFn: deleteRecordById,
  });

  return {
    listAllRecords,
    listRecordByCourseId,
    registerPoslRecord: mutationRegisterPoslRecord,
    registerPosllRecord: mutationRegisterPosllRecord,
    registerPoslllRecord: mutationRegisterPoslllRecord,
    editPoslRecord: mutationEditPoslRecord,
    editPosllRecord: mutationEditPosllRecord,
    editPoslllRecord: mutationEditPoslllRecord,
    deleteRecordById: mutationdeleteRecord,
  };
}
