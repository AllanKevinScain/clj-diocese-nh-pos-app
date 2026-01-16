import { isEmpty } from 'lodash';
import { type NextRequest, NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';

import type { CompleteRecordInterface, ReturnHandlerApiType } from '@/types';
import type { CandidatePosllSchemaInfertype } from '@/yup';

export async function POST(request: NextRequest) {
  const token = await getToken({ req: request });
  if (!token?.accessToken) throw new Error('Token com problema');

  const body = (await request.json()) as CandidatePosllSchemaInfertype;
  const {
    typeOfRecord: _typeOfRecord,
    updatedAt: _updatedAt,
    createdAt: _createdAt,
    ...rest
  } = body;

  const res = await fetch(`${process.env.BASE_API_URL}/records/poslll`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token?.accessToken}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(rest),
  });

  const data = (await res.json()) as ReturnHandlerApiType<CompleteRecordInterface>;
  return NextResponse.json({ ok: res.status !== 200 ? false : true, ...data });
}

export async function PUT(request: NextRequest) {
  const token = await getToken({ req: request });
  if (!token?.accessToken) throw new Error('Token com problema');

  const body = (await request.json()) as CandidatePosllSchemaInfertype;
  const {
    typeOfRecord: _typeOfRecord,
    updatedAt: _updatedAt,
    createdAt: _createdAt,
    id,
    ...rest
  } = body;

  if (isEmpty(id)) throw new Error('Precisa de identificação!');

  const res = await fetch(`${process.env.BASE_API_URL}/records/poslll/${id}`, {
    method: 'PUT',
    headers: {
      Authorization: `Bearer ${token?.accessToken}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(rest),
  });

  const data = (await res.json()) as ReturnHandlerApiType<CompleteRecordInterface>;
  return NextResponse.json({ ok: res.status !== 200 ? false : true, ...data });
}
