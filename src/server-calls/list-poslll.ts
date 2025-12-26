import { getServerSession } from 'next-auth';

import { authOptions } from '@/auth-config';
import type { PoslllSchemaInferType } from '@/yup';

export async function listPoslllServerCall(): Promise<{
  ok: boolean;
  data: PoslllSchemaInferType[];
}> {
  const token = await getServerSession(authOptions);
  if (!token?.accessToken) throw new Error('Token com problema');

  const res = await fetch(`${process.env.BASE_API_URL}/poslll`, {
    method: 'GET',
    headers: { Authorization: `Bearer ${token?.accessToken}` },
  });

  if (res.status !== 200) return { ok: false, data: [] };

  const data = await res.json();

  return { ok: true, data };
}
