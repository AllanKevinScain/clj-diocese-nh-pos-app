import { isEmpty } from 'lodash';
import { getServerSession } from 'next-auth';

import { authOptions } from '@/auth-config';
import type { CompleteRecordInterface } from '@/types';

export async function listRecordByCourseIdServerCall(
  id: string,
): Promise<{ ok: boolean; data: CompleteRecordInterface[] }> {
  const token = await getServerSession(authOptions);
  if (!token?.accessToken) throw new Error('Token com problema');

  if (isEmpty(id)) throw new Error('Precisa de identificação!');

  const res = await fetch(`${process.env.BASE_API_URL}/records/list-course/${id}`, {
    method: 'GET',
    headers: { Authorization: `Bearer ${token?.accessToken}` },
  });

  if (res.status !== 200) return { ok: false, data: [] };
  const data = await res.json();

  return { ok: true, data };
}
