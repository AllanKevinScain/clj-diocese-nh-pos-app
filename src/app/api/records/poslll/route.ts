import { isEmpty } from 'lodash';
import { type NextRequest, NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';

import type { CandidatePoslllSchemaInfertype } from '@/yup';

export async function POST(request: NextRequest) {
  const token = await getToken({ req: request });
  if (!token?.accessToken) throw new Error('Token com problema');

  const body = (await request.json()) as CandidatePoslllSchemaInfertype;
  const {
    typeOfRecord: _typeOfRecord,
    updatedAt: _updatedAt,
    createdAt: _createdAt,
    ...rest
  } = body;

  const res = await fetch(`${process.env.BASE_API_URL}/records/posll`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token?.accessToken}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(rest),
  });

  const data = await res.json();

  if (res.status !== 200) return NextResponse.json({ ok: false, data });

  return NextResponse.json({ ok: true, data });
}

export async function PUT(request: NextRequest) {
  const token = await getToken({ req: request });
  if (!token?.accessToken) throw new Error('Token com problema');

  const body = (await request.json()) as Partial<CandidatePoslllSchemaInfertype>;
  const {
    typeOfRecord: _typeOfRecord,
    updatedAt: _updatedAt,
    createdAt: _createdAt,
    id,
    ...rest
  } = body;

  if (isEmpty(id)) throw new Error('Precisa de identificação!');

  const res = await fetch(`${process.env.BASE_API_URL}/records/posll/${id}`, {
    method: 'PUT',
    headers: {
      Authorization: `Bearer ${token?.accessToken}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(rest),
  });

  const data = await res.json();

  if (res.status !== 200) return NextResponse.json({ ok: false, data });

  return NextResponse.json({ ok: true, data });
}
