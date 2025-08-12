import { isEmpty } from 'lodash';
import { getServerSession } from 'next-auth';

import { authOptions } from '@/auth-config';
import { formatMobilePhone } from '@/helpers';
import type { RecordPoslllResponseInterface } from '@/types';

export async function getPoslllRecordServerCall(
  id: string,
): Promise<{ ok: boolean; data: RecordPoslllResponseInterface }> {
  const token = await getServerSession(authOptions);
  if (!token?.accessToken) throw new Error('Token com problema');

  if (isEmpty(id)) throw new Error('Precisa de identificação!');

  const url = `${process.env.BASE_API_URL}/poslll/${id}`;

  const res = await fetch(url, {
    method: 'GET',
    headers: { Authorization: `Bearer ${token?.accessToken}` },
  });

  const data = (await res.json()) as RecordPoslllResponseInterface;

  const formatedData = {
    ...data,
    candidatePhone: formatMobilePhone(data.candidatePhone),
  };

  if (res.status === 400) return { ok: false, data };

  return { ok: true, data: formatedData };
}
