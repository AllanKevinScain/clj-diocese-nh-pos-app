import { isEmpty } from 'lodash';
import { getServerSession } from 'next-auth';

import { authOptions } from '@/auth-config';
import { formatMobilePhone } from '@/helpers';
import type { RecordCoupleResponseInterface } from '@/types';

export async function getRecordCoupleServerCall(
  id: string,
): Promise<{ ok: boolean; data: RecordCoupleResponseInterface }> {
  const token = await getServerSession(authOptions);
  if (!token?.accessToken) throw new Error('Token com problema');

  if (isEmpty(id)) throw new Error('Precisa de identificação!');

  const url = `${process.env.BASE_API_URL}/records/couple/${id}`;

  const res = await fetch(url, {
    method: 'GET',
    headers: { Authorization: `Bearer ${token?.accessToken}` },
  });

  const data = (await res.json()) as RecordCoupleResponseInterface;

  const { recordCouple, candidatePhone, ...record } = data;

  const formatedData = {
    ...record,
    candidatePhone: formatMobilePhone(candidatePhone),
    recordCouple: {
      ...recordCouple,
      womanPhone: formatMobilePhone(recordCouple.womanPhone),
      hasCourseOne: !!recordCouple.coursesOneDone,
      hasCourseTwo: !!recordCouple.coursesTwoDone,
      hasCourseThree: !!recordCouple.coursesThreeDone,
    },
  };

  if (res.status === 400) return { ok: false, data };

  return { ok: true, data: formatedData };
}
