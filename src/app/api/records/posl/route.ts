import { isEmpty } from 'lodash';
import { type NextRequest, NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';
import type { InferType } from 'yup';

import { poslSchema } from '@/yup';

type PoslSchemaInfertype = InferType<typeof poslSchema>;

export async function POST(request: NextRequest) {
  const token = await getToken({ req: request });
  if (!token?.accessToken) throw new Error('Token com problema');
  const body = (await request.json()) as PoslSchemaInfertype;
  const typedBody = poslSchema.omit([
    'takesMedication',
    'hasDisease',
    'createdAt',
    'updatedAt',
    'typeOfRecord',
    'recordId',
  ]);
  const parsed = await typedBody.validate(body, { stripUnknown: true });
  const { recordPOSl, candidatePhone, dataConsent, recordNumber, ...resBody } = parsed;
  const { godfatherPhone } = recordPOSl;
  const formatedRecordPOSl = {
    ...recordPOSl,
    godfatherPhone: godfatherPhone.replace(/[^\d]/g, ''),
  };
  const formatedBody = {
    ...resBody,
    recordPOSl: formatedRecordPOSl,
    dataConsent: Boolean(dataConsent),
    recordNumber: Number(recordNumber),
    candidatePhone: candidatePhone.replace(/[^\d]/g, ''),
  };

  const res = await fetch(`${process.env.BASE_API_URL}/records/posl`, {
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
  const body = (await request.json()) as PoslSchemaInfertype;

  const typedBody = poslSchema.omit([
    'takesMedication',
    'hasDisease',
    'createdAt',
    'updatedAt',
    'typeOfRecord',
    'recordId',
  ]);
  const parsed = await typedBody.validate(body, { stripUnknown: true });
  const { id, dataConsent, recordNumber, candidatePhone, recordPOSl, ...resBody } = parsed;
  const { godfatherPhone } = recordPOSl;
  const formatedRecordPOSl = {
    ...recordPOSl,
    godfatherPhone: godfatherPhone.replace(/[^\d]/g, ''),
  };
  const formatedBody = {
    ...resBody,
    recordPOSl: formatedRecordPOSl,
    dataConsent: Boolean(dataConsent),
    recordNumber: Number(recordNumber),
    candidatePhone: candidatePhone.replace(/[^\d]/g, ''),
  };

  if (isEmpty(id)) throw new Error('Precisa de identificação!');

  const res = await fetch(`${process.env.BASE_API_URL}/records/posl/${id}`, {
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
