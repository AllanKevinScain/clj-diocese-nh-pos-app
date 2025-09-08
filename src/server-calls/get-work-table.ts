import { isEmpty } from 'lodash';
import { getServerSession } from 'next-auth';

import { authOptions } from '@/auth-config';
import type { WorkTableResponseInterface } from '@/types';

export type ResponseWorkTableResponse = { ok: boolean; data: WorkTableResponseInterface | null };

export async function getWorkTableServerCall(id: string): Promise<ResponseWorkTableResponse> {
  const token = await getServerSession(authOptions);
  if (!token?.accessToken) throw new Error('Token com problema');

  if (isEmpty(id)) throw new Error('Precisa de identificação!');

  const url = `${process.env.BASE_API_URL}/work-table/${id}`;

  const res = await fetch(url, {
    method: 'GET',
    headers: { Authorization: `Bearer ${token?.accessToken}` },
  });

  if (res.status !== 200) return { ok: false, data: null };
  const data = await res.json();

  return { ok: true, data };
}
