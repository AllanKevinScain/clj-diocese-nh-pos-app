import { isEmpty } from 'lodash';
import { getServerSession } from 'next-auth';

import { authOptions } from '@/auth-config';
import { formatMobilePhone } from '@/helpers';

import type { RecordPoslResponseInterface } from '../posl-server-call.type';

export async function getRecordById(
  id: string,
): Promise<{ ok: boolean; data: RecordPoslResponseInterface }> {
  const token = await getServerSession(authOptions);
  if (!token?.accessToken) throw new Error('Token com problema');

  if (isEmpty(id)) throw new Error('Precisa de identificação!');

  const url = `${process.env.BASE_API_URL}/records/posl/${id}`;

  const res = await fetch(url, {
    method: 'GET',
    headers: { Authorization: `Bearer ${token?.accessToken}` },
  });

  const data = await res.json();
  const { recordPOSl, recordNumber, candidatePhone, ...record } = data;

  const formatedData = {
    ...record,
    hasDisease: !isEmpty(record.disease),
    takesMedication: !isEmpty(record.medication),
    recordNumber: String(recordNumber),
    candidatePhone: formatMobilePhone(candidatePhone),
    recordPOSl: {
      ...recordPOSl,
      godfatherPhone: formatMobilePhone(recordPOSl.godfatherPhone),
    },
  };

  if (res.status === 400) return { ok: false, data };

  return { ok: true, data: formatedData };
}
