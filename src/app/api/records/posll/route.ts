import { isEmpty } from 'lodash';
import { type NextRequest, NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';
import type { InferType } from 'yup';

import { posllSchema } from '@/yup';

type PosllSchemaInfertype = InferType<typeof posllSchema>;

export async function POST(request: NextRequest) {
  const token = await getToken({ req: request });
  if (!token?.accessToken) throw new Error('Token com problema');
  const body = (await request.json()) as PosllSchemaInfertype;

  const typedBody = posllSchema.omit([
    'takesMedication',
    'hasDisease',
    'createdAt',
    'updatedAt',
    'typeOfRecord',
    'recordId',
  ]);
  const parsed = await typedBody.validate(body, { stripUnknown: true });
  const { dataConsent, candidatePhone, recordPOSll, ...resBody } = parsed;
  const { hasConfirmation: _, ...restRecordPOSll } = recordPOSll;
  const formatedBody = {
    ...resBody,
    recordPOSll: restRecordPOSll,
    dataConsent: Boolean(dataConsent),
    candidatePhone: candidatePhone.replace(/[^\d]/g, ''),
  };

  const res = await fetch(`${process.env.BASE_API_URL}/records/posll`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token?.accessToken}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(formatedBody),
  });

  const data = await res.json();

  if (res.status !== 200) return NextResponse.json({ ok: false, data });

  return NextResponse.json({ ok: true, data });
}

export async function PUT(request: NextRequest) {
  const token = await getToken({ req: request });
  if (!token?.accessToken) throw new Error('Token com problema');
  const body = (await request.json()) as PosllSchemaInfertype;

  const typedBody = posllSchema.omit([
    'takesMedication',
    'hasDisease',
    'createdAt',
    'updatedAt',
    'typeOfRecord',
    'recordId',
  ]);
  const parsed = await typedBody.validate(body, { stripUnknown: true });
  const { id, dataConsent, candidatePhone, recordPOSll, ...resRecord } = parsed;
  const { hasConfirmation: _, ...restRecordPOSll } = recordPOSll;
  const formatedBody = {
    ...resRecord,
    recordPOSll: restRecordPOSll,
    dataConsent: Boolean(dataConsent),
    candidatePhone: candidatePhone.replace(/[^\d]/g, ''),
  };

  if (isEmpty(id)) throw new Error('Precisa de identificação!');

  const res = await fetch(`${process.env.BASE_API_URL}/records/posll/${id}`, {
    method: 'PUT',
    headers: {
      Authorization: `Bearer ${token?.accessToken}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(formatedBody),
  });

  const data = await res.json();

  if (res.status !== 200) return NextResponse.json({ ok: false, data });

  return NextResponse.json({ ok: true, data });
}
