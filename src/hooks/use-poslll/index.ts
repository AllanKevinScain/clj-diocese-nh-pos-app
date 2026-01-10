'use client';

import { useMutation } from '@tanstack/react-query';

import type { PoslllSchemaInferType } from '@/yup';

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

  async function getPoslllById(id: string): Promise<{ ok: boolean; data: PoslllSchemaInferType }> {
    const req = await fetch(`/api/poslll/${id}`, {
      method: 'GET',
    });
    const res = await req.json();
    return res;
  }

  return {
    listPoslll,
    registerPoslll: registerPoslllMutation,
    updatePoslll: updatePoslllMutation,
    changeStatusPoslll: changeStatusPoslllMutation,
    getPoslllById,
  };
}
