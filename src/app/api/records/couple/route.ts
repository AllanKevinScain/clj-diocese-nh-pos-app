import { isEmpty } from 'lodash';
import { type NextRequest, NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';
import type { InferType } from 'yup';

import { coupleSchema } from '@/yup';

type CoupleSchemaInfertype = InferType<typeof coupleSchema>;

export async function POST(request: NextRequest) {
  const token = await getToken({ req: request });
  if (!token?.accessToken) throw new Error('Token com problema');
  const body = (await request.json()) as CoupleSchemaInfertype;

  // validação
  const typedBody = coupleSchema.omit(['createdAt', 'updatedAt', 'typeOfRecord', 'recordId']);
  const parsed = await typedBody.validate(body, { stripUnknown: true });

  // tratamento para enviar pro back
  const { dataConsent, candidatePhone, recordCouple, ...resBody } = parsed;
  const {
    hasCourseOne: _HO,
    hasCourseThree: _HT,
    hasCourseTwo: _HTH,
    ...restRecordCouple
  } = recordCouple;
  const formatedBody: CoupleSchemaInfertype = {
    ...resBody,
    dataConsent: Boolean(dataConsent),
    candidatePhone: candidatePhone.replace(/[^\d]/g, ''),
    recordCouple: {
      ...restRecordCouple,
      womanPhone: restRecordCouple.womanPhone.replace(/[^\d]/g, ''),
    },
  };

  const res = await fetch(`${process.env.BASE_API_URL}/records/couple`, {
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

  const body = (await request.json()) as CoupleSchemaInfertype;

  // validação
  const typedBody = coupleSchema.omit(['createdAt', 'updatedAt', 'typeOfRecord', 'recordId']);
  const parsed = await typedBody.validate(body, { stripUnknown: true });

  // tratamento para enviar pro back
  const { id, dataConsent, candidatePhone, recordCouple, ...resBody } = parsed;
  const {
    hasCourseOne: _HO,
    hasCourseThree: _HT,
    hasCourseTwo: _HTH,
    ...restRecordCouple
  } = recordCouple;
  const formatedBody: CoupleSchemaInfertype = {
    ...resBody,
    dataConsent: Boolean(dataConsent),
    candidatePhone: candidatePhone.replace(/[^\d]/g, ''),
    recordCouple: {
      ...restRecordCouple,
      womanPhone: restRecordCouple.womanPhone.replace(/[^\d]/g, ''),
    },
  };

  if (isEmpty(id)) throw new Error('Precisa de identificação!');

  const res = await fetch(`${process.env.BASE_API_URL}/records/couple/${id}`, {
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
