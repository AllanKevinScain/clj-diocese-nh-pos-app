'use client';

import { useMutation } from '@tanstack/react-query';

import { getWorkTableByCourseId, registerWorkTable, updateWorkTable } from './crud';

export function useWorkTable() {
  const mutationRegisterWorkTable = useMutation({
    mutationFn: registerWorkTable,
    mutationKey: ['registerWorkTable'],
  });
  const mutationUpdateWorkTable = useMutation({
    mutationFn: updateWorkTable,
    mutationKey: ['updateWorkTable'],
  });

  return {
    registerWorkTable: mutationRegisterWorkTable.mutateAsync,
    updateWorkTable: mutationUpdateWorkTable.mutateAsync,
    getWorkTableByCourseId,
  };
}
