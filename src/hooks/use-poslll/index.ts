'use client';

import type { InferType } from 'yup';

import type { poslllSchema } from '@/yup';

export type PoslllInferType = InferType<typeof poslllSchema>;

export function usePoslll() {
  async function listPoslll() {
    const req = await fetch('/api/poslll/list', {
      method: 'GET',
    });
    const res = await req.json();

    return res;
  }

  async function registerPoslll(props: PoslllInferType) {
    const req = await fetch('/api/poslll', {
      method: 'POST',
      body: JSON.stringify(props),
    });
    const res = await req.json();
    return res;
  }

  async function updatePoslll(props: PoslllInferType) {
    const { id, ...rest } = props;
    const req = await fetch(`/api/poslll?poslllId=${id}`, {
      method: 'PUT',
      body: JSON.stringify(rest),
    });

    const res = await req.json();

    return res;
  }

  async function deletePoslll(poslllId: string) {
    const req = await fetch(`/api/poslll?poslllId=${poslllId}`, {
      method: 'DELETE',
    });
    const res = await req.json();
    return res;
  }

  return {
    listPoslll,
    registerPoslll,
    updatePoslll,
    deletePoslll,
  };
}
