import dayjs from 'dayjs';
import { isEmpty } from 'lodash';
import { getServerSession } from 'next-auth';

import { authOptions } from '@/auth-config';
import type { CourseInferType } from '@/yup';

export async function getCourseServerCall(
  id: string,
): Promise<{ ok: boolean; data: CourseInferType }> {
  const token = await getServerSession(authOptions);
  if (!token?.accessToken) throw new Error('Token com problema');

  if (isEmpty(id)) throw new Error('Precisa de identificação!');

  const url = `${process.env.BASE_API_URL}/course/${id}`;

  const res = await fetch(url, {
    method: 'GET',
    headers: { Authorization: `Bearer ${token?.accessToken}` },
  });

  const data = (await res.json()) as CourseInferType;

  const formatedData = {
    ...data,
    startDate: dayjs(data.startDate).format('YYYY-MM-DD'),
    endDate: dayjs(data.endDate).format('YYYY-MM-DD'),
  };

  if (res.status === 400) return { ok: false, data };

  return { ok: true, data: formatedData };
}
