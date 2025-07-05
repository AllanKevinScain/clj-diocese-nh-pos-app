import { isEmpty } from 'lodash';
import { getServerSession } from 'next-auth';

import { authOptions } from '@/auth-config';
import { formatMobilePhone } from '@/helpers';

import type { RecordPosllResponseInterface } from '../posll-server-call.type';

export async function getRecordById(
  id: string,
): Promise<{ ok: boolean; data: RecordPosllResponseInterface }> {
  const token = await getServerSession(authOptions);
  if (!token?.accessToken) throw new Error('Token com problema');

  if (isEmpty(id)) throw new Error('Precisa de identificação!');

  const url = `${process.env.BASE_API_URL}/records/work/${id}`;

  const res = await fetch(url, {
    method: 'GET',
    headers: { Authorization: `Bearer ${token?.accessToken}` },
  });

  const data = await res.json();

  const { recordWork, recordNumber, candidatePhone, ...record } = data;

  const formatedData = {
    ...record,
    recordNumber: String(recordNumber),
    candidatePhone: formatMobilePhone(candidatePhone),
    recordWork: {
      ...recordWork,
      playInstrument: !isEmpty(recordWork.instrument),
      ...(recordWork.doingConfirmation && { hasConfirmation: false }),
      ...((!recordWork.doingConfirmation || recordWork.doingConfirmation === null) && {
        hasConfirmation: isEmpty(recordWork.notConfirmationBecause),
      }),
    },
  };

  if (res.status === 400) return { ok: false, data };

  return { ok: true, data: formatedData };
}
