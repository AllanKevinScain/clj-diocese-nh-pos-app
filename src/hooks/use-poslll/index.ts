'use client';

import { useMutation } from '@tanstack/react-query';

import { changeStatusPoslll, registerPoslll, updatePoslll } from './crud';
import { listPoslll } from './listners';

export function usePoslll() {
  const registerPoslllMutation = useMutation({
    mutationKey: ['registerPoslll'],
    mutationFn: registerPoslll,
  });

  const updatePoslllMutation = useMutation({
    mutationKey: ['updatePoslll'],
    mutationFn: updatePoslll,
  });

  const changeStatusPoslllMutation = useMutation({
    mutationKey: ['changeStatusPoslll'],
    mutationFn: changeStatusPoslll,
  });

  return {
    listPoslll,
    registerPoslll: registerPoslllMutation,
    updatePoslll: updatePoslllMutation,
    changeStatusPoslll: changeStatusPoslllMutation,
  };
}
