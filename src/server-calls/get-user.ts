import { isEmpty } from 'lodash';
import { getServerSession } from 'next-auth';

import { authOptions } from '@/auth-config';
import type { UserResponseInterface } from '@/types';

export async function getUserServerCall(
  id: string,
): Promise<{ ok: boolean; data: UserResponseInterface }> {
  const token = await getServerSession(authOptions);
  if (!token?.accessToken) throw new Error('Token com problema');

  if (isEmpty(id)) throw new Error('Precisa de identificação!');

  const url = `${process.env.BASE_API_URL}/user/${id}`;

  const res = await fetch(url, {
    method: 'GET',
    headers: { Authorization: `Bearer ${token?.accessToken}` },
  });

  const data = (await res.json()) as UserResponseInterface;

  if (res.status === 400) return { ok: false, data };

  return { ok: true, data };
}
