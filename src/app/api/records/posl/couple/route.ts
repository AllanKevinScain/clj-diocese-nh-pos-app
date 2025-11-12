import { isEmpty } from 'lodash';
import { type NextRequest, NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';

import type { CoupleSchemaInfertype } from '@/yup';

export async function POST(request: NextRequest) {
  const token = await getToken({ req: request });
  if (!token?.accessToken) throw new Error('Token com problema');

  const body = (await request.json()) as CoupleSchemaInfertype;
  const { typeOfRecord: _, ...rest } = body;

  const res = await fetch(`${process.env.BASE_API_URL}/records/posl`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token?.accessToken}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      ...rest,
      dataConsent: Boolean(rest.dataConsent),
      isWork: false,
      isCoupleWork: true,
    }),
  });

  const data = await res.json();

  if (res.status !== 200) return NextResponse.json({ ok: false, data });

  return NextResponse.json({ ok: true, data });
}

export async function PUT(request: NextRequest) {
  const token = await getToken({ req: request });
  if (!token?.accessToken) throw new Error('Token com problema');

  const body = (await request.json()) as Partial<CoupleSchemaInfertype>;
  const { typeOfRecord: _, id, ...rest } = body;

  if (isEmpty(id)) throw new Error('Precisa de identificação!');

  const res = await fetch(`${process.env.BASE_API_URL}/records/posl/${id}`, {
    method: 'PUT',
    headers: {
      Authorization: `Bearer ${token?.accessToken}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      ...rest,
      dataConsent: Boolean(rest.dataConsent),
      isWork: false,
      isCoupleWork: true,
    }),
  });

  const data = await res.json();

  if (res.status !== 200) return NextResponse.json({ ok: false, data });

  return NextResponse.json({ ok: true, data });
}
